import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  TrendingUp, 
  FileText, 
  LogOut, 
  Search,
  ChevronLeft,
  ChevronRight,
  ChefHat,
  CreditCard,
  Package
} from 'lucide-react';
import { authService } from '../services/auth.service';
import { toast } from 'react-toastify';
import LogoutModal from './ui/LogoutModal';

interface SideBarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ 
  isCollapsed: externalCollapsed, 
  onToggleCollapse 
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Use external prop if provided, otherwise use internal state
  const isCollapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    if (onToggleCollapse) {
      onToggleCollapse(newCollapsed);
    } else {
      setInternalCollapsed(newCollapsed);
    }
  };

  const handleLogout = () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // Don't clear Remember Me data by default - let user choose on login page
      authService.logout(false);
      
      toast.success('Đăng xuất thành công!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Redirect to login page
      navigate('/login', { replace: true });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Có lỗi xảy ra khi đăng xuất', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCloseModal = () => {
    if (!isLoggingOut) {
      setShowLogoutModal(false);
    }
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: TrendingUp, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: ChefHat, label: 'Meals', path: '/dashboard/meals' },
    { icon: Package, label: 'Ingredients', path: '/dashboard/ingredients' },
    { icon: CreditCard, label: 'Transactions', path: '/dashboard/transactions' },
    
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div
      className={`bg-gray-900 h-full shadow-lg transition-[width] duration-300 flex flex-col overflow-hidden ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700 relative">
  <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} transition-all`}>
          <div className={`bg-purple-500 rounded-xl flex items-center justify-center ${
            isCollapsed ? 'w-8 h-8' : 'w-10 h-10'
          }`}>
            <span className={`text-white font-bold ${isCollapsed ? 'text-sm' : 'text-lg'}`}>FP</span>
          </div>
          <div
            className={`transition-opacity duration-200 ${
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}
          >
            {!isCollapsed && (
              <>
                <h3 className="font-semibold text-white whitespace-nowrap">FitPick Admin</h3>
                <p className="text-sm text-gray-400">Admin Dashboard</p>
              </>
            )}
          </div>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={handleToggleCollapse}
          className="absolute top-1/2 -translate-y-1/2 -right-0 w-6 h-6 rounded-full hover:scale-105 focus:outline-none bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors shadow-lg z-10"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-white" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-white" />
          )}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className={`flex-1 px-3 py-2 ${isCollapsed ? 'px-2' : ''}`}>
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}  
                className={`flex items-center rounded-lg transition-all duration-200 py-3 ${
                  isCollapsed 
                    ? 'justify-center px-2' 
                    : 'space-x-3 px-4'
                } ${
                  isActive(item.path)
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="w-5 h-5" />
                <span
                  className={`font-medium transition-opacity duration-150 ${
                    isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                  }`}
                >
                  {!isCollapsed && item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Items */}
      <div className="mt-auto p-3 border-t border-gray-700 space-y-2">
        {/* Logout */}
        <button
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
          className={`w-full flex items-center rounded-lg transition-colors py-3 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed ${
            isCollapsed 
              ? 'justify-center px-2' 
              : 'space-x-3 px-4'
          }`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className={`w-5 h-5 ${isLoggingOut ? 'animate-spin' : ''}`} />
          <span
            className={`font-medium transition-opacity duration-150 ${
              isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}
          >
            {!isCollapsed && (isLoggingOut ? 'Logging out...' : 'Logout')}
          </span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
};

export default SideBar;