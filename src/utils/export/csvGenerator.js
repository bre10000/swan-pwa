export const csvGenerator = (totalData,actualHeaderKey,headerToShow,fileName) => {
    let data = totalData || null;
    if (data == null || !data.length) {
      return null;
    }
    let columnDelimiter = ",";
    let lineDelimiter = "\n";
    let keys = headerToShow;
    let result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    data.forEach(function(item) {
      let ctr = 0;
      actualHeaderKey.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;
        if (Array.isArray(item[key])) {
          let arrayItem =
            item[key] && item[key].length > 0
              ? '"' + item[key].join(",") + '"'
              : "-";
          result += arrayItem;
        } else if (key =='id') {
          let strItem = item[key] ? '"' + item[key] + '"' : "-";
          result += strItem ? strItem.replace(/\s{2,}/g, " ") : strItem;
        } else if (typeof item[key] == "string") {
          let strItem = item.attributes[key] ? '"' + item.attributes[key] + '"' : "-";
          result += strItem ? strItem.replace(/\s{2,}/g, " ") : strItem;
        } else if (typeof item.attributes[key] == "string") {
          let strItem = item.attributes[key] ? '"' + item.attributes[key] + '"' : "-";
          result += strItem ? strItem.replace(/\s{2,}/g, " ") : strItem;
        } else if (typeof item.attributes[key] == "number") {
          let strItem = item.attributes[key] ?  item.attributes[key]  : "-";
          result += strItem;
        } else if (typeof item.attributes[key] == "object") {
          let strItem = item.attributes[key]?.data.attributes.name ? '"' + item.attributes[key]?.data.attributes.name + '"' : "-";
          result += strItem ? strItem.replace(/\s{2,}/g, " ") : strItem;
        } else {
          let strItem = item[key] + "";
          result += strItem ? strItem.replace(/,/g, "") : strItem;
        }
  
        ctr++;
      });
      result += lineDelimiter;
    });
  
    if (result == null) return;
  
    var blob = new Blob([result]);
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
      var hiddenElement = window.document.createElement("a");
      hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(result);
      hiddenElement.target = "_blank";
      hiddenElement.download = fileName;
      hiddenElement.click();
    } else {
      let link = document.createElement("a");
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  export function exportToCsvAlternate(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = (row[j] === null || row[j] === undefined) ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}