import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import type { DashboardDTO } from "@/models/Dashboard/dashboard.schema";

export function useDashboard() {
    return useQuery<DashboardDTO, Error>({
        queryKey: ["dashboard"],
        queryFn: () => dashboardService.getDashboard(),
        staleTime: 60_000,
    });
}
