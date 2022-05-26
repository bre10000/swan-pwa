import{S as e,i as t,s as a,e as s,t as r,c as o,a as c,b as l,d as i,f as n,h as u,j as d,k as m,I as h,l as p,m as f,n as g,p as b,q as $,r as _,v as k,w as v,x as E,y as w,z as y,A as D,B as R,C as x,D as S,E as P,F as A,G as B,H as V,J as I,u as N,g as T,o as C,K as j,L as F,M,N as q}from"./client.e36e64da.js";import{l as U}from"./index.79acf2d4.js";import{D as H}from"./DeleteConfirmation.b78e7fe6.js";import{D as O}from"./DataTableDetails.e6be7de4.js";import{e as G}from"./csvGenerator.56fc5e7e.js";import{e as L}from"./exportPDFAlternate.b140167e.js";import{c as Q}from"./log.98c6314c.js";import"./SelectedColumns.e82dc90b.js";import"./SelectedColumns.61150ba7.js";import"./jspdf.plugin.autotable.dc15019a.js";function W(e){let t,a,h=e[3].total+"";return{c(){t=s("span"),a=r(h),this.h()},l(e){t=o(e,"SPAN",{class:!0});var s=c(t);a=l(s,h),s.forEach(i),this.h()},h(){n(t,"class","gray has-text-weight-light ml-2")},m(e,s){u(e,t,s),d(t,a)},p(e,t){8&t&&h!==(h=e[3].total+"")&&m(a,h)},d(e){e&&i(t)}}}function Y(e){let t,a,m,p,g,D,R,S,P,A,B,V,I,N,T,C;return R=new h({props:{data:f,scale:"3"}}),{c(){t=s("div"),a=s("br"),m=s("br"),p=s("br"),g=s("br"),D=y(),b(R.$$.fragment),S=y(),P=s("p"),A=r("Uh oh! nothing found on database."),B=y(),V=s("br"),I=s("br"),N=s("br"),T=s("br"),this.h()},l(e){t=o(e,"DIV",{class:!0});var s=c(t);a=o(s,"BR",{}),m=o(s,"BR",{}),p=o(s,"BR",{}),g=o(s,"BR",{}),D=x(s),$(R.$$.fragment,s),S=x(s),P=o(s,"P",{class:!0});var r=c(P);A=l(r,"Uh oh! nothing found on database."),r.forEach(i),B=x(s),V=o(s,"BR",{}),I=o(s,"BR",{}),N=o(s,"BR",{}),T=o(s,"BR",{}),s.forEach(i),this.h()},h(){n(P,"class","gray"),n(t,"class","has-text-centered")},m(e,s){u(e,t,s),d(t,a),d(t,m),d(t,p),d(t,g),d(t,D),_(R,t,null),d(t,S),d(t,P),d(P,A),d(t,B),d(t,V),d(t,I),d(t,N),d(t,T),C=!0},p:k,i(e){C||(v(R.$$.fragment,e),C=!0)},o(e){E(R.$$.fragment,e),C=!1},d(e){e&&i(t),w(R)}}}function z(e){let t,a;return t=new O({props:{pagination:e[3],columns:e[4],columnsDetails:e[5],detailVariable:X,rows:e[2],options:e[6]}}),t.$on("clickCol",e[9]),t.$on("changePage",e[8]),t.$on("deleteRow",e[12]),t.$on("editRow",e[10]),t.$on("clickRow",e[10]),t.$on("printRow",e[11]),{c(){b(t.$$.fragment)},l(e){$(t.$$.fragment,e)},m(e,s){_(t,e,s),a=!0},p(e,a){const s={};8&a&&(s.pagination=e[3]),4&a&&(s.rows=e[2]),t.$set(s)},i(e){a||(v(t.$$.fragment,e),a=!0)},o(e){E(t.$$.fragment,e),a=!1},d(e){w(t,e)}}}function J(e){let t,a;return t=new H({}),t.$on("confirm",e[13]),t.$on("dismiss",e[19]),{c(){b(t.$$.fragment)},l(e){$(t.$$.fragment,e)},m(e,s){_(t,e,s),a=!0},p:k,i(e){a||(v(t.$$.fragment,e),a=!0)},o(e){E(t.$$.fragment,e),a=!1},d(e){w(t,e)}}}function K(e){let t,a,m,k,N,T,C,j,M,q,U,H,O,G,L,Q,K,X,Z,ee,te,ae,se,re,oe,ce,le,ie,ne,ue,de,me,he,pe,fe,ge,be,$e,_e,ke,ve,Ee,we,ye,De,Re,xe,Se,Pe,Ae,Be,Ve,Ie,Ne,Te,Ce,je,Fe,Me,qe,Ue,He,Oe,Ge,Le,Qe,We,Ye,ze,Je,Ke,Xe=e[3]&&W(e);G=new h({props:{data:p}}),ce=new h({props:{data:f}}),ke=new h({props:{data:g}});const Ze=[z,Y],et=[];function tt(e,t){return e[2]?.length>0?0:1}Me=tt(e),qe=et[Me]=Ze[Me](e);let at=e[1]&&J(e);return{c(){t=y(),a=s("br"),m=s("br"),k=y(),N=s("div"),T=s("div"),C=s("div"),j=s("h3"),M=r("Stock Releases\r\n                "),Xe&&Xe.c(),q=y(),U=s("div"),H=s("a"),O=s("span"),b(G.$$.fragment),L=y(),Q=s("span"),K=r("Add a Stock Release"),X=y(),Z=s("div"),ee=s("div"),te=s("div"),ae=s("div"),se=s("input"),re=y(),oe=s("span"),b(ce.$$.fragment),le=y(),ie=s("div"),ne=s("button"),ue=r("Search"),de=y(),me=s("div"),he=s("div"),pe=s("div"),fe=s("button"),ge=s("span"),be=r("Export To Excel or PDF"),$e=y(),_e=s("span"),b(ke.$$.fragment),ve=y(),Ee=s("div"),we=s("div"),ye=s("a"),De=r("Export Current Page to Excel"),Re=y(),xe=s("a"),Se=r("Export Current Page to PDF"),Pe=y(),Ae=s("hr"),Be=y(),Ve=s("a"),Ie=r("Export All to Excel"),Ne=y(),Te=s("a"),Ce=r("Export All to PDF"),je=y(),Fe=s("div"),qe.c(),Ue=y(),He=s("br"),Oe=s("br"),Ge=s("br"),Le=s("br"),Qe=s("br"),We=y(),at&&at.c(),Ye=D(),this.h()},l(e){R('[data-svelte="svelte-vj1x89"]',document.head).forEach(i),t=x(e),a=o(e,"BR",{}),m=o(e,"BR",{}),k=x(e),N=o(e,"DIV",{class:!0});var s=c(N);T=o(s,"DIV",{class:!0});var r=c(T);C=o(r,"DIV",{class:!0});var n=c(C);j=o(n,"H3",{});var u=c(j);M=l(u,"Stock Releases\r\n                "),Xe&&Xe.l(u),u.forEach(i),n.forEach(i),q=x(r),U=o(r,"DIV",{class:!0});var d=c(U);H=o(d,"A",{href:!0,class:!0});var h=c(H);O=o(h,"SPAN",{class:!0});var p=c(O);$(G.$$.fragment,p),p.forEach(i),L=x(h),Q=o(h,"SPAN",{class:!0});var f=c(Q);K=l(f,"Add a Stock Release"),f.forEach(i),h.forEach(i),d.forEach(i),r.forEach(i),X=x(s),Z=o(s,"DIV",{class:!0});var g=c(Z);ee=o(g,"DIV",{class:!0});var b=c(ee);te=o(b,"DIV",{class:!0,style:!0});var _=c(te);ae=o(_,"DIV",{class:!0});var v=c(ae);se=o(v,"INPUT",{class:!0,type:!0,placeholder:!0}),re=x(v),oe=o(v,"SPAN",{class:!0});var E=c(oe);$(ce.$$.fragment,E),E.forEach(i),v.forEach(i),le=x(_),ie=o(_,"DIV",{class:!0});var w=c(ie);ne=o(w,"BUTTON",{class:!0});var y=c(ne);ue=l(y,"Search"),y.forEach(i),w.forEach(i),_.forEach(i),b.forEach(i),de=x(g),me=o(g,"DIV",{class:!0});var S=c(me);he=o(S,"DIV",{class:!0});var P=c(he);pe=o(P,"DIV",{class:!0});var A=c(pe);fe=o(A,"BUTTON",{class:!0,"aria-haspopup":!0,"aria-controls":!0});var B=c(fe);ge=o(B,"SPAN",{});var V=c(ge);be=l(V,"Export To Excel or PDF"),V.forEach(i),$e=x(B),_e=o(B,"SPAN",{class:!0});var I=c(_e);$(ke.$$.fragment,I),I.forEach(i),B.forEach(i),A.forEach(i),ve=x(P),Ee=o(P,"DIV",{class:!0,id:!0,role:!0});var F=c(Ee);we=o(F,"DIV",{class:!0});var W=c(we);ye=o(W,"A",{href:!0,class:!0});var Y=c(ye);De=l(Y,"Export Current Page to Excel"),Y.forEach(i),Re=x(W),xe=o(W,"A",{href:!0,class:!0});var z=c(xe);Se=l(z,"Export Current Page to PDF"),z.forEach(i),Pe=x(W),Ae=o(W,"HR",{class:!0}),Be=x(W),Ve=o(W,"A",{href:!0,class:!0});var J=c(Ve);Ie=l(J,"Export All to Excel"),J.forEach(i),Ne=x(W),Te=o(W,"A",{href:!0,class:!0});var Me=c(Te);Ce=l(Me,"Export All to PDF"),Me.forEach(i),W.forEach(i),F.forEach(i),P.forEach(i),S.forEach(i),g.forEach(i),je=x(s),Fe=o(s,"DIV",{class:!0});var ze=c(Fe);qe.l(ze),ze.forEach(i),Ue=x(s),He=o(s,"BR",{}),Oe=o(s,"BR",{}),Ge=o(s,"BR",{}),Le=o(s,"BR",{}),Qe=o(s,"BR",{}),s.forEach(i),We=x(e),at&&at.l(e),Ye=D(),this.h()},h(){document.title="Stock Releases",n(C,"class","column"),n(O,"class","icon"),n(Q,"class","has-text-white has-text-weight-bold"),n(H,"href","stock-releases/add"),n(H,"class","button is-dark px-5"),n(U,"class","column has-text-right"),n(T,"class","columns"),n(se,"class","input is-dark"),n(se,"type","search"),n(se,"placeholder","search"),n(oe,"class","icon is-small is-left"),n(ae,"class","control has-icons-left"),n(ne,"class","button is-dark has-text-weight-bold"),n(ie,"class","control"),n(te,"class","field has-addons"),S(te,"width","500px"),n(ee,"class","column"),n(_e,"class","icon is-small"),n(fe,"class","button"),n(fe,"aria-haspopup","true"),n(fe,"aria-controls","dropdown-menu"),n(pe,"class","dropdown-trigger"),n(ye,"href","#"),n(ye,"class","dropdown-item"),n(xe,"href","#"),n(xe,"class","dropdown-item"),n(Ae,"class","dropdown-divider"),n(Ve,"href","#"),n(Ve,"class","dropdown-item"),n(Te,"href","#"),n(Te,"class","dropdown-item"),n(we,"class","dropdown-content has-text-left"),n(Ee,"class","dropdown-menu"),n(Ee,"id","dropdown-menu"),n(Ee,"role","menu"),n(he,"class","dropdown is-hoverable"),n(me,"class","column has-text-right"),n(Z,"class","columns"),n(Fe,"class","card"),n(N,"class","container px-6")},m(s,r){u(s,t,r),u(s,a,r),u(s,m,r),u(s,k,r),u(s,N,r),d(N,T),d(T,C),d(C,j),d(j,M),Xe&&Xe.m(j,null),d(T,q),d(T,U),d(U,H),d(H,O),_(G,O,null),d(H,L),d(H,Q),d(Q,K),d(N,X),d(N,Z),d(Z,ee),d(ee,te),d(te,ae),d(ae,se),P(se,e[0]),d(ae,re),d(ae,oe),_(ce,oe,null),d(te,le),d(te,ie),d(ie,ne),d(ne,ue),d(Z,de),d(Z,me),d(me,he),d(he,pe),d(pe,fe),d(fe,ge),d(ge,be),d(fe,$e),d(fe,_e),_(ke,_e,null),d(he,ve),d(he,Ee),d(Ee,we),d(we,ye),d(ye,De),d(we,Re),d(we,xe),d(xe,Se),d(we,Pe),d(we,Ae),d(we,Be),d(we,Ve),d(Ve,Ie),d(we,Ne),d(we,Te),d(Te,Ce),d(N,je),d(N,Fe),et[Me].m(Fe,null),d(N,Ue),d(N,He),d(N,Oe),d(N,Ge),d(N,Le),d(N,Qe),u(s,We,r),at&&at.m(s,r),u(s,Ye,r),ze=!0,Je||(Ke=[A(se,"input",e[18]),A(ne,"click",e[7]),A(ye,"click",B(e[14])),A(xe,"click",B(e[15])),A(Ve,"click",B(e[16])),A(Te,"click",B(e[17]))],Je=!0)},p(e,[t]){e[3]?Xe?Xe.p(e,t):(Xe=W(e),Xe.c(),Xe.m(j,null)):Xe&&(Xe.d(1),Xe=null),1&t&&P(se,e[0]);let a=Me;Me=tt(e),Me===a?et[Me].p(e,t):(F(),E(et[a],1,1,(()=>{et[a]=null})),V(),qe=et[Me],qe?qe.p(e,t):(qe=et[Me]=Ze[Me](e),qe.c()),v(qe,1),qe.m(Fe,null)),e[1]?at?(at.p(e,t),2&t&&v(at,1)):(at=J(e),at.c(),v(at,1),at.m(Ye.parentNode,Ye)):at&&(F(),E(at,1,1,(()=>{at=null})),V())},i(e){ze||(v(G.$$.fragment,e),v(ce.$$.fragment,e),v(ke.$$.fragment,e),v(qe),v(at),ze=!0)},o(e){E(G.$$.fragment,e),E(ce.$$.fragment,e),E(ke.$$.fragment,e),E(qe),E(at),ze=!1},d(e){e&&i(t),e&&i(a),e&&i(m),e&&i(k),e&&i(N),Xe&&Xe.d(),w(G),w(ce),w(ke),et[Me].d(),e&&i(We),at&&at.d(e),e&&i(Ye),Je=!1,I(Ke)}}}let X="stock_release_items";function Z(e){let t=[];return e.forEach((e=>{t.push([e.id,e.attributes.consortium_member.data.attributes.name,e.attributes.date,"-","-","-","-","-","-","-","-"]),e.attributes.stock_release_items.data.forEach((e=>{t.push(["-","-","-",e.id,e.attributes.purchase_order_item.data.attributes.purchase_order.data.attributes.poNumber,e.attributes.purchase_order_item.data.attributes.item.data.attributes.name,e.attributes.purchase_order_item.data.attributes.unit,e.attributes.purchase_order_item.data.attributes.pieces,e.attributes.purchase_order_item.data.attributes.quantity,e.attributes.purchase_order_item.data.attributes.currency,e.attributes.purchase_order_item.data.attributes.unitPrice,e.attributes.quantity])}))})),t}function ee(e,t,a){const s=N.subscribe((e=>{!e.loggedIn&&e.fetched?T("login"):e.data&&m()}));C(s);let r,o="",c="",l=!1,i=[];const n=[{key:"id",title:"ID",sortable:!0,filterValue:e=>Math.floor(e.id/10),interval:10,filterType:"numeric",headerClass:"has-text-left",selected:!0},{key:"consortium_member",title:"Consortium Member",sortable:!0,filterValue:e=>e.last_name.charAt(0).toLowerCase(),filterType:"string",selected:!0},{key:"date",title:"Date",sortable:!0,filterValue:e=>e.last_name.charAt(0).toLowerCase(),filterType:"string",selected:!0}],u=[{key:"id",title:"ID",sortable:!0,selected:!0},{key:"poNumber",title:"PO#",sortable:!0,selected:!0},{key:"item",title:"ITEM",sortable:!0,selected:!0},{key:"unit",title:"Unit",sortable:!0,selected:!0},{key:"pieces",title:"Pieces",sortable:!0,selected:!0},{key:"quantity",title:"Quantity",sortable:!0,selected:!0},{key:"currency",title:"Currency",sortable:!0,selected:!0},{key:"unitPrice",title:"Unit Price",sortable:!0,selected:!0},{key:"quantity",title:"Quantity",sortable:!0,selected:!0}];let d;async function m(e,t,s){try{let r={filters:e||{},sort:t||"id:desc","pagination[page]":s||1,populate:{consortium_member:{populate:"*"},stock_release_items:{populate:["purchase_order_item","purchase_order_item.item","purchase_order_item.purchase_order"]}}};r=U.stringify(r,{encodeValuesOnly:!0});let o=await j("stock-releases",r);console.log("Get Stock Releases Request - ",o),a(2,i=o.data),a(3,d=o.meta?.pagination)}catch(e){console.warn("Error Getting Stock Releases - ",e)}}function h(){m(p(),c)}function p(){return{$or:[{date:{$containsi:o}},{consortium_member:{name:{$containsi:o}}},{stock_release_items:{purchase_order_item:{item:{name:{$containsi:o}}}}},{stock_release_items:{purchase_order_item:{item:{category:{$containsi:o}}}}},{stock_release_items:{purchase_order_item:{unit:{$containsi:o}}}},{stock_release_items:{purchase_order_item:{purchase_order:{poNumber:{$containsi:o}}}}}]}}return[o,l,i,d,n,u,{title:"Stock Releases Table",showFilterHeader:!1,showSelect:!1,showDetails:!1,showPrint:!0,showActions:!0,showFooter:!1},h,function(e){m(p(),c,e.detail.newPage)},function(e){c=e.detail.key,c=c.replace("consortium_member","consortium_member.name"),c=c.replace("warehouse","warehouse.name"),m(p(),c,e.detail.newPage)},function(e){T("stock-releases/edit/"+e.detail.row.id)},function(e){T("reports/single/stock-release/"+e.detail.row.id)},function(e){r=e.detail.row,a(1,l=!0)},async function(){a(1,l=!1);try{let e=await M("stock-releases/"+r.id,null);console.log("Delete Stock Release Request  ",e),e.data?.id&&(q.push("Stock Release Deleted Successfully!",{duration:2e4,theme:{"--toastBackground":"#48BB78","--toastBarBackground":"#2F855A"}}),Q("Stock Release",r,"Delete",e.data.id),h())}catch(e){console.log("Error Delete Stock Release   ",e)}},function(){let e=new Date,t=`"SWAN "Stock Releases ${e.getFullYear()}-${e.getMonth()}-${e.getDate()} T${e.getHours()}-${e.getMinutes()}-${e.getSeconds()}.csv`,a=Z(i);a=[n.concat(u).map((e=>e.title)),...a],G(t,a)},function(){L("Stock Releases",Z(i),n.concat(u))},async function(){try{let e={populate:{consortium_member:{populate:"*"},warehouse:{populate:"*"},stock_release_items:{populate:["purchase_order_item","purchase_order_item.item","purchase_order_item.purchase_order"]}},"pagination[limit]":-1};e=U.stringify(e,{encodeValuesOnly:!0});let t=await j("stock-releases",e),a=new Date,s=`"SWAN "Stock Releases ${a.getFullYear()}-${a.getMonth()}-${a.getDate()} T${a.getHours()}-${a.getMinutes()}-${a.getSeconds()}.csv`,r=Z(t.data);r=[n.concat(u).map((e=>e.title)),...r],G(s,r)}catch(e){}},async function(){try{let e={"pagination[limit]":-1,populate:{consortium_member:{populate:"*"},stock_release_items:{populate:["purchase_order_item","purchase_order_item.item","purchase_order_item.purchase_order"]}}};e=U.stringify(e,{encodeValuesOnly:!0});let t=await j("stock-releases",e);L("Stock Releases",Z(t.data),n.concat(u))}catch(e){}},function(){o=this.value,a(0,o)},()=>a(1,l=!1)]}class te extends e{constructor(e){super(),t(this,e,ee,K,a,{})}}export{te as default};
