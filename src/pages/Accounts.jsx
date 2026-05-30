import { useMemo } from "react";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import AccountSummaryCard from "../components/accounts/AccountSummaryCard";
import StatusBadge from "../components/accounts/StatusBadge";
import { fundService } from "../services/fundService";
import { cashBookService } from "../services/cashBookService";
import { supplierPaymentService } from "../services/supplierPaymentService";
import { labourPaymentService } from "../services/labourPaymentService";
import { formatCurrency } from "../utils/formatCurrency";

const Accounts = () => {
    const funds = useMemo(() => fundService.getFunds(), []);
    const cashEntries = useMemo(() => cashBookService.getCashEntries(), []);
    const supplierPayments = useMemo(() => supplierPaymentService.getSupplierPayments(), []);
    const labourPayments = useMemo(() => labourPaymentService.getLabourPayments(), []);

    // Calculate totals
    const totalFundReceived = useMemo(() => fundService.getTotalFundReceived(), [funds]);
    const totalCashIn = useMemo(() => cashBookService.getTotalCashIn(), [cashEntries]);
    const totalCashOut = useMemo(() => cashBookService.getTotalCashOut(), [cashEntries]);
    const closingCashBalance = useMemo(
        () => cashBookService.getClosingBalance(),
        [cashEntries]
    );

    const totalSupplierDue = useMemo(
        () => supplierPaymentService.getTotalSupplierDue(),
        [supplierPayments]
    );

    const totalLabourDue = useMemo(
        () => labourPaymentService.getTotalLabourDue(),
        [labourPayments]
    );

    const totalDue = useMemo(() => totalSupplierDue + totalLabourDue, [totalSupplierDue, totalLabourDue]);

    // Recent entries
    const recentCashEntries = useMemo(
        () => cashEntries.slice(0, 5),
        [cashEntries]
    );

    const recentSupplierPayments = useMemo(
        () => supplierPayments.slice(0, 5),
        [supplierPayments]
    );

    const recentLabourPayments = useMemo(
        () => labourPayments.slice(0, 5),
        [labourPayments]
    );

    const dueSummary = useMemo(() => {
        return {
            supplierDues: supplierPayments.filter((p) => p.dueAmount > 0).length,
            labourDues: labourPayments.filter((p) => p.dueAmount > 0).length,
        };
    }, [supplierPayments, labourPayments]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Office Accounts Dashboard</h1>
                <p className="mt-1 text-slate-600">Overview of all accounting transactions</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <AccountSummaryCard
                    title="Total Fund Received"
                    amount={totalFundReceived}
                    icon={TrendingUp}
                    bgColor="bg-green-500"
                />
                <AccountSummaryCard
                    title="Total Cash In"
                    amount={totalCashIn}
                    icon={TrendingUp}
                    bgColor="bg-blue-500"
                />
                <AccountSummaryCard
                    title="Total Cash Out"
                    amount={totalCashOut}
                    icon={TrendingDown}
                    bgColor="bg-red-500"
                />
                <AccountSummaryCard
                    title="Closing Cash Balance"
                    amount={closingCashBalance}
                    icon={TrendingUp}
                    bgColor={closingCashBalance >= 0 ? "bg-green-500" : "bg-red-500"}
                />
            </div>

            {/* Due Summary */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <AccountSummaryCard
                    title="Total Supplier Due"
                    amount={totalSupplierDue}
                    icon={AlertCircle}
                    bgColor="bg-orange-500"
                />
                <AccountSummaryCard
                    title="Total Labour Due"
                    amount={totalLabourDue}
                    icon={AlertCircle}
                    bgColor="bg-amber-500"
                />
                <AccountSummaryCard
                    title="Total Due"
                    amount={totalDue}
                    icon={AlertCircle}
                    bgColor="bg-red-500"
                />
            </div>

            {/* Recent Transactions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Cash Entries */}
                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Cash Entries</h2>
                    {recentCashEntries.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                            <p className="text-slate-600">No cash entries yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentCashEntries.map((entry) => (
                                <div
                                    key={entry.id}
                                    className="rounded-xl border border-slate-200 bg-white p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900">{entry.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {new Date(entry.date).toLocaleDateString("en-BD")}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">
                                                {formatCurrency(entry.amount)}
                                            </p>
                                            <StatusBadge status={entry.type} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Supplier Payments */}
                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Supplier Payments</h2>
                    {recentSupplierPayments.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                            <p className="text-slate-600">No supplier payments yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentSupplierPayments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="rounded-xl border border-slate-200 bg-white p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {payment.supplierName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {payment.materialName}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">
                                                {formatCurrency(payment.dueAmount)}
                                            </p>
                                            <StatusBadge status={payment.status} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Labour Payments & Due Summary */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Labour Payments */}
                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Labour Payments</h2>
                    {recentLabourPayments.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                            <p className="text-slate-600">No labour payments yet.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentLabourPayments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="rounded-xl border border-slate-200 bg-white p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900">
                                                {payment.labourGroupName}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {payment.workType}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">
                                                {formatCurrency(payment.dueAmount)}
                                            </p>
                                            <StatusBadge status={payment.status} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Due Summary Card */}
                <div>
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Due Summary</h2>
                    <div className="space-y-4">
                        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6">
                            <p className="text-sm font-medium text-orange-900">Pending Supplier Dues</p>
                            <p className="mt-2 text-3xl font-bold text-orange-600">
                                {dueSummary.supplierDues}
                            </p>
                            <p className="mt-1 text-xs text-orange-700">
                                Active supplier payments pending
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-amber-100 p-6">
                            <p className="text-sm font-medium text-amber-900">Pending Labour Dues</p>
                            <p className="mt-2 text-3xl font-bold text-amber-600">
                                {dueSummary.labourDues}
                            </p>
                            <p className="mt-1 text-xs text-amber-700">
                                Active labour payments pending
                            </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-red-50 to-red-100 p-6">
                            <p className="text-sm font-medium text-red-900">Total Outstanding Dues</p>
                            <p className="mt-2 text-3xl font-bold text-red-600">
                                {dueSummary.supplierDues + dueSummary.labourDues}
                            </p>
                            <p className="mt-1 text-xs text-red-700">
                                Total payment entries with pending dues
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
