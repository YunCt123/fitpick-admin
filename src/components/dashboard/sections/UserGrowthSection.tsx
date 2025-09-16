import React from "react";
import { Users, ChefHat, DatabaseZap } from "lucide-react";
import { signupsBySource, featureUsage } from "../../../constants/mockData";
import { Bar } from "../../ui/DashboardComponents";

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

const UserGrowthSection: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={Users} title="Sign-ups theo nguồn" />
                <div className="space-y-3">
                    {signupsBySource.map((r) => (
                        <div key={r.src} className="flex items-center justify-between">
                            <div className="text-sm text-zinc-700">{r.src}</div>
                            <div className="text-sm text-zinc-500">
                                <span className="mr-3">{r.daily}/day</span>
                                <span className="text-zinc-400">·</span>{" "}
                                <span className="ml-3">{r.weekly}/week</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-xs text-zinc-500">
                    Stickiness (DAU/MAU): <b>31%</b> · Activation (≥X% profile): <b>64%</b>
                </div>
            </div>

            {/* Meal Planning core usage - IMPROVED */}
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={ChefHat} title="Meal Planning — phân bổ hành vi" />
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-zinc-700 font-medium min-w-[120px]">Accept</span>
                        <Bar
                            width={`${featureUsage.acceptRate}%`}
                            size="default"
                            className="h-2 bg-emerald-500 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-zinc-700 font-medium min-w-[120px]">Edit</span>
                        <Bar
                            width={`${featureUsage.editRate}%`}
                            size="default"
                            className="h-2 bg-blue-500 rounded"
                        />
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-zinc-700 font-medium min-w-[120px]">Regenerate/Skip</span>
                        <Bar
                            width={`${featureUsage.regenOrSkip}%`}
                            size="default"
                            className="h-2 bg-amber-500 rounded"
                        />
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="text-zinc-500">
                            <span className="font-medium block mb-1">Job runtime p95:</span>
                            <span className="text-zinc-900 font-semibold text-sm">{featureUsage.jobRuntimeMsP95}ms</span>
                        </div>
                        <div className="text-zinc-500">
                            <span className="font-medium block mb-1">Đã đánh dấu "đã nấu":</span>
                            <span className="text-zinc-900 font-semibold text-sm">{featureUsage.cookedMarked.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ingredients & substitutions */}
            <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 lg:p-5">
                <EnhancedSectionTitle icon={DatabaseZap} title="Nguyên liệu & thay thế" />
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-zinc-700 font-medium min-w-[120px]">Tỷ lệ dùng substitution</span>
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
                                <div
                                    className="h-2 rounded-full"
                                    style={{ width: "23%", backgroundColor: "#f97316" }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium min-w-[2rem] text-right">23%</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-zinc-700 font-medium min-w-[120px]">Pantry adoption</span>
                        <div className="flex items-center gap-2 min-w-0">
                            <div className="w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
                                <div
                                    className="h-2 rounded-full"
                                    style={{ width: "58%", backgroundColor: "#10b981" }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium min-w-[2rem] text-right">58%</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-100">
                    <div className="text-xs text-zinc-500 mb-2 font-medium">Top nguyên liệu thiếu (gây regenerate)</div>
                    <ul className="text-sm text-zinc-700 space-y-1.5">
                        <li>Greek yogurt · quinoa · almond milk</li>
                        <li>Gluten-free pasta · kale · tofu</li>
                        <li>Chicken breast · broccoli · brown rice</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserGrowthSection;