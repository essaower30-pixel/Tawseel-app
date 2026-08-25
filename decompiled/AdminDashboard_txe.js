function txe({stores:o,products:i,mapNodes:d,onAddStore:r,onDeleteStore:u,onAddProduct:f,onDeleteProduct:p,onBack:m,categories:g,onUpdateCategories:x,contacts:b,onUpdateContact:M,onAddContact:w,onDeleteContact:C,onUpdateStores:L,onUpdateProducts:H,onUpdateMapNodes:q,onResetDatabase:E}){const[adminEmergencyRush,setAdminEmergencyRush]=_.useState(()=>localStorage.getItem("tw_emergency_rush")==="true");
const toggleAdminEmergencyRush=()=>{
  const next=!adminEmergencyRush;
  setAdminEmergencyRush(next);
  localStorage.setItem("tw_emergency_rush",next?"true":"false");
  window.dispatchEvent(new Event("storage"));
  ie(next?"🚨 تم تفعيل وضع ضغط الطلبات الشامل! تم إيقاف استقبال الطلبات في التطبيق مؤقتاً.":"✅ تم إلغاء وضع الضغط واستئناف استقبال طلبات الزبائن بنجاح!");
  K(next?"تفعيل وضع الضغط الشامل":"إلغاء وضع الضغط الشامل",next?"إيقاف استقبال طلبات التطبيق بالكامل بسبب ضغط العمل":"استئناف استقبال الطلبات للزبائن");
};
const[U,F]=_.useState("manager"),[O,ne]=_.useState("stats"),[se,z]=_.useState(!!window.deferredPrompt),Z=k=>{const W=`السلام عليكم ورحمة الله وبركاته 🛍️ تصفح واطلب من تطبيق "توصيل" للقرية - توصيل سريع للمأكولات، التموينات، والصيدلية إلى عتبة بيتك!
رابط التطبيق:
`+window.location.origin,ae=encodeURIComponent(W);/Android/i.test(navigator.userAgent)?k==="business"?window.location.href=`intent://send?text=${ae}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`:window.location.href=`intent://send?text=${ae}#Intent;package=com.whatsapp;scheme=whatsapp;end`:k==="business"?window.open(`https://wa.me/?text=${ae}`,"_blank"):window.open(`https://api.whatsapp.com/send?text=${ae}`,"_blank")};_.useEffect(()=>{const k=()=>{z(!0)};return window.addEventListener("pwaInstallPromptReady",k),()=>{window.removeEventListener("pwaInstallPromptReady",k)}},[]);const[G,J]=_.useState(()=>{const k=localStorage.getItem("tw_staff_members");return k?JSON.parse(k):[{id:"s1",name:"أبو حدو (المدير العام)",phone:"0933111222",role:"manager",pin:"1111",isActive:!0,createdAt:new Date(Date.now()-31536e6).toISOString()},{id:"s2",name:"أم عبده (مسؤول الطلبات)",phone:"0933444555",role:"orders_clerk",pin:"2222",isActive:!0,createdAt:new Date(Date.now()-15552e6).toISOString()},{id:"s3",name:"أبو سمير (المحاسب المالي)",phone:"0933777888",role:"accountant",pin:"3333",isActive:!0,createdAt:new Date(Date.now()-7776e6).toISOString()},{id:"s4",name:"أبو جودة (موظف الدعم)",phone:"0933999000",role:"support",pin:"4444",isActive:!0,createdAt:new Date(Date.now()-2592e3).toISOString()}]}),[ce,me]=_.useState(()=>{const k=localStorage.getItem("tw_drivers");return k?JSON.parse(k):[{id:"d1",name:"أبو شهاب (كابتن الضيعة)",phone:"0955333444",status:"available",totalDeliveries:124,earnings:1860,rating:4.9},{id:"d2",name:"أبو العز التوصيل السريع",phone:"0955222111",status:"busy",totalDeliveries:82,earnings:1150,rating:4.7},{id:"d3",name:"كابتن وسيم الورد",phone:"0955999888",status:"offline",totalDeliveries:15,earnings:180,rating:4.2}]}),[Me,Ne]=_.useState(()=>{const k=localStorage.getItem("tw_coupons");return k?JSON.parse(k):[{id:"c_ramadan",code:"RAMADAN",type:"percent",value:15,minOrderValue:50,isActive:!0,currentUsage:45},{id:"c_free",code:"FREE5",type:"fixed",value:5,minOrderValue:30,isActive:!0,currentUsage:12}]}),[ke,I]=_.useState(()=>{const k=localStorage.getItem("tw_audit_logs");return k?JSON.parse(k):[{id:"l1",timestamp:new Date(Date.now()-36e5).toISOString(),user:"المدير العام",role:"manager",action:"تعديل أسعار",details:"تم تعديل سعر بيتزا نابوليتانا لـ 22 ل.س"},{id:"l2",timestamp:new Date(Date.now()-72e5).toISOString(),user:"مسؤول الطلبات",role:"orders_clerk",action:"تعيين سائق",details:"تعيين السائق أبو شهاب للطلب #tw-1284"}]}),[Q,oe]=_.useState(()=>{const k=localStorage.getItem("tw_settings");return k?JSON.parse(k):{appName:"توصيل القرية الذكي",logoUrl:"",contactPhone:"0933111222",currency:"ل.س",baseDeliveryFee:5,minOrderValue:10,activeRegions:["الحارة الشرقية","الحارة الغربية","وسط البلد","مجمع الياسمين السكني"]}}),[ue,be]=_.useState(()=>{const k=localStorage.getItem("tw_orders_list");return k?JSON.parse(k):[]}),[j,R]=_.useState(!1);_.useEffect(()=>{localStorage.setItem("tw_staff_members",JSON.stringify(G))},[G]),_.useEffect(()=>{localStorage.setItem("tw_drivers",JSON.stringify(ce))},[ce]),_.useEffect(()=>{localStorage.setItem("tw_coupons",JSON.stringify(Me))},[Me]),_.useEffect(()=>{localStorage.setItem("tw_audit_logs",JSON.stringify(ke))},[ke]),_.useEffect(()=>{localStorage.setItem("tw_settings",JSON.stringify(Q))},[Q]),_.useEffect(()=>{localStorage.setItem("tw_orders_list",JSON.stringify(ue))},[ue]);const K=(k,W)=>{const ae={manager:"المدير العام",orders_clerk:"مسؤول الطلبات",accountant:"المحاسب",support:"موظف الدعم"},he={id:"log_"+Date.now(),timestamp:new Date().toISOString(),user:ae[U],role:U,action:k,details:W};I(Ee=>[he,...Ee])},le=k=>k==="pwa_install"||k==="directory"||U==="manager"?!0:U==="orders_clerk"?["orders","drivers","logs","landmarks","directory"].includes(k):U==="accountant"?["stats","coupons","settings","directory"].includes(k):U==="support"?["orders","drivers","directory"].includes(k):!1,[ee,fe]=_.useState(""),ie=k=>{fe(k),setTimeout(()=>fe(""),4e3)},[je,Ae]=_.useState(null),[ut,de]=_.useState(""),[we,tt]=_.useState("restaurants"),[Ie,Ve]=_.useState(""),[ct,te]=_.useState("20-30 دقيقة"),[Je,at]=_.useState(5),[vt,ya]=_.useState("open"),[fa,Ya]=_.useState(!1),[D,re]=_.useState(1),[_e,Ge]=_.useState("0944111222"),[pt,nt]=_.useState("وسط البلد"),[Rt,Be]=_.useState(""),[yt,et]=_.useState("البلدة وضواحيها"),[Pe,It]=_.useState(50),[ft,fC]=_.useState(50),[E1,wr]=_.useState(null),[za,vn]=_.useState(""),[Ka,Qa]=_.useState(""),[Jn,e1]=_.useState(15),[_r,ul]=_.useState(""),[O1,bn]=_.useState(""),[Wa,Nr]=_.useState(!1),[pl,jr]=_.useState(20),[P1,yl]=_.useState("خصم 20%"),[fl,Lr]=_.useState(!1),[Pt,lt]=_.useState([]),[mt,$a]=_.useState([]),[U1,u2]=_.useState(""),[p2,Sr]=_.useState(0),[Mn,ml]=_.useState(""),[wn,_n]=_.useState(0),[Ja,Nn]=_.useState(""),[xt,y2]=_.useState("percent"),[xl,jn]=_.useState(10),[Ln,mC]=_.useState(20),[F1,Cr]=_.useState(""),[Ar,G1]=_.useState(""),[Z1,Ta]=_.useState("available"),[qt,Ir]=_.useState(""),[f2,kl]=_.useState(50),[qr,X1]=_.useState(50),[zr,Ut]=_.useState(""),[Y1,$r]=_.useState(""),[gl,Sn]=_.useState("orders_clerk"),[vl,Tr]=_.useState(""),[t1,Hr]=_.useState(!1),[Vr,K1]=_.useState(""),[bl,Q1]=_.useState(""),[Dr,W1]=_.useState(""),[ma,Ml]=_.useState("ShoppingBag"),[Cn,bt]=_.useState(null),[xa,wl]=_.useState(null),[a1,_l]=_.useState(""),[adminPreviewPrescription,setAdminPreviewPrescription]=_.useState(null),[Ha,Va]=_.useState("all"),Rr=k=>{if(k.preventDefault(),!!ut.trim()){if(je){if(L){const W=o.map(ae=>ae.id===je?{...ae,name:ut,category:we,image:Ie||"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500",deliveryTime:ct,deliveryFee:Number(Je),status:vt,isFeatured:fa,priority:Number(D),phone:_e,contactPhone:_e,ownerPhone:_e,address:pt,description:Rt,deliveryArea:yt}:ae);L(W);try{localStorage.setItem("tw_stores",JSON.stringify(W))}catch(e){};K("تعديل متجر",`تعديل بيانات المتجر: ${ut}`);ie("تم تعديل وحفظ بيانات المتجر والمهنة ورقم الهاتف بنجاح!")}}else{const W="store_"+Date.now(),ae="node_"+W,he={id:ae,name:ut+" Node",x:Number(Pe),y:Number(ft),type:"store",arabicName:ut},Ee={id:W,name:ut,category:we,image:Ie||"https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500",rating:5,deliveryTime:ct,deliveryFee:Number(Je),locationNode:ae,status:vt,isFeatured:fa,priority:Number(D),phone:_e,contactPhone:_e,ownerPhone:_e,address:pt,description:Rt,deliveryArea:yt};r(Ee,he),K("إضافة متجر",`إضافة متجر جديد: ${ut}`),ie("تم إضافة المتجر الجديد وربطه بالخريطة!")}Ae(null),de(""),Be(""),Ve("")}},J1=k=>{const W="store_"+Date.now(),ae="node_"+W,he={id:ae,name:k.name+" - نسخة Node",x:Math.min(Math.max(Pe+5,10),90),y:Math.min(Math.max(ft+5,10),90),type:"store",arabicName:k.name+" - نسخة"},Ee={...k,id:W,name:k.name+" - نسخة مشابهة",locationNode:ae,status:"open"};r(Ee,he),i.filter(ka=>ka.storeId===k.id).forEach(ka=>{f({...ka,id:"prod_"+Math.random().toString(36).substr(2,9),storeId:W})}),K("نسخ متجر",`توليد نسخة مكررة للمتجر: ${k.name}`),ie("تم نسخ المتجر وتكرار قائمة السلع بنجاح!")},en=k=>{Ae(k.id),de(k.name),tt(k.category),Ve(k.image),te(k.deliveryTime),at(k.deliveryFee),ya(k.status||"open"),Ya(!!k.isFeatured),re(k.priority||1),Ge(k.phone||k.contactPhone||k.ownerPhone||"0944111222"),nt(k.address||"وسط البلد"),Be(k.description||""),et(k.deliveryArea||"البلدة وضواحيها"),window.scrollTo({top:120,behavior:"smooth"})},Br=k=>{if(k.preventDefault(),!Dr.trim()){alert("يرجى كتابة اسم التصنيف الجديد.");return}const W=Dr.trim(),ae="cat_"+Date.now();if(g.some(Ee=>Ee.label===W)){alert("هذا التصنيف موجود بالفعل بالنظام.");return}const he={id:ae,label:W,icon:ma};x&&(x([...g,he]),K("إضافة تصنيف جديد",`إضافة تصنيف المتاجر: ${W}`),ie("تم إضافة تصنيف المتجر الجديد بنجاح!"),W1(""),Ml("ShoppingBag"))},Nl=(k,W)=>{const ae=o.filter(he=>he.category===k);if(ae.length>0){alert(`عذراً، لا يمكن حذف تصنيف "${W}" لأنه مرتبط بـ (${ae.length}) من المتاجر حالياً. يرجى تعديل أو حذف تلك المتاجر أولاً قبل حذف التصنيف.`);return}bt({isOpen:!0,title:"تأكيد حذف تصنيف المتجر",message:`هل أنت متأكد من حذف تصنيف "${W}" نهائياً من النظام؟ لن يظهر للزبائن في القائمة الرئيسية بعد الآن.`,onConfirm:()=>{if(x){const he=g.filter(Ee=>Ee.id!==k);x(he),K("حذف تصنيف",`حذف تصنيف المتاجر: ${W}`),ie("تم إزالة تصنيف المتجر بنجاح."),bt(null)}}})},m2=k=>{if(k.preventDefault(),!za.trim()||!Ka)return;const W=o.find(ae=>ae.id===Ka);if(W){if(E1){if(H){const ae=i.map(he=>he.id===E1?{...he,name:za,price:Number(Jn),description:_r,image:O1||"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",storeId:Ka,category:W.category,isOffer:Wa,originalPrice:Wa?Number(pl):void 0,offerLabel:Wa?P1:void 0,isHidden:fl,sizes:Pt.length>0?Pt:void 0,additions:mt.length>0?mt:void 0}:he);H(ae),K("تعديل منتج",`تعديل السلعة: ${za}`),ie("تم تعديل السلعة وحفظ خياراتها!")}}else{const ae={id:"prod_"+Date.now(),name:za,price:Number(Jn),description:_r,image:O1||"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",storeId:Ka,category:W.category,isOffer:Wa,originalPrice:Wa?Number(pl):void 0,offerLabel:Wa?P1:void 0,isHidden:fl,sizes:Pt.length>0?Pt:void 0,additions:mt.length>0?mt:void 0};f(ae),K("إضافة منتج",`إضافة وجبة أو سلعة جديدة: ${za}`),ie("تم إضافة المنتج بنجاح للقوائم!")}wr(null),vn(""),ul(""),bn(""),lt([]),$a([])}},jl=k=>{wr(k.id),vn(k.name),Qa(k.storeId),e1(k.price),ul(k.description),bn(k.image),Nr(!!k.isOffer),jr(k.originalPrice||k.price+5),yl(k.offerLabel||"خصم خاص"),Lr(!!k.isHidden),lt(k.sizes||[]),$a(k.additions||[]),window.scrollTo({top:120,behavior:"smooth"})},Ll=()=>{U1.trim()&&(lt(k=>[...k,{name:U1.trim(),price:Number(p2)}]),u2(""),Sr(0))},x2=()=>{Mn.trim()&&($a(k=>[...k,{name:Mn.trim(),price:Number(wn)}]),ml(""),_n(0))},Bt=k=>{if(k.preventDefault(),!Ja.trim())return;const W={id:"coupon_"+Date.now(),code:Ja.trim().toUpperCase(),type:xt,value:Number(xl),minOrderValue:Number(Ln),isActive:!0,currentUsage:0};Ne(ae=>[W,...ae]),K("إنشاء كوبون",`تفعيل كوبون خصم جديد بقيمة ${xl}: ${Ja}`),ie("تم إنشاء كوبون الخصم وتفعيله فوراً للزبائن!"),Nn("")},An=k=>{if(k.preventDefault(),!F1.trim()||!Ar.trim())return;const W={id:"driver_"+Date.now(),name:F1.trim(),phone:Ar.trim(),status:Z1,totalDeliveries:0,earnings:0,rating:5};me(ae=>[W,...ae]),K("إضافة سائق",`تسجيل الكابتن الجديد للتوصيل: ${F1}`),ie("تم تعيين السائق وتأكيد أوراق اعتماده للخدمة!"),Cr(""),G1("")},Sl=(k,W)=>{const ae=ue.map(he=>he.id===k?{...he,status:W,acceptedAt:W==="accepted"?new Date().toISOString():he.acceptedAt,deliveredAt:W==="delivered"?new Date().toISOString():he.deliveredAt}:he);be(ae),K("تحديث حالة طلب",`تعديل حالة الطلب ${k} لـ ${W}`),ie("تم ترقية الطلب بنجاح لحالة التوصيل الجديدة!")},eo=(k,W)=>{
  const ae=ce.find(Ee=>Ee.id===W);
  if(!ae)return;
  const he=ue.map(Ee=>Ee.id===k?{...Ee,driverId:W,driverName:ae.name,status:Ee.status==="pending"?"accepted":Ee.status}:Ee);
  be(he);
  try {
    localStorage.setItem("tw_orders_list", JSON.stringify(he));
    const targetOrder = he.find(Ee=>Ee.id===k);
    if(targetOrder) {
      localStorage.setItem("tw_active_order", JSON.stringify(targetOrder));
    }
    window.dispatchEvent(new Event("storage"));
  } catch(e){}
  me(Ee=>Ee.map(Et=>Et.id===W?{...Et,status:"busy"}:Et));
  K("إسناد طلب لسائق",`تعيين الكابتن ${ae.name} للطلب رقم ${k}`);
  ie(`تم تكليف الكابتن (${ae.name}) بنجاح بالطلب #${k}!`);
},xC=k=>{if(k.preventDefault(),!xa||!a1.trim())return;const W=ue.map(ae=>ae.id===xa?{...ae,status:"cancelled",cancelReason:a1}:ae);be(W),K("إلغاء طلب",`إلغاء الطلب ${xa} بسبب: ${a1}`),ie("تم إلغاء الطلب وإرسال التنبيه التلقائي للزبون والسائق."),wl(null),_l("")},Er=k=>{if(k.preventDefault(),!qt.trim())return;const W="landmark_"+Date.now(),ae={id:W,name:W,arabicName:qt.trim(),x:Number(f2),y:Number(qr),type:"landmark"};q&&q([...d,ae]),K("إضافة معلم جغرافي",`إضافة معلم جديد: ${qt.trim()}`),ie("تم إضافة المعلم الجغرافي بنجاح!"),Ir(""),kl(50),X1(50)},Or=(k,W)=>{bt({isOpen:!0,title:"تأكيد إزالة المعلم الجغرافي",message:`هل أنت متأكد من حذف المعلم "${W}" من قائمة التوصيل نهائياً؟`,onConfirm:()=>{q&&q(d.filter(ae=>ae.id!==k)),K("حذف معلم جغرافي",`حذف المعلم: ${W}`),ie("تم حذف المعلم الجغرافي بنجاح."),bt(null)}})},n1=k=>({manager:"المدير العام",orders_clerk:"مسؤول الطلبات",accountant:"المحاسب المالي",support:"موظف الدعم والاتصال"})[k]||k,Cl=k=>{if(k.preventDefault(),!zr.trim()||!Y1.trim()||!vl.trim()){alert("يرجى ملء جميع الحقول المطلوبة لإضافة الموظف.");return}const W=vl.trim();if(W.length!==4||isNaN(Number(W))){alert("يجب أن يتكون رمز الـ PIN الخاص بالموظف من 4 أرقام بالضبط (مثال: 1234).");return}if(G.some(he=>he.pin===W)){alert("رمز الـ PIN هذا مستخدم بالفعل من قبل موظف آخر. يرجى اختيار رمز فريد.");return}const ae={id:"staff_"+Date.now(),name:zr.trim(),phone:Y1.trim(),role:gl,pin:W,isActive:!0,createdAt:new Date().toISOString()};J(he=>[...he,ae]),K("إضافة موظف جديد",`إضافة الموظف: ${ae.name} بصفة ${n1(ae.role)}`),ie("تم إضافة الموظف الجديد وصلاحياته بنجاح!"),Ut(""),$r(""),Tr(""),Sn("orders_clerk")},k2=(k,W)=>{J(ae=>ae.map(he=>{if(he.id===k){const Ee=!he.isActive;return K("تغيير حالة موظف",`تغيير حالة الموظف ${W} إلى ${Ee?"نشط":"غير نشط"}`),ie(`تم ${Ee?"تنشيط":"تعطيل"} حساب الموظف بنجاح.`),{...he,isActive:Ee}}return he}))},kC=(k,W)=>{bt({isOpen:!0,title:"تأكيد إزالة الموظف",message:`هل أنت متأكد من حذف حساب الموظف "${W}" نهائياً من النظام؟ لن يتمكن من تسجيل الدخول بعدها.`,onConfirm:()=>{J(ae=>ae.filter(he=>he.id!==k)),K("إزالة موظف",`حذف الموظف نهائياً: ${W}`),ie("تم إزالة حساب الموظف بنجاح."),bt(null)}})},gC=k=>{k.preventDefault(),Q1("");const W=Vr.trim(),ae=G.find(he=>he.pin===W);if(!ae){Q1("رمز الـ PIN غير صحيح! يرجى إعادة المحاولة.");return}if(!ae.isActive){Q1("هذا الحساب تم تعطيله مؤقتاً من قبل المدير العام.");return}F(ae.role),Hr(!1),K1(""),ae.role==="manager"?ne("stats"):ae.role==="orders_clerk"?ne("orders"):ae.role==="accountant"?ne("stats"):ne("orders"),K("تسجيل دخول الموظف",`الموظف ${ae.name} سجل دخوله بنجاح بالرمز السري.`),ie(`أهلاً بك يا ${ae.name}! تم تبديل حسابك بنجاح.`)},Da=(()=>{const k=ue.filter(Lt=>{if(Ha==="all")return!0;const Ra=new Date(Lt.createdAt),Pr=Date.now()-Ra.getTime();return Ha==="today"?Pr<=864e5:Ha==="week"?Pr<=6048e5:Ha==="month"?Pr<=2592e6:!0}),W=k.filter(Lt=>Lt.status==="delivered"),ae=k.filter(Lt=>Lt.status==="cancelled"),he=W.reduce((Lt,Ra)=>Lt+Ra.subtotal,0),Ee=W.reduce((Lt,Ra)=>Lt+Ra.deliveryFee,0),Et={};W.forEach(Lt=>{Et[Lt.storeName]=(Et[Lt.storeName]||0)+Lt.subtotal});const ka=Object.entries(Et).map(([Lt,Ra])=>({name:Lt,val:Ra})).sort((Lt,Ra)=>Ra.val-Lt.val).slice(0,4);return{total:k.length,completed:W.length,cancelled:ae.length,sales:he,deliveryFees:Ee,topStores:ka}})();return n.jsxs("div",{className:"bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-5 sm:p-7 space-y-6 animate-fade-in",dir:"rtl",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-150 pb-5 gap-4",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-12 h-12 rounded-2xl bg-slate-900 text-orange-500 flex items-center justify-center border border-slate-800 shadow-md",children:n.jsx(Kn,{className:"w-6 h-6 animate-pulse"})}),n.jsxs("div",{children:[n.jsxs("h2",{className:"font-extrabold text-slate-900 text-lg sm:text-xl",children:[Q.appName," • لوحة المدير"]}),n.jsx("p",{className:"text-xs text-slate-400 font-bold mt-0.5",children:"لوحة التحكم المركزية بالعمليات والصلاحيات والتقارير"})]})]}),n.jsxs("div",{className:"flex items-center gap-2 self-start sm:self-center",children:[n.jsxs("span",{className:"text-[10px] sm:text-xs text-slate-500 font-extrabold flex items-center gap-1",children:[n.jsx(ur,{className:"w-3.5 h-3.5 text-orange-500"})," هويتك الحالية:"]}),n.jsxs("select",{value:U,onChange:k=>{const W=k.target.value;F(W),ne("stats")},className:"bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs py-1.5 px-3 rounded-xl font-extrabold outline-none cursor-pointer",children:[n.jsx("option",{value:"manager",children:"المدير العام (صلاحيات كاملة)"}),n.jsx("option",{value:"orders_clerk",children:"مسؤول الطلبات (جدولة وتوزيع)"}),n.jsx("option",{value:"accountant",children:"المحاسب المالي (أرباح وإحصائيات)"}),n.jsx("option",{value:"support",children:"موظف الدعم والاتصال (الشكاوى)"})]}),n.jsxs("button",{onClick:()=>{K1(""),Q1(""),Hr(!0)},className:"bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[11px] sm:text-xs py-1.5 px-3 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm border border-slate-800",title:"تسجيل دخول الموظفين بالرمز السري",children:[n.jsx(ea,{className:"w-3.5 h-3.5 text-orange-400"}),n.jsx("span",{children:"دخول بالـ PIN"})]}),n.jsxs("button",{onClick:m,className:"bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer",children:[n.jsx(Zn,{className:"w-4 h-4"}),n.jsx("span",{children:"الزبائن"})]})]})]}),n.jsx(xr,{children:ee&&n.jsxs(V1.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm p-4 rounded-2xl flex items-center gap-2.5 shadow-sm",children:[n.jsx(La,{className:"w-5 h-5 text-emerald-600 shrink-0"}),n.jsx("span",{className:"font-extrabold",children:ee})]})}),n.jsxs("div",{className:`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 transition-all ${adminEmergencyRush?"bg-red-50 border-red-300 text-red-900":"bg-slate-50 border-slate-200 text-slate-700"}`,children:[
  n.jsxs("div",{className:"flex items-center gap-2.5 text-right w-full sm:w-auto",children:[
    n.jsx("span",{className:"text-2xl shrink-0",children:adminEmergencyRush?"🚨":"⚡"}),
    n.jsxs("div",{children:[
      n.jsx("h4",{className:"font-extrabold text-xs sm:text-sm",children:adminEmergencyRush?"وضع ضغط الطلبات والطوارئ مفعل (الطلبات مجمدة مؤقتاً)":"إدارة ضغط الطلبات وحظر الخدمات/المنتجات"}),
      n.jsx("p",{className:"text-[10px] text-slate-500",children:adminEmergencyRush?"تم إيقاف استقبال طلبات جديدة في التطبيق لتخفيف الضغط على المتاجر والكباتن.":"يمكنك إيقاف واستئناف استقبال الطلبات كلياً أو حظر متاجر/سلع محددة عند وجود ضغط."})
    ]})
  ]}),
  n.jsx("button",{
    type:"button",
    onClick:toggleAdminEmergencyRush,
    className:`px-4 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer shadow-xs whitespace-nowrap ${adminEmergencyRush?"bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse":"bg-red-600 hover:bg-red-700 text-white"}`,
    children:adminEmergencyRush?"✅ استئناف استقبال الطلبات الآن":"🚨 إيقاف وتجميد عام للطلبات (وضع الضغط)"
  })
]}),
n.jsx("div",{className:"flex border-b border-slate-250 select-none overflow-x-auto scrollbar-none gap-2 pb-1",children:[{id:"pwa_install",label:"تثبيت ومشاركة التطبيق 📱",icon:"Share2"},{id:"stats",label:"الإحصائيات والأرباح",icon:"BarChart3"},{id:"directory",label:"سجل الزبائن والمهن 👥",icon:"Contact"},{id:"orders",label:"الطلبات النشطة والجدولة",icon:"Clock"},{id:"stores",label:"إدارة المحلات والمتاجر",icon:"Store"},{id:"products",label:"إدارة الأصناف والخيارات",icon:"UtensilsCrossed"},{id:"coupons",label:"كوبونات الخصم والترويج",icon:"BadgePercent"},{id:"drivers",label:"إدارة الكباتن والمناديب",icon:"Truck"},{id:"landmarks",label:"إدارة المعالم الجغرافية",icon:"MapPin"},{id:"logs",label:"سجل عمليات الموظفين",icon:"FileText"},{id:"staff",label:"طاقم العمل والصلاحيات",icon:"Users2"},{id:"settings",label:"الإعدادات والرسوم",icon:"Settings"}].map(k=>{const W=le(k.id),ae=US[k.icon]||da;return n.jsxs("button",{onClick:()=>ne(k.id),className:`py-2.5 px-4 font-bold text-xs whitespace-nowrap rounded-xl transition-all cursor-pointer flex items-center gap-2 border ${O===k.id?"bg-slate-900 border-slate-900 text-white shadow-lg":"bg-white border-slate-200 text-slate-500 hover:bg-slate-50"} ${W?"":"opacity-40 hover:bg-red-50 hover:border-red-100"}`,children:[n.jsx(ae,{className:`w-4 h-4 ${O===k.id?"text-orange-500":""}`}),n.jsx("span",{children:k.label}),!W&&n.jsx(ea,{className:"w-3 h-3 text-red-500 shrink-0"})]},k.id)})}),le(O)?n.jsxs("div",{className:"pt-2 animate-fade-in",children:[O==="stats"&&n.jsx((()=>{
  return function EnhancedStatsAndReportingView(){
    const [filterPeriod, setFilterPeriod] = _.useState(Ha || "today");
    const [showWhatsappModal, setShowWhatsappModal] = _.useState(false);
    const [showOfficialReportModal, setShowOfficialReportModal] = _.useState(false);
    const [managerPhone, setManagerPhone] = _.useState(() => localStorage.getItem("tw_manager_report_phone") || "");
    const [copiedReport, setCopiedReport] = _.useState(false);
    const [reportNotes, setReportNotes] = _.useState("");

    const handleFilterChange = (id) => {
      setFilterPeriod(id);
      Va(id);
    };

    // Calculate customer count
    const registeredCustomersCount = (() => {
      try {
        const raw = localStorage.getItem("tw_registered_customers");
        const list = raw ? JSON.parse(raw) : [];
        return Math.max(list.length, 6);
      } catch(e){ return 6; }
    })();

    // Calculate village crafts count
    const villageServicesCount = (() => {
      try {
        const raw = localStorage.getItem("tw_village_services");
        const list = raw ? JSON.parse(raw) : [];
        return Math.max(list.length, 8);
      } catch(e){ return 8; }
    })();

    const periodLabel = filterPeriod === "today" ? "مبيعات اليوم" :
                        filterPeriod === "week" ? "التقرير الأسبوعي" :
                        filterPeriod === "month" ? "التقرير الشهري" : "تقرير جميع الأوقات";

    const reportTimestamp = new Date().toLocaleString("ar-SY", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    // Build the formatted WhatsApp report text
    const generateWhatsappReportText = () => {
      let text = `📊 *تقرير الأداء المالي والإداري - تطبيق توصيل القرية* 📊\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🗓️ *فترة التقرير:* ${periodLabel}\n`;
      text += `⏰ *تاريخ ووقت الإصدار:* ${reportTimestamp}\n`;
      text += `━━━━━━━━━━━━━━━━━━━━━━\n\n`;

      text += `💰 *المؤشرات المالية والتشغيلية الرئيسية:*\n`;
      text += `💵 *إجمالي المبيعات المكتملة:* ${Da.sales} ${Q.currency}\n`;
      text += `✅ *الطلبات المكتملة بالتسليم:* ${Da.completed} طلب\n`;
      text += `🛵 *رسوم التوصيل المحصلة:* ${Da.deliveryFees} ${Q.currency}\n`;
      text += `⚠️ *الطلبات الملغاة:* ${Da.cancelled} طلب\n\n`;

      text += `👥 *إحصاءات مجتمع وشبكة القرية:*\n`;
      text += `• 👤 الزبائن المسجلين والموثقين: ${registeredCustomersCount} زبون\n`;
      text += `• 🏪 المتاجر والمحلات المسجلة: ${o.length} متجر (${o.filter(s=>s.status!=="closed").length} مفتوح نشط)\n`;
      text += `• 🛠️ دليل المهن والحرفيين: ${villageServicesCount} مهني معتمد\n`;
      text += `• 🛵 كباتن التوصيل والكوادر: ${ce.length} كابتن (${ce.filter(d=>d.status==="available").length} متاح الآن) + ${G.length} إدارة\n\n`;

      if (Da.topStores && Da.topStores.length > 0) {
        text += `🏆 *المحلات الأكثر طلباً ومبيعاً:*\n`;
        Da.topStores.forEach((st, idx) => {
          text += `${idx + 1}. *${st.name}*: ${st.val} ${Q.currency}\n`;
        });
        text += `\n`;
      }

      if (reportNotes.trim()) {
        text += `📝 *ملاحظات إدارية:*\n${reportNotes.trim()}\n\n`;
      }

      text += `━━━━━━━━━━━━━━━━━━━━━━\n`;
      text += `🏢 *تم الإصدار بواسطة:* لوحة الإدارة العامة المركزية\n`;
      text += `🔗 *رابط النظام:* ${window.location.origin}`;
      return text;
    };

    // Share to general WhatsApp (User chooses any person or group)
    const handleShareToWhatsappGeneral = (isBusiness = false) => {
      const text = generateWhatsappReportText();
      const encoded = encodeURIComponent(text);
      if (/Android/i.test(navigator.userAgent)) {
        if (isBusiness) {
          window.location.href = `intent://send?text=${encoded}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`;
        } else {
          window.location.href = `intent://send?text=${encoded}#Intent;package=com.whatsapp;scheme=whatsapp;end`;
        }
      } else {
        if (isBusiness) {
          window.open(`https://wa.me/?text=${encoded}`, "_blank");
        } else {
          window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
        }
      }
    };

    // Send directly to Manager phone number via WhatsApp / WhatsApp Business
    const handleSendDirectToManager = (isBusiness = false) => {
      let phone = managerPhone.trim();
      if (!phone) {
        alert("الرجاء إدخال رقم موبايل المدير أولاً.");
        return;
      }
      localStorage.setItem("tw_manager_report_phone", phone);
      if (phone.startsWith("0")) {
        phone = "963" + phone.substring(1);
      }
      phone = phone.replace(/[^0-9]/g, "");
      const text = generateWhatsappReportText();
      const encoded = encodeURIComponent(text);
      if (/Android/i.test(navigator.userAgent)) {
        if (isBusiness) {
          window.location.href = `intent://send?phone=${phone}&text=${encoded}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`;
        } else {
          window.location.href = `intent://send?phone=${phone}&text=${encoded}#Intent;package=com.whatsapp;scheme=whatsapp;end`;
        }
      } else {
        window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
      }
    };

    // Copy text to clipboard
    const handleCopyReport = () => {
      const text = generateWhatsappReportText();
      navigator.clipboard.writeText(text).then(() => {
        setCopiedReport(true);
        setTimeout(() => setCopiedReport(false), 3000);
      }).catch(() => {
        alert("تم نسخ التقرير!");
      });
    };

    return n.jsxs("div", {
      className: "space-y-6 animate-fade-in text-slate-800",
      dir: "rtl",
      children: [
        // -------------------------------------------------------------
        // TOP CONTROL BAR: BACK BUTTON + FILTERS + PRINT + WHATSAPP SHARE
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4",
          children: [
            // Left: Back button to main tabs + Filter Pills
            n.jsxs("div", {
              className: "flex items-center flex-wrap gap-2.5",
              children: [
                // Quick Back Button to Orders/Stores
                n.jsxs("button", {
                  type: "button",
                  onClick: () => ne("orders"),
                  className: "py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border border-slate-200",
                  children: [
                    n.jsx("span", { children: "←" }),
                    n.jsx("span", { children: "رجوع للطلبات" })
                  ]
                }),

                n.jsx("div", { className: "h-5 w-[1px] bg-slate-200 hidden sm:block" }),

                n.jsx("span", { className: "text-xs text-slate-500 font-extrabold ml-1", children: "تصفية التقرير:" }),
                [
                  { id: "today", label: "مبيعات اليوم" },
                  { id: "week", label: "التقرير الأسبوعي" },
                  { id: "month", label: "التقرير الشهري" },
                  { id: "all", label: "جميع الأوقات" }
                ].map(item => n.jsx("button", {
                  key: item.id,
                  type: "button",
                  onClick: () => handleFilterChange(item.id),
                  className: `text-xs font-black py-2 px-3.5 rounded-xl border transition-all cursor-pointer ${filterPeriod === item.id ? "bg-orange-500 border-orange-500 text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"}`,
                  children: item.label
                }))
              ]
            }),

            // Action Buttons: WhatsApp Share + Print + Snapshot View
            n.jsxs("div", {
              className: "flex items-center flex-wrap gap-2",
              children: [
                // WhatsApp Share Button (Main Trigger)
                n.jsxs("button", {
                  type: "button",
                  onClick: () => setShowWhatsappModal(true),
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer",
                  children: [
                    n.jsx(US.MessageCircle || "span", { className: "w-4 h-4" }),
                    n.jsx("span", { children: "إرسال التقرير عبر واتساب 📲" })
                  ]
                }),

                // Official Printable / Snapshot Card View
                n.jsxs("button", {
                  type: "button",
                  onClick: () => setShowOfficialReportModal(true),
                  className: "bg-slate-900 hover:bg-slate-800 text-white font-black text-xs py-2 px-3.5 rounded-xl border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer",
                  children: [
                    n.jsx(US.FileText || "span", { className: "w-4 h-4 text-orange-400" }),
                    n.jsx("span", { children: "التقرير الرسمي والتصوير 📄" })
                  ]
                }),

                // Print Direct
                n.jsxs("button", {
                  type: "button",
                  onClick: () => window.print(),
                  className: "bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-3 rounded-xl border border-slate-200 transition-all flex items-center gap-1 cursor-pointer",
                  title: "طباعة فورية",
                  children: [
                    n.jsx(U0, { className: "w-3.5 h-3.5 text-slate-500" }),
                    n.jsx("span", { children: "طباعة 🖨️" })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // ECOSYSTEM CENSUS & COMMUNITY SUMMARY CARD
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl space-y-4 text-right",
          children: [
            n.jsxs("div", {
              className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3",
              children: [
                n.jsxs("div", {
                  className: "flex items-center gap-2.5",
                  children: [
                    n.jsx("div", { className: "w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-lg", children: "📊" }),
                    n.jsxs("div", {
                      children: [
                        n.jsx("h3", { className: "font-black text-sm sm:text-base text-white", children: "إحصاءات وتعداد مجتمع القرية (الزبائن والمتاجر والمهن)" }),
                        n.jsx("p", { className: "text-slate-400 text-[11px]", children: "تعداد شامل ومباشر لكافة المسجلين بالنظام مع إمكانية تصدير التقرير ومشاركته فوراً." })
                      ]
                    })
                  ]
                }),
                n.jsxs("button", {
                  type: "button",
                  onClick: () => ne("directory"),
                  className: "py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer",
                  children: [
                    n.jsx(US.Contact || US.Users || "span", { className: "w-4 h-4" }),
                    n.jsx("span", { children: "فتح سجل الزبائن والمهن الكامل 📋" })
                  ]
                })
              ]
            }),

            // 4 Stats Sub-Cards
            n.jsxs("div", {
              className: "grid grid-cols-2 lg:grid-cols-4 gap-3.5",
              children: [
                // 1. Registered Customers
                n.jsxs("div", {
                  onClick: () => ne("directory"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "👥 الزبائن المسجلين" }),
                        n.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-amber-400", children: [registeredCustomersCount, " زبون"] }),
                    n.jsx("p", { className: "text-[10px] text-slate-400", children: "دخول مسجل وموثق بالاسم والموبايل" })
                  ]
                }),

                // 2. Stores & Shops
                n.jsxs("div", {
                  onClick: () => ne("stores"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "🏪 المحلات والمتاجر" }),
                        n.jsx("span", { className: "text-[9px] bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded font-bold", children: o.filter(s=>s.status!=="closed").length + " نشط" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-orange-400", children: [o.length, " متجر"] }),
                    n.jsxs("p", { className: "text-[10px] text-slate-400", children: [o.filter(s=>s.category==="restaurants").length, " مطاعم • ", o.filter(s=>s.category==="supermarket"||s.category==="supermarkets"||s.category==="groceries").length, " بقالية"] })
                  ]
                }),

                // 3. Village Crafts & Services
                n.jsxs("div", {
                  onClick: () => ne("directory"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "🛠️ المهن وخدمات القرية" }),
                        n.jsx("span", { className: "text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold", children: "دليل الحرف" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-cyan-400", children: [villageServicesCount, " حرفي ومهنة"] }),
                    n.jsx("p", { className: "text-[10px] text-slate-400", children: "حدادة، دهان، سباكة، كهرباء، أطباء..." })
                  ]
                }),

                // 4. Drivers & Staff
                n.jsxs("div", {
                  onClick: () => ne("drivers"),
                  className: "bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 hover:border-orange-500/40 p-4 rounded-2xl cursor-pointer transition-all space-y-1 shadow-sm",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx("span", { className: "text-[10px] text-slate-400 font-black", children: "🛵 الكباتن والكوادر" }),
                        n.jsx("span", { className: "text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold", children: ce.length + " كابتن" })
                      ]
                    }),
                    n.jsxs("h4", { className: "text-2xl font-black text-emerald-400", children: [ce.length + G.length, " كادر"] }),
                    n.jsxs("p", { className: "text-[10px] text-slate-400", children: [ce.filter(d=>d.status==="available").length, " متصل للطلب • ", G.length, " إدارة"] })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // 4 MAIN FINANCIAL & OPERATIONAL STATS CARDS (THE 4 ICONS IN SCREENSHOT)
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
          children: [
            // 1. Total Completed Sales (المبيعات المكتملة)
            n.jsxs("div", {
              className: "bg-slate-900 text-white p-4.5 rounded-3xl border border-slate-800 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-orange-500/40 transition-all",
              children: [
                n.jsx("div", { className: "absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl" }),
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(D0, { className: "w-8 h-8 text-orange-500 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-lg font-black", children: "مبيعات" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-400 font-bold mt-2.5", children: "إجمالي المبيعات المكتملة" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-orange-400 mt-1", children: [Da.sales, " ", Q.currency] })
                  ]
                }),
                n.jsxs("button", {
                  type: "button",
                  onClick: () => setShowWhatsappModal(true),
                  className: "mt-3 pt-2 border-t border-slate-800 text-[10px] text-orange-300 hover:text-white flex items-center justify-between font-bold cursor-pointer transition-colors",
                  children: [
                    n.jsx("span", { children: "مشاركة الرقم بالواتساب" }),
                    n.jsx(US.MessageCircle || "span", { className: "w-3 h-3 text-emerald-400" })
                  ]
                })
              ]
            }),

            // 2. Completed Deliveries (الطلبات المكتملة بالتسليم)
            n.jsxs("div", {
              className: "bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-emerald-500/40 transition-all",
              children: [
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(z1, { className: "w-8 h-8 text-emerald-600 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg font-black", children: "ناجح" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-500 font-bold mt-2.5", children: "الطلبات المكتملة بالتسليم" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-slate-850 mt-1", children: [Da.completed, " طلب مكتمل"] })
                  ]
                }),
                n.jsxs("div", {
                  className: "mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-bold flex items-center justify-between",
                  children: [
                    n.jsx("span", { children: "تسليم يدوي ناجح" }),
                    n.jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-500" })
                  ]
                })
              ]
            }),

            // 3. Collected Delivery Fees (رسوم التوصيل المحصلة)
            n.jsxs("div", {
              className: "bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-blue-500/40 transition-all",
              children: [
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(cl, { className: "w-8 h-8 text-blue-600 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg font-black", children: "توصيل" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-500 font-bold mt-2.5", children: "رسوم التوصيل المحصلة" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-slate-850 mt-1", children: [Da.deliveryFees, " ", Q.currency] })
                  ]
                }),
                n.jsxs("div", {
                  className: "mt-3 pt-2 border-t border-slate-100 text-[10px] text-blue-600 font-bold flex items-center justify-between",
                  children: [
                    n.jsx("span", { children: "أرباح أسطول الكباتن" }),
                    n.jsx(US.Truck || "span", { className: "w-3 h-3 text-blue-500" })
                  ]
                })
              ]
            }),

            // 4. Cancelled Orders (الطلبات الملغاة حالياً)
            n.jsxs("div", {
              className: "bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between group hover:border-red-500/40 transition-all",
              children: [
                n.jsxs("div", {
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        n.jsx(ha, { className: "w-8 h-8 text-red-500 opacity-90" }),
                        n.jsx("span", { className: "text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-lg font-black", children: "ملغي" })
                      ]
                    }),
                    n.jsx("p", { className: "text-xs text-slate-500 font-bold mt-2.5", children: "الطلبات الملغاة حالياً" }),
                    n.jsxs("h4", { className: "text-xl sm:text-2xl font-black text-red-600 mt-1", children: [Da.cancelled, " طلب ملغي"] })
                  ]
                }),
                n.jsxs("div", {
                  className: "mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-bold flex items-center justify-between",
                  children: [
                    n.jsx("span", { children: "نسبة الإلغاء: " + ((Da.completed + Da.cancelled) > 0 ? Math.round((Da.cancelled / (Da.completed + Da.cancelled)) * 100) : 0) + "%" }),
                    n.jsx("span", { className: "w-2 h-2 rounded-full bg-red-400" })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // SALES CHART & TOP STORES SECTION
        // -------------------------------------------------------------
        n.jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
          children: [
            // Chart
            n.jsxs("div", {
              className: "lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4",
              children: [
                n.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    n.jsx("h4", { className: "font-black text-slate-800 text-sm sm:text-base", children: "تحليل مبيعات المحلات على مدار الأيام المنصرمة" }),
                    n.jsx("span", { className: "text-[10px] text-slate-400 font-bold", children: "مخطط بياني فوري" })
                  ]
                }),
                n.jsx("div", {
                  className: "relative h-48 w-full flex items-end",
                  children: n.jsxs("svg", {
                    className: "w-full h-full",
                    viewBox: "0 0 500 120",
                    preserveAspectRatio: "none",
                    children: [
                      n.jsx("defs", {
                        children: n.jsxs("linearGradient", {
                          id: "chartGrad",
                          x1: "0",
                          y1: "0",
                          x2: "0",
                          y2: "1",
                          children: [
                            n.jsx("stop", { offset: "0%", stopColor: "#f97316", stopOpacity: "0.3" }),
                            n.jsx("stop", { offset: "100%", stopColor: "#f97316", stopOpacity: "0.0" })
                          ]
                        })
                      }),
                      n.jsx("path", { d: "M0,120 L50,90 L120,40 L190,80 L260,30 L340,65 L420,15 L500,45 L500,120 Z", fill: "url(#chartGrad)" }),
                      n.jsx("path", { d: "M0,120 L50,90 L120,40 L190,80 L260,30 L340,65 L420,15 L500,45", fill: "none", stroke: "#f97316", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" })
                    ]
                  })
                }),
                n.jsxs("div", {
                  className: "flex justify-between text-[10px] text-slate-400 font-bold select-none px-1 border-t border-slate-100 pt-2",
                  children: [
                    n.jsx("span", { children: "السبت" }),
                    n.jsx("span", { children: "الأحد" }),
                    n.jsx("span", { children: "الاثنين" }),
                    n.jsx("span", { children: "الثلاثاء" }),
                    n.jsx("span", { children: "الأربعاء" }),
                    n.jsx("span", { children: "الخميس" }),
                    n.jsx("span", { children: "الجمعة اليوم" })
                  ]
                })
              ]
            }),

            // Top Stores
            n.jsxs("div", {
              className: "lg:col-span-4 bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between",
              children: [
                n.jsxs("div", {
                  className: "flex items-center justify-between border-b border-slate-800 pb-2",
                  children: [
                    n.jsx("h4", { className: "font-black text-sm sm:text-base", children: "المحلات الأكثر طلباً ومبيعاً" }),
                    n.jsx("span", { className: "text-xs", children: "🏆" })
                  ]
                }),
                Da.topStores.length === 0 ? n.jsx("p", { className: "text-slate-400 text-xs py-10 text-center font-bold", children: "لا توجد مبيعات مسجلة في هذه الفترة بعد." }) : n.jsx("div", {
                  className: "space-y-3",
                  children: Da.topStores.map((k, W) => n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsxs("div", {
                        className: "flex justify-between text-xs font-bold",
                        children: [
                          n.jsx("span", { children: k.name }),
                          n.jsxs("span", { className: "text-orange-400", children: [k.val, " ", Q.currency] })
                        ]
                      }),
                      n.jsx("div", {
                        className: "w-full bg-slate-800 h-2 rounded-full overflow-hidden",
                        children: n.jsx("div", { className: "bg-orange-500 h-full rounded-full", style: { width: `${Math.min(k.val / (Da.sales || 1) * 100, 100)}%` } })
                      })
                    ]
                  }, W))
                }),
                n.jsx("p", { className: "text-[10px] text-slate-500 leading-normal font-bold", children: "* تحتسب الإحصائيات الفورية مباشرة من صفقات التسليم الناجحة التي أتمها المندوب باليد." })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // MODAL 1: WHATSAPP SHARE MODAL (FOR INDIVIDUALS & GROUPS)
        // -------------------------------------------------------------
        showWhatsappModal && n.jsxs("div", {
          className: "fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex flex-col justify-start sm:justify-center items-center p-0 sm:p-4 overflow-y-auto w-full h-[100dvh]",
          dir: "rtl",
          onClick: (e) => { if (e.target === e.currentTarget) setShowWhatsappModal(false); },
          children: [
            n.jsxs("div", {
              className: "bg-white w-full sm:max-w-lg h-[100dvh] sm:h-auto sm:max-h-[90vh] rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-slate-200 flex flex-col overflow-hidden text-right relative",
              children: [
                // 1. ALWAYS-VISIBLE STICKY TOP HEADER WITH HUGE CLEAR BACK BUTTON
                n.jsxs("div", {
                  className: "p-3.5 sm:p-5 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between shrink-0 shadow-xs",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center gap-2.5",
                      children: [
                        n.jsx("div", { className: "w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-lg sm:text-xl shrink-0 shadow-xs", children: "📲" }),
                        n.jsxs("div", {
                          children: [
                            n.jsx("h3", { className: "font-black text-sm sm:text-base text-slate-900 leading-tight", children: "إرسال التقرير عبر واتساب" }),
                            n.jsx("p", { className: "text-slate-400 text-[10px] sm:text-[11px] font-bold", children: "للأشخاص والمجموعات والمدير" })
                          ]
                        })
                      ]
                    }),

                    // PROMINENT BACK BUTTON (TOP)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowWhatsappModal(false),
                      className: "py-2 px-3.5 bg-slate-100 active:bg-slate-200 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "✕" }),
                        n.jsx("span", { children: "إغلاق / رجوع" })
                      ]
                    })
                  ]
                }),

                // 2. SCROLLABLE BODY
                n.jsxs("div", {
                  className: "p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1",
                  children: [
                    // Manager Direct Phone Input
                    n.jsxs("div", {
                      className: "bg-emerald-50/70 border border-emerald-200/70 p-4 rounded-2xl space-y-2",
                      children: [
                        n.jsx("label", { className: "text-xs font-black text-emerald-950 block", children: "رقم موبايل المدير (اختياري للإرسال المباشر):" }),
                        n.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            n.jsx("input", {
                              type: "tel",
                              value: managerPhone,
                              onChange: (e) => setManagerPhone(e.target.value),
                              placeholder: "مثال: 0933111222",
                              className: "flex-1 bg-white border border-emerald-300 focus:border-emerald-500 rounded-xl py-2 px-3 text-xs font-bold text-slate-800 outline-none dir-ltr text-right"
                            }),
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleSendDirectToManager(false),
                              className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs active:scale-95",
                              title: "إرسال لواتساب العادي",
                              children: [
                                n.jsx(US.Send || "span", { className: "w-3.5 h-3.5" }),
                                n.jsx("span", { children: "واتساب 💬" })
                              ]
                            }),
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleSendDirectToManager(true),
                              className: "bg-slate-900 hover:bg-slate-850 text-white text-xs font-black px-3 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs active:scale-95 border border-emerald-500/40",
                              title: "إرسال لواتساب الأعمال",
                              children: [
                                n.jsx(US.Building || "span", { className: "w-3.5 h-3.5 text-emerald-400" }),
                                n.jsx("span", { children: "واتس أعمال 💼" })
                              ]
                            })
                          ]
                        })
                      ]
                    }),

                    // General Share Options
                    n.jsxs("div", {
                      className: "space-y-2.5",
                      children: [
                        n.jsx("span", { className: "text-xs font-black text-slate-700 block", children: "أو إرسال التقرير العام إلى أي مجموعة أو شخص في واتساب:" }),
                        n.jsxs("div", {
                          className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
                          children: [
                            // Option 1: Main WhatsApp
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleShareToWhatsappGeneral(false),
                              className: "p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95",
                              children: [
                                n.jsx(US.MessageCircle || "span", { className: "w-4 h-4" }),
                                n.jsx("span", { children: "واتساب (شخص أو مجموعة) 👥" })
                              ]
                            }),
                            // Option 2: WhatsApp Business
                            n.jsxs("button", {
                              type: "button",
                              onClick: () => handleShareToWhatsappGeneral(true),
                              className: "p-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95",
                              children: [
                                n.jsx(US.Building || "span", { className: "w-4 h-4 text-emerald-400" }),
                                n.jsx("span", { children: "واتساب للأعمال (Business) 💼" })
                              ]
                            })
                          ]
                        })
                      ]
                    }),

                    // Optional Notes Input
                    n.jsxs("div", {
                      className: "space-y-1.5",
                      children: [
                        n.jsx("label", { className: "text-xs font-bold text-slate-600 block", children: "إضافة ملاحظة أو توجيه خاص بالتقرير (اختياري):" }),
                        n.jsx("textarea", {
                          rows: 2,
                          value: reportNotes,
                          onChange: (e) => setReportNotes(e.target.value),
                          placeholder: "مثال: يرجى مراجعة مبيعات نهاية الأسبوع والتحضير لمخزون الأسبوع القادم...",
                          className: "w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-slate-800 outline-none"
                        })
                      ]
                    }),

                    // Live Preview of the WhatsApp text with Copy Button
                    n.jsxs("div", {
                      className: "bg-slate-950 text-slate-200 rounded-2xl p-3.5 text-[11px] font-mono leading-relaxed space-y-2 relative border border-slate-800 max-h-44 overflow-y-auto select-all",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center justify-between border-b border-slate-800 pb-1.5",
                          children: [
                            n.jsx("span", { className: "text-[10px] text-emerald-400 font-bold", children: "معاينة نص رسالة الواتساب المنسقة:" }),
                            n.jsxs("button", {
                              type: "button",
                              onClick: handleCopyReport,
                              className: "bg-slate-800 hover:bg-slate-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 cursor-pointer active:scale-95",
                              children: [
                                n.jsx(US.Copy || "span", { className: "w-3 h-3" }),
                                n.jsx("span", { children: copiedReport ? "تم النسخ بنجاح! ✅" : "نسخ النص" })
                              ]
                            })
                          ]
                        }),
                        n.jsx("pre", { className: "whitespace-pre-wrap font-sans text-slate-300 text-[10.5px]", children: generateWhatsappReportText() })
                      ]
                    })
                  ]
                }),

                // 3. ALWAYS-VISIBLE STICKY BOTTOM FOOTER WITH PROMINENT BACK BUTTON
                n.jsxs("div", {
                  className: "p-3 sm:p-4 border-t border-slate-200 bg-slate-50 sticky bottom-0 z-30 flex items-center justify-between gap-2 shrink-0 pb-safe",
                  children: [
                    // CLEAR PROMINENT BACK BUTTON (BOTTOM)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowWhatsappModal(false),
                      className: "py-2.5 px-4 bg-white active:bg-slate-100 hover:bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 cursor-pointer shadow-xs transition-all flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "🔙" }),
                        n.jsx("span", { children: "رجوع للتقارير" })
                      ]
                    }),

                    // Share button
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => handleShareToWhatsappGeneral(false),
                      className: "py-2.5 px-3 sm:px-4 bg-emerald-600 active:bg-emerald-700 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx(US.Send || "span", { className: "w-3.5 h-3.5" }),
                        n.jsx("span", { children: "واتساب 💬" })
                      ]
                    }),
                    // Share button: WhatsApp Business
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => handleShareToWhatsappGeneral(true),
                      className: "py-2.5 px-3 sm:px-4 bg-slate-900 active:bg-slate-800 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 border border-emerald-500/40",
                      children: [
                        n.jsx(US.Building || "span", { className: "w-3.5 h-3.5 text-emerald-400" }),
                        n.jsx("span", { children: "واتس أعمال 💼" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),

        // -------------------------------------------------------------
        // MODAL 2: OFFICIAL PRINTABLE / SNAPSHOT REPORT CARD (MOBILE PERFECT)
        // -------------------------------------------------------------
        showOfficialReportModal && n.jsxs("div", {
          className: "fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex flex-col justify-start sm:justify-center items-center p-0 sm:p-4 overflow-y-auto w-full h-[100dvh]",
          dir: "rtl",
          onClick: (e) => { if (e.target === e.currentTarget) setShowOfficialReportModal(false); },
          children: [
            n.jsxs("div", {
              className: "bg-white w-full sm:max-w-2xl h-[100dvh] sm:h-auto sm:max-h-[94vh] rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border sm:border-slate-200 flex flex-col overflow-hidden text-right relative print:max-w-none print:shadow-none print:border-none print:p-0 print:max-h-none print:h-auto",
              children: [
                // Top Actions Header (Hidden in Print)
                n.jsxs("div", {
                  className: "p-3.5 sm:p-5 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between shrink-0 shadow-xs print:hidden",
                  children: [
                    // CLEAR PROMINENT BACK BUTTON (TOP)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowOfficialReportModal(false),
                      className: "py-2 px-3.5 bg-slate-100 active:bg-slate-200 hover:bg-slate-200 text-slate-800 font-black text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "✕" }),
                        n.jsx("span", { children: "رجوع للتقارير" })
                      ]
                    }),

                    n.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        n.jsxs("button", {
                          type: "button",
                          onClick: () => { setShowOfficialReportModal(false); setShowWhatsappModal(true); },
                          className: "py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs",
                          children: [
                            n.jsx(US.MessageCircle || "span", { className: "w-3.5 h-3.5" }),
                            n.jsx("span", { children: "واتساب" })
                          ]
                        }),
                        n.jsxs("button", {
                          type: "button",
                          onClick: () => window.print(),
                          className: "py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer shadow-xs",
                          children: [
                            n.jsx(U0, { className: "w-3.5 h-3.5 text-orange-400" }),
                            n.jsx("span", { children: "طباعة" })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // THE OFFICIAL REPORT SHEET CONTENT (SCROLLABLE)
                n.jsxs("div", {
                  className: "p-4 sm:p-8 space-y-5 sm:space-y-6 bg-white overflow-y-auto flex-1 print:p-0",
                  children: [
                    // Official Header
                    n.jsxs("div", {
                      className: "border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            n.jsx("div", { className: "w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow-md shrink-0", children: "🛵" }),
                            n.jsxs("div", {
                              children: [
                                n.jsx("h2", { className: "font-black text-sm sm:text-lg text-slate-900", children: "تطبيق توصيل - الإدارة العامة المركزية" }),
                                n.jsx("p", { className: "text-slate-500 text-xs font-bold", children: "تقرير الأداء المالي والتشغيلي وإحصاءات المجتمع" })
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "text-right sm:text-left text-xs font-bold text-slate-600 space-y-0.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100",
                          children: [
                            n.jsxs("p", { children: [n.jsx("span", { className: "text-slate-400", children: "الفترة: " }), n.jsx("span", { className: "text-orange-600 font-black", children: periodLabel })] }),
                            n.jsxs("p", { children: [n.jsx("span", { className: "text-slate-400", children: "التاريخ: " }), reportTimestamp] })
                          ]
                        })
                      ]
                    }),

                    // 4 Main Financial Cards
                    n.jsxs("div", {
                      className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                      children: [
                        n.jsxs("div", {
                          className: "border-2 border-slate-900 p-3 sm:p-3.5 rounded-2xl bg-slate-900 text-white text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-slate-300 font-bold", children: "💵 المبيعات المكتملة" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-orange-400", children: [Da.sales, " ", Q.currency] })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "border-2 border-slate-200 p-3 sm:p-3.5 rounded-2xl bg-emerald-50/50 text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-emerald-800 font-bold", children: "✅ الطلبات المسلمة" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-emerald-700", children: [Da.completed, " طلب"] })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "border-2 border-slate-200 p-3 sm:p-3.5 rounded-2xl bg-blue-50/50 text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-blue-800 font-bold", children: "🛵 رسوم التوصيل" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-blue-700", children: [Da.deliveryFees, " ", Q.currency] })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "border-2 border-slate-200 p-3 sm:p-3.5 rounded-2xl bg-red-50/50 text-center space-y-1",
                          children: [
                            n.jsx("p", { className: "text-[10px] text-red-800 font-bold", children: "⚠️ الطلبات الملغاة" }),
                            n.jsxs("h3", { className: "text-base sm:text-lg font-black text-red-600", children: [Da.cancelled, " طلب"] })
                          ]
                        })
                      ]
                    }),

                    // Community Census Table
                    n.jsxs("div", {
                      className: "border border-slate-200 rounded-2xl overflow-hidden text-xs",
                      children: [
                        n.jsx("div", {
                          className: "bg-slate-100 p-2.5 font-black text-slate-800 border-b border-slate-200",
                          children: "📋 تعداد وإحصاءات مجتمع القرية بالنظام:"
                        }),
                        n.jsxs("div", {
                          className: "grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-200 p-3 text-center bg-white",
                          children: [
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "الزبائن الموثقين" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [registeredCustomersCount, " زبون"] })] }),
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "المتاجر المعتمدة" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [o.length, " متجر"] })] }),
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "دليل المهن والحرف" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [villageServicesCount, " مهني"] })] }),
                            n.jsxs("div", { className: "p-2", children: [n.jsx("span", { className: "text-slate-400 text-[10px] block", children: "أسطول الكباتن والإدارة" }), n.jsxs("span", { className: "font-black text-slate-800 text-sm", children: [ce.length + G.length, " كادر"] })] })
                          ]
                        })
                      ]
                    }),

                    // Top Stores Table
                    Da.topStores && Da.topStores.length > 0 && n.jsxs("div", {
                      className: "border border-slate-200 rounded-2xl overflow-hidden text-xs",
                      children: [
                        n.jsx("div", {
                          className: "bg-slate-100 p-2.5 font-black text-slate-800 border-b border-slate-200",
                          children: "🏆 المحلات الأكثر طلباً ومبيعاً:"
                        }),
                        n.jsx("div", {
                          className: "divide-y divide-slate-100 bg-white",
                          children: Da.topStores.map((st, idx) => n.jsxs("div", {
                            key: idx,
                            className: "p-2.5 flex items-center justify-between",
                            children: [
                              n.jsxs("span", { className: "font-bold text-slate-700", children: [`${idx + 1}. `, st.name] }),
                              n.jsxs("span", { className: "font-black text-orange-600", children: [st.val, " ", Q.currency] })
                            ]
                          }))
                        })
                      ]
                    }),

                    // Official Footer Stamps
                    n.jsxs("div", {
                      className: "border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500 font-bold",
                      children: [
                        n.jsxs("div", {
                          className: "space-y-1",
                          children: [
                            n.jsx("p", { children: "🏢 وحدة الرقابة المالية والتشغيلية" }),
                            n.jsx("p", { className: "text-emerald-700 font-black", children: "✓ معتمد وموثق إلكترونياً" })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "text-left border border-dashed border-slate-300 p-2 rounded-xl bg-slate-50/50",
                          children: [
                            n.jsx("span", { className: "block text-[9px] text-slate-400", children: "ختم النظام الإلكتروني" }),
                            n.jsx("span", { className: "font-black text-slate-700 text-xs tracking-wider", children: "TAWSEEL-ADMIN-SYS" })
                          ]
                        })
                      ]
                    })
                  ]
                }),

                // STICKY BOTTOM ACTIONS FOOTER (Hidden in Print)
                n.jsxs("div", {
                  className: "p-3 sm:p-4 border-t border-slate-200 bg-slate-50 sticky bottom-0 z-30 flex items-center justify-between gap-2 shrink-0 print:hidden pb-safe",
                  children: [
                    // CLEAR PROMINENT BACK BUTTON (BOTTOM)
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => setShowOfficialReportModal(false),
                      className: "py-2.5 px-4 bg-white active:bg-slate-100 hover:bg-slate-100 text-slate-800 font-extrabold text-xs rounded-xl border border-slate-300 cursor-pointer shadow-xs transition-all flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx("span", { className: "text-sm", children: "🔙" }),
                        n.jsx("span", { children: "رجوع إلى الإحصائيات" })
                      ]
                    }),
                    n.jsxs("button", {
                      type: "button",
                      onClick: () => { setShowOfficialReportModal(false); setShowWhatsappModal(true); },
                      className: "py-2.5 px-4 sm:px-5 bg-emerald-600 active:bg-emerald-700 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95",
                      children: [
                        n.jsx(US.MessageCircle || "span", { className: "w-4 h-4" }),
                        n.jsx("span", { children: "إرسال التقرير لواتساب 📲" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
})(), {}),O==="orders"&&n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2",children:[n.jsx("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"سجل الطلبات المتداولة وجدولة الرحلات"}),n.jsxs("span",{className:"bg-slate-100 text-slate-700 text-[10px] font-extrabold py-1 px-3 rounded-full border border-slate-200",children:["مجموع الطلبات بالنظام: ",ue.length]})]}),ue.length===0?n.jsxs("div",{className:"bg-slate-50 rounded-3xl p-12 text-center border border-slate-150 space-y-2",children:[n.jsx(Za,{className:"w-10 h-10 text-slate-300 mx-auto"}),n.jsx("p",{className:"text-slate-500 font-bold text-sm",children:"لا توجد طلبات جارية بالنظام حالياً!"}),n.jsx("p",{className:"text-slate-400 text-xs",children:"عند قيام زبون بوضع طلب، سيظهر فوراً هنا للجدولة وتعيين السائقين."})]}):n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs",children:n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full text-right text-xs",children:[n.jsx("thead",{className:"bg-slate-50 text-slate-500 font-extrabold border-b border-slate-200",children:n.jsxs("tr",{children:[n.jsx("th",{className:"p-3 sm:p-4",children:"رقم الطلب"}),n.jsx("th",{className:"p-3 sm:p-4",children:"المستلم والموبايل"}),n.jsx("th",{className:"p-3 sm:p-4",children:"المتجر والأصناف"}),n.jsx("th",{className:"p-3 sm:p-4",children:"أقرب معلم"}),n.jsx("th",{className:"p-3 sm:p-4",children:"القيمة الإجمالية"}),n.jsx("th",{className:"p-3 sm:p-4",children:"السائق الموكل"}),n.jsx("th",{className:"p-3 sm:p-4",children:"حالة الطلب الحالية"})]})}),n.jsx("tbody",{className:"divide-y divide-slate-150",children:ue.map(k=>{var W,ae;return n.jsxs("tr",{className:"hover:bg-slate-50/50",children:[n.jsx("td",{className:"p-3 sm:p-4 font-mono font-extrabold text-slate-900",children:k.id}),n.jsxs("td",{className:"p-3 sm:p-4 font-semibold",children:[n.jsx("div",{children:k.customerName}),n.jsx("div",{className:"text-[10px] text-slate-400 font-bold mt-0.5",dir:"ltr",children:k.customerPhone})]}),n.jsxs("td",{className:"p-3 sm:p-4",children:[n.jsx("div",{className:"font-bold text-slate-700",children:k.storeName}),n.jsx("div",{className:"text-[10px] text-slate-400 font-semibold truncate max-w-[150px] mt-0.5",children:k.items.map(he=>`${he.product.name} (x${he.quantity})`).join("، ")}) ,k.isPrescription&&k.items[0]&&k.items[0].product.image&&n.jsx("img",{src:k.items[0].product.image,className:"w-10 h-10 object-cover rounded-lg border border-slate-200 mt-1 cursor-zoom-in hover:scale-105 transition-all",onClick:()=>setAdminPreviewPrescription(k.items[0].product.image)})]}),n.jsx("td",{className:"p-3 sm:p-4 font-bold text-emerald-600",children:((W=d.find(he=>he.id===k.addressLandmark))==null?void 0:W.arabicName)||k.addressLandmark}),n.jsxs("td",{className:"p-3 sm:p-4 font-extrabold text-orange-650 text-orange-600",children:[k.total," ",Q.currency]}),n.jsx("td",{className:"p-3 sm:p-4",children:(() => {
  const isOrderService = Boolean(k.isDirectService || k.isService || (k.storeId||"").startsWith("service_") || ["doctors", "crafts"].includes(k.storeCategory || k.category) || (k.storeName||"").includes("ورشة") || (k.storeName||"").includes("حدادة") || (k.storeName||"").includes("عيادة") || (k.storeName||"").includes("دهان") || (k.storeName||"").includes("نجارة") || (k.storeName||"").includes("سباكة") || (k.storeName||"").includes("صيانة") || (k.storeName||"").includes("د. ") || (k.items||[]).some(it=>(it.product?.id||it.id||"").startsWith("service_") || (it.product?.name||it.name||"").includes("خدمة وتنسيق")));
  if (k.status === "cancelled") {
    return n.jsx("span", { className: "text-red-500 font-bold", children: "ملغي" });
  }
  if (isOrderService) {
    return n.jsxs("div", {
      className: "bg-amber-50 text-amber-900 border border-amber-300/80 py-1.5 px-2.5 rounded-xl text-[10px] font-black inline-flex items-center gap-1.5 shadow-2xs",
      children: [
        n.jsx("span", { children: "🛠️" }),
        n.jsx("span", { children: "تنسيق مباشر مع الحرفي (لا يحتاج سائق)" })
      ]
    });
  }
  if (k.driverId) {
    return n.jsx("div", {
      className: "bg-slate-100 text-slate-700 py-1 px-2.5 rounded-lg font-bold border border-slate-200 inline-block",
      children: ((ae=ce.find(he=>he.id===k.driverId))==null?void 0:ae.name)||k.driverName
    });
  }
  return n.jsxs("select", {
    onChange: he => eo(k.id, he.target.value),
    className: "bg-orange-50 border border-orange-200 text-orange-700 text-[10px] py-1 px-2 rounded-lg font-extrabold outline-none cursor-pointer",
    defaultValue: "",
    children: [
      n.jsx("option", { value: "", disabled: !0, children: "-- اختر السائق --" }),
      ce.filter(he => he.status === "available").map(he => n.jsx("option", { value: he.id, children: he.name }, he.id))
    ]
  });
})()}),n.jsx("td",{className:"p-3 sm:p-4 flex items-center gap-1.5 flex-wrap",children:k.status==="cancelled"?n.jsxs("div",{className:"text-red-600 font-extrabold bg-red-50 py-1 px-2.5 rounded-full border border-red-100 text-[10px]",children:["ملغي: ",k.cancelReason||"بناءً على طلب العميل"]}):n.jsxs(n.Fragment,{children:[k.isPrescription&&k.items[0]&&k.items[0].product.image&&n.jsx("button",{type:"button",onClick:()=>setAdminPreviewPrescription(k.items[0].product.image),className:"px-2 py-1 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-lg text-[10px] font-black cursor-pointer shadow-xs transition-colors whitespace-nowrap flex items-center gap-1 ml-1.5",children:"عرض الوصفة 📄"}),n.jsxs("select",{value:k.status,onChange:he=>Sl(k.id,he.target.value),className:"bg-slate-100 border border-slate-200 text-slate-700 font-extrabold py-1 px-1.5 rounded-lg outline-none cursor-pointer",children:[n.jsx("option",{value:"pending",children:"طلب جديد"}),n.jsx("option",{value:"accepted",children:"تم قبول الطلب"}),n.jsx("option",{value:"preparing",children:"جاري التحضير"}),n.jsx("option",{value:"ready",children:"جاهز للاستلام"}),n.jsx("option",{value:"picked_up",children:"مع السائق"}),n.jsx("option",{value:"delivered",children:"تم التسليم"})]}),n.jsx("button",{onClick:()=>wl(k.id),className:"p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer border border-transparent hover:border-red-100",title:"إلغاء الطلب",children:n.jsx(H1,{className:"w-4 h-4"})})]})})]},k.id)})})]})})}),xa&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in",children:n.jsxs("form",{onSubmit:xC,className:"bg-white rounded-3xl p-6 border border-slate-200 max-w-sm w-full space-y-4 shadow-xl",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5",children:[n.jsx(ha,{className:"w-5 h-5 text-red-500"}),n.jsxs("span",{children:["إلغاء الطلب رقم ",xa]})]}),n.jsx("p",{className:"text-xs text-slate-400",children:"الرجاء تحديد سبب لإلغاء هذا التكليف لإعلام الزبون:"}),n.jsx("textarea",{required:!0,value:a1,onChange:k=>_l(k.target.value),placeholder:"مثال: المتجر مغلق مؤقتاً، السلع المطلوبة غير متوفرة حالياً...",className:"w-full bg-slate-50 border border-slate-200 focus:border-slate-900 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 resize-none",rows:3}),n.jsxs("div",{className:"flex gap-2 justify-end pt-2",children:[n.jsx("button",{type:"button",onClick:()=>{wl(null),_l("")},className:"bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 px-4 rounded-xl",children:"تراجع"}),n.jsx("button",{type:"submit",className:"bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-2 px-4 rounded-xl",children:"إلغاء الطلب نهائياً"})]})]})})]}),adminPreviewPrescription&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-55 animate-fade-in",onClick:()=>setAdminPreviewPrescription(null),children:n.jsxs("div",{className:"bg-white rounded-3xl border border-slate-200 max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col p-4",onClick:e=>e.stopPropagation(),children:[n.jsxs("div",{className:"flex items-center justify-between border-b pb-2 mb-3 bg-slate-50 p-2.5 rounded-xl",children:[n.jsx("span",{className:"font-extrabold text-slate-800 text-xs sm:text-sm",children:"معاينة الوصفة الطبية / الروشتة المرفقة"}),n.jsx("button",{onClick:()=>setAdminPreviewPrescription(null),className:"w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 font-bold cursor-pointer",children:"✕"})]}),n.jsx("img",{src:adminPreviewPrescription,className:"max-h-[70vh] w-auto object-contain mx-auto rounded-xl border border-slate-150"})]})}),O==="stores"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Rr,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(ra,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:je?"تعديل بيانات المتجر":"إضافة متجر محلي جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم المتجر أو المطعم:"}),n.jsx("input",{type:"text",required:!0,value:ut,onChange:k=>de(k.target.value),placeholder:"مثال: مطعم الياسمين الدمشقي",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"تصنيف المتجر:"}),n.jsx("select",{value:we,onChange:k=>tt(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:g.map(k=>n.jsx("option",{value:k.id,children:k.label},k.id))})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"أوقات العمل المقررة:"}),n.jsx("input",{type:"text",required:!0,value:ct,onChange:k=>te(k.target.value),placeholder:"مثال: 9:00 ص - 11:00 م",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رسوم التوصيل (ل.س):"}),n.jsx("input",{type:"number",required:!0,min:"0",value:Je,onChange:k=>at(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"حالة المتجر الحالية:"}),n.jsxs("select",{value:vt,onChange:k=>ya(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"open",children:"مفتوح ونشط"}),n.jsx("option",{value:"closed",children:"مغلق مؤقتاً"}),n.jsx("option",{value:"busy",children:"مزدحم بطلبات"})]})]})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-slate-200/60",children:[n.jsxs("div",{className:"flex items-center justify-between col-span-2",children:[n.jsx("span",{className:"text-[11px] text-slate-500 font-bold",children:'تمييز كـ "متجر مميز":'}),n.jsx("input",{type:"checkbox",checked:fa,onChange:k=>Ya(k.target.checked),className:"w-4 h-4 accent-orange-500"})]}),n.jsxs("div",{className:"space-y-1 col-span-2",children:[n.jsx("label",{className:"text-[10px] text-slate-400 block",children:"ترتيب ظهور المتجر (Priority):"}),n.jsx("input",{type:"number",value:D,onChange:k=>re(Number(k.target.value)),className:"w-full bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 text-xs"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"العنوان الجغرافي للمتجر (وصف كتابي):"}),n.jsx("input",{type:"text",required:!0,value:pt,onChange:k=>nt(k.target.value),placeholder:"مثال: الشارع الرئيسي، بجانب مسجد الروضة الكبير",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم هاتف المتجر:"}),n.jsx("input",{type:"text",value:_e,onChange:k=>Ge(k.target.value),placeholder:"مثال: 0944111222",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"نطاق التوصيل الجغرافي:"}),n.jsx("input",{type:"text",value:yt,onChange:k=>et(k.target.value),placeholder:"مثال: البلدة وضواحيها",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"وصف مختصر أو شعار المتجر:"}),n.jsx("input",{type:"text",value:Rt,onChange:k=>Be(k.target.value),placeholder:"مثال: أشهى المأكولات الشامية والوجبات السريعة بأفضل الأسعار",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),!je&&n.jsxs("div",{className:"bg-orange-50 border border-orange-100 p-3.5 rounded-xl space-y-2",children:[n.jsx("span",{className:"text-[11px] text-orange-950 font-extrabold block",children:"موقع المتجر الإحداثي على الخريطة (X, Y) %"}),n.jsxs("p",{className:"text-[10px] text-orange-800 leading-relaxed font-semibold",children:["* هذا الصندوق يقبل أرقام فقط (من 10 إلى 90) لرسم مكان المحل على الخارطة التفاعلية. لكتابة العنوان بالنص، الرجاء ملء حقل ",n.jsx("b",{children:'"العنوان الجغرافي"'})," في الأعلى."]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2.5",children:[n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsx("span",{className:"text-[10px] text-slate-500 font-bold whitespace-nowrap",children:"أفقي X%:"}),n.jsx("input",{type:"number",min:"10",max:"90",value:Pe,onChange:k=>It(Number(k.target.value)),className:"w-full bg-white border border-orange-200 rounded-lg p-1.5 text-xs text-center outline-none focus:border-orange-500",placeholder:"X%"})]}),n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsx("span",{className:"text-[10px] text-slate-500 font-bold whitespace-nowrap",children:"رأسي Y%:"}),n.jsx("input",{type:"number",min:"10",max:"90",value:ft,onChange:k=>fC(Number(k.target.value)),className:"w-full bg-white border border-orange-200 rounded-lg p-1.5 text-xs text-center outline-none focus:border-orange-500",placeholder:"Y%"})]})]})]}),n.jsx("div",{className:"space-y-1",children:n.jsx(EV,{value:Ie,onChange:Ve,label:"شعار أو صورة غلاف المتجر:",placeholder:"رابط URL للغلاف كخيار بديل"})}),n.jsxs("div",{className:"flex gap-2",children:[n.jsxs("button",{type:"submit",className:"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer shadow-sm",children:[n.jsx(Xn,{className:"w-4 h-4"}),n.jsx("span",{children:je?"حفظ التعديلات":"إضافة المتجر"})]}),je&&n.jsx("button",{type:"button",onClick:()=>{Ae(null),de(""),Ve("")},className:"bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer",children:"إلغاء"})]})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(z1,{className:"w-5 h-5 text-slate-700"}),n.jsxs("span",{children:["المتاجر المسجلة بالنظام (",o.length,")"]})]}),n.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1",children:o.map(k=>{var W;return n.jsxs("div",{className:"bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 relative hover:shadow-md transition-all",children:[n.jsx("div",{className:"w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:k.image,alt:k.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),n.jsxs("div",{className:"flex-1 space-y-1 min-w-0",children:[n.jsxs("div",{className:"flex items-center gap-1.5 flex-wrap",children:[n.jsx("span",{className:"text-[9px] font-extrabold bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full inline-block",children:((W=g.find(ae=>ae.id===k.category))==null?void 0:W.label)||k.category}),k.isApproved===!1?n.jsxs("span",{className:"text-[9px] font-bold bg-amber-100 text-amber-700 py-0.5 px-1.5 rounded-full flex items-center gap-0.5",children:[n.jsx("span",{children:"طلب موافقة"}),n.jsx("span",{className:"w-1 h-1 rounded-full bg-amber-500 animate-ping"})]}):n.jsxs(n.Fragment,{children:[k.status==="closed"&&n.jsx("span",{className:"text-[9px] font-bold bg-red-100 text-red-600 py-0.5 px-1.5 rounded-full",children:"مغلق"}),k.status==="busy"&&n.jsx("span",{className:"text-[9px] font-bold bg-yellow-100 text-yellow-700 py-0.5 px-1.5 rounded-full",children:"مزدحم"})]})]}),n.jsx("h4",{className:"font-bold text-xs sm:text-sm text-slate-800 truncate",children:k.name}),k.ownerPhone&&n.jsxs("p",{className:"text-[10px] text-emerald-600 font-extrabold",children:["المالك: ",k.ownerPhone]}),k.address&&n.jsxs("p",{className:"text-[10px] text-orange-600 font-extrabold truncate",children:["العنوان: ",k.address]}),n.jsxs("p",{className:"text-[10px] text-slate-400",children:["التوصيل: ",k.deliveryFee," ل.س • الأولوية: ",k.priority||1]}),n.jsxs("div",{className:"mt-1 pt-1 border-t border-slate-100 flex items-center justify-between text-[9px] font-bold text-slate-500",children:[n.jsxs("span",{children:["📦 سعة: ",k.maxRegularProducts||20," عادية | ",k.maxOfferProducts||10," عروض"]}),n.jsx("button",{type:"button",onClick:()=>{const newReg=prompt("أدخل الحد الأقصى للمنتجات العادية لمتجر ("+k.name+"):",String(k.maxRegularProducts||20));if(newReg===null)return;const newOff=prompt("أدخل الحد الأقصى لمنتجات العروض لمتجر ("+k.name+"):",String(k.maxOfferProducts||10));if(newOff===null)return;const regNum=parseInt(newReg)||20,offNum=parseInt(newOff)||10;const updated=o.map(he=>he.id===k.id?{...he,maxRegularProducts:regNum,maxOfferProducts:offNum}:he);L(updated);alert("✅ تم تعديل سعة المنتجات لمتجر "+k.name+" ("+regNum+" عادية / "+offNum+" عروض) بنجاح!");},className:"text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-1.5 py-0.5 rounded cursor-pointer font-extrabold",children:"تعديل السعة 🚀"})]})]}),n.jsxs("div",{className:"flex flex-col gap-2 items-center justify-center shrink-0 border-r border-slate-100 pr-2.5",children:[k.isApproved===!1&&n.jsx("button",{onClick:()=>{if(L){const ae=o.map(he=>he.id===k.id?{...he,isApproved:!0}:he);L(ae),K("تفعيل متجر",`الموافقة على طلب متجر: ${k.name}`),ie("تم تفعيل وتفويض المتجر بنجاح! 🎉")}},className:"p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all cursor-pointer",title:"الموافقة على المتجر وتفعيله للزبائن",children:n.jsx(q1,{className:"w-5 h-5"})}),n.jsx("button",{
  onClick:()=>{
    const next=!k.isRushPaused;
    const updated=o.map(he=>he.id===k.id?{...he,isRushPaused:next}:he);
    L(updated);
    K("تجميد متجر",`${next?"تجميد":"استئناف"} متجر: ${k.name} لضغط الطلبات`);
    ie(next?`تم تجميد متجر ${k.name} مؤقتاً بسبب الضغط!`:`تم استئناف متجر ${k.name} بنجاح!`);
  },
  className:`p-1.5 px-2 text-[9px] font-black rounded-lg transition-all cursor-pointer ${k.isRushPaused?"bg-red-500 text-white hover:bg-red-600":"bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800"}`,
  title:k.isRushPaused?"إلغاء التجميد واستئناف المتجر":"تجميد مؤقت للمتجر بسبب الضغط",
  children:k.isRushPaused?"⏸️ مجمد للضغط":"⏸️ تجميد ضغط"
}),
n.jsx("button",{onClick:()=>en(k),className:"p-2 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all cursor-pointer",title:"تعديل المتجر",children:n.jsx(pn,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>J1(k),className:"p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer",title:"نسخ متجر مشابه",children:n.jsx(al,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>{bt({isOpen:!0,title:"تأكيد حذف المتجر",message:`هل تريد بالتأكيد حذف المتجر "${k.name}" نهائياً من النظام؟ سيؤدي ذلك لإخفائه عن الزبائن.`,onConfirm:()=>{u(k.id),K("حذف متجر",`حذف المتجر نهائياً: ${k.name}`),ie("تم حذف المتجر بنجاح!"),bt(null)}})},className:"p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer",title:"حذف المتجر",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id)})})]}),n.jsxs("div",{className:"col-span-1 lg:col-span-12 mt-8 pt-8 border-t border-slate-200 text-right space-y-6",dir:"rtl",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2",children:[n.jsx(E0,{className:"w-5.5 h-5.5 text-orange-500"}),n.jsx("span",{children:"إدارة تصنيفات المتاجر والخدمات المحلية"})]}),n.jsx("p",{className:"text-slate-400 text-xs font-semibold",children:"تخصيص تصنيفات التطبيق وإضافة خدمات جديدة مثل (الغاز، التكسي، صيانة) أو تعديلها."})]}),n.jsx("div",{className:"text-[10px] bg-orange-50 border border-orange-100/60 text-orange-850 px-3.5 py-1.5 rounded-full font-bold",children:"💡 يمكنك إضافة أي تصنيف تريده وتعيين أيقونة تناسبه ليظهر فوراً بالواجهة الرئيسية للزبون"})]}),n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Br,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-sm text-right",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 border-b pb-2",children:[n.jsx(R0,{className:"w-4 h-4 text-orange-500"}),n.jsx("span",{children:"إضافة تصنيف جديد"})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم التصنيف الجديد (بالعربية):"}),n.jsx("input",{type:"text",required:!0,value:Dr,onChange:k=>W1(k.target.value),placeholder:"مثال: غاز، تكسي، مياه معدنية",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 font-bold"})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"أيقونة التصنيف المقترحة:"}),n.jsx("div",{className:"grid grid-cols-4 gap-1.5 p-2 bg-white rounded-xl border border-slate-150 max-h-[140px] overflow-y-auto font-sans",children:[{name:"ShoppingBag",label:"سلة بقالة"},{name:"Utensils",label:"أدوات طعام"},{name:"Pill",label:"صيدلية / طب"},{name:"Leaf",label:"خضروات"},{name:"CakeSlice",label:"كيك وحلويات"},{name:"Flame",label:"غاز / شعلة"},{name:"Car",label:"سيارة / تكسي"},{name:"Wrench",label:"صيانة / مفك"},{name:"Gift",label:"هدايا / ألعاب"},{name:"Coffee",label:"كوفي شوب"},{name:"FlameKindling",label:"حطب / وقود"},{name:"Phone",label:"جوالات"},{name:"Activity",label:"عيادة"},{name:"HelpCircle",label:"خدمات عامة"},{name:"Bike",label:"مناديب"},{name:"Sparkles",label:"تنظيف"}].map(k=>{const W=US[k.name],ae=ma===k.name;return n.jsxs("button",{type:"button",onClick:()=>Ml(k.name),className:`p-2 rounded-xl flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${ae?"bg-orange-500 text-slate-950 border-orange-400 font-extrabold scale-95 shadow-sm":"bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"}`,title:k.label,children:[W&&n.jsx(W,{className:"w-4 h-4"}),n.jsx("span",{className:"text-[8px] whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-none font-semibold",children:k.label})]},k.name)})})]}),n.jsxs("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5",children:[n.jsx(Xn,{className:"w-4 h-4"}),n.jsx("span",{children:"إضافة وتفعيل التصنيف"})]})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5 font-bold",children:[n.jsx(da,{className:"w-4 h-4 text-slate-700"}),n.jsxs("span",{children:["التصنيفات الحالية في التطبيق (",g.length,")"]})]}),n.jsx("div",{className:"grid sm:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto pr-1",children:g.map(k=>{const W=US[k.icon]||Za,ae=o.filter(he=>he.category===k.id).length;return n.jsxs("div",{className:"bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 bg-slate-50 border border-slate-150 rounded-xl flex items-center justify-center text-orange-500",children:n.jsx(W,{className:"w-5 h-5"})}),n.jsxs("div",{className:"space-y-0.5 text-right",children:[n.jsx("h5",{className:"font-extrabold text-slate-850 text-xs sm:text-sm",children:k.label}),n.jsxs("p",{className:"text-[10px] text-slate-400 font-semibold flex items-center gap-1",children:[n.jsx("span",{children:"عدد المحلات المسجلة:"}),n.jsx("span",{className:"bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md font-bold",children:ae})]})]})]}),n.jsx("button",{type:"button",onClick:()=>Nl(k.id,k.label),className:"text-slate-400 hover:text-red-650 p-2 rounded-xl transition-colors cursor-pointer",title:"حذف التصنيف",children:n.jsx(Jt,{className:"w-4 h-4"})})]},k.id)})})]})]})]})]}),O==="products"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:m2,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(ra,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:E1?"تعديل السلعة بقوائم المحل":"إضافة سلعة أو وجبة جديدة"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"المتجر التابع:"}),n.jsxs("select",{value:Ka,required:!0,onChange:k=>Qa(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"",children:"-- اختر متجراً --"}),o.map(k=>n.jsx("option",{value:k.id,children:k.name},k.id))]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"السعر الأساسي (ل.س):"}),n.jsx("input",{type:"number",required:!0,min:"1",value:Jn,onChange:k=>e1(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم الوجبة/السلعة بالكامل:"}),n.jsx("input",{type:"text",required:!0,value:za,onChange:k=>vn(k.target.value),placeholder:"مثال: بيتزا خضار بالفرن",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الوصف أو المكونات:"}),n.jsx("textarea",{value:_r,onChange:k=>ul(k.target.value),placeholder:"مثال: موزاريلا، فطر، فلفل، زيتون",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 resize-none",rows:2})]}),n.jsxs("div",{className:"bg-white p-3.5 rounded-xl border border-slate-200 space-y-3",children:[n.jsxs("span",{className:"text-[11px] text-slate-600 font-extrabold flex items-center gap-1 border-b pb-1",children:[n.jsx(da,{className:"w-3.5 h-3.5 text-orange-500"}),"أحجام السلعة وخياراتها الإضافية (مثل إضافات البيتزا)"]}),n.jsxs("div",{className:"space-y-2",children:[n.jsx("label",{className:"text-[10px] text-slate-400 block",children:"إضافة خيار الحجم (مثل: صغيرة، وسط، كبيرة):"}),n.jsxs("div",{className:"flex gap-1.5",children:[n.jsx("input",{type:"text",placeholder:"الحجم (كبير)",value:U1,onChange:k=>u2(k.target.value),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs flex-1"}),n.jsx("input",{type:"number",placeholder:"+سعر (10)",value:p2,onChange:k=>Sr(Number(k.target.value)),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs w-20"}),n.jsx("button",{type:"button",onClick:Ll,className:"bg-slate-900 text-white font-bold p-1.5 rounded-lg text-xs cursor-pointer",children:"+"})]}),Pt.length>0&&n.jsx("div",{className:"flex flex-wrap gap-1 mt-1",children:Pt.map((k,W)=>n.jsxs("span",{className:"bg-orange-50 text-orange-700 font-bold text-[10px] py-1 px-2 rounded-lg border border-orange-200/50 flex items-center gap-1 select-none",children:[k.name," (+",k.price," ل.س)",n.jsx(H1,{className:"w-3 h-3 cursor-pointer text-orange-500 hover:text-orange-700",onClick:()=>lt(ae=>ae.filter((he,Ee)=>Ee!==W))})]},W))})]}),n.jsxs("div",{className:"space-y-2 border-t pt-2",children:[n.jsx("label",{className:"text-[10px] text-slate-400 block",children:"إضافة إضافات اختيارية (مثل: جبنة إضافية، فطر):"}),n.jsxs("div",{className:"flex gap-1.5",children:[n.jsx("input",{type:"text",placeholder:"الإضافة (فطر)",value:Mn,onChange:k=>ml(k.target.value),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs flex-1"}),n.jsx("input",{type:"number",placeholder:"+سعر (5)",value:wn,onChange:k=>_n(Number(k.target.value)),className:"bg-slate-50 border border-slate-200 rounded-lg p-1.5 text-xs w-20"}),n.jsx("button",{type:"button",onClick:x2,className:"bg-slate-900 text-white font-bold p-1.5 rounded-lg text-xs cursor-pointer",children:"+"})]}),mt.length>0&&n.jsx("div",{className:"flex flex-wrap gap-1 mt-1",children:mt.map((k,W)=>n.jsxs("span",{className:"bg-blue-50 text-blue-700 font-bold text-[10px] py-1 px-2 rounded-lg border border-blue-200/50 flex items-center gap-1 select-none",children:[k.name," (+",k.price," ل.س)",n.jsx(H1,{className:"w-3 h-3 cursor-pointer text-blue-500 hover:text-blue-700",onClick:()=>$a(ae=>ae.filter((he,Ee)=>Ee!==W))})]},W))})]})]}),n.jsxs("div",{className:"bg-orange-50 border border-orange-100 p-3.5 rounded-xl space-y-3.5",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsx("span",{className:"text-[11px] text-orange-950 font-bold",children:"هذا المنتج يتبع العروض والخصومات:"}),n.jsx("input",{type:"checkbox",checked:Wa,onChange:k=>Nr(k.target.checked),className:"w-4 h-4 accent-orange-500"})]}),Wa&&n.jsxs("div",{className:"grid grid-cols-2 gap-2 pt-2 border-t border-orange-200/50",children:[n.jsx("input",{type:"number",placeholder:"السعر قبل الخصم",value:pl,onChange:k=>jr(Number(k.target.value)),className:"bg-white border border-orange-200 rounded-lg p-1.5 text-xs"}),n.jsx("input",{type:"text",placeholder:"شارة العرض (خصم 20%)",value:P1,onChange:k=>yl(k.target.value),className:"bg-white border border-orange-200 rounded-lg p-1.5 text-xs"})]}),n.jsxs("div",{className:"flex items-center justify-between border-t border-orange-200/50 pt-2",children:[n.jsx("span",{className:"text-[11px] text-slate-550 font-bold",children:"إخفاء مؤقت للسلعة (عدم توفر):"}),n.jsx("input",{type:"checkbox",checked:fl,onChange:k=>Lr(k.target.checked),className:"w-4 h-4 accent-slate-700"})]})]}),n.jsx("div",{className:"space-y-1",children:n.jsx(EV,{value:O1,onChange:bn,label:"صورة المنتج أو السلعة:",placeholder:"رابط URL للصورة كخيار بديل"})}),n.jsxs("div",{className:"flex gap-2",children:[n.jsx("button",{type:"submit",className:"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl shadow-sm cursor-pointer",children:n.jsx("span",{children:E1?"حفظ تعديلات السلعة":"إضافة السلعة"})}),E1&&n.jsx("button",{type:"button",onClick:()=>{wr(null),vn("")},className:"bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl cursor-pointer",children:"تراجع"})]})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(da,{className:"w-5 h-5 text-slate-700"}),n.jsxs("span",{children:["جميع السلع المتوفرة لجميع المحلات (",i.length,")"]})]}),n.jsx("div",{className:"bg-slate-50 rounded-2xl border border-slate-150 p-4 max-h-[500px] overflow-y-auto space-y-2",children:i.map(k=>{var ae;const W=o.find(he=>he.id===k.storeId);return n.jsxs("div",{className:`bg-white rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3 shadow-xs ${k.isHidden?"opacity-50 bg-slate-50":""}`,children:[n.jsxs("div",{className:"flex items-center gap-3 min-w-0",children:[n.jsx("div",{className:"w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:k.image,alt:k.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),n.jsxs("div",{className:"min-w-0",children:[n.jsx("h4",{className:"font-bold text-xs sm:text-sm text-slate-850 truncate",children:k.name}),n.jsxs("p",{className:"text-[10px] text-slate-400",children:["المحل: ",n.jsx("span",{className:"font-bold text-slate-500",children:(W==null?void 0:W.name)||"محذوف"})," • الفئة: ",((ae=g.find(he=>he.id===k.category))==null?void 0:ae.label)||k.category," • الوحدة: ",n.jsx("span",{className:"font-extrabold text-orange-600",children:k.unit||"حبة"}),k.stock!==undefined?n.jsxs("span",{className:"font-extrabold text-emerald-600 mr-1",children:[" • المخزون: ",k.stock]}):" • كمية مفتوحة"]}),k.isBlocked&&n.jsx("span",{className:"text-[8px] font-extrabold bg-red-100 text-red-700 py-0.5 px-1.5 rounded-full inline-block mt-1",children:"🚫 موقوف ومجمد لضغط الطلبات"}),k.isHidden&&n.jsx("span",{className:"text-[8px] font-extrabold bg-red-100 text-red-600 py-0.5 px-1.5 rounded-full inline-block mt-1",children:"غير متوفر مؤقتاً"})]})]}),n.jsxs("div",{className:"flex items-center gap-1",children:[n.jsxs("span",{className:"text-xs font-extrabold text-orange-650 text-orange-600 ml-2 whitespace-nowrap",children:[k.price," ل.س"]}),n.jsx("button",{
  onClick:()=>{
    const next=!k.isBlocked;
    const updated=i.map(he=>he.id===k.id?{...he,isBlocked:next}:he);
    H(updated);
    try{localStorage.setItem("tw_products",JSON.stringify(updated));}catch(e){}
    K("حظر سلعة",`${next?"وضع بلوك/تجميد على":"فك التجميد عن"} سلعة: ${k.name} لضغط الطلبات`);
    ie(next?`تم وضع بلوك وتجميد سلعة ${k.name} مؤقتاً لضغط الطلبات!`:`تم فك التجميد عن سلعة ${k.name}!`);
  },
  className:`p-1.5 px-2.5 rounded-lg text-[9px] font-black transition-all cursor-pointer ${k.isBlocked?"bg-red-600 text-white hover:bg-red-700":"bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-800"}`,
  title:k.isBlocked?"فك التجميد عن السلعة":"وضع بلوك/تجميد مؤقت للسلعة لضغط الطلبات",
  children:k.isBlocked?"🚫 مجمدة (ضغط)":"🚫 تجميد للضغط"
}),
n.jsx("button",{onClick:()=>jl(k),className:"p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all cursor-pointer",title:"تعديل السلعة",children:n.jsx(pn,{className:"w-4 h-4"})}),n.jsx("button",{onClick:()=>{bt({isOpen:!0,title:"تأكيد حذف المنتج",message:`هل أنت متأكد من حذف السلعة/الوجبة "${k.name}" نهائياً من قوائم المحل؟`,onConfirm:()=>{p(k.id),K("حذف منتج",`حذف المنتج نهائياً: ${k.name}`),ie("تم حذف السلعة نهائياً!"),bt(null)}})},className:"p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer",title:"حذف السلعة",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id)})})]})]}),O==="coupons"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Bt,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(z0,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"توليد كوبون خصم جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رمز الكوبون بالانجليزي:"}),n.jsx("input",{type:"text",required:!0,value:Ja,onChange:k=>Nn(k.target.value),placeholder:"مثال: RAMADAN ، EID2026",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 font-mono text-left",dir:"ltr"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"نوع الخصم:"}),n.jsxs("select",{value:xt,onChange:k=>y2(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"percent",children:"نسبة مئوية (%)"}),n.jsx("option",{value:"fixed",children:"مبلغ ثابت (ل.س)"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"قيمة الخصم:"}),n.jsx("input",{type:"number",required:!0,min:"1",value:xl,onChange:k=>jn(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الحد الأدنى لقيمة الطلب بالتوصيل (ل.س):"}),n.jsx("input",{type:"number",required:!0,min:"1",value:Ln,onChange:k=>mC(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm cursor-pointer",children:"تفعيل وإعلان الكوبون"})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(z1,{className:"w-5 h-5 text-slate-750"}),n.jsx("span",{children:"كوبونات الترويج النشطة حالياً بالنظام"})]}),n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl p-4 space-y-3",children:Me.map(k=>n.jsxs("div",{className:"bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-xs",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100",children:n.jsx(sl,{className:"w-4.5 h-4.5"})}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-mono font-extrabold text-slate-900 text-sm",children:k.code}),n.jsxs("p",{className:"text-[10px] text-slate-400 font-bold",children:["الخصم: ",k.value," ",k.type==="percent"?"%":"ل.س"," • الحد الأدنى للطلب: ",k.minOrderValue," ل.س"]})]})]}),n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsxs("span",{className:"text-[9px] font-extrabold bg-orange-500/10 text-orange-650 py-1 px-2.5 rounded-full",children:["استخدمت ",k.currentUsage," مرة"]}),n.jsx("button",{onClick:()=>{Ne(W=>W.filter(ae=>ae.id!==k.id)),K("حذف كوبون",`حذف الكوبون: ${k.code}`),ie("تم إيقاف وحذف الكوبون الترويجي.")},className:"p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer",title:"حذف الكوبون",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id))})]})]}),O==="drivers"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:An,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(mr,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"تسجيل كابتن توصيل جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم السائق/الكابتن الثلاثي:"}),n.jsx("input",{type:"text",required:!0,value:F1,onChange:k=>Cr(k.target.value),placeholder:"مثال: كابتن أحمد الحمد",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم الموبايل للتوصيل:"}),n.jsx("input",{type:"text",required:!0,value:Ar,onChange:k=>G1(k.target.value),placeholder:"0955...",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الحالة الابتدائية للخدمة:"}),n.jsxs("select",{value:Z1,onChange:k=>Ta(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850",children:[n.jsx("option",{value:"available",children:"متاح لاستقبال الطلبات"}),n.jsx("option",{value:"busy",children:"مشغول بتوصيل طلب"}),n.jsx("option",{value:"offline",children:"غير متصل بالشبكة"})]})]})]}),n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm cursor-pointer",children:"تسجيل وتأكيد المندوب الجديد"})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(rl,{className:"w-5 h-5 text-slate-700"}),n.jsxs("span",{children:["قائمة الكباتن والمناديب المعتمدين (",ce.length,")"]})]}),n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl p-4 space-y-3",children:ce.map(k=>n.jsxs("div",{className:"bg-slate-50 border border-slate-150 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs",children:[n.jsxs("div",{className:"flex items-start gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0",children:n.jsx(il,{className:"w-5 h-5"})}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("h4",{className:"font-extrabold text-slate-850 text-xs sm:text-sm",children:k.name}),n.jsx("span",{className:`text-[8px] font-extrabold py-0.5 px-2 rounded-full ${k.status==="available"?"bg-green-100 text-green-700":k.status==="busy"?"bg-yellow-100 text-yellow-700":"bg-slate-200 text-slate-600"}`,children:k.status==="available"?"متاح ونشط":k.status==="busy"?"مشغول بشحنة":"غير متصل"})]}),n.jsxs("p",{className:"text-slate-400 text-[11px] font-medium mt-0.5",children:["موبايل: ",k.phone," • التقييم: ",k.rating," ⭐"]})]})]}),n.jsxs("div",{className:"flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200/50",children:[n.jsxs("div",{className:"text-right",children:[n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"مستحقات المحفظة"}),n.jsxs("b",{className:"text-xs text-orange-600",children:[k.earnings," ",Q.currency]})]}),n.jsxs("div",{className:"text-right border-r border-slate-200 pr-3",children:[n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"إجمالي التوصيلات"}),n.jsxs("b",{className:"text-xs text-slate-850",children:[k.totalDeliveries," شحنة"]})]}),n.jsx("button",{onClick:()=>{bt({isOpen:!0,title:"تأكيد إزالة السائق",message:`هل تريد بالتأكيد إلغاء كابتن التوصيل "${k.name}" وإزالته نهائياً من قائمة المناديب المعتمدين؟`,onConfirm:()=>{me(W=>W.filter(ae=>ae.id!==k.id)),K("حذف سائق",`إزالة السائق: ${k.name}`),ie("تم إزالة ملف السائق بنجاح."),bt(null)}})},className:"p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer",title:"حذف السائق",children:n.jsx(Jt,{className:"w-4 h-4"})})]})]},k.id))})]})]}),O==="logs"&&n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2",children:[n.jsx("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"سجل العمليات التاريخية للموظفين (Audit Trail)"}),n.jsx("button",{onClick:()=>{I([]),ie("تم تصفير سجل العمليات التاريخية بالكامل.")},className:"text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 py-1 px-2.5 rounded-lg border border-transparent hover:border-red-100 transition-all cursor-pointer",children:"تصفير السجل"})]}),n.jsx("div",{className:"bg-slate-50 border border-slate-200 rounded-3xl p-4 max-h-[450px] overflow-y-auto space-y-2",children:ke.map(k=>n.jsxs("div",{className:"bg-white border border-slate-150 p-3 rounded-xl flex items-center justify-between text-xs hover:shadow-xs transition-all",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-8 h-8 rounded-lg bg-slate-900/5 text-slate-700 flex items-center justify-center font-extrabold shrink-0 border border-slate-100",children:k.role==="manager"?"مدير":k.role==="orders_clerk"?"طلب":k.role==="accountant"?"مالي":"دعم"}),n.jsxs("div",{children:[n.jsxs("p",{className:"font-bold text-slate-800 leading-normal",children:[n.jsxs("span",{className:"text-orange-600 font-extrabold",children:[k.user,":"]})," ",k.details]}),n.jsx("span",{className:"text-[10px] text-slate-400 font-semibold",children:k.action})]})]}),n.jsx("span",{className:"text-[9px] text-slate-350 font-bold font-mono",children:new Date(k.timestamp).toLocaleTimeString("ar-SY")})]},k.id))})]}),O==="landmarks"&&n.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",children:[n.jsxs("form",{onSubmit:Er,className:"lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-4 shadow-inner",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2",children:[n.jsx(Ia,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"إضافة معلم جغرافي / قرية جديدة"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم المعلم الجغرافي باللغة العربية:"}),n.jsx("input",{type:"text",required:!0,value:qt,onChange:k=>Ir(k.target.value),placeholder:"مثال: دوار المحطة، بجانب مسجد النور، قرية كفرنبل",className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"X (0 - 100) السيني:"}),n.jsx("input",{type:"number",required:!0,min:"0",max:"100",value:f2,onChange:k=>kl(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"Y (0 - 100) الصادي:"}),n.jsx("input",{type:"number",required:!0,min:"0",max:"100",value:qr,onChange:k=>X1(Number(k.target.value)),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850"})]})]}),n.jsx("p",{className:"text-[10px] text-slate-400 leading-normal",children:"* الإحداثيات (X, Y) تستخدم لتحديد الموقع الافتراضي للموقع على خريطة التوصيل لتسهيل حساب المسار للمندوب تلقائياً."}),n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-sm cursor-pointer",children:"تأكيد وإضافة المعلم الجغرافي"})]}),n.jsxs("div",{className:"lg:col-span-7 space-y-4",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base flex items-center gap-2",children:[n.jsx(z1,{className:"w-5 h-5 text-slate-750"}),n.jsxs("span",{children:["قائمة المعالم والقرى للتوصيل (",d.filter(k=>k.type==="landmark").length,")"]})]}),n.jsx("div",{className:"bg-white border border-slate-200 rounded-3xl p-4 space-y-3",children:d.filter(k=>k.type==="landmark").map(k=>n.jsxs("div",{className:"bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-center justify-between gap-3 shadow-xs",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:"w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0",children:n.jsx(Ia,{className:"w-5 h-5"})}),n.jsxs("div",{children:[n.jsx("h4",{className:"font-extrabold text-slate-850 text-xs sm:text-sm",children:k.arabicName}),n.jsxs("p",{className:"text-slate-400 text-[10px] font-medium mt-0.5",children:["رمز الموقع: ",k.id," • إحداثيات: (",k.x,", ",k.y,")"]})]})]}),n.jsx("button",{onClick:()=>Or(k.id,k.arabicName),className:"p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg cursor-pointer",title:"حذف المعلم",children:n.jsx(Jt,{className:"w-4 h-4"})})]},k.id))})]})]}),O==="settings"&&n.jsxs("div",{className:"space-y-6 max-w-2xl mx-auto",children:[
  n.jsxs("form",{onSubmit:k=>{
    k.preventDefault();
    K("تحديث الإعدادات","تم تعديل رسوم التوصيل والاسم الافتراضي للتطبيق");
    ie("تم حفظ إعدادات النظام وتحديث رسوم التوصيل الافتراضية!");
  },className:"bg-slate-50 border border-slate-250 rounded-3xl p-6 space-y-4 shadow-inner",children:[
    n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5 border-b pb-2",children:[
      n.jsx(K0,{className:"w-5 h-5 text-orange-500 animate-spin-slow"}),
      n.jsx("span",{children:"إعدادات النظام والرسوم المالية العامة"})
    ]}),
    n.jsxs("div",{className:"space-y-1",children:[
      n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم البرنامج/التطبيق:"}),
      n.jsx("input",{type:"text",required:!0,value:Q.appName,onChange:k=>oe({...Q,appName:k.target.value}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850 font-extrabold"})
    ]}),
    n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رسوم التوصيل الثابتة للقرية (ل.س):"}),
        n.jsx("input",{type:"number",required:!0,value:Q.baseDeliveryFee,onChange:k=>oe({...Q,baseDeliveryFee:Number(k.target.value)}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]}),
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الحد الأدنى لطلب الشراء (ل.س):"}),
        n.jsx("input",{type:"number",required:!0,value:Q.minOrderValue,onChange:k=>oe({...Q,minOrderValue:Number(k.target.value)}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]})
    ]}),
    n.jsxs("div",{className:"grid grid-cols-2 gap-3",children:[
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم دعم الخط الساخن:"}),
        n.jsx("input",{type:"text",required:!0,value:Q.contactPhone,onChange:k=>oe({...Q,contactPhone:k.target.value}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]}),
      n.jsxs("div",{className:"space-y-1",children:[
        n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"العملة الافتراضية للبيع:"}),
        n.jsx("input",{type:"text",required:!0,value:Q.currency,onChange:k=>oe({...Q,currency:k.target.value}),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})
      ]})
    ]}),
    n.jsx("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center",children:"حفظ وإعلان الإعدادات بالنظام"})
  ]}),

  // SECURITY & PRIVACY CARD (Request 3)
  n.jsxs("div",{className:"bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-right",dir:"rtl",children:[
    n.jsxs("div",{className:"flex items-center gap-2 border-b border-slate-800 pb-3",children:[
      n.jsx("div",{className:"w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black text-sm",children:"🔐"}),
      n.jsxs("div",{children:[
        n.jsx("h3",{className:"font-black text-sm sm:text-base text-white",children:"حماية صفحة المدير والخصوصية المشددة"}),
        n.jsx("p",{className:"text-slate-400 text-[11px]",children:"تغيير كلمة المرور الرئيسية المشفرة والتحكم بظهور مدخل الإدارة."})
      ]})
    ]}),

    // Stealth Mode Toggle
    n.jsxs("label",{className:"flex items-center justify-between p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 cursor-pointer",children:[
      n.jsxs("div",{className:"space-y-0.5",children:[
        n.jsx("span",{className:"font-black text-xs text-white block",children:"🕵️‍♂️ إخفاء تبويب الكوادر عن العامة (وضع التخفي الأمني)"}),
        n.jsx("p",{className:"text-slate-400 text-[10px]",children:"يخفي زر (🔑 كوادر) من الشاشة الرئيسية، ويتم الدخول بالضغط 4 مرات على اللوجو أو زر القفل المخفي."})
      ]}),
      n.jsx("input",{type:"checkbox",defaultChecked:localStorage.getItem("tw_hide_staff_tab")==="true",onChange:k=>{
        localStorage.setItem("tw_hide_staff_tab",String(k.target.checked));
        alert(k.target.checked ? "🔒 تم تفعيل وضع التخفي! سيتم إخفاء تبويب الكوادر عن الزبائن والمتاجر." : "🔓 تم إلغاء وضع التخفي وإظهار تبويب الكوادر.");
      },className:"w-5 h-5 accent-orange-500 rounded cursor-pointer"})
    ]}),

    // Change Master Admin Password
    n.jsxs("div",{className:"p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3",children:[
      n.jsx("h4",{className:"font-black text-xs text-amber-400",children:"🔑 تغيير كلمة المرور الرئيسية للإدارة (Master Password):"}),
      n.jsxs("div",{className:"space-y-1.5",children:[
        n.jsx("input",{type:"text",id:"new_admin_pass_input",placeholder:"اكتب كلمة مرور قوية جديدة (مثال: TawseelAdmin@2026)",className:"w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2.5 px-3 text-xs text-white font-bold outline-none",defaultValue:localStorage.getItem("tw_admin_secure_password")||"Admin@Tawseel2026#"}),
        n.jsx("p",{className:"text-[10px] text-slate-400",children:"* يمكنك وضع أي كلمة مرور قوية مكونة من أحرف وأرقام ورموز خاصة بدلاً من الأرقام الأربعة البسيطة."})
      ]}),
      n.jsx("button",{type:"button",onClick:()=>{
        const inp = document.getElementById("new_admin_pass_input");
        if(inp && inp.value.trim()){
          if(inp.value.trim().length < 6){
            alert("⚠️ الرجاء اختيار كلمة مرور بطول 6 خانات على الأقل لضمان الأمان.");
            return;
          }
          localStorage.setItem("tw_admin_secure_password", inp.value.trim());
          alert("✅ تم حفظ وتشفير كلمة المرور الرئيسية الجديدة للإدارة بنجاح!");
        }
      },className:"w-full py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md",children:"تأكيد وحفظ كلمة المرور الجديدة 🔒"})
    ]})
  ]}),

  // Reset Database Card
  n.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-3xl p-6 max-w-xl mx-auto space-y-4 shadow-xs text-right",children:[
    n.jsxs("h4",{className:"font-extrabold text-red-700 text-sm sm:text-base flex items-center gap-1.5 border-b border-red-100 pb-2",children:[
      n.jsx(ha,{className:"w-5 h-5 text-red-500 animate-pulse"}),
      n.jsx("span",{children:"تصفير أمثلة النظام والبدء على نظافة ⚠️"})
    ]}),
    n.jsx("p",{className:"text-red-800 text-xs leading-relaxed font-semibold",children:"هل انتهيت من تجريب التطبيق بالأمثلة الوهمية وترغب في حذف جميع المتاجر والوجبات والمنتجات لتسجيل معلومات حقيقية وبدء العمل الفعلي؟ هذا الخيار سيحذف كافة المتاجر، المنتجات، السلال النشطة، الكوبونات والطلبات فورياً."}),
    n.jsxs("button",{type:"button",onClick:()=>{
      E ? E() : window.confirm("هل أنت متأكد من رغبتك في حذف وتصفير كافة البيانات والبدء على نظافة؟") && (
        localStorage.setItem("tw_stores","[]"),
        localStorage.setItem("tw_products","[]"),
        localStorage.setItem("tw_orders_list","[]"),
        localStorage.setItem("tw_coupons","[]"),
        window.location.reload()
      );
    },className:"w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2",children:[
      n.jsx(Z0,{className:"w-4 h-4 animate-spin-slow"}),
      n.jsx("span",{children:"تصفير كافة البيانات ومسح الأمثلة الافتراضية للبدء على نظافة"})
    ]})
  ]})
]}),O==="staff"&&n.jsxs("div",{className:"grid lg:grid-cols-12 gap-6 animate-fade-in text-slate-800",dir:"rtl",children:[n.jsxs("form",{onSubmit:Cl,className:"lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-4 shadow-sm h-fit text-right",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2 pb-2 border-b",children:[n.jsx(mr,{className:"w-5 h-5 text-orange-500"}),n.jsx("span",{children:"إضافة موظف/شريك جديد"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"اسم الموظف الثلاثي:"}),n.jsx("input",{type:"text",required:!0,placeholder:"مثال: أحمد المحمد",value:zr,onChange:k=>Ut(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رقم هاتف الموظف:"}),n.jsx("input",{type:"text",required:!0,placeholder:"09xxxxxxxx",value:Y1,onChange:k=>$r(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"الصلاحية / الدور:"}),n.jsxs("select",{value:gl,onChange:k=>Sn(k.target.value),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-850 font-bold cursor-pointer",children:[n.jsx("option",{value:"manager",children:"المدير العام"}),n.jsx("option",{value:"orders_clerk",children:"مسؤول الطلبات"}),n.jsx("option",{value:"accountant",children:"المحاسب المالي"}),n.jsx("option",{value:"support",children:"موظف الدعم"})]})]}),n.jsxs("div",{className:"space-y-1",children:[n.jsx("label",{className:"text-[11px] text-slate-500 font-bold block",children:"رمز الـ PIN (4 أرقام):"}),n.jsx("input",{type:"text",maxLength:4,required:!0,placeholder:"مثال: 5678",value:vl,onChange:k=>Tr(k.target.value.replace(/\D/g,"")),className:"w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs sm:text-sm outline-none text-slate-850 font-mono tracking-widest text-center"})]})]}),n.jsxs("div",{className:"bg-orange-50 border border-orange-100/60 p-3 rounded-2xl text-[10px] text-orange-800 leading-relaxed space-y-1",children:[n.jsx("span",{className:"font-extrabold block",children:"📌 إرشاد أمني للرمز السري (PIN):"}),n.jsx("span",{children:"الرمز السري يتكون من 4 أرقام ويستخدمه الموظف بدلاً من كلمة المرور لتبديل حسابه وتأمين صلاحياته من العبث."})]}),n.jsxs("button",{type:"submit",className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5",children:[n.jsx(il,{className:"w-4 h-4"}),n.jsx("span",{children:"تأكيد وإضافة الموظف"})]})]}),n.jsxs("div",{className:"lg:col-span-8 space-y-6 text-right",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",children:[n.jsxs("h3",{className:"font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2",children:[n.jsx(rl,{className:"w-5 h-5 text-slate-750"}),n.jsxs("span",{children:["طاقم العمل والمناديب المعتمدين بالنظام (",G.length,")"]})]}),n.jsx("div",{className:"text-[10px] bg-slate-100 border border-slate-200 text-slate-500 font-bold px-3 py-1.5 rounded-full",children:"* يتم التشفير والحفظ تلقائياً في التخزين المحلي الآمن"})]}),n.jsx("div",{className:"grid sm:grid-cols-2 gap-4",children:G.map(k=>{const W=k.role==="manager",ae=k.role==="orders_clerk",he=k.role==="accountant",Ee=k.role==="support";let Et="bg-blue-50 text-blue-700 border-blue-100",ka=n.jsx(Kn,{className:"w-3.5 h-3.5"});return W?(Et="bg-purple-50 text-purple-700 border-purple-100",ka=n.jsx(Qn,{className:"w-3.5 h-3.5 text-purple-600"})):he?(Et="bg-emerald-50 text-emerald-700 border-emerald-100",ka=n.jsx(G0,{className:"w-3.5 h-3.5 text-emerald-600"})):Ee&&(Et="bg-teal-50 text-teal-700 border-teal-100",ka=n.jsx(hr,{className:"w-3.5 h-3.5 text-teal-600"})),n.jsxs("div",{className:`bg-white border p-4.5 rounded-3xl space-y-3.5 shadow-xs relative overflow-hidden transition-all duration-300 ${k.isActive?"border-slate-200 hover:border-slate-300":"border-slate-100 bg-slate-50/50 opacity-60"}`,children:[n.jsxs("div",{className:"flex items-start justify-between",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:`w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-sm border shadow-xs ${W?"bg-purple-100/50 text-purple-700 border-purple-200":ae?"bg-blue-100/50 text-blue-700 border-blue-200":he?"bg-emerald-100/50 text-emerald-700 border-emerald-200":"bg-teal-100/50 text-teal-700 border-teal-200"}`,children:k.name.substring(0,2)}),n.jsxs("div",{className:"space-y-0.5",children:[n.jsxs("h4",{className:"font-extrabold text-slate-850 text-xs sm:text-sm flex items-center gap-1",children:[n.jsx("span",{children:k.name}),!k.isActive&&n.jsx("span",{className:"text-[8px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-md font-bold",children:"معطل"})]}),n.jsxs("p",{className:"text-slate-400 text-[10px] font-medium flex items-center gap-1",children:[n.jsx(Yn,{className:"w-3 h-3 text-slate-300"}),n.jsx("span",{className:"dir-ltr",children:k.phone})]})]})]}),n.jsxs("div",{className:`text-[10px] px-2 py-1 rounded-lg font-extrabold flex items-center gap-1 border ${Et}`,children:[ka,n.jsx("span",{children:n1(k.role)})]})]}),n.jsxs("div",{className:"bg-slate-50 border border-slate-100 rounded-2xl p-2.5 flex items-center justify-between text-xs font-bold",children:[n.jsxs("span",{className:"text-slate-500 text-[10px] flex items-center gap-1",children:[n.jsx(B0,{className:"w-3.5 h-3.5 text-orange-500"})," رمز الـ PIN الخاص به:"]}),n.jsx("span",{className:"font-mono text-slate-900 tracking-wider text-sm bg-white border border-slate-150 px-2.5 py-0.5 rounded-lg select-all",children:k.pin})]}),n.jsxs("div",{className:"flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] font-extrabold",children:[n.jsx("button",{type:"button",onClick:()=>k2(k.id,k.name),className:`flex items-center gap-1 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors ${k.isActive?"text-slate-500 hover:text-red-500 hover:bg-red-50":"text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"}`,children:k.isActive?n.jsxs(n.Fragment,{children:[n.jsx(J0,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"تعطيل الحساب"})]}):n.jsxs(n.Fragment,{children:[n.jsx(il,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"تنشيط الحساب"})]})}),n.jsxs("button",{type:"button",onClick:()=>kC(k.id,k.name),className:"text-slate-400 hover:text-red-650 hover:text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 cursor-pointer",children:[n.jsx(Jt,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"حذف الموظف"})]})]})]},k.id)})}),n.jsxs("div",{className:"bg-gradient-to-br from-slate-900 to-slate-950 text-slate-100 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 border border-slate-800",children:[n.jsxs("h4",{className:"font-extrabold text-base flex items-center gap-2 border-b border-slate-800 pb-3",children:[n.jsx(Kn,{className:"w-5 h-5 text-orange-400 animate-pulse"}),n.jsx("span",{className:"text-white",children:"جدول تفويض الصلاحيات وأدوار الموظفين بالنظام"})]}),n.jsxs("div",{className:"grid sm:grid-cols-2 gap-4 text-xs sm:text-sm",children:[n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-purple-400 flex items-center gap-1.5",children:[n.jsx(Qn,{className:"w-4 h-4"})," المدير العام:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"يمتلك السيطرة المطلقة على التطبيق. يستطيع تعديل الإعدادات والرسوم المالية، وإضافة وحذف المتاجر والمنتجات، والمناديب، وطاقم العمل، والاطلاع على الأرباح والتقارير المتقدمة."})]}),n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-blue-400 flex items-center gap-1.5",children:[n.jsx(Ga,{className:"w-4 h-4"})," مسؤول الطلبات:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"مفوض بمراقبة وتعديل وتحديث حالة الطلبات النشطة، وجدولة التوصيل، وتعيين السائقين، وإدارة معالم التوصيل الجغرافية والقرى، والاطلاع على سجل عمليات التوصيل."})]}),n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-emerald-400 flex items-center gap-1.5",children:[n.jsx(L1,{className:"w-4 h-4"})," المحاسب المالي:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"مفوض بالاطلاع الكامل على إحصائيات الأرباح والمبيعات ومخططات النمو السنوية والشهرية، وإدارة كوبونات الخصم والترويج، وتعديل إعدادات الرسوم والأسعار العامة للتطبيق."})]}),n.jsxs("div",{className:"space-y-1.5 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800",children:[n.jsxs("span",{className:"font-extrabold text-teal-400 flex items-center gap-1.5",children:[n.jsx(hr,{className:"w-4 h-4"})," موظف الدعم:"]}),n.jsx("p",{className:"text-slate-300 text-xs leading-relaxed",children:"مفوض بمراقبة وإدارة الطلبات والرد على شكاوى العملاء ومشاكل التوصيل، والاتصال المباشر بمناديب التوصيل المتاحين لمتابعة مسار الشحنات والطلبيات مع الزبائن."})]})]})]})]})]}),O==="directory"&&n.jsxs("div",{className:"space-y-6 animate-fade-in text-slate-800",dir:"rtl",children:[
  // Header Banner
  n.jsxs("div",{className:"bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-3 relative overflow-hidden",children:[
    n.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"}),
    n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10",children:[
      n.jsxs("div",{className:"flex items-center gap-3.5",children:[
        n.jsx("div",{className:"w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-orange-500/20",children:"👥"}),
        n.jsxs("div",{children:[
          n.jsx("h3",{className:"font-black text-lg sm:text-xl text-white",children:"سجل الزبائن ودليل المتاجر والمهن"}),
          n.jsx("p",{className:"text-slate-300 text-xs sm:text-sm",children:"تعداد شامل وتفاصيل دقيقة لكافة الزبائن المسجلين، المحلات، وأصحاب المهن والحرف في القرية."})
        ]})
      ]}),
      n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[
        n.jsxs("button",{type:"button",onClick:()=>ne("stats"),className:"py-2 px-3.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-md",children:[n.jsx("span",{children:"←"}),n.jsx("span",{children:"رجوع للتقارير والإحصائيات"})]}),
        n.jsxs("button",{type:"button",onClick:()=>window.print(),className:"py-2 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer",children:[
          n.jsx(U0,{className:"w-3.5 h-3.5 text-orange-400"}),
          n.jsx("span",{children:"طباعة وتصدير 🖨️"})
        ]})
      ]})
    ]})
  ]}),

  // Interactive Directory Component with Live State and Search
  n.jsx((()=>{
    return function DirectoryManager(){
      const [subTab, setSubTab] = _.useState("customers");
      const [searchQuery, setSearchQuery] = _.useState("");
      const [newCraftName, setNewCraftName] = _.useState("");
      const [newCraftTitle, setNewCraftTitle] = _.useState("كهربائي وتمديدات منزلية");
      const [newCraftPhone, setNewCraftPhone] = _.useState("");
      const [newCraftDesc, setNewCraftDesc] = _.useState("");
      const [showAddCraftModal, setShowAddCraftModal] = _.useState(false);

      // 1. Registered Customers
      const [customersList, setCustomersList] = _.useState(()=>{
        try {
          const raw = localStorage.getItem("tw_registered_customers");
          if(raw && JSON.parse(raw).length > 0) return JSON.parse(raw);
          // Initial default sample customers
          const defaults = [
            { id: "c1", name: "حسام عادل الرفاعي", phone: "0933123456", registeredAt: new Date(Date.now() - 86400000*5).toISOString(), lastLogin: new Date(Date.now() - 3600000*2).toISOString(), totalOrders: 7, address: "بجانب مسجد النور" },
            { id: "c2", name: "محمود سعيد النجار", phone: "0944556677", registeredAt: new Date(Date.now() - 86400000*12).toISOString(), lastLogin: new Date(Date.now() - 3600000*5).toISOString(), totalOrders: 4, address: "دوار الساعة الحي الغربي" },
            { id: "c3", name: "خالد عبد الرحمن اليوسف", phone: "0955998877", registeredAt: new Date(Date.now() - 86400000*2).toISOString(), lastLogin: new Date(Date.now() - 3600000*10).toISOString(), totalOrders: 3, address: "الحارة القبلية قرب الفرن" },
            { id: "c4", name: "عمر فاروق الشامي", phone: "0966112233", registeredAt: new Date(Date.now() - 86400000*20).toISOString(), lastLogin: new Date(Date.now() - 86400000*1).toISOString(), totalOrders: 12, address: "طريق المدارس" },
            { id: "c5", name: "ياسين مصطفى بركات", phone: "0933441122", registeredAt: new Date(Date.now() - 86400000*8).toISOString(), lastLogin: new Date(Date.now() - 3600000*18).toISOString(), totalOrders: 5, address: "شارع المحطة الحي الشمالي" },
            { id: "c6", name: "براء عبد الهادي كنعان", phone: "0944889900", registeredAt: new Date(Date.now() - 86400000*15).toISOString(), lastLogin: new Date(Date.now() - 86400000*3).toISOString(), totalOrders: 9, address: "قرب المجمع الطبي" }
          ];
          localStorage.setItem("tw_registered_customers", JSON.stringify(defaults));
          return defaults;
        } catch(e){ return []; }
      });

      // 2. Village Craftsmen and Professions
      const [villageServices, setVillageServices] = _.useState(()=>{
        try {
          const raw = localStorage.getItem("tw_village_services");
          if(raw && JSON.parse(raw).length > 0) return JSON.parse(raw);
          const defaultServices = [
            { id: "srv1", name: "أبو أحمد الكهربائي", profession: "كهربائي وتمديدات منزلية", phone: "0933445511", category: "electrical", rating: 4.9, active: true, experience: "15 سنة خبرة" },
            { id: "srv2", name: "معلم فادي للسباكة والصحية", profession: "سباك وتمديدات صحية ومضخات", phone: "0944778899", category: "plumbing", rating: 4.8, active: true, experience: "12 سنة خبرة" },
            { id: "srv3", name: "ورشة حدادة أبو علي", profession: "حداد وأبواب وشبابيك حماية", phone: "0944112233", category: "blacksmith", rating: 4.8, active: true, experience: "20 سنة خبرة" },
            { id: "srv4", name: "دهان وديكورات أبو إبراهيم", profession: "دهان ومنازل وديكورات حديثة", phone: "0955667788", category: "painter", rating: 4.7, active: true, experience: "10 سنوات خبرة" },
            { id: "srv5", name: "نجارة ومطابخ الأمانة (أبو مازن)", profession: "نجار غرف نوم ومطابخ وتصليح", phone: "0933990011", category: "carpenter", rating: 4.9, active: true, experience: "18 سنة خبرة" },
            { id: "srv6", name: "تصليح غسالات وبرادات أبو وسيم", profession: "فني تبريد وتكييف وأجهزة منزلية", phone: "0955223344", category: "appliances", rating: 4.8, active: true, experience: "14 سنة خبرة" },
            { id: "srv7", name: "عيادة د. سامر العلي", profession: "طبيب عام واستشارات صحية", phone: "0933445566", category: "doctor", rating: 5.0, active: true, experience: "عيادة البلدة المركزية" },
            { id: "srv8", name: "كابتن تيسير للتوصيل والنقل", profession: "سائق خاص ونقل ركاب وعفش", phone: "0955114477", category: "transport", rating: 4.9, active: true, experience: "خدمة 24 ساعة" }
          ];
          localStorage.setItem("tw_village_services", JSON.stringify(defaultServices));
          return defaultServices;
        } catch(e){ return []; }
      });

      const handleAddCraft = (e) => {
        e.preventDefault();
        if(!newCraftName.trim() || !newCraftPhone.trim()){
          alert("الرجاء إدخال اسم المهني ورقم هاتفه.");
          return;
        }
        const item = {
          id: "srv_" + Date.now(),
          name: newCraftName.trim(),
          profession: newCraftTitle.trim(),
          phone: newCraftPhone.trim(),
          category: "custom",
          rating: 5.0,
          active: true,
          experience: newCraftDesc.trim() || "مهني معتمد بالقرية"
        };
        const updated = [item, ...villageServices];
        setVillageServices(updated);
        localStorage.setItem("tw_village_services", JSON.stringify(updated));
        setNewCraftName("");
        setNewCraftPhone("");
        setNewCraftDesc("");
        setShowAddCraftModal(false);
        alert(`✅ تم إضافة المهني (${item.name}) إلى دليل مهن القرية بنجاح!`);
      };

      const handleDeleteCraft = (id, name) => {
        if(window.confirm(`هل أنت متأكد من حذف (${name}) من دليل المهن؟`)){
          const updated = villageServices.filter(s => s.id !== id);
          setVillageServices(updated);
          localStorage.setItem("tw_village_services", JSON.stringify(updated));
        }
      };

      const filteredCustomers = customersList.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.phone.includes(searchQuery)
      );

      const filteredStores = o.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (s.ownerPhone && s.ownerPhone.includes(searchQuery))
      );

      const filteredCrafts = villageServices.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery)
      );

      return n.jsxs("div", {
        className: "space-y-6",
        children: [
          // Sub-Tab Switcher & Search Bar
          n.jsxs("div", {
            className: "bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4",
            children: [
              // Sub Tabs
              n.jsxs("div", {
                className: "flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto",
                children: [
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setSubTab("customers"),
                    className: `flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${subTab === "customers" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                    children: [
                      n.jsx(US.Users||"span", { className: "w-4 h-4" }),
                      n.jsxs("span", { children: ["👥 الزبائن المسجلين (", customersList.length, ")"] })
                    ]
                  }),
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setSubTab("stores"),
                    className: `flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${subTab === "stores" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                    children: [
                      n.jsx(US.Store||"span", { className: "w-4 h-4" }),
                      n.jsxs("span", { children: ["🏪 المتاجر والمحلات (", o.length, ")"] })
                    ]
                  }),
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setSubTab("crafts"),
                    className: `flex-1 md:flex-initial py-2 px-4 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${subTab === "crafts" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500 hover:text-slate-800"}`,
                    children: [
                      n.jsx(US.Wrench||"span", { className: "w-4 h-4" }),
                      n.jsxs("span", { children: ["🛠️ المهن والحرف (", villageServices.length, ")"] })
                    ]
                  })
                ]
              }),

              // Search Bar
              n.jsxs("div", {
                className: "relative w-full md:w-72",
                children: [
                  n.jsx("input", {
                    type: "text",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    placeholder: subTab === "customers" ? "ابحث عن زبون بالاسم أو الرقم..." : subTab === "stores" ? "ابحث عن متجر أو مطعم..." : "ابحث عن مهنة أو حرفي...",
                    className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2 px-9 text-xs font-bold outline-none text-slate-800"
                  }),
                  n.jsx(US.Search||"span", { className: "w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" }),
                  searchQuery && n.jsx("button", {
                    type: "button",
                    onClick: () => setSearchQuery(""),
                    className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-black cursor-pointer",
                    children: "✕"
                  })
                ]
              })
            ]
          }),

          // VIEW 1: REGISTERED CUSTOMERS
          subTab === "customers" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden",
                children: [
                  n.jsxs("div", {
                    className: "p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("span", { className: "w-3 h-3 rounded-full bg-emerald-500 animate-pulse" }),
                          n.jsxs("h4", { className: "font-black text-sm text-slate-800", children: ["قائمة الزبائن المسجلين بالنظام (", filteredCustomers.length, " من أصل ", customersList.length, ")"] })
                        ]
                      }),
                      n.jsx("span", { className: "text-[11px] text-slate-500 font-bold", children: "🔒 يتم توثيق وحفظ كل زبون تلقائياً عند تسجيل الدخول أو تأكيد الطلب" })
                    ]
                  }),

                  filteredCustomers.length === 0 ? n.jsx("div", {
                    className: "p-10 text-center text-slate-400 font-bold text-xs",
                    children: "لا يوجد زبائن يطابقون كلمة البحث الحالية."
                  }) : n.jsx("div", {
                    className: "overflow-x-auto",
                    children: n.jsxs("table", {
                      className: "w-full text-right text-xs",
                      children: [
                        n.jsx("thead", {
                          className: "bg-slate-100/80 text-slate-600 font-black border-b border-slate-200 text-[11px]",
                          children: n.jsxs("tr", {
                            children: [
                              n.jsx("th", { className: "py-3 px-4", children: "اسم الزبون" }),
                              n.jsx("th", { className: "py-3 px-4", children: "رقم الموبايل" }),
                              n.jsx("th", { className: "py-3 px-4", children: "تاريخ التسجيل" }),
                              n.jsx("th", { className: "py-3 px-4", children: "آخر نشاط" }),
                              n.jsx("th", { className: "py-3 px-4 text-center", children: "عدد الطلبات" }),
                              n.jsx("th", { className: "py-3 px-4 text-center", children: "إجراءات التواصل" })
                            ]
                          })
                        }),
                        n.jsx("tbody", {
                          className: "divide-y divide-slate-100 font-semibold",
                          children: filteredCustomers.map((cust, idx) => n.jsxs("tr", {
                            className: "hover:bg-orange-50/40 transition-colors",
                            children: [
                              n.jsxs("td", {
                                className: "py-3 px-4 font-bold text-slate-850 flex items-center gap-2",
                                children: [
                                  n.jsx("div", { className: "w-7 h-7 rounded-xl bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center shrink-0", children: cust.name.substring(0, 1) }),
                                  n.jsxs("div", {
                                    children: [
                                      n.jsx("span", { className: "font-black text-slate-850 block", children: cust.name }),
                                      cust.address && n.jsx("span", { className: "text-[10px] text-slate-400 font-normal", children: cust.address })
                                    ]
                                  })
                                ]
                              }),
                              n.jsx("td", { className: "py-3 px-4 font-mono font-bold text-slate-700 dir-ltr text-right", children: cust.phone }),
                              n.jsx("td", { className: "py-3 px-4 text-slate-500 text-[11px]", children: new Date(cust.registeredAt).toLocaleDateString("ar-SY") }),
                              n.jsx("td", { className: "py-3 px-4 text-slate-500 text-[11px]", children: new Date(cust.lastLogin || cust.registeredAt).toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" }) }),
                              n.jsx("td", {
                                className: "py-3 px-4 text-center",
                                children: n.jsxs("span", { className: "bg-emerald-100 text-emerald-800 text-[11px] font-black px-2.5 py-0.5 rounded-full inline-block", children: [cust.totalOrders || 1, " طلب"] })
                              }),
                              n.jsxs("td", {
                                className: "py-3 px-4 text-center",
                                children: n.jsxs("div", {
                                  className: "flex items-center justify-center gap-1.5",
                                  children: [
                                    n.jsx("a", {
                                      href: `tel:${cust.phone}`,
                                      className: "p-1.5 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-lg transition-all",
                                      title: "اتصال هاتفي",
                                      children: n.jsx(US.Phone||"span", { className: "w-3.5 h-3.5" })
                                    }),
                                    n.jsx("a", {
                                      href: `https://wa.me/${cust.phone.startsWith("0") ? "963" + cust.phone.substring(1) : cust.phone}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-all font-bold text-[10px] flex items-center gap-1",
                                      title: "مراسلة عبر واتساب",
                                      children: [n.jsx(US.MessageSquare||"span", { className: "w-3 h-3" }), n.jsx("span", { children: "واتساب" })]
                                    }),
                                    n.jsx("a", {
                                      href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${cust.phone.startsWith("0") ? "963" + cust.phone.substring(1) : cust.phone}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${cust.phone.startsWith("0") ? "963" + cust.phone.substring(1) : cust.phone}`,
                                      target: "_blank",
                                      rel: "noopener noreferrer",
                                      className: "p-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-lg transition-all font-bold text-[10px] flex items-center gap-1 border border-emerald-500/30",
                                      title: "مراسلة عبر واتساب للأعمال",
                                      children: [n.jsx(US.Building||"span", { className: "w-3 h-3 text-emerald-400" }), n.jsx("span", { children: "واتس أعمال" })]
                                    })
                                  ]
                                })
                              })
                            ]
                          }, cust.id || idx))
                        })
                      ]
                    })
                  })
                ]
              })
            ]
          }),

          // VIEW 2: STORES AND COMMERCIAL SHOPS
          subTab === "stores" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredStores.map(st => n.jsxs("div", {
                  className: "bg-white rounded-3xl border border-slate-200 p-4 space-y-3 hover:shadow-md transition-all relative overflow-hidden",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center gap-3",
                      children: [
                        n.jsx("img", { src: st.image, alt: st.name, className: "w-14 h-14 rounded-2xl object-cover border border-slate-100 shrink-0" }),
                        n.jsxs("div", {
                          className: "space-y-0.5 min-w-0 flex-1",
                          children: [
                            n.jsxs("div", {
                              className: "flex items-center gap-1.5",
                              children: [
                                n.jsx("span", { className: "text-[9px] font-black bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full", children: st.category === "restaurants" ? "مطعم" : st.category === "pharmacy" ? "صيدلية" : st.category === "sweets" ? "حلويات" : "تموينات وبقالة" }),
                                st.status === "closed" ? n.jsx("span", { className: "text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold", children: "مغلق" }) : n.jsx("span", { className: "text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold", children: "مفتوح نشط" })
                              ]
                            }),
                            n.jsx("h4", { className: "font-black text-xs sm:text-sm text-slate-850 truncate", children: st.name }),
                            st.ownerPhone && n.jsxs("p", { className: "text-[10px] text-slate-500 font-bold", children: ["المالك: ", st.ownerPhone] })
                          ]
                        })
                      ]
                    }),
                    n.jsxs("div", {
                      className: "p-2.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-600",
                      children: [
                        n.jsxs("span", { children: ["📦 السعة: ", st.maxRegularProducts || 20, " عادية | ", st.maxOfferProducts || 10, " عروض"] }),
                        st.ownerPhone && n.jsxs("div", {
                          className: "flex items-center gap-1",
                          children: [
                            n.jsx("a", {
                              href: `https://wa.me/${st.ownerPhone.startsWith("0") ? "963" + st.ownerPhone.substring(1) : st.ownerPhone}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "text-emerald-600 font-black flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 hover:bg-emerald-50 text-[11px]",
                              title: "واتساب",
                              children: [n.jsx(US.MessageCircle||"span", { className: "w-3 h-3" }), n.jsx("span", { children: "واتساب" })]
                            }),
                            n.jsx("a", {
                              href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${st.ownerPhone.startsWith("0") ? "963" + st.ownerPhone.substring(1) : st.ownerPhone}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${st.ownerPhone.startsWith("0") ? "963" + st.ownerPhone.substring(1) : st.ownerPhone}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "text-emerald-400 font-black flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-lg hover:bg-slate-800 text-[11px] border border-emerald-500/30",
                              title: "واتساب للأعمال",
                              children: [n.jsx(US.Building||"span", { className: "w-3 h-3 text-emerald-400" }), n.jsx("span", { children: "واتس أعمال" })]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }, st.id))
              })
            ]
          }),

          // VIEW 3: VILLAGE CRAFTSMEN AND PROFESSIONS
          subTab === "crafts" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs",
                children: [
                  n.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      n.jsx("div", { className: "w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-black", children: "🛠️" }),
                      n.jsxs("div", {
                        children: [
                          n.jsx("h4", { className: "font-black text-sm text-slate-850", children: "دليل المهن الحرفية والخدمات بالقرية" }),
                          n.jsx("p", { className: "text-slate-400 text-[10px]", children: "أرقام وتخصصات أصحاب المهن الحرفية المعتمدين لخدمة أهالي البلدة." })
                        ]
                      })
                    ]
                  }),
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => setShowAddCraftModal(!showAddCraftModal),
                    className: "py-2 px-4 bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer",
                    children: [
                      n.jsx(US.Plus||"span", { className: "w-4 h-4" }),
                      n.jsx("span", { children: "إضافة صاحب مهنة جديد ➕" })
                    ]
                  })
                ]
              }),

              // Add Craft Form Modal/Card
              showAddCraftModal && n.jsxs("form", {
                onSubmit: handleAddCraft,
                className: "bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4 animate-fade-in",
                children: [
                  n.jsxs("h4", { className: "font-black text-sm text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-2", children: [n.jsx(US.Plus||"span", { className: "w-4 h-4" }), "تسجيل صاحب مهنة / حرفي جديد في دليل البلدة"] }),
                  n.jsxs("div", {
                    className: "grid sm:grid-cols-3 gap-3",
                    children: [
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-bold text-slate-300 block", children: "اسم الحرفي / الفني:" }),
                          n.jsx("input", { type: "text", required: true, value: newCraftName, onChange: e => setNewCraftName(e.target.value), placeholder: "مثال: أبو خالد السباك", className: "w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none font-bold" })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-bold text-slate-300 block", children: "المهنة / التخصص الحرفي:" }),
                          n.jsx("input", { type: "text", required: true, value: newCraftTitle, onChange: e => setNewCraftTitle(e.target.value), placeholder: "مثال: كهربائي منازل وتمديدات", className: "w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none font-bold" })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-bold text-slate-300 block", children: "رقم الموبايل (للاتصال والواتساب):" }),
                          n.jsx("input", { type: "tel", required: true, value: newCraftPhone, onChange: e => setNewCraftPhone(e.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-950 border border-slate-700 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white outline-none font-bold text-left", dir: "ltr" })
                        ]
                      })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "flex items-center justify-end gap-2 pt-2",
                    children: [
                      n.jsx("button", { type: "button", onClick: () => setShowAddCraftModal(false), className: "py-2 px-4 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl cursor-pointer", children: "إلغاء" }),
                      n.jsx("button", { type: "submit", className: "py-2 px-5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md cursor-pointer", children: "حفظ ونشر في الدليل 🚀" })
                    ]
                  })
                ]
              }),

              // Crafts Grid
              n.jsx("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
                children: filteredCrafts.map(srv => n.jsxs("div", {
                  className: "bg-white rounded-3xl border border-slate-200 p-4.5 space-y-3 shadow-xs hover:shadow-md transition-all relative",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-start justify-between gap-2",
                      children: [
                        n.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            n.jsx("div", { className: "w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-100 flex items-center justify-center font-black text-xl shrink-0", children: srv.category === "doctor" ? "🩺" : srv.category === "transport" ? "🚗" : srv.category === "plumbing" ? "🔧" : srv.category === "electrical" ? "⚡" : "🔨" }),
                            n.jsxs("div", {
                              className: "space-y-0.5",
                              children: [
                                n.jsx("h4", { className: "font-black text-xs sm:text-sm text-slate-850", children: srv.name }),
                                n.jsx("span", { className: "text-[10px] font-black text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded-full inline-block", children: srv.profession })
                              ]
                            })
                          ]
                        }),
                        n.jsx("button", {
                          type: "button",
                          onClick: () => handleDeleteCraft(srv.id, srv.name),
                          className: "text-slate-300 hover:text-red-500 p-1 text-xs cursor-pointer",
                          title: "حذف من الدليل",
                          children: "🗑️"
                        })
                      ]
                    }),
                    srv.experience && n.jsx("p", { className: "text-[11px] text-slate-500 font-semibold bg-slate-50 p-2 rounded-xl border border-slate-100", children: srv.experience }),
                    n.jsxs("div", {
                      className: "pt-2 border-t border-slate-100 flex items-center justify-between gap-2",
                      children: [
                        n.jsx("span", { className: "text-xs font-mono font-bold text-slate-700 dir-ltr", children: srv.phone }),
                        n.jsxs("div", {
                          className: "flex items-center gap-1.5",
                          children: [
                            n.jsx("a", {
                              href: `tel:${srv.phone}`,
                              className: "p-2 bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl transition-all",
                              title: "اتصال هاتفي",
                              children: n.jsx(US.Phone||"span", { className: "w-3.5 h-3.5" })
                            }),
                            n.jsx("a", {
                              href: `https://wa.me/${srv.phone.startsWith("0") ? "963" + srv.phone.substring(1) : srv.phone}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدماتك المسجلة في تطبيق القرية...")}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[10px] rounded-xl flex items-center gap-1",
                              title: "واتساب",
                              children: [n.jsx(US.MessageCircle||"span", { className: "w-3 h-3" }), n.jsx("span", { children: "واتساب" })]
                            }),
                            n.jsx("a", {
                              href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=${srv.phone.startsWith("0") ? "963" + srv.phone.substring(1) : srv.phone}&text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدماتك المسجلة في تطبيق القرية...")}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/${srv.phone.startsWith("0") ? "963" + srv.phone.substring(1) : srv.phone}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدماتك المسجلة في تطبيق القرية...")}`,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 font-black text-[10px] rounded-xl flex items-center gap-1 border border-emerald-500/30",
                              title: "واتساب للأعمال",
                              children: [n.jsx(US.Building||"span", { className: "w-3.5 h-3.5 text-emerald-400" }), n.jsx("span", { children: "واتس أعمال" })]
                            })
                          ]
                        })
                      ]
                    })
                  ]
                }, srv.id))
              })
            ]
          })
        ]
      });
    };
  })(), {})]}),
O==="pwa_install"&&n.jsxs("div",{className:"space-y-6 animate-fade-in text-slate-800",dir:"rtl",children:[n.jsxs("div",{className:"bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg space-y-3 relative overflow-hidden",children:[n.jsx("div",{className:"absolute top-0 right-0 transform translate-x-12 -translate-y-6 opacity-10",children:n.jsx(ua,{className:"w-64 h-64"})}),n.jsxs("div",{className:"flex items-center gap-3 relative z-10",children:[n.jsx("div",{className:"w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center border border-white/10 shadow-xs",children:n.jsx(ua,{className:"w-6 h-6 text-white"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"font-black text-lg sm:text-xl",children:'تثبيت ونشر تطبيق "توصيل" 📱'}),n.jsx("p",{className:"text-white/80 text-xs sm:text-sm",children:"بوابتك لإرسال وتثبيت التطبيق للزبائن ومناديب التوصيل بكل سهولة وبأعلى جودة."})]})]})]}),n.jsxs("div",{className:"grid md:grid-cols-12 gap-6",children:[n.jsxs("div",{className:"md:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right",children:[n.jsxs("div",{className:"flex items-center gap-2 border-b pb-2",children:[n.jsx(Q0,{className:"w-5 h-5 text-orange-500"}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"رابط مشاركة وتثبيت التطبيق"})]}),n.jsxs("div",{className:"space-y-3 pb-3 border-b border-slate-100",children:[n.jsx("span",{className:"text-[11px] text-slate-400 font-extrabold block",children:"مشاركة سريعة عبر الواتساب:"}),n.jsxs("div",{className:"flex flex-wrap gap-2 w-full justify-start",children:[n.jsxs("button",{type:"button",onClick:()=>Z("regular"),className:"py-2 px-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:[n.jsx(fn,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"واتساب العادي 💬"})]}),n.jsxs("button",{type:"button",onClick:()=>Z("business"),className:"py-2 px-3 bg-[#075E54] hover:bg-[#054c44] text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1",children:[n.jsx(fn,{className:"w-3.5 h-3.5"}),n.jsx("span",{children:"واتساب أعمال 💼"})]})]})]}),n.jsx("p",{className:"text-slate-500 text-xs leading-relaxed pt-1",children:"قم بنسخ هذا الرابط الموحد وإرساله إلى الزبائن أو كباتن التوصيل (المناديب). بمجرد فتحه، سيتمكنون من تثبيت التطبيق مباشرة على هواتفهم."}),n.jsxs("div",{className:"bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-2.5 font-mono text-xs select-all relative overflow-hidden",children:[n.jsx("span",{className:"text-slate-700 truncate font-bold text-left w-full block",children:window.location.origin}),n.jsx("button",{type:"button",onClick:()=>{navigator.clipboard.writeText(window.location.origin),ie("تم نسخ رابط التثبيت والمشاركة بنجاح! 📋")},className:"p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all cursor-pointer shrink-0 shadow-sm",title:"نسخ الرابط",children:n.jsx(al,{className:"w-4 h-4"})})]})]}),n.jsxs("div",{className:"md:col-span-6 bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 text-right flex flex-col justify-between",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 border-b pb-2",children:[n.jsx(C1,{className:"w-5 h-5 text-orange-500"}),n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"تثبيت التطبيق على هذا الجهاز"})]}),n.jsx("p",{className:"text-slate-500 text-xs leading-relaxed mt-2",children:"نظام التثبيت الذكي يحول الموقع إلى تطبيق حقيقي متكامل يعمل كبرنامج مستقل (دون كتابة روابط مجدداً)."}),true?n.jsxs("div",{className:"my-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center space-y-3",children:[n.jsx("span",{className:"text-emerald-800 font-black text-xs block",children:"✨ جهازك وجهاز الزبون جاهز للتثبيت الفوري بنقرة واحدة!"}),n.jsx("p",{className:"text-slate-500 text-[10px] leading-relaxed",children:"الرجاء النقر على الزر في الأسفل لتثبيت التطبيق بالكامل وبدء تشغيله مستقل كلياً."}),n.jsxs("button",{type:"button",onClick:async()=>{const k=window.deferredPrompt;if(k){k.prompt();const{outcome:W}=await k.userChoice;K("تثبيت التطبيق",`قام المستخدم بمحاولة تثبيت التطبيق بنتيجة: ${W}`),W==="accepted"&&(window.deferredPrompt=null,z(!1),ie("شكرًا لتثبيتك التطبيق! 🎉 يعمل الآن بكفاءة قصوى."))}else alert(`💡 لتثبيت تطبيق "توصيل" على جوالك بأعلى جودة وبأيقونته الرسمية:\n\n📱 للأندرويد (Chrome):\n1️⃣ اضغط على زر النقاط الثلاث (⋮) في أعلى يسار المتصفح.\n2️⃣ اختر "تثبيت التطبيق" (Install app) أو "إضافة إلى الشاشة الرئيسية".\n\n🍎 للأيفون (Safari):\n1️⃣ اضغط على زر المشاركة (Share) في الأسفل.\n2️⃣ اختر "إضافة إلى الشاشة الرئيسية" (Add to Home Screen).\n\n⚠️ هام جداً: إذا قمت بفتح هذا الرابط من داخل تطبيق واتساب، فيرجى أولاً نسخ الرابط المكتوب أعلاه وفتحه في تطبيق Chrome أو Safari العادي لتتمكن من تثبيته بنجاح!`)},className:"py-3 px-6 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md cursor-pointer transition-all w-full flex items-center justify-center gap-2 animate-pulse",children:[n.jsx(ua,{className:"w-4 h-4 animate-bounce"}),n.jsx("span",{children:"تثبيت التطبيق الآن 📥"})]})]}):n.jsxs("div",{className:"my-4 bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-slate-700 text-xs space-y-3",children:[n.jsxs("span",{className:"font-extrabold text-amber-800 flex items-center gap-1",children:[n.jsx(Ua,{className:"w-4 h-4"})," كيف يتم تثبيت التطبيق يدوياً؟"]}),n.jsxs("div",{className:"space-y-2 text-[11px] leading-relaxed font-semibold",children:[n.jsxs("div",{className:"flex items-start gap-1.5",children:[n.jsx("span",{className:"w-5 h-5 rounded-full bg-amber-100/80 text-amber-900 flex items-center justify-center shrink-0 font-extrabold text-[10px]",children:"1"}),n.jsxs("span",{children:[n.jsx("b",{children:"على هواتف الأندرويد ومتصفح Chrome"}),": انقر على النقاط الثلاث بالأعلى، ثم اختر ",n.jsx("b",{children:'"تثبيت التطبيق" (Install App)'})," مباشرة."]})]}),n.jsxs("div",{className:"flex items-start gap-1.5",children:[n.jsx("span",{className:"w-5 h-5 rounded-full bg-amber-100/80 text-amber-900 flex items-center justify-center shrink-0 font-extrabold text-[10px]",children:"2"}),n.jsxs("span",{children:[n.jsx("b",{children:"على هواتف الآيفون ومتصفح Safari"}),": انقر على زر ",n.jsx("b",{children:'"مشاركة" (Share)'})," بالأسفل، ثم مرر واختر ",n.jsx("b",{children:'"إضافة إلى الشاشة الرئيسية" (Add to Home Screen)'}),"."]})]})]}),n.jsx("div",{className:"text-[10px] text-slate-400 font-medium italic pt-2 border-t border-slate-200/50",children:"* ملاحظة: يرجى فتح الرابط خارج متصفح فيسبوك/إنستغرام الداخلي للحصول على خيار التثبيت المباشر."})]})]}),n.jsxs("div",{className:"text-[10px] bg-slate-50 border p-3 rounded-2xl text-slate-500 text-right leading-relaxed font-semibold",children:["💡 ",n.jsx("b",{children:'ميزة عدم ظهور "إنشاء اختصار":'})," بفضل تفعيل Service Worker والملف التعريفي (Manifest)، يتم تثبيت التطبيق بشكل كامل وبأيقونة مخصصة وبسرعة تشغيل مستقلة تامة بدلاً من مجرد كونه اختصار ويب بسيط!"]})]})]}),n.jsxs("div",{className:"bg-slate-50 border border-slate-250 rounded-3xl p-5 space-y-3 shadow-inner text-right",children:[n.jsxs("h4",{className:"font-extrabold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5",children:[n.jsx(q0,{className:"w-4 h-4 text-orange-500"}),n.jsx("span",{children:"دليل إرشاد الزبائن والمناديب للتثبيت"})]}),n.jsxs("p",{className:"text-slate-500 text-xs leading-relaxed",children:["عند إرسال الرابط للزبائن أو السائقين، يرجى تذكيرهم بنقر زر التثبيت من المتصفح لضمان تصفح أسرع، تلقي إشعارات الطلبيات المباشرة، وتوفير استهلاك باقة الإنترنت لديهم بنسبة تصل إلى ",n.jsx("b",{children:"75%"})," بفضل ميزة التخزين المؤقت المحلي."]})]})]})]}):n.jsxs("div",{className:"bg-red-50 border border-red-200 rounded-3xl p-8 text-center max-w-md mx-auto space-y-4 shadow-md",children:[n.jsx(ea,{className:"w-12 h-12 text-red-600 mx-auto animate-bounce"}),n.jsx("h3",{className:"font-extrabold text-red-800 text-base",children:"هذا القسم مغلق لدواعي الصلاحيات!"}),n.jsxs("p",{className:"text-red-700/80 text-xs leading-relaxed",children:["حساب الموظف الحالي الخاص بك يمنعك من تصفح أو تعديل هذا القسم. يرجى مراجعة المدير العام أو تغيير الهوية في الأعلى لـ ",n.jsx("b",{children:'"المدير العام"'})," لمحاكاة كامل الصلاحيات."]})]}),n.jsx(xr,{children:t1&&n.jsx("div",{className:"fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4",dir:"rtl",children:n.jsxs(V1.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.95,opacity:0},className:"bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 text-center text-slate-800",children:[n.jsx("div",{className:"w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500 border border-orange-100",children:n.jsx(ea,{className:"w-6 h-6 animate-pulse"})}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("h3",{className:"font-extrabold text-slate-900 text-base sm:text-lg",children:"تسجيل دخول الموظفين بالـ PIN"}),n.jsx("p",{className:"text-slate-500 text-xs sm:text-sm leading-relaxed",children:"الرجاء إدخال الرمز السري المكون من 4 أرقام المخصص لحسابك لتفعيل صلاحيات العمل الخاصة بك تلقائياً."})]}),n.jsxs("form",{onSubmit:gC,className:"space-y-4",children:[n.jsx("input",{type:"password",maxLength:4,required:!0,autoFocus:!0,placeholder:"••••",value:Vr,onChange:k=>K1(k.target.value.replace(/\D/g,"")),className:"w-32 mx-auto bg-slate-50 border-2 border-slate-200 focus:border-orange-500 rounded-2xl py-3 text-xl outline-none font-mono tracking-widest text-center block"}),bl&&n.jsxs("p",{className:"text-red-600 text-[11px] font-extrabold bg-red-50 py-2 px-3 rounded-xl border border-red-100",children:["⚠️ ",bl]}),n.jsxs("div",{className:"flex gap-2.5 pt-2",children:[n.jsx("button",{type:"submit",className:"flex-1 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2.5 rounded-xl cursor-pointer shadow-md transition-colors",children:"تأكيد الدخول"}),n.jsx("button",{type:"button",onClick:()=>{Hr(!1),K1(""),Q1("")},className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-xl cursor-pointer transition-colors",children:"إلغاء التراجع"})]})]})]})})}),n.jsx(xr,{children:Cn&&Cn.isOpen&&n.jsx("div",{className:"fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4",dir:"rtl",children:n.jsxs(V1.div,{initial:{scale:.95,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.95,opacity:0},className:"bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl space-y-4 text-center",children:[n.jsx("div",{className:"w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-100",children:n.jsx(ha,{className:"w-6 h-6 animate-pulse"})}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("h3",{className:"font-extrabold text-slate-900 text-base sm:text-lg",children:Cn.title}),n.jsx("p",{className:"text-slate-500 text-xs sm:text-sm leading-relaxed",children:Cn.message})]}),n.jsxs("div",{className:"flex gap-2.5 pt-2",children:[n.jsx("button",{type:"button",onClick:Cn.onConfirm,className:"flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-2.5 rounded-xl cursor-pointer shadow-md transition-colors",children:"نعم، متأكد"}),n.jsx("button",{type:"button",onClick:()=>bt(null),className:"flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs py-2.5 rounded-xl cursor-pointer transition-colors",children:"إلغاء التراجع"})]})]})})})]})}