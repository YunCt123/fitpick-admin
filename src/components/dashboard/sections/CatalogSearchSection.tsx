import React from "react";
import { Globe, Search } from "lucide-react";
import { catalogTags, topQueries } from "../../../constants/mockData";
import { Stat } from "../../ui/DashboardComponents";

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

const CatalogSearchSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={Globe} title="Catalog & UGC" />
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {catalogTags.map((t) => (
                        <div
                            key={t.tag}
                            className="rounded-lg border border-zinc-100 p-3 flex items-center justify-between"
                            style={{ backgroundColor: `${PRIMARY}0D` }}
                        >
                            <span className="text-sm text-zinc-700">#{t.tag}</span>
                            <span className="text-sm font-medium text-zinc-900">{t.total}</span>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                    <Stat label="Món mới/ngày" value="54" />
                    <Stat label="% UGC" value="37%" />
                    <Stat label="Moderation" value="12 chờ · 3 flagged" />
                </div>
                <div className="mt-4 text-xs text-zinc-500">Top cooked/save/share hiển thị ở trang chi tiết.</div>
            </div>

            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={Search} title="Search & khám phá" />
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px]">
                        <thead>
                            <tr className="text-xs text-zinc-500">
                                <th className="text-left py-2">Query</th>
                                <th className="text-right">CTR</th>
                                <th className="text-right">Zero-result</th>
                                <th className="text-right">TTFR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topQueries.map((q) => (
                                <tr key={q.q} className="text-sm text-zinc-700 border-t border-zinc-100">
                                    <td className="py-2">{q.q}</td>
                                    <td className="text-right">{q.ctr}%</td>
                                    <td className="text-right">{q.zero ? "Yes" : "No"}</td>
                                    <td className="text-right">{q.ttfr_ms} ms</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 text-xs text-zinc-500">
                    Zero-result rate: <b>6%</b> · CTR từ search → mở món: <b>15%</b>
                </div>
            </div>
        </div>
    );
};

export default CatalogSearchSection;