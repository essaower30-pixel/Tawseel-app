import React, { useState } from "react";
import { 
  Bike, 
  Plus, 
  Phone, 
  MessageCircle, 
  Star, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Power,
  DollarSign
} from "lucide-react";
import { DriverMember } from "../../types";
import { ContactActions } from "../ContactActions";

interface DriversTabProps {
  driversList: DriverMember[];
  onAddDriver: (driver: DriverMember) => void;
  onUpdateDriver: (driver: DriverMember) => void;
  onDeleteDriver: (driverId: string) => void;
  currency: string;
}

export const DriversTab: React.FC<DriversTabProps> = ({
  driversList,
  onAddDriver,
  onUpdateDriver,
  onDeleteDriver,
  currency
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("دراجة نارية سوزوكي");
  const [pin, setPin] = useState("1111");

  const handleSaveDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    onAddDriver({
      id: "driver_" + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      vehicle: vehicle.trim(),
      pin: pin.trim() || "1111",
      status: "available",
      totalDeliveries: 0,
      earnings: 0,
      rating: 5.0
    });

    setName("");
    setPhone("");
    setVehicle("دراجة نارية سوزوكي");
    setShowModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return { label: "متاح للطلب الآن 🟢", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "busy":
        return { label: "مشغول في توصيل 🟡", bg: "bg-amber-50 text-amber-700 border-amber-200" };
      default:
        return { label: "غير متصل 🔴", bg: "bg-slate-100 text-slate-600 border-slate-200" };
    }
  };

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Bike className="w-5 h-5 text-orange-500" />
            <span>إدارة أسطول الكباتن والمناديب 🛵</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">متابعة جاهزية الكباتن، أرباح التوصيل، وتقييمات الأداء الفوري</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة كابتن جديد 🛵</span>
        </button>
      </div>

      {/* Drivers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {driversList.map((driver) => {
          const statusInfo = getStatusBadge(driver.status);

          return (
            <div 
              key={driver.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-orange-300 transition-all p-4 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-base">
                      🛵
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{driver.name}</h4>
                      <p className="text-[11px] text-slate-400">{driver.vehicle || "دراجة نارية"}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${statusInfo.bg}`}>
                    {statusInfo.label}
                  </span>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl border">
                    <span className="text-[10px] text-slate-400 font-bold block">التوصيلات</span>
                    <span className="font-black text-xs text-slate-800">{driver.totalDeliveries || 0} طلب</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border">
                    <span className="text-[10px] text-slate-400 font-bold block">الأرباح</span>
                    <span className="font-black text-xs text-orange-600">{(driver.earnings || 0).toLocaleString()} {currency}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border">
                    <span className="text-[10px] text-slate-400 font-bold block">التقييم</span>
                    <span className="font-black text-xs text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {driver.rating || 5.0}
                    </span>
                  </div>
                </div>

                {/* Phone & Dual WhatsApp Contacts */}
                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <span className="text-slate-400 font-bold text-[11px]">تواصل مع الكابتن:</span>
                  <ContactActions
                    phone={driver.phone}
                    name={driver.name}
                    defaultMessage={`مرحباً كابتن (${driver.name})، من إدارة منصة توصيل.`}
                    variant="compact"
                  />
                </div>
              </div>

              {/* Status Switcher & Delete */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateDriver({ ...driver, status: "available" })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-black ${
                      driver.status === "available" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    متاح
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateDriver({ ...driver, status: "busy" })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-black ${
                      driver.status === "busy" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    مشغول
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateDriver({ ...driver, status: "offline" })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-black ${
                      driver.status === "offline" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    غير متصل
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`هل أنت متأكد من حذف الكابتن "${driver.name}"؟`)) {
                      onDeleteDriver(driver.id);
                    }
                  }}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="حذف الكابتن"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Driver Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-right" dir="rtl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Bike className="w-5 h-5 text-orange-500" />
                <span>إضافة كابتن توصيل جديد</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDriver} className="space-y-3 text-xs text-slate-700">
              <div>
                <label className="block font-bold mb-1">اسم الكابتن: *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: الكابتن علاء الدين"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رقم الموبايل: *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0991112233"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">نوع المركبة / وسيلة النقل:</label>
                <input
                  type="text"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  placeholder="دراجة نارية سوزوكي / سيارة سوزوكي"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رمز الـ PIN المخصص للكابتن:</label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="1111"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl font-mono text-center tracking-widest text-base font-black focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  إضافة الكابتن للأسطول 🛵
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
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
