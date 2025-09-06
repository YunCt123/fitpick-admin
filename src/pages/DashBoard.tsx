import { useState } from 'react';
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function DashBoard() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleCollapse = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Dynamic width based on collapsed state */}
      <div className={`flex-shrink-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-20' : 'w-[15%]'
      }`}>
        <SideBar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={handleToggleCollapse}
        />
      </div>

      {/* Main Content - Dynamic width */}
      <div className={`bg-gray-100 transition-all duration-300 ${
        isSidebarCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[85%]'
      }`}>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
