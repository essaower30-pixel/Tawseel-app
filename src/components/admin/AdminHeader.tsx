import React, { useState } from "react";
import { 
  BarChart3, 
  Store as StoreIcon, 
  Utensils, 
  Users, 
  Bike, 
  MapPin, 
  Tag, 
  Wrench, 
  KeyRound, 
  FileText, 
  Settings, 
  Clock, 
  Share2, 
  AlertTriangle, 
  CheckCircle2, 
  LogOut,
  ShieldCheck,
  Archive,
  Lock
} from "lucide-react";
import { StaffMember } from "../../types";

export type AdminTab = 
  | "stats" 
  | "archive_reports"
  | "vault"
  | "stores" 
  | "products" 
  | "orders" 
  | "staff" 
  | "drivers" 
  | "landmarks" 
  | "coupons" 
  | "craftsmen" 
  | "customers" 
  | "logs" 
  | "settings" 
  | "share";

interface AdminHeaderProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  isEmergencyRush: boolean;
  onToggleEmergencyRush: () => void;
  staffList: StaffMember[];
  currentStaff: StaffMember | null;
  onSelectStaff: (staff: StaffMember) => void;
  onLogout: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  setActiveTab,
  isEmergencyRush,
  onToggleEmergencyRush,
  staffList,
  currentStaff,
  onSelectStaff,
  onLogout
}) => {
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = staffList.find(s => s.pin === pinInput.trim() && s.isActive !== false);
    if (found) {
      onSelectStaff(found);
      setShowPinModal(false);
      setPinInput("");
      setPinError("");
    } else {
      setPinError("رمز الـ PIN غير صحيح أو الحساب معطل!");
    }
  };

  const navTabs = [
    { id: "share", label: "نشر وتوزيع التطبيق (الإدارة)", icon: Share2, emoji: "📢" },
    { id: "stats", label: "الإحصائيات والأرباح", icon: BarChart3, emoji: "📊" },
    { id: "archive_reports", label: "أرشيف الطلبات والتقارير المالية", icon: Archive, emoji: "📦" },
    { id: "vault", label: "أرشيف بيانات الدخول (سري للإدارة)", icon: Lock, emoji: "🔒" },
    { id: "customers", label: "سجل الزبائن والمهن", icon: Users, emoji: "👥" },
    { id: "orders", label: "الطلبات النشطة والجدولة", icon: Clock, emoji: "🕒" },
    { id: "stores", label: "إدارة المحلات والمتاجر", icon: StoreIcon, emoji: "🏪" },
    { id: "products", label: "إدارة الأصناف والخيارات", icon: Utensils, emoji: "🍽️" },
    { id: "coupons", label: "كوبونات الخصم والترويج", icon: Tag, emoji: "🏷️" },
    { id: "drivers", label: "إدارة الكباتن والمناديب", icon: Bike, emoji: "🛵" },
    { id: "landmarks", label: "إدارة المعالم الجغرافية", icon: MapPin, emoji: "📍" },
    { id: "craftsmen", label: "دليل الحرفيين وأصحاب المهن", icon: Wrench, emoji: "🛠️" },
    { id: "staff", label: "طاقم العمل والصلاحيات والـ PIN", icon: KeyRound, emoji: "🔑" },
    { id: "logs", label: "سجل عمليات الموظفين", icon: FileText, emoji: "📑" },
    { id: "settings", label: "الإعدادات والرسوم", icon: Settings, emoji: "⚙️" },
  ];

  return (
    <div className="space-y-4 font-sans text-right" dir="rtl">
      {/* Top Banner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/20">
            ت
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white">توصيل القرية الذكي • لوحة المدير</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-orange-500/20 text-orange-400 border border-orange-500/30">
                التحكم المركزي
              </span>
            </div>
            <p className="text-slate-400 text-xs mt-0.5">لوحة التحكم المركزية بالعمليات والصلاحيات والتقارير</p>
          </div>
        </div>

        {/* Identity & PIN login */}
        <div className="flex items-center flex-wrap gap-2.5">
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl px-3 py-1.5 flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold">هويتك الحالية:</span>
            <span className="font-black text-orange-400">
              🔑 {currentStaff?.name || "المدير العام (صلاحيات كاملة)"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowPinModal(true)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <KeyRound className="w-3.5 h-3.5 text-orange-400" />
            <span>دخول بالـ PIN</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer"
            title="تسجيل الخروج"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Emergency Rush Management Banner */}
      <div className={`p-4 rounded-3xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md ${
        isEmergencyRush 
          ? "bg-red-950/70 border-red-800 text-red-200" 
          : "bg-emerald-950/70 border-emerald-800 text-emerald-200"
      }`}>
        <div className="flex items-start sm:items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
            isEmergencyRush ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
          }`}>
            {isEmergencyRush ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-black flex items-center gap-2">
              <span>إدارة ضغط الطلبات وحظر الخدمات/المنتجات</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-black/30">
                {isEmergencyRush ? "وضع التجميد مفعّل 🚨" : "الاستقبال طبيعي ومتاح ✅"}
              </span>
            </h3>
            <p className="text-xs opacity-80 mt-0.5">
              {isEmergencyRush 
                ? "تنبيه: تم إيقاف استقبال الطلبات الجديدة مؤقتاً للسيطرة على ضغط العمل لدى المحلات والكباتن." 
                : "النظام يعمل بكفاءة وجاهز لاستقبال الطلبات الفورية من كافة أهالي القرية والمناطق المجاورة."}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleEmergencyRush}
          className={`px-4 py-2 rounded-2xl font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
            isEmergencyRush
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/40"
              : "bg-red-600 hover:bg-red-700 text-white shadow-red-900/40"
          }`}
        >
          {isEmergencyRush ? "✅ استئناف استقبال الطلبات الآن" : "🚨 إيقاف وتجميد عام للطلبات (وضع الضغط)"}
        </button>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-2 shadow-xs overflow-x-auto scrollbar-none flex items-center gap-1.5">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`whitespace-nowrap px-3.5 py-2.5 rounded-2xl font-black text-xs transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20 scale-[1.02]"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-100"
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* PIN Login Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-200 shadow-2xl space-y-4 animate-scale-up text-right" dir="rtl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-orange-500" />
                <span>دخول سريع للموظفين والمسؤولين</span>
              </h3>
              <button 
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">أدخل رمز الـ PIN المكون من 4 أرقام:</label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError("");
                  }}
                  placeholder="••••"
                  className="w-full text-center text-2xl tracking-widest font-black py-3 px-4 bg-slate-50 border border-slate-300 rounded-2xl focus:outline-hidden focus:border-orange-500 text-slate-800"
                  autoFocus
                />
                {pinError && <p className="text-red-500 text-xs font-bold mt-1.5">{pinError}</p>}
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border text-[11px] text-slate-500 space-y-1">
                <p className="font-bold text-slate-700">رموز الدخول الافتراضية للتجربة:</p>
                <p>• المدير العام: 1234</p>
                <p>• مسؤول الطلبات: 5555</p>
                <p>• المحاسب المالي: 7777</p>
                <p>• موظف الدعم: 9999</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-2xl transition-all shadow-md cursor-pointer"
                >
                  تأكيد الدخول 🔑
                </button>
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-xs rounded-2xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
