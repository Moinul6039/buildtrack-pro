import { describe, expect, it } from "vitest";
import {
    calculateTotalMaterialCost,
    calculateTotalExpense,
    calculateUsedBudget,
    calculateRemainingBudget,
    calculateBudgetUsagePercentage,
} from "./calculateBudget";

describe("calculateBudget utilities", () => {
    it("calculates total material cost", () => {
        const materials = [
            { totalCost: 1000 },
            { totalCost: 2500 },
            { totalCost: 0 },
        ];

        expect(calculateTotalMaterialCost(materials)).toBe(3500);
    });

    it("calculates total expense", () => {
        const expenses = [
            { amount: 1200 },
            { amount: 300 },
            { amount: 500 },
        ];

        expect(calculateTotalExpense(expenses)).toBe(2000);
    });

    it("calculates used budget from materials and expenses", () => {
        const materials = [{ totalCost: 1500 }];
        const expenses = [{ amount: 500 }, { amount: 200 }];

        expect(calculateUsedBudget(materials, expenses)).toBe(2200);
    });

    it("calculates remaining budget correctly", () => {
        expect(calculateRemainingBudget(10000, 2500)).toBe(7500);
    });

    it("calculates budget usage percentage correctly", () => {
        expect(calculateBudgetUsagePercentage(10000, 2500)).toBe(25);
        expect(calculateBudgetUsagePercentage(0, 2500)).toBe(0);
    });
});
