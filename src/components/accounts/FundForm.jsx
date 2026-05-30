import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Modal from "../../components/common/Modal";
import { validateFund } from "../../utils/validateFund";

const FundForm = ({ fund, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        fund || {
            receivedFrom: "",
            amount: "",
            date: new Date().toISOString().split("T")[0],
            paymentMethod: "",
            note: "",
        }
    );

    const [errors, setErrors] = useState({});

    const paymentMethods = ["Cash", "Bank", "Mobile Banking", "Cheque", "Other"];

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

        const validation = validateFund(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Received From"
                name="receivedFrom"
                value={formData.receivedFrom}
                onChange={handleChange}
                placeholder="e.g., Principal Investor"
                error={errors.receivedFrom}
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
                label="Payment Method"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                options={paymentMethods}
                error={errors.paymentMethod}
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
                    {fund ? "Update Fund" : "Add Fund"}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default FundForm;
