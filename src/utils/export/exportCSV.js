import { csvGenerator } from "./csvGenerator";

export const exportToCSV = (name, rows, columns) => {
    let now = new Date();
    let fname = `SWAN ${name} ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} T${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.csv`;

    let tableKeys = columns.map((x) => x.key);
    let columnHeaders = columns.map((x) => x.title);
    csvGenerator(rows, tableKeys, columnHeaders, fname);
}