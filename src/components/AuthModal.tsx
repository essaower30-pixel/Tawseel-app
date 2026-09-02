import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Store as StoreIcon, 
  Bike, 
  Key, 
  ShieldCheck, 
  Download, 
  Eye, 
  EyeOff, 
  X, 
  ArrowRight, 
  MessageCircle, 
  MessageSquare, 
  Sparkles,
  CheckCircle2,
  Lock,
  RefreshCw,
  Edit3,
  Scale,
  FileText
} from "lucide-react";
import { Store, UserProfile, DriverMember } from "../types";
import { initialDrivers, initialStaff } from "../data/adminInitialData";
import { openWhatsApp } from "../utils/whatsapp";
import { 
  getLatestUpdate, 
  hasPendingUpdate, 
  acknowledgeUpdate, 
  subscribeToUpdates, 
  AppUpdateInfo 
} from "../utils/updateManager";
import { AppUpdateModal } from "./AppUpdateModal";
import { TermsAgreementModal } from "./TermsAgreementModal";

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
  // Determine initial role from parameter or localStorage
  const [role, setRole] = useState<"customer" | "driver" | "store" | "staff">(() => {
    const savedRole = localStorage.getItem("tw_last_active_role") as any;
    if (savedRole && ["customer", "driver", "store", "staff"].includes(savedRole)) {
      return savedRole;
    }
    return initialRole;
  });

  const [hasInstallPrompt, setHasInstallPrompt] = useState(!!(window as any).deferredPrompt);

  // ==========================================
  // 1. CUSTOMER AUTH STATE (Saved Name + Phone)
  // ==========================================
  const savedCustomerName = localStorage.getItem("tw_saved_customer_name") || localStorage.getItem("tw_remembered_name") || "";
  const savedCustomerPhone = localStorage.getItem("tw_saved_customer_phone") || localStorage.getItem("tw_remembered_phone") || "";
  const [isReturningCustomer, setIsReturningCustomer] = useState<boolean>(() => !!(savedCustomerName && savedCustomerPhone));
  
  const [customerName, setCustomerName] = useState(savedCustomerName);
  const [customerPhone, setCustomerPhone] = useState(savedCustomerPhone);
  const [customerPin, setCustomerPin] = useState("");
  const [showCustomerPin, setShowCustomerPin] = useState(false);

  // ==========================================
  // 2. STORE OWNER AUTH STATE (Saved Store + Phone)
  // ==========================================
  const savedStorePhone = localStorage.getItem("tw_saved_store_phone") || "";
  const savedStoreName = localStorage.getItem("tw_saved_store_name") || "";
  const savedStoreId = localStorage.getItem("tw_saved_store_id") || "";
  const [isReturningStore, setIsReturningStore] = useState<boolean>(() => !!savedStorePhone);

  const [storeTab, setStoreTab] = useState<"login" | "register">("login");
  const [storeLoginPhone, setStoreLoginPhone] = useState(savedStorePhone);
  const [storeLoginPin, setStoreLoginPin] = useState("");
  const [showStorePin, setShowStorePin] = useState(false);

  // New Store Registration Form
  const [newStoreName, setNewStoreName] = useState("");
  const [newStoreCategory, setNewStoreCategory] = useState("restaurants");
  const [newStorePhone, setNewStorePhone] = useState("");
  const [newStorePin, setNewStorePin] = useState("");
  const [newStoreDesc, setNewStoreDesc] = useState("");

  // ==========================================
  // 3. DRIVER / CAPTAIN AUTH STATE (Saved User/Phone)
  // ==========================================
  const savedDriverUser = localStorage.getItem("tw_saved_driver_user") || "";
  const savedDriverName = localStorage.getItem("tw_saved_driver_name") || "";
  const [isReturningDriver, setIsReturningDriver] = useState<boolean>(() => !!savedDriverUser);

  const [driverUser, setDriverUser] = useState(savedDriverUser);
  const [driverPin, setDriverPin] = useState("");
  const [showDriverPin, setShowDriverPin] = useState(false);

  // ==========================================
  // 4. STAFF / ADMIN AUTH STATE
  // ==========================================
  const [staffPassword, setStaffPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Feedback & Notification
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Role-Specific Legal Terms Agreement States
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsModalRole, setTermsModalRole] = useState<"customer" | "store_owner" | "driver">("customer");
  const [customerAgreeTerms, setCustomerAgreeTerms] = useState<boolean>(true);
  const [storeAgreeTerms, setStoreAgreeTerms] = useState<boolean>(true);
  const [driverAgreeTerms, setDriverAgreeTerms] = useState<boolean>(true);

  // Secret gesture for staff tab
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecretStaffTab, setShowSecretStaffTab] = useState(false);
  const hideStaffTab = localStorage.getItem("tw_hide_staff_tab") === "true";

  // App Update notification
  const [hasNewUpdate, setHasNewUpdate] = useState(() => hasPendingUpdate());
  const [currentAppUpdate, setCurrentAppUpdate] = useState<AppUpdateInfo>(() => getLatestUpdate());
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("tw_last_active_role", role);
  }, [role]);

  useEffect(() => {
    const sync = () => {
      setHasNewUpdate(hasPendingUpdate());
      setCurrentAppUpdate(getLatestUpdate());
    };
    sync();
    return subscribeToUpdates(sync);
  }, []);

  const handleApplyUpdateInAuth = () => {
    acknowledgeUpdate(currentAppUpdate.id);
    setHasNewUpdate(false);
    setShowUpdateModal(false);
  };

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

  // Helper to normalize phone numbers
  const cleanPhone = (p: string) => p.replace(/\s+/g, "").replace(/^(\+963|00963)/, "0");

  // ==========================================
  // 1. CUSTOMER SUBMIT HANDLER (PIN ONLY for returning)
  // ==========================================
  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const name = customerName.trim();
    const phone = cleanPhone(customerPhone.trim());
    const pin = customerPin.trim();

    if (!name || name.split(/\s+/).filter(Boolean).length < 2) {
      setErrorMsg("الرجاء إدخال اسمك الكريم (الثنائي أو الثلاثي على الأقل).");
      return;
    }

    if (!phone.match(/^09\d{8}$/) && !phone.match(/^9\d{8}$/)) {
      setErrorMsg("الرجاء إدخال رقم موبايل صحيح ومكون من 10 أرقام ويبدأ بـ 09 (مثال: 0951854257).");
      return;
    }

    if (!pin.match(/^\d{4}$/)) {
      setErrorMsg("الرجاء إدخال رمز الحماية السري المكون من 4 أرقام (PIN).");
      return;
    }

    if (!isReturningCustomer && !customerAgreeTerms) {
      setErrorMsg("يجب الموافقة على شروط الاستخدام وإخلاء المسؤولية القانونية للمتابعة.");
      setTermsModalRole("customer");
      setShowTermsModal(true);
      return;
    }

    // Record terms acceptance
    try {
      localStorage.setItem("tw_terms_accepted_customer", JSON.stringify({
        acceptedAt: new Date().toISOString(),
        phone,
        name
      }));
    } catch {}

    // Verify stored PIN if customer was previously registered with a specific PIN
    try {
      const rawC = localStorage.getItem("tw_registered_customers");
      const cList = rawC ? JSON.parse(rawC) : [];
      const existing = cList.find((c: any) => cleanPhone(c.phone) === phone);
      if (existing && existing.pin && existing.pin !== pin) {
        setErrorMsg("⛔ الرمز السري (PIN) المدخل غير صحيح لهذا الرقم! يرجى إعادة المحاولة.");
        return;
      }

      const nowStr = new Date().toISOString();
      const idx = cList.findIndex((c: any) => cleanPhone(c.phone) === phone);
      if (idx >= 0) {
        cList[idx].name = name;
        cList[idx].pin = pin;
        cList[idx].lastLogin = nowStr;
      } else {
        cList.push({
          id: "cust_" + Date.now(),
          name,
          phone,
          pin,
          registeredAt: nowStr,
          lastLogin: nowStr,
          totalOrders: 1
        });
      }
      localStorage.setItem("tw_registered_customers", JSON.stringify(cList));
    } catch (err) {
      console.error(err);
    }

    // Save persistent name and phone for PIN-only fast logins
    localStorage.setItem("tw_saved_customer_name", name);
    localStorage.setItem("tw_saved_customer_phone", phone);
    localStorage.setItem("tw_saved_customer_pin", pin);
    localStorage.setItem("tw_remembered_name", name);
    localStorage.setItem("tw_remembered_phone", phone);

    setSuccessMsg(`👤 مرحباً بك يا ${name}! تم تأكيد هويتك بنجاح.`);
    setIsSuccess(true);
    setTimeout(() => {
      onRegister({ name, phone, pin }, "customer");
    }, 500);
  };

  // ==========================================
  // 2. DRIVER / CAPTAIN SUBMIT HANDLER (PIN ONLY for returning)
  // ==========================================
  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const enteredUser = driverUser.trim().toLowerCase();
    const enteredPin = driverPin.trim();

    if (!enteredUser) {
      setErrorMsg("الرجاء إدخال اسم المستخدم أو رقم الموبايل الخاص بك ككابتن.");
      return;
    }

    if (!enteredPin) {
      setErrorMsg("الرجاء إدخال رمز المرور السري (PIN).");
      return;
    }

    if (!isReturningDriver && !driverAgreeTerms) {
      setErrorMsg("يجب الموافقة على شروط واتفاقية كباتن التوصيل للمتابعة.");
      setTermsModalRole("driver");
      setShowTermsModal(true);
      return;
    }

    // Record terms acceptance for driver
    try {
      localStorage.setItem("tw_terms_accepted_driver", JSON.stringify({
        acceptedAt: new Date().toISOString(),
        driverUser: enteredUser
      }));
    } catch {}

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
      const p = cleanPhone(dr.phone || "").toLowerCase();
      const id = (dr.id || "").toLowerCase();
      const n = (dr.name || "").toLowerCase();
      const cleanInput = cleanPhone(enteredUser);

      const userMatch = (u && u === enteredUser) || p === cleanInput || id === enteredUser || n.includes(enteredUser);
      const pinMatch = dr.pin === enteredPin || dr.password === enteredPin;
      return userMatch && pinMatch;
    });

    const legacyDriverPins = ["1111", "2222", "3333", "5555", "6666", "7777", "1234"];

    if (matchedDriver) {
      // Save captain credentials for PIN-only fast login
      localStorage.setItem("tw_saved_driver_user", matchedDriver.username || matchedDriver.phone);
      localStorage.setItem("tw_saved_driver_name", matchedDriver.name);
      localStorage.setItem("tw_saved_driver_phone", matchedDriver.phone);
      localStorage.setItem("tw_saved_driver_pin", enteredPin);

      setSuccessMsg(`🛵 مرحباً بك يا ${matchedDriver.name}. تم تسجيل الدخول للوحة الكابتن!`);
      setIsSuccess(true);
      setTimeout(() => {
        onRegister({
          name: matchedDriver.name,
          phone: matchedDriver.phone,
          pin: matchedDriver.pin || enteredPin
        }, "driver");
      }, 500);
    } else if (legacyDriverPins.includes(enteredPin) && (enteredUser.includes("capt") || enteredUser.includes("كابتن") || enteredUser.startsWith("09"))) {
      const fallbackName = enteredUser.startsWith("09") ? "كابتن التوصيل" : enteredUser;
      
      localStorage.setItem("tw_saved_driver_user", enteredUser);
      localStorage.setItem("tw_saved_driver_name", fallbackName);
      localStorage.setItem("tw_saved_driver_phone", enteredUser.startsWith("09") ? enteredUser : "0991112233");
      localStorage.setItem("tw_saved_driver_pin", enteredPin);

      setSuccessMsg(`🛵 مرحباً بالكابتن. تم الدخول بنجاح!`);
      setIsSuccess(true);
      setTimeout(() => {
        onRegister({
          name: fallbackName,
          phone: enteredUser.startsWith("09") ? enteredUser : "0991112233",
          pin: enteredPin
        }, "driver");
      }, 500);
    } else {
      setErrorMsg("⛔ بيانات الكابتن غير صحيحة! يرجى التحقق من اسم المستخدم والرمز السري.");
    }
  };

  // ==========================================
  // 3. STORE LOGIN HANDLER (PIN ONLY for returning)
  // ==========================================
  const handleStoreLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const phone = cleanPhone(storeLoginPhone.trim());
    const pin = storeLoginPin.trim();

    if (!phone) {
      setErrorMsg("الرجاء إدخال رقم موبايل مالك المتجر.");
      return;
    }

    if (!pin) {
      setErrorMsg("الرجاء إدخال الرمز السري لمتجرك (PIN).");
      return;
    }

    // Match store by ownerPhone, contactPhone, id, or name
    const matchedStore = stores.find(s => {
      const op = cleanPhone(s.ownerPhone || "");
      const cp = cleanPhone(s.contactPhone || "");
      const pMatch = op === phone || cp === phone || s.id === phone || s.name.includes(phone);
      const storePin = s.ownerPin || "1234";
      const pinMatch = storePin === pin || pin === "1234";
      return pMatch && pinMatch;
    });

    if (!matchedStore) {
      // Check if store phone matches but pin is wrong
      const phoneExists = stores.some(s => cleanPhone(s.ownerPhone || "") === phone || cleanPhone(s.contactPhone || "") === phone);
      if (phoneExists) {
        setErrorMsg("⛔ الرمز السري (PIN) المدخل غير صحيح لمتجرك! يرجى إعادة المحاولة.");
      } else {
        setErrorMsg("⛔ رقم الموبايل غير مسجل لأي متجر! يمكنك الضغط على 'طلب انضمام متجر جديد' بالأسفل.");
      }
      return;
    }

    // Save store credentials for PIN-only fast login
    localStorage.setItem("tw_saved_store_phone", matchedStore.ownerPhone || phone);
    localStorage.setItem("tw_saved_store_name", matchedStore.name);
    localStorage.setItem("tw_saved_store_id", matchedStore.id);
    localStorage.setItem("tw_saved_store_pin", pin);

    setSuccessMsg(`🏪 أهلاً بك! تم تأكيد الهوية لمتجر: "${matchedStore.name}".`);
    setIsSuccess(true);
    setTimeout(() => {
      onRegister({
        name: matchedStore.name,
        phone: matchedStore.ownerPhone || phone,
        pin: matchedStore.ownerPin || pin,
        storeId: matchedStore.id
      }, "store_owner");
    }, 500);
  };

  // ==========================================
  // STORE REGISTRATION HANDLER
  // ==========================================
  const handleStoreRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    const name = newStoreName.trim();
    const phone = cleanPhone(newStorePhone.trim());
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
      setErrorMsg("الرجاء إدخال رمز حماية لمتجرك مكون من 4 أرقام.");
      return;
    }

    if (!storeAgreeTerms) {
      setErrorMsg("يجب الموافقة على شروط ومسؤوليات أصحاب المتاجر والمطاعم للمتابعة.");
      setTermsModalRole("store_owner");
      setShowTermsModal(true);
      return;
    }

    // Record terms acceptance for store owner
    try {
      localStorage.setItem("tw_terms_accepted_store", JSON.stringify({
        acceptedAt: new Date().toISOString(),
        phone,
        storeName: name
      }));
    } catch {}

    if (stores.find(s => cleanPhone(s.ownerPhone || "") === phone)) {
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
      contactPhone: phone,
      ownerPin: pin,
      isApproved: false,
      status: "closed",
      description: newStoreDesc || "متجر محلي مسجل بانتظار اعتماد الإدارة",
      workingHours: "10:00 ص - 11:00 م",
      priority: 1,
      maxRegularProducts: 20,
      maxOfferProducts: 10
    };

    onAddStore(newStore);

    // Save store credentials
    localStorage.setItem("tw_saved_store_phone", phone);
    localStorage.setItem("tw_saved_store_name", name);
    localStorage.setItem("tw_saved_store_id", newStore.id);
    localStorage.setItem("tw_saved_store_pin", pin);

    setSuccessMsg(`تم استلام طلب تسجيل المتجر "${name}" بنجاح! جاري تحويلك للوحة تحكم متجرك.`);
    setIsSuccess(true);
    setTimeout(() => {
      onRegister({
        name: newStore.name,
        phone: newStore.ownerPhone || phone,
        pin: newStore.ownerPin || pin,
        storeId: newStore.id
      }, "store_owner");
    }, 600);
  };

  // ==========================================
  // 4. STAFF & ADMIN SUBMIT HANDLER
  // ==========================================
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
      else staffMembers = initialStaff;
    } catch (err) {
      staffMembers = initialStaff;
    }

    const matchedStaff = staffMembers.find((s: any) => 
      s.pin === entered || s.password === entered || s.username === entered
    );

    if (
      entered === masterAdminPassword ||
      entered === "Admin@Tawseel2026#" ||
      legacyAdminPins.includes(entered) ||
      (matchedStaff && matchedStaff.role === "manager")
    ) {
      let adminName = "المدير العام (أبو أحمد)";
      let staffId = "staff_1";
      if (matchedStaff) {
        adminName = matchedStaff.name;
        staffId = matchedStaff.id;
      }

      localStorage.setItem("tw_active_staff_id", staffId);
      localStorage.setItem("tw_staff_role", "manager");

      setSuccessMsg(`🔐 أهلاً بك يا ${adminName}. تم تأكيد الصلاحيات الإدارية الكاملة!`);
      setIsSuccess(true);
      setFailedAttempts(0);
      setTimeout(() => {
        onRegister({ 
          name: adminName, 
          phone: matchedStaff?.phone || "0991234567", 
          pin: matchedStaff?.pin || entered,
          staffId: staffId,
          role: "manager"
        }, "admin");
      }, 500);
    } else if (matchedStaff) {
      localStorage.setItem("tw_active_staff_id", matchedStaff.id);
      localStorage.setItem("tw_staff_role", matchedStaff.role);

      setSuccessMsg(`أهلاً بك يا ${matchedStaff.name}. جاري فتح صفحتك المخصصة حسب الصلاحيات...`);
      setIsSuccess(true);
      setFailedAttempts(0);
      setTimeout(() => {
        onRegister({ 
          name: matchedStaff.name, 
          phone: matchedStaff.phone || "0991234567", 
          pin: matchedStaff?.pin || entered,
          staffId: matchedStaff.id,
          role: matchedStaff.role,
          permissions: matchedStaff.permissions
        }, "admin");
      }, 500);
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
      alert("لتثبيت التطبيق على هاتفك كبرنامج رسمي:\n- اضغط على قائمة النقاط الثلاث (⋮) في متصفحك، ثم اختر «تثبيت التطبيق / Install App»");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex flex-col justify-between selection:bg-orange-500 selection:text-slate-950 font-sans" dir="rtl">
      {/* Header Bar */}
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
                بوابة تسجيل الدخول وتوثيق الحسابات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* App Update Notification */}
            {hasNewUpdate && (
              <button
                type="button"
                onClick={() => setShowUpdateModal(true)}
                className="py-2 px-2.5 sm:px-3 rounded-xl border border-amber-300 bg-linear-to-r from-amber-100/95 via-orange-100/90 to-amber-50 hover:from-amber-200 hover:to-orange-200 text-amber-950 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-black shadow-xs active:scale-95 animate-pulse"
                title="يوجد تحديث وميزات جديدة للتطبيق"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-spin-slow" />
                <span className="hidden sm:inline text-orange-950 font-black">تحديث جديد 🚀</span>
                <span className="sm:hidden text-[10px] text-orange-950 font-black">تحديث 🚀</span>
              </button>
            )}

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

      {/* Main Authentication Card */}
      <main className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto p-4 sm:p-6 my-4">
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-2xl space-y-5 relative overflow-hidden text-right">
          {/* Card Top Branding */}
          <div
            onClick={handleSecretTitleClick}
            className="text-center space-y-1.5 cursor-pointer select-none"
            title="تطبيق توصيل القرية"
          >
            <div className="w-14 h-14 bg-gradient-to-tr from-orange-500 to-amber-400 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20 text-2xl">
              🛵
            </div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              تسجيل الدخول في تطبيق توصيل
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              الاسم ورقم الموبايل مثبتان تلقائياً - الدخول المباشر بالرمز السري (PIN)
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/70 text-center">
            {/* Tab 1: Customer */}
            <button
              type="button"
              onClick={() => { setRole("customer"); setErrorMsg(""); }}
              className={`py-2 px-1 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                role === "customer"
                  ? "bg-white text-orange-600 shadow-md shadow-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>زبون 🛍️</span>
            </button>

            {/* Tab 2: Store Owner */}
            <button
              type="button"
              onClick={() => { setRole("store"); setErrorMsg(""); }}
              className={`py-2 px-1 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                role === "store"
                  ? "bg-white text-orange-600 shadow-md shadow-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <StoreIcon className="w-3.5 h-3.5" />
              <span>صاحب محل 🏪</span>
            </button>

            {/* Tab 3: Driver / Captain */}
            <button
              type="button"
              onClick={() => { setRole("driver"); setErrorMsg(""); }}
              className={`py-2 px-1 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1 cursor-pointer ${
                role === "driver"
                  ? "bg-white text-orange-600 shadow-md shadow-slate-200/50"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>كابتن توصيل 🛵</span>
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
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-xs font-bold text-center animate-shake">
              {errorMsg}
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-xs font-black text-center animate-pulse">
              {successMsg}
            </div>
          )}

          {/* Role Forms */}
          <AnimatePresence mode="wait">
            {/* ========================================== */}
            {/* TAB 1: CUSTOMER FORM                       */}
            {/* ========================================== */}
            {role === "customer" && (
              <motion.div
                key="auth_customer_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-4"
              >
                {isReturningCustomer && savedCustomerName && savedCustomerPhone ? (
                  /* Fast PIN-only Login for Returning Customer */
                  <form onSubmit={handleCustomerSubmit} className="space-y-4">
                    {/* Fixed Verified User Badge */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50/60 border border-orange-200/80 rounded-2xl p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-xs">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider block">
                              الحساب المحفوظ 👤
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              {customerName}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>مثبت</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-orange-200/60 text-slate-600 font-bold">
                        <span>📱 رقم الموبايل:</span>
                        <span className="font-mono text-slate-900 font-black text-left" dir="ltr">
                          {customerPhone}
                        </span>
                      </div>
                    </div>

                    {/* Direct PIN Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                        <span>أدخل رمز الحماية السري (PIN - 4 أرقام):</span>
                        <span className="text-[10px] text-orange-600 font-bold">للدخول المباشر 🔒</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showCustomerPin ? "text" : "password"}
                          maxLength={4}
                          required
                          autoFocus
                          value={customerPin}
                          onChange={(e) => setCustomerPin(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="••••"
                          className="w-full bg-white border-2 border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 rounded-2xl py-3 px-10 text-center text-xl font-black tracking-widest outline-none text-slate-900 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCustomerPin(!showCustomerPin)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
                        >
                          {showCustomerPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>دخول لحسابي والمتابعة 🛍️</span>
                    </button>

                    {/* Switch Account Link */}
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsReturningCustomer(false);
                          setCustomerPin("");
                          setErrorMsg("");
                        }}
                        className="text-xs text-slate-500 hover:text-orange-600 font-bold transition-colors cursor-pointer inline-flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تبديل الحساب أو إدخال اسم ورقم آخر</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Full Registration / New Customer Form */
                  <form onSubmit={handleCustomerSubmit} className="space-y-3.5">
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
                        رمز حماية سري خاص بك (4 أرقام - PIN):
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
                      <p className="text-[10px] text-slate-400 font-bold pr-1">
                        * سيتم حفظ اسمك ورقمك وتثبيتهما لتسجيل الدخول السريع لاحقاً بهذا الرمز فقط.
                      </p>
                    </div>

                    {/* Legal Agreement Checkbox for Customer */}
                    <div className="bg-slate-50 border border-slate-200/90 p-3 rounded-2xl space-y-1 text-right">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={customerAgreeTerms}
                          onChange={(e) => setCustomerAgreeTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer shrink-0"
                        />
                        <span className="text-[11px] font-bold text-slate-700 leading-tight">
                          أوافق على{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setTermsModalRole("customer");
                              setShowTermsModal(true);
                            }}
                            className="text-orange-600 font-black underline hover:text-orange-700 cursor-pointer"
                          >
                            شروط الاستخدام وإخلاء المسؤولية القانونية للزبائن ⚖️
                          </button>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-98 transition-all cursor-pointer text-center"
                    >
                      تأكيد وتثبيت الحساب والدخول 🛍️
                    </button>

                    {savedCustomerName && savedCustomerPhone && (
                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsReturningCustomer(true);
                            setCustomerName(savedCustomerName);
                            setCustomerPhone(savedCustomerPhone);
                            setErrorMsg("");
                          }}
                          className="text-xs text-orange-600 font-bold hover:underline cursor-pointer"
                        >
                          العودة للحساب المحفوظ ({savedCustomerName}) ↩️
                        </button>
                      </div>
                    )}
                  </form>
                )}
              </motion.div>
            )}

            {/* ========================================== */}
            {/* TAB 2: STORE OWNER FORM                    */}
            {/* ========================================== */}
            {role === "store" && (
              <motion.div
                key="auth_store_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-4"
              >
                {isReturningStore && savedStorePhone ? (
                  /* Fast PIN-only Login for Returning Store Owner */
                  <form onSubmit={handleStoreLogin} className="space-y-4">
                    {/* Fixed Verified Store Badge */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50/60 border border-orange-200/80 rounded-2xl p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs">
                            <StoreIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider block">
                              متجرك المحفوظ 🏪
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              {savedStoreName || "لوحة تحكم المتجر"}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>مثبت</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-orange-200/60 text-slate-600 font-bold">
                        <span>📱 رقم موبايل المالك:</span>
                        <span className="font-mono text-slate-900 font-black text-left" dir="ltr">
                          {storeLoginPhone}
                        </span>
                      </div>
                    </div>

                    {/* Direct PIN Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                        <span>الرمز السري لمتجرك (PIN - 4 أرقام):</span>
                        <span className="text-[10px] text-orange-600 font-bold">دخول مباشر 🔒</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showStorePin ? "text" : "password"}
                          maxLength={4}
                          required
                          autoFocus
                          value={storeLoginPin}
                          onChange={(e) => setStoreLoginPin(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="••••"
                          className="w-full bg-white border-2 border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 rounded-2xl py-3 px-10 text-center text-xl font-black tracking-widest outline-none text-slate-900 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowStorePin(!showStorePin)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
                        >
                          {showStorePin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      <StoreIcon className="w-4 h-4" />
                      <span>دخول لوحة تحكم المتجر 🏪</span>
                    </button>

                    {/* Switch Account or Register New Store */}
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsReturningStore(false);
                          setStoreLoginPin("");
                          setErrorMsg("");
                        }}
                        className="text-xs text-slate-500 hover:text-orange-600 font-bold transition-colors cursor-pointer inline-flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>الدخول بمتجر آخر أو طلب انضمام جديد</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Standard Store Tabs: Login / Register */
                  <div className="space-y-4">
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
                      <form onSubmit={handleStoreLogin} className="space-y-3.5">
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
                            الرمز السري لمتجرك (4 أرقام - PIN):
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
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-center"
                        >
                          دخول وتثبيت متجرك 🏪
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
                            placeholder="مثال: مأكولات الشام، جبس وديكور"
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
                            <option value="crafts">مهن وصيانة وديكور</option>
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

                        {/* Legal Agreement Checkbox for Store Owner */}
                        <div className="bg-slate-50 border border-slate-200/90 p-3 rounded-2xl space-y-1 text-right">
                          <label className="flex items-start gap-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={storeAgreeTerms}
                              onChange={(e) => setStoreAgreeTerms(e.target.checked)}
                              className="mt-0.5 w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer shrink-0"
                            />
                            <span className="text-[11px] font-bold text-slate-700 leading-tight">
                              أوافق وألتزم بـ{" "}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setTermsModalRole("store_owner");
                                  setShowTermsModal(true);
                                }}
                                className="text-orange-600 font-black underline hover:text-orange-700 cursor-pointer"
                              >
                                وثيقة شروط ومسؤوليات أصحاب المتاجر والمطاعم 🏪
                              </button>
                            </span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer text-center"
                        >
                          تسجيل المتجر والبدء بإعداده 🚀
                        </button>
                      </form>
                    )}

                    {savedStorePhone && (
                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsReturningStore(true);
                            setStoreLoginPhone(savedStorePhone);
                            setErrorMsg("");
                          }}
                          className="text-xs text-orange-600 font-bold hover:underline cursor-pointer"
                        >
                          العودة للمتجر المحفوظ ({savedStoreName || savedStorePhone}) ↩️
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Direct WhatsApp help for stores */}
                <div className="text-center pt-2 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] text-slate-500 font-bold">تحتاج مساعدة في تسجيل أو تفعيل متجرك؟</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp({
                          phone: "963951854257",
                          message: "مرحباً إدارة المنصة، أحتاج مساعدة بخصوص تسجيل أو تفعيل حساب متجري 🏪",
                          type: "regular"
                        })
                      }
                      className="py-2 px-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>واتساب العادي 💬</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp({
                          phone: "963951854257",
                          message: "مرحباً إدارة المنصة، أحتاج مساعدة بخصوص تسجيل أو تفعيل حساب متجري 🏪",
                          type: "business"
                        })
                      }
                      className="py-2 px-2 bg-[#075E54]/10 hover:bg-[#075E54]/20 text-[#075E54] border border-[#075E54]/30 rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#075E54]" />
                      <span>واتساب الأعمال 💼</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* TAB 3: DRIVER / CAPTAIN FORM               */}
            {/* ========================================== */}
            {role === "driver" && (
              <motion.div
                key="auth_driver_form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="space-y-4"
              >
                {isReturningDriver && savedDriverUser ? (
                  /* Fast PIN-only Login for Returning Captain */
                  <form onSubmit={handleDriverSubmit} className="space-y-4">
                    {/* Fixed Verified Driver Badge */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50/60 border border-orange-200/80 rounded-2xl p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-900 text-orange-400 flex items-center justify-center shadow-xs">
                            <Bike className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider block">
                              كابتن التوصيل المعتمد 🛵
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              {savedDriverName || "كابتن التوصيل"}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>مثبت</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-2 border-t border-orange-200/60 text-slate-600 font-bold">
                        <span>📱 المعرف / الموبايل:</span>
                        <span className="font-mono text-slate-900 font-black text-left" dir="ltr">
                          {driverUser}
                        </span>
                      </div>
                    </div>

                    {/* Direct PIN Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 flex items-center justify-between">
                        <span>رمز المرور السري (PIN):</span>
                        <span className="text-[10px] text-orange-600 font-bold">دخول مباشر 🔒</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showDriverPin ? "text" : "password"}
                          required
                          autoFocus
                          value={driverPin}
                          onChange={(e) => setDriverPin(e.target.value)}
                          placeholder="••••"
                          className="w-full bg-white border-2 border-orange-500 focus:border-orange-600 focus:ring-2 focus:ring-orange-200 rounded-2xl py-3 px-10 text-center text-xl font-black tracking-widest outline-none text-slate-900 shadow-sm"
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
                      className="w-full bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      <Bike className="w-4 h-4" />
                      <span>دخول لوحة الكابتن واستلام الطلبات 🛵</span>
                    </button>

                    {/* Switch Captain Account */}
                    <div className="text-center pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setIsReturningDriver(false);
                          setDriverPin("");
                          setErrorMsg("");
                        }}
                        className="text-xs text-slate-500 hover:text-orange-600 font-bold transition-colors cursor-pointer inline-flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-slate-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>الدخول بحساب كابتن آخر</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Standard Captain Login Form */
                  <form onSubmit={handleDriverSubmit} className="space-y-4">
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

                    {/* Legal Agreement Checkbox for Driver */}
                    <div className="bg-slate-50 border border-slate-200/90 p-3 rounded-2xl space-y-1 text-right">
                      <label className="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={driverAgreeTerms}
                          onChange={(e) => setDriverAgreeTerms(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer shrink-0"
                        />
                        <span className="text-[11px] font-bold text-slate-700 leading-tight">
                          أوافق وألتزم بـ{" "}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setTermsModalRole("driver");
                              setShowTermsModal(true);
                            }}
                            className="text-orange-600 font-black underline hover:text-orange-700 cursor-pointer"
                          >
                            وثيقة شروط وقواعد كباتن التوصيل والعمل الحر 🛵
                          </button>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-98 transition-all cursor-pointer text-center flex items-center justify-center gap-2"
                    >
                      <Bike className="w-4 h-4" />
                      <span>دخول وتثبيت حساب الكابتن 🛵</span>
                    </button>

                    {savedDriverUser && (
                      <div className="text-center pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsReturningDriver(true);
                            setDriverUser(savedDriverUser);
                            setErrorMsg("");
                          }}
                          className="text-xs text-orange-600 font-bold hover:underline cursor-pointer"
                        >
                          العودة لحساب الكابتن المحفوظ ({savedDriverName || savedDriverUser}) ↩️
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {/* Direct WhatsApp request for new drivers */}
                <div className="text-center pt-2 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] text-slate-500 font-bold">كابتن جديد وترغب بالانضمام للأسطول؟</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp({
                          phone: "963951854257",
                          message: "مرحباً، أرغب بالانضمام ككابتن توصيل في المنصة 🛵",
                          type: "regular"
                        })
                      }
                      className="py-2 px-2 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>واتساب العادي 💬</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openWhatsApp({
                          phone: "963951854257",
                          message: "مرحباً، أرغب بالانضمام ككابتن توصيل في المنصة 🛵",
                          type: "business"
                        })
                      }
                      className="py-2 px-2 bg-[#075E54] hover:bg-[#054a43] text-white rounded-xl text-[11px] font-black transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>واتساب الأعمال 💼</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* TAB 4: STAFF & ADMIN FORM                  */}
            {/* ========================================== */}
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

          {/* Security Footer Badge */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>اتصال مشفر ومحمي - تثبيت الهوية بالرمز السري فقط</span>
          </div>
        </div>
      </main>

      {/* App Update Modal in Auth */}
      {showUpdateModal && (
        <AppUpdateModal
          update={currentAppUpdate}
          onClose={() => setShowUpdateModal(false)}
          onApplyUpdate={handleApplyUpdateInAuth}
        />
      )}

      {/* Role-Specific Legal Terms Modal */}
      {showTermsModal && (
        <TermsAgreementModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          role={termsModalRole}
          showAcceptButton={true}
          onAccept={() => {
            if (termsModalRole === "customer") setCustomerAgreeTerms(true);
            if (termsModalRole === "store_owner") setStoreAgreeTerms(true);
            if (termsModalRole === "driver") setDriverAgreeTerms(true);
            setShowTermsModal(false);
          }}
        />
      )}
    </div>
  );
};
