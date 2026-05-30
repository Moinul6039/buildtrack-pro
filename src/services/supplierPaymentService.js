import { generateId } from "../utils/generateId";
import { generateVoucherNo } from "../utils/generateVoucherNo";
import { localStorageService } from "./localStorageService";

const SUPPLIER_PAYMENT_STORAGE_KEY = "buildtrack_supplier_payments";

const defaultSupplierPayments = [];

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

export const supplierPaymentService = {
    getSupplierPayments() {
        return localStorageService.get(
            SUPPLIER_PAYMENT_STORAGE_KEY,
            defaultSupplierPayments
        );
    },

    saveSupplierPayments(payments) {
        localStorageService.set(SUPPLIER_PAYMENT_STORAGE_KEY, payments);
        return payments;
    },

    addSupplierPayment(paymentData) {
        const payments = this.getSupplierPayments();

        const dueAmount = paymentData.totalBill - paymentData.paidAmount;

        const newPayment = {
            ...paymentData,
            id: generateId("suppay"),
            voucherNo: generateVoucherNo("SUP"),
            dueAmount,
            status: calculateStatus(paymentData.totalBill, paymentData.paidAmount),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const updatedPayments = [newPayment, ...payments];
        return this.saveSupplierPayments(updatedPayments);
    },

    updateSupplierPayment(paymentId, paymentData) {
        const payments = this.getSupplierPayments();

        const updatedPayments = payments.map((payment) =>
            payment.id === paymentId
                ? {
                    ...payment,
                    ...paymentData,
                    dueAmount: paymentData.totalBill - paymentData.paidAmount,
                    status: calculateStatus(
                        paymentData.totalBill,
                        paymentData.paidAmount
                    ),
                    updatedAt: new Date().toISOString(),
                }
                : payment
        );

        return this.saveSupplierPayments(updatedPayments);
    },

    deleteSupplierPayment(paymentId) {
        const payments = this.getSupplierPayments();
        const updatedPayments = payments.filter((payment) => payment.id !== paymentId);
        return this.saveSupplierPayments(updatedPayments);
    },

    getTotalSupplierBill() {
        const payments = this.getSupplierPayments();
        return payments.reduce((total, payment) => total + payment.totalBill, 0);
    },

    getTotalSupplierPaid() {
        const payments = this.getSupplierPayments();
        return payments.reduce((total, payment) => total + payment.paidAmount, 0);
    },

    getTotalSupplierDue() {
        const payments = this.getSupplierPayments();
        return payments.reduce((total, payment) => total + payment.dueAmount, 0);
    },
};
