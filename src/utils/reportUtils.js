import { formatCurrency } from "./formatCurrency";

export const filterByDateRange = (data = [], dateField, fromDate, toDate) => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    return data.filter((item) => {
        const dateValue = item[dateField] ? new Date(item[dateField]) : null;
        if (!dateValue) return false;

        if (from && dateValue < from) {
            return false;
        }

        if (to) {
            const endOfTo = new Date(to);
            endOfTo.setHours(23, 59, 59, 999);
            if (dateValue > endOfTo) {
                return false;
            }
        }

        return true;
    });
};

export const getMaterialReport = (materials) => {
    const rows = materials.map((material) => ({
        name: material.name,
        category: material.category,
        requiredQty: material.requiredQty,
        purchasedQty: material.purchasedQty,
        usedQty: material.usedQty,
        remainingQty: material.remainingQty,
        unitPrice: formatCurrency(material.unitPrice),
        totalCost: formatCurrency(material.totalCost),
    }));

    return {
        title: "Material Report",
        summary: [
            { label: "Total Materials", value: materials.length },
            { label: "Total Cost", value: formatCurrency(materials.reduce((sum, item) => sum + item.totalCost, 0)) },
        ],
        columns: [
            "Name",
            "Category",
            "Required Qty",
            "Purchased Qty",
            "Used Qty",
            "Remaining Qty",
            "Unit Price",
            "Total Cost",
        ],
        rows: rows.map((item) => Object.values(item)),
        excelData: rows,
    };
};

export const getExpenseReport = (expenses, filters = {}) => {
    const filtered = expenses
        .filter((expense) => {
            if (filters.category && expense.category !== filters.category) {
                return false;
            }
            return true;
        })
        .map((expense) => ({
            date: expense.date,
            title: expense.title,
            category: expense.category,
            amount: formatCurrency(expense.amount),
            note: expense.note || "-",
        }));

    return {
        title: "Expense Report",
        summary: [
            { label: "Total Expenses", value: filtered.length },
            { label: "Total Amount", value: formatCurrency(expenses.reduce((sum, item) => sum + item.amount, 0)) },
        ],
        columns: ["Date", "Title", "Category", "Amount", "Note"],
        rows: filtered.map((item) => Object.values(item)),
        excelData: filtered,
    };
};

export const getFundReport = (funds, filters = {}) => {
    const filtered = funds
        .filter((fund) => {
            if (filters.paymentMethod && fund.paymentMethod !== filters.paymentMethod) {
                return false;
            }
            return true;
        })
        .map((fund) => ({
            voucherNo: fund.voucherNo,
            date: fund.date,
            receivedFrom: fund.receivedFrom,
            amount: formatCurrency(fund.amount),
            paymentMethod: fund.paymentMethod,
            note: fund.note || "-",
        }));

    return {
        title: "Fund Received Report",
        summary: [
            { label: "Total Funds", value: filtered.length },
            { label: "Total Received", value: formatCurrency(funds.reduce((sum, item) => sum + item.amount, 0)) },
        ],
        columns: ["Voucher No", "Date", "Received From", "Amount", "Payment Method", "Note"],
        rows: filtered.map((item) => Object.values(item)),
        excelData: filtered,
    };
};

export const getCashBookReport = (entries, filters = {}) => {
    const filtered = entries
        .filter((entry) => {
            if (filters.type && entry.type !== filters.type) {
                return false;
            }
            if (filters.category && entry.category !== filters.category) {
                return false;
            }
            return true;
        })
        .map((entry) => ({
            voucherNo: entry.voucherNo,
            date: entry.date,
            type: entry.type,
            title: entry.title,
            category: entry.category,
            amount: formatCurrency(entry.amount),
            note: entry.note || "-",
        }));

    return {
        title: "Cash Book Report",
        summary: [
            { label: "Total Entries", value: filtered.length },
            { label: "Total Cash In", value: formatCurrency(entries.filter((item) => item.type === "Cash In").reduce((sum, item) => sum + item.amount, 0)) },
            { label: "Total Cash Out", value: formatCurrency(entries.filter((item) => item.type === "Cash Out").reduce((sum, item) => sum + item.amount, 0)) },
        ],
        columns: ["Voucher No", "Date", "Type", "Title", "Category", "Amount", "Note"],
        rows: filtered.map((item) => Object.values(item)),
        excelData: filtered,
    };
};

export const getSupplierPaymentReport = (payments, filters = {}) => {
    const filtered = payments
        .filter((payment) => {
            if (filters.status && payment.status !== filters.status) {
                return false;
            }
            return true;
        })
        .map((payment) => ({
            voucherNo: payment.voucherNo,
            supplierName: payment.supplierName,
            materialName: payment.materialName,
            totalBill: formatCurrency(payment.totalBill),
            paidAmount: formatCurrency(payment.paidAmount),
            dueAmount: formatCurrency(payment.dueAmount),
            status: payment.status,
            paymentDate: payment.paymentDate,
        }));

    return {
        title: "Supplier Payment Report",
        summary: [
            { label: "Total Payments", value: filtered.length },
            { label: "Total Paid", value: formatCurrency(payments.reduce((sum, item) => sum + item.paidAmount, 0)) },
            { label: "Total Due", value: formatCurrency(payments.reduce((sum, item) => sum + item.dueAmount, 0)) },
        ],
        columns: ["Voucher No", "Supplier Name", "Material Name", "Total Bill", "Paid Amount", "Due Amount", "Status", "Payment Date"],
        rows: filtered.map((item) => Object.values(item)),
        excelData: filtered,
    };
};

export const getLabourPaymentReport = (payments, filters = {}) => {
    const filtered = payments
        .filter((payment) => {
            if (filters.status && payment.status !== filters.status) {
                return false;
            }
            return true;
        })
        .map((payment) => ({
            voucherNo: payment.voucherNo,
            labourGroupName: payment.labourGroupName,
            workType: payment.workType,
            workerCount: payment.workerCount,
            dailyWage: formatCurrency(payment.dailyWage),
            workDays: payment.workDays,
            totalBill: formatCurrency(payment.totalBill),
            paidAmount: formatCurrency(payment.paidAmount),
            dueAmount: formatCurrency(payment.dueAmount),
            status: payment.status,
            paymentDate: payment.paymentDate,
        }));

    return {
        title: "Labour Payment Report",
        summary: [
            { label: "Total Payments", value: filtered.length },
            { label: "Total Paid", value: formatCurrency(payments.reduce((sum, item) => sum + item.paidAmount, 0)) },
            { label: "Total Due", value: formatCurrency(payments.reduce((sum, item) => sum + item.dueAmount, 0)) },
        ],
        columns: ["Voucher No", "Labour Group", "Work Type", "Worker Count", "Daily Wage", "Work Days", "Total Bill", "Paid Amount", "Due Amount", "Status", "Payment Date"],
        rows: filtered.map((item) => Object.values(item)),
        excelData: filtered,
    };
};

export const getDueReport = (supplierPayments, labourPayments) => {
    const supplierRows = supplierPayments
        .filter((payment) => payment.dueAmount > 0)
        .map((payment) => ({
            source: "Supplier",
            voucherNo: payment.voucherNo,
            name: payment.supplierName,
            type: payment.materialName,
            totalBill: formatCurrency(payment.totalBill),
            paidAmount: formatCurrency(payment.paidAmount),
            dueAmount: formatCurrency(payment.dueAmount),
            status: payment.status,
            date: payment.paymentDate,
        }));

    const labourRows = labourPayments
        .filter((payment) => payment.dueAmount > 0)
        .map((payment) => ({
            source: "Labour",
            voucherNo: payment.voucherNo,
            name: payment.labourGroupName,
            type: payment.workType,
            totalBill: formatCurrency(payment.totalBill),
            paidAmount: formatCurrency(payment.paidAmount),
            dueAmount: formatCurrency(payment.dueAmount),
            status: payment.status,
            date: payment.paymentDate,
        }));

    const combined = [...supplierRows, ...labourRows];

    return {
        title: "Due Report",
        summary: [
            { label: "Supplier Dues", value: supplierRows.length },
            { label: "Labour Dues", value: labourRows.length },
            { label: "Total Due", value: formatCurrency(combined.reduce((sum, item) => sum + Number(item.dueAmount.replace(/[৳,]/g, "")), 0)) },
        ],
        columns: ["Source", "Voucher No", "Name", "Type/Material", "Total Bill", "Paid Amount", "Due Amount", "Status", "Date"],
        rows: combined.map((item) => Object.values(item)),
        excelData: combined,
    };
};

export const getBudgetSummaryReport = (budget, materials, expenses) => {
    const totalMaterialCost = materials.reduce((sum, item) => sum + item.totalCost, 0);
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
    const usedBudget = totalMaterialCost + totalExpense;
    const remainingBudget = budget.totalBudget - usedBudget;
    const usagePercentage = budget.totalBudget > 0
        ? Math.min(100, Math.round((usedBudget / budget.totalBudget) * 100))
        : 0;

    const summaryRows = [{
        title: "Budget Summary",
        value: "",
    }];

    return {
        title: "Budget Summary Report",
        summary: [
            { label: "Total Budget", value: formatCurrency(budget.totalBudget) },
            { label: "Total Material Cost", value: formatCurrency(totalMaterialCost) },
            { label: "Total Expense", value: formatCurrency(totalExpense) },
            { label: "Used Budget", value: formatCurrency(usedBudget) },
            { label: "Remaining Budget", value: formatCurrency(remainingBudget) },
            { label: "Usage Percentage", value: `${usagePercentage}%` },
        ],
        columns: ["Total Budget", "Total Material Cost", "Total Expense", "Used Budget", "Remaining Budget", "Usage Percentage"],
        rows: [[
            formatCurrency(budget.totalBudget),
            formatCurrency(totalMaterialCost),
            formatCurrency(totalExpense),
            formatCurrency(usedBudget),
            formatCurrency(remainingBudget),
            `${usagePercentage}%`,
        ]],
        excelData: [
            {
                totalBudget: budget.totalBudget,
                totalMaterialCost,
                totalExpense,
                usedBudget,
                remainingBudget,
                usagePercentage: `${usagePercentage}%`,
            },
        ],
    };
};
