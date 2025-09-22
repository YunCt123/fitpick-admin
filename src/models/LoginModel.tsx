export interface UserModel {
  userid: number;
  fullname: string;
  email: string;
  roleId: number;
  role: string;
}

export interface LoginResponseData {
  token: string;
  refreshToken: string;
  expiresIn: number;
  user: UserModel;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}