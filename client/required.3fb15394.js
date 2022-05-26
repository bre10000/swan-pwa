import{$ as e,a0 as n,a1 as t}from"./client.9bda2085.js";function r(...t){let r=[],a=[];if(t.forEach((n=>{const t=e(n);r.includes(t.name)?a=a.includes(t.name)?a:[...a,t.name]:r=[...r,t.name]})),a.length)throw new Error(`Cannot have the fields with the same name: ${a.join(", ")}`);const i=n(t,(e=>({valid:e.every((e=>e.valid)),dirty:e.some((e=>e.dirty)),errors:e.map((e=>e.errors.map((n=>n.includes(".")?n:`${e.name}.${n}`)))).flat().filter(((e,n,t)=>t.indexOf(e)===n)),hasError(e){return-1!==this.errors.findIndex((n=>n===e))}}))),{subscribe:s}=i;return{subscribe:s,reset:function(){t.forEach((e=>e.reset&&e.reset()))},validate:async function(){for(const e of t)e.validate&&await e.validate()},getField:function(n){return t.find((t=>e(t).name===n))},summary:function(){return t.reduce(((n,t)=>{const r=e(t);return n[r.name]=r.value,n}),{})}}}var a=s,i=s;function s(e){return!!e&&("object"==typeof e||"function"==typeof e)&&"function"==typeof e.then}a.default=i;const o={valid:!0,checkOnInit:!1,validateOnChange:!0,stopAtFirstError:!1};async function u(n,t,r=!1){const i=function(n){return void 0!==n.subscribe?e(n).value:n.name&&void 0!==n.valid?n.value:n}(n);let s=[];for(const e of t){let n=e(i);if(a(n)&&(n=await n),r&&!n.valid){s=[n];break}s=[...s,n]}return s}function l(e,n,t={}){if(n){const r=n.filter((e=>!e.valid)).map((e=>e.name)),a=!r.length;return{...e,valid:a,invalid:!a,errors:r,...t}}return e}function c(n,r,a=[],i){const s={name:n,value:r,valid:i.valid,invalid:!i.valid,dirty:!1,errors:[]},o=t(s),{subscribe:c,update:d,set:f}=o;async function v(n,t=!1){if(function(e){const n=Object.keys(e);return["name","value","valid","invalid","errors"].every((e=>n.includes(e)))}(n)||(n=l(e(o),[],{value:n})),t||i.validateOnChange){let e=await u(n,a,i.stopAtFirstError);f(l(n,e,{dirty:!0}))}else f(l(n,[],{dirty:!0}))}return i.checkOnInit&&v(s),{subscribe:c,update:d,set:v,validate:async function(){const e=await u(o,a,i.stopAtFirstError);let n;return d((t=>(n=l(t,e,{dirty:!1}),n))),n},reset:function(){f(l({dirty:!1,errors:[],name:n,valid:i.valid,invalid:!i.valid,value:r}))}}}function d(e,n,t=[],r={}){return c(e,n,t,{...o,...r})}function f(){return e=>{let n=!0;if(null==e&&(n=!1),"string"==typeof e){n=e.replace(/\s/g,"").length>0}return{valid:n,name:"required"}}}export{r as a,d as f,f as r};
