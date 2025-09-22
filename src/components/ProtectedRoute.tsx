import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from '../services/auth.service';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute component - Bảo vệ các route yêu cầu authentication
 * Nếu user chưa đăng nhập sẽ redirect đến trang login
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  // Nếu chưa đăng nhập, redirect đến login và lưu current location
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Nếu đã đăng nhập, render children components
  return <>{children}</>;
};

export default ProtectedRoute;