import React, { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoWeb from '../assets/FitPick-logo.png';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Khôi phục thông tin đã lưu và thử restore session khi component mount
  useEffect(() => {
    const initializeLogin = () => {
      try {
        // Try to restore session first
        const sessionRestored = authService.tryRestoreSession();
        
        if (sessionRestored) {
          // If session was restored successfully, redirect to dashboard
          const redirectTo = (location.state as any)?.from?.pathname || '/dashboard';
          navigate(redirectTo, { replace: true });
          return;
        }

        // If session restoration failed, load remembered email if available
        // Load email even if remember me is not enabled (for convenience)
        const rememberedEmail = authService.getRememberedEmail();
        const isRememberMeEnabled = authService.isRememberMeEnabled();
        
        if (rememberedEmail) {
          setFormData({
            email: rememberedEmail,
            password: ''
          });
          // Only check remember me if it was previously enabled
          if (isRememberMeEnabled) {
            setRememberMe(true);
          }
        }
      } catch (error) {
        console.error('Login initialization error:', error);
        // Clear any invalid data
        authService.clearRememberMeData();
      } finally {
        setIsRestoringSession(false);
      }
    };

    initializeLogin();
  }, [navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRememberMe(checked);
    
    // Nếu bỏ tick Remember Me, chỉ xóa remember me flag
    // Nhưng giữ lại email nếu đã có để user dễ dàng nhập lại
    if (!checked) {
      // Chỉ xóa remember me flag, không xóa email
      localStorage.removeItem('rememberMe');
    } else {
      // Nếu tick Remember Me, lưu email hiện tại
      if (formData.email) {
        localStorage.setItem('rememberedEmail', formData.email);
        localStorage.setItem('rememberMe', 'true');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await authService.login(formData, rememberMe);
      
      toast.success('Đăng nhập thành công! Chào mừng bạn trở lại.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Delay redirect để user có thể thấy toast
      setTimeout(() => {
        // Redirect đến trang mà user muốn truy cập trước khi bị redirect đến login
        // Nếu không có thì mặc định đến dashboard
        const redirectTo = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(redirectTo, { replace: true });
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.message || 'Đăng nhập thất bại';
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while trying to restore session
  if (isRestoringSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center space-x-3">
            <svg className="animate-spin h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-purple-600 font-medium">Đang kiểm tra phiên đăng nhập...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
      <div className="absolute top-20 right-32 w-4 h-4 bg-white/30 rounded-full"></div>
      <div className="absolute bottom-20 left-20 w-8 h-8 border-2 border-white/20 rounded-full"></div>
      <div className="absolute top-32 left-1/4 text-white/10 text-6xl font-bold">+</div>
      <div className="absolute bottom-32 right-20 text-white/10 text-4xl font-bold">+</div>
      
      {/* Dotted pattern */}
      <div className="absolute top-1/4 right-1/4 grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white/20 rounded-full"></div>
        ))}
      </div>

      {/* Wavy decorative lines */}
      <div className="absolute top-1/2 left-10 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,20 Q50,10 80,20 T80,60 Q50,70 20,60 T20,20" fill="none" stroke="white" strokeWidth="2"/>
          <path d="M10,40 Q40,30 70,40 T70,80 Q40,90 10,80 T10,40" fill="none" stroke="white" strokeWidth="1"/>
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-32 w-40 h-40 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M30,30 Q60,20 90,30 T90,70 Q60,80 30,70 T30,30" fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex relative z-10">
        {/* Left Side - Welcome Message */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 items-center justify-center p-12 relative overflow-hidden">
          {/* Background decorative elements for left panel */}
          <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 border border-white/20 rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 text-white/10 text-4xl font-bold">+</div>
          <div className="absolute bottom-1/3 left-1/4 text-white/10 text-2xl font-bold">○</div>
          
          {/* Dotted pattern in left panel */}
          <div className="absolute top-1/3 right-8 grid grid-cols-3 gap-1">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white/30 rounded-full"></div>
            ))}
          </div>

          <div className="text-center relative z-10">
            <h1 className="text-white text-5xl font-bold mb-4">Welcome back!</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              You can sign in to access with your<br />
              existing account.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
          {/* Form Header */}
          <div className="mb-8 justify-center text-center">
            <div className="flex justify-center mb-4">
              <img src={logoWeb} alt="FitPick Logo" className="h-60 w-auto" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Sign In</h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Username or email"
                  className={`w-full px-4 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-12 text-gray-700 placeholder-gray-400 ${
                    rememberMe && formData.email 
                      ? 'border-purple-200 bg-purple-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className={`w-5 h-5 ${rememberMe && formData.email ? 'text-purple-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                {rememberMe && formData.email && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pl-12 pr-12 bg-gray-50 text-gray-700 placeholder-gray-400"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-purple-600 hover:text-purple-700 font-medium focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal 
        isOpen={showForgotPasswordModal} 
        onClose={() => setShowForgotPasswordModal(false)} 
      />
    </div>
  );
};

export default Login;