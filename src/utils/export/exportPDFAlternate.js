import { getPopulatedArray } from "../../lib";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportToPDFAlternate = (name, rows, columns) => {
    let now = new Date();
    let doc = new jsPDF({ orientation: "l" });

    doc.setFontSize(18);

    doc.text(
        "SWAN " + name, 11, 8
    );
    doc.setFontSize(8);
    doc.setTextColor(100);

    // console.log(columns.map(x => x.key))

    doc.autoTable({
        head: [columns.map(x => x.title)],
        body: rows,
        theme: "striped",
        didDrawCell: (data) => { },
    });

    doc.save(
        `"SWAN "${name} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.pdf`
    );
}