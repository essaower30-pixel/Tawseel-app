function sxe({currentStoreId:o,stores:i,products:d,categories:r,onUpdateStores:u,onUpdateProducts:f,onLogout:p}){
  const m=i.find(te=>te.id===o);
  const g=d.filter(te=>te.storeId===o);
  const [x,b]=_.useState("orders"); // default to orders so store owner immediately sees their orders!
  const [M,w]=_.useState(null);
  const [E,U]=_.useState("");
  const [F,O]=_.useState("");
  const [ne,se]=_.useState("");
  const [z,Z]=_.useState(A0[0].url);
  const [G,J]=_.useState("");
  const [ce,me]=_.useState(!1);
  const [Me,Ne]=_.useState("");
  const [ke,I]=_.useState("");
  const [stockCount, setStockCount]=_.useState("");
  const [isUnlimitedStock, setIsUnlimitedStock]=_.useState(true);
  const [itemUnit, setItemUnit]=_.useState("وجبة");
  const [Q,oe]=_.useState((m==null?void 0:m.name)||"");
  const [ue,be]=_.useState((m==null?void 0:m.description)||"");
  const [j,R]=_.useState((m==null?void 0:m.status)||"open");
  const [K,le]=_.useState((m==null?void 0:m.workingHours)||"");
  const [ee,fe]=_.useState((m==null?void 0:m.phone)||(m==null?void 0:m.contactPhone)||(m==null?void 0:m.ownerPhone)||"");
  const [ie,je]=_.useState((m==null?void 0:m.address)||"");
  const [Ae,ut]=_.useState((m==null?void 0:m.image)||"");
  const [showUpgradeModal, setShowUpgradeModal]=_.useState(false);
  const [soundEnabled, setSoundEnabled]=_.useState(()=>localStorage.getItem("tw_store_sound_enabled")!=="false");
  const [lastOrderAlert, setLastOrderAlert]=_.useState(null);

  // Store Orders State & Real-time Live Polling
  const [ordersList, setOrdersList]=_.useState(()=>{
    try {
      const raw=localStorage.getItem("tw_orders_list");
      return raw ? JSON.parse(raw) : [];
    } catch(e){ return []; }
  });

  const myOrders = ordersList.filter(ord=>ord.storeId===o);
  const pendingOrders = myOrders.filter(ord=>ord.status==="pending" || ord.status==="preparing");
  const prevOrdersCountRef = VI.useRef(myOrders.length);

  // Quota calculation (Request 1)
  const maxRegular = (m && m.maxRegularProducts) ? m.maxRegularProducts : 20;
  const maxOffers = (m && m.maxOfferProducts) ? m.maxOfferProducts : 10;
  const currentRegular = g.filter(prod=>!prod.isOffer).length;
  const currentOffers = g.filter(prod=>prod.isOffer).length;
  const isRegularFull = currentRegular >= maxRegular;
  const isOffersFull = currentOffers >= maxOffers;

  // Sound Alarm Synthesizer (Request 2)
  const playStoreAlarm = VI.useCallback(()=>{
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();
      
      const tones = [
        { f: 587.33, t: 0, d: 0.18 },
        { f: 739.99, t: 0.16, d: 0.22 },
        { f: 880.00, t: 0.32, d: 0.35 },
        { f: 1174.66, t: 0.60, d: 0.45 },
        { f: 880.00, t: 0.95, d: 0.18 },
        { f: 1174.66, t: 1.10, d: 0.55 }
      ];
      tones.forEach(tone=>{
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(tone.f, ctx.currentTime + tone.t);
        gain.gain.setValueAtTime(0, ctx.currentTime + tone.t);
        gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + tone.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + tone.t + tone.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + tone.t);
        osc.stop(ctx.currentTime + tone.t + tone.d);
      });
      if (navigator.vibrate) {
        navigator.vibrate([300, 150, 300, 150, 500]);
      }
    } catch(err){
      console.warn("Audio alarm alert:", err);
    }
  }, []);

  // Request Web Notification permission
  _.useEffect(()=>{
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Ensure store owner session is saved permanently in localStorage (Request 2)
  _.useEffect(()=>{
    localStorage.setItem("tw_user_role", "store_owner");
    localStorage.setItem("tw_current_store_id", o);
  }, [o]);

  // Poll for incoming orders every 2.5 seconds
  _.useEffect(()=>{
    const checkOrders = () => {
      try {
        const raw = localStorage.getItem("tw_orders_list");
        if (raw) {
          const parsed = JSON.parse(raw);
          setOrdersList(parsed);
          const currentStoreOrders = parsed.filter(ord=>ord.storeId===o);
          
          // If a new order arrived
          if (currentStoreOrders.length > prevOrdersCountRef.current) {
            const newest = currentStoreOrders[0];
            if (soundEnabled) playStoreAlarm();
            
            // Show browser notification if in background
            if ("Notification" in window && Notification.permission === "granted") {
              try {
                new Notification('🔔 وصلك طلب شراء جديد!', {
                  body: 'طلب من ' + (newest.customerName || 'زبون') + ' بقيمة ' + (newest.total || 0) + ' ل.س لمتجرك ' + (m?.name || ''),
                  icon: '/favicon.png'
                });
              } catch(e){}
            }
            setLastOrderAlert(newest);
          }
          prevOrdersCountRef.current = currentStoreOrders.length;
        }
      } catch(e){}
    };

    const interval = setInterval(checkOrders, 2500);
    window.addEventListener("storage", checkOrders);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", checkOrders);
    };
  }, [o, soundEnabled, playStoreAlarm, m]);

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const updated = ordersList.map(ord => ord.id === orderId ? { 
        ...ord, 
        status: newStatus,
        preparedAt: newStatus === "ready" ? new Date().toISOString() : ord.preparedAt,
        deliveredAt: newStatus === "delivered" ? new Date().toISOString() : ord.deliveredAt
      } : ord);
      setOrdersList(updated);
      localStorage.setItem("tw_orders_list", JSON.stringify(updated));
      const currentActive = localStorage.getItem("tw_active_order");
      if (currentActive) {
        try {
          const actObj = JSON.parse(currentActive);
          if (actObj.id === orderId) {
            localStorage.setItem("tw_active_order", JSON.stringify({ ...actObj, status: newStatus }));
          }
        } catch(e){}
      }
      window.dispatchEvent(new Event("storage"));
    } catch(e){}
  };

  const de = () => {
    var te;
    U(""), O(""), se(""), Z(A0[0].url), J(((te = r[0]) == null ? void 0 : te.id) || ""), me(!1), Ne(""), I(""), setStockCount(""), setIsUnlimitedStock(true), setItemUnit("وجبة"), w(null);
  };

  const we = te => {
    w(te.id), U(te.name), O(String(te.price)), se(te.description), Z(te.image), J(te.category), me(!!te.isOffer), Ne(te.originalPrice ? String(te.originalPrice) : ""), I(te.offerLabel || ""), setStockCount(te.stock !== undefined && te.stock !== null ? String(te.stock) : ""), setIsUnlimitedStock(te.stock === undefined || te.stock === null || te.isUnlimitedStock === true), setItemUnit(te.unit || "وجبة"), b("add_product");
  };

  // Instant Fast Stock Quick Control for Store Owner (Increments / Decrements / Fix errors)
  const handleQuickStock = (prodId, deltaOrValue, isAbsolute = false) => {
    const updated = d.map(item => {
      if (item.id !== prodId) return item;
      if (deltaOrValue === "toggle_unlimited") {
        const currentlyUnlimited = item.stock === undefined || item.stock === null || item.isUnlimitedStock === true;
        return { ...item, stock: currentlyUnlimited ? 10 : undefined, isUnlimitedStock: !currentlyUnlimited };
      }
      if (isAbsolute) {
        const num = Math.max(0, parseInt(deltaOrValue) || 0);
        return { ...item, stock: num, isUnlimitedStock: false };
      }
      const currentStock = (item.stock !== undefined && item.stock !== null) ? item.stock : 10;
      const newStock = Math.max(0, currentStock + deltaOrValue);
      return { ...item, stock: newStock, isUnlimitedStock: false };
    });
    f(updated);
    try { localStorage.setItem("tw_products", JSON.stringify(updated)); } catch(e){}
  };

  const tt = te => {
    if (confirm("هل تريد بالتأكيد حذف هذا المنتج نهائياً من قائمتك؟")) {
      const Je = d.filter(at => at.id !== te);
      f(Je);
    }
  };

  // Product save handler with strict limits check (Request 1)
  const Ie = te => {
    var vt;
    if (te.preventDefault(), !m) return;
    const Je = parseFloat(F) || 0;
    const at = ce ? parseFloat(Me) || 0 : void 0;

    if (M) {
      // Editing existing product
      const targetProd = d.find(p => p.id === M);
      // If converting to offer and offers are full
      if (ce && !targetProd?.isOffer && isOffersFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى لمنتجات العروض (" + maxOffers + " عروض) المسموح بها لمتجرك.\n\nلإضافة المزيد من العروض، يرجى تقديم طلب ترقية للإدارة.");
        return;
      }
      // If converting to regular and regular is full
      if (!ce && targetProd?.isOffer && isRegularFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى للمنتجات العادية (" + maxRegular + " منتج) المسموح بها لمتجرك.\n\nلإضافة المزيد من المنتجات، يرجى تقديم طلب زيادة السعة للإدارة.");
        return;
      }

      const finalStock = isUnlimitedStock ? undefined : (stockCount !== "" && !isNaN(parseInt(stockCount)) ? Math.max(0, parseInt(stockCount)) : undefined);
      const ya = d.map(fa => {
        var Ya;
        return fa.id === M ? {
          ...fa,
          name: E,
          price: Je,
          unit: itemUnit || "وجبة",
          stock: finalStock,
          isUnlimitedStock: isUnlimitedStock,
          description: ne,
          image: z,
          category: G || ((Ya = r[0]) == null ? void 0 : Ya.id) || "",
          isOffer: ce,
          originalPrice: at,
          offerLabel: ce ? ke : void 0
        } : fa;
      });
      f(ya);
      try { localStorage.setItem("tw_products", JSON.stringify(ya)); } catch(e){}
      alert("✅ تم تحديث بيانات المنتج والمخزون بنجاح!");
    } else {
      // Adding new product - Check Quota Limits
      if (ce && isOffersFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى لمنتجات العروض (" + maxOffers + " عروض) المسموح بها لمتجرك.\n\nلزيادة السعة، يرجى التواصل مع إدارة التطبيق لطلب ترقية المتجر.");
        return;
      }
      if (!ce && isRegularFull) {
        alert("⛔ لقد وصلت إلى الحد الأقصى للمنتجات العادية (" + maxRegular + " منتج) المسموح بها لمتجرك.\n\nلإضافة المزيد، يرجى تقديم طلب ترقية للإدارة.");
        return;
      }

      const finalStock = isUnlimitedStock ? undefined : (stockCount !== "" && !isNaN(parseInt(stockCount)) ? Math.max(0, parseInt(stockCount)) : undefined);
      const ya = {
        id: "prod_" + Date.now(),
        name: E,
        price: Je,
        unit: itemUnit || "وجبة",
        stock: finalStock,
        isUnlimitedStock: isUnlimitedStock,
        description: ne,
        image: z,
        category: G || ((vt = r[0]) == null ? void 0 : vt.id) || "",
        storeId: o,
        isOffer: ce,
        originalPrice: at,
        offerLabel: ce ? ke : void 0
      };
      const allUpdated = [ya, ...d];
      f(allUpdated);
      try { localStorage.setItem("tw_products", JSON.stringify(allUpdated)); } catch(e){}
      alert("✅ تم إضافة المنتج الجديد بنجاح لقائمتك!");
    }
    de(), b("menu");
  };

  const Ve = te => {
    if (te.preventDefault(), !m) return;
    const Je = i.map(at => at.id === o ? {
      ...at,
      name: Q,
      description: ue,
      status: j,
      workingHours: K,
      phone: ee,
      contactPhone: ee,
      ownerPhone: (at.ownerPhone ? ee : at.ownerPhone || ee),
      address: ie,
      image: Ae
    } : at);
    u(Je);try{localStorage.setItem("tw_stores",JSON.stringify(Je))}catch(e){}
    alert("تم حفظ وتحديث الملف التعريفي لمتجرك بنجاح!");
  };

  if (!m) return n.jsxs("div", {
    className: "max-w-md mx-auto my-12 text-center p-6 bg-white rounded-3xl border border-slate-200 shadow-xl",
    dir: "rtl",
    children: [
      n.jsx(ha, { className: "w-12 h-12 text-red-500 mx-auto mb-3" }),
      n.jsx("h3", { className: "text-lg font-extrabold text-slate-800", children: "خطأ في تحميل بيانات المتجر" }),
      n.jsx("p", { className: "text-slate-500 text-xs mt-1", children: "لم نتمكن من تحديد المتجر المرتبط بحسابك." }),
      n.jsx("button", { onClick: p, className: "mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer", children: "تسجيل الخروج" })
    ]
  });

  const ct = m.isApproved !== !1;

  return n.jsxs("div", {
    className: "space-y-6 text-right",
    dir: "rtl",
    children: [
      // Store Header Banner
      n.jsxs("div", {
        className: "bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-850 shadow-xl relative overflow-hidden select-none",
        children: [
          n.jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-10", style: { backgroundImage: `url('${m.image}')` } }),
          n.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" }),
          n.jsxs("div", {
            className: "relative flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            children: [
              n.jsxs("div", {
                className: "flex items-center gap-4",
                children: [
                  n.jsx("div", {
                    className: "w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shrink-0 border border-white/20",
                    children: n.jsx("img", { src: m.image, alt: m.name, className: "w-full h-full object-cover" })
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("span", { className: "bg-orange-500 text-slate-950 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase", children: "حساب مالك متجر 🏪" }),
                          ct ? n.jsxs("span", { className: "bg-green-500/20 text-green-400 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1", children: [n.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" }), n.jsx("span", { children: "نشط ومعتمد بالنظام ✅" })] })
                             : n.jsxs("span", { className: "bg-amber-500/20 text-amber-400 font-extrabold text-[9px] px-2.5 py-0.5 rounded-full flex items-center gap-1", children: [n.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" }), n.jsx("span", { children: "بانتظار موافقة الإدارة ⏳" })] })
                        ]
                      }),
                      n.jsx("h2", { className: "text-xl sm:text-2xl font-black", children: m.name }),
                      n.jsx("p", { className: "text-slate-300 text-[11px] leading-relaxed max-w-md", children: m.description || "لا يوجد وصف للمتجر حالياً. أضف وصفاً لخدماتك لجذب الزبائن." })
                    ]
                  })
                ]
              }),
              // Right Action Buttons in Header
              n.jsxs("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [
                  n.jsxs("button", {
                    onClick: () => {
                      playStoreAlarm();
                      alert("🔊 تم تشغيل رنة التنبيه التجريبية بنجاح!");
                    },
                    className: "bg-white/10 hover:bg-orange-500 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    title: "تجربة رنة التنبيه للطلبات",
                    children: [n.jsx(Ga, { className: "w-3.5 h-3.5 text-orange-400" }), n.jsx("span", { children: "تجربة الرنة 🔔" })]
                  }),
                  n.jsxs("button", {
                    onClick: p,
                    className: "bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-red-500/30",
                    title: "تسجيل الخروج النظامي",
                    children: [n.jsx(pr, { className: "w-4 h-4" }), n.jsx("span", { children: "تسجيل الخروج" })]
                  })
                ]
              })
            ]
          }),
          // Quota Indicator Bar (Request 1)
          n.jsxs("div", {
            className: "mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs",
            children: [
              n.jsxs("div", {
                className: "bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60 flex items-center justify-between",
                children: [
                  n.jsxs("div", {
                    children: [
                      n.jsx("span", { className: "text-slate-400 text-[10px] block font-bold", children: "📦 المنتجات العادية:" }),
                      n.jsxs("span", { className: `font-black ${isRegularFull ? "text-red-400" : "text-emerald-400"}`, children: [currentRegular, " / ", maxRegular, " منتج"] })
                    ]
                  }),
                  isRegularFull ? n.jsx("span", { className: "text-[9px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded-md", children: "ممتلئ" })
                                : n.jsx("span", { className: "text-[9px] bg-emerald-500/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded-md", children: "متاح" })
                ]
              }),
              n.jsxs("div", {
                className: "bg-slate-800/80 rounded-xl p-2.5 border border-slate-700/60 flex items-center justify-between",
                children: [
                  n.jsxs("div", {
                    children: [
                      n.jsx("span", { className: "text-slate-400 text-[10px] block font-bold", children: "🏷️ منتجات العروض:" }),
                      n.jsxs("span", { className: `font-black ${isOffersFull ? "text-red-400" : "text-amber-400"}`, children: [currentOffers, " / ", maxOffers, " عروض"] })
                    ]
                  }),
                  isOffersFull ? n.jsx("span", { className: "text-[9px] bg-red-500/20 text-red-300 font-extrabold px-2 py-0.5 rounded-md", children: "مكتمل" })
                               : n.jsx("span", { className: "text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-2 py-0.5 rounded-md", children: "متاح" })
                ]
              }),
              n.jsxs("button", {
                type: "button",
                onClick: () => setShowUpgradeModal(true),
                className: "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-xl p-2.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95",
                children: [
                  n.jsx(ra, { className: "w-4 h-4" }),
                  n.jsx("span", { children: "طلب زيادة السعة من الإدارة 🚀" })
                ]
              })
            ]
          })
        ]
      }),

      // Navigation Tabs
      n.jsxs("div", {
        className: "flex border-b border-slate-200 overflow-x-auto pb-px gap-1",
        children: [
          n.jsxs("button", {
            onClick: () => b("orders"),
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "orders" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(Ga, { className: "w-4 h-4" }),
              n.jsxs("span", { children: ["الطلبات الواردة لمتجرك (", myOrders.length, ")"] }),
              pendingOrders.length > 0 && n.jsx("span", { className: "bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-bounce", children: pendingOrders.length })
            ]
          }),
          n.jsxs("button", {
            onClick: () => { b("menu"); de(); },
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "menu" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(xn, { className: "w-4 h-4" }),
              n.jsxs("span", { children: ["قائمة المنتجات (", g.length, ")"] })
            ]
          }),
          n.jsxs("button", {
            onClick: () => b("add_product"),
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "add_product" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(ra, { className: "w-4 h-4" }),
              n.jsx("span", { children: M ? "تعديل هذا المنتج ✏️" : "إضافة منتج جديد ➕" })
            ]
          }),
          n.jsxs("button", {
            onClick: () => b("profile"),
            className: `py-3 px-4 text-xs font-extrabold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${x === "profile" ? "border-orange-500 text-orange-600" : "border-transparent text-slate-500 hover:text-slate-800"}`,
            children: [
              n.jsx(sl, { className: "w-4 h-4" }),
              n.jsx("span", { children: "إعدادات وحالة المتجر ⚙️" })
            ]
          })
        ]
      }),

      // TAB 1: INCOMING ORDERS (Request 2)
      x === "orders" && n.jsxs("div", {
        className: "space-y-4 animate-fade-in",
        children: [
          n.jsxs("div", {
            className: "flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs",
            children: [
              n.jsxs("div", {
                children: [
                  n.jsx("h3", { className: "font-extrabold text-sm sm:text-base text-slate-800", children: "📦 سجل الطلبات الواردة لمتجرك" }),
                  n.jsx("p", { className: "text-[11px] text-slate-500 mt-0.5", children: "تصلك التنبيهات فوراً مع صوت الرنة عند إرسال أي زبون لطلب جديد." })
                ]
              }),
              n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  n.jsxs("button", {
                    type: "button",
                    onClick: () => {
                      const newState = !soundEnabled;
                      setSoundEnabled(newState);
                      localStorage.setItem("tw_store_sound_enabled", String(newState));
                      if (newState) playStoreAlarm();
                    },
                    className: `py-1.5 px-3 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer border ${soundEnabled ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-slate-100 text-slate-500 border-slate-200"}`,
                    children: [
                      n.jsx(Ga, { className: "w-3.5 h-3.5" }),
                      n.jsx("span", { children: soundEnabled ? "صوت التنبيه: مفعّل 🔔" : "صوت التنبيه: صامت 🔕" })
                    ]
                  })
                ]
              })
            ]
          }),

          myOrders.length === 0 ? n.jsxs("div", {
            className: "bg-white rounded-3xl border border-dashed border-slate-300 py-16 text-center space-y-3",
            children: [
              n.jsx(Ga, { className: "w-12 h-12 text-slate-300 mx-auto" }),
              n.jsx("p", { className: "text-slate-600 text-sm font-bold", children: "لا توجد طلبات جديدة واردة لمتجرك حالياً" }),
              n.jsx("p", { className: "text-slate-400 text-xs", children: "عندما يطلب الزبائن من قائمتك، ستظهر الطلبات هنا فوراً وستسمع نغمة التنبيه." })
            ]
          }) : n.jsx("div", {
            className: "space-y-3",
            children: myOrders.map(order => n.jsxs("div", {
              className: `bg-white border rounded-2xl p-4 sm:p-5 shadow-xs transition-all space-y-3 ${order.status === "pending" ? "border-orange-400 bg-orange-50/20" : "border-slate-200"}`,
              children: [
                n.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3",
                  children: [
                    n.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        n.jsxs("span", { className: "font-black text-xs sm:text-sm text-slate-800", children: ["طلب #", order.id] }),
                        order.status === "pending" && n.jsx("span", { className: "bg-orange-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full animate-pulse", children: "جديد بانتظار التأكيد ⏳" }),
                        order.status === "preparing" && n.jsx("span", { className: "bg-blue-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "قيد التجهيز 👨‍🍳" }),
                        order.status === "ready" && n.jsx("span", { className: "bg-purple-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "جاهز للتسليم 🛵" }),
                        order.status === "delivered" && n.jsx("span", { className: "bg-emerald-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "تم التسليم بنجاح ✅" }),
                        order.status === "cancelled" && n.jsx("span", { className: "bg-red-500 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full", children: "ملغي ❌" })
                      ]
                    }),
                    n.jsx("span", { className: "text-[11px] text-slate-400 font-bold", children: order.createdAt ? new Date(order.createdAt).toLocaleTimeString('ar-SY', { hour: '2-digit', minute: '2-digit' }) : "الآن" })
                  ]
                }),
                // Customer details
                n.jsxs("div", {
                  className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl",
                  children: [
                    n.jsxs("div", {
                      className: "space-y-1",
                      children: [
                        n.jsxs("p", { className: "font-bold text-slate-700", children: ["👤 الزبون: ", n.jsx("b", { className: "text-slate-900 font-extrabold", children: order.customerName || "زبون كريم" })] }),
                        order.customerPhone && n.jsxs("p", {
                          className: "font-bold text-slate-700 flex items-center gap-1.5",
                          children: [
                            n.jsx("span", { children: "📞 الهاتف:" }),
                            n.jsx("a", { href: `tel:${order.customerPhone}`, className: "text-orange-600 font-extrabold hover:underline", children: order.customerPhone }),
                            n.jsx("a", { href: `https://wa.me/963${(order.customerPhone||"").replace(/^0/, "")}`, target: "_blank", rel: "noreferrer", className: "bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md hover:bg-emerald-600 transition-all", children: "واتساب 💬" }),
                            n.jsx("a", { href: /Android/i.test(navigator.userAgent) ? `intent://send?phone=963${(order.customerPhone||"").replace(/^0/, "")}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/963${(order.customerPhone||"").replace(/^0/, "")}`, target: "_blank", rel: "noreferrer", className: "bg-slate-900 text-emerald-400 text-[9px] font-black px-2 py-0.5 rounded-md hover:bg-slate-800 transition-all border border-emerald-500/30", children: "واتس أعمال 💼" })
                          ]
                        })
                      ]
                    }),
                    n.jsxs("div", {
                      className: "space-y-1",
                      children: [
                        n.jsxs("p", { className: "font-bold text-slate-700", children: ["📍 العنوان/المعلم: ", n.jsx("b", { className: "text-slate-900", children: order.addressLandmark || order.additionalDirections || "داخل القرية" })] }),
                        n.jsxs("p", { className: "font-black text-slate-900 text-sm", children: ["💰 الإجمالي: ", n.jsx("span", { className: "text-orange-600 font-black", children: order.total || order.subtotal || 0 }), " ل.س"] })
                      ]
                    })
                  ]
                }),
                // Items
                order.items && order.items.length > 0 && n.jsxs("div", {
                  className: "space-y-1.5 border-t border-slate-100 pt-2",
                  children: [
                    n.jsx("p", { className: "text-[11px] font-extrabold text-slate-700", children: "الأصناف المطلوبة:" }),
                    n.jsx("div", {
                      className: "space-y-1",
                      children: order.items.map((item, idx) => n.jsxs("div", {
                        className: "flex justify-between items-center text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-100",
                        children: [
                          n.jsxs("span", { className: "font-bold", children: [item.quantity || 1, " × ", item.product?.name || item.name || "وجبة/سلعة"] }),
                          n.jsxs("span", { className: "font-black text-slate-900", children: [(item.totalItemPrice || item.price || 0) * (item.quantity || 1), " ل.س"] })
                        ]
                      }, idx))
                    })
                  ]
                }),
                // Check if this store / order is a Craftsman / Doctor / Workshop service
                (() => {
                  const isCraftService = Boolean((m && (m.isService || ["doctors", "crafts", "drivers"].includes(m.category) || (m.id||"").startsWith("service_"))) || order.isDirectService || (order.storeId||"").startsWith("service_") || (order.items||[]).some(it => (it.product?.id||it.id||"").startsWith("service_") || (it.product?.name||it.name||"").includes("خدمة وتنسيق")));
                  if (isCraftService) {
                    return n.jsxs("div", {
                      className: "space-y-3",
                      children: [
                        n.jsxs("div", {
                          className: "bg-amber-950/80 text-amber-100 p-3.5 rounded-xl flex items-center gap-3 border border-amber-500/40 shadow-sm",
                          children: [
                            n.jsx("div", { className: "w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0", children: "🛠️" }),
                            n.jsxs("div", {
                              className: "space-y-0.5",
                              children: [
                                n.jsx("span", { className: "text-xs font-black text-amber-200 block", children: "طلب خدمة وتنسيق مباشر (صاحب مهنة / ورشة)" }),
                                n.jsx("p", { className: "text-[11px] text-amber-300/90 font-medium leading-relaxed", children: "هذا الطلب لا يحتاج لسائق توصيل؛ يرجى التواصل مباشرة مع الزبون عبر الاتصال أو الواتساب أعلاه لتحديد موعد الزيارة وتفاصيل العمل." })
                              ]
                            })
                          ]
                        }),
                        n.jsxs("div", {
                          className: "flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap",
                          children: [
                            order.status === "pending" && n.jsxs("button", {
                              type: "button",
                              onClick: () => updateOrderStatus(order.id, "preparing"),
                              className: "bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                              children: [n.jsx("span", { children: "🤝" }), n.jsx("span", { children: "قبول وتأكيد الموعد مع الزبون" })]
                            }),
                            order.status === "preparing" && n.jsxs("button", {
                              type: "button",
                              onClick: () => updateOrderStatus(order.id, "ready"),
                              className: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                              children: [n.jsx("span", { children: "🛠️" }), n.jsx("span", { children: "العمل قيد التنفيذ / جاهز بالورشة" })]
                            }),
                            order.status !== "delivered" && order.status !== "cancelled" && n.jsxs("button", {
                              type: "button",
                              onClick: () => updateOrderStatus(order.id, "delivered"),
                              className: "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                              children: [n.jsx("span", { children: "✅" }), n.jsx("span", { children: "تم إنجاز وتثبيت الخدمة بنجاح" })]
                            }),
                            order.status !== "cancelled" && order.status !== "delivered" && n.jsxs("button", {
                              type: "button",
                              onClick: () => {
                                if (confirm("هل تريد بالتأكيد إلغاء أو الاعتذار عن طلب الخدمة هذا؟")) {
                                  updateOrderStatus(order.id, "cancelled");
                                }
                              },
                              className: "bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer",
                              children: [n.jsx("span", { children: "اعتذار عن الخدمة ❌" })]
                            })
                          ]
                        })
                      ]
                    });
                  }
                  return n.jsxs("div", {
                    className: "space-y-3",
                    children: [
                      n.jsxs("div", {
                        className: "bg-slate-900 text-white p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-800 shadow-sm",
                        children: [
                          n.jsxs("div", {
                            className: "flex items-center gap-2.5",
                            children: [
                              n.jsx("div", { className: "w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg shrink-0", children: "🛵" }),
                              n.jsxs("div", {
                                children: [
                                  n.jsx("span", { className: "text-[10px] text-slate-400 block font-bold", children: "كابتن التوصيل المكلف:" }),
                                  n.jsxs("div", {
                                    className: "flex items-center gap-2 flex-wrap",
                                    children: [
                                      n.jsx("span", { className: "text-slate-100 font-black text-xs sm:text-sm", children: order.driverName || "بانتظار قبول السائق أو تكليفه من الإدارة ⏳" }),
                                      (order.driverName || order.driverId) && n.jsx("span", { className: "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-black px-2 py-0.5 rounded-md", children: "مسند للكابتن" })
                                    ]
                                  })
                                ]
                              })
                            ]
                          }),
                          (order.driverPhone || (order.driverName && "0955333444")) && n.jsxs("div", {
                            className: "flex items-center gap-2 shrink-0",
                            children: [
                              n.jsxs("a", {
                                href: `tel:${order.driverPhone || "0955333444"}`,
                                className: "bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all shadow-xs",
                                children: [n.jsx("span", { children: "📞" }), n.jsx("span", { children: "اتصال بالسائق" })]
                              }),
                              n.jsxs("a", {
                                href: `https://wa.me/963${(order.driverPhone || "0955333444").replace(/^0/, "")}?text=${encodeURIComponent(`مرحباً كابتن ${order.driverName || "التوصيل"}، بخصوص طلب المتجر رقم (${order.id}) للأخ (${order.customerName || "الزبون"})...`)}`,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black py-1.5 px-3 rounded-xl flex items-center gap-1.5 transition-all shadow-xs",
                                children: [n.jsx("span", { children: "💬" }), n.jsx("span", { children: "واتساب السائق" })]
                              })
                            ]
                          })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap",
                        children: [
                          order.status === "pending" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "preparing"),
                            className: "bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "👨‍🍳" }), n.jsx("span", { children: "قبول الطلب وبدء التحضير والتجهيز" })]
                          }),
                          order.status === "preparing" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "ready"),
                            className: "bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "📦" }), n.jsx("span", { children: "الطلب جاهز للتسليم لكابتن التوصيل" })]
                          }),
                          order.status === "ready" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "picked_up"),
                            className: "bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "🛵" }), n.jsx("span", { children: "تم استلام الطلب من قِبل الكابتن" })]
                          }),
                          order.status !== "delivered" && order.status !== "cancelled" && n.jsxs("button", {
                            type: "button",
                            onClick: () => updateOrderStatus(order.id, "delivered"),
                            className: "bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5",
                            children: [n.jsx("span", { children: "✅" }), n.jsx("span", { children: "تم التسليم للزبون بنجاح" })]
                          }),
                          order.status !== "cancelled" && order.status !== "delivered" && n.jsxs("button", {
                            type: "button",
                            onClick: () => {
                              if (confirm("هل تريد بالتأكيد إلغاء/اعتذار عن هذا الطلب؟")) {
                                updateOrderStatus(order.id, "cancelled");
                              }
                            },
                            className: "bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer",
                            children: [n.jsx("span", { children: "اعتذار عن الطلب ❌" })]
                          })
                        ]
                      })
                    ]
                  });
                })()
              ]
            }, order.id))
          })
        ]
      }),

      // TAB 2: MENU / PRODUCTS LIST (With Quotas UI)
      x === "menu" && n.jsxs("div", {
        className: "space-y-4",
        children: [
          n.jsxs("div", {
            className: "flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs",
            children: [
              n.jsxs("div", {
                children: [
                  n.jsx("h3", { className: "font-extrabold text-sm text-slate-800", children: "قائمة الطعام والمعروضات" }),
                  n.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "المنتجات التي ستظهر للزبائن عند تصفح متجرك." })
                ]
              }),
              n.jsxs("button", {
                onClick: () => b("add_product"),
                className: "py-2 px-3.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl flex items-center gap-1 cursor-pointer transition-all shadow-xs",
                children: [
                  n.jsx(ra, { className: "w-4 h-4" }),
                  n.jsx("span", { children: "إضافة منتج جديد" })
                ]
              })
            ]
          }),

          g.length === 0 ? n.jsxs("div", {
            className: "bg-white rounded-3xl border border-dashed border-slate-300 py-12 text-center space-y-3",
            children: [
              n.jsx(xn, { className: "w-12 h-12 text-slate-300 mx-auto" }),
              n.jsx("p", { className: "text-slate-400 text-xs font-bold", children: "قائمة مأكولاتك فارغة تماماً حالياً!" }),
              n.jsx("p", { className: "text-slate-400 text-[10px]", children: "اضغط على زر الإضافة بالأعلى لتبدأ بتجهيز قائمة المنتجات لمتجرك." })
            ]
          }) : n.jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            children: g.map(te => {
              var Je;
              return n.jsxs("div", {
                className: "bg-white border border-slate-200/80 rounded-2xl p-4 flex gap-4 hover:shadow-md transition-all",
                children: [
                  n.jsx("div", {
                    className: "w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100",
                    children: n.jsx("img", { src: te.image, alt: te.name, className: "w-full h-full object-cover" })
                  }),
                  n.jsxs("div", {
                    className: "flex-1 min-w-0 space-y-1",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          n.jsx("span", { className: "text-[9px] bg-slate-100 text-slate-600 font-extrabold py-0.5 px-2 rounded-full", children: (((Je = r.find(vt => vt.id === te.category)) == null ? void 0 : Je.label) || te.category) }),
                          te.isOffer && n.jsxs("span", { className: "text-[8px] bg-red-100 text-red-600 font-extrabold py-0.5 px-2 rounded-full flex items-center gap-0.5", children: [n.jsx(mn, { className: "w-2.5 h-2.5" }), n.jsx("span", { children: te.offerLabel || "عرض خاص" })] })
                        ]
                      }),
                      n.jsx("h4", { className: "font-extrabold text-xs sm:text-sm text-slate-800", children: te.name }),
                      n.jsx("p", { className: "text-slate-400 text-[10px] leading-relaxed truncate", children: te.description }),
                      n.jsxs("div", {
                        className: "flex items-center gap-2 flex-wrap",
                        children: [
                          n.jsxs("span", { className: "font-black text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md", children: [te.price, " ل.س / ", (te.unit || "حبة")] }),
                          te.isOffer && te.originalPrice && n.jsxs("span", { className: "text-[10px] text-slate-400 line-through font-bold", children: [te.originalPrice, " ل.س"] })
                        ]
                      }),
                      // Stock Status & Out-of-Stock Urgency Badge
                      n.jsxs("div", {
                        className: "mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1.5",
                        children: [
                          n.jsxs("div", {
                            className: "flex items-center justify-between gap-1 text-[10px] font-extrabold",
                            children: [
                              te.isBlocked ? n.jsx("span", { className: "text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200", children: "🚫 موقوف ومجمد من الإدارة (ضغط)" }) :
                              (te.stock === 0) ? n.jsx("span", { className: "text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-black animate-pulse", children: "⛔ نفدت الكمية بالمخزون (0)" }) :
                              (te.stock !== undefined && te.stock !== null && te.stock <= 3) ? n.jsxs("span", { className: "text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1", children: [n.jsx("span", { children: "🔥 متبقي:" }), te.stock, " ", (te.unit || "حبة"), " (أوشك على النفاذ)"] }) :
                              (te.stock !== undefined && te.stock !== null) ? n.jsxs("span", { className: "text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200", children: ["📦 المخزون: ", te.stock, " ", (te.unit || "حبة")] }) :
                              n.jsx("span", { className: "text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200", children: "♾️ كمية مفتوحة (غير محدودة)" }),
                              n.jsx("span", { className: "text-[9px] text-slate-400", children: "تحكم سريع:" })
                            ]
                          }),
                          // Store Owner Fast Stock Increment / Decrement / Mistake Correction Toolbar
                          n.jsxs("div", {
                            className: "flex items-center gap-1 flex-wrap bg-slate-50 p-1.5 rounded-xl border border-slate-200/70 select-none",
                            children: [
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, -1),
                                className: "px-2 py-0.5 bg-white hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-lg border border-slate-200 cursor-pointer transition-all shadow-2xs",
                                title: "إنقاص 1 من المخزون",
                                children: "-1"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, -5),
                                className: "px-1.5 py-0.5 bg-white hover:bg-slate-200 text-slate-700 text-[10px] font-black rounded-lg border border-slate-200 cursor-pointer transition-all shadow-2xs",
                                title: "إنقاص 5 من المخزون",
                                children: "-5"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, 1),
                                className: "px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg border border-emerald-200 cursor-pointer transition-all shadow-2xs",
                                title: "زيادة 1 على المخزون",
                                children: "+1"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, 5),
                                className: "px-1.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-lg border border-emerald-200 cursor-pointer transition-all shadow-2xs",
                                title: "زيادة 5 على المخزون",
                                children: "+5"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => {
                                  const cur = (te.stock !== undefined && te.stock !== null) ? te.stock : 10;
                                  const val = prompt("أدخل كمية المخزون الدقيقة لمنتج (" + te.name + ") لتصحيح أي خطأ إدخال:", String(cur));
                                  if (val !== null && val.trim() !== "") {
                                    handleQuickStock(te.id, val.trim(), true);
                                  }
                                },
                                className: "px-2 py-0.5 bg-orange-50 hover:bg-orange-100 text-orange-800 text-[10px] font-extrabold rounded-lg border border-orange-200 cursor-pointer transition-all shadow-2xs flex-1 text-center",
                                title: "كتابة رقم المخزون وتصحيح أي خطأ إدخال فوراً",
                                children: "✍️ ضبط الرقم"
                              }),
                              n.jsx("button", {
                                type: "button",
                                onClick: () => handleQuickStock(te.id, "toggle_unlimited"),
                                className: `px-1.5 py-0.5 text-[10px] font-extrabold rounded-lg border cursor-pointer transition-all shadow-2xs ${te.stock === undefined || te.stock === null ? "bg-blue-500 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"}`,
                                title: "تبديل بين كمية مفتوحة أو محددة",
                                children: "♾️"
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "flex flex-col gap-2 shrink-0 border-r pr-3 justify-center items-center",
                    children: [
                      n.jsx("button", { onClick: () => we(te), className: "p-1.5 text-slate-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all cursor-pointer", title: "تعديل المنتج", children: n.jsx(pn, { className: "w-4 h-4" }) }),
                      n.jsx("button", { onClick: () => tt(te.id), className: "p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer", title: "حذف المنتج", children: n.jsx(Jt, { className: "w-4 h-4" }) })
                    ]
                  })
                ]
              }, te.id);
            })
          })
        ]
      }),

      // TAB 3: ADD / EDIT PRODUCT
      x === "add_product" && n.jsxs("div", {
        className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4",
        children: [
          n.jsxs("div", {
            className: "border-b pb-2",
            children: [
              n.jsxs("h3", { className: "font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2", children: [n.jsx(ra, { className: "w-5 h-5 text-orange-500" }), n.jsx("span", { children: M ? "تعديل بيانات المنتج الحالي" : "إضافة منتج أو مأكول جديد لقائمتك" })] }),
              n.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "املأ الحقول التالية بالدقة لإظهارها بشكل منسق وجذاب للزبائن." })
            ]
          }),

          // Quota warning banner if close to limit
          (!M && isRegularFull && !ce) && n.jsxs("div", {
            className: "p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center justify-between",
            children: [
              n.jsxs("span", { children: ["⚠️ بلغت الحد الأقصى للمنتجات العادية (", maxRegular, " منتج)."] }),
              n.jsx("button", { type: "button", onClick: () => setShowUpgradeModal(true), className: "bg-red-600 text-white px-3 py-1 rounded-lg text-[11px] font-extrabold cursor-pointer", children: "طلب زيادة الحد" })
            ]
          }),

          n.jsxs("form", {
            onSubmit: Ie,
            className: "space-y-4",
            children: [
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "اسم المنتج (مثال: برجر دجاج مضاعف):" }),
                      n.jsx("input", { type: "text", required: !0, value: E, onChange: te => U(te.target.value), placeholder: "اكتب اسماً واضحاً ومغرياً...", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "سعر البيع الحالي (ل.س):" }),
                      n.jsx("input", { type: "number", required: !0, value: F, onChange: te => O(te.target.value), placeholder: "مثال: 12000", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold" })
                    ]
                  })
                ]
              }),
              // Unit Selection & Stock Quantity Controls
              n.jsxs("div", {
                className: "p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1.5",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "وحدة القياس / البيع (حبة، كرتونة، كيس، كغ، وجبة...):" }),
                      n.jsx("div", {
                        className: "flex gap-1.5 flex-wrap pb-1",
                        children: ["وجبة", "حبة", "كرتونة", "كيس", "كغ", "علبة", "طرد", "ربطة", "لتر", "باقة", "طبق (30 بيضة)", "صندوق"].map(u => n.jsx("button", {
                          type: "button",
                          key: u,
                          onClick: () => setItemUnit(u),
                          className: `text-[11px] font-extrabold py-1 px-2.5 rounded-lg border transition-all cursor-pointer ${itemUnit === u ? "bg-orange-500 text-white border-orange-500 shadow-2xs" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"}`,
                          children: u
                        }))
                      }),
                      n.jsx("input", {
                        type: "text",
                        value: itemUnit,
                        onChange: te => setItemUnit(te.target.value),
                        placeholder: "أو اكتب وحدة مخصصة (مثال: نصف كيلو، دزينة...)",
                        className: "w-full bg-white border border-slate-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold"
                      })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "pt-2 border-t border-slate-200/80 space-y-2",
                    children: [
                      n.jsxs("label", {
                        className: "flex items-center gap-2 cursor-pointer select-none",
                        children: [
                          n.jsx("input", {
                            type: "checkbox",
                            checked: isUnlimitedStock,
                            onChange: te => setIsUnlimitedStock(te.target.checked),
                            className: "w-4 h-4 text-orange-500 rounded accent-orange-500"
                          }),
                          n.jsx("span", { className: "text-xs font-extrabold text-slate-800", children: "كمية المخزون مفتوحة وغير محدودة (متوفر دائماً) ♾️" })
                        ]
                      }),
                      !isUnlimitedStock && n.jsxs("div", {
                        className: "space-y-1 pt-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-extrabold text-slate-600 block", children: "الكمية المتوفرة حالياً بالمخزون (سيظهر عداد نفاذ الكمية للزبائن عند قرب انتهائها):" }),
                          n.jsx("input", {
                            type: "number",
                            min: "0",
                            value: stockCount,
                            onChange: te => setStockCount(te.target.value),
                            placeholder: "مثال: 15 (أدخل 0 إذا نفدت الكمية)",
                            className: "w-full bg-white border border-orange-200 focus:border-orange-500 rounded-xl py-2 px-3 text-xs outline-none text-slate-800 font-bold"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "وصف ومكونات المنتج:" }),
                  n.jsx("textarea", { value: ne, onChange: te => se(te.target.value), placeholder: "مثال: صدر دجاج مقرمش، خس، صوص المايونيز السري، جبنة شيدر ذائبة...", rows: 3, className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold resize-none" })
                ]
              }),
              // Offer / Discount Checkbox
              n.jsxs("div", {
                className: "p-4 bg-orange-50/70 border border-orange-100 rounded-2xl space-y-3",
                children: [
                  n.jsxs("label", {
                    className: "flex items-center gap-2 cursor-pointer",
                    children: [
                      n.jsx("input", { type: "checkbox", checked: ce, onChange: te => me(te.target.checked), className: "w-4 h-4 text-orange-500 rounded accent-orange-500" }),
                      n.jsx("span", { className: "text-xs font-extrabold text-slate-800", children: "هل هذا المنتج يندرج تحت العروض الخاصة والخصومات؟ 🏷️" })
                    ]
                  }),
                  ce && n.jsxs("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",
                    children: [
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-extrabold text-slate-600 block", children: "السعر القديم قبل الخصم (ل.س):" }),
                          n.jsx("input", { type: "number", value: Me, onChange: te => Ne(te.target.value), placeholder: "مثال: 15000", className: "w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none focus:border-orange-500" })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "space-y-1",
                        children: [
                          n.jsx("label", { className: "text-[11px] font-extrabold text-slate-600 block", children: "نص شارة العرض (مثال: خصم 20%):" }),
                          n.jsx("input", { type: "text", value: ke, onChange: te => I(te.target.value), placeholder: "مثال: عرض اليوم، خصم 25%", className: "w-full bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold outline-none focus:border-orange-500" })
                        ]
                      })
                    ]
                  })
                ]
              }),
              // Category Selection
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "تصنيف المنتج:" }),
                  n.jsx("select", {
                    value: G,
                    onChange: te => J(te.target.value),
                    className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold",
                    children: r.map(cat => n.jsx("option", { value: cat.id, children: cat.label }, cat.id))
                  })
                ]
              }),
              // Image URL / selector
              n.jsxs("div", {
                className: "space-y-1.5",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رابط صورة المنتج أو اختر من القوالب الجاهزة:" }),
                  n.jsx("input", { type: "text", value: z, onChange: te => Z(te.target.value), placeholder: "https://...", className: "w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3.5 text-xs outline-none text-slate-800 font-bold" }),
                  n.jsx("div", {
                    className: "flex gap-2 overflow-x-auto py-2",
                    children: A0.map((preset, idx) => n.jsx("button", {
                      type: "button",
                      key: idx,
                      onClick: () => Z(preset.url),
                      className: `text-[10px] font-extrabold py-1 px-2.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${z === preset.url ? "bg-orange-500 text-white border-orange-500" : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"}`,
                      children: preset.label
                    }))
                  })
                ]
              }),
              // Submit buttons
              n.jsxs("div", {
                className: "flex gap-2 pt-3 border-t",
                children: [
                  n.jsx("button", {
                    type: "submit",
                    className: "flex-1 py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-sm text-center",
                    children: M ? "حفظ وتحديث المنتج ✏️" : "إضافة المنتج للقائمة ➕"
                  }),
                  n.jsx("button", {
                    type: "button",
                    onClick: () => { de(); b("menu"); },
                    className: "py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition-all cursor-pointer",
                    children: "إلغاء"
                  })
                ]
              })
            ]
          })
        ]
      }),

      // TAB 4: STORE PROFILE & SETTINGS
      x === "profile" && n.jsxs("div", {
        className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4",
        children: [
          n.jsxs("div", {
            className: "border-b pb-2",
            children: [
              n.jsxs("h3", { className: "font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2", children: [n.jsx(sl, { className: "w-5 h-5 text-orange-500" }), n.jsx("span", { children: "إعدادات وملف المتجر" })] }),
              n.jsx("p", { className: "text-[10px] text-slate-400 mt-0.5", children: "تعديل أوقات الدوام، الهاتف، والعنوان الظاهر للزبائن." })
            ]
          }),
          n.jsxs("form", {
            onSubmit: Ve,
            className: "space-y-4",
            children: [
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "اسم المتجر:" }),
                      n.jsx("input", { type: "text", required: !0, value: Q, onChange: te => oe(te.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "حالة استقبال الطلبات الحالية:" }),
                      n.jsxs("select", {
                        value: j,
                        onChange: te => R(te.target.value),
                        className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500",
                        children: [
                          n.jsx("option", { value: "open", children: "مفتوح ويستقبل طلبات الشراء 🟢" }),
                          n.jsx("option", { value: "closed", children: "مغلق مؤقتاً 🔴" }),
                          n.jsx("option", { value: "busy", children: "مزدحم بطلبات سابقة 🟡" })
                        ]
                      })
                    ]
                  })
                ]
              }),
              n.jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "أوقات وساعات العمل:" }),
                      n.jsx("input", { type: "text", value: K, onChange: te => le(te.target.value), placeholder: "مثال: 9:00 ص - 11:00 م", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                    ]
                  }),
                  n.jsxs("div", {
                    className: "space-y-1",
                    children: [
                      n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "رقم هاتف المتجر / الواتساب:" }),
                      n.jsx("input", { type: "text", value: ee, onChange: te => fe(te.target.value), placeholder: "0933111222", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                    ]
                  })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "العنوان وموقع المحل:" }),
                  n.jsx("input", { type: "text", value: ie, onChange: te => je(te.target.value), placeholder: "مثال: ساحة البلدية، بجانب المركز الثقافي", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500" })
                ]
              }),
              n.jsxs("div", {
                className: "space-y-1",
                children: [
                  n.jsx("label", { className: "text-xs font-extrabold text-slate-700 block", children: "نبذة ووصف المتجر للزبائن:" }),
                  n.jsx("textarea", { value: ue, onChange: te => be(te.target.value), rows: 2, placeholder: "اكتب وصفاً جذاباً لخدمات متجرك...", className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold outline-none focus:border-orange-500 resize-none" })
                ]
              }),
              n.jsx("button", {
                type: "submit",
                className: "py-3 px-6 bg-slate-900 hover:bg-orange-500 hover:text-white text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-all shadow-sm",
                children: [n.jsx(La, { className: "w-4 h-4" }), n.jsx("span", { children: "حفظ وتحديث ملف المتجر" })]
              })
            ]
          })
        ]
      }),

      // UPGRADE / INCREASE QUOTA MODAL (Request 1)
      showUpgradeModal && n.jsx("div", {
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4",
        dir: "rtl",
        children: n.jsxs("div", {
          className: "bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scale-in text-right border border-slate-100",
          children: [
            n.jsxs("div", {
              className: "flex items-center justify-between border-b pb-3",
              children: [
                n.jsxs("div", {
                  className: "flex items-center gap-2",
                  children: [
                    n.jsx("div", { className: "w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm", children: "🚀" }),
                    n.jsx("h3", { className: "font-black text-slate-800 text-sm sm:text-base", children: "طلب زيادة سعة المنتجات من الإدارة" })
                  ]
                }),
                n.jsx("button", { onClick: () => setShowUpgradeModal(false), className: "w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold cursor-pointer", children: "✕" })
              ]
            }),
            n.jsxs("div", {
              className: "space-y-3 text-xs text-slate-700 leading-relaxed",
              children: [
                n.jsxs("div", {
                  className: "p-3 bg-orange-50 rounded-2xl border border-orange-100 space-y-1.5",
                  children: [
                    n.jsxs("p", { className: "font-extrabold text-orange-950", children: ["سعة متجرك الحالية: ", maxRegular, " منتج عادي و ", maxOffers, " عروض خاصة."] }),
                    n.jsx("p", { className: "text-slate-600 text-[11px]", children: "تقوم الإدارة برفع السعة فوراً للمتاجر المميزة بعد مراجعة الطلب." })
                  ]
                }),
                n.jsx("p", { className: "text-slate-600", children: "لتقديم طلب الترقية، يمكنك التواصل المباشر مع مدير النظام عبر واتساب أو إرسال طلب فوري:" })
              ]
            }),
            n.jsxs("div", {
              className: "flex flex-col sm:flex-row gap-2 pt-2",
              children: [
                n.jsx("a", {
                  href: `https://wa.me/?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، إدارة تطبيق توصيل، أود طلب ترقية وزيادة سعة المنتجات لمتجري: ${m.name} (الهاتف: ${m.ownerPhone || m.phone})`)}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm text-center transition-all cursor-pointer",
                  children: "💬 واتساب"
                }),
                n.jsx("a", {
                  href: /Android/i.test(navigator.userAgent) ? `intent://send?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، إدارة تطبيق توصيل، أود طلب ترقية وزيادة سعة المنتجات لمتجري: ${m.name} (الهاتف: ${m.ownerPhone || m.phone})`)}#Intent;package=com.whatsapp.w4b;scheme=whatsapp;end` : `https://wa.me/?text=${encodeURIComponent(`السلام عليكم ورحمة الله وبركاته، إدارة تطبيق توصيل، أود طلب ترقية وزيادة سعة المنتجات لمتجري: ${m.name} (الهاتف: ${m.ownerPhone || m.phone})`)}`,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-sm text-center transition-all cursor-pointer border border-emerald-500/40",
                  children: "💼 واتس الأعمال"
                }),
                n.jsx("button", {
                  type: "button",
                  onClick: () => {
                    alert("✅ تم إرسال طلب الترقية لمتجرك (" + m.name + ") إلى إدارة التطبيق بنجاح! سيتم التواصل معك ورفع السعة قريباً.");
                    setShowUpgradeModal(false);
                  },
                  className: "py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer",
                  children: "📩 إرسال طلب ترقية فوري"
                })
              ]
            })
          ]
        })
      })
    ]
  });
}
