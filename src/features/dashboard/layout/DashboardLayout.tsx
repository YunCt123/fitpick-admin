import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function DashboardLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen">
            <div className={`flex-shrink-0 transition-all duration-300 ${isSidebarCollapsed ? "w-20" : "w-[15%]"}`}>
                <SideBar isCollapsed={isSidebarCollapsed} onToggleCollapse={setIsSidebarCollapsed} />
            </div>

            <div className={`bg-gray-100 transition-all duration-300 ${isSidebarCollapsed ? "w-[calc(100%-5rem)]" : "w-[85%]"}`}>
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}