import { useMemo } from "react";
import {
    Banknote,
    Package,
    ReceiptText,
    Wallet,
    ArrowUpRight,
} from "lucide-react";
import Card from "../components/common/Card";
import StatCard from "../components/dashboard/StatCard";
import { materialService } from "../services/materialService";
import { expenseService } from "../services/expenseService";
import { budgetService } from "../services/budgetService";
import { expenseCategories } from "../data/expenseCategories";
import { formatCurrency } from "../utils/formatCurrency";
import {
    calculateTotalMaterialCost,
    calculateTotalExpense,
    calculateUsedBudget,
    calculateRemainingBudget,
    calculateBudgetUsagePercentage,
} from "../utils/calculateBudget";

const Dashboard = () => {
    const materials = useMemo(() => materialService.getMaterials(), []);
    const expenses = useMemo(() => expenseService.getExpenses(), []);
    const budget = useMemo(() => budgetService.getBudget(), []);

    const totalMaterialCost = useMemo(
        () => calculateTotalMaterialCost(materials),
        [materials]
    );

    const totalExpense = useMemo(() => calculateTotalExpense(expenses), [expenses]);
    const usedBudget = useMemo(
        () => calculateUsedBudget(materials, expenses),
        [materials, expenses]
    );
    const remainingBudget = useMemo(
        () => calculateRemainingBudget(budget.totalBudget, usedBudget),
        [budget.totalBudget, usedBudget]
    );
    const budgetUsagePercentage = useMemo(
        () => calculateBudgetUsagePercentage(budget.totalBudget, usedBudget),
        [budget.totalBudget, usedBudget]
    );
    const totalMaterials = materials.length;

    const materialUsageSummary = useMemo(() => {
        return materials
            .map((material) => {
                const purchasedQty = Number(material.purchasedQty);
                const usedQty = Number(material.usedQty);
                const usedPercentage = purchasedQty
                    ? Math.round((usedQty / purchasedQty) * 100)
                    : 0;

                return {
                    name: material.name,
                    usedPercentage: Math.min(100, Math.max(0, usedPercentage)),
                };
            })
            .sort((a, b) => b.usedPercentage - a.usedPercentage)
            .slice(0, 5);
    }, [materials]);

    const expenseCategorySummary = useMemo(() => {
        const summary = expenseCategories.reduce((acc, category) => {
            acc[category] = 0;
            return acc;
        }, {});

        expenses.forEach((expense) => {
            if (Object.prototype.hasOwnProperty.call(summary, expense.category)) {
                summary[expense.category] += Number(expense.amount) || 0;
            }
        });

        return expenseCategories.map((category) => ({
            category,
            amount: summary[category],
        }));
    }, [expenses]);

    const maxExpenseCategoryAmount = useMemo(() => {
        return Math.max(...expenseCategorySummary.map((item) => item.amount), 1);
    }, [expenseCategorySummary]);

    const recentActivities = useMemo(() => {
        const materialActivities = materials.map((material) => ({
            id: `mat-${material.id}`,
            timestamp: material.updatedAt || material.createdAt,
            text: `Material added: ${material.name} - ${formatCurrency(material.totalCost)}`,
        }));

        const expenseActivities = expenses.map((expense) => ({
            id: `exp-${expense.id}`,
            timestamp: expense.updatedAt || expense.createdAt,
            text: `Expense added: ${expense.title} - ${formatCurrency(expense.amount)}`,
        }));

        return [...materialActivities, ...expenseActivities]
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);
    }, [materials, expenses]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Overview of your construction project
                    </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                    View Report
                    <ArrowUpRight size={18} />
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Budget"
                    value={formatCurrency(budget.totalBudget)}
                    note={budget.projectName}
                    icon={Wallet}
                    trend="Project budget"
                />

                <StatCard
                    title="Total Expense"
                    value={formatCurrency(totalExpense)}
                    note="Materials + expenses"
                    icon={ReceiptText}
                    trend="Current spend"
                />

                <StatCard
                    title="Remaining Budget"
                    value={formatCurrency(remainingBudget)}
                    note="Available project balance"
                    icon={Banknote}
                    trend="Remaining funds"
                />

                <StatCard
                    title="Total Materials"
                    value={`${totalMaterials} Items`}
                    note="All project materials"
                    icon={Package}
                    trend="Material inventory"
                />
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Material Usage Summary
                            </h2>
                            <p className="text-sm text-slate-500">
                                Top materials by used quantity percentage
                            </p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {materialUsageSummary.map((item) => (
                            <div key={item.name}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">{item.name}</span>
                                    <span className="font-semibold text-slate-900">
                                        {item.usedPercentage}%
                                    </span>
                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-blue-600"
                                        style={{ width: `${item.usedPercentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h2 className="text-lg font-bold text-slate-900">Expense Overview</h2>
                    <p className="text-sm text-slate-500">Category expense breakdown</p>

                    <div className="mt-6 space-y-4">
                        {expenseCategorySummary.map((item) => (
                            <div key={item.category} className="space-y-2">
                                <div className="flex items-center justify-between text-sm text-slate-700">
                                    <span>{item.category}</span>
                                    <span className="font-semibold text-slate-900">
                                        {formatCurrency(item.amount)}
                                    </span>
                                </div>

                                <div className="h-2.5 rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-blue-600"
                                        style={{
                                            width: `${item.amount ? (item.amount / maxExpenseCategoryAmount) * 100 : 0}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
                <Card>
                    <p className="text-sm font-medium text-slate-500">Total Material Cost</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(totalMaterialCost)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Used Budget</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(usedBudget)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Budget Usage</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {budgetUsagePercentage}%
                    </h3>
                </Card>
            </div>

            <Card>
                <h2 className="text-lg font-bold text-slate-900">Recent Activities</h2>
                <p className="text-sm text-slate-500">
                    Latest project updates and transactions
                </p>

                <div className="mt-5 divide-y divide-slate-100">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 py-4">
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-600"></div>
                            <p className="text-sm font-medium text-slate-700">{activity.text}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
