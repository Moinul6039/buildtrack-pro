import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

const ReportFilters = ({
    reportType,
    onReportTypeChange,
    fromDate,
    toDate,
    category,
    status,
    onFromDateChange,
    onToDateChange,
    onCategoryChange,
    onStatusChange,
    reportTypes,
    categories,
    statuses,
    onGenerate,
    onExportPdf,
    onExportExcel,
    onPrint,
    disableExport,
    disablePrint,
}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Report Type</label>
                        <Select
                            name="reportType"
                            value={reportType}
                            onChange={onReportTypeChange}
                            placeholder="Select report type"
                            options={reportTypes}
                        />
                    </div>
                    <Input
                        label="From Date"
                        type="date"
                        value={fromDate}
                        onChange={onFromDateChange}
                    />
                    <Input
                        label="To Date"
                        type="date"
                        value={toDate}
                        onChange={onToDateChange}
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        <Select
                            name="category"
                            value={category}
                            onChange={onCategoryChange}
                            placeholder="Filter category"
                            options={categories}
                        />
                        <Select
                            name="status"
                            value={status}
                            onChange={onStatusChange}
                            placeholder="Filter status"
                            options={statuses}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button onClick={onGenerate}>Generate Report</Button>
                    <Button variant="secondary" onClick={onExportPdf} disabled={disableExport}>
                        Export PDF
                    </Button>
                    <Button variant="secondary" onClick={onExportExcel} disabled={disableExport}>
                        Export Excel
                    </Button>
                    <Button variant="secondary" onClick={onPrint} disabled={disablePrint}>
                        Print
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReportFilters;
