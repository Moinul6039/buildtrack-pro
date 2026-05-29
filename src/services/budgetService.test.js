import { beforeEach, describe, expect, it, vi } from "vitest";
import { budgetService } from "./budgetService";
import { defaultBudget } from "../data/defaultBudget";

let storage = {};

beforeEach(() => {
    storage = {};

    vi.stubGlobal("localStorage", {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(storage, key)
                ? storage[key]
                : null;
        },
        setItem(key, value) {
            storage[key] = String(value);
        },
        removeItem(key) {
            delete storage[key];
        },
        clear() {
            storage = {};
        },
    });
});

describe("budgetService", () => {
    it("returns default budget when none is saved", () => {
        const budget = budgetService.getBudget();

        expect(budget).toEqual(defaultBudget);
    });

    it("saves budget data and converts totalBudget to number", () => {
        const savedBudget = budgetService.saveBudget({
            projectName: "Project X",
            totalBudget: "6500000",
        });

        expect(savedBudget.projectName).toBe("Project X");
        expect(savedBudget.totalBudget).toBe(6500000);
        expect(savedBudget.updatedAt).toBeTruthy();

        const stored = JSON.parse(localStorage.getItem("buildtrack_budget"));
        expect(stored.projectName).toBe("Project X");
        expect(stored.totalBudget).toBe(6500000);
    });

    it("updates existing budget and saves updatedAt", () => {
        const firstSave = budgetService.saveBudget({
            projectName: "Project X",
            totalBudget: "6500000",
        });

        const secondSave = budgetService.updateBudget({
            projectName: "Project Y",
            totalBudget: "7200000",
        });

        expect(secondSave.projectName).toBe("Project Y");
        expect(secondSave.totalBudget).toBe(7200000);
        expect(secondSave.updatedAt).toBeTruthy();
        expect(typeof secondSave.updatedAt).toBe("string");
        expect(secondSave.updatedAt).toEqual(expect.stringMatching(/\d{4}-\d{2}-\d{2}T/));
    });
});
