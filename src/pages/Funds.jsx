import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import FundForm from "../components/accounts/FundForm";
import FundTable from "../components/accounts/FundTable";
import AccountSummaryCard from "../components/accounts/AccountSummaryCard";
import { fundService } from "../services/fundService";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import { printVoucher } from "../utils/export/printVoucher";

const Funds = () => {
    const [funds, setFunds] = useState(() => fundService.getFunds());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFund, setEditingFund] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterMethod, setFilterMethod] = useState("");
    const { isAdmin } = useAuth();

    const paymentMethods = ["Cash", "Bank", "Mobile Banking", "Cheque", "Other"];

    const totalFundReceived = useMemo(
        () => fundService.getTotalFundReceived(),
        [funds]
    );

    const totalFundEntries = useMemo(() => funds.length, [funds]);

    const handleOpenAddModal = () => {
        setEditingFund(null);
        setIsModalOpen(true);
    };

    const handleEdit = (fund) => {
        setEditingFund(fund);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingFund(null);
    };

    const handleSaveFund = (formData) => {
        let updatedFunds;

        if (editingFund) {
            updatedFunds = fundService.updateFund(editingFund.id, formData);
        } else {
            updatedFunds = fundService.addFund(formData);
        }

        setFunds(updatedFunds);
        handleCloseModal();
    };

    const handleDelete = (fundId) => {
        if (!isAdmin) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this fund?"
        );

        if (!confirmDelete) return;

        const updatedFunds = fundService.deleteFund(fundId);
        setFunds(updatedFunds);
    };

    const handlePrint = (fund) => {
        printVoucher({
            voucherNo: fund.voucherNo,
            date: fund.date,
            type: fund.paymentMethod,
            category: "Fund Received",
            amount: fund.amount,
            note: fund.note || fund.paymentMethod,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Funds</h1>
                    <p className="mt-1 text-slate-600">Manage fund received</p>
                </div>
                <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                    <Plus size={20} />
                    Add Fund
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <AccountSummaryCard
                    title="Total Fund Received"
                    amount={totalFundReceived}
                    bgColor="bg-green-500"
                />
                <AccountSummaryCard
                    title="Total Fund Entries"
                    amount={totalFundEntries}
                    bgColor="bg-blue-500"
                />
            </div>

            {/* Search and Filter */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                    placeholder="Search by name or voucher no..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={Search}
                />
                <Select
                    placeholder="Filter by payment method"
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value)}
                    options={paymentMethods}
                />
            </div>

            {/* Table */}
            <FundTable
                funds={funds}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPrint={handlePrint}
                searchTerm={searchTerm}
                filterMethod={filterMethod}
            />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingFund ? "Edit Fund" : "Add New Fund"}
            >
                <FundForm
                    fund={editingFund}
                    onSave={handleSaveFund}
                    onClose={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default Funds;
