import { Eye, Trash2 } from "lucide-react";
import Button from "../common/Button";
import { formatCurrency } from "../../utils/formatCurrency";

const ProofCard = ({ proof, canDelete = false, onDelete, onImageClick }) => {
    const formattedAmount = proof.amount !== undefined && proof.amount !== null
        ? formatCurrency(proof.amount)
        : "-";
    const createdAtLabel = proof.createdAt
        ? new Date(proof.createdAt).toLocaleString()
        : "-";

    return (
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <button
                type="button"
                onClick={() => onImageClick(proof.image)}
                className="group block overflow-hidden rounded-t-3xl"
            >
                <img
                    src={proof.image}
                    alt={proof.title}
                    className="h-56 w-full object-cover transition duration-200 group-hover:scale-105"
                />
            </button>

            <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            {proof.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">{proof.category}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                        {formattedAmount}
                    </div>
                </div>

                <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                    <div>
                        <p className="font-medium text-slate-900">Date</p>
                        <p>{proof.date}</p>
                    </div>
                    <div>
                        <p className="font-medium text-slate-900">Uploaded</p>
                        <p>{proof.uploadedBy}</p>
                        <p className="text-xs text-slate-500">{proof.uploadedByRole}</p>
                    </div>
                </div>

                {proof.note && (
                    <div>
                        <p className="font-medium text-slate-900">Note</p>
                        <p className="mt-1 text-sm text-slate-600">{proof.note}</p>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-sm text-slate-500">
                    <p>Uploaded at: {createdAtLabel}</p>
                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onImageClick(proof.image)}
                        >
                            <Eye size={14} />
                            View
                        </Button>
                        {canDelete && (
                            <Button
                                type="button"
                                variant="danger"
                                size="sm"
                                onClick={() => onDelete(proof.id)}
                            >
                                <Trash2 size={14} />
                                Delete
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofCard;
