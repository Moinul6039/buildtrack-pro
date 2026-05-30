import { formatCurrency } from "../../utils/formatCurrency";
import { Trash2, Edit2, Printer } from "lucide-react";
import StatusBadge from "./StatusBadge";

const LabourPaymentTable = ({ payments, onEdit, onDelete, onPrint, searchTerm, filterStatus }) => {
    const filteredPayments = payments.filter((payment) => {
        const searchMatch =
            payment.labourGroupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.workType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.voucherNo.toLowerCase().includes(searchTerm.toLowerCase());

        const statusMatch = filterStatus ? payment.status === filterStatus : true;

        return searchMatch && statusMatch;
    });

    if (filteredPayments.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">No labour payments found.</p>
            </div>
        );
    }

    return (
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
                            Workers
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Daily Wage
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Days
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
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {filteredPayments.map((payment) => (
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
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {payment.workerCount}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {formatCurrency(payment.dailyWage)}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {payment.workDays}
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
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => onPrint?.(payment)}
                                        className="p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Printer size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(payment)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(payment.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LabourPaymentTable;
