import{af as n,P as e,Q as s,b1 as t,a8 as r}from"./client.1b06dd5c.js";var o,c,a,u,i,l,p=(u=n(null),i=u.subscribe,l=u.set,{subscribe:i,fetch:(a=e(s.mark((function n(){return s.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.prev=0,n.next=3;break;case 3:r("session").then((function(n){return n?(l(n),n):(l(null),console.log("No session found on cookies set to EN"),"en")})),n.next=12;break;case 6:return n.prev=6,n.t0=n.catch(0),console.log("Error getting session from local storage",n.t0),l(null),t("session",null),n.abrupt("return","en");case 12:case"end":return n.stop()}}),n,null,[[0,6]])}))),function(){return a.apply(this,arguments)}),setSession:(c=e(s.mark((function n(e){return s.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:try{t("session",e),l(e)}catch(n){console.log("Error setting session",n)}case 1:case"end":return n.stop()}}),n)}))),function(n){return c.apply(this,arguments)}),logout:(o=e(s.mark((function n(){return s.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return l(null),n.next=3,t("session",null);case 3:case"end":return n.stop()}}),n)}))),function(){return o.apply(this,arguments)})});export{p as s};
