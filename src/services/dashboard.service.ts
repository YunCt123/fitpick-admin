import api from "@/api/axios";
import { DashboardSchema, type DashboardDTO } from "@/models/Dashboard/dashboard.schema";
import { dashboardMock } from "@/services/mocks/dashboard.mock";

const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? "false") === "true";

/** Real API */
async function getDashboardReal(): Promise<DashboardDTO> {
    const res = await api.get<unknown>("/dashboard");
    const parsed = DashboardSchema.safeParse(res.data);
    if (!parsed.success) throw new Error("Invalid dashboard payload");
    return parsed.data;
}

/** Mock API (giữ độ trễ nhẹ để kiểm tra skeleton) */
async function getDashboardMock(): Promise<DashboardDTO> {
    await new Promise((r) => setTimeout(r, 450));
    return dashboardMock;
}

export const dashboardService = {
    getDashboard: USE_MOCK ? getDashboardMock : getDashboardReal,
};