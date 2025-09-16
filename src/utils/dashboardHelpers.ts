/** Utility functions for Dashboard */

/** Format currency with VND symbol */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(amount);
};

/** Get background color class for cells based on value */
export const cellBg = (val: number): string => {
    if (val >= 50) return "bg-green-100";
    if (val >= 30) return "bg-yellow-100";
    if (val >= 15) return "bg-orange-100";
    return "bg-red-100";
};

/** Get text color class for cells based on value */
export const cellText = (val: number): string => {
    if (val >= 50) return "text-green-800";
    if (val >= 30) return "text-yellow-800";
    if (val >= 15) return "text-orange-800";
    return "text-red-800";
};

/** Format percentage */
export const formatPercent = (value: number): string => {
    return `${value}%`;
};

/** Format number with thousands separator */
export const formatNumber = (value: number): string => {
    return value.toLocaleString();
};

/** Format milliseconds for display */
export const formatMs = (ms: number): string => {
    return `${ms}ms`;
};