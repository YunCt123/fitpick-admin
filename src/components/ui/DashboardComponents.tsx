/** Reusable UI components for Dashboard */

import React from 'react';

/** KPI Card component */
export const KpiCard = ({ title, value, delta }: {
    title: string;
    value: string;
    delta?: string;
}) => (
    <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-sm font-medium text-gray-700 mb-1">{title}</h3>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {delta && <div className="text-sm text-gray-500 mt-1">{delta}</div>}
    </div>
);

/** Section title component */
export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-lg font-semibold text-gray-900 mb-3">{children}</h2>
);

/** Stat component with improved styling */
export const Stat = ({ label, value }: { label: string; value: string }) => (
    <div className="rounded-lg border border-zinc-100 p-3 bg-white">
        <div className="text-xs text-zinc-500 mb-1 leading-tight">{label}</div>
        <div className="text-sm font-semibold text-zinc-900 leading-tight">{value}</div>
    </div>
);

/** Progress label component */
export const ProgressLabel = ({
    children,
    className = "text-xs text-gray-600 mb-1"
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={className}>{children}</div>
);

/** Progress bar component with better alignment */
export const Bar = ({
    width,
    className = "h-2 bg-blue-500 rounded",
    showPercentage = true,
    size = "default"
}: {
    width: string;
    className?: string;
    showPercentage?: boolean;
    size?: "small" | "default" | "large";
}) => {
    const containerWidths = {
        small: "w-16",
        default: "w-24",
        large: "w-32"
    };

    const heights = {
        small: "h-1.5",
        default: "h-2",
        large: "h-3"
    };

    return (
        <div className="flex items-center gap-2 min-w-0">
            <div className={`${containerWidths[size]} bg-gray-200 rounded-full ${heights[size]} flex-shrink-0`}>
                <div className={`${className} ${heights[size]}`} style={{ width }}></div>
            </div>
            {showPercentage && (
                <span className="text-xs text-gray-500 font-medium min-w-[2rem] text-right">
                    {width}
                </span>
            )}
        </div>
    );
};

/** Status dot component */
export const StatusDot = ({ status }: { status: 'ok' | 'warn' | 'error' }) => {
    const colors = {
        ok: 'bg-green-400',
        warn: 'bg-yellow-400',
        error: 'bg-red-400'
    };

    return <div className={`w-2 h-2 rounded-full ${colors[status]}`}></div>;
};