import{S as t,i as a,s as e,I as s,T as r,A as i,h as l,e as c,t as o,z as u,c as d,a as n,b as m,d as _,C as b,f as h,j as f,k as v,P as p,Z as k,aa as g,p as y,B as E,q as I,r as $,E as D,F as R,G as B,a3 as V,w,x as P,y as S,J as x,W as A,_ as q,N as W,g as N,K as U}from"./client.4ce32fd9.js";import{f as j,r as C,a as O}from"./required.839b9694.js";import{S as H}from"./Select.356ebf9c.js";import"./DateInput.a88975cd.js";import{l as L}from"./index.79acf2d4.js";import{c as Q}from"./log.4a01d003.js";function F(t,a,e){const s=t.slice();return s[21]=a[e],s}function T(t,a,e){const s=t.slice();return s[24]=a[e],s}function G(t){let a,e=t[5],s=[];for(let a=0;a<e.length;a+=1)s[a]=z(T(t,e,a));return{c(){for(let t=0;t<s.length;t+=1)s[t].c();a=i()},l(t){for(let a=0;a<s.length;a+=1)s[a].l(t);a=i()},m(t,e){for(let a=0;a<s.length;a+=1)s[a].m(t,e);l(t,a,e)},p(t,r){if(32&r){let i;for(e=t[5],i=0;i<e.length;i+=1){const l=T(t,e,i);s[i]?s[i].p(l,r):(s[i]=z(l),s[i].c(),s[i].m(a.parentNode,a))}for(;i<s.length;i+=1)s[i].d(1);s.length=e.length}},d(t){p(s,t),t&&_(a)}}}function z(t){let a,e,s,r,i,p,k,g=t[24].path+"",y=t[24].message+"";return{c(){a=c("div"),e=c("span"),s=o(g),r=u(),i=c("br"),p=o(y),k=u(),this.h()},l(t){a=d(t,"DIV",{class:!0});var l=n(a);e=d(l,"SPAN",{class:!0});var c=n(e);s=m(c,g),c.forEach(_),r=b(l),i=d(l,"BR",{}),p=m(l,y),k=b(l),l.forEach(_),this.h()},h(){h(e,"class","has-text-weight-bold"),h(a,"class","notification is-danger")},m(t,c){l(t,a,c),f(a,e),f(e,s),f(a,r),f(a,i),f(a,p),f(a,k)},p(t,a){32&a&&g!==(g=t[24].path+"")&&v(s,g),32&a&&y!==(y=t[24].message+"")&&v(p,y)},d(t){t&&_(a)}}}function J(t){let a,e;return{c(){a=c("p"),e=o("Purchase Order is required"),this.h()},l(t){a=d(t,"P",{class:!0});var s=n(a);e=m(s,"Purchase Order is required"),s.forEach(_),this.h()},h(){h(a,"class","help is-danger")},m(t,s){l(t,a,s),f(a,e)},d(t){t&&_(a)}}}function K(t){let a,e;return{c(){a=c("p"),e=o("Waybill Item is required"),this.h()},l(t){a=d(t,"P",{class:!0});var s=n(a);e=m(s,"Waybill Item is required"),s.forEach(_),this.h()},h(){h(a,"class","help is-danger")},m(t,s){l(t,a,s),f(a,e)},d(t){t&&_(a)}}}function M(t){let a,e,s,r,h,v,k=t[4],g=[];for(let a=0;a<k.length;a+=1)g[a]=X(F(t,k,a));return{c(){a=c("h5"),e=o("Waybill History"),s=u(),r=c("hr"),h=u();for(let t=0;t<g.length;t+=1)g[t].c();v=i()},l(t){a=d(t,"H5",{});var l=n(a);e=m(l,"Waybill History"),l.forEach(_),s=b(t),r=d(t,"HR",{}),h=b(t);for(let a=0;a<g.length;a+=1)g[a].l(t);v=i()},m(t,i){l(t,a,i),f(a,e),l(t,s,i),l(t,r,i),l(t,h,i);for(let a=0;a<g.length;a+=1)g[a].m(t,i);l(t,v,i)},p(t,a){if(16&a){let e;for(k=t[4],e=0;e<k.length;e+=1){const s=F(t,k,e);g[e]?g[e].p(s,a):(g[e]=X(s),g[e].c(),g[e].m(v.parentNode,v))}for(;e<g.length;e+=1)g[e].d(1);g.length=k.length}},d(t){t&&_(a),t&&_(s),t&&_(r),t&&_(h),p(g,t),t&&_(v)}}}function X(t){let a,e,s,r,i,p,k,g,y,E,I,$,D,R,B,V,w,P,S,x,A,q,W,N,U,j,C,O,H,L,Q,F,T,G,z,J,K,M,X,Z,Y,tt,at,et,st,rt,it,lt,ct,ot,ut,dt,nt,mt,_t,bt,ht,ft,vt,pt,kt,gt,yt,Et,It,$t,Dt,Rt,Bt,Vt,wt,Pt,St,xt,At,qt,Wt,Nt,Ut,jt,Ct,Ot,Ht,Lt=t[21].attributes.stock_release_item.data?.attributes.stock_release.data.id+"",Qt=t[21].attributes.stock_release_item.data?.attributes.stock_release.data.attributes.date+"",Ft=t[21].attributes.stock_release_item.data?.attributes.stock_release.data.attributes.consortium_member?.data.attributes.name+"",Tt=t[21].id+"",Gt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.name+"",zt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.id+"",Jt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.category+"",Kt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.unit+"",Mt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.pieces+"",Xt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.quantity+"",Zt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.unitPrice+"",Yt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.currency+"",ta=t[21].attributes.stock_release_item.data?.attributes.quantity+"",aa=t[21].attributes.remark+"";return{c(){a=c("div"),e=c("div"),s=o(Lt),r=u(),i=c("div"),p=o(Qt),k=u(),g=c("div"),y=o(Ft),E=u(),I=c("div"),$=c("div"),D=o(Tt),R=u(),B=c("div"),V=c("span"),w=o(Gt),P=o(" - ("),S=o(zt),x=o(")"),A=u(),q=c("br"),W=u(),N=c("span"),U=o(Jt),j=u(),C=c("div"),O=c("span"),H=o("Unit"),L=u(),Q=c("br"),F=u(),T=o(Kt),G=u(),z=c("div"),J=c("span"),K=o("Pieces"),M=u(),X=c("br"),Z=u(),Y=o(Mt),tt=u(),at=c("div"),et=c("span"),st=o("Quantity"),rt=u(),it=c("br"),lt=u(),ct=o(Xt),ot=u(),ut=c("div"),dt=c("span"),nt=o("Unit Price"),mt=u(),_t=c("br"),bt=u(),ht=o(Zt),ft=u(),vt=c("div"),pt=c("span"),kt=o("Currency"),gt=u(),yt=c("br"),Et=u(),It=o(Yt),$t=u(),Dt=c("div"),Rt=c("span"),Bt=o("Quantity"),Vt=u(),wt=c("br"),Pt=u(),St=o(ta),xt=u(),At=c("div"),qt=c("span"),Wt=o("Remark"),Nt=u(),Ut=c("br"),jt=u(),Ct=o(aa),Ot=u(),Ht=c("hr"),this.h()},l(t){a=d(t,"DIV",{class:!0});var l=n(a);e=d(l,"DIV",{class:!0});var c=n(e);s=m(c,Lt),c.forEach(_),r=b(l),i=d(l,"DIV",{class:!0});var o=n(i);p=m(o,Qt),o.forEach(_),k=b(l),g=d(l,"DIV",{class:!0});var u=n(g);y=m(u,Ft),u.forEach(_),l.forEach(_),E=b(t),I=d(t,"DIV",{class:!0});var h=n(I);$=d(h,"DIV",{class:!0});var f=n($);D=m(f,Tt),f.forEach(_),R=b(h),B=d(h,"DIV",{class:!0});var v=n(B);V=d(v,"SPAN",{class:!0});var ea=n(V);w=m(ea,Gt),P=m(ea," - ("),S=m(ea,zt),x=m(ea,")"),ea.forEach(_),A=b(v),q=d(v,"BR",{}),W=b(v),N=d(v,"SPAN",{class:!0});var sa=n(N);U=m(sa,Jt),sa.forEach(_),v.forEach(_),j=b(h),C=d(h,"DIV",{class:!0});var ra=n(C);O=d(ra,"SPAN",{class:!0});var ia=n(O);H=m(ia,"Unit"),ia.forEach(_),L=b(ra),Q=d(ra,"BR",{}),F=b(ra),T=m(ra,Kt),ra.forEach(_),G=b(h),z=d(h,"DIV",{class:!0});var la=n(z);J=d(la,"SPAN",{class:!0});var ca=n(J);K=m(ca,"Pieces"),ca.forEach(_),M=b(la),X=d(la,"BR",{}),Z=b(la),Y=m(la,Mt),la.forEach(_),tt=b(h),at=d(h,"DIV",{class:!0});var oa=n(at);et=d(oa,"SPAN",{class:!0});var ua=n(et);st=m(ua,"Quantity"),ua.forEach(_),rt=b(oa),it=d(oa,"BR",{}),lt=b(oa),ct=m(oa,Xt),oa.forEach(_),ot=b(h),ut=d(h,"DIV",{class:!0});var da=n(ut);dt=d(da,"SPAN",{class:!0});var na=n(dt);nt=m(na,"Unit Price"),na.forEach(_),mt=b(da),_t=d(da,"BR",{}),bt=b(da),ht=m(da,Zt),da.forEach(_),ft=b(h),vt=d(h,"DIV",{class:!0});var ma=n(vt);pt=d(ma,"SPAN",{class:!0});var _a=n(pt);kt=m(_a,"Currency"),_a.forEach(_),gt=b(ma),yt=d(ma,"BR",{}),Et=b(ma),It=m(ma,Yt),ma.forEach(_),$t=b(h),Dt=d(h,"DIV",{class:!0});var ba=n(Dt);Rt=d(ba,"SPAN",{class:!0});var ha=n(Rt);Bt=m(ha,"Quantity"),ha.forEach(_),Vt=b(ba),wt=d(ba,"BR",{}),Pt=b(ba),St=m(ba,ta),ba.forEach(_),xt=b(h),At=d(h,"DIV",{class:!0});var fa=n(At);qt=d(fa,"SPAN",{class:!0});var va=n(qt);Wt=m(va,"Remark"),va.forEach(_),Nt=b(fa),Ut=d(fa,"BR",{}),jt=b(fa),Ct=m(fa,aa),fa.forEach(_),h.forEach(_),Ot=b(t),Ht=d(t,"HR",{}),this.h()},h(){h(e,"class","column is-narrow"),h(i,"class","column"),h(g,"class","column"),h(a,"class","columns has-text-weight-bold"),h($,"class","column is-narrow gray"),h(V,"class",""),h(N,"class","gray"),h(B,"class","column is-3"),h(O,"class","is-small tag"),h(C,"class","column has-text-centered"),h(J,"class","is-small tag"),h(z,"class","column has-text-centered"),h(et,"class","is-small tag"),h(at,"class","column has-text-centered"),h(dt,"class","is-small tag"),h(ut,"class","column has-text-centered"),h(pt,"class","is-small tag"),h(vt,"class","column has-text-centered"),h(Rt,"class","is-small tag"),h(Dt,"class","column has-text-centered"),h(qt,"class","is-small tag"),h(At,"class","column has-text-centered"),h(I,"class","columns")},m(t,c){l(t,a,c),f(a,e),f(e,s),f(a,r),f(a,i),f(i,p),f(a,k),f(a,g),f(g,y),l(t,E,c),l(t,I,c),f(I,$),f($,D),f(I,R),f(I,B),f(B,V),f(V,w),f(V,P),f(V,S),f(V,x),f(B,A),f(B,q),f(B,W),f(B,N),f(N,U),f(I,j),f(I,C),f(C,O),f(O,H),f(C,L),f(C,Q),f(C,F),f(C,T),f(I,G),f(I,z),f(z,J),f(J,K),f(z,M),f(z,X),f(z,Z),f(z,Y),f(I,tt),f(I,at),f(at,et),f(et,st),f(at,rt),f(at,it),f(at,lt),f(at,ct),f(I,ot),f(I,ut),f(ut,dt),f(dt,nt),f(ut,mt),f(ut,_t),f(ut,bt),f(ut,ht),f(I,ft),f(I,vt),f(vt,pt),f(pt,kt),f(vt,gt),f(vt,yt),f(vt,Et),f(vt,It),f(I,$t),f(I,Dt),f(Dt,Rt),f(Rt,Bt),f(Dt,Vt),f(Dt,wt),f(Dt,Pt),f(Dt,St),f(I,xt),f(I,At),f(At,qt),f(qt,Wt),f(At,Nt),f(At,Ut),f(At,jt),f(At,Ct),l(t,Ot,c),l(t,Ht,c)},p(t,a){16&a&&Lt!==(Lt=t[21].attributes.stock_release_item.data?.attributes.stock_release.data.id+"")&&v(s,Lt),16&a&&Qt!==(Qt=t[21].attributes.stock_release_item.data?.attributes.stock_release.data.attributes.date+"")&&v(p,Qt),16&a&&Ft!==(Ft=t[21].attributes.stock_release_item.data?.attributes.stock_release.data.attributes.consortium_member?.data.attributes.name+"")&&v(y,Ft),16&a&&Tt!==(Tt=t[21].id+"")&&v(D,Tt),16&a&&Gt!==(Gt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.name+"")&&v(w,Gt),16&a&&zt!==(zt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.id+"")&&v(S,zt),16&a&&Jt!==(Jt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.category+"")&&v(U,Jt),16&a&&Kt!==(Kt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.unit+"")&&v(T,Kt),16&a&&Mt!==(Mt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.pieces+"")&&v(Y,Mt),16&a&&Xt!==(Xt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.quantity+"")&&v(ct,Xt),16&a&&Zt!==(Zt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.unitPrice+"")&&v(ht,Zt),16&a&&Yt!==(Yt=t[21].attributes.stock_release_item.data?.attributes.purchase_order_item?.data?.attributes.currency+"")&&v(It,Yt),16&a&&ta!==(ta=t[21].attributes.stock_release_item.data?.attributes.quantity+"")&&v(St,ta),16&a&&aa!==(aa=t[21].attributes.remark+"")&&v(Ct,aa)},d(t){t&&_(a),t&&_(E),t&&_(I),t&&_(Ot),t&&_(Ht)}}}function Z(t){let a,e,i,v,p,A,q,W,N,U,j,C,O,L,Q,F,T,z,X,Z,Y,tt,at,et,st,rt,it,lt,ct,ot,ut,dt,nt,mt,_t,bt,ht,ft,vt,pt,kt,gt,yt,Et,It,$t,Dt,Rt,Bt,Vt,wt,Pt,St,xt,At,qt,Wt,Nt,Ut,jt,Ct,Ot,Ht,Lt,Qt,Ft,Tt,Gt,zt,Jt,Kt,Mt,Xt,Zt=t[7].hasError("stock_release.required"),Yt=t[7].hasError("stock_release_item.required");W=new s({props:{data:r}});let ta=t[5]&&G(t);function aa(a){t[16](a)}let ea={items:t[2],listAutoWidth:!0};void 0!==t[8].value&&(ea.value=t[8].value),yt=new H({props:ea}),k.push((()=>g(yt,"value",aa))),yt.$on("select",t[13]);let sa=Zt&&J();function ra(a){t[17](a)}let ia={items:t[3],hasError:t[4].length>0};void 0!==t[6].value&&(ia.value=t[6].value),xt=new H({props:ia}),k.push((()=>g(xt,"value",ra))),xt.$on("select",t[14]);let la=Yt&&K(),ca=t[4]&&M(t);return{c(){a=u(),e=c("br"),i=c("br"),v=u(),p=c("div"),A=c("a"),q=c("span"),y(W.$$.fragment),N=o(" Back"),j=u(),C=c("br"),O=c("br"),L=u(),Q=c("div"),F=c("br"),T=c("br"),z=u(),X=c("div"),Z=c("div"),Y=c("h3"),tt=o("Edit Waybill Item"),at=u(),et=c("p"),st=o("Complete the form below and click save."),rt=u(),it=c("div"),lt=c("button"),ct=o("Save"),ut=u(),dt=c("br"),nt=u(),ta&&ta.c(),mt=u(),_t=c("form"),bt=c("div"),ht=c("div"),ft=c("div"),vt=c("label"),pt=o("Stock Release (*)"),kt=u(),gt=c("div"),y(yt.$$.fragment),It=u(),sa&&sa.c(),$t=u(),Dt=c("div"),Rt=c("div"),Bt=c("div"),Vt=c("label"),wt=o("Stock Release Item (*)"),Pt=u(),St=c("div"),y(xt.$$.fragment),qt=u(),la&&la.c(),Wt=u(),Nt=c("div"),Ut=c("div"),jt=c("div"),Ct=c("label"),Ot=o("Remark"),Ht=c("br"),Lt=u(),Qt=c("div"),Ft=c("textarea"),Tt=u(),ca&&ca.c(),Gt=u(),zt=c("br"),Jt=c("br"),this.h()},l(t){E('[data-svelte="svelte-10ejf78"]',document.head).forEach(_),a=b(t),e=d(t,"BR",{}),i=d(t,"BR",{}),v=b(t),p=d(t,"DIV",{class:!0});var s=n(p);A=d(s,"A",{href:!0,class:!0});var r=n(A);q=d(r,"SPAN",{class:!0});var l=n(q);I(W.$$.fragment,l),l.forEach(_),N=m(r," Back"),r.forEach(_),j=b(s),C=d(s,"BR",{}),O=d(s,"BR",{}),L=b(s),Q=d(s,"DIV",{class:!0});var c=n(Q);F=d(c,"BR",{}),T=d(c,"BR",{}),z=b(c),X=d(c,"DIV",{class:!0});var o=n(X);Z=d(o,"DIV",{class:!0});var u=n(Z);Y=d(u,"H3",{class:!0});var h=n(Y);tt=m(h,"Edit Waybill Item"),h.forEach(_),at=b(u),et=d(u,"P",{class:!0});var f=n(et);st=m(f,"Complete the form below and click save."),f.forEach(_),u.forEach(_),rt=b(o),it=d(o,"DIV",{class:!0});var k=n(it);lt=d(k,"BUTTON",{class:!0});var g=n(lt);ct=m(g,"Save"),g.forEach(_),k.forEach(_),o.forEach(_),ut=b(c),dt=d(c,"BR",{}),nt=b(c),ta&&ta.l(c),mt=b(c),_t=d(c,"FORM",{});var y=n(_t);bt=d(y,"DIV",{class:!0});var $=n(bt);ht=d($,"DIV",{class:!0});var D=n(ht);ft=d(D,"DIV",{class:!0});var R=n(ft);vt=d(R,"LABEL",{for:!0,class:!0});var B=n(vt);pt=m(B,"Stock Release (*)"),B.forEach(_),kt=b(R),gt=d(R,"DIV",{class:!0});var V=n(gt);I(yt.$$.fragment,V),V.forEach(_),It=b(R),sa&&sa.l(R),R.forEach(_),D.forEach(_),$.forEach(_),$t=b(y),Dt=d(y,"DIV",{class:!0});var w=n(Dt);Rt=d(w,"DIV",{class:!0});var P=n(Rt);Bt=d(P,"DIV",{class:!0});var S=n(Bt);Vt=d(S,"LABEL",{for:!0,class:!0});var x=n(Vt);wt=m(x,"Stock Release Item (*)"),x.forEach(_),Pt=b(S),St=d(S,"DIV",{class:!0});var U=n(St);I(xt.$$.fragment,U),U.forEach(_),qt=b(S),la&&la.l(S),S.forEach(_),P.forEach(_),w.forEach(_),Wt=b(y),Nt=d(y,"DIV",{class:!0});var H=n(Nt);Ut=d(H,"DIV",{class:!0});var G=n(Ut);jt=d(G,"DIV",{class:!0});var J=n(jt);Ct=d(J,"LABEL",{for:!0,class:!0});var K=n(Ct);Ot=m(K,"Remark"),K.forEach(_),Ht=d(J,"BR",{}),Lt=b(J),Qt=d(J,"DIV",{class:!0});var M=n(Qt);Ft=d(M,"TEXTAREA",{rows:!0,class:!0}),n(Ft).forEach(_),M.forEach(_),J.forEach(_),G.forEach(_),H.forEach(_),Tt=b(y),ca&&ca.l(y),y.forEach(_),Gt=b(c),zt=d(c,"BR",{}),Jt=d(c,"BR",{}),c.forEach(_),s.forEach(_),this.h()},h(){document.title="Edit Waybill Item",h(q,"class","icon is-small"),h(A,"href",U="waybills/edit/"+t[0]),h(A,"class","has-text-dark"),h(Y,"class","my-0"),h(et,"class","gray py-0"),h(Z,"class","column"),lt.disabled=ot=!t[7].valid||!t[7].dirty,h(lt,"class","button is-dark my-2 px-5 py-2 has-text-weight-bold"),h(it,"class","column has-text-right"),h(X,"class","columns"),h(vt,"for",""),h(vt,"class","gray"),h(gt,"class","control"),h(ft,"class","field"),h(ht,"class","column"),h(bt,"class","columns"),h(Vt,"for",""),h(Vt,"class","gray"),h(St,"class","control"),h(Bt,"class","field"),h(Rt,"class","column"),h(Dt,"class","columns"),h(Ct,"for",""),h(Ct,"class","gray"),h(Ft,"rows","1"),h(Ft,"class","textarea"),h(Qt,"class","control is-fullwidth"),h(jt,"class","field"),h(Ut,"class","column"),h(Nt,"class","columns"),h(Q,"class","card px-6 svelte-1985fv4"),h(p,"class","container px-6")},m(s,r){l(s,a,r),l(s,e,r),l(s,i,r),l(s,v,r),l(s,p,r),f(p,A),f(A,q),$(W,q,null),f(A,N),f(p,j),f(p,C),f(p,O),f(p,L),f(p,Q),f(Q,F),f(Q,T),f(Q,z),f(Q,X),f(X,Z),f(Z,Y),f(Y,tt),f(Z,at),f(Z,et),f(et,st),f(X,rt),f(X,it),f(it,lt),f(lt,ct),f(Q,ut),f(Q,dt),f(Q,nt),ta&&ta.m(Q,null),f(Q,mt),f(Q,_t),f(_t,bt),f(bt,ht),f(ht,ft),f(ft,vt),f(vt,pt),f(ft,kt),f(ft,gt),$(yt,gt,null),f(ft,It),sa&&sa.m(ft,null),f(_t,$t),f(_t,Dt),f(Dt,Rt),f(Rt,Bt),f(Bt,Vt),f(Vt,wt),f(Bt,Pt),f(Bt,St),$(xt,St,null),f(Bt,qt),la&&la.m(Bt,null),f(_t,Wt),f(_t,Nt),f(Nt,Ut),f(Ut,jt),f(jt,Ct),f(Ct,Ot),f(jt,Ht),f(jt,Lt),f(jt,Qt),f(Qt,Ft),D(Ft,t[1]),f(_t,Tt),ca&&ca.m(_t,null),f(Q,Gt),f(Q,zt),f(Q,Jt),Kt=!0,Mt||(Xt=[R(lt,"click",B(t[12])),R(Ft,"input",t[18])],Mt=!0)},p(t,[a]){(!Kt||1&a&&U!==(U="waybills/edit/"+t[0]))&&h(A,"href",U),(!Kt||128&a&&ot!==(ot=!t[7].valid||!t[7].dirty))&&(lt.disabled=ot),t[5]?ta?ta.p(t,a):(ta=G(t),ta.c(),ta.m(Q,mt)):ta&&(ta.d(1),ta=null);const e={};4&a&&(e.items=t[2]),!Et&&256&a&&(Et=!0,e.value=t[8].value,V((()=>Et=!1))),yt.$set(e),128&a&&(Zt=t[7].hasError("stock_release.required")),Zt?sa||(sa=J(),sa.c(),sa.m(ft,null)):sa&&(sa.d(1),sa=null);const s={};8&a&&(s.items=t[3]),16&a&&(s.hasError=t[4].length>0),!At&&64&a&&(At=!0,s.value=t[6].value,V((()=>At=!1))),xt.$set(s),128&a&&(Yt=t[7].hasError("stock_release_item.required")),Yt?la||(la=K(),la.c(),la.m(Bt,null)):la&&(la.d(1),la=null),2&a&&D(Ft,t[1]),t[4]?ca?ca.p(t,a):(ca=M(t),ca.c(),ca.m(_t,null)):ca&&(ca.d(1),ca=null)},i(t){Kt||(w(W.$$.fragment,t),w(yt.$$.fragment,t),w(xt.$$.fragment,t),Kt=!0)},o(t){P(W.$$.fragment,t),P(yt.$$.fragment,t),P(xt.$$.fragment,t),Kt=!1},d(t){t&&_(a),t&&_(e),t&&_(i),t&&_(v),t&&_(p),S(W),ta&&ta.d(),S(yt),sa&&sa.d(),S(xt),la&&la.d(),ca&&ca.d(),Mt=!1,x(Xt)}}}async function Y(t){return{slug:parseInt(t.params.slug)}}function tt(t,a,e){let s,r,i,l,{slug:c}=a;const o=j("stock_release",null,[C()]);A(t,o,(t=>e(8,i=t)));const u=j("stock_release_item",null,[C()]);A(t,u,(t=>e(6,s=t)));let d="";const n=O(o,u);A(t,n,(t=>e(7,r=t)));let m,_=[],b=[],h=[];async function f(){try{let t={populate:["waybill","stock_release_item","stock_release_item.stock_release","stock_release_item.stock_release.consortium_member","stock_release_item.purchase_order_item","stock_release_item.purchase_order_item.item","stock_release_item.purchase_order_item.purchase_order"]};t=L.stringify(t,{encodeValuesOnly:!0});let a=await U("waybill-items/"+c,t);console.log("Get Waybill by ID ",a),async function(t){o.set(""),u.set("");try{let a={populate:["consortium_member","stock_release_items","stock_release_items.purchase_order_item","stock_release_items.purchase_order_item.purchase_order","stock_release_items.purchase_order_item.item"],filters:{consortium_member:{id:{$in:[t]}}},"pagination[limit]":-1};a=L.stringify(a,{encodeValuesOnly:!0});let s=await U("stock-releases",a);console.log("Get Stock Release ",s),e(2,_=s.data.map((t=>({value:t.id,label:"SRF# - "+t.id+"  ------- Date   "+t.attributes.date,data:t}))))}catch(t){console.log("Error Stock Release ",t)}}(a.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.attributes.consortium_member.data?.id),o.set({value:a.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.id,label:"SRF# - "+a.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.id+"  ------- Date   "+a.data?.attributes.stock_release_item.data?.attributes.stock_release.data?.attributes.date,data:a.data?.attributes.stock_release_item.data?.attributes.stock_release.data}),u.set({value:a.data?.attributes.stock_release_item.data?.id,label:a.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item.data.attributes.name+"-"+a.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item.data.attributes.category+"  --- Unit - "+a.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unit+" - Pieces - "+a.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.pieces+" - Quantity - "+a.data?.attributes.stock_release_item.data?.attributes.quantity+" - Unit Price - "+a.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unitPrice+" - Currency - "+a.data?.attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.currency+"    ID    "+a.data?.attributes.stock_release_item.data?.id,data:a.data?.attributes.stock_release_item.data}),e(1,d=a.data?.attributes.remark),e(0,l=a.data?.attributes.waybill?.data?.id)}catch(t){console.log("Error get Waybill Item by ID ",t)}}return t.$$set=t=>{"slug"in t&&e(15,c=t.slug)},t.$$.update=()=>{32768&t.$$.dirty&&c&&f()},[l,d,_,b,h,m,s,r,i,o,u,n,async function(){if(await n.validate(),r.valid&&!(h.length>0))try{let t=await q({path:"waybill-items/"+c+"?populate=%2A",data:{data:{stock_release_item:s.value.value,remark:d}}});console.log("Edit Waybill Item Request  ",t),t.data?.id&&(W.push("Waybill Item Edited Successfully!",{duration:2e4,theme:{"--toastBackground":"#48BB78","--toastBarBackground":"#2F855A"}}),Q("Waybill Item",t.data,"Edit",t.data.id),N("waybills/edit/"+l))}catch(t){console.log("Error Edit Waybill Item  ",t),e(5,m=t.error?.details?.errors),W.push("Waybill Item Could Not Be Edited! \n\n"+t.error?.message,{duration:2e4,theme:{"--toastBackground":"#bb4848","--toastBarBackground":"#852f2f"}})}},async function(t){0!=_.length&&t.detail?.value&&(console.log(_.filter((a=>a.value==t.detail.value))[0].data?.attributes),e(3,b=_.filter((a=>a.value==t.detail.value))[0].data?.attributes.stock_release_items.data),e(3,b=b.map((t=>({value:t.id,label:t.attributes.purchase_order_item.data?.attributes.item.data.attributes.name+"-"+t.attributes.purchase_order_item.data?.attributes.item.data.attributes.category+"  --- Unit - "+t.attributes.purchase_order_item.data?.attributes.unit+" - Pieces - "+t.attributes.purchase_order_item.data?.attributes.pieces+" - Quantity - "+t.attributes.quantity+" - Unit Price - "+t.attributes.purchase_order_item.data?.attributes.unitPrice+" - Currency - "+t.attributes.purchase_order_item.data?.attributes.currency+"    ID    "+t.id,data:t})))))},async function(t){console.log("--------------",t,t.detail.data?.id);try{let a={populate:["waybill","stock_release_item","stock_release_item.stock_release","stock_release_item.stock_release.consortium_member","stock_release_item.purchase_order_item","stock_release_item.purchase_order_item.purchase_order","stock_release_item.purchase_order_item.item"],filters:{stock_release_item:{id:{$in:[t.detail.data?.id]}}},"pagination[limit]":-1};a=L.stringify(a,{encodeValuesOnly:!0});let s=await U("waybill-items",a);console.log("Get Waybill Items ",s),e(4,h=s.data.filter((t=>t.attributes.waybill.data)))}catch(t){console.log("Error Waybill Items ",t)}},c,function(a){t.$$.not_equal(i.value,a)&&(i.value=a,o.set(i))},function(a){t.$$.not_equal(s.value,a)&&(s.value=a,u.set(s))},function(){d=this.value,e(1,d)}]}class at extends t{constructor(t){super(),a(this,t,tt,Z,e,{slug:15})}}export{at as default,Y as preload};
