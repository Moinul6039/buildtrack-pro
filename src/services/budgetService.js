import { defaultBudget } from "../data/defaultBudget";
import { localStorageService } from "./localStorageService";

const BUDGET_STORAGE_KEY = "buildtrack_budget";

export const budgetService = {
    getBudget() {
        return localStorageService.get(BUDGET_STORAGE_KEY, defaultBudget);
    },

    saveBudget(budgetData) {
        const budgetToSave = {
            ...budgetData,
            totalBudget: Number(budgetData.totalBudget),
            createdAt: budgetData.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        localStorageService.set(BUDGET_STORAGE_KEY, budgetToSave);
        return budgetToSave;
    },

    updateBudget(budgetData) {
        const currentBudget = this.getBudget();

        const updatedBudget = {
            ...currentBudget,
            ...budgetData,
            totalBudget: Number(budgetData.totalBudget),
            createdAt: currentBudget.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        localStorageService.set(BUDGET_STORAGE_KEY, updatedBudget);
        return updatedBudget;
    },
};
