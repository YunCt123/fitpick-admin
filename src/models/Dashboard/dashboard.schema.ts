import { z } from "zod";

export const DashboardSchema = z.object({
    topStats: z.object({
        totalUsers: z.number().nonnegative(),
        totalDishes: z.number().nonnegative(),
        totalRevenue: z.number().nonnegative(),
        growthThisMonth: z.number(),
    }),
    userTypeData: z.array(
        z.object({
            name: z.string(),
            value: z.number().nonnegative(),
            color: z.string().optional(),
        })
    ),
    revenueByMonth: z.array(
        z.object({
            month: z.string(),
            value: z.number(),
        })
    ),
});

export type DashboardDTO = z.infer<typeof DashboardSchema>;
