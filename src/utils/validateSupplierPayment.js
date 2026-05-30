export const validateSupplierPayment = (formData) => {
    const errors = {};

    const totalBill = Number(formData.totalBill);
    const paidAmount = Number(formData.paidAmount);

    if (!formData.supplierName.trim()) {
        errors.supplierName = "Supplier name is required";
    }

    if (!formData.materialName.trim()) {
        errors.materialName = "Material name is required";
    }

    if (formData.totalBill === "" || totalBill <= 0) {
        errors.totalBill = "Total bill must be greater than 0";
    }

    if (formData.paidAmount === "" || paidAmount < 0) {
        errors.paidAmount = "Paid amount cannot be negative";
    }

    if (paidAmount > totalBill) {
        errors.paidAmount = "Paid amount cannot be greater than total bill";
    }

    if (!formData.paymentDate) {
        errors.paymentDate = "Payment date is required";
    }

    if (!formData.paymentMethod) {
        errors.paymentMethod = "Payment method is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
