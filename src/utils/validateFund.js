export const validateFund = (formData) => {
    const errors = {};

    const amount = Number(formData.amount);

    if (!formData.receivedFrom.trim()) {
        errors.receivedFrom = "Received from is required";
    }

    if (formData.amount === "" || amount <= 0) {
        errors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
        errors.date = "Date is required";
    }

    if (!formData.paymentMethod) {
        errors.paymentMethod = "Payment method is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
