import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import { validateLabourPayment } from "../../utils/validateLabourPayment";

const LabourPaymentForm = ({ payment, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        payment || {
            labourGroupName: "",
            workType: "",
            workerCount: "",
            dailyWage: "",
            workDays: "",
            paidAmount: "",
            paymentDate: new Date().toISOString().split("T")[0],
            note: "",
        }
    );

    const [errors, setErrors] = useState({});

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

        const validation = validateLabourPayment(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSave({
            ...formData,
            workerCount: Number(formData.workerCount),
            dailyWage: Number(formData.dailyWage),
            workDays: Number(formData.workDays),
            paidAmount: Number(formData.paidAmount),
        });
    };

    const totalBill = (Number(formData.workerCount) || 0) *
        (Number(formData.dailyWage) || 0) *
        (Number(formData.workDays) || 0);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Labour Group Name"
                name="labourGroupName"
                value={formData.labourGroupName}
                onChange={handleChange}
                placeholder="e.g., Group A"
                error={errors.labourGroupName}
            />

            <Input
                label="Work Type"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                placeholder="e.g., Excavation"
                error={errors.workType}
            />

            <Input
                label="Worker Count"
                name="workerCount"
                type="number"
                value={formData.workerCount}
                onChange={handleChange}
                placeholder="0"
                error={errors.workerCount}
            />

            <Input
                label="Daily Wage"
                name="dailyWage"
                type="number"
                value={formData.dailyWage}
                onChange={handleChange}
                placeholder="0"
                error={errors.dailyWage}
            />

            <Input
                label="Work Days"
                name="workDays"
                type="number"
                value={formData.workDays}
                onChange={handleChange}
                placeholder="0"
                error={errors.workDays}
            />

            <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-sm text-slate-600">Total Bill: <span className="font-bold text-slate-900">৳{new Intl.NumberFormat("en-BD").format(totalBill)}</span></p>
            </div>

            <Input
                label="Paid Amount"
                name="paidAmount"
                type="number"
                value={formData.paidAmount}
                onChange={handleChange}
                placeholder="0"
                error={errors.paidAmount}
            />

            <Input
                label="Payment Date"
                name="paymentDate"
                type="date"
                value={formData.paymentDate}
                onChange={handleChange}
                error={errors.paymentDate}
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
                    {payment ? "Update Payment" : "Add Payment"}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default LabourPaymentForm;
