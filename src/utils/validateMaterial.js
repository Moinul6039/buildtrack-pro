export const validateMaterial = (formData) => {
    const errors = {};

    const requiredQty = Number(formData.requiredQty);
    const purchasedQty = Number(formData.purchasedQty);
    const usedQty = Number(formData.usedQty);
    const unitPrice = Number(formData.unitPrice);

    if (!formData.name.trim()) {
        errors.name = "Material name is required";
    }

    if (!formData.category) {
        errors.category = "Category is required";
    }

    if (!formData.unit) {
        errors.unit = "Unit is required";
    }

    if (!formData.requiredQty || requiredQty <= 0) {
        errors.requiredQty = "Required quantity must be greater than 0";
    }

    if (formData.purchasedQty === "" || purchasedQty < 0) {
        errors.purchasedQty = "Purchased quantity cannot be negative";
    }

    if (formData.usedQty === "" || usedQty < 0) {
        errors.usedQty = "Used quantity cannot be negative";
    }

    if (!formData.unitPrice || unitPrice <= 0) {
        errors.unitPrice = "Unit price must be greater than 0";
    }

    if (purchasedQty > requiredQty) {
        errors.purchasedQty = "Purchased quantity cannot be greater than required quantity";
    }

    if (usedQty > purchasedQty) {
        errors.usedQty = "Used quantity cannot be greater than purchased quantity";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};