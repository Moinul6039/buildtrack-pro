import { defaultExpenses } from "../data/defaultExpenses";
import { generateId } from "../utils/generateId";
import { localStorageService } from "./localStorageService";

const EXPENSE_STORAGE_KEY = "buildtrack_expenses";

export const expenseService = {
    getExpenses() {
        return localStorageService.get(EXPENSE_STORAGE_KEY, defaultExpenses);
    },

    saveExpenses(expenses) {
        localStorageService.set(EXPENSE_STORAGE_KEY, expenses);
        return expenses;
    },

    addExpense(expenseData) {
        const expenses = this.getExpenses();
        const newExpense = {
            ...expenseData,
            id: generateId("exp"),
            amount: Number(expenseData.amount),
            createdAt: new Date().toISOString(),
        };

        const updatedExpenses = [newExpense, ...expenses];
        return this.saveExpenses(updatedExpenses);
    },

    updateExpense(expenseId, expenseData) {
        const expenses = this.getExpenses();

        const updatedExpenses = expenses.map((expense) =>
            expense.id === expenseId
                ? {
                    ...expense,
                    ...expenseData,
                    amount: Number(expenseData.amount),
                    updatedAt: new Date().toISOString(),
                }
                : expense
        );

        return this.saveExpenses(updatedExpenses);
    },

    deleteExpense(expenseId) {
        const expenses = this.getExpenses();
        const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);

        return this.saveExpenses(updatedExpenses);
    },
};
