import React, { useMemo } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { StatCard } from "../components/dashboard/StatCard";
import { UserTypeDonut } from "../components/dashboard/charts/UserTypeDonut";
import { RevenueBar } from "../components/dashboard/charts/RevenueBar";

const formatNumberVN = (n: number) => new Intl.NumberFormat("vi-VN").format(n);
const formatCurrencyShortVND = (n: number) => {
  if (n >= 1_000_000_000_000) return `đ ${(n / 1_000_000_000_000).toFixed(1).replace(".", ",")}T`;
  if (n >= 1_000_000_000) return `đ ${(n / 1_000_000_000).toFixed(1).replace(".", ",")}B`;
  if (n >= 1_000_000) return `đ ${(n / 1_000_000).toFixed(1).replace(".", ",")}M`;
  return `đ ${formatNumberVN(n)}`;
};

function ChartCardSkeleton() {
  return (
    <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-5">
      <div className="h-4 w-40 bg-slate-100 rounded animate-pulse" />
      <div className="mt-3 h-72 bg-slate-100 rounded-xl animate-pulse" />
    </div>
  );
}

export default function DashboardHome() {
  const { data, isLoading, isError, error, refetch } = useDashboard();

  const totalUsers = data?.topStats.totalUsers ?? 0;
  const centerLabel = useMemo(() => formatNumberVN(totalUsers), [totalUsers]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
          <div className="text-lg md:text-xl font-semibold">Dashboard</div>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-10 py-2.5 text-sm outline-none focus:bg-white focus:ring-4 focus:ring-violet-100"
                placeholder="Search"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className="ml-auto">
            <div className="h-9 w-9 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12z" />
                <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8H4z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        {isError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Lỗi tải dữ liệu: {error?.message}
            <button
              onClick={() => refetch()}
              className="ml-3 inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Top stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          <StatCard
            loading={isLoading}
            title="Tổng người dùng"
            value={formatNumberVN(data?.topStats.totalUsers ?? 0)}
            delta={data?.topStats.growthThisMonth}
            icon={
              <svg className="h-6 w-6 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11a4 4 0 1 0-4-4 4.005 4.005 0 0 0 4 4zm-8 0a4 4 0 1 0-4-4 4.005 4.005 0 0 0 4 4zm0 2c-3.314 0-6 2.239-6 5v2h8v-2c0-1.498.66-2.846 1.736-3.79A7.944 7.944 0 0 0 8 13zm8 0a6 6 0 0 0-3 .816A5.98 5.98 0 0 1 17 18v2h7v-2c0-3.314-3.134-5-6-5z" />
              </svg>
            }
          />
          <StatCard
            loading={isLoading}
            title="Tổng món ăn"
            value={formatNumberVN(data?.topStats.totalDishes ?? 0)}
            delta={data?.topStats.growthThisMonth}
            icon={
              <svg className="h-6 w-6 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3zM5 9h2v6H5zM9 9h2v6H9zM13 9h2v6h-2zM17 9h2v6h-2zM4 17h16v2H4z" />
              </svg>
            }
          />
          <StatCard
            loading={isLoading}
            title="Tổng doanh thu"
            value={formatCurrencyShortVND(data?.topStats.totalRevenue ?? 0)}
            delta={data?.topStats.growthThisMonth}
            icon={
              <svg className="h-6 w-6 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 3h10v2H7zM5 7h14v2H5zM7 11h10v2H7zM9 15h6v2H9zM11 19h2v2h-2z" />
              </svg>
            }
          />
        </div>

        {/* Charts */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
          {isLoading ? (
            <ChartCardSkeleton />
          ) : (
            <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-5">
              <div className="text-slate-800 font-semibold">Người dùng theo loại</div>
              {data?.userTypeData?.length ? (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-3 h-72">
                    <UserTypeDonut data={data.userTypeData} centerLabel={centerLabel} />
                  </div>
                  <div className="md:col-span-2 flex flex-col justify-center gap-3">
                    {data.userTypeData.map((it) => (
                      <div key={it.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-3 w-3 rounded-full" style={{ background: it.color }} />
                          <span className="text-sm text-slate-700">{it.name}</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">{formatNumberVN(it.value)}</span>
                      </div>
                    ))}
                    <div className="mt-4 text-xs text-slate-400">Tổng: {formatNumberVN(totalUsers)}</div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 mt-3">Không có dữ liệu</div>
              )}
            </div>
          )}

          {isLoading ? (
            <ChartCardSkeleton />
          ) : (
            <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-5">
              <div className="text-slate-800 font-semibold">Doanh thu theo tháng</div>
              {data?.revenueByMonth?.length ? (
                <>
                  <div className="h-72 mt-3">
                    <RevenueBar data={data.revenueByMonth} />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">Đơn vị minh hoạ: triệu (M) VND</div>
                </>
              ) : (
                <div className="text-sm text-slate-500 mt-3">Không có dữ liệu</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
