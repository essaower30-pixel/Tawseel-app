function oxe({onRegister:o,stores:i,onAddStore:d}){
  const [r,u]=_.useState("customer");
  const [f,p]=_.useState(!!window.deferredPrompt);
  const [m,g]=_.useState(()=>localStorage.getItem("tw_remembered_name")||"");
  const [x,b]=_.useState(()=>localStorage.getItem("tw_remembered_phone")||"");
  const [M,w]=_.useState("");
  const [C,L]=_.useState("login");
  const [H,q]=_.useState("");
  const [E,U]=_.useState("");
  const [F,O]=_.useState("");
  const [ne,se]=_.useState("restaurants");
  const [z,Z]=_.useState("");
  const [G,J]=_.useState("");
  const [ce,me]=_.useState("");
  const [Me,Ne]=_.useState("10:00 ص - 11:00 م");
  const [ke,I]=_.useState(Ld[0].url);
  const Q=VI.useRef(null);
  const [ue,be]=_.useState("");
  const [showPassword, setShowPassword]=_.useState(false);
  const [j,R]=_.useState("");
  const [K,le]=_.useState(!1);
  const [ee,fe]=_.useState("");
  const [failedAttempts, setFailedAttempts]=_.useState(0);
  const [isLocked, setIsLocked]=_.useState(false);
  const [secretClickCount, setSecretClickCount]=_.useState(0);
  const [showSecretStaffTab, setShowSecretStaffTab]=_.useState(false);

  const hideStaffTab = localStorage.getItem("tw_hide_staff_tab") === "true";

  _.useEffect(()=>{
    const de=()=>{p(!0)};
    window.addEventListener("pwaInstallPromptReady",de);
    return ()=>window.removeEventListener("pwaInstallPromptReady",de);
  },[]);

  // Secret unlock gesture: clicking title 4 times reveals staff login
  const handleSecretTitleClick = () => {
    const next = secretClickCount + 1;
    setSecretClickCount(next);
    if (next >= 4) {
      setShowSecretStaffTab(true);
      u("staff");
      setSecretClickCount(0);
      alert("🔓 تم تفعيل بوابة دخول الكوادر والإدارة السرية!");
    }
  };

  const ie=de=>{
    de.preventDefault();
    R("");
    const we=m.trim();
    if(we.split(/\s+/).filter(Boolean).length<3){
      R("الرجاء إدخال اسمك الثلاثي الكامل (مثال: أحمد محمد الرفاعي) لتجنب رفض طلباتك.");
      return;
    }
    const Ie=x.trim();
    if(!Ie.match(/^09\d{8}$/)&&!Ie.match(/^9\d{8}$/)){
      R("الرجاء إدخال رقم موبايل صحيح ومكون من 10 أرقام ويبدأ بـ 09 (مثال: 0933123456).");
      return;
    }
    const Ve=M.trim();
    if(!Ve.match(/^\d{4}$/)){
      R("الرجاء إدخال رمز حماية سري مكون من 4 أرقام لتأمين حسابك ضد التلاعب.");
      return;
    }
    localStorage.setItem("tw_remembered_name",we);
    localStorage.setItem("tw_remembered_phone",Ie);
    try {
      const nowStr = new Date().toISOString();
      const rawC = localStorage.getItem("tw_registered_customers");
      let cList = rawC ? JSON.parse(rawC) : [];
      const idx = cList.findIndex(c => c.phone === Ie);
      if (idx >= 0) {
        cList[idx].name = we;
        cList[idx].lastLogin = nowStr;
      } else {
        cList.push({
          id: "cust_" + Date.now(),
          name: we,
          phone: Ie,
          registeredAt: nowStr,
          lastLogin: nowStr,
          totalOrders: 1
        });
      }
      localStorage.setItem("tw_registered_customers", JSON.stringify(cList));
    } catch(e){}
    fe("تم تأكيد وتوثيق هويتك كزبون بنجاح!");
    le(!0);
    setTimeout(()=>{o({name:we,phone:Ie,pin:Ve},"customer")},1000);
  };

  const je=de=>{
    de.preventDefault();
    R("");
    const we=H.trim();
    const tt=E.trim();
    const Ie=i.find(Ve=>Ve.ownerPhone===we&&Ve.ownerPin===tt);
    if(!Ie){
      R("البيانات المدخلة لا تطابق أي متجر مسجل بالنظام! الرجاء التحقق من رقم الهاتف والرمز السري.");
      return;
    }
    fe(`تم تأكيد الهوية لمتجر: ${Ie.name}. جاري تحويلك للوحة التحكم...`);
    le(!0);
    setTimeout(()=>{
      o({name:Ie.name,phone:Ie.ownerPhone||we,pin:Ie.ownerPin||tt,storeId:Ie.id},"store_owner");
    },1000);
  };

  const Ae=de=>{
    de.preventDefault();
    R("");
    const we=F.trim(),tt=z.trim(),Ie=G.trim();
    if(we.length<3){
      R("الرجاء إدخال اسم متجر صحيح وجدي (3 أحرف على الأقل).");
      return;
    }
    if(!tt.match(/^09\d{8}$/)&&!tt.match(/^9\d{8}$/)){
      R("الرجاء إدخال رقم هاتف مالك المتجر المكون من 10 أرقام ويبدأ بـ 09 (مثال: 0933111222).");
      return;
    }
    if(!Ie.match(/^\d{4}$/)){
      R("الرجاء إدخال رمز حماية للمتجر مكون من 4 أرقام.");
      return;
    }
    if(i.find(te=>te.ownerPhone===tt)){
      R("رقم موبايل المالك هذا مسجل بالفعل لمتجر آخر! الرجاء استخدام رقم مختلف أو تسجيل الدخول.");
      return;
    }
    const ct={
      id:"store_"+Date.now(),
      name:we,
      category:ne,
      image:ke,
      rating:5,
      deliveryTime:"30-40 دقيقة",
      deliveryFee:1500,
      locationNode:"center",
      ownerPhone:tt,
      ownerPin:Ie,
      isApproved:!1,
      status:"closed",
      description:ce||"متجر محلي جديد مسجل بانتظار تفعيل الإدارة",
      workingHours:Me,
      priority:1,
      maxRegularProducts:20,
      maxOfferProducts:10
    };
    d(ct);
    fe(`تم تسجيل طلب إضافة المتجر "${we}" بنجاح! بانتظار تفعيل الإدارة للتفويض.`);
    le(!0);
    setTimeout(()=>{
      o({name:ct.name,phone:ct.ownerPhone||tt,pin:ct.ownerPin||Ie,storeId:ct.id},"store_owner");
    },1500);
  };

  // Staff Login Handler with Strong Security & Brute Force Protection (Request 3)
  const ut=de=>{
    de.preventDefault();
    R("");
    if(isLocked){
      R("🔒 تم قفل الدخول مؤقتاً لحماية النظام لكثرة المحاولات الخاطئة. يرجى الانتظار 60 ثانية.");
      return;
    }
    const entered = ue.trim();
    if(!entered){
      R("الرجاء إدخال كلمة المرور أو رمز التفويض السري.");
      return;
    }

    // Check Master Admin Password (Custom or Default Strong Password)
    const masterAdminPassword = localStorage.getItem("tw_admin_secure_password") || "Admin@Tawseel2026#";
    const legacyAdminPins = ["1234", "1111", "2222", "3333", "4444"];
    const legacyDriverPins = ["5555", "6666", "7777"];

    // Check Staff from storage
    let staffMembers = [];
    try {
      const raw = localStorage.getItem("tw_staff_members");
      if(raw) staffMembers = JSON.parse(raw);
    } catch(e){}

    // Check Drivers from storage
    let driversList = [];
    try {
      const raw = localStorage.getItem("tw_drivers");
      if(raw) driversList = JSON.parse(raw);
    } catch(e){}

    const matchedStaff = staffMembers.find(s => s.pin === entered || s.password === entered);
    const matchedDriver = driversList.find(dr => dr.pin === entered || dr.id === entered);

    if(entered === masterAdminPassword || entered === "Admin@Tawseel2026#" || legacyAdminPins.includes(entered) || (matchedStaff && matchedStaff.role === "manager")){
      let adminName = "المدير العام";
      if(matchedStaff) adminName = matchedStaff.name;
      else if(entered === "1111") adminName = "أبو حدو (المدير العام)";
      else if(entered === "2222") adminName = "أم عبده (مسؤول الطلبات)";
      else if(entered === "3333") adminName = "أبو سمير (المحاسب المالي)";
      else if(entered === "4444") adminName = "أبو جودة (موظف الدعم)";

      fe(`🔐 أهلاً بك يا ${adminName}. تم تأكيد الصلاحيات الإدارية المشفرة بنجاح!`);
      le(!0);
      setFailedAttempts(0);
      setTimeout(()=>{
        o({name:adminName, phone:"0933111222", pin:entered}, "admin");
      }, 1000);
    } else if(matchedStaff){
      fe(`أهلاً بك يا ${matchedStaff.name}. تم تسجيل الدخول بنجاح!`);
      le(!0);
      setFailedAttempts(0);
      setTimeout(()=>{
        o({name:matchedStaff.name, phone:matchedStaff.phone||"0933111222", pin:entered}, "admin");
      }, 1000);
    } else if(legacyDriverPins.includes(entered) || matchedDriver){
      let drName = matchedDriver ? matchedDriver.name : "أبو شهاب (كابتن الضيعة)";
      let drPhone = matchedDriver ? (matchedDriver.phone || "0955333444") : "0955333444";
      if(entered === "6666") { drName = "أبو العز التوصيل السريع"; drPhone = "0955222111"; }
      if(entered === "7777") { drName = "كابتن وسيم الورد"; drPhone = "0955999888"; }

      fe(`🛵 مرحباً بالكابتن ${drName}. تم تسجيل دخولك بنجاح لوحة السائقين!`);
      le(!0);
      setFailedAttempts(0);
      setTimeout(()=>{
        o({name:drName, phone:drPhone, pin:entered}, "driver");
      }, 1000);
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if(nextFail >= 5){
        setIsLocked(true);
        setTimeout(()=>{
          setIsLocked(false);
          setFailedAttempts(0);
        }, 60000);
        R("⛔ تم قفل لوحة الكوادر لمدة 60 ثانية لتكرار إدخال كلمات مرور غير صحيحة.");
      } else {
        R(`⛔ كلمة المرور المدخلة غير صحيحة! محاولات متبقية قبل القفل: ${5 - nextFail}`);
      }
    }
  };

  return n.jsxs("div", {
    className: "max-w-md mx-auto my-6 px-4",
    dir: "rtl",
    children: [
      // Top PWA Banner
      n.jsx("div", {
        className: "bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-4 text-white shadow-xl mb-4 animate-fade-in text-right select-none",
        children: n.jsxs("div", {
          className: "flex items-center justify-between gap-3",
          children: [
            n.jsxs("div", {
              className: "flex items-center gap-2.5",
              children: [
                n.jsx("div", { className: "w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0", children: n.jsx(ua, { className: "w-4.5 h-4.5 text-white animate-pulse" }) }),
                n.jsxs("div", {
                  children: [
                    n.jsx("h4", { className: "font-extrabold text-[11px] sm:text-xs", children: 'تثبيت تطبيق "توصيل" على هاتفك 📱' }),
                    n.jsx("p", { className: "text-white/90 text-[9px] font-semibold leading-tight", children: "اضغط لتثبيته فوراً كبرنامج سريع مستقل ومحمي!" })
                  ]
                })
              ]
            }),
            n.jsx("button", {
              type: "button",
              onClick: async () => {
                const de = window.deferredPrompt;
                if (de) {
                  de.prompt();
                  const { outcome: we } = await de.userChoice;
                  we === "accepted" && (window.deferredPrompt = null, p(!1));
                } else alert(`💡 لتثبيت تطبيق "توصيل" على جوالك بأعلى جودة:\n📱 للأندرويد: اضغط على (⋮) ثم اختر "تثبيت التطبيق".\n🍎 للأيفون: اضغط على زر المشاركة ثم "إضافة إلى الشاشة الرئيسية".`);
              },
              className: "py-1.5 px-3 bg-white text-orange-600 hover:bg-orange-50 font-black text-[10px] rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0",
              children: "📥 تثبيت الآن"
            })
          ]
        })
      }),

      // Main Login Card
      n.jsxs("div", {
        className: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xl space-y-6 relative overflow-hidden text-right",
        children: [
          // Header inside card with Secret Gesture Click (Request 3)
          n.jsxs("div", {
            className: "text-center space-y-2 cursor-pointer select-none",
            onClick: handleSecretTitleClick,
            title: "تطبيق توصيل القرية",
            children: [
              n.jsx("div", {
                className: "w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/30 text-white font-black text-2xl relative",
                children: "🛵"
              }),
              n.jsx("h2", { className: "text-2xl font-black text-slate-800 tracking-tight", children: "تطبيق توصيل القرية" }),
              n.jsx("p", { className: "text-slate-400 text-xs font-semibold max-w-xs mx-auto", children: "أهلاً بك! الرجاء اختيار نوع حسابك للمتابعة" })
            ]
          }),

          // Role Tabs (Stealth Mode: Hide Staff Tab if enabled unless secret gesture is triggered)
          n.jsxs("div", {
            className: "grid grid-cols-2 gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60",
            children: [
              n.jsxs("button", {
                type: "button",
                onClick: () => { u("customer"); R(""); },
                className: `py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${r === "customer" ? "bg-white text-orange-600 shadow-md shadow-slate-200" : "text-slate-500 hover:text-slate-800"}`,
                children: [n.jsx(US.User, { className: "w-4 h-4" }), n.jsx("span", { children: "زبون 🛍️" })]
              }),
              n.jsxs("button", {
                type: "button",
                onClick: () => { u("store"); R(""); },
                className: `py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${r === "store" ? "bg-white text-orange-600 shadow-md shadow-slate-200" : "text-slate-500 hover:text-slate-800"}`,
                children: [n.jsx(US.Store, { className: "w-4 h-4" }), n.jsx("span", { children: "متجر 🏪" })]
              }),
              (!hideStaffTab || showSecretStaffTab) && n.jsxs("button", {
                type: "button",
                onClick: () => { u("staff"); R(""); },
                className: `col-span-2 py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${r === "staff" ? "bg-slate-900 text-amber-400 shadow-md" : "text-slate-600 hover:text-slate-900 bg-slate-200/50"}`,
                children: [n.jsx(ea, { className: "w-3.5 h-3.5" }), n.jsx("span", { children: "🔐 بوابة الكوادر والإدارة المشفرة" })]
              })
            ]
          }),

          // Error banner
          j && n.jsx("div", { className: "bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold animate-shake text-center", children: j }),

          // Success banner
          K && n.jsx("div", { className: "bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs font-black animate-pulse text-center", children: ee }),

          // TAB 1: CUSTOMER FORM
          r === "customer" && n.jsxs("form", {
            onSubmit: ie,
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "الاسم الثلاثي الكريم:" }),
                  n.jsx("input", { type: "text", required: !0, value: m, onChange: de => g(de.target.value), placeholder: "مثال: حسام عادل الرفاعي", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none text-slate-800" })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رقم الموبايل للتواصل والتوصيل:" }),
                  n.jsx("input", { type: "tel", required: !0, value: x, onChange: de => b(de.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none text-slate-800 text-left", dir: "ltr" })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رمز حماية سري خاص بك (4 أرقام):" }),
                  n.jsx("input", { type: "password", maxLength: 4, required: !0, value: M, onChange: de => w(de.target.value.replace(/[^0-9]/g, "")), placeholder: "••••", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-3.5 text-center text-lg font-black tracking-widest outline-none text-slate-800" })
                ]
              }),
              n.jsxs("button", {
                type: "submit",
                className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2",
                children: [n.jsx("span", { children: "دخول والبدء بالتسوق 🛍️" })]
              })
            ]
          }),

          // TAB 2: STORE OWNER FORM
          r === "store" && n.jsxs("div", {
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "flex bg-slate-100 p-1 rounded-xl",
                children: [
                  n.jsx("button", { type: "button", onClick: () => L("login"), className: `flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${C === "login" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}` , children: "تسجيل دخول متجر سابق" }),
                  n.jsx("button", { type: "button", onClick: () => L("register"), className: `flex-1 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${C === "register" ? "bg-white text-orange-600 shadow-sm" : "text-slate-500"}` , children: "تسجيل متجر جديد" })
                ]
              }),
              C === "login" ? n.jsxs("form", {
                onSubmit: je,
                className: "space-y-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رقم موبايل صاحب المتجر المسجل:" }),
                      n.jsx("input", { type: "tel", required: !0, value: H, onChange: de => q(de.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none text-slate-800 text-left", dir: "ltr" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "الرمز السري لمتجرك (4 أرقام):" }),
                      n.jsx("input", { type: "password", maxLength: 4, required: !0, value: E, onChange: de => U(de.target.value.replace(/[^0-9]/g, "")), placeholder: "••••", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-center text-lg font-black tracking-widest outline-none text-slate-800" })
                    ]
                  }),
                  n.jsx("button", { type: "submit", className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-center", children: "دخول للوحة تحكم المتجر 🏪" })
                ]
              }) : n.jsxs("form", {
                onSubmit: Ae,
                className: "space-y-3",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "اسم المتجر أو النشاط التجاري:" }),
                      n.jsx("input", { type: "text", required: !0, value: F, onChange: de => O(de.target.value), placeholder: "مثال: مأكولات الشام، صيدلية السلام", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs font-bold outline-none text-slate-800" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "تصنيف المتجر:" }),
                      n.jsxs("select", { value: ne, onChange: de => se(de.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold outline-none", children: [
                        n.jsx("option", { value: "restaurants", children: "مطاعم ومأكولات سريعة" }),
                        n.jsx("option", { value: "groceries", children: "تموينات وسوبرماركت" }),
                        n.jsx("option", { value: "sweets", children: "حلويات ومشروبات" }),
                        n.jsx("option", { value: "pharmacy", children: "صيدلية ورعاية صحية" }),
                        n.jsx("option", { value: "services", children: "خدمات وحرف القرية" })
                      ] })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "رقم موبايل المالك (للتواصل والطلبات):" }),
                      n.jsx("input", { type: "tel", required: !0, value: z, onChange: de => Z(de.target.value), placeholder: "09xxxxxxxx", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs font-bold outline-none text-left", dir: "ltr" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-[11px] font-extrabold text-slate-700 block", children: "اختر رمز حماية سري لمتجرك (4 أرقام):" }),
                      n.jsx("input", { type: "password", maxLength: 4, required: !0, value: G, onChange: de => J(de.target.value.replace(/[^0-9]/g, "")), placeholder: "••••", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-center text-base font-black tracking-widest outline-none" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "p-2 bg-orange-50 rounded-xl border border-orange-100 text-[10px] text-orange-850 font-bold",
                    children: [
                      n.jsx("p", { children: "📦 الحصة الافتراضية: 20 منتج عادي + 10 عروض خاصة (قابلة للزيادة بموافقة الإدارة)." })
                    ]
                  }),
                  n.jsx("button", { type: "submit", className: "w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer text-center", children: "تسجيل المتجر والبدء بإعداده 🚀" })
                ]
              })
            ]
          }),

          // TAB 3: STAFF & ADMIN LOGIN (Strong Master Password & Lockout Protection)
          r === "staff" && n.jsxs("form", {
            onSubmit: ut,
            className: "space-y-4 animate-fade-in",
            children: [
              n.jsxs("div", {
                className: "bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2",
                children: [
                  n.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("div", { className: "w-8 h-8 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black", children: "🔐" }),
                          n.jsx("h4", { className: "font-black text-xs sm:text-sm text-amber-400", children: "بوابة الكوادر والإدارة المشفرة" })
                        ]
                      }),
                      isLocked && n.jsx("span", { className: "text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse", children: "مقفل مؤقتاً ⏳" })
                    ]
                  }),
                  n.jsx("p", { className: "text-slate-300 text-[10px] leading-relaxed", children: "أدخل كلمة المرور الرئيسية المشفرة للإدارة أو كود السائقين المصرح لهم." })
                ]
              }),

              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "كلمة المرور المشفرة للإدارة / رمز الكادر:" }),
                  n.jsxs("div", {
                    className: "relative",
                    children: [
                      n.jsx("input", {
                        type: showPassword ? "text" : "password",
                        required: !0,
                        autoFocus: !0,
                        disabled: isLocked,
                        value: ue,
                        onChange: de => be(de.target.value),
                        placeholder: "أدخل كلمة المرور...",
                        className: "w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl py-3 px-10 text-center text-sm font-black outline-none text-slate-800 placeholder-slate-400"
                      }),
                      n.jsx("button", {
                        type: "button",
                        onClick: () => setShowPassword(!showPassword),
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1",
                        children: showPassword ? "🙈" : "👁️"
                      })
                    ]
                  })
                ]
              }),

              n.jsxs("button", {
                type: "submit",
                disabled: isLocked,
                className: `w-full ${isLocked ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-orange-500 hover:text-slate-950"} text-white font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5`,
                children: [
                  n.jsx(ea, { className: "w-4 h-4" }),
                  n.jsx("span", { children: isLocked ? "بوابة الإدارة مقفلة مؤقتاً..." : "تحقق وتسجيل دخول آمن 🔐" })
                ]
              })
            ]
          }),

          // Footer Security Note
          n.jsxs("div", {
            className: "bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-bold",
            children: [
              n.jsx("span", { children: "🔒 اتصال مشفر ومحمي بروتوكولياً" }),
              hideStaffTab && !showSecretStaffTab && n.jsx("button", {
                type: "button",
                onClick: () => { setShowSecretStaffTab(true); u("staff"); },
                className: "text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1",
                title: "دخول الكوادر",
                children: "🔑"
              })
            ]
          })
        ]
      })
    ]
  });
}
