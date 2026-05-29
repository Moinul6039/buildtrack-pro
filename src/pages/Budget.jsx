import { useMemo, useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import { budgetService } from "../services/budgetService";
import { materialService } from "../services/materialService";
import { expenseService } from "../services/expenseService";
import { formatCurrency } from "../utils/formatCurrency";
import {
    calculateTotalMaterialCost,
    calculateTotalExpense,
    calculateUsedBudget,
    calculateRemainingBudget,
    calculateBudgetUsagePercentage,
} from "../utils/calculateBudget";

const Budget = () => {
    const [budgetData, setBudgetData] = useState(() => budgetService.getBudget());
    const [projectName, setProjectName] = useState(budgetData.projectName || "");
    const [totalBudget, setTotalBudget] = useState(String(budgetData.totalBudget || ""));
    const [errors, setErrors] = useState({});

    const materials = useMemo(() => materialService.getMaterials(), []);
    const expenses = useMemo(() => expenseService.getExpenses(), []);

    const totalMaterialCost = useMemo(
        () => calculateTotalMaterialCost(materials),
        [materials]
    );

    const totalExpense = useMemo(
        () => calculateTotalExpense(expenses),
        [expenses]
    );

    const usedBudget = useMemo(
        () => calculateUsedBudget(materials, expenses),
        [materials, expenses]
    );

    const remainingBudget = useMemo(
        () => calculateRemainingBudget(Number(totalBudget) || 0, usedBudget),
        [totalBudget, usedBudget]
    );

    const budgetUsage = useMemo(
        () => calculateBudgetUsagePercentage(Number(totalBudget) || 0, usedBudget),
        [totalBudget, usedBudget]
    );

    const handleSaveBudget = () => {
        const trimmedName = projectName.trim();
        const parsedTotalBudget = Number(totalBudget);
        const validationErrors = {};

        if (!trimmedName) {
            validationErrors.projectName = "Project name is required";
        }

        if (!totalBudget || Number.isNaN(parsedTotalBudget) || parsedTotalBudget <= 0) {
            validationErrors.totalBudget = "Total budget must be greater than 0";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedBudget = budgetService.updateBudget({
            projectName: trimmedName,
            totalBudget: parsedTotalBudget,
        });

        setBudgetData(updatedBudget);
        setProjectName(updatedBudget.projectName);
        setTotalBudget(String(updatedBudget.totalBudget));
        setErrors({});
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Budget Management</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Set and monitor project budget
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-4">
                <Card>
                    <p className="text-sm font-medium text-slate-500">Total Budget</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(Number(totalBudget) || 0)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Used Budget</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(usedBudget)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Remaining Budget</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(remainingBudget)}
                    </h3>
                </Card>

                <Card>
                    <p className="text-sm font-medium text-slate-500">Budget Usage</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {budgetUsage}%
                    </h3>
                </Card>
            </div>

            <Card className="max-w-3xl">
                <h2 className="text-lg font-bold text-slate-900">Update Project Budget</h2>

                <div className="mt-5 space-y-5">
                    <Input
                        label="Project Name"
                        name="projectName"
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                        placeholder="Building Project A"
                        error={errors.projectName}
                        required
                    />

                    <Input
                        label="Total Budget"
                        name="totalBudget"
                        type="number"
                        min="0"
                        value={totalBudget}
                        onChange={(event) => setTotalBudget(event.target.value)}
                        placeholder="5000000"
                        error={errors.totalBudget}
                        required
                    />

                    <div className="flex justify-end">
                        <Button type="button" onClick={handleSaveBudget}>
                            Save Budget
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="grid gap-5 md:grid-cols-3">
                <Card>
                    <p className="text-sm text-slate-500">Total Material Cost</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(totalMaterialCost)}
                    </h3>
                </Card>
                <Card>
                    <p className="text-sm text-slate-500">Total Expense</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {formatCurrency(totalExpense)}
                    </h3>
                </Card>
                <Card>
                    <p className="text-sm text-slate-500">Project</p>
                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                        {budgetData.projectName}
                    </h3>
                </Card>
            </div>
        </div>
    );
};

export default Budget;
