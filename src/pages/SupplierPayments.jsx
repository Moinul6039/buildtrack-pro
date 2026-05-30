import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import SupplierPaymentForm from "../components/accounts/SupplierPaymentForm";
import SupplierPaymentTable from "../components/accounts/SupplierPaymentTable";
import AccountSummaryCard from "../components/accounts/AccountSummaryCard";
import { supplierPaymentService } from "../services/supplierPaymentService";
import { useAuth } from "../context/AuthContext";
import { printVoucher } from "../utils/export/printVoucher";

const SupplierPayments = () => {
    const [payments, setPayments] = useState(() => supplierPaymentService.getSupplierPayments());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPayment, setEditingPayment] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const { isAdmin } = useAuth();

    const statuses = ["Paid", "Partial Paid", "Due"];

    const totalBill = useMemo(
        () => supplierPaymentService.getTotalSupplierBill(),
        [payments]
    );

    const totalPaid = useMemo(
        () => supplierPaymentService.getTotalSupplierPaid(),
        [payments]
    );

    const totalDue = useMemo(
        () => supplierPaymentService.getTotalSupplierDue(),
        [payments]
    );

    const totalEntries = useMemo(() => payments.length, [payments]);

    const handleOpenAddModal = () => {
        setEditingPayment(null);
        setIsModalOpen(true);
    };

    const handleEdit = (payment) => {
        setEditingPayment(payment);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingPayment(null);
    };

    const handleSavePayment = (formData) => {
        let updatedPayments;

        if (editingPayment) {
            updatedPayments = supplierPaymentService.updateSupplierPayment(
                editingPayment.id,
                formData
            );
        } else {
            updatedPayments = supplierPaymentService.addSupplierPayment(formData);
        }

        setPayments(updatedPayments);
        handleCloseModal();
    };

    const handleDelete = (paymentId) => {
        if (!isAdmin) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this payment?"
        );

        if (!confirmDelete) return;

        const updatedPayments = supplierPaymentService.deleteSupplierPayment(paymentId);
        setPayments(updatedPayments);
    };

    const handlePrint = (payment) => {
        printVoucher({
            voucherNo: payment.voucherNo,
            date: payment.date,
            type: payment.supplierName,
            category: payment.status,
            amount: payment.paidAmount || payment.totalBill,
            note: payment.note || payment.material || payment.supplierName,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Supplier Payments</h1>
                    <p className="mt-1 text-slate-600">Track supplier bills and payments</p>
                </div>
                <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                    <Plus size={20} />
                    Add Payment
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <AccountSummaryCard
                    title="Total Bill"
                    amount={totalBill}
                    bgColor="bg-slate-500"
                />
                <AccountSummaryCard
                    title="Total Paid"
                    amount={totalPaid}
                    bgColor="bg-green-500"
                />
                <AccountSummaryCard
                    title="Total Due"
                    amount={totalDue}
                    bgColor="bg-red-500"
                />
                <AccountSummaryCard
                    title="Total Entries"
                    amount={totalEntries}
                    bgColor="bg-blue-500"
                />
            </div>

            {/* Search and Filter */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                    placeholder="Search by supplier or material..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={Search}
                />
                <Select
                    placeholder="Filter by status"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    options={statuses}
                />
            </div>

            {/* Table */}
            <SupplierPaymentTable
                payments={payments}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPrint={handlePrint}
                searchTerm={searchTerm}
                filterStatus={filterStatus}
            />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingPayment ? "Edit Payment" : "Add New Supplier Payment"}
            >
                <SupplierPaymentForm
                    payment={editingPayment}
                    onSave={handleSavePayment}
                    onClose={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default SupplierPayments;
