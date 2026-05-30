import { generateId } from "../utils/generateId";
import { generateVoucherNo } from "../utils/generateVoucherNo";
import { localStorageService } from "./localStorageService";

const CASHBOOK_STORAGE_KEY = "buildtrack_cash_book";

const defaultCashBook = [];

export const cashBookService = {
    getCashEntries() {
        return localStorageService.get(CASHBOOK_STORAGE_KEY, defaultCashBook);
    },

    saveCashEntries(entries) {
        localStorageService.set(CASHBOOK_STORAGE_KEY, entries);
        return entries;
    },

    addCashEntry(entryData) {
        const entries = this.getCashEntries();

        const newEntry = {
            ...entryData,
            id: generateId("cash"),
            voucherNo: generateVoucherNo(entryData.type === "Cash In" ? "CASH_IN" : "CASH_OUT"),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const updatedEntries = [newEntry, ...entries];
        return this.saveCashEntries(updatedEntries);
    },

    updateCashEntry(entryId, entryData) {
        const entries = this.getCashEntries();

        const updatedEntries = entries.map((entry) =>
            entry.id === entryId
                ? {
                    ...entry,
                    ...entryData,
                    updatedAt: new Date().toISOString(),
                }
                : entry
        );

        return this.saveCashEntries(updatedEntries);
    },

    deleteCashEntry(entryId) {
        const entries = this.getCashEntries();
        const updatedEntries = entries.filter((entry) => entry.id !== entryId);
        return this.saveCashEntries(updatedEntries);
    },

    getTotalCashIn() {
        const entries = this.getCashEntries();
        return entries
            .filter((entry) => entry.type === "Cash In")
            .reduce((total, entry) => total + entry.amount, 0);
    },

    getTotalCashOut() {
        const entries = this.getCashEntries();
        return entries
            .filter((entry) => entry.type === "Cash Out")
            .reduce((total, entry) => total + entry.amount, 0);
    },

    getClosingBalance() {
        return this.getTotalCashIn() - this.getTotalCashOut();
    },
};
