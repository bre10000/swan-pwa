import{aO as s,S as a,i as e,s as r,e as l,t,z as i,c as o,a as n,b as c,d,C as h,f as u,D as p,h as f,j as g,E as m,F as v,G as w,A as E,k as b,P as y,J as R,B as I,U as B,v as C,W as x,u as V,g as A}from"./client.39550401.js";import{f as P,r as D,a as N}from"./required.58b29d3a.js";import{s as q}from"./session.90898fc5.js";function S({path:a,header:e,data:r}){return async function({method:a,path:e,params:r,header:l,data:t}){const i=window.fetch,o={method:a,headers:{Accept:"*/*","Content-Type":l&&l.ContentType?l.ContentType:"application/x-www-form-urlencoded"},Cache:"no-cache"};console.log("Send options"),console.log(o),t&&("application/x-www-form-urlencoded"==o.headers["Content-Type"]||"GET"==a?o.body=new URLSearchParams(t):"application/json"==o.headers["Content-Type"]&&(o.body=JSON.stringify(t)));let n=new URL(`${s}/${e}`);r&&Object.keys(r).forEach((s=>n.searchParams.append(s,r[s])));try{let s=await i(n,o);if(console.log({response:s}),!s)throw"response undefined";let a=await s.text();console.log({json:a});try{return JSON.parse(a)}catch(s){throw s}}catch(s){throw s}}({method:"POST",path:a,header:e,data:r})}function T(s,a,e){const r=s.slice();return r[11]=a[e],r}function j(s){let a,e;return{c(){a=l("p"),e=t("Identifier is required"),this.h()},l(s){a=o(s,"P",{class:!0});var r=n(a);e=c(r,"Identifier is required"),r.forEach(d),this.h()},h(){u(a,"class","help is-danger")},m(s,r){f(s,a,r),g(a,e)},d(s){s&&d(a)}}}function L(s){let a,e;return{c(){a=l("p"),e=t("Password is required"),this.h()},l(s){a=o(s,"P",{class:!0});var r=n(a);e=c(r,"Password is required"),r.forEach(d),this.h()},h(){u(a,"class","help is-danger")},m(s,r){f(s,a,r),g(a,e)},d(s){s&&d(a)}}}function G(s){let a,e=s[0].password,r=[];for(let a=0;a<e.length;a+=1)r[a]=H(T(s,e,a));return{c(){for(let s=0;s<r.length;s+=1)r[s].c();a=E()},l(s){for(let a=0;a<r.length;a+=1)r[a].l(s);a=E()},m(s,e){for(let a=0;a<r.length;a+=1)r[a].m(s,e);f(s,a,e)},p(s,l){if(1&l){let t;for(e=s[0].password,t=0;t<e.length;t+=1){const i=T(s,e,t);r[t]?r[t].p(i,l):(r[t]=H(i),r[t].c(),r[t].m(a.parentNode,a))}for(;t<r.length;t+=1)r[t].d(1);r.length=e.length}},d(s){y(r,s),s&&d(a)}}}function H(s){let a,e,r=s[11]+"";return{c(){a=l("p"),e=t(r),this.h()},l(s){a=o(s,"P",{class:!0});var l=n(a);e=c(l,r),l.forEach(d),this.h()},h(){u(a,"class","help is-danger")},m(s,r){f(s,a,r),g(a,e)},p(s,a){1&a&&r!==(r=s[11]+"")&&b(e,r)},d(s){s&&d(a)}}}function _(s){let a,e;return{c(){a=l("h5"),e=t(s[0]),this.h()},l(r){a=o(r,"H5",{class:!0});var l=n(a);e=c(l,s[0]),l.forEach(d),this.h()},h(){u(a,"class","has-text-danger is-size-6")},m(s,r){f(s,a,r),g(a,e)},p(s,a){1&a&&b(e,s[0])},d(s){s&&d(a)}}}function O(s){let a,e,r,E,b,y,x,V,A,P,D,N,q,S,T,H,O,U,W,M,z,J,k,F,$,K,Q,X,Y,Z,ss,as,es,rs,ls,ts,is,os,ns,cs,ds,hs,us,ps,fs,gs,ms,vs,ws,Es,bs,ys,Rs,Is,Bs=s[6]&&function(s){let a,e,r,E,b,y,I,B,C,x,V,A,P,D,N,q,S,T,H,O,U,W,M,z,J,k=s[3].hasError("identifier.required"),F=s[3].hasError("password.required"),$=k&&j(),K=F&&L(),Q=s[0]&&s[0]?.password&&G(s),X=s[0]&&_(s);return{c(){a=l("form"),e=l("div"),r=l("label"),E=t("Username or Email"),b=i(),y=l("div"),I=l("input"),B=i(),$&&$.c(),C=i(),x=l("div"),V=l("label"),A=t("Password"),P=i(),D=l("div"),N=l("input"),q=i(),K&&K.c(),S=i(),Q&&Q.c(),T=i(),X&&X.c(),H=i(),O=l("div"),U=l("button"),W=t("Login"),this.h()},l(s){a=o(s,"FORM",{class:!0,style:!0});var l=n(a);e=o(l,"DIV",{class:!0});var t=n(e);r=o(t,"LABEL",{for:!0,class:!0});var i=n(r);E=c(i,"Username or Email"),i.forEach(d),b=h(t),y=o(t,"DIV",{class:!0});var u=n(y);I=o(u,"INPUT",{class:!0,type:!0,name:!0,id:!0,placeholder:!0}),u.forEach(d),B=h(t),$&&$.l(t),t.forEach(d),C=h(l),x=o(l,"DIV",{class:!0});var p=n(x);V=o(p,"LABEL",{for:!0,class:!0});var f=n(V);A=c(f,"Password"),f.forEach(d),P=h(p),D=o(p,"DIV",{class:!0});var g=n(D);N=o(g,"INPUT",{class:!0,type:!0,name:!0,id:!0,placeholder:!0}),g.forEach(d),q=h(p),K&&K.l(p),S=h(p),Q&&Q.l(p),p.forEach(d),T=h(l),X&&X.l(l),H=h(l),O=o(l,"DIV",{class:!0});var m=n(O);U=o(m,"BUTTON",{class:!0});var v=n(U);W=c(v,"Login"),v.forEach(d),m.forEach(d),l.forEach(d),this.h()},h(){u(r,"for",""),u(r,"class","gray"),u(I,"class","input"),u(I,"type","text"),u(I,"name","identifier"),u(I,"id","identifier"),I.required=!0,u(I,"placeholder","example@gmail.com"),u(y,"class","control"),u(e,"class","field"),u(V,"for",""),u(V,"class","gray"),u(N,"class","input"),u(N,"type","password"),u(N,"name","password"),u(N,"id","password"),N.required=!0,u(N,"placeholder","******************"),u(D,"class","control"),u(x,"class","field py-4"),U.disabled=M=!s[3].valid,u(U,"class","button is-light px-5 py-2 has-text-weight-bold"),u(O,"class","container-fluid has-text-centered py-2"),u(a,"class","has-text-left pt-4"),p(a,"max-width","250px"),p(a,"margin","0 auto")},m(l,t){f(l,a,t),g(a,e),g(e,r),g(r,E),g(e,b),g(e,y),g(y,I),m(I,s[2].value),g(e,B),$&&$.m(e,null),g(a,C),g(a,x),g(x,V),g(V,A),g(x,P),g(x,D),g(D,N),m(N,s[1].value),g(x,q),K&&K.m(x,null),g(x,S),Q&&Q.m(x,null),g(a,T),X&&X.m(a,null),g(a,H),g(a,O),g(O,U),g(U,W),z||(J=[v(I,"input",s[8]),v(N,"input",s[9]),v(a,"submit",w(s[7]))],z=!0)},p(s,r){4&r&&I.value!==s[2].value&&m(I,s[2].value),8&r&&(k=s[3].hasError("identifier.required")),k?$||($=j(),$.c(),$.m(e,null)):$&&($.d(1),$=null),2&r&&N.value!==s[1].value&&m(N,s[1].value),8&r&&(F=s[3].hasError("password.required")),F?K||(K=L(),K.c(),K.m(x,S)):K&&(K.d(1),K=null),s[0]&&s[0]?.password?Q?Q.p(s,r):(Q=G(s),Q.c(),Q.m(x,null)):Q&&(Q.d(1),Q=null),s[0]?X?X.p(s,r):(X=_(s),X.c(),X.m(a,H)):X&&(X.d(1),X=null),8&r&&M!==(M=!s[3].valid)&&(U.disabled=M)},d(s){s&&d(a),$&&$.d(),K&&K.d(),Q&&Q.d(),X&&X.d(),z=!1,R(J)}}}(s);return{c(){a=i(),e=l("br"),r=l("br"),E=i(),b=l("main"),y=l("br"),x=l("br"),V=i(),A=l("div"),P=l("div"),D=l("div"),N=l("br"),q=l("br"),S=i(),T=l("h1"),H=t("SWAN"),O=i(),U=l("p"),W=t("Humanitarian Consortium"),M=i(),z=l("br"),J=l("br"),k=i(),F=l("div"),$=l("div"),K=l("img"),X=i(),Y=l("div"),Z=l("img"),as=i(),es=l("div"),rs=l("img"),ts=i(),is=l("div"),os=l("img"),cs=i(),ds=l("div"),hs=l("br"),us=l("br"),ps=i(),fs=l("img"),ms=i(),Bs&&Bs.c(),vs=i(),ws=l("br"),Es=l("br"),bs=l("br"),ys=l("br"),Rs=l("br"),Is=l("br"),this.h()},l(s){I('[data-svelte="svelte-10qpq3o"]',document.head).forEach(d),a=h(s),e=o(s,"BR",{}),r=o(s,"BR",{}),E=h(s),b=o(s,"MAIN",{class:!0});var l=n(b);y=o(l,"BR",{}),x=o(l,"BR",{}),V=h(l),A=o(l,"DIV",{class:!0});var t=n(A);P=o(t,"DIV",{class:!0});var i=n(P);D=o(i,"DIV",{class:!0});var u=n(D);N=o(u,"BR",{}),q=o(u,"BR",{}),S=h(u),T=o(u,"H1",{class:!0,style:!0});var p=n(T);H=c(p,"SWAN"),p.forEach(d),O=h(u),U=o(u,"P",{class:!0});var f=n(U);W=c(f,"Humanitarian Consortium"),f.forEach(d),M=h(u),z=o(u,"BR",{}),J=o(u,"BR",{}),k=h(u),F=o(u,"DIV",{class:!0});var g=n(F);$=o(g,"DIV",{class:!0});var m=n($);K=o(m,"IMG",{src:!0,alt:!0}),m.forEach(d),X=h(g),Y=o(g,"DIV",{class:!0});var v=n(Y);Z=o(v,"IMG",{src:!0,alt:!0}),v.forEach(d),as=h(g),es=o(g,"DIV",{class:!0});var w=n(es);rs=o(w,"IMG",{src:!0,alt:!0}),w.forEach(d),ts=h(g),is=o(g,"DIV",{class:!0});var R=n(is);os=o(R,"IMG",{src:!0,alt:!0}),R.forEach(d),g.forEach(d),u.forEach(d),cs=h(i),ds=o(i,"DIV",{class:!0});var B=n(ds);hs=o(B,"BR",{}),us=o(B,"BR",{}),ps=h(B),fs=o(B,"IMG",{src:!0,alt:!0,width:!0}),ms=h(B),Bs&&Bs.l(B),B.forEach(d),i.forEach(d),t.forEach(d),l.forEach(d),vs=h(s),ws=o(s,"BR",{}),Es=o(s,"BR",{}),bs=o(s,"BR",{}),ys=o(s,"BR",{}),Rs=o(s,"BR",{}),Is=o(s,"BR",{}),this.h()},h(){document.title="Login",u(T,"class","is-size-1"),p(T,"line-height","1"),u(U,"class","is-size-7 gray"),B(K.src,Q="./images/login/Save the ChildrenSTC_Logo_Horiz_ColPos_RGB-01.jpg")||u(K,"src","./images/login/Save the ChildrenSTC_Logo_Horiz_ColPos_RGB-01.jpg"),u(K,"alt",""),u($,"class","column p-5 is-half"),B(Z.src,ss="./images/login/World VisionWorld Vision.png")||u(Z,"src","./images/login/World VisionWorld Vision.png"),u(Z,"alt",""),u(Y,"class","column p-5 is-half"),B(rs.src,ls="./images/login/Norwegian Refugee CouncilNRC.png")||u(rs,"src","./images/login/Norwegian Refugee CouncilNRC.png"),u(rs,"alt",""),u(es,"class","column p-5 is-half"),B(os.src,ns="./images/login/Action Against HungerAAH.png")||u(os,"src","./images/login/Action Against HungerAAH.png"),u(os,"alt",""),u(is,"class","column p-5 is-half"),u(F,"class","columns px-6 is-align-items-center is-multiline"),u(D,"class","column has-text-centered has-border-right-gray is-hidden-mobile"),B(fs.src,gs="./images/logo/swan_logo.svg")||u(fs,"src","./images/logo/swan_logo.svg"),u(fs,"alt","SWAN Logo"),u(fs,"width","250"),u(ds,"class","column is-6 has-text-centered p-6 signin-form"),u(P,"class","columns is-justify-content-center"),u(A,"class","card login-card is-rounded svelte-152vqfe"),u(b,"class","container px-5 ")},m(s,l){f(s,a,l),f(s,e,l),f(s,r,l),f(s,E,l),f(s,b,l),g(b,y),g(b,x),g(b,V),g(b,A),g(A,P),g(P,D),g(D,N),g(D,q),g(D,S),g(D,T),g(T,H),g(D,O),g(D,U),g(U,W),g(D,M),g(D,z),g(D,J),g(D,k),g(D,F),g(F,$),g($,K),g(F,X),g(F,Y),g(Y,Z),g(F,as),g(F,es),g(es,rs),g(F,ts),g(F,is),g(is,os),g(P,cs),g(P,ds),g(ds,hs),g(ds,us),g(ds,ps),g(ds,fs),g(ds,ms),Bs&&Bs.m(ds,null),f(s,vs,l),f(s,ws,l),f(s,Es,l),f(s,bs,l),f(s,ys,l),f(s,Rs,l),f(s,Is,l)},p(s,[a]){s[6]&&Bs.p(s,a)},i:C,o:C,d(s){s&&d(a),s&&d(e),s&&d(r),s&&d(E),s&&d(b),Bs&&Bs.d(),s&&d(vs),s&&d(ws),s&&d(Es),s&&d(bs),s&&d(ys),s&&d(Rs),s&&d(Is)}}}function U(s,a,e){let r,l,t,i;const o=P("identifier","",[D()]);x(s,o,(s=>e(2,l=s)));const n=P("password","",[D()]);x(s,n,(s=>e(1,r=s)));const c=N(o,n);return x(s,c,(s=>e(3,t=s))),[i,r,l,t,o,n,c,async function(){try{let s=await S({path:"auth/local",header:{ContentType:"application/json"},data:{identifier:l.value,password:r.value}});s&&400==s.error?.status?e(0,i=s.error?.message):s.jwt&&(await q.setSession(s.jwt),await V.fetch(),A("dashboard"))}catch(s){console.error("LOGIN ERROR",s),e(0,i="An error has occured while trying to connect to the server. Please try again.")}},function(){l.value=this.value,o.set(l)},function(){r.value=this.value,n.set(r)}]}class W extends a{constructor(s){super(),e(this,s,U,O,r,{})}}export{W as default};
