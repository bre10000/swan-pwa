import{S as a,i as e,s,I as t,T as r,A as c,h as l,e as i,t as o,z as n,c as u,a as d,b as h,d as m,C as v,f,j as b,k as p,P as g,Z as E,aa as I,p as _,q as y,r as D,F as V,w as $,x as B,y as k,l as R,B as P,a5 as A,a4 as S,a6 as w,E as x,G as q,a3 as N,H as O,an as C,J as L,W as U,R as T,aE as M,L as j,a2 as H,N as W,g as G,K as F,ak as Q}from"./client.4ce32fd9.js";import{f as z,r as J,a as K}from"./required.839b9694.js";import{l as X}from"./index.79acf2d4.js";import"./DateInput.a88975cd.js";import{D as Z}from"./DateInput.8aad4b43.js";import{S as Y}from"./Select.356ebf9c.js";import{n as aa}from"./index.8bbc6ba3.js";import{c as ea}from"./log.4a01d003.js";function sa(a,e,s){const t=a.slice();return t[42]=e[s],t}function ta(a,e,s){const t=a.slice();return t[45]=e[s],t[47]=s,t}function ra(a,e,s){const t=a.slice();return t[48]=e[s],t}function ca(a,e,s){const t=a.slice();return t[51]=e[s],t}function la(a){let e,s=a[8],t=[];for(let e=0;e<s.length;e+=1)t[e]=ia(ca(a,s,e));return{c(){for(let a=0;a<t.length;a+=1)t[a].c();e=c()},l(a){for(let e=0;e<t.length;e+=1)t[e].l(a);e=c()},m(a,s){for(let e=0;e<t.length;e+=1)t[e].m(a,s);l(a,e,s)},p(a,r){if(256&r[0]){let c;for(s=a[8],c=0;c<s.length;c+=1){const l=ca(a,s,c);t[c]?t[c].p(l,r):(t[c]=ia(l),t[c].c(),t[c].m(e.parentNode,e))}for(;c<t.length;c+=1)t[c].d(1);t.length=s.length}},d(a){g(t,a),a&&m(e)}}}function ia(a){let e,s,t,r,c,g,E,I=a[51].path+"",_=a[51].message+"";return{c(){e=i("div"),s=i("span"),t=o(I),r=n(),c=i("br"),g=o(_),E=n(),this.h()},l(a){e=u(a,"DIV",{class:!0});var l=d(e);s=u(l,"SPAN",{class:!0});var i=d(s);t=h(i,I),i.forEach(m),r=v(l),c=u(l,"BR",{}),g=h(l,_),E=v(l),l.forEach(m),this.h()},h(){f(s,"class","has-text-weight-bold"),f(e,"class","notification is-danger")},m(a,i){l(a,e,i),b(e,s),b(s,t),b(e,r),b(e,c),b(e,g),b(e,E)},p(a,e){256&e[0]&&I!==(I=a[51].path+"")&&p(t,I),256&e[0]&&_!==(_=a[51].message+"")&&p(g,_)},d(a){a&&m(e)}}}function oa(a){let e,s,t,r=a[48].attributes.name+"";return{c(){e=i("option"),s=o(r),this.h()},l(a){e=u(a,"OPTION",{});var t=d(e);s=h(t,r),t.forEach(m),this.h()},h(){e.__value=t=a[48].id,e.value=e.__value},m(a,t){l(a,e,t),b(e,s)},p(a,c){32&c[0]&&r!==(r=a[48].attributes.name+"")&&p(s,r),32&c[0]&&t!==(t=a[48].id)&&(e.__value=t,e.value=e.__value)},d(a){a&&m(e)}}}function na(a){let e,s;return{c(){e=i("p"),s=o("Warehouse is required"),this.h()},l(a){e=u(a,"P",{class:!0});var t=d(e);s=h(t,"Warehouse is required"),t.forEach(m),this.h()},h(){f(e,"class","help is-danger")},m(a,t){l(a,e,t),b(e,s)},d(a){a&&m(e)}}}function ua(a){let e,s;return{c(){e=i("p"),s=o("Consortium Member is required"),this.h()},l(a){e=u(a,"P",{class:!0});var t=d(e);s=h(t,"Consortium Member is required"),t.forEach(m),this.h()},h(){f(e,"class","help is-danger")},m(a,t){l(a,e,t),b(e,s)},d(a){a&&m(e)}}}function da(a){let e,s,r,c,g,E,I,R,P,A,S,w,x,q,N,O,C,L,U,T,j,H,W,G,F,Q,z,J,K,X,Z,Y,ea,sa,ta,ra,ca,la,ia,oa,na,ua,da,ha,ma,va,fa,ba,pa,ga,Ea,Ia,_a,ya,Da,Va,$a,Ba,ka,Ra,Pa,Aa,Sa,wa,xa,qa,Na,Oa,Ca,La,Ua,Ta,Ma,ja,Ha,Wa,Ga,Fa,Qa,za,Ja,Ka,Xa,Za,Ya,ae,ee=a[47]+1+"",se=a[45].purchase_order_item.label+"",te=a[45].remark+"",re=a[45].po_no+"",ce=a[45].unit+"",le=a[45].pieces+"",ie=aa(a[45].quantity)+"",oe=a[45].currency+"",ne=aa(a[45].unitPrice)+"",ue=aa(a[45].unitPrice*a[45].quantity)+"",de=aa(a[45].received)+"";function he(){return a[34](a[47])}return Ja=new t({props:{data:M}}),{c(){e=i("div"),s=i("div"),r=i("div"),c=o(ee),g=n(),E=i("div"),I=o(se),R=n(),P=i("br"),A=n(),S=i("span"),w=o(te),x=n(),q=i("div"),N=i("div"),O=o("PO#"),C=n(),L=i("br"),U=n(),T=o(re),j=n(),H=i("div"),W=i("div"),G=o("Unit"),F=n(),Q=i("br"),z=n(),J=o(ce),K=n(),X=i("div"),Z=i("div"),Y=o("Pieces"),ea=n(),sa=i("br"),ta=n(),ra=o(le),ca=n(),la=i("div"),ia=i("div"),oa=o("Quantity"),na=n(),ua=i("br"),da=n(),ha=o(ie),ma=n(),va=i("div"),fa=i("div"),ba=o("Currency"),pa=n(),ga=i("br"),Ea=n(),Ia=o(oe),_a=n(),ya=i("div"),Da=i("div"),Va=o("Unit Price"),$a=n(),Ba=i("br"),ka=n(),Ra=o(ne),Pa=n(),Aa=i("div"),Sa=i("div"),wa=o("Total"),xa=n(),qa=i("br"),Na=n(),Oa=o(ue),Ca=n(),La=i("div"),Ua=i("div"),Ta=o("Received"),Ma=n(),ja=i("br"),Ha=n(),Wa=o(de),Ga=n(),Fa=i("div"),Qa=i("button"),za=i("span"),_(Ja.$$.fragment),Ka=n(),Xa=i("hr"),this.h()},l(a){e=u(a,"DIV",{class:!0});var t=d(e);s=u(t,"DIV",{class:!0});var l=d(s);r=u(l,"DIV",{class:!0});var i=d(r);c=h(i,ee),i.forEach(m),l.forEach(m),g=v(t),E=u(t,"DIV",{class:!0});var o=d(E);I=h(o,se),R=v(o),P=u(o,"BR",{}),A=v(o),S=u(o,"SPAN",{class:!0});var n=d(S);w=h(n,te),n.forEach(m),o.forEach(m),x=v(t),q=u(t,"DIV",{class:!0});var f=d(q);N=u(f,"DIV",{class:!0});var b=d(N);O=h(b,"PO#"),b.forEach(m),C=v(f),L=u(f,"BR",{}),U=v(f),T=h(f,re),f.forEach(m),j=v(t),H=u(t,"DIV",{class:!0});var p=d(H);W=u(p,"DIV",{class:!0});var _=d(W);G=h(_,"Unit"),_.forEach(m),F=v(p),Q=u(p,"BR",{}),z=v(p),J=h(p,ce),p.forEach(m),K=v(t),X=u(t,"DIV",{class:!0});var D=d(X);Z=u(D,"DIV",{class:!0});var V=d(Z);Y=h(V,"Pieces"),V.forEach(m),ea=v(D),sa=u(D,"BR",{}),ta=v(D),ra=h(D,le),D.forEach(m),ca=v(t),la=u(t,"DIV",{class:!0});var $=d(la);ia=u($,"DIV",{class:!0});var B=d(ia);oa=h(B,"Quantity"),B.forEach(m),na=v($),ua=u($,"BR",{}),da=v($),ha=h($,ie),$.forEach(m),ma=v(t),va=u(t,"DIV",{class:!0});var k=d(va);fa=u(k,"DIV",{class:!0});var M=d(fa);ba=h(M,"Currency"),M.forEach(m),pa=v(k),ga=u(k,"BR",{}),Ea=v(k),Ia=h(k,oe),k.forEach(m),_a=v(t),ya=u(t,"DIV",{class:!0});var aa=d(ya);Da=u(aa,"DIV",{class:!0});var Za=d(Da);Va=h(Za,"Unit Price"),Za.forEach(m),$a=v(aa),Ba=u(aa,"BR",{}),ka=v(aa),Ra=h(aa,ne),aa.forEach(m),Pa=v(t),Aa=u(t,"DIV",{class:!0});var Ya=d(Aa);Sa=u(Ya,"DIV",{class:!0});var ae=d(Sa);wa=h(ae,"Total"),ae.forEach(m),xa=v(Ya),qa=u(Ya,"BR",{}),Na=v(Ya),Oa=h(Ya,ue),Ya.forEach(m),Ca=v(t),La=u(t,"DIV",{class:!0});var he=d(La);Ua=u(he,"DIV",{class:!0});var me=d(Ua);Ta=h(me,"Received"),me.forEach(m),Ma=v(he),ja=u(he,"BR",{}),Ha=v(he),Wa=h(he,de),he.forEach(m),Ga=v(t),Fa=u(t,"DIV",{class:!0});var ve=d(Fa);Qa=u(ve,"BUTTON",{class:!0});var fe=d(Qa);za=u(fe,"SPAN",{class:!0});var be=d(za);y(Ja.$$.fragment,be),be.forEach(m),fe.forEach(m),ve.forEach(m),t.forEach(m),Ka=v(a),Xa=u(a,"HR",{}),this.h()},h(){f(r,"class","tag is-rounded has-text-weight-bold is-large"),f(s,"class","column is-narrow"),f(S,"class","gray is-size-7"),f(E,"class","column is-3"),f(N,"class","tag is-rounded is-small"),f(q,"class","column has-text-centered"),f(W,"class","tag is-rounded is-small"),f(H,"class","column has-text-centered"),f(Z,"class","tag is-rounded is-small"),f(X,"class","column has-text-centered"),f(ia,"class","tag is-rounded is-small"),f(la,"class","column has-text-centered"),f(fa,"class","tag is-rounded is-small"),f(va,"class","column has-text-centered"),f(Da,"class","tag is-rounded is-small"),f(ya,"class","column has-text-centered"),f(Sa,"class","tag is-rounded is-small"),f(Aa,"class","column has-text-centered"),f(Ua,"class","tag is-rounded is-small has-text-weight-bold"),f(La,"class","column has-text-centered"),f(za,"class","icon"),f(Qa,"class","button is-danger"),f(Fa,"class","column has-text-right"),f(e,"class","columns")},m(a,t){l(a,e,t),b(e,s),b(s,r),b(r,c),b(e,g),b(e,E),b(E,I),b(E,R),b(E,P),b(E,A),b(E,S),b(S,w),b(e,x),b(e,q),b(q,N),b(N,O),b(q,C),b(q,L),b(q,U),b(q,T),b(e,j),b(e,H),b(H,W),b(W,G),b(H,F),b(H,Q),b(H,z),b(H,J),b(e,K),b(e,X),b(X,Z),b(Z,Y),b(X,ea),b(X,sa),b(X,ta),b(X,ra),b(e,ca),b(e,la),b(la,ia),b(ia,oa),b(la,na),b(la,ua),b(la,da),b(la,ha),b(e,ma),b(e,va),b(va,fa),b(fa,ba),b(va,pa),b(va,ga),b(va,Ea),b(va,Ia),b(e,_a),b(e,ya),b(ya,Da),b(Da,Va),b(ya,$a),b(ya,Ba),b(ya,ka),b(ya,Ra),b(e,Pa),b(e,Aa),b(Aa,Sa),b(Sa,wa),b(Aa,xa),b(Aa,qa),b(Aa,Na),b(Aa,Oa),b(e,Ca),b(e,La),b(La,Ua),b(Ua,Ta),b(La,Ma),b(La,ja),b(La,Ha),b(La,Wa),b(e,Ga),b(e,Fa),b(Fa,Qa),b(Qa,za),D(Ja,za,null),l(a,Ka,t),l(a,Xa,t),Za=!0,Ya||(ae=V(Qa,"click",he),Ya=!0)},p(e,s){a=e,(!Za||8&s[0])&&se!==(se=a[45].purchase_order_item.label+"")&&p(I,se),(!Za||8&s[0])&&te!==(te=a[45].remark+"")&&p(w,te),(!Za||8&s[0])&&re!==(re=a[45].po_no+"")&&p(T,re),(!Za||8&s[0])&&ce!==(ce=a[45].unit+"")&&p(J,ce),(!Za||8&s[0])&&le!==(le=a[45].pieces+"")&&p(ra,le),(!Za||8&s[0])&&ie!==(ie=aa(a[45].quantity)+"")&&p(ha,ie),(!Za||8&s[0])&&oe!==(oe=a[45].currency+"")&&p(Ia,oe),(!Za||8&s[0])&&ne!==(ne=aa(a[45].unitPrice)+"")&&p(Ra,ne),(!Za||8&s[0])&&ue!==(ue=aa(a[45].unitPrice*a[45].quantity)+"")&&p(Oa,ue),(!Za||8&s[0])&&de!==(de=aa(a[45].received)+"")&&p(Wa,de)},i(a){Za||($(Ja.$$.fragment,a),Za=!0)},o(a){B(Ja.$$.fragment,a),Za=!1},d(a){a&&m(e),k(Ja),a&&m(Ka),a&&m(Xa),Ya=!1,ae()}}}function ha(a){let e,s;return{c(){e=i("p"),s=o("Purchase Order is required"),this.h()},l(a){e=u(a,"P",{class:!0});var t=d(e);s=h(t,"Purchase Order is required"),t.forEach(m),this.h()},h(){f(e,"class","help is-danger")},m(a,t){l(a,e,t),b(e,s)},d(a){a&&m(e)}}}function ma(a){let e,s;return{c(){e=i("p"),s=o("Purchase Order Item is required"),this.h()},l(a){e=u(a,"P",{class:!0});var t=d(e);s=h(t,"Purchase Order Item is required"),t.forEach(m),this.h()},h(){f(e,"class","help is-danger")},m(a,t){l(a,e,t),b(e,s)},d(a){a&&m(e)}}}function va(a){let e,s;return{c(){e=i("p"),s=o("Received is required"),this.h()},l(a){e=u(a,"P",{class:!0});var t=d(e);s=h(t,"Received is required"),t.forEach(m),this.h()},h(){f(e,"class","help is-danger")},m(a,t){l(a,e,t),b(e,s)},d(a){a&&m(e)}}}function fa(a){let e,s,t,r,f,p,E=a[2],I=[];for(let e=0;e<E.length;e+=1)I[e]=ba(sa(a,E,e));return{c(){e=i("h5"),s=o("Stock History"),t=n(),r=i("hr"),f=n();for(let a=0;a<I.length;a+=1)I[a].c();p=c()},l(a){e=u(a,"H5",{});var l=d(e);s=h(l,"Stock History"),l.forEach(m),t=v(a),r=u(a,"HR",{}),f=v(a);for(let e=0;e<I.length;e+=1)I[e].l(a);p=c()},m(a,c){l(a,e,c),b(e,s),l(a,t,c),l(a,r,c),l(a,f,c);for(let e=0;e<I.length;e+=1)I[e].m(a,c);l(a,p,c)},p(a,e){if(4&e[0]){let s;for(E=a[2],s=0;s<E.length;s+=1){const t=sa(a,E,s);I[s]?I[s].p(t,e):(I[s]=ba(t),I[s].c(),I[s].m(p.parentNode,p))}for(;s<I.length;s+=1)I[s].d(1);I.length=E.length}},d(a){a&&m(e),a&&m(t),a&&m(r),a&&m(f),g(I,a),a&&m(p)}}}function ba(a){let e,s,t,r,c,g,E,I,_,y,D,V,$,B,k,R,P,A,S,w,x,q,N,O,C,L,U,T,M,j,H,W,G,F,Q,z,J,K,X,Z,Y,aa,ea,sa,ta,ra,ca,la,ia,oa,na,ua,da,ha,ma,va,fa,ba,pa,ga,Ea,Ia,_a,ya,Da,Va,$a,Ba,ka,Ra,Pa,Aa,Sa,wa,xa,qa,Na,Oa,Ca,La,Ua,Ta,Ma,ja,Ha,Wa,Ga=a[42].attributes.stock.data.id+"",Fa=a[42].attributes.stock.data.attributes.date+"",Qa=a[42].attributes.stock.data.attributes.consortium_member?.data.attributes.name+"",za=a[42].attributes.stock.data.attributes.warehouse?.data.attributes.name+"",Ja=a[42].id+"",Ka=a[42].attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.name+"",Xa=a[42].attributes.purchase_order_item?.data?.id+"",Za=a[42].attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.category+"",Ya=a[42].attributes.purchase_order_item?.data?.attributes.unit+"",ae=a[42].attributes.purchase_order_item?.data?.attributes.pieces+"",ee=a[42].attributes.purchase_order_item?.data?.attributes.quantity+"",se=a[42].attributes.purchase_order_item?.data?.attributes.unitPrice+"",te=a[42].attributes.purchase_order_item?.data?.attributes.currency+"",re=a[42].attributes.received+"",ce=a[42].attributes.remark+"";return{c(){e=i("div"),s=i("div"),t=o(Ga),r=n(),c=i("div"),g=o(Fa),E=n(),I=i("div"),_=o(Qa),y=n(),D=i("div"),V=o(za),$=n(),B=i("div"),k=i("div"),R=o(Ja),P=n(),A=i("div"),S=i("span"),w=o(Ka),x=o("  - ("),q=o(Xa),N=o(")"),O=n(),C=i("br"),L=n(),U=i("span"),T=o(Za),M=n(),j=i("div"),H=i("span"),W=o("Unit"),G=n(),F=i("br"),Q=n(),z=o(Ya),J=n(),K=i("div"),X=i("span"),Z=o("Pieces"),Y=n(),aa=i("br"),ea=n(),sa=o(ae),ta=n(),ra=i("div"),ca=i("span"),la=o("Quantity"),ia=n(),oa=i("br"),na=n(),ua=o(ee),da=n(),ha=i("div"),ma=i("span"),va=o("Unit Price"),fa=n(),ba=i("br"),pa=n(),ga=o(se),Ea=n(),Ia=i("div"),_a=i("span"),ya=o("Currency"),Da=n(),Va=i("br"),$a=n(),Ba=o(te),ka=n(),Ra=i("div"),Pa=i("span"),Aa=o("Received"),Sa=n(),wa=i("br"),xa=n(),qa=o(re),Na=n(),Oa=i("div"),Ca=i("span"),La=o("Remark"),Ua=n(),Ta=i("br"),Ma=n(),ja=o(ce),Ha=n(),Wa=i("hr"),this.h()},l(a){e=u(a,"DIV",{class:!0});var l=d(e);s=u(l,"DIV",{class:!0});var i=d(s);t=h(i,Ga),i.forEach(m),r=v(l),c=u(l,"DIV",{class:!0});var o=d(c);g=h(o,Fa),o.forEach(m),E=v(l),I=u(l,"DIV",{class:!0});var n=d(I);_=h(n,Qa),n.forEach(m),y=v(l),D=u(l,"DIV",{class:!0});var f=d(D);V=h(f,za),f.forEach(m),l.forEach(m),$=v(a),B=u(a,"DIV",{class:!0});var b=d(B);k=u(b,"DIV",{class:!0});var p=d(k);R=h(p,Ja),p.forEach(m),P=v(b),A=u(b,"DIV",{class:!0});var le=d(A);S=u(le,"SPAN",{class:!0});var ie=d(S);w=h(ie,Ka),x=h(ie,"  - ("),q=h(ie,Xa),N=h(ie,")"),ie.forEach(m),O=v(le),C=u(le,"BR",{}),L=v(le),U=u(le,"SPAN",{class:!0});var oe=d(U);T=h(oe,Za),oe.forEach(m),le.forEach(m),M=v(b),j=u(b,"DIV",{class:!0});var ne=d(j);H=u(ne,"SPAN",{class:!0});var ue=d(H);W=h(ue,"Unit"),ue.forEach(m),G=v(ne),F=u(ne,"BR",{}),Q=v(ne),z=h(ne,Ya),ne.forEach(m),J=v(b),K=u(b,"DIV",{class:!0});var de=d(K);X=u(de,"SPAN",{class:!0});var he=d(X);Z=h(he,"Pieces"),he.forEach(m),Y=v(de),aa=u(de,"BR",{}),ea=v(de),sa=h(de,ae),de.forEach(m),ta=v(b),ra=u(b,"DIV",{class:!0});var me=d(ra);ca=u(me,"SPAN",{class:!0});var ve=d(ca);la=h(ve,"Quantity"),ve.forEach(m),ia=v(me),oa=u(me,"BR",{}),na=v(me),ua=h(me,ee),me.forEach(m),da=v(b),ha=u(b,"DIV",{class:!0});var fe=d(ha);ma=u(fe,"SPAN",{class:!0});var be=d(ma);va=h(be,"Unit Price"),be.forEach(m),fa=v(fe),ba=u(fe,"BR",{}),pa=v(fe),ga=h(fe,se),fe.forEach(m),Ea=v(b),Ia=u(b,"DIV",{class:!0});var pe=d(Ia);_a=u(pe,"SPAN",{class:!0});var ge=d(_a);ya=h(ge,"Currency"),ge.forEach(m),Da=v(pe),Va=u(pe,"BR",{}),$a=v(pe),Ba=h(pe,te),pe.forEach(m),ka=v(b),Ra=u(b,"DIV",{class:!0});var Ee=d(Ra);Pa=u(Ee,"SPAN",{class:!0});var Ie=d(Pa);Aa=h(Ie,"Received"),Ie.forEach(m),Sa=v(Ee),wa=u(Ee,"BR",{}),xa=v(Ee),qa=h(Ee,re),Ee.forEach(m),Na=v(b),Oa=u(b,"DIV",{class:!0});var _e=d(Oa);Ca=u(_e,"SPAN",{class:!0});var ye=d(Ca);La=h(ye,"Remark"),ye.forEach(m),Ua=v(_e),Ta=u(_e,"BR",{}),Ma=v(_e),ja=h(_e,ce),_e.forEach(m),b.forEach(m),Ha=v(a),Wa=u(a,"HR",{}),this.h()},h(){f(s,"class","column is-narrow"),f(c,"class","column"),f(I,"class","column"),f(D,"class","column"),f(e,"class","columns has-text-weight-bold"),f(k,"class","column is-narrow gray"),f(S,"class",""),f(U,"class","gray"),f(A,"class","column is-3"),f(H,"class","is-small tag"),f(j,"class","column has-text-centered"),f(X,"class","is-small tag"),f(K,"class","column has-text-centered"),f(ca,"class","is-small tag"),f(ra,"class","column has-text-centered"),f(ma,"class","is-small tag"),f(ha,"class","column has-text-centered"),f(_a,"class","is-small tag"),f(Ia,"class","column has-text-centered"),f(Pa,"class","is-small tag"),f(Ra,"class","column has-text-centered"),f(Ca,"class","is-small tag"),f(Oa,"class","column has-text-centered"),f(B,"class","columns")},m(a,i){l(a,e,i),b(e,s),b(s,t),b(e,r),b(e,c),b(c,g),b(e,E),b(e,I),b(I,_),b(e,y),b(e,D),b(D,V),l(a,$,i),l(a,B,i),b(B,k),b(k,R),b(B,P),b(B,A),b(A,S),b(S,w),b(S,x),b(S,q),b(S,N),b(A,O),b(A,C),b(A,L),b(A,U),b(U,T),b(B,M),b(B,j),b(j,H),b(H,W),b(j,G),b(j,F),b(j,Q),b(j,z),b(B,J),b(B,K),b(K,X),b(X,Z),b(K,Y),b(K,aa),b(K,ea),b(K,sa),b(B,ta),b(B,ra),b(ra,ca),b(ca,la),b(ra,ia),b(ra,oa),b(ra,na),b(ra,ua),b(B,da),b(B,ha),b(ha,ma),b(ma,va),b(ha,fa),b(ha,ba),b(ha,pa),b(ha,ga),b(B,Ea),b(B,Ia),b(Ia,_a),b(_a,ya),b(Ia,Da),b(Ia,Va),b(Ia,$a),b(Ia,Ba),b(B,ka),b(B,Ra),b(Ra,Pa),b(Pa,Aa),b(Ra,Sa),b(Ra,wa),b(Ra,xa),b(Ra,qa),b(B,Na),b(B,Oa),b(Oa,Ca),b(Ca,La),b(Oa,Ua),b(Oa,Ta),b(Oa,Ma),b(Oa,ja),l(a,Ha,i),l(a,Wa,i)},p(a,e){4&e[0]&&Ga!==(Ga=a[42].attributes.stock.data.id+"")&&p(t,Ga),4&e[0]&&Fa!==(Fa=a[42].attributes.stock.data.attributes.date+"")&&p(g,Fa),4&e[0]&&Qa!==(Qa=a[42].attributes.stock.data.attributes.consortium_member?.data.attributes.name+"")&&p(_,Qa),4&e[0]&&za!==(za=a[42].attributes.stock.data.attributes.warehouse?.data.attributes.name+"")&&p(V,za),4&e[0]&&Ja!==(Ja=a[42].id+"")&&p(R,Ja),4&e[0]&&Ka!==(Ka=a[42].attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.name+"")&&p(w,Ka),4&e[0]&&Xa!==(Xa=a[42].attributes.purchase_order_item?.data?.id+"")&&p(q,Xa),4&e[0]&&Za!==(Za=a[42].attributes.purchase_order_item?.data?.attributes.item?.data?.attributes.category+"")&&p(T,Za),4&e[0]&&Ya!==(Ya=a[42].attributes.purchase_order_item?.data?.attributes.unit+"")&&p(z,Ya),4&e[0]&&ae!==(ae=a[42].attributes.purchase_order_item?.data?.attributes.pieces+"")&&p(sa,ae),4&e[0]&&ee!==(ee=a[42].attributes.purchase_order_item?.data?.attributes.quantity+"")&&p(ua,ee),4&e[0]&&se!==(se=a[42].attributes.purchase_order_item?.data?.attributes.unitPrice+"")&&p(ga,se),4&e[0]&&te!==(te=a[42].attributes.purchase_order_item?.data?.attributes.currency+"")&&p(Ba,te),4&e[0]&&re!==(re=a[42].attributes.received+"")&&p(qa,re),4&e[0]&&ce!==(ce=a[42].attributes.remark+"")&&p(ja,ce)},d(a){a&&m(e),a&&m($),a&&m(B),a&&m(Ha),a&&m(Wa)}}}function pa(a){let e,s,c,U,T,M,H,W,G,F,Q,z,J,K,X,ea,sa,ca,ia,ba,pa,ga,Ea,Ia,_a,ya,Da,Va,$a,Ba,ka,Ra,Pa,Aa,Sa,wa,xa,qa,Na,Oa,Ca,La,Ua,Ta,Ma,ja,Ha,Wa,Ga,Fa,Qa,za,Ja,Ka,Xa,Za,Ya,ae,ee,se,te,re,ce,le,ie,oe,ne,ue,de,he,me,ve,fe,be,pe,ge,Ee,Ie,_e,ye,De,Ve,$e,Be,ke,Re,Pe,Ae,Se,we,xe,qe,Ne,Oe,Ce,Le,Ue,Te,Me,je,He,We,Ge,Fe,Qe,ze,Je,Ke,Xe,Ze,Ye,as,es,ss,ts,rs,cs,ls,is,os,ns,us,ds,hs,ms,vs,fs,bs,ps,gs,Es,Is,_s,ys,Ds,Vs,$s,Bs,ks,Rs,Ps,As,Ss,ws,xs,qs,Ns,Os,Cs,Ls,Us,Ts,Ms,js,Hs,Ws,Gs,Fs=a[16].hasError("warehouse.required"),Qs=a[16].hasError("consortium_member.required"),zs=a[13].hasError("purchase_order.required"),Js=a[13].hasError("purchase_order_item.required"),Ks=a[13].hasError("received.required"),Xs=aa(a[1])+"",Zs=aa(a[1]-a[10].value)+"";W=new t({props:{data:r}});let Ys=a[8]&&la(a),at=a[5],et=[];for(let e=0;e<at.length;e+=1)et[e]=oa(ra(a,at,e));let st=Fs&&na();function tt(e){a[32](e)}let rt={items:a[4],listAutoWidth:!0};void 0!==a[9].value&&(rt.value=a[9].value),za=new Y({props:rt}),E.push((()=>I(za,"value",tt))),za.$on("select",a[28]);let ct=Qs&&ua();function lt(e){a[33](e)}let it={format:"yyyy/MM/dd",placeholder:"2000/31/12",closeOnSelection:!0,min:new Date("1920/1/1"),class:"input"};void 0!==a[14].value&&(it.value=a[14].value),le=new Z({props:it}),E.push((()=>I(le,"value",lt)));let ot=a[3],nt=[];for(let e=0;e<ot.length;e+=1)nt[e]=da(ta(a,ot,e));const ut=a=>B(nt[a],1,1,(()=>{nt[a]=null}));function dt(e){a[35](e)}Be=new t({props:{data:R}});let ht={items:a[6],listAutoWidth:!0};void 0!==a[12].value&&(ht.value=a[12].value),Ue=new Y({props:ht}),E.push((()=>I(Ue,"value",dt))),Ue.$on("select",a[29]);let mt=zs&&ha();function vt(e){a[36](e)}let ft={items:a[7]};void 0!==a[11].value&&(ft.value=a[11].value),Ke=new Y({props:ft}),E.push((()=>I(Ke,"value",vt))),Ke.$on("select",a[30]);let bt=Js&&ma(),pt=Ks&&va(),gt=a[2]&&fa(a);return{c(){e=n(),s=i("br"),c=i("br"),U=n(),T=i("div"),M=i("a"),H=i("span"),_(W.$$.fragment),G=o(" Back"),F=n(),Q=i("br"),z=i("br"),J=n(),K=i("div"),X=i("br"),ea=i("br"),sa=n(),ca=i("div"),ia=i("div"),ba=i("h3"),pa=o("Add Stock"),ga=n(),Ea=i("p"),Ia=o("Complete the form below and click save."),_a=n(),ya=i("div"),Da=i("button"),Va=o("Save"),Ba=n(),ka=i("br"),Ra=n(),Ys&&Ys.c(),Pa=n(),Aa=i("form"),Sa=i("div"),wa=i("div"),xa=i("div"),qa=i("label"),Na=o("Warehouse"),Oa=i("br"),Ca=n(),La=i("div"),Ua=i("select");for(let a=0;a<et.length;a+=1)et[a].c();Ta=n(),st&&st.c(),Ma=n(),ja=i("div"),Ha=i("div"),Wa=i("label"),Ga=o("Consortium Member (*)"),Fa=n(),Qa=i("div"),_(za.$$.fragment),Ka=n(),ct&&ct.c(),Xa=n(),Za=i("div"),Ya=i("div"),ae=i("div"),ee=i("label"),se=o("Date"),te=i("br"),re=n(),ce=i("div"),_(le.$$.fragment),oe=n(),ne=i("div"),ue=n(),de=i("br"),he=i("br"),me=n(),ve=i("br"),fe=n();for(let a=0;a<nt.length;a+=1)nt[a].c();be=n(),pe=i("form"),ge=i("div"),Ee=i("div"),Ie=i("h4"),_e=o("Stock Items"),ye=n(),De=i("div"),Ve=i("button"),$e=i("span"),_(Be.$$.fragment),ke=n(),Re=i("span"),Pe=o("Add a Stock Item"),Se=n(),we=i("div"),xe=i("div"),qe=i("div"),Ne=i("label"),Oe=o("Purchase Order (*)"),Ce=n(),Le=i("div"),_(Ue.$$.fragment),Me=n(),mt&&mt.c(),je=n(),He=i("div"),We=i("div"),Ge=i("div"),Fe=i("label"),Qe=o("Item (*)"),ze=n(),Je=i("div"),_(Ke.$$.fragment),Ze=n(),bt&&bt.c(),Ye=n(),as=i("div"),es=i("div"),ss=i("label"),ts=o("Received"),rs=i("br"),cs=n(),ls=i("input"),is=n(),pt&&pt.c(),os=n(),ns=i("div"),us=i("div"),ds=i("label"),hs=o("Remark"),ms=i("br"),vs=n(),fs=i("div"),bs=i("textarea"),ps=n(),gs=i("div"),Es=i("div"),Is=i("br"),_s=n(),ys=i("span"),Ds=o("Remaining Amount -"),Vs=n(),$s=o(Xs),Bs=n(),ks=i("br"),Rs=n(),Ps=i("span"),As=o("Differnece -"),Ss=n(),ws=o(Zs),xs=n(),gt&&gt.c(),qs=n(),Ns=i("br"),Os=i("br"),Cs=n(),Ls=i("br"),Us=i("br"),Ts=i("br"),Ms=i("br"),js=i("br"),this.h()},l(a){P('[data-svelte="svelte-9xus9w"]',document.head).forEach(m),e=v(a),s=u(a,"BR",{}),c=u(a,"BR",{}),U=v(a),T=u(a,"DIV",{class:!0});var t=d(T);M=u(t,"A",{href:!0,class:!0});var r=d(M);H=u(r,"SPAN",{class:!0});var l=d(H);y(W.$$.fragment,l),l.forEach(m),G=h(r," Back"),r.forEach(m),F=v(t),Q=u(t,"BR",{}),z=u(t,"BR",{}),J=v(t),K=u(t,"DIV",{class:!0});var i=d(K);X=u(i,"BR",{}),ea=u(i,"BR",{}),sa=v(i),ca=u(i,"DIV",{class:!0});var o=d(ca);ia=u(o,"DIV",{class:!0});var n=d(ia);ba=u(n,"H3",{class:!0});var f=d(ba);pa=h(f,"Add Stock"),f.forEach(m),ga=v(n),Ea=u(n,"P",{class:!0});var b=d(Ea);Ia=h(b,"Complete the form below and click save."),b.forEach(m),n.forEach(m),_a=v(o),ya=u(o,"DIV",{class:!0});var p=d(ya);Da=u(p,"BUTTON",{class:!0});var g=d(Da);Va=h(g,"Save"),g.forEach(m),p.forEach(m),o.forEach(m),Ba=v(i),ka=u(i,"BR",{}),Ra=v(i),Ys&&Ys.l(i),Pa=v(i),Aa=u(i,"FORM",{});var E=d(Aa);Sa=u(E,"DIV",{class:!0});var I=d(Sa);wa=u(I,"DIV",{class:!0});var _=d(wa);xa=u(_,"DIV",{class:!0});var D=d(xa);qa=u(D,"LABEL",{for:!0,class:!0});var V=d(qa);Na=h(V,"Warehouse"),V.forEach(m),Oa=u(D,"BR",{}),Ca=v(D),La=u(D,"DIV",{class:!0});var $=d(La);Ua=u($,"SELECT",{name:!0});var B=d(Ua);for(let a=0;a<et.length;a+=1)et[a].l(B);B.forEach(m),$.forEach(m),Ta=v(D),st&&st.l(D),D.forEach(m),_.forEach(m),Ma=v(I),ja=u(I,"DIV",{class:!0});var k=d(ja);Ha=u(k,"DIV",{class:!0});var R=d(Ha);Wa=u(R,"LABEL",{for:!0,class:!0});var A=d(Wa);Ga=h(A,"Consortium Member (*)"),A.forEach(m),Fa=v(R),Qa=u(R,"DIV",{class:!0});var S=d(Qa);y(za.$$.fragment,S),S.forEach(m),Ka=v(R),ct&&ct.l(R),R.forEach(m),k.forEach(m),I.forEach(m),Xa=v(E),Za=u(E,"DIV",{class:!0});var w=d(Za);Ya=u(w,"DIV",{class:!0});var x=d(Ya);ae=u(x,"DIV",{class:!0});var q=d(ae);ee=u(q,"LABEL",{for:!0,class:!0});var N=d(ee);se=h(N,"Date"),N.forEach(m),te=u(q,"BR",{}),re=v(q),ce=u(q,"DIV",{class:!0});var O=d(ce);y(le.$$.fragment,O),O.forEach(m),q.forEach(m),x.forEach(m),oe=v(w),ne=u(w,"DIV",{class:!0}),d(ne).forEach(m),w.forEach(m),ue=v(E),de=u(E,"BR",{}),he=u(E,"BR",{}),me=v(E),ve=u(E,"BR",{}),E.forEach(m),fe=v(i);for(let a=0;a<nt.length;a+=1)nt[a].l(i);be=v(i),pe=u(i,"FORM",{});var C=d(pe);ge=u(C,"DIV",{class:!0});var L=d(ge);Ee=u(L,"DIV",{class:!0});var j=d(Ee);Ie=u(j,"H4",{class:!0});var Z=d(Ie);_e=h(Z,"Stock Items"),Z.forEach(m),j.forEach(m),ye=v(L),De=u(L,"DIV",{class:!0});var Y=d(De);Ve=u(Y,"BUTTON",{class:!0});var aa=d(Ve);$e=u(aa,"SPAN",{class:!0});var ta=d($e);y(Be.$$.fragment,ta),ta.forEach(m),ke=v(aa),Re=u(aa,"SPAN",{class:!0});var ra=d(Re);Pe=h(ra,"Add a Stock Item"),ra.forEach(m),aa.forEach(m),Y.forEach(m),L.forEach(m),Se=v(C),we=u(C,"DIV",{class:!0});var la=d(we);xe=u(la,"DIV",{class:!0});var oa=d(xe);qe=u(oa,"DIV",{class:!0});var na=d(qe);Ne=u(na,"LABEL",{for:!0,class:!0});var ua=d(Ne);Oe=h(ua,"Purchase Order (*)"),ua.forEach(m),Ce=v(na),Le=u(na,"DIV",{class:!0});var da=d(Le);y(Ue.$$.fragment,da),da.forEach(m),Me=v(na),mt&&mt.l(na),na.forEach(m),oa.forEach(m),la.forEach(m),je=v(C),He=u(C,"DIV",{class:!0});var ha=d(He);We=u(ha,"DIV",{class:!0});var ma=d(We);Ge=u(ma,"DIV",{class:!0});var va=d(Ge);Fe=u(va,"LABEL",{for:!0,class:!0});var fa=d(Fe);Qe=h(fa,"Item (*)"),fa.forEach(m),ze=v(va),Je=u(va,"DIV",{class:!0});var $a=d(Je);y(Ke.$$.fragment,$a),$a.forEach(m),Ze=v(va),bt&&bt.l(va),va.forEach(m),ma.forEach(m),ha.forEach(m),Ye=v(C),as=u(C,"DIV",{class:!0});var Ja=d(as);es=u(Ja,"DIV",{class:!0});var ie=d(es);ss=u(ie,"LABEL",{for:!0,class:!0});var Ae=d(ss);ts=h(Ae,"Received"),Ae.forEach(m),rs=u(ie,"BR",{}),cs=v(ie),ls=u(ie,"INPUT",{type:!0,placeholder:!0,class:!0}),is=v(ie),pt&&pt.l(ie),ie.forEach(m),os=v(Ja),ns=u(Ja,"DIV",{class:!0});var Te=d(ns);us=u(Te,"DIV",{class:!0});var Xe=d(us);ds=u(Xe,"LABEL",{for:!0,class:!0});var Hs=d(ds);hs=h(Hs,"Remark"),Hs.forEach(m),ms=u(Xe,"BR",{}),vs=v(Xe),fs=u(Xe,"DIV",{class:!0});var Ws=d(fs);bs=u(Ws,"TEXTAREA",{rows:!0,class:!0}),d(bs).forEach(m),Ws.forEach(m),Xe.forEach(m),Te.forEach(m),Ja.forEach(m),ps=v(C),gs=u(C,"DIV",{class:!0});var Gs=d(gs);Es=u(Gs,"DIV",{class:!0});var Fs=d(Es);Is=u(Fs,"BR",{}),_s=v(Fs),ys=u(Fs,"SPAN",{class:!0});var Qs=d(ys);Ds=h(Qs,"Remaining Amount -"),Qs.forEach(m),Vs=v(Fs),$s=h(Fs,Xs),Bs=v(Fs),ks=u(Fs,"BR",{}),Rs=v(Fs),Ps=u(Fs,"SPAN",{class:!0});var zs=d(Ps);As=h(zs,"Differnece -"),zs.forEach(m),Ss=v(Fs),ws=h(Fs,Zs),Fs.forEach(m),Gs.forEach(m),xs=v(C),gt&&gt.l(C),C.forEach(m),qs=v(i),Ns=u(i,"BR",{}),Os=u(i,"BR",{}),i.forEach(m),t.forEach(m),Cs=v(a),Ls=u(a,"BR",{}),Us=u(a,"BR",{}),Ts=u(a,"BR",{}),Ms=u(a,"BR",{}),js=u(a,"BR",{}),this.h()},h(){document.title="Add Stock",f(H,"class","icon is-small"),f(M,"href","stocks"),f(M,"class","has-text-dark"),f(ba,"class","my-0"),f(Ea,"class","gray py-0"),f(ia,"class","column"),Da.disabled=$a=!a[16].valid||!a[16].dirty,f(Da,"class","button is-dark my-2 px-5 py-2 has-text-weight-bold"),f(ya,"class","column has-text-right"),f(ca,"class","columns"),f(qa,"for",""),f(qa,"class","gray"),Ua.required=!0,f(Ua,"name","category"),void 0===a[15].value&&A((()=>a[31].call(Ua))),f(La,"class","control select is-fullwidth svelte-mhom8b"),f(xa,"class","field"),f(wa,"class","column"),f(Wa,"for",""),f(Wa,"class","gray"),f(Qa,"class","control"),f(Ha,"class","field"),f(ja,"class","column"),f(Sa,"class","columns"),f(ee,"for",""),f(ee,"class","gray"),f(ce,"class","control"),f(ae,"class","field"),f(Ya,"class","column"),f(ne,"class","column"),f(Za,"class","columns"),f(Ie,"class","my-0"),f(Ee,"class","column"),f($e,"class","icon"),f(Re,"class","has-text-white has-text-weight-bold"),Ve.disabled=Ae=!a[16].valid||!a[16].dirty,f(Ve,"class","button is-success"),f(De,"class","column has-text-right"),f(ge,"class","columns"),f(Ne,"for",""),f(Ne,"class","gray"),f(Le,"class","control"),f(qe,"class","field"),f(xe,"class","column"),f(we,"class","columns"),f(Fe,"for",""),f(Fe,"class","gray"),f(Je,"class","control"),f(Ge,"class","field"),f(We,"class","column"),f(He,"class","columns"),f(ss,"for",""),f(ss,"class","gray"),f(ls,"type","number"),f(ls,"placeholder","Unit Price"),f(ls,"class","input svelte-mhom8b"),S(ls,"is-danger",a[1]-a[10].value<0),f(es,"class","column"),f(ds,"for",""),f(ds,"class","gray"),f(bs,"rows","1"),f(bs,"class","textarea"),f(fs,"class","control is-fullwidth"),f(us,"class","field"),f(ns,"class","column"),f(as,"class","columns"),f(ys,"class","has-text-weight-bold"),f(Ps,"class","has-text-weight-bold"),f(Es,"class","column has-text-right"),f(gs,"class","columns"),f(K,"class","card px-6 svelte-mhom8b"),f(T,"class","container px-6")},m(t,r){l(t,e,r),l(t,s,r),l(t,c,r),l(t,U,r),l(t,T,r),b(T,M),b(M,H),D(W,H,null),b(M,G),b(T,F),b(T,Q),b(T,z),b(T,J),b(T,K),b(K,X),b(K,ea),b(K,sa),b(K,ca),b(ca,ia),b(ia,ba),b(ba,pa),b(ia,ga),b(ia,Ea),b(Ea,Ia),b(ca,_a),b(ca,ya),b(ya,Da),b(Da,Va),b(K,Ba),b(K,ka),b(K,Ra),Ys&&Ys.m(K,null),b(K,Pa),b(K,Aa),b(Aa,Sa),b(Sa,wa),b(wa,xa),b(xa,qa),b(qa,Na),b(xa,Oa),b(xa,Ca),b(xa,La),b(La,Ua);for(let a=0;a<et.length;a+=1)et[a].m(Ua,null);w(Ua,a[15].value),b(xa,Ta),st&&st.m(xa,null),b(Sa,Ma),b(Sa,ja),b(ja,Ha),b(Ha,Wa),b(Wa,Ga),b(Ha,Fa),b(Ha,Qa),D(za,Qa,null),b(Ha,Ka),ct&&ct.m(Ha,null),b(Aa,Xa),b(Aa,Za),b(Za,Ya),b(Ya,ae),b(ae,ee),b(ee,se),b(ae,te),b(ae,re),b(ae,ce),D(le,ce,null),b(Za,oe),b(Za,ne),b(Aa,ue),b(Aa,de),b(Aa,he),b(Aa,me),b(Aa,ve),b(K,fe);for(let a=0;a<nt.length;a+=1)nt[a].m(K,null);b(K,be),b(K,pe),b(pe,ge),b(ge,Ee),b(Ee,Ie),b(Ie,_e),b(ge,ye),b(ge,De),b(De,Ve),b(Ve,$e),D(Be,$e,null),b(Ve,ke),b(Ve,Re),b(Re,Pe),b(pe,Se),b(pe,we),b(we,xe),b(xe,qe),b(qe,Ne),b(Ne,Oe),b(qe,Ce),b(qe,Le),D(Ue,Le,null),b(qe,Me),mt&&mt.m(qe,null),b(pe,je),b(pe,He),b(He,We),b(We,Ge),b(Ge,Fe),b(Fe,Qe),b(Ge,ze),b(Ge,Je),D(Ke,Je,null),b(Ge,Ze),bt&&bt.m(Ge,null),b(pe,Ye),b(pe,as),b(as,es),b(es,ss),b(ss,ts),b(es,rs),b(es,cs),b(es,ls),x(ls,a[10].value),b(es,is),pt&&pt.m(es,null),b(as,os),b(as,ns),b(ns,us),b(us,ds),b(ds,hs),b(us,ms),b(us,vs),b(us,fs),b(fs,bs),x(bs,a[0]),b(pe,ps),b(pe,gs),b(gs,Es),b(Es,Is),b(Es,_s),b(Es,ys),b(ys,Ds),b(Es,Vs),b(Es,$s),b(Es,Bs),b(Es,ks),b(Es,Rs),b(Es,Ps),b(Ps,As),b(Es,Ss),b(Es,ws),b(pe,xs),gt&&gt.m(pe,null),b(K,qs),b(K,Ns),b(K,Os),l(t,Cs,r),l(t,Ls,r),l(t,Us,r),l(t,Ts,r),l(t,Ms,r),l(t,js,r),Hs=!0,Ws||(Gs=[V(Da,"click",q(a[25])),V(Ua,"change",a[31]),V(Ve,"click",q(a[26])),V(ls,"input",a[37]),V(bs,"input",a[38])],Ws=!0)},p(a,e){if((!Hs||65536&e[0]&&$a!==($a=!a[16].valid||!a[16].dirty))&&(Da.disabled=$a),a[8]?Ys?Ys.p(a,e):(Ys=la(a),Ys.c(),Ys.m(K,Pa)):Ys&&(Ys.d(1),Ys=null),32&e[0]){let s;for(at=a[5],s=0;s<at.length;s+=1){const t=ra(a,at,s);et[s]?et[s].p(t,e):(et[s]=oa(t),et[s].c(),et[s].m(Ua,null))}for(;s<et.length;s+=1)et[s].d(1);et.length=at.length}32800&e[0]&&w(Ua,a[15].value),65536&e[0]&&(Fs=a[16].hasError("warehouse.required")),Fs?st||(st=na(),st.c(),st.m(xa,null)):st&&(st.d(1),st=null);const s={};16&e[0]&&(s.items=a[4]),!Ja&&512&e[0]&&(Ja=!0,s.value=a[9].value,N((()=>Ja=!1))),za.$set(s),65536&e[0]&&(Qs=a[16].hasError("consortium_member.required")),Qs?ct||(ct=ua(),ct.c(),ct.m(Ha,null)):ct&&(ct.d(1),ct=null);const t={};if(!ie&&16384&e[0]&&(ie=!0,t.value=a[14].value,N((()=>ie=!1))),le.$set(t),134217736&e[0]){let s;for(ot=a[3],s=0;s<ot.length;s+=1){const t=ta(a,ot,s);nt[s]?(nt[s].p(t,e),$(nt[s],1)):(nt[s]=da(t),nt[s].c(),$(nt[s],1),nt[s].m(K,be))}for(j(),s=ot.length;s<nt.length;s+=1)ut(s);O()}(!Hs||65536&e[0]&&Ae!==(Ae=!a[16].valid||!a[16].dirty))&&(Ve.disabled=Ae);const r={};64&e[0]&&(r.items=a[6]),!Te&&4096&e[0]&&(Te=!0,r.value=a[12].value,N((()=>Te=!1))),Ue.$set(r),8192&e[0]&&(zs=a[13].hasError("purchase_order.required")),zs?mt||(mt=ha(),mt.c(),mt.m(qe,null)):mt&&(mt.d(1),mt=null);const c={};128&e[0]&&(c.items=a[7]),!Xe&&2048&e[0]&&(Xe=!0,c.value=a[11].value,N((()=>Xe=!1))),Ke.$set(c),8192&e[0]&&(Js=a[13].hasError("purchase_order_item.required")),Js?bt||(bt=ma(),bt.c(),bt.m(Ge,null)):bt&&(bt.d(1),bt=null),1024&e[0]&&C(ls.value)!==a[10].value&&x(ls,a[10].value),1026&e[0]&&S(ls,"is-danger",a[1]-a[10].value<0),8192&e[0]&&(Ks=a[13].hasError("received.required")),Ks?pt||(pt=va(),pt.c(),pt.m(es,null)):pt&&(pt.d(1),pt=null),1&e[0]&&x(bs,a[0]),(!Hs||2&e[0])&&Xs!==(Xs=aa(a[1])+"")&&p($s,Xs),(!Hs||1026&e[0])&&Zs!==(Zs=aa(a[1]-a[10].value)+"")&&p(ws,Zs),a[2]?gt?gt.p(a,e):(gt=fa(a),gt.c(),gt.m(pe,null)):gt&&(gt.d(1),gt=null)},i(a){if(!Hs){$(W.$$.fragment,a),$(za.$$.fragment,a),$(le.$$.fragment,a);for(let a=0;a<ot.length;a+=1)$(nt[a]);$(Be.$$.fragment,a),$(Ue.$$.fragment,a),$(Ke.$$.fragment,a),Hs=!0}},o(a){B(W.$$.fragment,a),B(za.$$.fragment,a),B(le.$$.fragment,a),nt=nt.filter(Boolean);for(let a=0;a<nt.length;a+=1)B(nt[a]);B(Be.$$.fragment,a),B(Ue.$$.fragment,a),B(Ke.$$.fragment,a),Hs=!1},d(a){a&&m(e),a&&m(s),a&&m(c),a&&m(U),a&&m(T),k(W),Ys&&Ys.d(),g(et,a),st&&st.d(),k(za),ct&&ct.d(),k(le),g(nt,a),k(Be),k(Ue),mt&&mt.d(),k(Ke),bt&&bt.d(),pt&&pt.d(),gt&&gt.d(),a&&m(Cs),a&&m(Ls),a&&m(Us),a&&m(Ts),a&&m(Ms),a&&m(js),Ws=!1,L(Gs)}}}function ga(a,e,s){let t,r,c,l,i,o,n,u;const d=z("warehouse","",[J()]);U(a,d,(a=>s(15,n=a)));const h=z("consortium_member","",[J()]);U(a,h,(a=>s(9,t=a)));const m=z("date",new Date,[J()]);U(a,m,(a=>s(14,o=a)));const v=K(d,h,m);U(a,v,(a=>s(16,u=a)));const f=z("purchase_order",null,[J()]);U(a,f,(a=>s(12,l=a)));const b=z("purchase_order_item",null,[J()]);U(a,b,(a=>s(11,c=a)));const p=z("received","",[J()]);U(a,p,(a=>s(10,r=a)));let g="",E=0,I=[];const _=K(f,b,p);U(a,_,(a=>s(13,i=a)));let y,D=[],V=[],$=[],B=[],k=[];function R(a){s(3,D=D.filter((e=>e.index!=D[a].index)))}T((()=>{!async function(){try{let a={"pagination[limit]":-1};a=X.stringify(a,{encodeValuesOnly:!0});let e=await F("consortium-members",a);console.log("Get Consortium Members ",e),s(4,V=e.data.map((a=>({value:a.id,label:a.attributes.name,data:a}))))}catch(a){console.log("Error Get Consortium Members ",a)}}(),async function(){try{let a={"pagination[limit]":-1};a=X.stringify(a,{encodeValuesOnly:!0});let e=await F("warehouses",a);console.log("Get Warehouses ",e),s(5,$=e.data)}catch(a){console.log("Error Get Warehouses ",a)}}()}));return[g,E,I,D,V,$,B,k,y,t,r,c,l,i,o,n,u,d,h,m,v,f,b,p,_,async function(){if(await v.validate(),u.valid)try{let a=await H({path:"stocks?populate=%2A",data:{data:{warehouse:n.value,consortium_member:t.value.value,date:o.value}}});console.log("Add Stock Request  ",a),a.data?.id&&(W.push("Stock Added Successfully!",{duration:2e4,theme:{"--toastBackground":"#48BB78","--toastBarBackground":"#2F855A"}}),ea("Stock",a.data,"Create",a.data.id),async function(a){try{D.forEach((async e=>{let s=await H({path:"stock-items?populate=%2A",data:{data:{stock:a.id,purchase_order_item:e.purchase_order_item.value,received:e.received,remark:e.remark}}});console.log("Save Stock Items ",s),s.data&&ea("Stock Item",s.data,"Create",s.data.id)})),G("stocks")}catch(a){console.log("Error Stock Items ",a)}}(a.data))}catch(a){console.log("Error Add Stock   ",a),s(8,y=a.error.details.errors),W.push("Stock Could Not Be Added! \n\n"+a.error.message,{duration:2e4,theme:{"--toastBackground":"#bb4848","--toastBarBackground":"#852f2f"}})}},async function(){await _.validate(),!i.valid||E-r.value<0||(console.log("Add Item ",c.value),s(3,D=[...D,{index:D.length,purchase_order_item:c.value,po_no:l.value.data?.attributes.poNumber,unit:c.value.data?.attributes.unit,pieces:c.value.data?.attributes.pieces,currency:c.value.data?.attributes.currency,quantity:c.value.data?.attributes.quantity,unitPrice:c.value.data?.attributes.unitPrice,received:r.value,remark:g}]),_.reset(),s(0,g=""),s(2,I=[]),s(1,E=0),console.log(D),W.push("Stock Item Added Successfully!",{duration:2e4,theme:{"--toastBackground":"#48BB78","--toastBarBackground":"#2F855A"}}))},R,async function(a){f.set(""),b.set(""),s(1,E=0),s(2,I=[]);try{let a={populate:{consortium_member:{populate:"*"},purchase_order_items:{populate:"*"}},filters:{consortium_member:{id:{$in:[t.value.value]}}},"pagination[limit]":-1};a=X.stringify(a,{encodeValuesOnly:!0});let e=await F("purchase-orders",a);console.log("Get Purchase Orders ",e),s(6,B=e.data.map((a=>({value:a.id,label:"PO# - "+a.attributes.poNumber+"  ------- Date   "+a.attributes.date+"    ID    "+a.id,data:a}))))}catch(a){console.log("Error Purchase Orders ",a)}},async function(a){a.detail?.value&&(console.log(B.filter((e=>e.value==a.detail.value))[0].data?.attributes.purchase_order_items.data),s(7,k=B.filter((e=>e.value==a.detail.value))[0].data?.attributes.purchase_order_items.data),s(7,k=k.map((a=>({value:a.id,label:a.attributes.item.data.attributes.name+"-"+a.attributes.item.data.attributes.category+"  --- Unit - "+a.attributes.unit+" - Pieces - "+a.attributes.pieces+" - Quantity - "+a.attributes.quantity+" - Unit Price - "+a.attributes.unitPrice+" - Currency - "+a.attributes.currency+"    ID    "+a.id,data:a})))))},async function(a){if(a.detail?.data)try{let e={populate:["stock","stock.consortium_member","stock.warehouse","purchase_order_item","purchase_order_item.item"],filters:{purchase_order_item:{id:{$in:[a.detail.data.id]}}},"pagination[limit]":-1};e=X.stringify(e,{encodeValuesOnly:!0});let t=await F("stock-items",e);console.log("Get Stock Items ",t);let r=0;return s(2,I=t.data.filter((a=>a.attributes.stock.data))),t.data.forEach((a=>{r+=parseInt(a.attributes.received)})),void s(1,E=parseInt(a.detail.data.attributes.quantity)-r)}catch(a){console.log("Error Stock Items ",a)}s(1,E=0)},function(){n.value=Q(this),d.set(n),s(5,$)},function(e){a.$$.not_equal(t.value,e)&&(t.value=e,h.set(t))},function(e){a.$$.not_equal(o.value,e)&&(o.value=e,m.set(o))},a=>R(a),function(e){a.$$.not_equal(l.value,e)&&(l.value=e,f.set(l))},function(e){a.$$.not_equal(c.value,e)&&(c.value=e,b.set(c))},function(){r.value=C(this.value),p.set(r)},function(){g=this.value,s(0,g)}]}class Ea extends a{constructor(a){super(),e(this,a,ga,pa,s,{},null,[-1,-1])}}export{Ea as default};
