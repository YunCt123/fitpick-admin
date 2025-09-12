import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "@features/dashboard/layout/DashboardLayout";
import NotFound from "@shared/pages/NotFound";
import Login from "@features/auth/pages/Login";

// Có thể lazy-load các page lớn
import Home from "@features/dashboard/pages/Home";
import Analytics from "@features/analytics/pages/Analytics";
import Revenue from "@features/revenue/pages/Revenue";
import Wallets from "@features/wallets/pages/Wallets";
import Blogs from "@features/blogs/pages/Blogs";
import Users from "@features/users/pages/Users";

const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "/login", element: <Login /> },
    {
        path: "/dashboard",
        element: <DashboardLayout />,   // layout dùng <Outlet/> như bạn đang làm
        children: [
            { index: true, element: <Home /> },
            { path: "analytics", element: <Analytics /> },
            { path: "revenue", element: <Revenue /> },
            { path: "wallets", element: <Wallets /> },
            { path: "blogs", element: <Blogs /> },
            { path: "users", element: <Users /> },
        ],
    },
    { path: "*", element: <NotFound /> },
]);

export default router;