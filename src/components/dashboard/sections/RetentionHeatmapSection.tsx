import React from "react";
import { ShieldCheck } from "lucide-react";
import { retentionCohorts } from "../../../constants/mockData";
import { cellBg, cellText } from "../../../utils/dashboardHelpers";

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

const RetentionHeatmapSection: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5 mb-6">
            <EnhancedSectionTitle icon={ShieldCheck} title="Cohort retention (weekly)" />
            <div className="overflow-x-auto">
                <table className="min-w-[640px] w-full border-separate border-spacing-0">
                    <thead>
                        <tr>
                            <th className="text-left text-xs font-semibold text-zinc-500 py-2 pr-3">Cohort</th>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <th key={i} className="text-xs font-semibold text-zinc-500 py-2 px-1 text-center">
                                    W{i}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {retentionCohorts.map((row) => (
                            <tr key={row.cohort}>
                                <td className="text-sm text-zinc-700 py-2 pr-3 whitespace-nowrap">{row.cohort}</td>
                                {row.w.map((v, i) => (
                                    <td key={i} className="py-1 px-1">
                                        <div
                                            className="rounded-md text-xs font-medium flex items-center justify-center h-8"
                                            style={{ background: cellBg(v), color: cellText(v) }}
                                            title={`${v}%`}
                                        >
                                            {v > 0 ? `${v}%` : "--"}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 text-xs text-zinc-500">W0 = tuần onboard. Màu đậm hơn = retention cao hơn.</div>
        </div>
    );
};

export default RetentionHeatmapSection;