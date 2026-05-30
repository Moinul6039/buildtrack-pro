import { defaultFunds } from "../data/defaultFunds";
import { generateId } from "../utils/generateId";
import { generateVoucherNo } from "../utils/generateVoucherNo";
import { localStorageService } from "./localStorageService";

const FUND_STORAGE_KEY = "buildtrack_funds";

export const fundService = {
    getFunds() {
        return localStorageService.get(FUND_STORAGE_KEY, defaultFunds);
    },

    saveFunds(funds) {
        localStorageService.set(FUND_STORAGE_KEY, funds);
        return funds;
    },

    addFund(fundData) {
        const funds = this.getFunds();

        const newFund = {
            ...fundData,
            id: generateId("fund"),
            voucherNo: generateVoucherNo("FUND"),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const updatedFunds = [newFund, ...funds];
        return this.saveFunds(updatedFunds);
    },

    updateFund(fundId, fundData) {
        const funds = this.getFunds();

        const updatedFunds = funds.map((fund) =>
            fund.id === fundId
                ? {
                    ...fund,
                    ...fundData,
                    updatedAt: new Date().toISOString(),
                }
                : fund
        );

        return this.saveFunds(updatedFunds);
    },

    deleteFund(fundId) {
        const funds = this.getFunds();
        const updatedFunds = funds.filter((fund) => fund.id !== fundId);
        return this.saveFunds(updatedFunds);
    },

    getTotalFundReceived() {
        const funds = this.getFunds();
        return funds.reduce((total, fund) => total + fund.amount, 0);
    },
};
