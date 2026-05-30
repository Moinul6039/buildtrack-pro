const ReportSummaryCards = ({ summary }) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {summary.map((item) => (
                <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <p className="text-sm font-medium text-slate-600">{item.label}</p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                        {typeof item.value === "number"
                            ? item.value
                            : item.value}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ReportSummaryCards;
