import React from "react";

export function StatCard(props: {
    icon: React.ReactNode;
    title: string;
    value: string;
    delta?: number;   // 0.032 => 3.2%
    loading?: boolean;
}) {
    const deltaText =
        props.delta !== undefined
            ? `${props.delta >= 0 ? "+" : ""}${(props.delta * 100).toFixed(1)}% tháng này`
            : null;

    if (props.loading) {
        return (
            <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-5">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
                    <div className="h-3 w-24 rounded bg-slate-100 animate-pulse" />
                </div>
                <div className="mt-3 h-8 w-40 rounded bg-slate-100 animate-pulse" />
                <div className="mt-2 h-3 w-28 rounded bg-slate-100 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white shadow-sm border border-slate-100 p-5">
            <div className="flex items-center gap-3 text-slate-700">
                <div className="h-10 w-10 rounded-full bg-violet-50 flex items-center justify-center">
                    {props.icon}
                </div>
                <span className="text-sm font-medium">{props.title}</span>
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">{props.value}</div>
            {deltaText && (
                <div className="mt-1 text-xs font-medium text-emerald-600">{deltaText}</div>
            )}
        </div>
    );
}
