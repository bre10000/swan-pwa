function t(t){if(!t)return t;t=(t=Math.round(100*t)/100).toString();for(var r=/(-?\d+)(\d{3})/;r.test(t);)t=t.replace(r,"$1,$2");return t}function r(t,r){let e=[];return t.forEach((t=>{let n=[t.id];r.forEach((r=>{"id"!=r&&n.push(t.attributes[r])})),e.push(n)})),e}export{r as g,t as n};
