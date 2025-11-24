import { apiUtils } from '../api/axios';
import { AUTH_URL } from '../constants/authURL';
import type { LoginRequest, LoginResponseData, RegisterRequest, UserModel } from '../models/LoginModel';
import type { ApiResponse } from '../models/ApiResponse';


class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_KEY = 'user';
  private readonly EXPIRES_IN_KEY = 'expiresIn';
  private readonly REMEMBER_ME_KEY = 'rememberMe';
  private readonly REMEMBERED_EMAIL_KEY = 'rememberedEmail';

  /**
   * Login user with email and password
   * @param credentials - User login credentials
   * @param rememberMe - Whether to remember the user for future sessions
   * @returns Promise with login response data
   */
  async login(credentials: LoginRequest, rememberMe?: boolean): Promise<LoginResponseData> {
    try {
      const response = await apiUtils.post<ApiResponse<LoginResponseData>>(
        `${AUTH_URL}/login`,
        credentials
      );

      const loginData = response.data.data;
      
      // Check if user has admin role (roleId = 4 according to getRoleName function)
      if (loginData.user.roleId !== 4) {
        throw new Error('Bạn không có quyền truy cập trang quản trị. Chỉ Admin mới có thể đăng nhập.');
      }
      
      // Store authentication data in localStorage
      this.setAuthData(loginData, rememberMe);
      
      // Handle remember me functionality
      if (rememberMe) {
        this.setRememberMeData(credentials.email);
        localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
      } else {
        // Chỉ xóa remember me flag, giữ lại email để user tiện lần sau
        this.clearRememberMeData(false);
      }
      
      return loginData;
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      // More detailed error message
      let errorMessage = 'Đăng nhập thất bại';
      
      if (error.response?.status === 401) {
        errorMessage = 'Email hoặc mật khẩu không đúng';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.data?.message) {
        errorMessage = error.response.data.data.message;
      }
      
      throw new Error(errorMessage);
    }
  }

  /**
   * Register new user
   * @param userData - User registration data
   * @returns Promise with registration response
   */
  async register(userData: RegisterRequest): Promise<ApiResponse<any>> {
    try {
      const response = await apiUtils.post<ApiResponse<any>>(
        `${AUTH_URL}/register`,
        userData
      );
      
      return response.data;
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.data?.message || 
        'Đăng ký thất bại'
      );
    }
  }

  /**
   * Refresh authentication token
   * @returns Promise with new token data
   */
  async refreshToken(): Promise<LoginResponseData> {
    try {
      const refreshToken = this.getRefreshToken();
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiUtils.post<ApiResponse<LoginResponseData>>(
        `${AUTH_URL}/refresh-token`,
        { refreshToken }
      );

      const tokenData = response.data.data;
      
      // Update stored authentication data
      this.setAuthData(tokenData);
      
      return tokenData;
    } catch (error: any) {
      console.error('Refresh token error:', error);
      // Clear invalid tokens but keep Remember Me data
      this.clearSessionData();
      throw new Error(
        error.response?.data?.message || 
        'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại'
      );
    }
  }

  /**
   * Logout user and clear authentication data
   * @param clearRememberMe - Whether to also clear Remember Me data
   */
  logout(clearRememberMe: boolean = false): void {
    if (clearRememberMe) {
      // Clear everything including Remember Me data
      this.clearAuthData();
      this.clearRememberMeData();
    } else {
      // Only clear session data, keep Remember Me data
      this.clearSessionData();
    }
  }

  /**
   * Check if user is authenticated
   * @returns boolean indicating authentication status
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    const expiresIn = this.getExpiresIn();
    
    if (!token || !expiresIn) {
      return false;
    }

    // Check if token is expired
    const now = Date.now();
    const expirationTime = parseInt(expiresIn);
    
    if (now >= expirationTime) {
      this.clearSessionData();
      return false;
    }

    return true;
  }

  /**
   * Check if token will expire soon (within 5 minutes)
   * @returns boolean indicating if token needs refresh
   */
  shouldRefreshToken(): boolean {
    const expiresIn = this.getExpiresIn();
    
    if (!expiresIn) {
      return false;
    }

    const now = Date.now();
    const expirationTime = parseInt(expiresIn);
    const fiveMinutesFromNow = now + (5 * 60 * 1000); // 5 minutes in milliseconds

    return fiveMinutesFromNow >= expirationTime;
  }

  /**
   * Get current authenticated user
   * @returns UserModel or null if not authenticated
   */
  getCurrentUser(): UserModel | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY) || sessionStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Get current access token
   * @returns string token or null
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Get current refresh token
   * @returns string refresh token or null
   */
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY) || sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  /**
   * Get token expiration time
   * @returns string timestamp or null
   */
  getExpiresIn(): string | null {
    return localStorage.getItem(this.EXPIRES_IN_KEY) || sessionStorage.getItem(this.EXPIRES_IN_KEY);
  }

  /**
   * Check if current user has specific role
   * @param roleId - Role ID to check
   * @returns boolean indicating role access
   */
  hasRole(roleId: number): boolean {
    const user = this.getCurrentUser();
    return user?.roleId === roleId;
  }

  /**
   * Check if current user is admin
   * @returns boolean indicating admin status
   */
  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role?.toLowerCase() === 'admin';
  }

  /**
   * Store authentication data in localStorage
   * @param authData - Authentication data from login/refresh response
   * @param rememberMe - Whether to persist the session longer
   */
  private setAuthData(authData: LoginResponseData, rememberMe?: boolean): void {
    // Determine storage method based on rememberMe
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem(this.TOKEN_KEY, authData.token);
    storage.setItem(this.REFRESH_TOKEN_KEY, authData.refreshToken);
    storage.setItem(this.USER_KEY, JSON.stringify(authData.user));
    
    // Calculate expiration time (current time + expiresIn seconds)
    const expirationTime = Date.now() + (authData.expiresIn * 1000);
    storage.setItem(this.EXPIRES_IN_KEY, expirationTime.toString());
    
    // Store remember me preference
    if (rememberMe) {
      localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
    }
  }

  /**
   * Clear only session authentication data (tokens and user data)
   * but preserve Remember Me data
   */
  private clearSessionData(): void {
    // Clear from localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.EXPIRES_IN_KEY);
    
    // Clear from sessionStorage
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.EXPIRES_IN_KEY);
  }

  /**
   * Clear all authentication data including Remember Me data
   */
  private clearAuthData(): void {
    this.clearSessionData();
    localStorage.removeItem(this.REMEMBER_ME_KEY);
  }

  /**
   * Set Remember Me data
   * @param email - User email to remember
   */
  private setRememberMeData(email: string): void {
    localStorage.setItem(this.REMEMBERED_EMAIL_KEY, email);
  }

  /**
   * Clear Remember Me data from localStorage
   * @param clearEmail - Whether to also clear the remembered email (default: false to keep email for convenience)
   */
  clearRememberMeData(clearEmail: boolean = false): void {
    localStorage.removeItem(this.REMEMBER_ME_KEY);
    if (clearEmail) {
      localStorage.removeItem(this.REMEMBERED_EMAIL_KEY);
      // Remove old password storage for security
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }
  }

  /**
   * Get remembered email
   * @returns string email or null
   */
  getRememberedEmail(): string | null {
    return localStorage.getItem(this.REMEMBERED_EMAIL_KEY);
  }

  /**
   * Check if Remember Me is enabled
   * @returns boolean indicating if Remember Me is active
   */
  isRememberMeEnabled(): boolean {
    return localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
  }

  /**
   * Try to restore session if Remember Me was enabled
   * @returns boolean indicating if session was restored
   */
  tryRestoreSession(): boolean {
    try {
      // Check if we have a valid session
      if (this.isAuthenticated()) {
        return true;
      }

      // If no valid session, clear only session data but keep Remember Me data
      this.clearSessionData();
      return false;
    } catch (error) {
      console.error('Session restoration failed:', error);
      this.clearSessionData();
      return false;
    }
  }

  /**
   * Get user profile from API
   * @returns Promise with user profile data
   */
  async getProfile(): Promise<UserModel> {
    try {
      const response = await apiUtils.get<ApiResponse<UserModel>>(`${AUTH_URL}/profile`);
      return response.data.data;
    } catch (error: any) {
      console.error('Get profile error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể lấy thông tin người dùng'
      );
    }
  }

  /**
   * Update user profile
   * @param profileData - Updated profile data
   * @returns Promise with updated user data
   */
  async updateProfile(profileData: Partial<UserModel>): Promise<UserModel> {
    try {
      const response = await apiUtils.put<ApiResponse<UserModel>>(
        `${AUTH_URL}/profile`,
        profileData
      );
      
      const updatedUser = response.data.data;
      
      // Update stored user data
      localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể cập nhật thông tin người dùng'
      );
    }
  } 

  /**
   * Change user password
   * @param passwordData - Current and new password
   * @returns Promise with success response
   */
  async changePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<ApiResponse<any>> {
    try {
      const response = await apiUtils.post<ApiResponse<any>>(
        `${AUTH_URL}/change-password`,
        passwordData
      );
      
      return response.data;
    } catch (error: any) {
      console.error('Change password error:', error);
      throw new Error(
        error.response?.data?.message || 
        'Không thể thay đổi mật khẩu'
      );
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;