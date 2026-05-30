import jsPDF from "jspdf";
import "jspdf-autotable";

export const exportToPDF = ({ title, columns, rows, fileName, summary = [] }) => {
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const margin = 40;
    const lineHeight = 18;

    doc.setFontSize(18);
    doc.text(title, margin, 50);

    doc.setFontSize(11);
    const generatedDate = new Date().toLocaleString("en-BD", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    doc.text(`Generated: ${generatedDate}`, margin, 72);

    let startY = 90;

    if (summary.length > 0) {
        doc.setFontSize(12);
        summary.forEach((item) => {
            doc.text(`${item.label}: ${item.value}`, margin, startY);
            startY += lineHeight;
        });
    }

    doc.autoTable({
        startY,
        head: [columns],
        body: rows,
        theme: "grid",
        headStyles: {
            fillColor: [15, 23, 42],
            textColor: 255,
            fontSize: 10,
        },
        bodyStyles: {
            fontSize: 10,
        },
        margin: { left: margin, right: margin },
        styles: { cellPadding: 6 },
        didDrawPage: (data) => {
            const pageCount = doc.getNumberOfPages();
            const pageSize = doc.internal.pageSize;
            doc.setFontSize(9);
            doc.text(
                `Page ${data.pageNumber} of ${pageCount}`,
                pageSize.width - margin,
                pageSize.height - 20,
                { align: "right" }
            );
        },
    });

    doc.save(`${fileName}.pdf`);
};
