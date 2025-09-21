export type TopStats = {
    totalUsers: number;
    totalDishes: number;
    totalRevenue: number;
    growthThisMonth: number; // 0.032 = +3.2%
};

export type UserTypeItem = {
    name: string;           // "Premium" | "User" | "Guest"
    value: number;
    color?: string;
};

export type RevenuePoint = { month: string; value: number };

export type DashboardData = {
    topStats: TopStats;
    userTypeData: UserTypeItem[];
    revenueByMonth: RevenuePoint[];
};