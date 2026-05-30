export const generateVoucherNo = (prefix) => {
    const currentYear = new Date().getFullYear();
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();
    const sequence = String(Math.floor(timestamp % 10000)).padStart(4, "0");

    return `${prefix}-${currentYear}-${sequence}`;
};
