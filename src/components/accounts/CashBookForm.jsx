import { useState } from "react";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { validateCashEntry } from "../../utils/validateCashEntry";

const CashBookForm = ({ entry, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        entry || {
            type: "",
            title: "",
            amount: "",
            date: new Date().toISOString().split("T")[0],
            category: "",
            note: "",
        }
    );

    const [errors, setErrors] = useState({});

    const entryTypes = ["Cash In", "Cash Out"];
    const categories = [
        "Opening Balance",
        "Fund Received",
        "Material Payment",
        "Labour Payment",
        "Transport Payment",
        "Equipment Rent",
        "Miscellaneous",
        "Other",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = validateCashEntry(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSave({
            ...formData,
            amount: Number(formData.amount),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={entryTypes}
                error={errors.type}
            />

            <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Daily Fund Collection"
                error={errors.title}
            />

            <Input
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0"
                error={errors.amount}
            />

            <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
            />

            <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories}
                error={errors.category}
            />

            <Input
                label="Note (Optional)"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Additional notes..."
            />

            <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                    {entry ? "Update Entry" : "Add Entry"}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default CashBookForm;
