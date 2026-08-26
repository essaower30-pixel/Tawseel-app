import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Store as StoreIcon, Bike, Key, ShieldCheck, Download, Eye, EyeOff, X, ArrowRight, MessageCircle } from "lucide-react";
import { Store, UserProfile, DriverMember } from "../types";
import { initialDrivers } from "../data/adminInitialData";

interface AuthModalProps {
  onRegister: (profile: UserProfile, role: "customer" | "store_owner" | "admin" | "driver") => void;
  stores: Store[];
  onAddStore: (store: Store) => void;
  activeOrder?: any;
  onTrackOrder?: () => void;
  onClose?: () => void;
  initialRole?: "customer" | "driver" | "store" | "staff";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onRegister,
  stores,
  onAddStore,
  activeOrder,
  onTrackOrder,
  onClose,
  initialRole = "customer"
}) => {
  const [role, setRole] = useState<"customer" | "driver" | "store" | "staff">(initialRole);
  const [hasInstallPrompt, setHasInstallPrompt] = useState(!!(window as any).deferredPrompt);

  // Customer Form State
  const [customerName, setCustomerName] = useState(() => localStorage.getItem("tw_remembered_name") || "");
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem("tw_remembered_phone") || "");
  const [customerPin, setCustomerPin] = useState("");

  // Driver / Captain Form State
  const [driverUser, setDriverUser] = useState("");
  const [driverPin, setDriverPin] = useState("");
  const [showDriverPin, setShowDriverPin] = useState(false);

  // Store Form State
  const [storeTab, setStoreTab] = useState<"login" | "register">("login");
  const [storeLoginPhone, setStoreLoginPhone] = useState("");
  const [storeLoginPin, setStoreLoginPin] = useState("");
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreCategory, setNewStoreCategory] = useState("restaurants");
  const [newStorePhone, setNewStorePhone] = useState("");
  const [newStorePin, setNewStorePin] = useState("");
  const [newStoreDesc, setNewStoreDesc] = useState("");

  // Staff / Admin Form State
  const [staffPassword, setStaffPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Secret gesture for staff tab
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecretStaffTab, setShowSecretStaffTab] = useState(false);
  const hideStaffTab = localStorage.getItem("tw_hide_staff_tab") === "true";

  useEffect(() => {
    const handlePrompt = () => setHasInstallPrompt(true);
    window.addEventListener("pwaInstallPromptReady", handlePrompt);
    return () => window.removeEventListener("pwaInstallPromptReady", handlePrompt);
  }, []);

  const handleSecretTitleClick = () => {
    const next = secretClicks + 1;
    setSecretClicks(next);
    if (next >= 4) {
      setShowSecretStaffTab(true);
      setRole("staff");
      setSecretClicks(0);
      alert("🔓 تم تفعيل بوابة دخول الكوادر والإدارة المشفرة!");
    }
  };

  // 1. Customer Submission
  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const name = customerName.trim();
    if (name.split(/\s+/).filter(Boolean).length < 2) {
      setErrorMsg("الرجاء إدخال اسمك الكريم (الثنائي أو الثلاثي على الأقل).");
      return;
    }

    const phone = customerPhone.trim();
    if (!phone.match(/^09\d{8}$/) && !phone.match(/^9\d{8}$/)) {
      setErrorMsg("الرجاء إدخال رقم موبايل صحيح ومكون من 10 أرقام ويبدأ بـ 09 (مثال: 0951854257).");
      return;
    }

    const pin = customerPin.trim();
    if (!pin.match(/^\d{4}$/)) {
      setErrorMsg("الرجاء إدخال رمز حماية سري مكون من 4 أرقام لتأمين حسابك.");
      return;
    }

    localStorage.setItem("tw_remembered_name", name);
    localStorage.setItem("tw_remembered_phone", phone);

    try {
      const nowStr = new Date().toISOString();
      const rawC = localStorage.getItem("tw_registered_customers");
      let cList = rawC ? JSON.parse(rawC) : [];
      const idx = cList.findIndex((c: any) => c.phone === phone);
      if (idx >= 0) {
        cList[idx].name = name;
        cList[idx].lastLogin = nowStr;
      } else {
        cList.push({
          id: "cust_" + Date.now(),
          name,
          phone,
          registeredAt: nowStr,
          lastLogin: nowStr,
          totalOrders: 1
        });
      }
      localStorage.setItem("tw_registered_customers", JSON.stringify(cList));
    } catch (err) {}

    setSuccessMsg("تم تأكيد وتوثيق هويتك كزبون بنجاح!");
    setIsSuccess(true);
    setTimeout(() => {
      onRegister({ name, phone, pin }, "customer");
    }, 600);
  };

  // 2. Captain / Driver Submission
  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const enteredUser = driverUser.trim().toLowerCase();
    const enteredPin = driverPin.trim();

    if (!enteredUser || !enteredPin) {
      setErrorMsg("الرجاء إدخال اسم المستخدم ورمز المرور السري (PIN).");
      return;
    }

    let driversList: DriverMember[] = [];
    try {
      const raw = localStorage.getItem("tw_drivers_list") || localStorage.getItem("tw_drivers");
      driversList = raw ? JSON.parse(raw) : initialDrivers;
    } catch {
      driversList = initialDrivers;
    }

    // Match captain by username OR phone OR ID, and PIN/password
    const matchedDriver = driversList.find((dr) => {
      const u = (dr.username || "").toLowerCase();
      const p = (dr.phone || "").toLowerCase();
      const id = (dr.id || "").toLowerCase();
      const n = (dr.name || "").toLowerCase();

      const userMatch = (u && u === enteredUser) || p === enteredUser || id === enteredUser || n.includes(enteredUser);
      const pinMatch = dr.pin === enteredPin || dr.password === enteredPin;
      return userMatch && pinMatch;
    });

    // Also support fallback demo credentials if applicable
    const legacyDriverPins = ["1111", "2222", "3333", "5555", "6666", "7777"];

    if (matchedDriver) {
      setSuccessMsg(`🛵 مرحباً بك يا ${matchedDriver.name}. تم تسجيل الدخول إلى لوحة كباتن التوصيل!`);
      setIsSuccess(true);
      setTimeout(() => {
        onRegister({
          name: matchedDriver.name,
          phone: matchedDriver.phone,
          pin: matchedDriver.pin || enteredPin
        }, "driver");
      }, 700);
    } else if (legacyDriverPins.includes(enteredPin) && (enteredUser.includes("capt") || enteredUser.includes("كابتن") || enteredUser.startsWith("09"))) {
      const fallbackName = enteredUser.startsWith("09") ? "كابتن توصيل" : enteredUser;
      setSuccessMsg(`🛵 مرحباً بالكابتن. تم تسجيل الدخول بنجاح!`);
      setIsSuccess(true);
      setTimeout(() => {
        onRegister({
          name: fallbackName,
          phone: enteredUser.startsWith("09") ? enteredUser : "0991112233",
          pin: enteredPin
        }, "driver");
      }, 700);
    } else {
      setErrorMsg("⛔ بيانات الكابتن غير صحيحة! يرجى التأكد من اسم المستخدم ورمز المرور المعطى لك من قبل إدارة المنصة.");
    }
  };

  // 3. Store Login Submission
  const handleStoreLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const phone = storeLoginPhone.trim();
    const pin = storeLoginPin.trim();

    const matchedStore = stores.find(s => s.ownerPhone === phone && s.ownerPin === pin);
    if (!matchedStore) {
      setErrorMsg("البيانات المدخلة لا تطابق أي متجر مسجل بالنظام! الرجاء التحقق من رقم الهاتف والرمز السري.");
      return;
    }

    setSuccessMsg(`تم تأكيد الهوية لمتجر: ${matchedStore.name}. جاري تحويلك للوحة التحكم...`);
    setIsSuccess(true);
    setTimeout(() => {
      onRegister({
        name: matchedStore.name,
        phone: matchedStore.ownerPhone || phone,
        pin: matchedStore.ownerPin || pin,
        storeId: matchedStore.id
      }, "store_owner");
    }, 600);
  };

  // Store Registration Submission
  const handleStoreRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const name = newStoreName.trim();
    const phone = newStorePhone.trim();
    const pin = newStorePin.trim();

    if (name.length < 3) {
      setErrorMsg("الرجاء إدخال اسم متجر صحيح وجدي (3 أحرف على الأقل).");
      return;
    }
    if (!phone.match(/^09\d{8}$/) && !phone.match(/^9\d{8}$/)) {
      setErrorMsg("الرجاء إدخال رقم هاتف مالك المتجر المكون من 10 أرقام ويبدأ بـ 09.");
      return;
    }
    if (!pin.match(/^\d{4}$/)) {
      setErrorMsg("الرجاء إدخال رمز حماية للمتجر مكون من 4 أرقام.");
      return;
    }
    if (stores.find(s => s.ownerPhone === phone)) {
      setErrorMsg("رقم موبايل المالك هذا مسجل بالفعل لمتجر آخر!");
      return;
    }

    const newStore: Store = {
      id: "store_" + Date.now(),
      name,
      category: newStoreCategory,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60",
      rating: 5,
      deliveryTime: "30-40 دقيقة",
      deliveryFee: 5,
      locationNode: "center",
      ownerPhone: phone,
      ownerPin: pin,
      isApproved: false,
      status: "closed",
      description: newStoreDesc || "متجر محلي جديد مسجل بانتظار تفعيل الإدارة",
      workingHours: "10:00 ص - 11:00 م",
      priority: 1,
      maxRegularProducts: 20,
      maxOfferProducts: 10
    };

    onAddStore(newStore);
    setSuccessMsg(`تم تسجيل طلب إضافة المتجر "${name}" بنجاح!`);
    setIsSuccess(true);
    setTimeout(() => {
      onRegister({
        name: newStore.name,
        phone: newStore.ownerPhone || phone,
        pin: newStore.ownerPin || pin,
        storeId: newStore.id
      }, "store_owner");
    }, 800);
  };

  // 4. Staff & Admin Login
  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (isLocked) {
      setErrorMsg("🔒 تم قفل الدخول مؤقتاً لحماية النظام لكثرة المحاولات الخاطئة. يرجى الانتظار 60 ثانية.");
      return;
    }

    const entered = staffPassword.trim();
    if (!entered) {
      setErrorMsg("الرجاء إدخال كلمة المرور أو رمز التفويض السري.");
      return;
    }

    const masterAdminPassword = localStorage.getItem("tw_admin_secure_password") || "Admin@Tawseel2026#";
    const legacyAdminPins = ["1234", "1111", "2222", "3333", "4444"];

    let staffMembers = [];
    try {
      const raw = localStorage.getItem("tw_staff_members");
      if (raw) staffMembers = JSON.parse(raw);
    } catch (err) {}

    const matchedStaff = staffMembers.find((s: any) => s.pin === entered || s.password === entered);

    if (
      entered === masterAdminPassword ||
      entered === "Admin@Tawseel2026#" ||
      legacyAdminPins.includes(entered) ||
      (matchedStaff && matchedStaff.role === "manager")
    ) {
      let adminName = "المدير العام";
      if (matchedStaff) adminName = matchedStaff.name;
      else if (entered === "1111") adminName = "المدير العام";
      else if (entered === "2222") adminName = "أم عبده (مسؤول الطلبات)";
      else if (entered === "3333") adminName = "أبو سمير (المحاسب المالي)";
      else if (entered === "4444") adminName = "أبو جودة (موظف الدعم)";

      setSuccessMsg(`🔐 أهلاً بك يا ${adminName}. تم تأكيد الصلاحيات الإدارية!`);
      setIsSuccess(true);
      setFailedAttempts(0);
      setTimeout(() => {
        onRegister({ name: adminName, phone: "0933111222", pin: entered }, "admin");
      }, 700);
    } else if (matchedStaff) {
      setSuccessMsg(`أهلاً بك يا ${matchedStaff.name}. تم تسجيل الدخول بنجاح!`);
      setIsSuccess(true);
      setFailedAttempts(0);
      setTimeout(() => {
        onRegister({ name: matchedStaff.name, phone: matchedStaff.phone || "0933111222", pin: entered }, "admin");
      }, 700);
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setIsLocked(true);
        setTimeout(() => {
          setIsLocked(false);
          setFailedAttempts(0);
        }, 60000);
        setErrorMsg("⛔ تم قفل لوحة الكوادر لمدة 60 ثانية لتكرار إدخال كلمات مرور غير صحيحة.");
      } else {
        setErrorMsg(`⛔ كلمة المرور غير صحيحة! محاولات متبقية قبل القفل: ${5 - nextFail}`);
      }
    }
  };

  const triggerPwaInstall = async () => {
    const prompt = (window as any).deferredPrompt;
    if (prompt) {
      prompt.prompt();
      const choiceResult = await prompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setHasInstallPrompt(false);
      }
      (window as any).deferredPrompt = null;
    } else {
      alert("لتثبيت التطبيق على هاتفك:\n- على أندرويد (Chrome): اضغط على القائمة (⋮) ثم 'تثبيت التطبيق' أو 'Add to Home screen'.\n- على آيفون (Safari): اضغط زر المشاركة (Share) ثم 'إضافة إلى الشاشة الرئيسية' (Add to Home Screen).");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex flex-col justify-between selection:bg-orange-500 selection:text-slate-950 font-sans" dir="rtl">
      {/* Top Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 px-4 sm:px-6 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-orange-500 flex items-center justify-center shadow-md border border-slate-800">
              <Bike className="w-5.5 h-5.5" />
            </div>
            <div>
              <h1 className="font-black text-slate-900 text-base sm:text-lg tracking-tight leading-none">
                توصيل
              </h1>
              <p className="text-[9px] text-slate-400 font-bold leading-none mt-1">
                بوابة تسجيل الدخول واختيار الحساب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeOrder && (
              <button
                type="button"
                onClick={onTrackOrder}
                className="bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-2 px-3 sm:px-4 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
              >
                <span>تتبع طلبك الحالي 🛵</span>
              </button>
            )}

            {hasInstallPrompt && (
              <button
                type="button"
                onClick={triggerPwaInstall}
                className="bg-slate-900 hover:bg-orange-500 hover:text-slate-950 text-white font-black text-xs py-2 px-3 rounded-xl transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="تثبيت التطبيق على جهازك كبرنامج رسمي"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden sm:inline">تثبيت التطبيق</span>
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl transition-all flex items-center gap-1 cursor-pointer border border-slate-200"
                title="إغلاق والعودة للتصفح كزائر"
              >
                <X className="w-4 h-4" />
                <span>إغلاق / تصفح</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Authentication View */}
      <main className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto p-4 sm:p-6 my-4">
        {/* Central Auth Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-2xl space-y-5 relative overflow-hidden text-right">
          {/* Card Header with Scooter Icon & Title */}
          <div
            onClick={handleSecretTitleClick}
            className="text-center space-y-1.5 cursor-pointer select-none"
            title="تطبيق توصيل القرية"
          >
            <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-400 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 text-2xl">
              🛵
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">تسجيل الدخول للمنصة</h2>
            <p className="text-slate-400 text-xs font-semibold max-w-xs mx-auto">
              الرجاء اختيار نوع حسابك للمتابعة
            </p>
          </div>

          {/* Account Type Tabs (Segmented Control - 4 Tabs) */}
          <div className="grid grid-cols-3 gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/60">
            {/* Tab 1: Customer */}
            <button
              type="button"
              onClick={() => { setRole("customer"); setErrorMsg(""); }}
              className={`py-2 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                role === "customer"
                  ? "bg-white text-orange-600 shadow-md shadow-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>زبون 🛍️</span>
            </button>

            {/* Tab 2: Driver / Captain */}
            <button
              type="button"
              onClick={() => { setRole("driver"); setErrorMsg(""); }}
              className={`py-2 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                role === "driver"
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "text-slate-600 hover:text-orange-600"
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>كابتن 🛵</span>
            </button>

            {/* Tab 3: Store */}
            <button
              type="button"
              onClick={() => { setRole("store"); setErrorMsg(""); }}
              className={`py-2 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                role === "store"
                  ? "bg-white text-orange-600 shadow-md shadow-slate-200"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <StoreIcon className="w-3.5 h-3.5" />
              <span>متجر 🏪</span>
            </button>

            {/* Tab 4: Staff / Admin */}
            {(!hideStaffTab || showSecretStaffTab) && (
              <button
                type="button"
                onClick={() => { setRole("staff"); setErrorMsg(""); }}
                className={`col-span-3 py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-1 ${
                  role === "staff"
                    ? "bg-slate-900 text-amber-400 shadow-md"
                    : "text-slate-600 hover:text-slate-900 bg-slate-200/60"
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>🔐 بوابة الإدارة والكوادر المشفرة</span>
              </button>
            )}
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold text-center">
              {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs font-black text-center animate-pulse">
              {successMsg}
            </div>
          )}

          {/* Forms with Animated Transitions */}
          <AnimatePresence mode="wait">
            {/* TAB 1: CUSTOMER FORM */}
            {role === "customer" && (
              <motion.form
                key="auth_customer_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onSubmit={handleCustomerSubmit}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    الاسم الثلاثي الكريم:
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: أحمد العلي"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-2xl py-3 px-4 text-xs font-bold outline-none text-slate-800 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    رقم الموبايل للتواصل والتوصيل:
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0951854257"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-2xl py-3 px-4 text-xs font-bold outline-none text-slate-800 transition-all text-left"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    رمز حماية سري خاص بك (4 أرقام):
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={customerPin}
                    onChange={(e) => setCustomerPin(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="••••"
                    className="w-full bg-white border-2 border-orange-500 focus:border-orange-600 rounded-2xl py-3 px-4 text-center text-lg font-black tracking-widest outline-none text-slate-900 shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-98 transition-all cursor-pointer text-center"
                >
                  دخول والبدء بالتسوق 🛍️
                </button>
              </motion.form>
            )}

            {/* TAB 2: DRIVER / CAPTAIN FORM */}
            {role === "driver" && (
              <motion.form
                key="auth_driver_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onSubmit={handleDriverSubmit}
                className="space-y-4"
              >
                {/* Admin-Provided Credentials Notice */}
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-2xl space-y-1 text-slate-700 text-xs">
                  <div className="flex items-center gap-2 font-black text-orange-700 text-xs">
                    <Bike className="w-4 h-4 text-orange-600" />
                    <span>تسجيل دخول كباتن التوصيل 🛵</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    يتم تزويد الكابتن باسم المستخدم ورمز المرور السري (PIN) من قبل إدارة المنصة عند التفعيل الأول.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    اسم المستخدم أو رقم الموبايل:
                  </label>
                  <input
                    type="text"
                    required
                    value={driverUser}
                    onChange={(e) => setDriverUser(e.target.value)}
                    placeholder="مثال: capt_mahmoud أو 0991112233"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-2xl py-3 px-4 text-xs font-bold outline-none text-slate-800 transition-all font-mono text-left"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    رمز المرور السري (PIN):
                  </label>
                  <div className="relative">
                    <input
                      type={showDriverPin ? "text" : "password"}
                      required
                      value={driverPin}
                      onChange={(e) => setDriverPin(e.target.value)}
                      placeholder="••••"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-2xl py-3 px-10 text-center text-base font-black tracking-widest outline-none text-slate-900 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowDriverPin(!showDriverPin)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
                    >
                      {showDriverPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-98 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  <Bike className="w-4 h-4" />
                  <span>دخول لوحة الكابتن واستلام الطلبات 🛵</span>
                </button>

                {/* Direct WhatsApp request for new drivers */}
                <div className="text-center pt-2 border-t border-slate-100">
                  <p className="text-[11px] text-slate-400 mb-2">كابتن جديد وترغب بالانضمام للأسطول؟</p>
                  <a
                    href="https://wa.me/963951854257?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%83%D9%83%D8%A7%D8%A8%D8%AA%D9%86%20%D8%AA%D9%88%D8%B5%D9%8A%D9%84%20%D9%81%D9%8A%20%D8%A7%D9%84%D9%85%D9%86%D8%B5%D8%A9"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-black transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>تواصل مع الإدارة لطلب حساب كابتن عبر واتساب</span>
                  </a>
                </div>
              </motion.form>
            )}

            {/* TAB 3: STORE OWNER FORM */}
            {role === "store" && (
              <motion.div
                key="auth_store_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => { setStoreTab("login"); setErrorMsg(""); }}
                    className={`py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      storeTab === "login" ? "bg-white text-orange-600 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    تسجيل دخول لمتجرك
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStoreTab("register"); setErrorMsg(""); }}
                    className={`py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      storeTab === "register" ? "bg-white text-orange-600 shadow-xs" : "text-slate-500"
                    }`}
                  >
                    طلب انضمام متجر جديد
                  </button>
                </div>

                {storeTab === "login" ? (
                  <form onSubmit={handleStoreLogin} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 block">
                        رقم موبايل مالك المتجر:
                      </label>
                      <input
                        type="tel"
                        required
                        value={storeLoginPhone}
                        onChange={(e) => setStoreLoginPhone(e.target.value)}
                        placeholder="09xxxxxxxx"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs font-bold outline-none text-left"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 block">
                        الرمز السري لمتجرك (4 أرقام):
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={storeLoginPin}
                        onChange={(e) => setStoreLoginPin(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="••••"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-center text-base font-black tracking-widest outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer text-center"
                    >
                      دخول لوحة تحكم المتجر 🏪
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleStoreRegister} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 block">
                        اسم المتجر أو النشاط التجاري:
                      </label>
                      <input
                        type="text"
                        required
                        value={newStoreName}
                        onChange={(e) => setNewStoreName(e.target.value)}
                        placeholder="مثال: مأكولات الشام، صيدلية السلام"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs font-bold outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 block">
                        تصنيف المتجر:
                      </label>
                      <select
                        value={newStoreCategory}
                        onChange={(e) => setNewStoreCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-bold outline-none"
                      >
                        <option value="restaurants">مطاعم وجبات</option>
                        <option value="supermarkets">سوبرماركت وتموينات</option>
                        <option value="pharmacies">صيدليات</option>
                        <option value="vegetables">خضار وفواكه</option>
                        <option value="sweets">حلويات ومعجنات</option>
                        <option value="doctors">عيادات وأطباء</option>
                        <option value="crafts">مهن وصيانة</option>
                        <option value="drivers">خدمات وسائقين</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 block">
                        رقم موبايل المالك:
                      </label>
                      <input
                        type="tel"
                        required
                        value={newStorePhone}
                        onChange={(e) => setNewStorePhone(e.target.value)}
                        placeholder="09xxxxxxxx"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-xs font-bold outline-none text-left"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-slate-700 block">
                        رمز حماية سري لمتجرك (4 أرقام):
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={newStorePin}
                        onChange={(e) => setNewStorePin(e.target.value.replace(/[^0-9]/g, ""))}
                        placeholder="••••"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl py-2.5 px-3 text-center text-base font-black tracking-widest outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer text-center"
                    >
                      تسجيل المتجر والبدء بإعداده 🚀
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* TAB 4: STAFF & ADMIN FORM */}
            {role === "staff" && (
              <motion.form
                key="auth_staff_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                onSubmit={handleStaffSubmit}
                className="space-y-4"
              >
                <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-400 text-slate-950 rounded-xl flex items-center justify-center font-black">
                        🔐
                      </div>
                      <h4 className="font-black text-xs sm:text-sm text-amber-400">بوابة الإدارة والكوادر المشفرة</h4>
                    </div>
                    {isLocked && (
                      <span className="text-[9px] bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                        مقفل مؤقتاً ⏳
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-[10px] leading-relaxed">
                    أدخل كلمة المرور الرئيسية للإدارة أو كود المسؤولين المصرح لهم (مثال: 1111 أو Admin@Tawseel2026#).
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 block">
                    كلمة المرور المشفرة للإدارة / رمز الكادر:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoFocus
                      disabled={isLocked}
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      placeholder="أدخل كلمة المرور..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl py-3 px-10 text-center text-sm font-black outline-none text-slate-800 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLocked}
                  className={`w-full ${
                    isLocked ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-orange-500 hover:text-slate-950"
                  } text-white font-extrabold text-sm py-3.5 rounded-2xl transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-1.5`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isLocked ? "بوابة الإدارة مقفلة مؤقتاً..." : "تحقق وتسجيل دخول آمن 🔐"}</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer Security Badge */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-center text-[11px] text-slate-500 font-bold">
            <span>🔒 اتصال مشفر ومحمي بروتوكولياً</span>
          </div>
        </div>
      </main>
    </div>
  );
};
