import{af as e,P as n,Q as s,b1 as t,a8 as r}from"./client.e6a3251e.js";var o,a,c,u,i,l,p=(u=e(null),i=u.subscribe,l=u.set,{subscribe:i,fetch:(c=n(s.mark((function e(){return s.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,e.next=3;break;case 3:r("session").then((function(e){return e?(l(e),e):(l(null),console.log("No session found on cookies set to EN"),"en")})),e.next=12;break;case 6:return e.prev=6,e.t0=e.catch(0),console.log("Error getting session from local storage",e.t0),l(null),t("session",null),e.abrupt("return","en");case 12:case"end":return e.stop()}}),e,null,[[0,6]])}))),function(){return c.apply(this,arguments)}),setSession:(a=n(s.mark((function e(n){return s.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:try{t("session",n),l(n)}catch(e){console.log("Error setting session",e)}case 1:case"end":return e.stop()}}),e)}))),function(e){return a.apply(this,arguments)}),logout:(o=n(s.mark((function e(){return s.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return l(null),e.next=3,t("session",null);case 3:case"end":return e.stop()}}),e)}))),function(){return o.apply(this,arguments)})});export{p as s};
