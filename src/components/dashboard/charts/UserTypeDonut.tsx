import {
    ResponsiveContainer, PieChart, Pie, Cell, Label,
} from "recharts";
import type { UserTypeItem } from "@/models/Dashboard/DashboardModel";

const PRIMARY = "#AD46FF";
const PRIMARY_300 = "#C78CFF";
const INDIGO_400 = "#6366F1";

const colorByName: Record<string, string> = {
    Premium: PRIMARY,
    User: INDIGO_400,
    Guest: PRIMARY_300,
};

export function UserTypeDonut(props: {
    data: UserTypeItem[];
    centerLabel: string;
}) {
    const data = (props.data ?? []).map((d) => ({
        ...d,
        color: d.color ?? colorByName[d.name] ?? PRIMARY,
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                >
                    {data.map((d, i) => (
                        <Cell key={i} fill={d.color!} />
                    ))}
                    <Label
                        position="center"
                        content={(p: any) => {
                            const { cx, cy } = p;
                            if (typeof cx === "number" && typeof cy === "number") {
                                return (
                                    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                                        <tspan className="fill-slate-900" fontSize="22" fontWeight={700}>
                                            {props.centerLabel}
                                        </tspan>
                                    </text>
                                );
                            }
                            return null;
                        }}
                    />
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
}
