export const printReport = ({ title, columns = [], rows = [], summary = [] }) => {
    const printWindow = window.open("", "PRINT", "height=900,width=1200");

    if (!printWindow) return;

    const generatedDate = new Date().toLocaleString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const summaryRows = summary.map(
        (item) => `
            <div class="summary-card">
                <div class="summary-label">${item.label}</div>
                <div class="summary-value">${item.value}</div>
            </div>`
    ).join("");

    const headerHtml = `
        <div class="print-header">
            <div>
                <p class="brand">BuildTrack Pro</p>
                <p class="subtitle">Report Printout</p>
            </div>
            <div class="meta">
                <div><strong>Report:</strong> ${title}</div>
                <div><strong>Generated:</strong> ${generatedDate}</div>
            </div>
        </div>
    `;

    const summaryHtml = summary.length > 0 ? `
        <div class="summary-grid">
            ${summaryRows}
        </div>
    ` : "";

    const tableHeaders = columns.map((column) => `<th>${column}</th>`).join("");
    const tableRows = rows.map(
        (row) => `
            <tr>
                ${row.map((cell) => `<td>${cell ?? ""}</td>`).join("")}
            </tr>`
    ).join("");

    const html = `
        <html>
            <head>
                <title>${title} - BuildTrack Pro</title>
                <style>
                    body { font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 24px; color: #0f172a; }
                    .print-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px; }
                    .brand { font-size: 28px; font-weight: 700; margin: 0; }
                    .subtitle { margin: 4px 0 0; color: #475569; font-size: 14px; }
                    .meta { display: grid; gap: 8px; font-size: 13px; color: #334155; }
                    .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; }
                    .summary-card { border: 1px solid #e2e8f0; border-radius: 16px; background: #f8fafc; padding: 14px 16px; }
                    .summary-label { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
                    .summary-value { font-size: 18px; font-weight: 700; color: #0f172a; }
                    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
                    thead th { text-align: left; padding: 12px 10px; border-bottom: 2px solid #cbd5e1; background: #f8fafc; color: #0f172a; font-size: 12px; letter-spacing: 0.02em; }
                    tbody td { padding: 12px 10px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #334155; }
                    tbody tr:last-child td { border-bottom: none; }
                    @media print {
                        body { margin: 0; }
                        .print-header, .summary-grid { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${headerHtml}
                ${summaryHtml}
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>${tableHeaders}</tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>
            </body>
        </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};
