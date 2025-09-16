import React from "react";
import {
  KpiCardsSection,
  ChartsSection,
  RetentionHeatmapSection,
  UserGrowthSection,
  CatalogSearchSection,
  RevenueSystemSection
} from "../components/dashboard/sections";

const PRIMARY = "#AD46FF";

const DashboardHome: React.FC = () => {
  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900">Dashboard</h1>
          <p className="text-zinc-500">Tổng quan hoạt động người dùng & doanh thu</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-2 rounded-lg border border-zinc-200 text-sm text-zinc-700 hover:bg-zinc-50"
            title="Chọn khoảng thời gian"
          >
            Last 14 days
          </button>
          <button
            className="px-3 py-2 rounded-lg text-sm text-white"
            style={{ backgroundColor: PRIMARY }}
            title="Xuất báo cáo"
          >
            Export
          </button>
        </div>
      </div>

      {/* Dashboard Sections */}
      <KpiCardsSection />
      <ChartsSection />
      <RetentionHeatmapSection />
      <UserGrowthSection />
      <CatalogSearchSection />
      <RevenueSystemSection />

      {/* Footer spacing */}
      <div className="h-8" />
    </div>
  );
};

export default DashboardHome;