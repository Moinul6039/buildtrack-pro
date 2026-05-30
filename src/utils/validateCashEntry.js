export const validateCashEntry = (formData) => {
    const errors = {};

    const amount = Number(formData.amount);

    if (!formData.type) {
        errors.type = "Type is required";
    }

    if (!formData.title.trim()) {
        errors.title = "Title is required";
    }

    if (formData.amount === "" || amount <= 0) {
        errors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
        errors.date = "Date is required";
    }

    if (!formData.category) {
        errors.category = "Category is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
