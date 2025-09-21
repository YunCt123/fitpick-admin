import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import type { RevenuePoint } from "@/models/Dashboard/DashboardModel";

const PRIMARY = "#AD46FF";
const PRIMARY_600 = "#8640E6";

export function RevenueBar(props: { data: RevenuePoint[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.data} margin={{ left: -10, right: 10 }}>
                <defs>
                    <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={PRIMARY} stopOpacity={1} />
                        <stop offset="100%" stopColor={PRIMARY_600} stopOpacity={1} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#E2E8F0" />
                <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#64748B" }}
                    tickMargin={8}
                    axisLine={{ stroke: "#E2E8F0" }}
                />
                <YAxis
                    tick={{ fontSize: 12, fill: "#64748B" }}
                    axisLine={{ stroke: "#E2E8F0" }}
                    tickCount={6}
                />
                <Tooltip
                    cursor={{ fill: "rgba(99,102,241,0.08)" }}
                    labelStyle={{ color: "#0f172a" }}
                    contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0" }}
                    formatter={(v: number) => [`${v}M`, "Doanh thu"]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="url(#barColor)" />
            </BarChart>
        </ResponsiveContainer>
    );
}
