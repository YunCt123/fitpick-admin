import React, { useMemo } from "react";
import {
    Users,
    DollarSign,
    CalendarCheck,
    CheckCircle2,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import { timeseries, featureUsage } from "../../../constants/mockData";
import { formatCurrency } from "../../../utils/dashboardHelpers";

const PRIMARY = "#AD46FF";

// Enhanced KPI Card component  
type KpiCardProps = {
    title: string;
    value: string;
    delta?: { value: number; positive?: boolean };
    icon: React.ElementType;
    hint?: string;
};

const EnhancedKpiCard: React.FC<KpiCardProps> = ({ title, value, delta, icon: Icon, hint }) => {
    const deltaColor = delta
        ? delta.positive
            ? "text-emerald-600"
            : "text-rose-600"
        : "text-zinc-500";
    return (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className="rounded-lg p-2"
                        style={{ backgroundColor: `${PRIMARY}1A` }}
                    >
                        <Icon size={20} color={PRIMARY} />
                    </div>
                    <div className="text-zinc-500 text-sm">{title}</div>
                </div>
                {hint ? <div className="text-xs text-zinc-400">{hint}</div> : null}
            </div>
            <div className="mt-3 flex items-end justify-between">
                <div className="text-2xl lg:text-3xl font-semibold text-zinc-900">{value}</div>
                {delta && (
                    <div className={`flex items-center gap-1 text-sm ${deltaColor}`}>
                        {delta.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span>{(delta.value > 0 ? "+" : "") + delta.value}%</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const KpiCardsSection: React.FC = () => {
    // Derived values
    const dau = timeseries.at(-1)?.dau ?? 0;
    const mrr = timeseries.at(-1)?.mrr ?? 0;
    const plansPerDay = featureUsage.plansPerDay;
    const acceptRate = featureUsage.acceptRate;

    const dauDelta = useMemo(() => {
        if (timeseries.length < 2) return undefined;
        const prev = timeseries[timeseries.length - 2].dau;
        const curr = timeseries[timeseries.length - 1].dau;
        const diff = Math.round(((curr - prev) / prev) * 100);
        return { value: Math.abs(diff), positive: diff >= 0 };
    }, []);

    const mrrDelta = useMemo(() => {
        if (timeseries.length < 2) return undefined;
        const prev = timeseries[timeseries.length - 2].mrr;
        const curr = timeseries[timeseries.length - 1].mrr;
        const diff = Math.round(((curr - prev) / prev) * 100);
        return { value: Math.abs(diff), positive: diff >= 0 };
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <EnhancedKpiCard
                title="Số người dùng hoạt động hôm nay (DAU)"
                value={dau.toLocaleString()}
                delta={dauDelta}
                icon={Users}
            />
            <EnhancedKpiCard
                title="Doanh thu trong tháng (MRR)"
                value={formatCurrency(mrr)}
                delta={mrrDelta}
                icon={DollarSign}
            />
            <EnhancedKpiCard
                title="Plans / day"
                value={plansPerDay.toLocaleString()}
                delta={{ value: 4, positive: true }}
                icon={CalendarCheck}
            />
            <EnhancedKpiCard
                title="Acceptance rate"
                value={`${acceptRate}%`}
                delta={{ value: 2, positive: true }}
                icon={CheckCircle2}
                hint="accept vs edit/regen"
            />
        </div>
    );
};

export default KpiCardsSection;