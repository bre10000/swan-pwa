import{S as t,i as e,s as a,I as s,T as r,aL as c,ac as i,aj as o,e as l,z as n,t as u,c as h,a as d,C as b,b as m,d as f,f as p,h as v,j as g,k,A as _,P as E,p as T,B as y,q as w,r as $,F as x,w as D,x as P,y as R,J as B,K as S}from"./client.39550401.js";import{l as C}from"./index.79acf2d4.js";import{n as N}from"./index.8bbc6ba3.js";import{e as A}from"./csvGenerator.56fc5e7e.js";import{e as H}from"./exportPDFAlternate.b140167e.js";import"./jspdf.plugin.autotable.dc15019a.js";function I(t,e,a){const s=t.slice();return s[9]=e[a],s[11]=a,s}function M(t,e,a){const s=t.slice();return s[12]=e[a],s[11]=a,s}function V(t){let e,a,s,r,c,i,o,_,T,y,w,$,x,D,P,R,B,S,C,A,H,M,V,j,F,L,q,z,G,W,J,K,Q,Y,X,Z,tt,et,at,st,rt,ct,it,ot,lt,nt,ut,ht,dt,bt,mt,ft,pt,vt,gt,kt,_t,Et,Tt,yt,wt=t[0].attributes.name+"",$t=N(O(t[0].attributes.stocks.data))+"",xt=t[0].attributes.stocks.data,Dt=[];for(let e=0;e<xt.length;e+=1)Dt[e]=U(I(t,xt,e));return{c(){e=l("div"),a=l("br"),s=n(),r=l("h3"),c=u("Consortium Member Stock -\r\n                "),i=l("span"),o=u(wt),_=n(),T=l("hr"),y=n(),w=l("p"),$=u("Stock Items"),x=n(),D=l("table"),P=l("tr"),R=l("td"),B=u("Stock No."),S=n(),C=l("th"),A=u("Description"),H=n(),M=l("th"),V=u("Category"),j=n(),F=l("th"),L=u("Unit"),q=n(),z=l("th"),G=u("Pcs/Package"),W=n(),J=l("th"),K=u("Currency"),Q=n(),Y=l("th"),X=u("Unit Price"),Z=n(),tt=l("th"),et=u("Received"),at=n(),st=l("th"),rt=u("Remark"),ct=n(),it=l("th"),ot=u("Total"),lt=n();for(let t=0;t<Dt.length;t+=1)Dt[t].c();nt=n(),ut=l("tr"),ht=l("th"),dt=u("Total"),bt=n(),mt=l("th"),ft=n(),pt=l("th"),vt=u($t),gt=n(),kt=l("br"),_t=l("br"),Et=n(),Tt=l("br"),yt=l("br"),this.h()},l(t){e=h(t,"DIV",{class:!0});var l=d(e);a=h(l,"BR",{}),s=b(l),r=h(l,"H3",{class:!0});var n=d(r);c=m(n,"Consortium Member Stock -\r\n                "),i=h(n,"SPAN",{class:!0});var u=d(i);o=m(u,wt),u.forEach(f),n.forEach(f),_=b(l),T=h(l,"HR",{}),y=b(l),w=h(l,"P",{class:!0});var p=d(w);$=m(p,"Stock Items"),p.forEach(f),x=b(l),D=h(l,"TABLE",{class:!0});var v=d(D);P=h(v,"TR",{class:!0});var g=d(P);R=h(g,"TD",{});var k=d(R);B=m(k,"Stock No."),k.forEach(f),S=b(g),C=h(g,"TH",{class:!0});var E=d(C);A=m(E,"Description"),E.forEach(f),H=b(g),M=h(g,"TH",{class:!0});var N=d(M);V=m(N,"Category"),N.forEach(f),j=b(g),F=h(g,"TH",{class:!0});var I=d(F);L=m(I,"Unit"),I.forEach(f),q=b(g),z=h(g,"TH",{class:!0});var U=d(z);G=m(U,"Pcs/Package"),U.forEach(f),W=b(g),J=h(g,"TH",{class:!0});var O=d(J);K=m(O,"Currency"),O.forEach(f),Q=b(g),Y=h(g,"TH",{class:!0});var xt=d(Y);X=m(xt,"Unit Price"),xt.forEach(f),Z=b(g),tt=h(g,"TH",{class:!0});var Pt=d(tt);et=m(Pt,"Received"),Pt.forEach(f),at=b(g),st=h(g,"TH",{class:!0});var Rt=d(st);rt=m(Rt,"Remark"),Rt.forEach(f),ct=b(g),it=h(g,"TH",{class:!0});var Bt=d(it);ot=m(Bt,"Total"),Bt.forEach(f),g.forEach(f),lt=b(v);for(let t=0;t<Dt.length;t+=1)Dt[t].l(v);nt=b(v),ut=h(v,"TR",{class:!0});var St=d(ut);ht=h(St,"TH",{});var Ct=d(ht);dt=m(Ct,"Total"),Ct.forEach(f),bt=b(St),mt=h(St,"TH",{colspan:!0}),d(mt).forEach(f),ft=b(St),pt=h(St,"TH",{});var Nt=d(pt);vt=m(Nt,$t),Nt.forEach(f),St.forEach(f),v.forEach(f),gt=b(l),kt=h(l,"BR",{}),_t=h(l,"BR",{}),Et=b(l),Tt=h(l,"BR",{}),yt=h(l,"BR",{}),l.forEach(f),this.h()},h(){p(i,"class","has-text-weight-bold"),p(r,"class","is-size-5"),p(w,"class","card-header-title"),p(C,"class","has-text-white"),p(M,"class","has-text-white"),p(F,"class","has-text-white"),p(z,"class","has-text-white"),p(J,"class","has-text-white"),p(Y,"class","has-text-white"),p(tt,"class","has-text-white"),p(st,"class","has-text-white"),p(it,"class","has-text-white"),p(P,"class","has-background-black has-text-white"),p(mt,"colspan","8"),p(ut,"class",""),p(D,"class","table is-bordered is-fullwidth is-narrow"),p(e,"class","card p-6 svelte-1c5v81g")},m(t,l){v(t,e,l),g(e,a),g(e,s),g(e,r),g(r,c),g(r,i),g(i,o),g(e,_),g(e,T),g(e,y),g(e,w),g(w,$),g(e,x),g(e,D),g(D,P),g(P,R),g(R,B),g(P,S),g(P,C),g(C,A),g(P,H),g(P,M),g(M,V),g(P,j),g(P,F),g(F,L),g(P,q),g(P,z),g(z,G),g(P,W),g(P,J),g(J,K),g(P,Q),g(P,Y),g(Y,X),g(P,Z),g(P,tt),g(tt,et),g(P,at),g(P,st),g(st,rt),g(P,ct),g(P,it),g(it,ot),g(D,lt);for(let t=0;t<Dt.length;t+=1)Dt[t].m(D,null);g(D,nt),g(D,ut),g(ut,ht),g(ht,dt),g(ut,bt),g(ut,mt),g(ut,ft),g(ut,pt),g(pt,vt),g(e,gt),g(e,kt),g(e,_t),g(e,Et),g(e,Tt),g(e,yt)},p(t,e){if(1&e&&wt!==(wt=t[0].attributes.name+"")&&k(o,wt),1&e){let a;for(xt=t[0].attributes.stocks.data,a=0;a<xt.length;a+=1){const s=I(t,xt,a);Dt[a]?Dt[a].p(s,e):(Dt[a]=U(s),Dt[a].c(),Dt[a].m(D,nt))}for(;a<Dt.length;a+=1)Dt[a].d(1);Dt.length=xt.length}1&e&&$t!==($t=N(O(t[0].attributes.stocks.data))+"")&&k(vt,$t)},d(t){t&&f(e),E(Dt,t)}}}function j(t){let e,a,s,r,c,i,o,p,_,E,T,y,w,$,x,D,P,R,B,S,C,A,H,I,M,V,j,U,F,L,O=t[11]+1+"",q=t[12].attributes.purchase_order_item.data?.attributes.item.data?.attributes.name+"",z=t[12].attributes.purchase_order_item.data?.attributes.item.data?.attributes.category+"",G=t[12].attributes.purchase_order_item.data?.attributes.unit+"",W=t[12].attributes.purchase_order_item.data?.attributes.pieces+"",J=t[12].attributes.purchase_order_item.data?.attributes.currency+"",K=t[12].attributes.purchase_order_item.data?.attributes.unitPrice+"",Q=t[12].attributes.received+"",Y=t[12].attributes.remark+"",X=N(t[12].attributes.purchase_order_item.data?.attributes.unitPrice*t[12].attributes.received)+"";return{c(){e=l("tr"),a=l("td"),s=u(O),r=n(),c=l("td"),i=u(q),o=n(),p=l("td"),_=u(z),E=n(),T=l("td"),y=u(G),w=n(),$=l("td"),x=u(W),D=n(),P=l("td"),R=u(J),B=n(),S=l("td"),C=u(K),A=n(),H=l("td"),I=u(Q),M=n(),V=l("td"),j=u(Y),U=n(),F=l("td"),L=u(X)},l(t){e=h(t,"TR",{});var l=d(e);a=h(l,"TD",{});var n=d(a);s=m(n,O),n.forEach(f),r=b(l),c=h(l,"TD",{});var u=d(c);i=m(u,q),u.forEach(f),o=b(l),p=h(l,"TD",{});var v=d(p);_=m(v,z),v.forEach(f),E=b(l),T=h(l,"TD",{});var g=d(T);y=m(g,G),g.forEach(f),w=b(l),$=h(l,"TD",{});var k=d($);x=m(k,W),k.forEach(f),D=b(l),P=h(l,"TD",{});var N=d(P);R=m(N,J),N.forEach(f),B=b(l),S=h(l,"TD",{});var Z=d(S);C=m(Z,K),Z.forEach(f),A=b(l),H=h(l,"TD",{});var tt=d(H);I=m(tt,Q),tt.forEach(f),M=b(l),V=h(l,"TD",{});var et=d(V);j=m(et,Y),et.forEach(f),U=b(l),F=h(l,"TD",{});var at=d(F);L=m(at,X),at.forEach(f),l.forEach(f)},m(t,l){v(t,e,l),g(e,a),g(a,s),g(e,r),g(e,c),g(c,i),g(e,o),g(e,p),g(p,_),g(e,E),g(e,T),g(T,y),g(e,w),g(e,$),g($,x),g(e,D),g(e,P),g(P,R),g(e,B),g(e,S),g(S,C),g(e,A),g(e,H),g(H,I),g(e,M),g(e,V),g(V,j),g(e,U),g(e,F),g(F,L)},p(t,e){1&e&&q!==(q=t[12].attributes.purchase_order_item.data?.attributes.item.data?.attributes.name+"")&&k(i,q),1&e&&z!==(z=t[12].attributes.purchase_order_item.data?.attributes.item.data?.attributes.category+"")&&k(_,z),1&e&&G!==(G=t[12].attributes.purchase_order_item.data?.attributes.unit+"")&&k(y,G),1&e&&W!==(W=t[12].attributes.purchase_order_item.data?.attributes.pieces+"")&&k(x,W),1&e&&J!==(J=t[12].attributes.purchase_order_item.data?.attributes.currency+"")&&k(R,J),1&e&&K!==(K=t[12].attributes.purchase_order_item.data?.attributes.unitPrice+"")&&k(C,K),1&e&&Q!==(Q=t[12].attributes.received+"")&&k(I,Q),1&e&&Y!==(Y=t[12].attributes.remark+"")&&k(j,Y),1&e&&X!==(X=N(t[12].attributes.purchase_order_item.data?.attributes.unitPrice*t[12].attributes.received)+"")&&k(L,X)},d(t){t&&f(e)}}}function U(t){let e,a,s,r,c,i,o,T,y,w,$,x,D,P=t[9].id+"",R=t[9].attributes.date+"",B=t[9].attributes.warehouse.data?.attributes.name+"",S=t[9].attributes.stock_items.data,C=[];for(let e=0;e<S.length;e+=1)C[e]=j(M(t,S,e));return{c(){e=l("tr"),a=l("td"),s=u(P),r=n(),c=l("td"),i=u(R),o=n(),T=l("td"),y=u(B),w=n(),$=l("td"),x=n();for(let t=0;t<C.length;t+=1)C[t].c();D=_(),this.h()},l(t){e=h(t,"TR",{class:!0});var l=d(e);a=h(l,"TD",{});var n=d(a);s=m(n,P),n.forEach(f),r=b(l),c=h(l,"TD",{});var u=d(c);i=m(u,R),u.forEach(f),o=b(l),T=h(l,"TD",{});var p=d(T);y=m(p,B),p.forEach(f),w=b(l),$=h(l,"TD",{colspan:!0}),d($).forEach(f),l.forEach(f),x=b(t);for(let e=0;e<C.length;e+=1)C[e].l(t);D=_(),this.h()},h(){p($,"colspan","7"),p(e,"class","has-text-weight-bold")},m(t,l){v(t,e,l),g(e,a),g(a,s),g(e,r),g(e,c),g(c,i),g(e,o),g(e,T),g(T,y),g(e,w),g(e,$),v(t,x,l);for(let e=0;e<C.length;e+=1)C[e].m(t,l);v(t,D,l)},p(t,e){if(1&e&&P!==(P=t[9].id+"")&&k(s,P),1&e&&R!==(R=t[9].attributes.date+"")&&k(i,R),1&e&&B!==(B=t[9].attributes.warehouse.data?.attributes.name+"")&&k(y,B),1&e){let a;for(S=t[9].attributes.stock_items.data,a=0;a<S.length;a+=1){const s=M(t,S,a);C[a]?C[a].p(s,e):(C[a]=j(s),C[a].c(),C[a].m(D.parentNode,D))}for(;a<C.length;a+=1)C[a].d(1);C.length=S.length}},d(t){t&&f(e),t&&f(x),E(C,t),t&&f(D)}}}function F(t){let e,a,k,_,E,S,C,N,A,H,I,M,j,U,F,L,O,q,z,G,W,J,K,Q,Y,X,Z,tt,et,at,st,rt,ct,it,ot,lt,nt,ut,ht,dt,bt,mt,ft,pt,vt,gt,kt,_t,Et,Tt,yt,wt,$t,xt,Dt,Pt,Rt,Bt,St,Ct,Nt,At,Ht;N=new s({props:{data:r}}),X=new s({props:{data:c}}),ct=new s({props:{data:i}}),dt=new s({props:{data:o}});let It=t[0]&&V(t);return{c(){e=n(),a=l("br"),k=l("br"),_=n(),E=l("div"),S=l("a"),C=l("span"),T(N.$$.fragment),A=u(" Back"),H=n(),I=l("br"),M=l("br"),j=n(),U=l("div"),F=l("br"),L=l("br"),O=n(),q=l("div"),z=l("div"),G=l("h3"),W=u("Print Consortium Member Stock Report"),J=n(),K=l("div"),Q=l("button"),Y=l("span"),T(X.$$.fragment),Z=n(),tt=l("span"),et=u("Download Excel"),at=n(),st=l("button"),rt=l("span"),T(ct.$$.fragment),it=n(),ot=l("span"),lt=u("Download PDF"),nt=n(),ut=l("button"),ht=l("span"),T(dt.$$.fragment),bt=n(),mt=l("span"),ft=u("Print"),pt=n(),vt=l("br"),gt=n(),kt=l("br"),_t=l("br"),Et=n(),It&&It.c(),Tt=n(),yt=l("br"),wt=l("br"),$t=l("br"),xt=l("br"),Dt=l("br"),Pt=l("br"),Rt=l("br"),Bt=l("br"),St=l("br"),Ct=l("br"),this.h()},l(t){y('[data-svelte="svelte-1siy7ob"]',document.head).forEach(f),e=b(t),a=h(t,"BR",{class:!0}),k=h(t,"BR",{class:!0}),_=b(t),E=h(t,"DIV",{class:!0});var s=d(E);S=h(s,"A",{href:!0,class:!0});var r=d(S);C=h(r,"SPAN",{class:!0});var c=d(C);w(N.$$.fragment,c),c.forEach(f),A=m(r," Back"),r.forEach(f),H=b(s),I=h(s,"BR",{class:!0}),M=h(s,"BR",{class:!0}),j=b(s),U=h(s,"DIV",{class:!0});var i=d(U);F=h(i,"BR",{class:!0}),L=h(i,"BR",{class:!0}),O=b(i),q=h(i,"DIV",{class:!0});var o=d(q);z=h(o,"DIV",{class:!0});var l=d(z);G=h(l,"H3",{class:!0});var n=d(G);W=m(n,"Print Consortium Member Stock Report"),n.forEach(f),l.forEach(f),J=b(o),K=h(o,"DIV",{class:!0});var u=d(K);Q=h(u,"BUTTON",{class:!0});var p=d(Q);Y=h(p,"SPAN",{class:!0});var v=d(Y);w(X.$$.fragment,v),v.forEach(f),Z=b(p),tt=h(p,"SPAN",{class:!0});var g=d(tt);et=m(g,"Download Excel"),g.forEach(f),p.forEach(f),at=b(u),st=h(u,"BUTTON",{class:!0});var T=d(st);rt=h(T,"SPAN",{class:!0});var $=d(rt);w(ct.$$.fragment,$),$.forEach(f),it=b(T),ot=h(T,"SPAN",{class:!0});var x=d(ot);lt=m(x,"Download PDF"),x.forEach(f),T.forEach(f),nt=b(u),ut=h(u,"BUTTON",{class:!0});var D=d(ut);ht=h(D,"SPAN",{class:!0});var P=d(ht);w(dt.$$.fragment,P),P.forEach(f),bt=b(D),mt=h(D,"SPAN",{class:!0});var R=d(mt);ft=m(R,"Print"),R.forEach(f),D.forEach(f),u.forEach(f),o.forEach(f),pt=b(i),vt=h(i,"BR",{}),i.forEach(f),gt=b(s),kt=h(s,"BR",{class:!0}),_t=h(s,"BR",{class:!0}),Et=b(s),It&&It.l(s),s.forEach(f),Tt=b(t),yt=h(t,"BR",{}),wt=h(t,"BR",{}),$t=h(t,"BR",{}),xt=h(t,"BR",{}),Dt=h(t,"BR",{}),Pt=h(t,"BR",{}),Rt=h(t,"BR",{}),Bt=h(t,"BR",{}),St=h(t,"BR",{}),Ct=h(t,"BR",{}),this.h()},h(){document.title="Print Consortium Member",p(a,"class","hide-print svelte-1c5v81g"),p(k,"class","hide-print svelte-1c5v81g"),p(C,"class","icon is-small"),p(S,"href","consortium-members"),p(S,"class","has-text-dark hide-print svelte-1c5v81g"),p(I,"class","hide-print svelte-1c5v81g"),p(M,"class","hide-print svelte-1c5v81g"),p(F,"class","hide-print svelte-1c5v81g"),p(L,"class","hide-print svelte-1c5v81g"),p(G,"class","my-0 is-size-5 has-text-weight-bold"),p(z,"class","column"),p(Y,"class","icon"),p(tt,"class","has-text-white has-text-weight-bold"),p(Q,"class","button is-dark px-5 py-2 has-text-weight-bold"),p(rt,"class","icon"),p(ot,"class","has-text-white has-text-weight-bold"),p(st,"class","button is-dark px-5 py-2 ml-3 has-text-weight-bold"),p(ht,"class","icon"),p(mt,"class","has-text-white has-text-weight-bold"),p(ut,"class","button is-dark px-5 ml-3 py-2 has-text-weight-bold"),p(K,"class","column has-text-right"),p(q,"class","columns"),p(U,"class","card px-6 hide-print svelte-1c5v81g"),p(kt,"class","hide-print svelte-1c5v81g"),p(_t,"class","hide-print svelte-1c5v81g"),p(E,"class","container")},m(s,r){v(s,e,r),v(s,a,r),v(s,k,r),v(s,_,r),v(s,E,r),g(E,S),g(S,C),$(N,C,null),g(S,A),g(E,H),g(E,I),g(E,M),g(E,j),g(E,U),g(U,F),g(U,L),g(U,O),g(U,q),g(q,z),g(z,G),g(G,W),g(q,J),g(q,K),g(K,Q),g(Q,Y),$(X,Y,null),g(Q,Z),g(Q,tt),g(tt,et),g(K,at),g(K,st),g(st,rt),$(ct,rt,null),g(st,it),g(st,ot),g(ot,lt),g(K,nt),g(K,ut),g(ut,ht),$(dt,ht,null),g(ut,bt),g(ut,mt),g(mt,ft),g(U,pt),g(U,vt),g(E,gt),g(E,kt),g(E,_t),g(E,Et),It&&It.m(E,null),v(s,Tt,r),v(s,yt,r),v(s,wt,r),v(s,$t,r),v(s,xt,r),v(s,Dt,r),v(s,Pt,r),v(s,Rt,r),v(s,Bt,r),v(s,St,r),v(s,Ct,r),Nt=!0,At||(Ht=[x(Q,"click",t[1]),x(st,"click",t[2]),x(ut,"click",t[4])],At=!0)},p(t,[e]){t[0]?It?It.p(t,e):(It=V(t),It.c(),It.m(E,null)):It&&(It.d(1),It=null)},i(t){Nt||(D(N.$$.fragment,t),D(X.$$.fragment,t),D(ct.$$.fragment,t),D(dt.$$.fragment,t),Nt=!0)},o(t){P(N.$$.fragment,t),P(X.$$.fragment,t),P(ct.$$.fragment,t),P(dt.$$.fragment,t),Nt=!1},d(t){t&&f(e),t&&f(a),t&&f(k),t&&f(_),t&&f(E),R(N),R(X),R(ct),R(dt),It&&It.d(),t&&f(Tt),t&&f(yt),t&&f(wt),t&&f($t),t&&f(xt),t&&f(Dt),t&&f(Pt),t&&f(Rt),t&&f(Bt),t&&f(St),t&&f(Ct),At=!1,B(Ht)}}}async function L(t){return{slug:parseInt(t.params.slug)}}function O(t){let e=0;return t.forEach((t=>{t.attributes.stock_items.data?.forEach((t=>{e+=t.attributes.purchase_order_item.data?.attributes.unitPrice*t.attributes.received}))})),e}function q(t,e,a){let s,{slug:r}=e;const c=[{key:"id",title:"ID",sortable:!0,filterValue:t=>Math.floor(t.id/10),interval:10,filterType:"numeric",headerClass:"has-text-left",selected:!0},{key:"warehouse",title:"Warehouse",sortable:!0,filterValue:t=>t.first_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"consortium_member",title:"Consortium Member",sortable:!0,filterValue:t=>t.last_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"date",title:"Date",sortable:!0,filterValue:t=>t.last_name.charAt(0).toLowerCase(),filterType:"string",selected:!0}],i=[{key:"id",title:"ID",sortable:!0,selected:!0},{key:"poNumber",title:"PO#",sortable:!0,selected:!0},{key:"item",title:"ITEM",sortable:!0,selected:!0},{key:"unit",title:"Unit",sortable:!0,selected:!0},{key:"pieces",title:"Pieces",sortable:!0,selected:!0},{key:"quantity",title:"Quantity",sortable:!0,selected:!0},{key:"currency",title:"Currency",sortable:!0,selected:!0},{key:"unitPrice",title:"Unit Price",sortable:!0,selected:!0},{key:"received",title:"Received",sortable:!0,selected:!0},{key:"remark",title:"Remark",sortable:!0,selected:!0},{key:"total",title:"Total",sortable:!0,selected:!0}];function o(t){let e=[];return t.forEach((t=>{e.push([t.id,t.attributes.warehouse.data.attributes.name,s.attributes.name,t.attributes.date,"-","-","-","-","-","-","-","-","-","-"]),t.attributes.stock_items.data.forEach((t=>{e.push(["-","-","-","-",t.id,t.attributes.purchase_order_item.data.attributes.purchase_order.data.attributes.poNumber,t.attributes.purchase_order_item.data.attributes.item.data.attributes.name,t.attributes.purchase_order_item.data.attributes.unit,t.attributes.purchase_order_item.data.attributes.pieces,t.attributes.purchase_order_item.data.attributes.quantity,t.attributes.purchase_order_item.data.attributes.currency,t.attributes.purchase_order_item.data.attributes.unitPrice,t.attributes.received,t.attributes.remark,t.attributes.purchase_order_item.data.attributes.unitPrice*t.attributes.received])}))})),e.push(["Total","-","-","-","-","-","-","-","-","-","-","-","-","-",N(O(s.attributes.stocks.data))]),e}return t.$$set=t=>{"slug"in t&&a(3,r=t.slug)},t.$$.update=()=>{8&t.$$.dirty&&r&&async function(){try{let t={populate:["stocks","stocks.stock_items","stocks.warehouse","stocks.stock_items.purchase_order_item","stocks.stock_items.purchase_order_item.item","stocks.stock_items.purchase_order_item.purchase_order"]};t=C.stringify(t,{encodeValuesOnly:!0});let e=await S("consortium-members/"+r,t);console.log("Get Consortium Member by ID ",e),a(0,s=e.data)}catch(t){console.log("Error get Consortium Member by ID ",t)}}()},[s,function(){let t=new Date,e=`"SWAN Partner Stocks - "${s.attributes.name} ${t.getFullYear()}-${t.getMonth()}-${t.getDate()} T${t.getHours()}-${t.getMinutes()}-${t.getSeconds()}.csv`,a=o(s.attributes.stocks.data);a=[c.concat(i).map((t=>t.title)),...a],A(e,a)},function(){H("Partner Stocks - "+s.attributes.name,o(s.attributes.stocks.data),c.concat(i))},r,()=>{window.print()}]}class z extends t{constructor(t){super(),e(this,t,q,F,a,{slug:3})}}export{z as default,L as preload};
