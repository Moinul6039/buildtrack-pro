export const calculateTotalMaterialCost = (materials) => {
    return materials.reduce((total, material) => total + (Number(material.totalCost) || 0), 0);
};

export const calculateTotalExpense = (expenses) => {
    return expenses.reduce((total, expense) => total + (Number(expense.amount) || 0), 0);
};

export const calculateUsedBudget = (materials, expenses) => {
    return calculateTotalMaterialCost(materials) + calculateTotalExpense(expenses);
};

export const calculateRemainingBudget = (totalBudget, usedBudget) => {
    return Number(totalBudget) - Number(usedBudget);
};

export const calculateBudgetUsagePercentage = (totalBudget, usedBudget) => {
    const budget = Number(totalBudget);
    if (!budget || budget <= 0) {
        return 0;
    }

    const percentage = (Number(usedBudget) / budget) * 100;
    return Math.min(100, Number(percentage.toFixed(1)));
};
