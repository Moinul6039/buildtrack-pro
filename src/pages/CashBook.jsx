import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import CashBookForm from "../components/accounts/CashBookForm";
import CashBookTable from "../components/accounts/CashBookTable";
import AccountSummaryCard from "../components/accounts/AccountSummaryCard";
import { cashBookService } from "../services/cashBookService";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";
import { printVoucher } from "../utils/export/printVoucher";

const CashBook = () => {
    const [entries, setEntries] = useState(() => cashBookService.getCashEntries());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const { isAdmin } = useAuth();

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

    const totalCashIn = useMemo(
        () => cashBookService.getTotalCashIn(),
        [entries]
    );

    const totalCashOut = useMemo(
        () => cashBookService.getTotalCashOut(),
        [entries]
    );

    const closingBalance = useMemo(
        () => cashBookService.getClosingBalance(),
        [entries]
    );

    const totalEntries = useMemo(() => entries.length, [entries]);

    const handleOpenAddModal = () => {
        setEditingEntry(null);
        setIsModalOpen(true);
    };

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEntry(null);
    };

    const handleSaveEntry = (formData) => {
        let updatedEntries;

        if (editingEntry) {
            updatedEntries = cashBookService.updateCashEntry(editingEntry.id, formData);
        } else {
            updatedEntries = cashBookService.addCashEntry(formData);
        }

        setEntries(updatedEntries);
        handleCloseModal();
    };

    const handleDelete = (entryId) => {
        if (!isAdmin) {
            return;
        }

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this entry?"
        );

        if (!confirmDelete) return;

        const updatedEntries = cashBookService.deleteCashEntry(entryId);
        setEntries(updatedEntries);
    };

    const handlePrint = (entry) => {
        printVoucher({
            voucherNo: entry.voucherNo,
            date: entry.date,
            type: entry.type,
            category: entry.category,
            amount: entry.amount,
            note: entry.note || entry.description || entry.category,
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Daily Cash Book</h1>
                    <p className="mt-1 text-slate-600">Track all cash inflows and outflows</p>
                </div>
                <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                    <Plus size={20} />
                    Add Entry
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <AccountSummaryCard
                    title="Total Cash In"
                    amount={totalCashIn}
                    bgColor="bg-green-500"
                />
                <AccountSummaryCard
                    title="Total Cash Out"
                    amount={totalCashOut}
                    bgColor="bg-red-500"
                />
                <AccountSummaryCard
                    title="Closing Balance"
                    amount={closingBalance}
                    bgColor="bg-blue-500"
                />
                <AccountSummaryCard
                    title="Total Entries"
                    amount={totalEntries}
                    bgColor="bg-slate-500"
                />
            </div>

            {/* Search and Filter */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                    placeholder="Search by title or voucher no..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={Search}
                />
                <Select
                    placeholder="Filter by type"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    options={entryTypes}
                />
                <Select
                    placeholder="Filter by category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    options={categories}
                />
            </div>

            {/* Table */}
            <CashBookTable
                entries={entries}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPrint={handlePrint}
                searchTerm={searchTerm}
                filterType={filterType}
                filterCategory={filterCategory}
            />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingEntry ? "Edit Entry" : "Add New Cash Entry"}
            >
                <CashBookForm
                    entry={editingEntry}
                    onSave={handleSaveEntry}
                    onClose={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default CashBook;
