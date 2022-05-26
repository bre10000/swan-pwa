import{S as t,i as a,s as e,e as s,t as r,c as o,a as l,b as i,d as c,f as n,h as d,j as f,k as u,I as h,m as p,n as g,z as m,p as v,B as $,C as y,q as E,D as b,E as w,r as D,F as A,G as x,x as V,H as I,w as P,y as T,J as B,u as R,g as k,o as L,K as C,L as S,v as _}from"./client.e36e64da.js";import{D as F}from"./DataTable.08b6e8a6.js";import{l as j}from"./index.79acf2d4.js";import{e as N}from"./csvGenerator.56fc5e7e.js";import"./jspdf.plugin.autotable.dc15019a.js";import{e as H}from"./exportPDFAlternate.b140167e.js";import"./SelectedColumns.e82dc90b.js";import"./SelectedColumns.61150ba7.js";import"./DataTable.addde9e1.js";function U(t){let a,e,h=t[2].total+"";return{c(){a=s("span"),e=r(h),this.h()},l(t){a=o(t,"SPAN",{class:!0});var s=l(a);e=i(s,h),s.forEach(c),this.h()},h(){n(a,"class","gray has-text-weight-light ml-2")},m(t,s){d(t,a,s),f(a,e)},p(t,a){4&a&&h!==(h=t[2].total+"")&&u(e,h)},d(t){t&&c(a)}}}function M(t){let a,e,u,g,$,b,w,A,x,I,B,R,k,L,C,S;return w=new h({props:{data:p,scale:"3"}}),{c(){a=s("div"),e=s("br"),u=s("br"),g=s("br"),$=s("br"),b=m(),v(w.$$.fragment),A=m(),x=s("p"),I=r("Uh oh! nothing found on database."),B=m(),R=s("br"),k=s("br"),L=s("br"),C=s("br"),this.h()},l(t){a=o(t,"DIV",{class:!0});var s=l(a);e=o(s,"BR",{}),u=o(s,"BR",{}),g=o(s,"BR",{}),$=o(s,"BR",{}),b=y(s),E(w.$$.fragment,s),A=y(s),x=o(s,"P",{class:!0});var r=l(x);I=i(r,"Uh oh! nothing found on database."),r.forEach(c),B=y(s),R=o(s,"BR",{}),k=o(s,"BR",{}),L=o(s,"BR",{}),C=o(s,"BR",{}),s.forEach(c),this.h()},h(){n(x,"class","gray"),n(a,"class","has-text-centered")},m(t,s){d(t,a,s),f(a,e),f(a,u),f(a,g),f(a,$),f(a,b),D(w,a,null),f(a,A),f(a,x),f(x,I),f(a,B),f(a,R),f(a,k),f(a,L),f(a,C),S=!0},p:_,i(t){S||(P(w.$$.fragment,t),S=!0)},o(t){V(w.$$.fragment,t),S=!1},d(t){t&&c(a),T(w)}}}function O(t){let a,e;return a=new F({props:{pagination:t[2],columns:t[3],rows:t[1],options:t[4]}}),a.$on("clickCol",t[7]),a.$on("changePage",t[6]),a.$on("clickRow",t[8]),{c(){v(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,s){D(a,t,s),e=!0},p(t,e){const s={};4&e&&(s.pagination=t[2]),2&e&&(s.rows=t[1]),a.$set(s)},i(t){e||(P(a.$$.fragment,t),e=!0)},o(t){V(a.$$.fragment,t),e=!1},d(t){T(a,t)}}}function G(t){let a,e,u,R,k,L,C,_,F,j,N,H,G,q,W,Y,z,J,K,Q,X,Z,tt,at,et,st,rt,ot,lt,it,ct,nt,dt,ft,ut,ht,pt,gt,mt,vt,$t,yt,Et,bt,wt,Dt,At,xt,Vt,It,Pt,Tt,Bt,Rt,kt,Lt,Ct,St,_t,Ft,jt,Nt,Ht,Ut=t[2]&&U(t);Q=new h({props:{data:p}}),ft=new h({props:{data:g}});const Mt=[O,M],Ot=[];function Gt(t,a){return t[1]?.length>0?0:1}return Bt=Gt(t),Rt=Ot[Bt]=Mt[Bt](t),{c(){a=m(),e=s("br"),u=s("br"),R=m(),k=s("div"),L=s("div"),C=s("div"),_=s("h3"),F=r("Activity Logs\r\n                "),Ut&&Ut.c(),j=m(),N=s("div"),H=m(),G=s("div"),q=s("div"),W=s("div"),Y=s("div"),z=s("input"),J=m(),K=s("span"),v(Q.$$.fragment),X=m(),Z=s("div"),tt=s("button"),at=r("Search"),et=m(),st=s("div"),rt=s("div"),ot=s("div"),lt=s("button"),it=s("span"),ct=r("Export To Excel or PDF"),nt=m(),dt=s("span"),v(ft.$$.fragment),ut=m(),ht=s("div"),pt=s("div"),gt=s("a"),mt=r("Export Current Page to Excel"),vt=m(),$t=s("a"),yt=r("Export Current Page to PDF"),Et=m(),bt=s("hr"),wt=m(),Dt=s("a"),At=r("Export All to Excel"),xt=m(),Vt=s("a"),It=r("Export All to PDF"),Pt=m(),Tt=s("div"),Rt.c(),kt=m(),Lt=s("br"),Ct=s("br"),St=s("br"),_t=s("br"),Ft=s("br"),this.h()},l(t){$('[data-svelte="svelte-ca7659"]',document.head).forEach(c),a=y(t),e=o(t,"BR",{}),u=o(t,"BR",{}),R=y(t),k=o(t,"DIV",{class:!0});var s=l(k);L=o(s,"DIV",{class:!0});var r=l(L);C=o(r,"DIV",{class:!0});var n=l(C);_=o(n,"H3",{});var d=l(_);F=i(d,"Activity Logs\r\n                "),Ut&&Ut.l(d),d.forEach(c),n.forEach(c),j=y(r),N=o(r,"DIV",{class:!0}),l(N).forEach(c),r.forEach(c),H=y(s),G=o(s,"DIV",{class:!0});var f=l(G);q=o(f,"DIV",{class:!0});var h=l(q);W=o(h,"DIV",{class:!0,style:!0});var p=l(W);Y=o(p,"DIV",{class:!0});var g=l(Y);z=o(g,"INPUT",{class:!0,type:!0,placeholder:!0}),J=y(g),K=o(g,"SPAN",{class:!0});var m=l(K);E(Q.$$.fragment,m),m.forEach(c),g.forEach(c),X=y(p),Z=o(p,"DIV",{class:!0});var v=l(Z);tt=o(v,"BUTTON",{class:!0});var b=l(tt);at=i(b,"Search"),b.forEach(c),v.forEach(c),p.forEach(c),h.forEach(c),et=y(f),st=o(f,"DIV",{class:!0});var w=l(st);rt=o(w,"DIV",{class:!0});var D=l(rt);ot=o(D,"DIV",{class:!0});var A=l(ot);lt=o(A,"BUTTON",{class:!0,"aria-haspopup":!0,"aria-controls":!0});var x=l(lt);it=o(x,"SPAN",{});var V=l(it);ct=i(V,"Export To Excel or PDF"),V.forEach(c),nt=y(x),dt=o(x,"SPAN",{class:!0});var I=l(dt);E(ft.$$.fragment,I),I.forEach(c),x.forEach(c),A.forEach(c),ut=y(D),ht=o(D,"DIV",{class:!0,id:!0,role:!0});var P=l(ht);pt=o(P,"DIV",{class:!0});var T=l(pt);gt=o(T,"A",{href:!0,class:!0});var B=l(gt);mt=i(B,"Export Current Page to Excel"),B.forEach(c),vt=y(T),$t=o(T,"A",{href:!0,class:!0});var S=l($t);yt=i(S,"Export Current Page to PDF"),S.forEach(c),Et=y(T),bt=o(T,"HR",{class:!0}),wt=y(T),Dt=o(T,"A",{href:!0,class:!0});var U=l(Dt);At=i(U,"Export All to Excel"),U.forEach(c),xt=y(T),Vt=o(T,"A",{href:!0,class:!0});var M=l(Vt);It=i(M,"Export All to PDF"),M.forEach(c),T.forEach(c),P.forEach(c),D.forEach(c),w.forEach(c),f.forEach(c),Pt=y(s),Tt=o(s,"DIV",{class:!0});var O=l(Tt);Rt.l(O),O.forEach(c),kt=y(s),Lt=o(s,"BR",{}),Ct=o(s,"BR",{}),St=o(s,"BR",{}),_t=o(s,"BR",{}),Ft=o(s,"BR",{}),s.forEach(c),this.h()},h(){document.title="Activity Logs",n(C,"class","column"),n(N,"class","column has-text-right"),n(L,"class","columns"),n(z,"class","input is-dark"),n(z,"type","search"),n(z,"placeholder","search"),n(K,"class","icon is-small is-left"),n(Y,"class","control has-icons-left"),n(tt,"class","button is-dark has-text-weight-bold"),n(Z,"class","control"),n(W,"class","field has-addons"),b(W,"width","500px"),n(q,"class","column"),n(dt,"class","icon is-small"),n(lt,"class","button"),n(lt,"aria-haspopup","true"),n(lt,"aria-controls","dropdown-menu"),n(ot,"class","dropdown-trigger"),n(gt,"href","#"),n(gt,"class","dropdown-item"),n($t,"href","#"),n($t,"class","dropdown-item"),n(bt,"class","dropdown-divider"),n(Dt,"href","#"),n(Dt,"class","dropdown-item"),n(Vt,"href","#"),n(Vt,"class","dropdown-item"),n(pt,"class","dropdown-content has-text-left"),n(ht,"class","dropdown-menu"),n(ht,"id","dropdown-menu"),n(ht,"role","menu"),n(rt,"class","dropdown is-hoverable"),n(st,"class","column has-text-right"),n(G,"class","columns"),n(Tt,"class","card"),n(k,"class","container px-6")},m(s,r){d(s,a,r),d(s,e,r),d(s,u,r),d(s,R,r),d(s,k,r),f(k,L),f(L,C),f(C,_),f(_,F),Ut&&Ut.m(_,null),f(L,j),f(L,N),f(k,H),f(k,G),f(G,q),f(q,W),f(W,Y),f(Y,z),w(z,t[0]),f(Y,J),f(Y,K),D(Q,K,null),f(W,X),f(W,Z),f(Z,tt),f(tt,at),f(G,et),f(G,st),f(st,rt),f(rt,ot),f(ot,lt),f(lt,it),f(it,ct),f(lt,nt),f(lt,dt),D(ft,dt,null),f(rt,ut),f(rt,ht),f(ht,pt),f(pt,gt),f(gt,mt),f(pt,vt),f(pt,$t),f($t,yt),f(pt,Et),f(pt,bt),f(pt,wt),f(pt,Dt),f(Dt,At),f(pt,xt),f(pt,Vt),f(Vt,It),f(k,Pt),f(k,Tt),Ot[Bt].m(Tt,null),f(k,kt),f(k,Lt),f(k,Ct),f(k,St),f(k,_t),f(k,Ft),jt=!0,Nt||(Ht=[A(z,"input",t[13]),A(tt,"click",t[5]),A(gt,"click",x(t[9])),A($t,"click",x(t[10])),A(Dt,"click",x(t[11])),A(Vt,"click",x(t[12]))],Nt=!0)},p(t,[a]){t[2]?Ut?Ut.p(t,a):(Ut=U(t),Ut.c(),Ut.m(_,null)):Ut&&(Ut.d(1),Ut=null),1&a&&w(z,t[0]);let e=Bt;Bt=Gt(t),Bt===e?Ot[Bt].p(t,a):(S(),V(Ot[e],1,1,(()=>{Ot[e]=null})),I(),Rt=Ot[Bt],Rt?Rt.p(t,a):(Rt=Ot[Bt]=Mt[Bt](t),Rt.c()),P(Rt,1),Rt.m(Tt,null))},i(t){jt||(P(Q.$$.fragment,t),P(ft.$$.fragment,t),P(Rt),jt=!0)},o(t){V(Q.$$.fragment,t),V(ft.$$.fragment,t),V(Rt),jt=!1},d(t){t&&c(a),t&&c(e),t&&c(u),t&&c(R),t&&c(k),Ut&&Ut.d(),T(Q),T(ft),Ot[Bt].d(),Nt=!1,B(Ht)}}}function q(t){let a=[];return t.forEach((t=>{a.push([t.id,t.attributes.users_permissions_user.data?.attributes.name,t.attributes.users_permissions_user.data?.attributes.email,t.attributes.type,t.attributes.action,t.attributes.date])})),a}function W(t,a,e){const s=R.subscribe((t=>{!t.loggedIn&&t.fetched?k("login"):t.data&&n()}));L(s);let r="",o="",l=[];const i=[{key:"id",title:"ID",sortable:!0,filterValue:t=>Math.floor(t.id/10),interval:10,filterType:"numeric",headerClass:"has-text-left",selected:!0},{key:"userName",title:"User's Name",sortable:!0,filterValue:t=>t.first_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"email",title:"Email",sortable:!0,filterValue:t=>t.first_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"type",title:"Type",sortable:!0,filterValue:t=>t.first_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"action",title:"Action",sortable:!0,filterValue:t=>t.first_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"createdAt",title:"Date",sortable:!0,filterValue:t=>t.last_name.charAt(0).toLowerCase(),filterType:"string",selected:!0}];let c;async function n(t,a,s){try{let r={filters:t||{},sort:a||"id:desc",populate:"*","pagination[page]":s||1};r=j.stringify(r,{encodeValuesOnly:!0});let o=await C("activity-logs",r);console.log("Get Activity Logs Request - ",o),e(1,l=o.data),e(2,c=o.meta?.pagination)}catch(t){console.warn("Error Getting Activity Logs - ",t)}}function d(){return{$or:[{action:{$containsi:r}},{type:{$containsi:r}},{date:{$containsi:r}},{users_permissions_user:{name:{$containsi:r}}},{users_permissions_user:{email:{$containsi:r}}}]}}return[r,l,c,i,{title:"Activity Logs Table",showFilterHeader:!1,showSelect:!1,showDetails:!1,showActions:!1,showFooter:!1},function(){n(d(),o)},function(t){n(d(),o,t.detail.newPage)},function(t){o=t.detail.key,n(d(),o,t.detail.newPage)},function(t){k("activity-logs/detail/"+t.detail.row.id)},function(){let t=new Date,a=`"SWAN "Activity Logs ${t.getFullYear()}-${t.getMonth()}-${t.getDate()} T${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}.csv`,e=q(l);e=[i.map((t=>t.title)),...e],N(a,e)},function(){H("Activity Logs",q(l),i)},async function(){try{let t={populate:"*","pagination[limit]":-1};t=j.stringify(t,{encodeValuesOnly:!0});let a=await C("activity-logs",t),e=new Date,s=`"SWAN "Activity Logs ${e.getFullYear()}-${e.getMonth()}-${e.getDate()} T${e.getHours()}-${e.getMinutes()}-${e.getSeconds()}.csv`,r=q(a.data);r=[i.map((t=>t.title)),...r],N(s,r)}catch(t){}},async function(){try{let t={populate:"*","pagination[limit]":-1};t=j.stringify(t,{encodeValuesOnly:!0});let a=await C("activity-logs",t);H("Activity Logs",q(a.data),i)}catch(t){}},function(){r=this.value,e(0,r)}]}class Y extends t{constructor(t){super(),a(this,t,W,G,e,{})}}export{Y as default};
