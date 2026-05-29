import Button from "../common/Button";
import { Edit, Trash2 } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";

const ExpenseTable = ({ expenses, onEdit, onDelete, canDelete = true }) => {
    if (!expenses.length) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
                No expenses found. Add a new expense to start tracking your project costs.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-3">Date</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Note</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map((expense) => (
                        <tr
                            key={expense.id}
                            className="border-b border-slate-100 text-slate-700"
                        >
                            <td className="py-4">{expense.date}</td>
                            <td className="font-semibold text-slate-900">{expense.title}</td>
                            <td>{expense.category}</td>
                            <td className="font-semibold">{formatCurrency(expense.amount)}</td>
                            <td>{expense.note || "—"}</td>
                            <td>
                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(expense)}
                                    >
                                        <Edit size={14} />
                                        Edit
                                    </Button>
                                    {canDelete && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-rose-200 text-rose-600 hover:bg-rose-50"
                                            onClick={() => onDelete(expense.id)}
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseTable;
