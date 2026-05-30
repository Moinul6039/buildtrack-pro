export const validateLabourPayment = (formData) => {
    const errors = {};

    const workerCount = Number(formData.workerCount);
    const dailyWage = Number(formData.dailyWage);
    const workDays = Number(formData.workDays);
    const totalBill = workerCount * dailyWage * workDays;
    const paidAmount = Number(formData.paidAmount);

    if (!formData.labourGroupName.trim()) {
        errors.labourGroupName = "Labour group name is required";
    }

    if (!formData.workType.trim()) {
        errors.workType = "Work type is required";
    }

    if (formData.workerCount === "" || workerCount <= 0) {
        errors.workerCount = "Worker count must be greater than 0";
    }

    if (formData.dailyWage === "" || dailyWage <= 0) {
        errors.dailyWage = "Daily wage must be greater than 0";
    }

    if (formData.workDays === "" || workDays <= 0) {
        errors.workDays = "Work days must be greater than 0";
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

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
