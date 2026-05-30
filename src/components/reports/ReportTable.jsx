const ReportTable = ({ columns, rows }) => {
    if (!rows || rows.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">
                No data available for the selected report.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="px-6 py-4 text-left text-sm font-semibold text-slate-900"
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-50">
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={`px-6 py-4 text-sm text-slate-700 ${typeof cell === "number" ? "font-semibold" : ""}`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportTable;
