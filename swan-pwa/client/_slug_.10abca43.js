import{S as a,i as s,s as t,I as r,T as e,aj as c,e as i,z as o,t as l,c as h,a as d,C as n,b as u,d as v,f,D as b,h as m,j as E,k as p,P as T,p as D,B as y,q as _,r as g,F as I,w as V,x as R,y as x,K as w}from"./client.8b941b19.js";import{l as N}from"./index.79acf2d4.js";import{n as P}from"./index.8bbc6ba3.js";function S(a,s,t){const r=a.slice();return r[4]=s[t],r[6]=t,r}function k(a){let s,t,r,e,c,D,y,_,g,I,V,R,x,w,N,P,k,q,H,A,$,C,W,O,K,j,F,G,L,U,z,M,Q,J,X,Y,Z,aa,sa,ta,ra,ea,ca,ia,oa,la,ha,da,na,ua,va,fa,ba,ma,Ea,pa,Ta,Da,ya,_a,ga,Ia,Va,Ra,xa,wa,Na,Pa,Sa,ka,Ba,qa,Ha,Aa,$a,Ca,Wa,Oa,Ka,ja,Fa,Ga,La,Ua,za,Ma,Qa,Ja,Xa,Ya,Za,as,ss,ts,rs,es,cs,is,os,ls,hs,ds,ns,us,vs,fs,bs,ms,Es,ps,Ts,Ds,ys,_s,gs,Is,Vs,Rs,xs,ws,Ns,Ps,Ss,ks,Bs,qs,Hs,As,$s,Cs,Ws,Os,Ks,js,Fs,Gs,Ls,Us,zs,Ms,Qs,Js,Xs,Ys,Zs,at,st,tt,rt,et,ct,it,ot,lt,ht,dt,nt,ut,vt,ft,bt,mt,Et,pt,Tt,Dt,yt,_t,gt,It,Vt,Rt,xt,wt,Nt,Pt,St,kt,Bt,qt,Ht,At,$t,Ct,Wt,Ot,Kt,jt,Ft,Gt,Lt,Ut,zt,Mt,Qt,Jt,Xt,Yt,Zt,ar,sr,tr,rr,er,cr,ir,or,lr,hr,dr,nr,ur,vr,fr,br,mr,Er,pr,Tr,Dr,yr,_r,gr,Ir,Vr,Rr,xr,wr,Nr,Pr,Sr,kr,Br,qr,Hr,Ar,$r,Cr,Wr,Or,Kr,jr,Fr,Gr,Lr,Ur,zr,Mr,Qr,Jr,Xr,Yr,Zr,ae,se,te,re,ee,ce,ie,oe,le,he,de,ne,ue,ve=a[1].attributes.consortium_member.data?.attributes.name+"",fe=a[1].attributes.consortium_member.data?.attributes.address_1+"",be=a[1].attributes.consortium_member.data?.attributes.address_2+"",me=a[1].id+"",Ee=a[1].attributes.consigneeName+"",pe=a[1].attributes.consigneeAddress+"",Te=a[1].attributes.consigneePhone+"",De=a[1].attributes.driverTransportType+"",ye=a[1].attributes.transporterType+"",_e=a[1].attributes.date+"",ge=a[1].attributes.transporterName+"",Ie=a[1].attributes.transporterPhone+"",Ve=a[1].attributes.driverName+"",Re=a[1].attributes.driverPlateNo+"",xe=a[1].attributes.waybill_items.data,we=[];for(let s=0;s<xe.length;s+=1)we[s]=B(S(a,xe,s));return{c(){s=i("div"),t=i("br"),r=o(),e=i("h2"),c=l("SWAN Warehouse"),D=o(),y=i("h3"),_=l(ve),g=o(),I=i("p"),V=l(fe),R=l(" -\r\n                "),x=l(be),w=o(),N=i("hr"),P=o(),k=i("h3"),q=l("Waybill No. -\r\n                "),H=i("span"),A=l(me),$=o(),C=i("div"),W=i("div"),O=i("div"),K=i("div"),j=i("p"),F=l("From"),G=o(),L=i("div"),U=i("div"),z=i("div"),M=l("From"),Q=o(),J=i("div"),X=o(),Y=i("div"),Z=i("div"),aa=l("Date Raised"),sa=o(),ta=i("div"),ra=o(),ea=i("div"),ca=i("div"),ia=l("Sender's Email"),oa=o(),la=i("div"),ha=o(),da=i("div"),na=i("div"),ua=l("Sender's Tel No."),va=o(),fa=i("div"),ba=o(),ma=i("div"),Ea=i("div"),pa=i("div"),Ta=i("p"),Da=l("To"),ya=o(),_a=i("div"),ga=i("div"),Ia=i("div"),Va=l("Cosignee"),Ra=o(),xa=i("div"),wa=l(Ee),Na=o(),Pa=i("div"),Sa=i("div"),ka=l("Address"),Ba=o(),qa=i("div"),Ha=l(pe),Aa=o(),$a=i("div"),Ca=i("div"),Wa=l("Phone"),Oa=o(),Ka=i("div"),ja=l(Te),Fa=o(),Ga=i("div"),La=i("div"),Ua=l("Email"),za=o(),Ma=i("div"),Qa=o(),Ja=i("div"),Xa=i("div"),Ya=i("p"),Za=l("Transport Details"),as=o(),ss=i("div"),ts=i("div"),rs=l("Transport Type: \r\n                        "),es=i("span"),cs=l(De),is=o(),os=i("div"),ls=l("Means of Transport: \r\n                        "),hs=i("span"),ds=l(ye),ns=o(),us=i("div"),vs=l("Dates of Dispatch: \r\n                        "),fs=i("span"),bs=l(_e),ms=o(),Es=i("div"),ps=l("ETD: \r\n                        "),Ts=i("span"),Ds=o(),ys=i("div"),_s=l("ETA: \r\n                        "),gs=i("span"),Is=o(),Vs=i("table"),Rs=i("tr"),xs=i("th"),ws=l("Transporter Name"),Ns=o(),Ps=i("th"),Ss=l(ge),ks=o(),Bs=i("tr"),qs=i("td"),Hs=l("Transporter's Tel No."),As=o(),$s=i("td"),Cs=l(Ie),Ws=o(),Os=i("tr"),Ks=i("td"),js=l("Driver's Name"),Fs=o(),Gs=i("td"),Ls=l(Ve),Us=o(),zs=i("tr"),Ms=i("td"),Qs=l("Vehicle Registration No."),Js=o(),Xs=i("td"),Ys=l(Re),Zs=o(),at=i("p"),st=l("Items"),tt=o(),rt=i("table"),et=i("tr"),ct=i("th"),it=l("No."),ot=o(),lt=i("th"),ht=l("Item Description"),dt=o(),nt=i("th"),ut=l("Carton No."),vt=o(),ft=i("th"),bt=l("Unit"),mt=o(),Et=i("th"),pt=l("Pack Type"),Tt=o(),Dt=i("th"),yt=l("Quantity"),_t=o(),gt=i("th"),It=l("Unit Value"),Vt=o(),Rt=i("th"),xt=l("Total Value"),wt=o(),Nt=i("th"),Pt=l("Total Weight"),St=o(),kt=i("th"),Bt=l("Total Volume"),qt=o(),Ht=i("th"),At=l("Quantity Received"),$t=o(),Ct=i("th"),Wt=l("Remark"),Ot=o();for(let a=0;a<we.length;a+=1)we[a].c();Kt=o(),jt=i("table"),Ft=i("tr"),Gt=i("th"),Lt=l("Total Weight(KGS) and Volume(CBM)"),Ut=o(),zt=i("tr"),Mt=i("th"),Qt=o(),Jt=i("th"),Xt=l("Name"),Yt=o(),Zt=i("th"),ar=l("Position"),sr=o(),tr=i("th"),rr=l("Signature"),er=o(),cr=i("th"),ir=l("Date"),or=o(),lr=i("th"),hr=l("Condition"),dr=o(),nr=i("tr"),ur=i("td"),vr=l("Loaded by (SENDER):"),fr=o(),br=i("td"),mr=o(),Er=i("td"),pr=l("Store Keeper"),Tr=o(),Dr=i("td"),yr=o(),_r=i("td"),gr=o(),Ir=i("td"),Vr=o(),Rr=i("tr"),xr=i("td"),wr=l("Transported By by (TRANSPORTER):"),Nr=o(),Pr=i("td"),Sr=o(),kr=i("td"),Br=l("Driver"),qr=o(),Hr=i("td"),Ar=o(),$r=i("td"),Cr=o(),Wr=i("td"),Or=o(),Kr=i("tr"),jr=i("td"),Fr=l("Received by (COSIGNEE):"),Gr=o(),Lr=i("td"),Ur=o(),zr=i("td"),Mr=l("Store Keeper"),Qr=o(),Jr=i("td"),Xr=o(),Yr=i("td"),Zr=o(),ae=i("td"),se=o(),te=i("tr"),re=i("td"),ee=l("Consignee Comments: (Include all the details on any missing/ damaged items recived - Please be specific & State exact quantities)"),ce=o(),ie=i("br"),oe=o(),le=i("p"),he=l("COPIES : 1 copy retained by Sender, 3 copies (including original) given to Transporter- 1 signed copy retained by Transporter, 1 signed copy retained by Consignee, the original signed copy returned to Sender by the Consignee ."),de=o(),ne=i("br"),ue=i("br"),this.h()},l(a){s=h(a,"DIV",{class:!0});var i=d(s);t=h(i,"BR",{}),r=n(i),e=h(i,"H2",{class:!0});var o=d(e);c=u(o,"SWAN Warehouse"),o.forEach(v),D=n(i),y=h(i,"H3",{class:!0});var l=d(y);_=u(l,ve),l.forEach(v),g=n(i),I=h(i,"P",{class:!0});var f=d(I);V=u(f,fe),R=u(f," -\r\n                "),x=u(f,be),f.forEach(v),w=n(i),N=h(i,"HR",{}),P=n(i),k=h(i,"H3",{class:!0});var b=d(k);q=u(b,"Waybill No. -\r\n                "),H=h(b,"SPAN",{class:!0});var m=d(H);A=u(m,me),m.forEach(v),b.forEach(v),$=n(i),C=h(i,"DIV",{class:!0});var E=d(C);W=h(E,"DIV",{class:!0});var p=d(W);O=h(p,"DIV",{class:!0,style:!0});var T=d(O);K=h(T,"DIV",{class:!0});var S=d(K);j=h(S,"P",{class:!0});var B=d(j);F=u(B,"From"),B.forEach(v),S.forEach(v),G=n(T),L=h(T,"DIV",{class:!0});var xe=d(L);U=h(xe,"DIV",{class:!0});var Ne=d(U);z=h(Ne,"DIV",{class:!0});var Pe=d(z);M=u(Pe,"From"),Pe.forEach(v),Q=n(Ne),J=h(Ne,"DIV",{class:!0}),d(J).forEach(v),Ne.forEach(v),X=n(xe),Y=h(xe,"DIV",{class:!0});var Se=d(Y);Z=h(Se,"DIV",{class:!0});var ke=d(Z);aa=u(ke,"Date Raised"),ke.forEach(v),sa=n(Se),ta=h(Se,"DIV",{class:!0}),d(ta).forEach(v),Se.forEach(v),ra=n(xe),ea=h(xe,"DIV",{class:!0});var Be=d(ea);ca=h(Be,"DIV",{class:!0});var qe=d(ca);ia=u(qe,"Sender's Email"),qe.forEach(v),oa=n(Be),la=h(Be,"DIV",{class:!0}),d(la).forEach(v),Be.forEach(v),ha=n(xe),da=h(xe,"DIV",{class:!0});var He=d(da);na=h(He,"DIV",{class:!0});var Ae=d(na);ua=u(Ae,"Sender's Tel No."),Ae.forEach(v),va=n(He),fa=h(He,"DIV",{class:!0}),d(fa).forEach(v),He.forEach(v),xe.forEach(v),T.forEach(v),p.forEach(v),ba=n(E),ma=h(E,"DIV",{class:!0});var $e=d(ma);Ea=h($e,"DIV",{class:!0,style:!0});var Ce=d(Ea);pa=h(Ce,"DIV",{class:!0});var We=d(pa);Ta=h(We,"P",{class:!0});var Oe=d(Ta);Da=u(Oe,"To"),Oe.forEach(v),We.forEach(v),ya=n(Ce),_a=h(Ce,"DIV",{class:!0});var Ke=d(_a);ga=h(Ke,"DIV",{class:!0});var je=d(ga);Ia=h(je,"DIV",{class:!0});var Fe=d(Ia);Va=u(Fe,"Cosignee"),Fe.forEach(v),Ra=n(je),xa=h(je,"DIV",{class:!0});var Ge=d(xa);wa=u(Ge,Ee),Ge.forEach(v),je.forEach(v),Na=n(Ke),Pa=h(Ke,"DIV",{class:!0});var Le=d(Pa);Sa=h(Le,"DIV",{class:!0});var Ue=d(Sa);ka=u(Ue,"Address"),Ue.forEach(v),Ba=n(Le),qa=h(Le,"DIV",{class:!0});var ze=d(qa);Ha=u(ze,pe),ze.forEach(v),Le.forEach(v),Aa=n(Ke),$a=h(Ke,"DIV",{class:!0});var Me=d($a);Ca=h(Me,"DIV",{class:!0});var Qe=d(Ca);Wa=u(Qe,"Phone"),Qe.forEach(v),Oa=n(Me),Ka=h(Me,"DIV",{class:!0});var Je=d(Ka);ja=u(Je,Te),Je.forEach(v),Me.forEach(v),Fa=n(Ke),Ga=h(Ke,"DIV",{class:!0});var Xe=d(Ga);La=h(Xe,"DIV",{class:!0});var Ye=d(La);Ua=u(Ye,"Email"),Ye.forEach(v),za=n(Xe),Ma=h(Xe,"DIV",{class:!0}),d(Ma).forEach(v),Xe.forEach(v),Ke.forEach(v),Ce.forEach(v),$e.forEach(v),E.forEach(v),Qa=n(i),Ja=h(i,"DIV",{class:!0});var Ze=d(Ja);Xa=h(Ze,"DIV",{class:!0});var ac=d(Xa);Ya=h(ac,"P",{class:!0});var sc=d(Ya);Za=u(sc,"Transport Details"),sc.forEach(v),ac.forEach(v),as=n(Ze),ss=h(Ze,"DIV",{class:!0});var tc=d(ss);ts=h(tc,"DIV",{class:!0});var rc=d(ts);rs=u(rc,"Transport Type: \r\n                        "),es=h(rc,"SPAN",{class:!0});var ec=d(es);cs=u(ec,De),ec.forEach(v),rc.forEach(v),is=n(tc),os=h(tc,"DIV",{class:!0});var cc=d(os);ls=u(cc,"Means of Transport: \r\n                        "),hs=h(cc,"SPAN",{class:!0});var ic=d(hs);ds=u(ic,ye),ic.forEach(v),cc.forEach(v),ns=n(tc),us=h(tc,"DIV",{class:!0});var oc=d(us);vs=u(oc,"Dates of Dispatch: \r\n                        "),fs=h(oc,"SPAN",{class:!0});var lc=d(fs);bs=u(lc,_e),lc.forEach(v),oc.forEach(v),ms=n(tc),Es=h(tc,"DIV",{class:!0});var hc=d(Es);ps=u(hc,"ETD: \r\n                        "),Ts=h(hc,"SPAN",{class:!0}),d(Ts).forEach(v),hc.forEach(v),Ds=n(tc),ys=h(tc,"DIV",{class:!0});var dc=d(ys);_s=u(dc,"ETA: \r\n                        "),gs=h(dc,"SPAN",{class:!0}),d(gs).forEach(v),dc.forEach(v),tc.forEach(v),Ze.forEach(v),Is=n(i),Vs=h(i,"TABLE",{class:!0});var nc=d(Vs);Rs=h(nc,"TR",{});var uc=d(Rs);xs=h(uc,"TH",{});var vc=d(xs);ws=u(vc,"Transporter Name"),vc.forEach(v),Ns=n(uc),Ps=h(uc,"TH",{});var fc=d(Ps);Ss=u(fc,ge),fc.forEach(v),uc.forEach(v),ks=n(nc),Bs=h(nc,"TR",{});var bc=d(Bs);qs=h(bc,"TD",{});var mc=d(qs);Hs=u(mc,"Transporter's Tel No."),mc.forEach(v),As=n(bc),$s=h(bc,"TD",{});var Ec=d($s);Cs=u(Ec,Ie),Ec.forEach(v),bc.forEach(v),Ws=n(nc),Os=h(nc,"TR",{});var pc=d(Os);Ks=h(pc,"TD",{});var Tc=d(Ks);js=u(Tc,"Driver's Name"),Tc.forEach(v),Fs=n(pc),Gs=h(pc,"TD",{});var Dc=d(Gs);Ls=u(Dc,Ve),Dc.forEach(v),pc.forEach(v),Us=n(nc),zs=h(nc,"TR",{});var yc=d(zs);Ms=h(yc,"TD",{});var _c=d(Ms);Qs=u(_c,"Vehicle Registration No."),_c.forEach(v),Js=n(yc),Xs=h(yc,"TD",{});var gc=d(Xs);Ys=u(gc,Re),gc.forEach(v),yc.forEach(v),nc.forEach(v),Zs=n(i),at=h(i,"P",{class:!0});var Ic=d(at);st=u(Ic,"Items"),Ic.forEach(v),tt=n(i),rt=h(i,"TABLE",{class:!0});var Vc=d(rt);et=h(Vc,"TR",{class:!0});var Rc=d(et);ct=h(Rc,"TH",{class:!0});var xc=d(ct);it=u(xc,"No."),xc.forEach(v),ot=n(Rc),lt=h(Rc,"TH",{class:!0});var wc=d(lt);ht=u(wc,"Item Description"),wc.forEach(v),dt=n(Rc),nt=h(Rc,"TH",{class:!0});var Nc=d(nt);ut=u(Nc,"Carton No."),Nc.forEach(v),vt=n(Rc),ft=h(Rc,"TH",{class:!0});var Pc=d(ft);bt=u(Pc,"Unit"),Pc.forEach(v),mt=n(Rc),Et=h(Rc,"TH",{class:!0});var Sc=d(Et);pt=u(Sc,"Pack Type"),Sc.forEach(v),Tt=n(Rc),Dt=h(Rc,"TH",{class:!0});var kc=d(Dt);yt=u(kc,"Quantity"),kc.forEach(v),_t=n(Rc),gt=h(Rc,"TH",{class:!0});var Bc=d(gt);It=u(Bc,"Unit Value"),Bc.forEach(v),Vt=n(Rc),Rt=h(Rc,"TH",{class:!0});var qc=d(Rt);xt=u(qc,"Total Value"),qc.forEach(v),wt=n(Rc),Nt=h(Rc,"TH",{class:!0});var Hc=d(Nt);Pt=u(Hc,"Total Weight"),Hc.forEach(v),St=n(Rc),kt=h(Rc,"TH",{class:!0});var Ac=d(kt);Bt=u(Ac,"Total Volume"),Ac.forEach(v),qt=n(Rc),Ht=h(Rc,"TH",{class:!0});var $c=d(Ht);At=u($c,"Quantity Received"),$c.forEach(v),$t=n(Rc),Ct=h(Rc,"TH",{class:!0});var Cc=d(Ct);Wt=u(Cc,"Remark"),Cc.forEach(v),Rc.forEach(v),Ot=n(Vc);for(let a=0;a<we.length;a+=1)we[a].l(Vc);Vc.forEach(v),Kt=n(i),jt=h(i,"TABLE",{class:!0});var Wc=d(jt);Ft=h(Wc,"TR",{});var Oc=d(Ft);Gt=h(Oc,"TH",{colspan:!0,class:!0});var Kc=d(Gt);Lt=u(Kc,"Total Weight(KGS) and Volume(CBM)"),Kc.forEach(v),Oc.forEach(v),Ut=n(Wc),zt=h(Wc,"TR",{});var jc=d(zt);Mt=h(jc,"TH",{class:!0}),d(Mt).forEach(v),Qt=n(jc),Jt=h(jc,"TH",{});var Fc=d(Jt);Xt=u(Fc,"Name"),Fc.forEach(v),Yt=n(jc),Zt=h(jc,"TH",{});var Gc=d(Zt);ar=u(Gc,"Position"),Gc.forEach(v),sr=n(jc),tr=h(jc,"TH",{});var Lc=d(tr);rr=u(Lc,"Signature"),Lc.forEach(v),er=n(jc),cr=h(jc,"TH",{});var Uc=d(cr);ir=u(Uc,"Date"),Uc.forEach(v),or=n(jc),lr=h(jc,"TH",{});var zc=d(lr);hr=u(zc,"Condition"),zc.forEach(v),jc.forEach(v),dr=n(Wc),nr=h(Wc,"TR",{});var Mc=d(nr);ur=h(Mc,"TD",{});var Qc=d(ur);vr=u(Qc,"Loaded by (SENDER):"),Qc.forEach(v),fr=n(Mc),br=h(Mc,"TD",{}),d(br).forEach(v),mr=n(Mc),Er=h(Mc,"TD",{});var Jc=d(Er);pr=u(Jc,"Store Keeper"),Jc.forEach(v),Tr=n(Mc),Dr=h(Mc,"TD",{}),d(Dr).forEach(v),yr=n(Mc),_r=h(Mc,"TD",{}),d(_r).forEach(v),gr=n(Mc),Ir=h(Mc,"TD",{}),d(Ir).forEach(v),Mc.forEach(v),Vr=n(Wc),Rr=h(Wc,"TR",{});var Xc=d(Rr);xr=h(Xc,"TD",{});var Yc=d(xr);wr=u(Yc,"Transported By by (TRANSPORTER):"),Yc.forEach(v),Nr=n(Xc),Pr=h(Xc,"TD",{}),d(Pr).forEach(v),Sr=n(Xc),kr=h(Xc,"TD",{});var Zc=d(kr);Br=u(Zc,"Driver"),Zc.forEach(v),qr=n(Xc),Hr=h(Xc,"TD",{}),d(Hr).forEach(v),Ar=n(Xc),$r=h(Xc,"TD",{}),d($r).forEach(v),Cr=n(Xc),Wr=h(Xc,"TD",{}),d(Wr).forEach(v),Xc.forEach(v),Or=n(Wc),Kr=h(Wc,"TR",{});var ai=d(Kr);jr=h(ai,"TD",{});var si=d(jr);Fr=u(si,"Received by (COSIGNEE):"),si.forEach(v),Gr=n(ai),Lr=h(ai,"TD",{}),d(Lr).forEach(v),Ur=n(ai),zr=h(ai,"TD",{});var ti=d(zr);Mr=u(ti,"Store Keeper"),ti.forEach(v),Qr=n(ai),Jr=h(ai,"TD",{}),d(Jr).forEach(v),Xr=n(ai),Yr=h(ai,"TD",{}),d(Yr).forEach(v),Zr=n(ai),ae=h(ai,"TD",{}),d(ae).forEach(v),ai.forEach(v),se=n(Wc),te=h(Wc,"TR",{});var ri=d(te);re=h(ri,"TD",{colspan:!0});var ei=d(re);ee=u(ei,"Consignee Comments: (Include all the details on any missing/ damaged items recived - Please be specific & State exact quantities)"),ei.forEach(v),ri.forEach(v),Wc.forEach(v),ce=n(i),ie=h(i,"BR",{}),oe=n(i),le=h(i,"P",{class:!0});var ci=d(le);he=u(ci,"COPIES : 1 copy retained by Sender, 3 copies (including original) given to Transporter- 1 signed copy retained by Transporter, 1 signed copy retained by Consignee, the original signed copy returned to Sender by the Consignee ."),ci.forEach(v),de=n(i),ne=h(i,"BR",{}),ue=h(i,"BR",{}),i.forEach(v),this.h()},h(){f(e,"class","has-text-centered has-text-weight-bold"),f(y,"class","has-text-centered has-text-weight-bold"),f(I,"class","has-text-centered"),f(H,"class","has-text-weight-bold"),f(k,"class","is-size-5"),f(j,"class","card-header-title"),f(K,"class","card-header"),f(z,"class","column py-1 gray"),f(J,"class","column py-1 "),f(U,"class","columns"),f(Z,"class","column py-1 gray"),f(ta,"class","column py-1 "),f(Y,"class","columns"),f(ca,"class","column py-1 gray"),f(la,"class","column py-1 "),f(ea,"class","columns"),f(na,"class","column py-1 gray"),f(fa,"class","column py-1 "),f(da,"class","columns"),f(L,"class","card-body p-4"),f(O,"class","card svelte-1qsos4c"),b(O,"width","350px"),f(W,"class","column"),f(Ta,"class","card-header-title"),f(pa,"class","card-header"),f(Ia,"class","column py-1 gray"),f(xa,"class","column py-1 "),f(ga,"class","columns"),f(Sa,"class","column py-1 gray"),f(qa,"class","column py-1 "),f(Pa,"class","columns"),f(Ca,"class","column py-1 gray"),f(Ka,"class","column py-1 "),f($a,"class","columns"),f(La,"class","column py-1 gray"),f(Ma,"class","column py-1 "),f(Ga,"class","columns"),f(_a,"class","card-body p-4"),f(Ea,"class","card has-text-left svelte-1qsos4c"),b(Ea,"width","350px"),b(Ea,"float","right"),f(ma,"class","column has-text-right"),f(C,"class","columns"),f(Ya,"class","card-header-title"),f(Xa,"class","card-header"),f(es,"class","has-text-weight-bold"),f(ts,"class","card p-4 svelte-1qsos4c"),f(hs,"class","has-text-weight-bold"),f(os,"class","card p-4 svelte-1qsos4c"),f(fs,"class","has-text-weight-bold"),f(us,"class","card p-4 svelte-1qsos4c"),f(Ts,"class","has-text-weight-bold px-6"),f(Es,"class","card p-4 svelte-1qsos4c"),f(gs,"class","has-text-weight-bold px-6"),f(ys,"class","card p-4 svelte-1qsos4c"),f(ss,"class","card-body is-flex"),f(Ja,"class","card svelte-1qsos4c"),f(Vs,"class","table is-bordered is-fullwidth is-responsive"),f(at,"class","card-header-title"),f(ct,"class","has-text-white"),f(lt,"class","has-text-white"),f(nt,"class","has-text-white"),f(ft,"class","has-text-white"),f(Et,"class","has-text-white"),f(Dt,"class","has-text-white"),f(gt,"class","has-text-white"),f(Rt,"class","has-text-white"),f(Nt,"class","has-text-white"),f(kt,"class","has-text-white"),f(Ht,"class","has-text-white"),f(Ct,"class","has-text-white"),f(et,"class","has-background-black has-text-white"),f(rt,"class","table is-bordered is-fullwidth is-narrow"),f(Gt,"colspan","6"),f(Gt,"class","has-text-centered"),f(Mt,"class","is-narrow"),f(re,"colspan","6"),f(jt,"class","table is-bordered is-full-width"),f(le,"class","has-text-centered is-size-8 svelte-1qsos4c"),f(s,"class","card p-6 svelte-1qsos4c")},m(a,i){m(a,s,i),E(s,t),E(s,r),E(s,e),E(e,c),E(s,D),E(s,y),E(y,_),E(s,g),E(s,I),E(I,V),E(I,R),E(I,x),E(s,w),E(s,N),E(s,P),E(s,k),E(k,q),E(k,H),E(H,A),E(s,$),E(s,C),E(C,W),E(W,O),E(O,K),E(K,j),E(j,F),E(O,G),E(O,L),E(L,U),E(U,z),E(z,M),E(U,Q),E(U,J),E(L,X),E(L,Y),E(Y,Z),E(Z,aa),E(Y,sa),E(Y,ta),E(L,ra),E(L,ea),E(ea,ca),E(ca,ia),E(ea,oa),E(ea,la),E(L,ha),E(L,da),E(da,na),E(na,ua),E(da,va),E(da,fa),E(C,ba),E(C,ma),E(ma,Ea),E(Ea,pa),E(pa,Ta),E(Ta,Da),E(Ea,ya),E(Ea,_a),E(_a,ga),E(ga,Ia),E(Ia,Va),E(ga,Ra),E(ga,xa),E(xa,wa),E(_a,Na),E(_a,Pa),E(Pa,Sa),E(Sa,ka),E(Pa,Ba),E(Pa,qa),E(qa,Ha),E(_a,Aa),E(_a,$a),E($a,Ca),E(Ca,Wa),E($a,Oa),E($a,Ka),E(Ka,ja),E(_a,Fa),E(_a,Ga),E(Ga,La),E(La,Ua),E(Ga,za),E(Ga,Ma),E(s,Qa),E(s,Ja),E(Ja,Xa),E(Xa,Ya),E(Ya,Za),E(Ja,as),E(Ja,ss),E(ss,ts),E(ts,rs),E(ts,es),E(es,cs),E(ss,is),E(ss,os),E(os,ls),E(os,hs),E(hs,ds),E(ss,ns),E(ss,us),E(us,vs),E(us,fs),E(fs,bs),E(ss,ms),E(ss,Es),E(Es,ps),E(Es,Ts),E(ss,Ds),E(ss,ys),E(ys,_s),E(ys,gs),E(s,Is),E(s,Vs),E(Vs,Rs),E(Rs,xs),E(xs,ws),E(Rs,Ns),E(Rs,Ps),E(Ps,Ss),E(Vs,ks),E(Vs,Bs),E(Bs,qs),E(qs,Hs),E(Bs,As),E(Bs,$s),E($s,Cs),E(Vs,Ws),E(Vs,Os),E(Os,Ks),E(Ks,js),E(Os,Fs),E(Os,Gs),E(Gs,Ls),E(Vs,Us),E(Vs,zs),E(zs,Ms),E(Ms,Qs),E(zs,Js),E(zs,Xs),E(Xs,Ys),E(s,Zs),E(s,at),E(at,st),E(s,tt),E(s,rt),E(rt,et),E(et,ct),E(ct,it),E(et,ot),E(et,lt),E(lt,ht),E(et,dt),E(et,nt),E(nt,ut),E(et,vt),E(et,ft),E(ft,bt),E(et,mt),E(et,Et),E(Et,pt),E(et,Tt),E(et,Dt),E(Dt,yt),E(et,_t),E(et,gt),E(gt,It),E(et,Vt),E(et,Rt),E(Rt,xt),E(et,wt),E(et,Nt),E(Nt,Pt),E(et,St),E(et,kt),E(kt,Bt),E(et,qt),E(et,Ht),E(Ht,At),E(et,$t),E(et,Ct),E(Ct,Wt),E(rt,Ot);for(let a=0;a<we.length;a+=1)we[a].m(rt,null);E(s,Kt),E(s,jt),E(jt,Ft),E(Ft,Gt),E(Gt,Lt),E(jt,Ut),E(jt,zt),E(zt,Mt),E(zt,Qt),E(zt,Jt),E(Jt,Xt),E(zt,Yt),E(zt,Zt),E(Zt,ar),E(zt,sr),E(zt,tr),E(tr,rr),E(zt,er),E(zt,cr),E(cr,ir),E(zt,or),E(zt,lr),E(lr,hr),E(jt,dr),E(jt,nr),E(nr,ur),E(ur,vr),E(nr,fr),E(nr,br),E(nr,mr),E(nr,Er),E(Er,pr),E(nr,Tr),E(nr,Dr),E(nr,yr),E(nr,_r),E(nr,gr),E(nr,Ir),E(jt,Vr),E(jt,Rr),E(Rr,xr),E(xr,wr),E(Rr,Nr),E(Rr,Pr),E(Rr,Sr),E(Rr,kr),E(kr,Br),E(Rr,qr),E(Rr,Hr),E(Rr,Ar),E(Rr,$r),E(Rr,Cr),E(Rr,Wr),E(jt,Or),E(jt,Kr),E(Kr,jr),E(jr,Fr),E(Kr,Gr),E(Kr,Lr),E(Kr,Ur),E(Kr,zr),E(zr,Mr),E(Kr,Qr),E(Kr,Jr),E(Kr,Xr),E(Kr,Yr),E(Kr,Zr),E(Kr,ae),E(jt,se),E(jt,te),E(te,re),E(re,ee),E(s,ce),E(s,ie),E(s,oe),E(s,le),E(le,he),E(s,de),E(s,ne),E(s,ue)},p(a,s){if(2&s&&ve!==(ve=a[1].attributes.consortium_member.data?.attributes.name+"")&&p(_,ve),2&s&&fe!==(fe=a[1].attributes.consortium_member.data?.attributes.address_1+"")&&p(V,fe),2&s&&be!==(be=a[1].attributes.consortium_member.data?.attributes.address_2+"")&&p(x,be),2&s&&me!==(me=a[1].id+"")&&p(A,me),2&s&&Ee!==(Ee=a[1].attributes.consigneeName+"")&&p(wa,Ee),2&s&&pe!==(pe=a[1].attributes.consigneeAddress+"")&&p(Ha,pe),2&s&&Te!==(Te=a[1].attributes.consigneePhone+"")&&p(ja,Te),2&s&&De!==(De=a[1].attributes.driverTransportType+"")&&p(cs,De),2&s&&ye!==(ye=a[1].attributes.transporterType+"")&&p(ds,ye),2&s&&_e!==(_e=a[1].attributes.date+"")&&p(bs,_e),2&s&&ge!==(ge=a[1].attributes.transporterName+"")&&p(Ss,ge),2&s&&Ie!==(Ie=a[1].attributes.transporterPhone+"")&&p(Cs,Ie),2&s&&Ve!==(Ve=a[1].attributes.driverName+"")&&p(Ls,Ve),2&s&&Re!==(Re=a[1].attributes.driverPlateNo+"")&&p(Ys,Re),2&s){let t;for(xe=a[1].attributes.waybill_items.data,t=0;t<xe.length;t+=1){const r=S(a,xe,t);we[t]?we[t].p(r,s):(we[t]=B(r),we[t].c(),we[t].m(rt,null))}for(;t<we.length;t+=1)we[t].d(1);we.length=xe.length}},d(a){a&&v(s),T(we,a)}}}function B(a){let s,t,r,e,c,f,b,T,D,y,_,g,I,V,R,x,w,N,S,k,B,q,H,A,$,C,W,O,K,j,F,G,L,U,z,M,Q=a[6]+1+"",J=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item.data?.attributes.name+"",X=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item.data?.attributes.category+"",Y=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unit+"",Z=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.pieces+"",aa=a[4].attributes.stock_release_item.data?.attributes.quantity+"",sa=P(a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unitPrice)+"",ta=P(a[4].attributes.stock_release_item.data?.attributes.quantity*a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unitPrice)+"",ra=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.currency+"";return{c(){s=i("tr"),t=i("td"),r=l(Q),e=o(),c=i("td"),f=l(J),b=l(" - "),T=l(X),D=o(),y=i("td"),_=o(),g=i("td"),I=l(Y),V=o(),R=i("td"),x=l(Z),w=o(),N=i("td"),S=l(aa),k=o(),B=i("td"),q=l(sa),H=o(),A=i("td"),$=l(ta),C=o(),W=l(ra),O=o(),K=i("td"),j=o(),F=i("td"),G=o(),L=i("td"),U=o(),z=i("td"),M=o()},l(a){s=h(a,"TR",{});var i=d(s);t=h(i,"TD",{});var o=d(t);r=u(o,Q),o.forEach(v),e=n(i),c=h(i,"TD",{});var l=d(c);f=u(l,J),b=u(l," - "),T=u(l,X),l.forEach(v),D=n(i),y=h(i,"TD",{}),d(y).forEach(v),_=n(i),g=h(i,"TD",{});var m=d(g);I=u(m,Y),m.forEach(v),V=n(i),R=h(i,"TD",{});var E=d(R);x=u(E,Z),E.forEach(v),w=n(i),N=h(i,"TD",{});var p=d(N);S=u(p,aa),p.forEach(v),k=n(i),B=h(i,"TD",{});var P=d(B);q=u(P,sa),P.forEach(v),H=n(i),A=h(i,"TD",{});var ea=d(A);$=u(ea,ta),C=n(ea),W=u(ea,ra),ea.forEach(v),O=n(i),K=h(i,"TD",{}),d(K).forEach(v),j=n(i),F=h(i,"TD",{}),d(F).forEach(v),G=n(i),L=h(i,"TD",{}),d(L).forEach(v),U=n(i),z=h(i,"TD",{}),d(z).forEach(v),M=n(i),i.forEach(v)},m(a,i){m(a,s,i),E(s,t),E(t,r),E(s,e),E(s,c),E(c,f),E(c,b),E(c,T),E(s,D),E(s,y),E(s,_),E(s,g),E(g,I),E(s,V),E(s,R),E(R,x),E(s,w),E(s,N),E(N,S),E(s,k),E(s,B),E(B,q),E(s,H),E(s,A),E(A,$),E(A,C),E(A,W),E(s,O),E(s,K),E(s,j),E(s,F),E(s,G),E(s,L),E(s,U),E(s,z),E(s,M)},p(a,s){2&s&&J!==(J=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item.data?.attributes.name+"")&&p(f,J),2&s&&X!==(X=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.item.data?.attributes.category+"")&&p(T,X),2&s&&Y!==(Y=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unit+"")&&p(I,Y),2&s&&Z!==(Z=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.pieces+"")&&p(x,Z),2&s&&aa!==(aa=a[4].attributes.stock_release_item.data?.attributes.quantity+"")&&p(S,aa),2&s&&sa!==(sa=P(a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unitPrice)+"")&&p(q,sa),2&s&&ta!==(ta=P(a[4].attributes.stock_release_item.data?.attributes.quantity*a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.unitPrice)+"")&&p($,ta),2&s&&ra!==(ra=a[4].attributes.stock_release_item.data?.attributes.purchase_order_item.data?.attributes.currency+"")&&p(W,ra)},d(a){a&&v(s)}}}function q(a){let s,t,b,p,T,w,N,P,S,B,q,H,A,$,C,W,O,K,j,F,G,L,U,z,M,Q,J,X,Y,Z,aa,sa,ta,ra,ea,ca,ia,oa,la,ha,da,na,ua,va,fa,ba,ma,Ea,pa,Ta;document.title=s="Print Waybill - "+a[0]+" - "+new Date,S=new r({props:{data:e}}),J=new r({props:{data:c}});let Da=a[1]&&k(a);return{c(){t=o(),b=i("br"),p=i("br"),T=o(),w=i("div"),N=i("a"),P=i("span"),D(S.$$.fragment),B=l(" Back"),q=o(),H=i("br"),A=i("br"),$=o(),C=i("div"),W=i("br"),O=i("br"),K=o(),j=i("div"),F=i("div"),G=i("h3"),L=l("Print Waybill"),U=o(),z=i("div"),M=i("button"),Q=i("span"),D(J.$$.fragment),X=o(),Y=i("span"),Z=l("Print"),aa=o(),sa=i("br"),ta=o(),ra=i("br"),ea=i("br"),ca=o(),Da&&Da.c(),ia=o(),oa=i("br"),la=i("br"),ha=i("br"),da=i("br"),na=i("br"),ua=i("br"),va=i("br"),fa=i("br"),ba=i("br"),ma=i("br"),this.h()},l(a){y('[data-svelte="svelte-15f10uu"]',document.head).forEach(v),t=n(a),b=h(a,"BR",{class:!0}),p=h(a,"BR",{class:!0}),T=n(a),w=h(a,"DIV",{class:!0});var s=d(w);N=h(s,"A",{href:!0,class:!0});var r=d(N);P=h(r,"SPAN",{class:!0});var e=d(P);_(S.$$.fragment,e),e.forEach(v),B=u(r," Back"),r.forEach(v),q=n(s),H=h(s,"BR",{class:!0}),A=h(s,"BR",{class:!0}),$=n(s),C=h(s,"DIV",{class:!0});var c=d(C);W=h(c,"BR",{class:!0}),O=h(c,"BR",{class:!0}),K=n(c),j=h(c,"DIV",{class:!0});var i=d(j);F=h(i,"DIV",{class:!0});var o=d(F);G=h(o,"H3",{class:!0});var l=d(G);L=u(l,"Print Waybill"),l.forEach(v),o.forEach(v),U=n(i),z=h(i,"DIV",{class:!0});var f=d(z);M=h(f,"BUTTON",{class:!0});var m=d(M);Q=h(m,"SPAN",{class:!0});var E=d(Q);_(J.$$.fragment,E),E.forEach(v),X=n(m),Y=h(m,"SPAN",{class:!0});var D=d(Y);Z=u(D,"Print"),D.forEach(v),m.forEach(v),f.forEach(v),i.forEach(v),aa=n(c),sa=h(c,"BR",{}),c.forEach(v),ta=n(s),ra=h(s,"BR",{class:!0}),ea=h(s,"BR",{class:!0}),ca=n(s),Da&&Da.l(s),s.forEach(v),ia=n(a),oa=h(a,"BR",{}),la=h(a,"BR",{}),ha=h(a,"BR",{}),da=h(a,"BR",{}),na=h(a,"BR",{}),ua=h(a,"BR",{}),va=h(a,"BR",{}),fa=h(a,"BR",{}),ba=h(a,"BR",{}),ma=h(a,"BR",{}),this.h()},h(){f(b,"class","hide-print svelte-1qsos4c"),f(p,"class","hide-print svelte-1qsos4c"),f(P,"class","icon is-small"),f(N,"href","waybills"),f(N,"class","has-text-dark hide-print svelte-1qsos4c"),f(H,"class","hide-print svelte-1qsos4c"),f(A,"class","hide-print svelte-1qsos4c"),f(W,"class","hide-print svelte-1qsos4c"),f(O,"class","hide-print svelte-1qsos4c"),f(G,"class","my-0 is-size-5 has-text-weight-bold"),f(F,"class","column"),f(Q,"class","icon"),f(Y,"class","has-text-white has-text-weight-bold"),f(M,"class","button is-dark px-5 py-2 has-text-weight-bold"),f(z,"class","column has-text-right"),f(j,"class","columns"),f(C,"class","card px-6 hide-print svelte-1qsos4c"),f(ra,"class","hide-print svelte-1qsos4c"),f(ea,"class","hide-print svelte-1qsos4c"),f(w,"class","container")},m(s,r){m(s,t,r),m(s,b,r),m(s,p,r),m(s,T,r),m(s,w,r),E(w,N),E(N,P),g(S,P,null),E(N,B),E(w,q),E(w,H),E(w,A),E(w,$),E(w,C),E(C,W),E(C,O),E(C,K),E(C,j),E(j,F),E(F,G),E(G,L),E(j,U),E(j,z),E(z,M),E(M,Q),g(J,Q,null),E(M,X),E(M,Y),E(Y,Z),E(C,aa),E(C,sa),E(w,ta),E(w,ra),E(w,ea),E(w,ca),Da&&Da.m(w,null),m(s,ia,r),m(s,oa,r),m(s,la,r),m(s,ha,r),m(s,da,r),m(s,na,r),m(s,ua,r),m(s,va,r),m(s,fa,r),m(s,ba,r),m(s,ma,r),Ea=!0,pa||(Ta=I(M,"click",a[2]),pa=!0)},p(a,[t]){(!Ea||1&t)&&s!==(s="Print Waybill - "+a[0]+" - "+new Date)&&(document.title=s),a[1]?Da?Da.p(a,t):(Da=k(a),Da.c(),Da.m(w,null)):Da&&(Da.d(1),Da=null)},i(a){Ea||(V(S.$$.fragment,a),V(J.$$.fragment,a),Ea=!0)},o(a){R(S.$$.fragment,a),R(J.$$.fragment,a),Ea=!1},d(a){a&&v(t),a&&v(b),a&&v(p),a&&v(T),a&&v(w),x(S),x(J),Da&&Da.d(),a&&v(ia),a&&v(oa),a&&v(la),a&&v(ha),a&&v(da),a&&v(na),a&&v(ua),a&&v(va),a&&v(fa),a&&v(ba),a&&v(ma),pa=!1,Ta()}}}async function H(a){return{slug:parseInt(a.params.slug)}}function A(a,s,t){let r,{slug:e}=s;return a.$$set=a=>{"slug"in a&&t(0,e=a.slug)},a.$$.update=()=>{1&a.$$.dirty&&e&&async function(){try{let a={populate:{consortium_member:{populate:"*"},waybill_items:{populate:["stock_release_item","stock_release_item.stock_release","stock_release_item.purchase_order_item","stock_release_item.purchase_order_item.item","stock_release_item.purchase_order_item.purchase_order"]}}};a=N.stringify(a,{encodeValuesOnly:!0});let s=await w("waybills/"+e,a);console.log("Get Waybill by ID ",s),t(1,r=s.data)}catch(a){console.log("Error get Waybill by ID ",a)}}()},[e,r,()=>{window.print()}]}class $ extends a{constructor(a){super(),s(this,a,A,q,t,{slug:0})}}export{$ as default,H as preload};
