export const validateProof = (proofData, isNew = true) => {
    const errors = {};

    if (!proofData.title?.trim()) {
        errors.title = "Title is required.";
    }

    if (!proofData.category) {
        errors.category = "Category is required.";
    }

    if (!proofData.date) {
        errors.date = "Date is required.";
    }

    if (proofData.amount !== undefined && proofData.amount !== "") {
        const amount = Number(proofData.amount);

        if (Number.isNaN(amount)) {
            errors.amount = "Amount must be a valid number.";
        } else if (amount < 0) {
            errors.amount = "Amount cannot be negative.";
        }
    }

    if (isNew && !proofData.image) {
        errors.image = "Proof image is required.";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
    };
};
