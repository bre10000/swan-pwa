export function getNumericFilter(rows, field, interval) {
    let nums = {};
    rows.forEach(row => {
        let num = Math.floor( (row[field]? row[field] : 0) / interval);
        if (nums[num] === undefined)
        nums[num] = {
            name: `${num * interval} to ${(num + 1) * interval}`,
            value: num
        };
    });
    nums = Object.entries(nums)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
    return Object.values(nums);
}

export function getStringFilter(rows, field) {
    let letrs = {};
    rows.forEach(row => {
        let letr = row[field]? row[field]?.charAt(0) : '-';
        if (letrs[letr] === undefined)
        letrs[letr] = {
            name: `${letr.toUpperCase()}`,
            value: letr.toLowerCase()
        };
    });
    letrs = Object.entries(letrs)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
    return Object.values(letrs);
}

export function getWholeStringFilter(rows, field) {
    let letrs = {};
    rows.forEach(row => {
        let letr = row[field]? row[field]: '-';
        letrs[letr] = {
            name: `${toTitleCase(letr)}`,
            value: letr.toLowerCase()
        };
    });
    letrs = Object.entries(letrs)
        .sort()
        .reduce((o, [k, v]) => ((o[k] = v), o), {});
    return Object.values(letrs);
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }