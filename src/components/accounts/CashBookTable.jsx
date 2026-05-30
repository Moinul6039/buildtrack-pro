import { formatCurrency } from "../../utils/formatCurrency";
import { Trash2, Edit2, Printer } from "lucide-react";
import StatusBadge from "./StatusBadge";

const CashBookTable = ({ entries, onEdit, onDelete, onPrint, searchTerm, filterType, filterCategory }) => {
    const filteredEntries = entries.filter((entry) => {
        const searchMatch =
            entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.voucherNo.toLowerCase().includes(searchTerm.toLowerCase());

        const typeMatch = filterType ? entry.type === filterType : true;
        const categoryMatch = filterCategory ? entry.category === filterCategory : true;

        return searchMatch && typeMatch && categoryMatch;
    });

    if (filteredEntries.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="text-slate-600">No entries found.</p>
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
                            Date
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Type
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Title
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Category
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
                            Amount
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
                    {filteredEntries.map((entry) => (
                        <tr key={entry.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                {entry.voucherNo}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {new Date(entry.date).toLocaleDateString("en-BD")}
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <StatusBadge status={entry.type} />
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {entry.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {entry.category}
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold"
                                style={{
                                    color: entry.type === "Cash In" ? "#16a34a" : "#dc2626"
                                }}
                            >
                                {formatCurrency(entry.amount)}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                                {entry.note || "-"}
                            </td>
                            <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => onPrint?.(entry)}
                                        className="p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Printer size={16} />
                                    </button>
                                    <button
                                        onClick={() => onEdit(entry)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                        type="button"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(entry.id)}
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

export default CashBookTable;
