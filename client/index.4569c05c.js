import{S as s,i as e,s as t,u as o,g as a,o as n}from"./client.39550401.js";function r(s){const e=o.subscribe((s=>{!s.loggedIn&&s.fetched?a("/login"):s.loggedIn&&s.fetched&&a("/dashboard")}));return n(e),[]}class c extends s{constructor(s){super(),e(this,s,r,null,t,{})}}export{c as default};
