import { Edit, Trash2 } from "lucide-react";
import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatCurrency";

const MaterialTable = ({ materials, onEdit, onDelete, canDelete = true }) => {
    if (materials.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                <h3 className="text-lg font-bold text-slate-900">No materials found</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Add your first construction material.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-3">Material</th>
                        <th>Category</th>
                        <th>Required</th>
                        <th>Purchased</th>
                        <th>Used</th>
                        <th>Remaining</th>
                        <th>Unit Price</th>
                        <th>Total Cost</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {materials.map((material) => {
                        const isLowStock = material.remainingQty <= material.requiredQty * 0.2;

                        return (
                            <tr
                                key={material.id}
                                className="border-b border-slate-100 text-slate-700"
                            >
                                <td className="py-4 font-bold text-slate-900">
                                    {material.name}
                                </td>

                                <td>{material.category}</td>

                                <td>
                                    {material.requiredQty} {material.unit}
                                </td>

                                <td>
                                    {material.purchasedQty} {material.unit}
                                </td>

                                <td>
                                    {material.usedQty} {material.unit}
                                </td>

                                <td className="font-semibold">
                                    {material.remainingQty} {material.unit}
                                </td>

                                <td>{formatCurrency(material.unitPrice)}</td>

                                <td className="font-bold text-slate-900">
                                    {formatCurrency(material.totalCost)}
                                </td>

                                <td>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold ${isLowStock
                                                ? "bg-amber-50 text-amber-600"
                                                : "bg-emerald-50 text-emerald-600"
                                            }`}
                                    >
                                        {isLowStock ? "Low Stock" : "Available"}
                                    </span>
                                </td>

                                <td>
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onEdit(material)}
                                        >
                                            <Edit size={15} />
                                            Edit
                                        </Button>

                                        {canDelete && (
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => onDelete(material.id)}
                                            >
                                                <Trash2 size={15} />
                                                Delete
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default MaterialTable;