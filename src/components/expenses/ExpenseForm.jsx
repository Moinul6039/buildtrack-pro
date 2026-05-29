import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Select from "../common/Select";
import { expenseCategories } from "../../data/expenseCategories";
import { validateExpense } from "../../utils/validateExpense";

const todayDate = new Date().toISOString().slice(0, 10);

const initialFormState = {
    title: "",
    category: "",
    amount: "",
    date: todayDate,
    note: "",
};

const ExpenseForm = ({ editingExpense, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title || "",
                category: editingExpense.category || "",
                amount: String(editingExpense.amount || ""),
                date: editingExpense.date || todayDate,
                note: editingExpense.note || "",
            });
        } else {
            setFormData(initialFormState);
        }

        setErrors({});
    }, [editingExpense]);

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

        const validation = validateExpense(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
                <Input
                    label="Title"
                    name="title"
                    placeholder="Example: Labour Payment"
                    value={formData.title}
                    onChange={handleChange}
                    error={errors.title}
                    required
                />

                <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    options={expenseCategories}
                    placeholder="Select category"
                    error={errors.category}
                    required
                />

                <Input
                    label="Amount"
                    name="amount"
                    type="number"
                    min="0"
                    placeholder="Example: 15000"
                    value={formData.amount}
                    onChange={handleChange}
                    error={errors.amount}
                    required
                />

                <Input
                    label="Date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    error={errors.date}
                    required
                />

                <div className="md:col-span-2">
                    <Input
                        label="Note"
                        name="note"
                        placeholder="Optional note"
                        value={formData.note}
                        onChange={handleChange}
                        error={errors.note}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>

                <Button type="submit" variant="primary">
                    {editingExpense ? "Update Expense" : "Save Expense"}
                </Button>
            </div>
        </form>
    );
};

export default ExpenseForm;
