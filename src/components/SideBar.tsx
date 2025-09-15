import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Users, 
  TrendingUp, 
  FileText, 
  Wallet, 
  LogOut, 
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SideBarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ 
  isCollapsed: externalCollapsed, 
  onToggleCollapse 
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const location = useLocation();

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

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Revenue', path: '/dashboard/revenue' },
    { icon: TrendingUp, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Users, label: 'Users', path: '/dashboard/users' },
    { icon: FileText, label: 'Blogs', path: '/dashboard/blogs' },
    { icon: Wallet, label: 'Transactions', path: '/dashboard/transactions' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <div className="bg-gray-900 h-full shadow-lg transition-all duration-300 flex flex-col w-64">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 relative">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className={`bg-purple-500 rounded-xl flex items-center justify-center ${
            isCollapsed ? 'w-8 h-8' : 'w-10 h-10'
          }`}>
            <span className={`text-white font-bold ${isCollapsed ? 'text-sm' : 'text-lg'}`}>FP</span>
          </div>
          {!isCollapsed && (
            <div>
              <h3 className="font-semibold text-white">FitPick Admin</h3>
              <p className="text-sm text-gray-400">Admin Dashboard</p>
            </div>
          )}
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={handleToggleCollapse}
          className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 rounded-full hover:scale-105 focus:outline-none bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors shadow-lg z-10"
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
      <nav className={`flex-1 px-3 py-2`}>
        <ul className="space-y-2">
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
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Items */}
      <div className="mt-auto p-3 border-t border-gray-700 space-y-2">
        {/* Logout */}
        <a
          href="#"
          className={`flex items-center rounded-lg transition-colors py-3 text-gray-300 hover:bg-gray-800 hover:text-white ${
            isCollapsed 
              ? 'justify-center px-2' 
              : 'space-x-3 px-4'
          }`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </a>
      </div>
    </div>
  );
};

export default SideBar;