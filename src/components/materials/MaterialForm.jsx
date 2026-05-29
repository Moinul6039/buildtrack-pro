import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { materialCategories } from "../../data/materialCategories";
import { units } from "../../data/units";
import { calculateRemainingQty, calculateTotalCost } from "../../utils/calculateMaterial";
import { formatCurrency } from "../../utils/formatCurrency";
import { validateMaterial } from "../../utils/validateMaterial";

const initialFormState = {
    name: "",
    category: "",
    requiredQty: "",
    purchasedQty: "",
    usedQty: "",
    unit: "",
    unitPrice: "",
};

const MaterialForm = ({ editingMaterial, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingMaterial) {
            setFormData({
                name: editingMaterial.name || "",
                category: editingMaterial.category || "",
                requiredQty: String(editingMaterial.requiredQty || ""),
                purchasedQty: String(editingMaterial.purchasedQty || ""),
                usedQty: String(editingMaterial.usedQty || ""),
                unit: editingMaterial.unit || "",
                unitPrice: String(editingMaterial.unitPrice || ""),
            });
        } else {
            setFormData(initialFormState);
        }

        setErrors({});
    }, [editingMaterial]);

    const remainingQty =
        formData.purchasedQty !== "" && formData.usedQty !== ""
            ? calculateRemainingQty(formData.purchasedQty, formData.usedQty)
            : 0;

    const totalCost =
        formData.purchasedQty !== "" && formData.unitPrice !== ""
            ? calculateTotalCost(formData.purchasedQty, formData.unitPrice)
            : 0;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validation = validateMaterial(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSubmit(formData);
        setFormData(initialFormState);
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
                <Input
                    label="Material Name"
                    name="name"
                    placeholder="Example: Cement"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                />

                <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={materialCategories}
                    placeholder="Select category"
                    error={errors.category}
                    required
                />

                <Input
                    label="Required Quantity"
                    name="requiredQty"
                    type="number"
                    min="0"
                    placeholder="Example: 500"
                    value={formData.requiredQty}
                    onChange={handleChange}
                    error={errors.requiredQty}
                    required
                />

                <Input
                    label="Purchased Quantity"
                    name="purchasedQty"
                    type="number"
                    min="0"
                    placeholder="Example: 300"
                    value={formData.purchasedQty}
                    onChange={handleChange}
                    error={errors.purchasedQty}
                    required
                />

                <Input
                    label="Used Quantity"
                    name="usedQty"
                    type="number"
                    min="0"
                    placeholder="Example: 120"
                    value={formData.usedQty}
                    onChange={handleChange}
                    error={errors.usedQty}
                    required
                />

                <Select
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    options={units}
                    placeholder="Select unit"
                    error={errors.unit}
                    required
                />

                <Input
                    label="Unit Price"
                    name="unitPrice"
                    type="number"
                    min="0"
                    placeholder="Example: 520"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    error={errors.unitPrice}
                    required
                />

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-medium text-slate-500">Auto Calculation</p>

                    <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Remaining Qty</span>
                            <span className="font-bold text-slate-900">
                                {remainingQty > 0 ? remainingQty : 0} {formData.unit}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Total Cost</span>
                            <span className="font-bold text-slate-900">
                                {formatCurrency(totalCost)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>

                <Button type="submit" variant="primary">
                    {editingMaterial ? "Update Material" : "Save Material"}
                </Button>
            </div>
        </form>
    );
};

export default MaterialForm;