import React from "react";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    FunnelChart,
    Funnel,
    LabelList,
    Cell,
} from "recharts";
import { Sparkles } from "lucide-react";
import { timeseries, funnelData } from "../../../constants/mockData";
import { formatCurrency } from "../../../utils/dashboardHelpers";

const PRIMARY = "#AD46FF";

// Custom chart icon
const BarChart3Icon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color ?? PRIMARY}
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect x="3" y="10" width="4" height="10" rx="1" opacity="0.25" />
        <rect x="10" y="6" width="4" height="14" rx="1" opacity="0.5" />
        <rect x="17" y="3" width="4" height="17" rx="1" opacity="0.8" />
    </svg>
);

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

const ChartsSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
            {/* Time series */}
            <div className="xl:col-span-2 bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={BarChart3Icon} title="DAU vs MRR (time series)" />
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeseries}>
                            <CartesianGrid stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="d" stroke="#71717a" tick={{ fontSize: 12 }} />
                            <YAxis
                                yAxisId="left"
                                stroke="#71717a"
                                tick={{ fontSize: 12 }}
                                width={50}
                                label={{ value: "DAU", angle: -90, position: "insideLeft", fill: "#71717a" }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#71717a"
                                tick={{ fontSize: 12 }}
                                width={60}
                                label={{ value: "MRR ($)", angle: -90, position: "insideRight", fill: "#71717a" }}
                            />
                            <Tooltip
                                formatter={(v: any, n: any) => (n === "mrr" ? formatCurrency(v as number) : v)}
                            />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="dau"
                                stroke={PRIMARY}
                                strokeWidth={2}
                                dot={false}
                                name="DAU"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="mrr"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                                name="MRR"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Funnel */}
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={Sparkles} title="Trial → Paid → Active (funnel)" />
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <FunnelChart>
                            <Funnel
                                data={funnelData}
                                dataKey="value"
                                nameKey="name"
                                isAnimationActive={false}
                            >
                                <LabelList position="right" fill="#3f3f46" stroke="none" dataKey="name" />
                                <LabelList
                                    position="inside"
                                    stroke="none"
                                    formatter={(label) =>
                                        typeof label === "number" ? label.toLocaleString() : label
                                    }
                                    dataKey="value"
                                    fill="white"
                                />
                                {funnelData.map((_, i) => (
                                    <Cell key={i} fill={PRIMARY} fillOpacity={0.9 - i * 0.2} />
                                ))}
                            </Funnel>
                        </FunnelChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-3 text-sm text-zinc-600">
                    Conv. Trial→Paid: <b>40%</b> · Paid→Active M1: <b>83%</b>
                </div>
            </div>
        </div>
    );
};

export default ChartsSection;