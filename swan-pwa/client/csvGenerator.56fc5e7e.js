const e=(e,t,a,i)=>{let r=e||null;if(null==r||!r.length)return null;let l="";if(l+=a.join(","),l+="\n",r.forEach((function(e){let a=0;t.forEach((function(t){if(a>0&&(l+=","),Array.isArray(e[t])){let a=e[t]&&e[t].length>0?'"'+e[t].join(",")+'"':"-";l+=a}else if("id"==t){let a=e[t]?'"'+e[t]+'"':"-";l+=a?a.replace(/\s{2,}/g," "):a}else if("string"==typeof e[t]){let a=e.attributes[t]?'"'+e.attributes[t]+'"':"-";l+=a?a.replace(/\s{2,}/g," "):a}else if("string"==typeof e.attributes[t]){let a=e.attributes[t]?'"'+e.attributes[t]+'"':"-";l+=a?a.replace(/\s{2,}/g," "):a}else if("object"==typeof e.attributes[t]){let a=e.attributes[t].data.attributes.name?'"'+e.attributes[t].data.attributes.name+'"':"-";l+=a?a.replace(/\s{2,}/g," "):a}else{let a=e[t]+"";l+=a?a.replace(/,/g,""):a}a++})),l+="\n"})),null!=l){var n=new Blob([l]);if(navigator.msSaveBlob)navigator.msSaveBlob(n,exportedFilenmae);else if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){var o=window.document.createElement("a");o.href="data:text/csv;charset=utf-8,"+encodeURI(l),o.target="_blank",o.download=i,o.click()}else{let e=document.createElement("a");if(void 0!==e.download){var s=URL.createObjectURL(n);e.setAttribute("href",s),e.setAttribute("download",i),e.style.visibility="hidden",document.body.appendChild(e),e.click(),document.body.removeChild(e)}}}};function t(e,t){for(var a=function(e){for(var t="",a=0;a<e.length;a++){var i=null===e[a]?"":e[a].toString();e[a]instanceof Date&&(i=e[a].toLocaleString());var r=i.replace(/"/g,'""');r.search(/("|,|\n)/g)>=0&&(r='"'+r+'"'),a>0&&(t+=","),t+=r}return t+"\n"},i="",r=0;r<t.length;r++)i+=a(t[r]);var l=new Blob([i],{type:"text/csv;charset=utf-8;"});if(navigator.msSaveBlob)navigator.msSaveBlob(l,e);else{var n=document.createElement("a");if(void 0!==n.download){var o=URL.createObjectURL(l);n.setAttribute("href",o),n.setAttribute("download",e),n.style.visibility="hidden",document.body.appendChild(n),n.click(),document.body.removeChild(n)}}}export{e as c,t as e};
