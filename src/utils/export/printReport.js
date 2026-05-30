export const printReport = ({ title, columns = [], rows = [], summary = [] }) => {
  try {
    const normalizeValue = (value) => {
      if (value === null || value === undefined) return "";
      return String(value);
    };

    const escapeHtml = (value) => {
      return normalizeValue(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    };

    const generatedDate = new Date().toLocaleString();

    const summaryHtml =
      Array.isArray(summary) && summary.length > 0
        ? `
          <div class="summary">
            ${summary
              .map(
                (item) => `
                  <div class="summary-card">
                    <p>${escapeHtml(item.label || item.title || "")}</p>
                    <h3>${escapeHtml(item.value || "")}</h3>
                  </div>
                `
              )
              .join("")}
          </div>
        `
        : "";

    const tableHead = columns
      .map((column) => `<th>${escapeHtml(column)}</th>`)
      .join("");

    const tableBody =
      rows.length > 0
        ? rows
            .map((row) => {
              const rowValues = Array.isArray(row) ? row : Object.values(row);

              return `
                <tr>
                  ${rowValues
                    .map((cell) => `<td>${escapeHtml(cell)}</td>`)
                    .join("")}
                </tr>
              `;
            })
            .join("")
        : `<tr><td colspan="${columns.length || 1}">No data found</td></tr>`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${escapeHtml(title || "Report")} - BuildTrack Pro</title>
          <style>
            * {
              box-sizing: border-box;
            }

            body {
              font-family: Arial, sans-serif;
              padding: 30px;
              color: #0f172a;
              background: #ffffff;
            }

            .header {
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }

            .brand {
              font-size: 26px;
              font-weight: 800;
              margin: 0;
            }

            .subtitle {
              font-size: 14px;
              color: #475569;
              margin-top: 6px;
            }

            .report-title {
              font-size: 20px;
              font-weight: 700;
              margin: 20px 0 5px;
            }

            .date {
              font-size: 13px;
              color: #64748b;
              margin-bottom: 20px;
            }

            .summary {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
              margin-bottom: 24px;
            }

            .summary-card {
              border: 1px solid #e2e8f0;
              border-radius: 10px;
              padding: 14px;
              background: #f8fafc;
            }

            .summary-card p {
              margin: 0;
              font-size: 12px;
              color: #64748b;
            }

            .summary-card h3 {
              margin: 8px 0 0;
              font-size: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              font-size: 12px;
            }

            th {
              background: #f1f5f9;
              text-align: left;
              padding: 10px;
              border: 1px solid #cbd5e1;
              font-weight: 700;
            }

            td {
              padding: 10px;
              border: 1px solid #e2e8f0;
            }

            .footer {
              margin-top: 40px;
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 24px;
              text-align: center;
              font-size: 13px;
            }

            .signature {
              border-top: 1px solid #0f172a;
              padding-top: 8px;
            }

            @media print {
              body {
                padding: 20px;
              }
            }
          </style>
        </head>

        <body>
          <div class="header">
            <h1 class="brand">BuildTrack Pro</h1>
            <div class="subtitle">Construction Management System</div>
          </div>

          <h2 class="report-title">${escapeHtml(title || "Report")}</h2>
          <div class="date">Generated Date: ${escapeHtml(generatedDate)}</div>

          ${summaryHtml}

          <table>
            <thead>
              <tr>${tableHead}</tr>
            </thead>
            <tbody>
              ${tableBody}
            </tbody>
          </table>

          <div class="footer">
            <div class="signature">Prepared By</div>
            <div class="signature">Checked By</div>
            <div class="signature">Approved By</div>
          </div>
        </body>
      </html>
    `;

    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";

    document.body.appendChild(iframe);

    const iframeWindow = iframe.contentWindow;
    const iframeDocument = iframe.contentDocument || iframeWindow.document;

    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.close();

    iframe.onload = () => {
      iframeWindow.focus();
      iframeWindow.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    };

    setTimeout(() => {
      iframeWindow.focus();
      iframeWindow.print();

      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
      }, 1000);
    }, 500);
  } catch (error) {
    console.error("Print report failed:", error);
    alert("Print failed. Please check browser console.");
  }
};
