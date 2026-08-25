function Q3e({store:o,onBack:i,cartItems:d,onAddToCart:r,onRemoveFromCart:u,onViewCart:f,products:p,onSubmitCustomOrder:customSubmit,customerUser:customerUser,mapNodes:mapNodes,setActiveOrder:setActiveOrder}){
  const[m,g]=_.useState(""),[x,b]=_.useState(null),[M,w]=_.useState(null),[C,L]=_.useState([]),
  [showPrescriptionModal, setShowPrescriptionModal]=_.useState(false),
  [prescriptionImage, setPrescriptionImage]=_.useState(""),
  [prescriptionNotes, setPrescriptionNotes]=_.useState(""),
  [prescriptionLandmark, setPrescriptionLandmark]=_.useState("center"),
  [prescriptionName, setPrescriptionName]=_.useState(customerUser?customerUser.name:""),
  [prescriptionPhone, setPrescriptionPhone]=_.useState(customerUser?customerUser.phone:""),
  [serviceNotes, setServiceNotes]=_.useState(""),
  [serviceSchedule, setServiceSchedule]=_.useState("الآن (عاجل)"),
  [serviceLandmark, setServiceLandmark]=_.useState("center"),
  [serviceName, setServiceName]=_.useState(customerUser?customerUser.name:""),
  [servicePhone, setServicePhone]=_.useState(customerUser?customerUser.phone:"");

  const q=(p||dq).filter(z=>z.storeId===o.id).filter(z=>(z.name.toLowerCase().includes(m.toLowerCase())||z.description.toLowerCase().includes(m.toLowerCase()))&&!z.isHidden),
  E=z=>d.filter(Z=>Z.product.id===z).reduce((Z,G)=>Z+G.quantity,0),
  U=d.reduce((z,Z)=>z+Z.quantity,0),
  F=z=>{z.sizes&&z.sizes.length>0||z.additions&&z.additions.length>0?(b(z),w(z.sizes&&z.sizes.length>0?z.sizes[0]:null),L([])):r(z)},
  O=z=>{L(Z=>Z.find(J=>J.name===z.name)?Z.filter(J=>J.name!==z.name):[...Z,z])},
  ne=()=>{x&&(r(x,M||void 0,C),b(null),w(null),L([]))},
  se=()=>{if(!x)return 0;const z=M?M.price:x.price,Z=C.reduce((G,J)=>G+J.price,0);return z+Z};

  const isServiceStore = ["doctors", "crafts", "drivers"].includes(o.category) || o.isService || o.id.startsWith("service_");
  const isPharmacy = o.category === "pharmacies" || o.id === "store_shifa";

  return n.jsxs("div",{className:"space-y-6",children:[
    n.jsxs("div",{className:"flex items-center justify-between",children:[
      n.jsxs("button",{onClick:i,className:"flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white py-2.5 px-4 rounded-xl border border-slate-200 shadow-sm cursor-pointer hover:shadow transition-all",children:[n.jsx(Zn,{className:"w-4 h-4"}),n.jsx("span",{children:"الرجوع للمتاجر"})]}),
      U>0&&n.jsxs("button",{onClick:f,className:"flex items-center gap-2 text-sm font-extrabold text-white bg-orange-500 hover:bg-orange-600 py-2.5 px-5 rounded-xl border border-white shadow-lg shadow-orange-500/20 cursor-pointer animate-bounce-slow",children:[n.jsx(Za,{className:"w-4.5 h-4.5"}),n.jsxs("span",{children:["عرض السلة الحالية (",U," سلع)"]})]})
    ]}),
    n.jsxs("div",{className:"bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden select-none",children:[
      n.jsx("div",{className:"absolute inset-0 bg-cover bg-center opacity-10",style:{backgroundImage:`url('${o.image}')`}}),
      n.jsx("div",{className:"absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"}),
      n.jsxs("div",{className:"relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[
        n.jsxs("div",{className:"space-y-2 text-right",children:[
          n.jsx("h2",{className:"text-2xl sm:text-3xl font-extrabold tracking-tight",children:o.name}),
          n.jsxs("div",{className:"flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200",children:[
            n.jsxs("span",{className:"flex items-center gap-1 bg-orange-500 text-white font-extrabold px-2.5 py-0.5 rounded-full shadow-sm",children:[n.jsx(Wn,{className:"w-3.5 h-3.5 fill-current text-white"}),o.rating]}),
            n.jsxs("span",{className:"flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full",children:[n.jsx(Ga,{className:"w-3.5 h-3.5"}),o.deliveryTime]}),
            n.jsxs("span",{className:"flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full",children:[n.jsx(cl,{className:"w-3.5 h-3.5"}),"توصيل: ",o.deliveryFee," ل.س"]}),
            o.address&&n.jsxs("span",{className:"flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-0.5 rounded-full text-orange-300 font-bold",children:[n.jsx(Ia,{className:"w-3.5 h-3.5"}),"العنوان: ",o.address]})
          ]})
        ]}),
        n.jsxs("div",{className:"hidden sm:block text-right",children:[
          n.jsx("span",{className:"text-slate-300 text-xs",children:"نطاق التسليم للتطبيق"}),
          n.jsx("p",{className:"font-semibold text-sm text-orange-400",children:o.deliveryArea||"القرية وضواحيها المجاورة"})
        ]})
      ]})
    ]}),
    
    isPharmacy&&n.jsx("div",{className:"bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-5 sm:p-6 shadow-lg relative overflow-hidden select-none border border-orange-400/20 text-right mb-4",children:n.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10",children:[
      n.jsxs("div",{className:"space-y-1.5",children:[
        n.jsx("span",{className:"bg-white/20 text-white font-extrabold text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border border-white/10",children:"خيارات خاصة بالصيدلية 🏥"}),
        n.jsx("h3",{className:"font-black text-sm sm:text-base text-white",children:"هل لديك وصفة طبيب ورقية أو دواء تبحث عنه؟"}),
        n.jsx("p",{className:"text-white/85 text-[11px] leading-relaxed max-w-lg",children:"أرفق صورة الروشتة أو اكتب الأدوية التي تحتاجها، وسيقوم الصيدلاني بتجهيزها وإرسالها مع المندوب لعتبة بيتك فوراً!"})
      ]}),
      n.jsx("button",{onClick:()=>setShowPrescriptionModal(true),className:"bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm py-2.5 px-4.5 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0",children:"إرسال روشتة / وصفة الطبيب 📄"})
    ]})}),

    isServiceStore?n.jsxs("div",{className:"space-y-6 text-right animate-fade-in",children:[
      n.jsxs("div",{className:"bg-white rounded-2xl p-5 sm:p-6 border border-slate-150 shadow-md space-y-3.5",children:[
        n.jsx("h3",{className:"text-base font-extrabold text-slate-800",children:"اتصال سريع ومباشر ⚡"}),
        n.jsx("p",{className:"text-slate-400 text-xs leading-relaxed",children:"بإمكانك التحدث هاتفياً بشكل فوري أو مراسلته مجاناً عبر تطبيق الواتساب لتنسيق موعد أو طلب استشارة سريعة:"}),
        n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1",children:[
          n.jsxs("a",{href:`tel:${o.contactPhone||o.phone||o.ownerPhone||"0944111222"}`,className:"flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer",children:[
            n.jsx(Yn,{className:"w-4 h-4 animate-pulse"}),
            n.jsxs("span",{children:["اتصال هاتفي مباشر (",o.contactPhone||o.phone||o.ownerPhone||"0944111222",")"]})
          ]}),
          n.jsxs("a",{href:/Android/i.test(navigator.userAgent)?`intent://send?phone=${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}&text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}#Intent;package=com.whatsapp;scheme=whatsapp;end`:`https://wa.me/${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}`,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer",children:[n.jsx(US.MessageSquare||"span",{className:"w-4 h-4"}),n.jsx("span",{children:"واتساب 💬"})]}),
          n.jsxs("a",{href:/Android/i.test(navigator.userAgent)?`intent://send?phone=${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}&text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end`:`https://wa.me/${(o.contactPhone||o.phone||o.ownerPhone||"0944111222").replace(/^0/,"963")}?text=${encodeURIComponent("السلام عليكم ورحمة الله وبركاته، أود التواصل معك بخصوص خدمة من تطبيق القرية...")}`,target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-1.5 bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-xl shadow-sm transition-all active:scale-97 cursor-pointer border border-emerald-500/40",children:[n.jsx(US.Building||"span",{className:"w-4 h-4 text-emerald-400"}),n.jsx("span",{children:"واتس الأعمال 💼"})]})
        ]})
      ]}),
      n.jsxs("div",{className:"bg-white rounded-2xl p-5 sm:p-6 border border-slate-150 shadow-md space-y-4",children:[
        n.jsxs("div",{className:"border-b border-slate-100 pb-3",children:[
          n.jsx("h3",{className:"text-base font-extrabold text-slate-800",children:"إرسال طلب خدمة وحجز عبر التطبيق 🛠️"}),
          n.jsx("p",{className:"text-slate-400 text-xs mt-1",children:"املأ تفاصيل الخدمة والموعد المناسب وسيتلقى صاحب المهنة الطلب ويثبت الحالة للتوصيل المباشر."})
        ]}),
        n.jsxs("div",{className:"space-y-4",children:[
          n.jsxs("div",{className:"space-y-1.5",children:[
            n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"تفاصيل الخدمة المطلوبة وملاحظاتك بالكامل 📝"}),
            n.jsx("textarea",{value:serviceNotes,onChange:e=>setServiceNotes(e.target.value),placeholder:"اكتب بالتفصيل ما الذي تريده تحديداً (مثال: أحتاج فحص طبيب في العيادة / صيانة باب خارجي / توصيلة لوسط البلد)...",rows:3,className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold resize-none"})
          ]}),
          n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"الموعد المفضل لتقديم الخدمة"}),
              n.jsxs("select",{value:serviceSchedule,onChange:e=>setServiceSchedule(e.target.value),className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs outline-none text-slate-800 font-bold cursor-pointer",children:[
                n.jsx("option",{value:"الآن (عاجل وفوري)",children:"الآن (عاجل وفوري)"}),
                n.jsx("option",{value:"اليوم لاحقاً",children:"اليوم لاحقاً"}),
                n.jsx("option",{value:"غداً صباحاً",children:"غداً صباحاً"}),
                n.jsx("option",{value:"غداً مساءً",children:"غداً مساءً"}),
                n.jsx("option",{value:"تنسيق هاتفي لاحق",children:"تنسيق هاتفي لاحق"})
              ]})
            ]}),
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"أقرب معلم مشهور في منطقتك لزيارتك"}),
              n.jsxs("select",{value:serviceLandmark,onChange:e=>setServiceLandmark(e.target.value),className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs outline-none text-slate-800 font-bold cursor-pointer",children:(mapNodes||[]).filter(z=>z.type==="landmark"||z.type==="intersection").map(z=>n.jsx("option",{value:z.id,children:z.arabicName},z.id))})
            ]})
          ]}),
          n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"اسمكم الكريم"}),
              n.jsx("input",{type:"text",value:serviceName,onChange:e=>setServiceName(e.target.value),placeholder:"الاسم الكامل للزبون",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold"})
            ]}),
            n.jsxs("div",{className:"space-y-1.5",children:[
              n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"رقم الموبايل للتواصل"}),
              n.jsx("input",{type:"text",value:servicePhone,onChange:e=>setServicePhone(e.target.value),placeholder:"مثال: 0933123456",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold text-right"})
            ]})
          ]}),
          n.jsx("button",{type:"button",onClick:()=>{
            if(!serviceNotes.trim()){alert("الرجاء إدخال تفاصيل الخدمة لمساعدة مقدم الخدمة.");return}
            if(!serviceName.trim()||!servicePhone.trim()){alert("الرجاء إدخال الاسم ورقم الهاتف ليتواصل معكم صاحب المهنة.");return}
            const oList=localStorage.getItem("tw_orders_list"),current_orders=oList?JSON.parse(oList):[];
            const serviceOrder={
              id:"tw-"+Math.floor(Math.random()*9e4+1e4),
              storeId:o.id,
              storeName:o.name,
              items:[{
                product:{
                  id:"service_"+o.id+"_"+Date.now(),
                  name:"طلب خدمة وتنسيق مباشر 🛠️",
                  price:0,
                  description:serviceNotes,
                  image:o.image,
                  category:o.category,
                  storeId:o.id
                },
                quantity:1,
                totalItemPrice:0
              }],
              subtotal:0,
              deliveryFee:0,
              total:0,
              status:"pending",
              paymentMethod:"cod",
              addressLandmark:serviceLandmark,
              additionalDirections:`الموعد: ${serviceSchedule} | ملاحظات: ${serviceNotes}`,
              customerName:serviceName.trim(),
              customerPhone:servicePhone.trim(),
              createdAt:new Date().toISOString(),
              isServiceRequest:true
            };
            const updated_orders=[serviceOrder,...current_orders];
            localStorage.setItem("tw_orders_list",JSON.stringify(updated_orders));
            customSubmit&&customSubmit(updated_orders);
            setActiveOrder&&setActiveOrder(serviceOrder);
          },className:"w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl cursor-pointer shadow-md active:scale-97 transition-all flex items-center justify-center gap-1.5",children:"إرسال طلب الخدمة الآن وتتبع حالتها عبر التطبيق 🚀"})
        ]})
      ]})
    ]}) : n.jsxs("div",{className:"space-y-5",children:[
      n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5",children:[
        n.jsx("h3",{className:"text-lg font-extrabold text-slate-800 text-right",children:"قائمة السلع والمنتجات"}),
        n.jsxs("div",{className:"relative w-full sm:max-w-xs",children:[
          n.jsx("input",{type:"text",value:m,onChange:z=>g(z.target.value),placeholder:"ابحث عن منتج بالاسم أو الوصف...",className:"w-full bg-white border border-slate-200 focus:border-slate-900 rounded-xl py-2.5 pr-10 pl-4 text-xs sm:text-sm outline-none text-slate-800 transition-all shadow-sm text-right"}),
          n.jsx(yr,{className:"w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2"})
        ]})
      ]}),
      q.length===0?n.jsxs("div",{className:"bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3",children:[
        n.jsx("p",{className:"text-slate-500 font-bold",children:"لم نجد أي منتج يطابق بحثك!"}),
        n.jsx("p",{className:"text-slate-400 text-xs max-w-sm mx-auto",children:'جرب البحث بكلمات أخرى كـ "شاورما" أو "أرز" أو "بيض" لتجد طلبك بسرعة.'})
      ]}):n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:q.map(z=>{
        const Z=E(z.id),G=z.sizes&&z.sizes.length>0||z.additions&&z.additions.length>0;
        return n.jsxs("div",{className:"bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4 relative overflow-hidden text-right",children:[
          z.isOffer&&n.jsxs("div",{className:"absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md",children:[n.jsx(mn,{className:"w-3 h-3"}),n.jsx("span",{children:z.offerLabel||"عرض خاص"})]}),
          n.jsx("div",{className:"w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",children:n.jsx("img",{src:z.image,alt:z.name,className:"w-full h-full object-cover",referrerPolicy:"no-referrer"})}),
          n.jsxs("div",{className:"flex-1 flex flex-col justify-between py-1 min-w-0",children:[
            n.jsxs("div",{className:"space-y-1",children:[
              n.jsxs("div",{className:"flex items-center gap-1.5 justify-end",children:[
                G&&n.jsx("span",{className:"text-[8px] bg-orange-50 text-orange-650 px-1.5 py-0.5 rounded font-extrabold shrink-0",children:"قابل للتخصيص"}),
                n.jsx("h4",{className:"font-extrabold text-slate-855 text-sm sm:text-base leading-tight truncate",children:z.name})
              ]}),
              n.jsx("p",{className:"text-slate-400 text-xs line-clamp-2 leading-relaxed",children:z.description})
            ]}),
            n.jsxs("div",{className:"flex items-center justify-between mt-2.5",children:[
              G?n.jsxs("div",{className:"flex items-center gap-1.5",children:[
                Z>0&&n.jsxs("span",{className:"text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-extrabold",children:["بالسلة: ",Z]}),
                n.jsx("button",{onClick:()=>F(z),className:"bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-sm cursor-pointer whitespace-nowrap",children:"تخصيص وإضافة"})
              ]}):Z===0?n.jsx("button",{onClick:()=>F(z),className:"bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap",children:"إضافة للسلة"}):n.jsxs("div",{className:"flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1 shadow-sm select-none",children:[
                n.jsx("button",{onClick:()=>u(z),className:"w-7 h-7 flex items-center justify-center rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold text-base transition-all active:scale-90 cursor-pointer",children:"-"}),
                n.jsx("span",{className:"w-8 text-center text-xs font-extrabold text-slate-800",children:Z}),
                n.jsx("button",{onClick:()=>r(z),className:"w-7 h-7 flex items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-base transition-all active:scale-90 cursor-pointer",children:"+"})
              ]}),
              n.jsxs("div",{className:"flex items-baseline gap-1.5 flex-wrap",children:[
                z.isOffer&&z.originalPrice&&n.jsxs("span",{className:"text-slate-300 line-through text-xs font-semibold",children:[z.originalPrice," ل.س"]}),
                n.jsxs("span",{className:"text-orange-600 font-extrabold text-base sm:text-lg",children:[z.price," ل.س"]})
              ]})
            ]})
          ]})
        ]},z.id)
      })})
    ]}),
    
    n.jsx(xr,{children:x&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in",dir:"rtl",children:n.jsxs(V1.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},className:"bg-white rounded-3xl border border-slate-200 max-w-md w-full overflow-hidden shadow-2xl flex flex-col",children:[
      n.jsxs("div",{className:"p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50",children:[
        n.jsxs("div",{className:"space-y-0.5 text-right",children:[
          n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"تخصيص المكونات والخيارات"}),
          n.jsx("p",{className:"text-[11px] text-slate-400 font-bold truncate max-w-[250px]",children:x.name})
        ]}),
        n.jsx("button",{onClick:()=>b(null),className:"w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 cursor-pointer transition-all",children:n.jsx(H1,{className:"w-5 h-5"})})
      ]}),
      n.jsxs("div",{className:"p-5 overflow-y-auto space-y-5 max-h-[350px] text-right",children:[
        x.sizes&&x.sizes.length>0&&n.jsxs("div",{className:"space-y-2.5",children:[
          n.jsx("span",{className:"text-xs text-slate-500 font-extrabold block",children:"اختر الحجم المطلوب:"}),
          n.jsx("div",{className:"grid grid-cols-3 gap-2",children:x.sizes.map((z,Z)=>{
            const G=(M==null?void 0:M.name)===z.name;
            return n.jsxs("button",{type:"button",onClick:()=>w(z),className:`p-2.5 rounded-xl border text-center transition-all flex flex-col justify-center items-center gap-1 cursor-pointer ${G?"border-slate-900 bg-slate-900 text-white shadow-md":"border-slate-200 text-slate-700 bg-white hover:bg-slate-50"}`,children:[
              n.jsx("span",{className:"text-xs font-bold",children:z.name}),
              n.jsxs("span",{className:`text-[10px] ${G?"text-orange-400":"text-slate-400"} font-extrabold`,children:[z.price," ل.س"]})
            ]},Z)
          })})
        ]}),
        x.additions&&x.additions.length>0&&n.jsxs("div",{className:"space-y-2.5",children:[
          n.jsx("span",{className:"text-xs text-slate-500 font-extrabold block",children:"أضف مكونات إضافية على ذوقك:"}),
          n.jsx("div",{className:"space-y-2",children:x.additions.map((z,Z)=>{
            const G=!!C.find(J=>J.name===z.name);
            return n.jsxs("div",{onClick:()=>O(z),className:`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${G?"border-orange-500 bg-orange-50/20":"border-slate-150 bg-white hover:bg-slate-50"}`,children:[
              n.jsxs("div",{className:"flex items-center gap-2",children:[
                n.jsx("span",{className:`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${G?"bg-orange-500 border-orange-500 text-white":"border-slate-300"}`,children:G&&n.jsx(Xn,{className:"w-3 h-3 stroke-[3]"})}),
                n.jsx("span",{className:"text-xs font-semibold",children:z.name})
              ]}),
              n.jsxs("span",{className:"text-[10px] text-slate-400 font-extrabold",children:["+",z.price," ل.س"]})
            ]},Z)
          })})
        ]})
      ]}),
      n.jsxs("div",{className:"p-5 border-t border-slate-150 bg-slate-50 flex items-center justify-between",children:[
        n.jsxs("div",{className:"text-right",children:[
          n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"السعر النهائي بالتعديلات"}),
          n.jsxs("b",{className:"text-base font-extrabold text-orange-650 text-orange-600",children:[se()," ل.س"]})
        ]}),
        n.jsxs("button",{type:"button",onClick:ne,className:"bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-lg shadow-orange-500/10 cursor-pointer active:scale-97 transition-all flex items-center gap-1.5",children:[n.jsx(Xn,{className:"w-4 h-4"}),n.jsx("span",{children:"تأكيد الإضافة للسلة"})]})
      ]})
    ]})})}),

    showPrescriptionModal&&n.jsx("div",{className:"fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in",dir:"rtl",children:n.jsxs("div",{className:"bg-white rounded-3xl border border-slate-200 max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]",children:[
      n.jsxs("div",{className:"p-5 border-b border-slate-150 flex items-center justify-between bg-slate-50",children:[
        n.jsxs("div",{className:"space-y-0.5 text-right",children:[
          n.jsx("h4",{className:"font-extrabold text-slate-800 text-sm sm:text-base",children:"📄 إرسال وصفة طبيب / روشتة"}),
          n.jsx("p",{className:"text-[11px] text-slate-400 font-bold",children:"سيتلقى الصيدلاني الوصفة ويقوم بتجهيز الأدوية المناسبة وتوصيلها فوراً."})
        ]}),
        n.jsx("button",{onClick:()=>setShowPrescriptionModal(false),className:"w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 cursor-pointer transition-all",children:n.jsx(H1,{className:"w-5 h-5"})})
      ]}),
      n.jsxs("div",{className:"p-5 overflow-y-auto space-y-4 text-right flex-1",children:[
        n.jsxs("div",{className:"space-y-1.5",children:[
          n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"قم برفع صورة الوصفة الطبية 📸"}),
          n.jsxs("div",{className:"border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-2xl p-4 transition-all text-center relative bg-slate-50 cursor-pointer",onClick:()=>document.getElementById("prescription-file-input").click(),children:[
            prescriptionImage?n.jsx("img",{src:prescriptionImage,className:"max-h-40 mx-auto object-contain rounded-xl border"}):n.jsxs("div",{className:"space-y-1.5 py-4",children:[
              n.jsx(US.Upload,{className:"w-8 h-8 text-slate-400 mx-auto"}),
              n.jsx("span",{className:"text-xs text-slate-500 font-bold block",children:"اسحب الصورة هنا أو اضغط للاختيار من الاستوديو"})
            ]}),
            n.jsx("input",{type:"file",id:"prescription-file-input",accept:"image/*",className:"hidden",onChange:e=>{
              const file=e.target.files[0];
              if(!file)return;
              const reader=new FileReader();
              reader.onload=event=>{
                const img=new Image();
                img.onload=()=>{
                  const canvas=document.createElement("canvas");
                  let width=img.width,height=img.height;
                  const max_size=800;
                  if(width>height){if(width>max_size){height*=max_size/width;width=max_size}}else{if(height>max_size){width*=max_size/height;height=max_size}}
                  canvas.width=width;canvas.height=height;
                  const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,width,height);
                  setPrescriptionImage(canvas.toDataURL("image/jpeg",0.7));
                };
                img.src=event.target.result;
              };
              reader.readAsDataURL(file);
            }})
          ]})
        ]}),
        n.jsxs("div",{className:"space-y-1.5",children:[
          n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"قائمة الأدوية أو ملاحظات إضافية للصيدلاني ✍️"}),
          n.jsx("textarea",{value:prescriptionNotes,onChange:e=>setPrescriptionNotes(e.target.value),placeholder:"اكتب هنا أسماء الأدوية المطلوبة أو أي ملاحظات هامة للصيدلاني (مثال: أحتاج البديل لو الدواء الأصلي غير متوفر)...",rows:3,className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold resize-none"})
        ]}),
        n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-3",children:[
          n.jsxs("div",{className:"space-y-1.5",children:[
            n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"اسم المريض الكريم"}),
            n.jsx("input",{type:"text",value:prescriptionName,onChange:e=>setPrescriptionName(e.target.value),placeholder:"الاسم الكامل",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold"})
          ]}),
          n.jsxs("div",{className:"space-y-1.5",children:[
            n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"رقم الجوال للتواصل"}),
            n.jsx("input",{type:"text",value:prescriptionPhone,onChange:e=>setPrescriptionPhone(e.target.value),placeholder:"رقم الموبايل",className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold text-right"})
          ]})
        ]}),
        n.jsxs("div",{className:"space-y-1.5",children:[
          n.jsx("label",{className:"text-xs font-extrabold text-slate-700 block",children:"أقرب معلم مشهور في قريتنا لتسليم الدواء"}),
          n.jsxs("select",{value:prescriptionLandmark,onChange:e=>setPrescriptionLandmark(e.target.value),className:"w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs outline-none text-slate-800 font-bold cursor-pointer",children:(mapNodes||[]).filter(z=>z.type==="landmark"||z.type==="intersection").map(z=>n.jsx("option",{value:z.id,children:z.arabicName},z.id))})
        ]})
      ]}),
      n.jsxs("div",{className:"p-5 border-t border-slate-150 bg-slate-50 flex items-center justify-between",children:[
        n.jsxs("div",{className:"text-right",children:[
          n.jsx("span",{className:"text-[10px] text-slate-400 block font-bold",children:"رسم التوصيل التقريبي"}),
          n.jsxs("b",{className:"text-base font-extrabold text-orange-650 text-orange-600",children:[o.deliveryFee," ل.س"]})
        ]}),
        n.jsxs("button",{type:"button",onClick:()=>{
          if(!prescriptionName.trim()||!prescriptionPhone.trim()){alert("الرجاء ملء الاسم الكريم ورقم هاتفكم ليتواصل معكم الصيدلاني.");return}
          const oList=localStorage.getItem("tw_orders_list"),current_orders=oList?JSON.parse(oList):[];
          const prescriptionOrder={
            id:"tw-"+Math.floor(Math.random()*9e4+1e4),
            storeId:o.id,
            storeName:o.name,
            items:[{
              product:{
                id:"prescription_"+o.id+"_"+Date.now(),
                name:"طلب دواء بموجب وصفة طبية 📄",
                price:0,
                description:prescriptionNotes||"طلب دواء مرفوع يدوياً بالوصفة الطبية",
                image:prescriptionImage||"https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500&auto=format&fit=crop&q=60",
                category:"pharmacies",
                storeId:o.id
              },
              quantity:1,
              totalItemPrice:0
            }],
            subtotal:0,
            deliveryFee:o.deliveryFee,
            total:o.deliveryFee,
            status:"pending",
            paymentMethod:"cod",
            addressLandmark:prescriptionLandmark,
            additionalDirections:`ملاحظات الوصفة: ${prescriptionNotes}`,
            customerName:prescriptionName.trim(),
            customerPhone:prescriptionPhone.trim(),
            createdAt:new Date().toISOString(),
            isPrescription:true
          };
          const updated_orders=[prescriptionOrder,...current_orders];
          localStorage.setItem("tw_orders_list",JSON.stringify(updated_orders));
          customSubmit&&customSubmit(updated_orders);
          setActiveOrder&&setActiveOrder(prescriptionOrder);
          setShowPrescriptionModal(false);
        },className:"bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-2.5 px-5 rounded-xl shadow-lg cursor-pointer transition-all active:scale-95",children:"تأكيد إرسال الوصفة 🚀"})
      ]})
    ]})
})
  ]})
}
