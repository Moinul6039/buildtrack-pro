export const calculateRemainingQty = (purchasedQty, usedQty) => {
    return Number(purchasedQty) - Number(usedQty);
};

export const calculateTotalCost = (purchasedQty, unitPrice) => {
    return Number(purchasedQty) * Number(unitPrice);
};

export const prepareMaterialData = (material) => {
    const requiredQty = Number(material.requiredQty);
    const purchasedQty = Number(material.purchasedQty);
    const usedQty = Number(material.usedQty);
    const unitPrice = Number(material.unitPrice);

    return {
        ...material,
        requiredQty,
        purchasedQty,
        usedQty,
        unitPrice,
        remainingQty: calculateRemainingQty(purchasedQty, usedQty),
        totalCost: calculateTotalCost(purchasedQty, unitPrice),
    };
};