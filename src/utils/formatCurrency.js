export const formatCurrency = (amount = 0) => {
    const value = Number(amount) || 0;
    return `৳${new Intl.NumberFormat("en-BD").format(value)}`;
}