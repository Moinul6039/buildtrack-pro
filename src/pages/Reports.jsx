import { useMemo, useState } from "react";
import { Download, Printer } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Select from "../components/common/Select";
import AccountSummaryCard from "../components/accounts/AccountSummaryCard";
import { materialService } from "../services/materialService";
import { expenseService } from "../services/expenseService";
import { fundService } from "../services/fundService";
import { cashBookService } from "../services/cashBookService";
import { supplierPaymentService } from "../services/supplierPaymentService";
import { labourPaymentService } from "../services/labourPaymentService";
import { budgetService } from "../services/budgetService";
import {
    filterByDateRange,
    getMaterialReport,
    getExpenseReport,
    getFundReport,
    getCashBookReport,
    getSupplierPaymentReport,
    getLabourPaymentReport,
    getDueReport,
    getBudgetSummaryReport,
} from "../utils/reportUtils";
import { exportToPDF } from "../utils/export/exportToPDF";
import { exportToExcel } from "../utils/export/exportToExcel";
import { printReport } from "../utils/export/printReport";


const statusOptions = ["Paid", "Partial Paid", "Due"];

const Reports = () => {
    
    const reportOptions = [
        { value: "material", label: "Material Report" },
        { value: "expense", label: "Expense Report" },
        { value: "fund", label: "Fund Received Report" },
        { value: "cashBook", label: "Cash Book Report" },
        { value: "supplier", label: "Supplier Payment Report" },
        { value: "labour", label: "Labour Payment Report" },
        { value: "due", label: "Due Report" },
        { value: "budget", label: "Budget Summary Report" },
    ];

    const [reportType, setReportType] = useState("material");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const materials = useMemo(() => materialService.getMaterials(), []);
    const expenses = useMemo(() => expenseService.getExpenses(), []);
    const funds = useMemo(() => fundService.getFunds(), []);
    const cashEntries = useMemo(() => cashBookService.getCashEntries(), []);
    const supplierPayments = useMemo(() => supplierPaymentService.getSupplierPayments(), []);
    const labourPayments = useMemo(() => labourPaymentService.getLabourPayments(), []);
    const budget = useMemo(() => budgetService.getBudget(), []);

    const categoryOptions = useMemo(() => {
        if (reportType === "material") {
            return [...new Set(materials.map((item) => item.category))];
        }

        if (reportType === "expense") {
            return [...new Set(expenses.map((item) => item.category))];
        }

        if (reportType === "fund") {
            return [...new Set(funds.map((item) => item.paymentMethod))];
        }

        if (reportType === "cashBook") {
            return [...new Set(cashEntries.map((item) => item.category))];
        }

        return [];
    }, [reportType, materials, expenses, funds, cashEntries]);

    const report = useMemo(() => {
        const filters = {
            category: categoryFilter,
            status: statusFilter,
        };

        switch (reportType) {
            case "material": {
                const filtered = filterByDateRange(materials, "createdAt", fromDate, toDate);
                return getMaterialReport(filtered);
            }
            case "expense": {
                const filtered = filterByDateRange(expenses, "date", fromDate, toDate);
                return getExpenseReport(filtered, filters);
            }
            case "fund": {
                const filtered = filterByDateRange(funds, "date", fromDate, toDate);
                return getFundReport(filtered, { paymentMethod: categoryFilter });
            }
            case "cashBook": {
                const filtered = filterByDateRange(cashEntries, "date", fromDate, toDate);
                return getCashBookReport(filtered, { type: statusFilter, category: categoryFilter });
            }
            case "supplier": {
                const filtered = filterByDateRange(supplierPayments, "paymentDate", fromDate, toDate);
                return getSupplierPaymentReport(filtered, filters);
            }
            case "labour": {
                const filtered = filterByDateRange(labourPayments, "paymentDate", fromDate, toDate);
                return getLabourPaymentReport(filtered, filters);
            }
            case "due": {
                const filteredSupplier = filterByDateRange(supplierPayments, "paymentDate", fromDate, toDate);
                const filteredLabour = filterByDateRange(labourPayments, "paymentDate", fromDate, toDate);
                return getDueReport(filteredSupplier, filteredLabour);
            }
            case "budget": {
                return getBudgetSummaryReport(budget, materials, expenses);
            }
            default:
                return { title: "Report", summary: [], columns: [], rows: [], excelData: [] };
        }
    }, [reportType, fromDate, toDate, categoryFilter, statusFilter, materials, expenses, funds, cashEntries, supplierPayments, labourPayments, budget]);

    const handleExportPDF = () => {
        exportToPDF({
            title: report.title,
            columns: report.columns,
            rows: report.rows,
            summary: report.summary,
            fileName: report.title.toLowerCase().replaceAll(" ", "-"),
        });
    };

    const handleExportExcel = () => {
        exportToExcel({
            sheetName: report.title,
            data: report.excelData,
            fileName: `${report.title.replace(/\s+/g, "_")}-${new Date().toISOString().slice(0, 10)}`,
        });
    };

    const handlePrint = () => {
        if (!report || !Array.isArray(report.columns) || !Array.isArray(report.rows)) {
            alert("Please generate a report first.");
            return;
        }

        printReport({
            title: report.title,
            columns: report.columns,
            rows: report.rows,
            summary: report.summary,
        });
    };

    const categoryLabel = reportType === "material"
        ? "Category"
        : reportType === "expense"
            ? "Expense Category"
            : reportType === "fund"
                ? "Payment Method"
                : reportType === "cashBook"
                    ? "Entry Category"
                    : "Category";

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Reports</h1>
                <p className="mt-1 text-slate-600">Generate centralized admin reports with export and print options.</p>
            </div>

            <Card>
                <div className="grid gap-4 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Report Type</label>
                        <select
                            value={reportType}
                            onChange={(e) => {
                                setReportType(e.target.value);
                                setCategoryFilter("");
                                setStatusFilter("");
                            }}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                        >
                            <option value="">Select report type</option>
                            {reportOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700">From Date</label>
                        <Input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-slate-700">To Date</label>
                        <Input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>

                    {categoryOptions.length > 0 && (
                        <div>
                            <label className="text-sm font-semibold text-slate-700">{categoryLabel}</label>
                            <Select
                                placeholder={`All ${categoryLabel}`}
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                options={categoryOptions}
                            />
                        </div>
                    )}

                    {(reportType === "supplier" || reportType === "labour") && (
                        <div>
                            <label className="text-sm font-semibold text-slate-700">Payment Status</label>
                            <Select
                                placeholder="All Statuses"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                options={statusOptions}
                            />
                        </div>
                    )}
                </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
                {report.summary.map((item) => (
                    <AccountSummaryCard
                        key={item.label}
                        title={item.label}
                        amount={item.value}
                        bgColor="bg-slate-500"
                    />
                ))}
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">{report.title}</h2>
                    <p className="text-sm text-slate-500">{report.rows.length} record{report.rows.length === 1 ? "" : "s"} found.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <Button type="button" onClick={handlePrint} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-800">
                        <Printer size={16} />
                        Print
                    </Button>
                    <Button onClick={handleExportPDF} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                        <Download size={16} />
                        Export PDF
                    </Button>
                    <Button onClick={handleExportExcel} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700">
                        <Download size={16} />
                        Export Excel
                    </Button>
                </div>
            </div>

            <Card>
                {report.rows.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
                        <p className="text-slate-600">No data available for the current report filters.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    {report.columns.map((column) => (
                                        <th
                                            key={column}
                                            className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700"
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {report.rows.map((row, index) => (
                                    <tr key={index} className="hover:bg-slate-50">
                                        {row.map((cell, idx) => (
                                            <td key={`${index}-${idx}`} className="px-4 py-3 text-sm text-slate-700">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default Reports;
