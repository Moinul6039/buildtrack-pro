import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import Modal from "../components/common/Modal";
import Select from "../components/common/Select";
import ExpenseForm from "../components/expenses/ExpenseForm";
import ExpenseTable from "../components/expenses/ExpenseTable";
import { expenseCategories } from "../data/expenseCategories";
import { expenseService } from "../services/expenseService";
import { useAuth } from "../context/AuthContext";
import { formatCurrency } from "../utils/formatCurrency";

const Expenses = () => {
    const [expenses, setExpenses] = useState(() => expenseService.getExpenses());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const todayDate = new Date().toISOString().slice(0, 10);

    const totalExpense = useMemo(() => {
        return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
    }, [expenses]);

    const todayExpense = useMemo(() => {
        return expenses.reduce((total, expense) => {
            return expense.date === todayDate ? total + Number(expense.amount) : total;
        }, 0);
    }, [expenses, todayDate]);

    const { isAdmin } = useAuth();

    const monthlyExpense = useMemo(() => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        return expenses.reduce((total, expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
                ? total + Number(expense.amount)
                : total;
        }, 0);
    }, [expenses]);

    const filteredExpenses = useMemo(() => {
        return expenses.filter((expense) => {
            const searchValue = searchTerm.trim().toLowerCase();
            const searchMatch =
                expense.title.toLowerCase().includes(searchValue) ||
                expense.category.toLowerCase().includes(searchValue) ||
                expense.note.toLowerCase().includes(searchValue);

            const categoryMatch = categoryFilter ? expense.category === categoryFilter : true;

            return searchMatch && categoryMatch;
        });
    }, [expenses, searchTerm, categoryFilter]);

    const handleOpenAddModal = () => {
        setEditingExpense(null);
        setIsModalOpen(true);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExpense(null);
    };

    const handleSaveExpense = (formData) => {
        const updatedExpenses = editingExpense
            ? expenseService.updateExpense(editingExpense.id, formData)
            : expenseService.addExpense(formData);

        setExpenses(updatedExpenses);
        handleCloseModal();
    };

    const handleDeleteExpense = (expenseId) => {
        if (!isAdmin) {
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this expense?");

        if (!confirmDelete) {
            return;
        }

        const updatedExpenses = expenseService.deleteExpense(expenseId);
        setExpenses(updatedExpenses);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Expense Management</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Track labour, transport, equipment and miscellaneous expenses
                    </p>
                </div>

                <Button onClick={handleOpenAddModal}>
                    <Plus size={18} />
                    Add Expense
                </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-4">
                <Card>
                    <p className="text-sm font-medium text-slate-500">Today Expense</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(todayExpense)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Monthly Expense</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(monthlyExpense)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Total Expense</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(totalExpense)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Total Entries</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">{expenses.length}</h3>
                </Card>
            </div>

            <Card>
                <div className="mb-5 grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <Input
                                placeholder="Search by title, category or note..."
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                className="pl-11"
                            />
                        </div>
                    </div>

                    <Select
                        value={categoryFilter}
                        onChange={(event) => setCategoryFilter(event.target.value)}
                        options={expenseCategories}
                        placeholder="All Categories"
                    />
                </div>

                <ExpenseTable
                    expenses={filteredExpenses}
                    onEdit={handleEditExpense}
                    onDelete={handleDeleteExpense}
                    canDelete={isAdmin}
                />
            </Card>

            <Modal
                isOpen={isModalOpen}
                title={editingExpense ? "Edit Expense" : "Add New Expense"}
                onClose={handleCloseModal}
            >
                <ExpenseForm
                    editingExpense={editingExpense}
                    onSubmit={handleSaveExpense}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default Expenses;
