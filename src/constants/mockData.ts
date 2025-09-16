/** Mock data for Dashboard - replace with real data from services */

export const timeseries = [
    { d: "09-01", dau: 8200, mrr: 12100 },
    { d: "09-02", dau: 8400, mrr: 12150 },
    { d: "09-03", dau: 8600, mrr: 12220 },
    { d: "09-04", dau: 8100, mrr: 12280 },
    { d: "09-05", dau: 9000, mrr: 12340 },
    { d: "09-06", dau: 9400, mrr: 12420 },
    { d: "09-07", dau: 9800, mrr: 12490 },
    { d: "09-08", dau: 9600, mrr: 12530 },
    { d: "09-09", dau: 9900, mrr: 12590 },
    { d: "09-10", dau: 10200, mrr: 12660 },
    { d: "09-11", dau: 10400, mrr: 12710 },
    { d: "09-12", dau: 10850, mrr: 12840 },
];

export const funnelData = [
    { name: "Trial", value: 5200 },
    { name: "Paid", value: 2100 },
    { name: "Active (M1)", value: 1750 },
];

export const retentionCohorts = [
    { cohort: "Aug 18–24", w: [100, 46, 34, 28, 24, 20, 17, 15] },
    { cohort: "Aug 25–31", w: [100, 48, 36, 30, 25, 22, 18, 16] },
    { cohort: "Sep 01–07", w: [100, 52, 39, 33, 27, 23, 19, 17] },
    { cohort: "Sep 08–14", w: [100, 55, 41, 35, 29, 24, 0, 0] },
];

export const signupsBySource = [
    { src: "Organic", daily: 220, weekly: 1410 },
    { src: "Referral", daily: 90, weekly: 540 },
    { src: "Ads", daily: 150, weekly: 980 },
];

export const catalogTags = [
    { tag: "low-carb", total: 480 },
    { tag: "vegan", total: 310 },
    { tag: "gluten-free", total: 205 },
    { tag: "high-protein", total: 560 },
];

export const topQueries = [
    { q: "chicken breast", ctr: 18, zero: false, ttfr_ms: 180 },
    { q: "vegan pasta", ctr: 14, zero: false, ttfr_ms: 220 },
    { q: "bun cha", ctr: 7, zero: true, ttfr_ms: 190 },
    { q: "gluten free snack", ctr: 12, zero: false, ttfr_ms: 210 },
];

export const regions = [
    { name: "VN - HCMC", revenue: 5600 },
    { name: "VN - Ha Noi", revenue: 4200 },
    { name: "US", revenue: 2300 },
    { name: "EU", revenue: 1950 },
];

export const paymentBreakdown = [
    { method: "Card", percent: 62 },
    { method: "Momo", percent: 18 },
    { method: "ZaloPay", percent: 11 },
    { method: "Other", percent: 9 },
];

export const featureUsage = {
    plansPerDay: 6420,
    jobRuntimeMsP95: 920, // meal plan generator
    acceptRate: 61, // %
    editRate: 24, // %
    regenOrSkip: 15, // %
    cookedMarked: 3120, // items marked "đã nấu"
    groceryExport: 1480,
    partnerClickRate: 8, // %
};

export const sre = {
    error4xx: 1.1, // %
    error5xx: 0.24, // %
    p95: 320, // ms
    p99: 680, // ms
    jobs: [
        { name: "Meal Plan Generator", status: "ok" as const, last: "2m ago" },
        { name: "Export Image", status: "ok" as const, last: "5m ago" },
        { name: "Email/Push Worker", status: "warn" as const, last: "9m ago" },
    ],
    dunning: { failed: 42, recovered: 19, refunds: 7, chargebacks: 1 },
};