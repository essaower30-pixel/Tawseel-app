import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Phone, 
  Lock, 
  Key, 
  ShieldCheck, 
  Store as StoreIcon, 
  Bike, 
  CheckCircle2, 
  X, 
  Save, 
  LogOut, 
  Eye, 
  EyeOff, 
  Sparkles,
  MapPin,
  Clock,
  Shield,
  Smartphone,
  RefreshCw,
  Check,
  Scale,
  FileText
} from "lucide-react";
import { UserProfile, Store, DriverMember, StaffMember, AppSettings } from "../types";
import { TermsAgreementModal } from "./TermsAgreementModal";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: "customer" | "store_owner" | "driver" | "admin" | "guest";
  userProfile: UserProfile | null;
  onUpdateProfile: (updatedProfile: UserProfile, extraData?: any) => Promise<boolean | void> | boolean | void;
  onLogout: () => void;
  currentStore?: Store | null;
  currentDriver?: DriverMember | null;
  currentStaff?: StaffMember | null;
  appSettings?: AppSettings | null;
}

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({
  isOpen,
  onClose,
  userRole,
  userProfile,
  onUpdateProfile,
  onLogout,
  currentStore,
  currentDriver,
  currentStaff,
  appSettings
}) => {
  const [name, setName] = useState(userProfile?.name || "");
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [pin, setPin] = useState(userProfile?.pin || "");
  const [showPin, setShowPin] = useState(false);

  // Specific extra role states
  const [storeName, setStoreName] = useState(currentStore?.name || "");
  const [storeHours, setStoreHours] = useState(currentStore?.workingHours || "9:00 ص - 11:00 م");
  const [driverVehicle, setDriverVehicle] = useState(currentDriver?.vehicle || "دراجة نارية");
  const [customerAddress, setCustomerAddress] = useState(
    () => localStorage.getItem("tw_saved_customer_address") || "وسط البلد - بجانب المسجد الكبير"
  );

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync state whenever modal opens or profile changes
  useEffect(() => {
    if (isOpen) {
      if (userRole === "admin" && currentStaff) {
        setName(currentStaff.name || userProfile?.name || "");
        setPhone(currentStaff.phone || userProfile?.phone || "");
        setPin(currentStaff.pin || userProfile?.pin || "1234");
      } else if (userRole === "store_owner" && currentStore) {
        setName(currentStore.ownerName || userProfile?.name || "");
        setPhone(currentStore.ownerPhone || currentStore.contactPhone || userProfile?.phone || "");
        setPin(currentStore.ownerPin || userProfile?.pin || "1234");
      } else if (userRole === "driver" && currentDriver) {
        setName(currentDriver.name || userProfile?.name || "");
        setPhone(currentDriver.phone || userProfile?.phone || "");
        setPin(currentDriver.pin || userProfile?.pin || "1234");
      } else {
        setName(userProfile?.name || "");
        setPhone(userProfile?.phone || "");
        setPin(userProfile?.pin || "1234");
      }

      if (currentStore) {
        setStoreName(currentStore.name || "");
        setStoreHours(currentStore.workingHours || "9:00 ص - 11:00 م");
      }
      if (currentDriver) {
        setDriverVehicle(currentDriver.vehicle || "دراجة نارية");
      }
      setSaveSuccess(false);
      setErrorMessage("");
    }
  }, [isOpen, userProfile, userRole, currentStore, currentDriver, currentStaff]);

  if (!isOpen) return null;

  const handleGeneratePin = () => {
    const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(randomPin);
    setShowPin(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("الرجاء إدخال الاسم الكريم.");
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage("الرجاء إدخال رقم هاتف صحيح (8 أرقام على الأقل).");
      return;
    }
    if (!pin.trim()) {
      setErrorMessage("الرجاء إدخال رمز المرور أو الـ PIN.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const updatedProfile: UserProfile = {
        ...(userProfile || { name: "", phone: "", pin: "" }),
        name: name.trim(),
        phone: phone.trim(),
        pin: pin.trim(),
        role: userRole
      };

      const extraData: any = {
        storeName: storeName.trim(),
        storeHours: storeHours.trim(),
        driverVehicle: driverVehicle.trim(),
        customerAddress: customerAddress.trim()
      };

      if (userRole === "customer") {
        localStorage.setItem("tw_saved_customer_address", customerAddress.trim());
      }

      await onUpdateProfile(updatedProfile, extraData);

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1400);
    } catch (err: any) {
      console.error("Save profile error:", err);
      setErrorMessage("حدث خطأ أثناء حفظ التعديلات. الرجاء المحاولة مجدداً.");
    } finally {
      setIsSaving(false);
    }
  };

  // Role Badge Display Helper
  const getRoleDetails = () => {
    switch (userRole) {
      case "admin": {
        if (currentStaff) {
          if (currentStaff.role === "accountant") {
            return {
              title: `حساب المحاسب المالي (${currentStaff.name})`,
              badge: "محاسب مالي 📊",
              bg: "from-blue-950 to-slate-900",
              accentColor: "border-blue-500/30 text-blue-600 bg-blue-50",
              icon: <ShieldCheck className="w-6 h-6 text-blue-400" />
            };
          }
          if (currentStaff.role === "orders_clerk") {
            return {
              title: `حساب مسؤول الطلبات (${currentStaff.name})`,
              badge: "معالجة الطلبات 📦",
              bg: "from-purple-950 to-slate-900",
              accentColor: "border-purple-500/30 text-purple-600 bg-purple-50",
              icon: <ShieldCheck className="w-6 h-6 text-purple-400" />
            };
          }
          if (currentStaff.role === "support") {
            return {
              title: `حساب خدمة العملاء (${currentStaff.name})`,
              badge: "دعم فني 🎧",
              bg: "from-cyan-950 to-slate-900",
              accentColor: "border-cyan-500/30 text-cyan-600 bg-cyan-50",
              icon: <ShieldCheck className="w-6 h-6 text-cyan-400" />
            };
          }
        }
        return {
          title: "حساب الإدارة والمدير العام",
          badge: "مدير النظام 🛡️",
          bg: "from-slate-900 to-slate-800",
          accentColor: "border-purple-500/30 text-purple-600 bg-purple-50",
          icon: <ShieldCheck className="w-6 h-6 text-purple-400" />
        };
      }
      case "store_owner":
        return {
          title: "حساب صاحب المتجر / المطعم",
          badge: `تاجر معتمد 🏪 (${currentStore?.name || "متجر القرية"})`,
          bg: "from-orange-950 to-slate-900",
          accentColor: "border-orange-500/30 text-orange-600 bg-orange-50",
          icon: <StoreIcon className="w-6 h-6 text-orange-400" />
        };
      case "driver":
        return {
          title: "حساب كابتن التوصيل",
          badge: "كابتن أسطول التوصيل 🛵",
          bg: "from-emerald-950 to-slate-900",
          accentColor: "border-emerald-500/30 text-emerald-600 bg-emerald-50",
          icon: <Bike className="w-6 h-6 text-emerald-400" />
        };
      case "customer":
      default:
        return {
          title: "حساب الزبون / المشتري",
          badge: "زبون مميز 🛍️",
          bg: "from-orange-900 to-slate-900",
          accentColor: "border-orange-500/30 text-orange-600 bg-orange-50",
          icon: <User className="w-6 h-6 text-orange-400" />
        };
    }
  };

  const roleInfo = getRoleDetails();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.2 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header with Dark Premium Gradient */}
        <div className={`bg-gradient-to-r ${roleInfo.bg} p-5 text-white flex items-center justify-between shrink-0 relative overflow-hidden`}>
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              {roleInfo.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-white">
                  إعدادات حسابي وملفي الشخصي
                </h3>
                <span className="text-[10px] font-black bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                  {roleInfo.badge}
                </span>
              </div>
              <p className="text-white/70 text-xs mt-0.5 font-medium">
                تحديث الاسم، رقم الهاتف، والرمز السري الخاص بك ومزامنتها فوراً
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-black cursor-pointer transition-all shrink-0 z-10"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-2 text-emerald-800 text-xs font-black shadow-xs"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>تم حفظ وتحديث بيانات حسابك ومزامنتها بنجاح مع النظام! ✅</span>
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold"
            >
              {errorMessage}
            </motion.div>
          )}

          {/* User Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-orange-500" />
              <span>الاسم الكامل / اسم الحساب:</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد العلي أو مطعم البركة"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-900 focus:bg-white focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* User Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span>رقم الهاتف المعتمد (المستخدم لتسجيل الدخول والواتساب):</span>
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                dir="ltr"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09XXXXXXXX"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono font-black text-left text-slate-900 focus:bg-white focus:outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold pointer-events-none">
                📱
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              * يُستخدم هذا الرقم لتسجيل الدخول السريع وتلقي تنبيهات وإشعارات الطلبات.
            </p>
          </div>

          {/* PIN / Password with Show/Hide & Generator */}
          <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-orange-500" />
                <span>الرمز السري / كلمة المرور (PIN):</span>
                <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleGeneratePin}
                className="text-[10px] text-orange-600 hover:text-orange-700 font-bold bg-orange-100/70 hover:bg-orange-100 px-2 py-0.5 rounded-md flex items-center gap-1 cursor-pointer transition-all"
              >
                <Sparkles className="w-3 h-3 text-orange-500" />
                <span>توليد رمز جديد</span>
              </button>
            </div>

            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="رمز المرور (PIN)"
                className="w-full p-3 pl-10 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-mono font-black text-left tracking-wider text-slate-900 focus:outline-hidden focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500 font-semibold">
              🔒 احفظ هذا الرمز جيداً حيث ستحتاجه في المرات القادمة لتأكيد الدخول إلى حسابك.
            </p>
          </div>

          {/* Role-Specific Fields */}
          {userRole === "store_owner" && (
            <div className="p-3.5 bg-orange-50/50 border border-orange-200/60 rounded-2xl space-y-3">
              <h4 className="text-xs font-black text-orange-950 flex items-center gap-1.5">
                <StoreIcon className="w-3.5 h-3.5 text-orange-600" />
                <span>بيانات المتجر التابع للحساب</span>
              </h4>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">اسم المتجر / المحل التجاري:</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="اسم المحل أو المطعم"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-orange-500" />
                  <span>ساعات الدوام اليومي:</span>
                </label>
                <input
                  type="text"
                  value={storeHours}
                  onChange={(e) => setStoreHours(e.target.value)}
                  placeholder="مثال: 9:00 ص - 11:30 م"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                />
              </div>
            </div>
          )}

          {userRole === "driver" && (
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-200/60 rounded-2xl space-y-3">
              <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-emerald-600" />
                <span>بيانات مركبة كابتن التوصيل</span>
              </h4>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">نوع المركبة:</label>
                <select
                  value={driverVehicle}
                  onChange={(e) => setDriverVehicle(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="دراجة نارية">دراجة نارية (موتور) 🛵</option>
                  <option value="سيارة">سيارة توصيل 🚗</option>
                  <option value="بسكليت">دراجة هوائية 🚲</option>
                  <option value="شاحنة صغيرة">شاحنة نقل وبضائع 🚚</option>
                </select>
              </div>
            </div>
          )}

          {userRole === "customer" && (
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>العنوان والمعلم الأقرب لبيتك (لتسهيل استلام الطلبات):</span>
              </label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="مثال: بجانب المدرسة الثانوية - شارع السوق"
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              />
            </div>
          )}

          {/* Legal Terms & Agreements Button according to role */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <div>
                <span className="text-xs font-black text-slate-800 block">
                  وثيقة الشروط والمسؤوليات القانونية ⚖️
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  {userRole === "store_owner"
                    ? "شروط التاجر وإخلاء مسؤولية المنصة"
                    : userRole === "driver"
                    ? "قواعد الكابتن والعمل الحر والسلامة"
                    : "اتفاقية الاستخدام وإخلاء المسؤولية للزبائن"}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-black transition-all cursor-pointer shadow-xs"
            >
              عرض البنود 📄
            </button>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:flex-1 py-3 px-4 bg-orange-600 hover:bg-orange-700 active:scale-98 text-white rounded-2xl text-xs sm:text-sm font-black shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جارٍ الحفظ والمزامنة...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات ومزامنة الحساب 💾</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                if (confirm("هل ترغب بتسجيل الخروج من الحساب الحالي؟")) {
                  onClose();
                  onLogout();
                }
              }}
              className="w-full sm:w-auto py-3 px-4 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 shrink-0"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </form>

        {/* Footer info banner */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-bold shrink-0">
          💡 يتم حفظ التعديلات سحابياً ومحلياً على الفور لتنعكس على جميع الطلبات ولوحات التحكم.
        </div>
      </motion.div>

      {/* Terms Agreement Viewer Modal */}
      {showTermsModal && (
        <TermsAgreementModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          role={userRole}
          showAcceptButton={false}
        />
      )}
    </div>
  );
};
