import { useMemo } from "react";
import { AlertCircle } from "lucide-react";
import AccountSummaryCard from "../components/accounts/AccountSummaryCard";
import StatusBadge from "../components/accounts/StatusBadge";
import { supplierPaymentService } from "../services/supplierPaymentService";
import { labourPaymentService } from "../services/labourPaymentService";
import { formatCurrency } from "../utils/formatCurrency";

const Dues = () => {
    const supplierPayments = useMemo(() => supplierPaymentService.getSupplierPayments(), []);
    const labourPayments = useMemo(() => labourPaymentService.getLabourPayments(), []);

    const supplierDues = useMemo(
        () => supplierPayments.filter((payment) => payment.dueAmount > 0),
        [supplierPayments]
    );

    const labourDues = useMemo(
        () => labourPayments.filter((payment) => payment.dueAmount > 0),
        [labourPayments]
    );

    const totalSupplierDue = useMemo(
        () => supplierDues.reduce((total, payment) => total + payment.dueAmount, 0),
        [supplierDues]
    );

    const totalLabourDue = useMemo(
        () => labourDues.reduce((total, payment) => total + payment.dueAmount, 0),
        [labourDues]
    );

    const totalDue = useMemo(
        () => totalSupplierDue + totalLabourDue,
        [totalSupplierDue, totalLabourDue]
    );

    const totalDueEntries = useMemo(
        () => supplierDues.length + labourDues.length,
        [supplierDues, labourDues]
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Due Tracking</h1>
                <p className="mt-1 text-slate-600">Monitor all pending payments</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <AccountSummaryCard
                    title="Total Supplier Due"
                    amount={totalSupplierDue}
                    bgColor="bg-orange-500"
                />
                <AccountSummaryCard
                    title="Total Labour Due"
                    amount={totalLabourDue}
                    bgColor="bg-amber-500"
                />
                <AccountSummaryCard
                    title="Total Due"
                    amount={totalDue}
                    bgColor="bg-red-500"
                />
                <AccountSummaryCard
                    title="Total Due Entries"
                    amount={totalDueEntries}
                    bgColor="bg-blue-500"
                />
            </div>

            {/* Supplier Dues Section */}
            <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Supplier Dues</h2>
                {supplierDues.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                        <p className="text-slate-600">No supplier dues found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                        <table className="w-full">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Voucher No
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Supplier Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Material
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Total Bill
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Paid
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Due
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {supplierDues.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                            {payment.voucherNo}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {payment.supplierName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {payment.materialName}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                            {formatCurrency(payment.totalBill)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-green-700">
                                            {formatCurrency(payment.paidAmount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-red-700">
                                            {formatCurrency(payment.dueAmount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {new Date(payment.paymentDate).toLocaleDateString("en-BD")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Labour Dues Section */}
            <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Labour Dues</h2>
                {labourDues.length === 0 ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                        <p className="text-slate-600">No labour dues found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                        <table className="w-full">
                            <thead className="border-b border-slate-200 bg-slate-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Voucher No
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Labour Group
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Work Type
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Total Bill
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Paid
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Due
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {labourDues.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                            {payment.voucherNo}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {payment.labourGroupName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {payment.workType}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                                            {formatCurrency(payment.totalBill)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-green-700">
                                            {formatCurrency(payment.paidAmount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-red-700">
                                            {formatCurrency(payment.dueAmount)}
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700">
                                            {new Date(payment.paymentDate).toLocaleDateString("en-BD")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dues;
