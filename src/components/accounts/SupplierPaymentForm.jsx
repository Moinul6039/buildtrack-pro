import { useState } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Modal from "../../components/common/Modal";
import { validateSupplierPayment } from "../../utils/validateSupplierPayment";

const SupplierPaymentForm = ({ payment, onSave, onClose }) => {
    const [formData, setFormData] = useState(
        payment || {
            supplierName: "",
            materialName: "",
            totalBill: "",
            paidAmount: "",
            paymentDate: new Date().toISOString().split("T")[0],
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

        const validation = validateSupplierPayment(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        onSave({
            ...formData,
            totalBill: Number(formData.totalBill),
            paidAmount: Number(formData.paidAmount),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Supplier Name"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                placeholder="e.g., ABC Supplier"
                error={errors.supplierName}
            />

            <Input
                label="Material Name"
                name="materialName"
                value={formData.materialName}
                onChange={handleChange}
                placeholder="e.g., Cement"
                error={errors.materialName}
            />

            <Input
                label="Total Bill"
                name="totalBill"
                type="number"
                value={formData.totalBill}
                onChange={handleChange}
                placeholder="0"
                error={errors.totalBill}
            />

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
                    {payment ? "Update Payment" : "Add Payment"}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default SupplierPaymentForm;
