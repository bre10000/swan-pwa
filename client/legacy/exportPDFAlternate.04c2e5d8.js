import{E as t}from"./jspdf.plugin.autotable.73be67fd.js";var e=function(e,o,n){var a=new Date,c=new t({orientation:"l"});c.setFontSize(18),c.text("SWAN "+e,11,8),c.setFontSize(8),c.setTextColor(100),c.autoTable({head:[n.map((function(t){return t.title}))],body:o,theme:"striped",didDrawCell:function(t){}}),c.save('"SWAN "'.concat(e," ").concat(a.getFullYear(),"-").concat(a.getMonth(),"-").concat(a.getDate()," T").concat(a.getHours(),"-").concat(a.getMinutes(),"-").concat(a.getSeconds(),".pdf"))};export{e};
