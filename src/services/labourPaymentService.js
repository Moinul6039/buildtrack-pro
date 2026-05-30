import { generateId } from "../utils/generateId";
import { generateVoucherNo } from "../utils/generateVoucherNo";
import { localStorageService } from "./localStorageService";

const LABOUR_PAYMENT_STORAGE_KEY = "buildtrack_labour_payments";

const defaultLabourPayments = [];

const calculateStatus = (totalBill, paidAmount) => {
    const dueAmount = totalBill - paidAmount;

    if (dueAmount <= 0) {
        return "Paid";
    } else if (paidAmount > 0) {
        return "Partial Paid";
    } else {
        return "Due";
    }
};

export const labourPaymentService = {
    getLabourPayments() {
        return localStorageService.get(
            LABOUR_PAYMENT_STORAGE_KEY,
            defaultLabourPayments
        );
    },

    saveLabourPayments(payments) {
        localStorageService.set(LABOUR_PAYMENT_STORAGE_KEY, payments);
        return payments;
    },

    addLabourPayment(paymentData) {
        const payments = this.getLabourPayments();

        const totalBill =
            paymentData.workerCount *
            paymentData.dailyWage *
            paymentData.workDays;
        const dueAmount = totalBill - paymentData.paidAmount;

        const newPayment = {
            ...paymentData,
            id: generateId("labpay"),
            voucherNo: generateVoucherNo("LAB"),
            totalBill,
            dueAmount,
            status: calculateStatus(totalBill, paymentData.paidAmount),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const updatedPayments = [newPayment, ...payments];
        return this.saveLabourPayments(updatedPayments);
    },

    updateLabourPayment(paymentId, paymentData) {
        const payments = this.getLabourPayments();

        const totalBill =
            paymentData.workerCount *
            paymentData.dailyWage *
            paymentData.workDays;
        const dueAmount = totalBill - paymentData.paidAmount;

        const updatedPayments = payments.map((payment) =>
            payment.id === paymentId
                ? {
                    ...payment,
                    ...paymentData,
                    totalBill,
                    dueAmount,
                    status: calculateStatus(totalBill, paymentData.paidAmount),
                    updatedAt: new Date().toISOString(),
                }
                : payment
        );

        return this.saveLabourPayments(updatedPayments);
    },

    deleteLabourPayment(paymentId) {
        const payments = this.getLabourPayments();
        const updatedPayments = payments.filter((payment) => payment.id !== paymentId);
        return this.saveLabourPayments(updatedPayments);
    },

    getTotalLabourBill() {
        const payments = this.getLabourPayments();
        return payments.reduce((total, payment) => total + payment.totalBill, 0);
    },

    getTotalLabourPaid() {
        const payments = this.getLabourPayments();
        return payments.reduce((total, payment) => total + payment.paidAmount, 0);
    },

    getTotalLabourDue() {
        const payments = this.getLabourPayments();
        return payments.reduce((total, payment) => total + payment.dueAmount, 0);
    },
};
