import type { DashboardDTO } from "@/models/Dashboard/dashboard.schema";

const PRIMARY = "#AD46FF";
const PRIMARY_300 = "#C78CFF";
const INDIGO_400 = "#6366F1";

export const dashboardMock: DashboardDTO = {
    topStats: {
        totalUsers: 128_450,
        totalDishes: 6_321,
        totalRevenue: 12_500_000_000,
        growthThisMonth: 0.032,
    },
    userTypeData: [
        { name: "Premium", value: 68_000, color: PRIMARY },
        { name: "User", value: 45_000, color: INDIGO_400 },
        { name: "Guest", value: 15_450, color: PRIMARY_300 },
    ],
    revenueByMonth: [
        { month: "Tháng 1", value: 120 },
        { month: "Tháng 2", value: 135 },
        { month: "Tháng 3", value: 160 },
        { month: "Tháng 4", value: 180 },
        { month: "Tháng 5", value: 210 },
        { month: "Tháng 6", value: 240 },
        { month: "Tháng 7", value: 280 },
        { month: "Tháng 8", value: 310 },
        { month: "Tháng 9", value: 350 },
        { month: "Tháng 10", value: 400 },
        { month: "Tháng 11", value: 460 },
        { month: "Tháng 12", value: 520 },
    ],
};
