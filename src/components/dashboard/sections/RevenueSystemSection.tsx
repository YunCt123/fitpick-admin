import React from "react";
import { DollarSign, AlertTriangle } from "lucide-react";
import { timeseries, regions, paymentBreakdown, sre } from "../../../constants/mockData";
import { formatCurrency } from "../../../utils/dashboardHelpers";
import { Stat, Bar, StatusDot } from "../../ui/DashboardComponents";

const PRIMARY = "#AD46FF";

// Enhanced Section Title component
const EnhancedSectionTitle: React.FC<{
    icon: React.ElementType;
    title: string;
    right?: React.ReactNode
}> = ({ icon: Icon, title, right }) => (
    <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
            <Icon size={18} color={PRIMARY} />
            <h3 className="font-semibold text-zinc-800">{title}</h3>
        </div>
        {right}
    </div>
);

const RevenueSystemSection: React.FC = () => {
    const mrr = timeseries.at(-1)?.mrr ?? 0;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={DollarSign} title="Subscription & doanh thu" />
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <Stat label="ARR" value={formatCurrency(mrr * 12)} />
                    <Stat label="ARPU" value="$3.2" />
                    <Stat label="ARPPU" value="$7.9" />
                    <Stat label="Churn MRR" value="2.1%" />
                    <Stat label="Cancel rate" value="1.4%" />
                    <Stat label="Trial→Paid" value="40%" />
                </div>

                <div className="mt-4 mb-4">
                    <div className="text-xs text-zinc-500 mb-2 font-medium">Phân bố gói</div>
                    <div className="space-y-2">
                        <div className="text-sm text-zinc-700">Monthly: 72%</div>
                        <div className="text-sm text-zinc-700">Yearly: 28%</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="text-xs text-zinc-500 mb-2 font-medium">Doanh thu theo khu vực</div>
                        <ul className="space-y-1">
                            {regions.map((r) => (
                                <li key={r.name} className="flex items-center justify-between">
                                    <span className="text-zinc-700">{r.name}</span>
                                    <span className="text-zinc-900 font-medium">{formatCurrency(r.revenue)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="text-xs text-zinc-500 mb-2 font-medium">Phương thức thanh toán</div>
                        <ul className="space-y-1">
                            {paymentBreakdown.map((p) => (
                                <li key={p.method} className="flex items-center justify-between">
                                    <span className="text-zinc-700">{p.method}</span>
                                    <Bar width={`${p.percent}%`} size="small" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                    Dunning: <b>{sre.dunning.failed}</b> thất bại · phục hồi{" "}
                    <b>{sre.dunning.recovered}</b> · Refund <b>{sre.dunning.refunds}</b> · Chargeback{" "}
                    <b>{sre.dunning.chargebacks}</b>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5 xl:col-span-2">
                <EnhancedSectionTitle icon={AlertTriangle} title="Chất lượng & độ tin cậy hệ thống (SRE-lite)" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                    <Stat label="Error 4xx" value={`${sre.error4xx}%`} />
                    <Stat label="Error 5xx" value={`${sre.error5xx}%`} />
                    <Stat label="Latency p95" value={`${sre.p95} ms`} />
                    <Stat label="Latency p99" value={`${sre.p99} ms`} />
                </div>
                <div className="mt-4">
                    <div className="text-xs text-zinc-500 mb-3 font-medium">Trạng thái job định kỳ</div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {sre.jobs.map((j) => (
                            <li
                                key={j.name}
                                className="rounded-lg border border-zinc-100 p-3 flex items-center justify-between"
                            >
                                <span className="text-sm text-zinc-700">{j.name}</span>
                                <span className="flex items-center gap-2">
                                    <StatusDot status={j.status} />
                                    <span className="text-xs text-zinc-500">{j.last}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RevenueSystemSection;