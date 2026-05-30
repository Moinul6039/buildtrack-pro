export const printVoucher = (voucherData) => {
    const {
        voucherNo,
        date,
        type,
        category,
        amount,
        note,
        preparedBy = "Admin",
    } = voucherData;

    const printWindow = window.open("", "PRINT", "height=800,width=800");

    if (!printWindow) return;

    printWindow.document.write(`
        <html>
            <head>
                <title>Voucher - ${voucherNo}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 32px; color: #111827; }
                    .page { max-width: 760px; margin: auto; }
                    .header { border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
                    .title { font-size: 24px; font-weight: 700; margin: 0; }
                    .subtitle { margin-top: 8px; color: #475569; }
                    .section { margin-bottom: 20px; }
                    .section h3 { margin-bottom: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.08em; color: #0f172a; }
                    .field { display: flex; justify-content: space-between; margin-bottom: 8px; }
                    .field strong { color: #0f172a; }
                    .note-box { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 12px; }
                    .signature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-top: 32px; }
                    .signature { border-top: 1px solid #cbd5e1; padding-top: 8px; text-align: center; color: #475569; }
                </style>
            </head>
            <body>
                <div class="page">
                    <div class="header">
                        <p class="title">BuildTrack Pro</p>
                        <p class="subtitle">Voucher Printout</p>
                    </div>

                    <div class="section">
                        <h3>Voucher Details</h3>
                        <div class="field"><strong>Voucher No:</strong><span>${voucherNo}</span></div>
                        <div class="field"><strong>Date:</strong><span>${date}</span></div>
                        <div class="field"><strong>Type / Category:</strong><span>${type || category || "N/A"}</span></div>
                        <div class="field"><strong>Amount:</strong><span>৳${Number(amount).toLocaleString("en-BD")}</span></div>
                    </div>

                    <div class="section">
                        <h3>Note</h3>
                        <div class="note-box">${note || "-"}</div>
                    </div>

                    <div class="signature-grid">
                        <div class="signature"><strong>Prepared By</strong><br />${preparedBy}</div>
                        <div class="signature"><strong>Checked By</strong><br />____________________</div>
                        <div class="signature"><strong>Approved By</strong><br />____________________</div>
                    </div>
                </div>
            </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
};
