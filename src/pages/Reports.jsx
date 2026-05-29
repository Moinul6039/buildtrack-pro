import Card from "../components/common/Card";

const Reports = () => {
    const reportTypes = [
        "Daily Report",
        "Weekly Report",
        "Monthly Report",
        "Material Cost Report",
        "Expense Report",
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Generate project material and expense reports
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                {reportTypes.map((report) => (
                    <Card key={report}>
                        <h3 className="font-bold text-slate-900">{report}</h3>
                        <p className="mt-2 text-sm text-slate-500">View details</p>
                    </Card>
                ))}
            </div>

            <Card>
                <h2 className="text-lg font-bold text-slate-900">Report Filter</h2>

                <div className="mt-5 grid gap-4 md:grid-cols-4">
                    <input
                        type="date"
                        className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />

                    <input
                        type="date"
                        className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />

                    <select className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500">
                        <option>All Categories</option>
                        <option>Materials</option>
                        <option>Expenses</option>
                    </select>

                    <button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                        Generate Report
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Reports;