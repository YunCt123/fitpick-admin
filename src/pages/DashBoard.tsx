import { useState } from 'react';
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function DashBoard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Fixed width */}
      <div className={`flex-shrink-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}>
        <SideBar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={handleToggleCollapse}
        />
      </div>

      {/* Main Content - Full remaining width */}
      <div className="flex-1 bg-gray-100 transition-all duration-300 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
