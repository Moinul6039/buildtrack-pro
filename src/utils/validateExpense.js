export const validateExpense = (formData) => {
    const errors = {};
    const amount = Number(formData.amount);

    if (!formData.title || !formData.title.trim()) {
        errors.title = "Title is required";
    }

    if (!formData.category) {
        errors.category = "Category is required";
    }

    if (!formData.amount || Number.isNaN(amount) || amount <= 0) {
        errors.amount = "Amount must be greater than 0";
    }

    if (!formData.date) {
        errors.date = "Date is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
