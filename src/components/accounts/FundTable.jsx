import { formatCurrency } from "../../utils/formatCurrency";
import { Trash2, Edit2, Printer } from "lucide-react";
import Button from "../../components/common/Button";

const FundTable = ({ funds, onEdit, onDelete, onPrint, searchTerm, filterMethod }) => {
    const filteredFunds = funds.filter((fund) => {
        const searchMatch =
            fund.receivedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fund.voucherNo.toLowerCase().includes(searchTerm.toLowerCase());

        const methodMatch = filterMethod ? fund.paymentMethod === filterMethod : true;

        return searchMatch && methodMatch;
    });

    if (filteredFunds.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">No funds found.</p>
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
                            Received From
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Amount
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Method
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Note
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {filteredFunds.map((fund) => (
                        <tr key={fund.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                {fund.voucherNo}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {fund.receivedFrom}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-green-700">
                                {formatCurrency(fund.amount)}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {new Date(fund.date).toLocaleDateString("en-BD")}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {fund.paymentMethod}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {fund.note || "-"}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => onPrint?.(fund)}
                                        className="p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Printer size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(fund)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(fund.id)}
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

export default FundTable;
