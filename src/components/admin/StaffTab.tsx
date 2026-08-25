import React, { useState } from "react";
import { 
  Users, 
  Plus, 
  KeyRound, 
  Trash2, 
  ShieldCheck, 
  Phone, 
  Power, 
  CheckCircle2, 
  Lock 
} from "lucide-react";
import { StaffMember } from "../../types";

interface StaffTabProps {
  staffList: StaffMember[];
  onAddStaff: (staff: StaffMember) => void;
  onUpdateStaff: (staff: StaffMember) => void;
  onDeleteStaff: (staffId: string) => void;
}

export const StaffTab: React.FC<StaffTabProps> = ({
  staffList,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff
}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"manager" | "orders_clerk" | "accountant" | "support">("orders_clerk");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");

  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !pin.trim()) return;

    onAddStaff({
      id: "staff_" + Date.now(),
      name: name.trim(),
      role,
      pin: pin.trim(),
      phone: phone.trim(),
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0]
    });

    setName("");
    setPin("");
    setPhone("");
    setShowModal(false);
  };

  const getRoleLabel = (r: string) => {
    switch (r) {
      case "manager": return { label: "المدير العام (صلاحيات كاملة)", color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "orders_clerk": return { label: "مسؤول الطلبات والتوجيه", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "accountant": return { label: "المحاسب المالي", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "support": return { label: "موظف الدعم والاتصال", color: "bg-amber-50 text-amber-700 border-amber-200" };
      default: return { label: "موظف", color: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-orange-500" />
            <span>إدارة طاقم العمل، الصلاحيات والـ PIN</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">تحكم بكلمات المرور المشفرة لكل موظف وتحديد مهام وصلاحيات الوصول</p>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة موظف / مسؤول جديد 👤</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staffList.map((member) => {
          const roleInfo = getRoleLabel(member.role);
          const isActive = member.isActive !== false;

          return (
            <div 
              key={member.id} 
              className={`bg-white rounded-3xl border transition-all p-4 shadow-xs flex flex-col justify-between space-y-3 ${
                isActive ? "border-slate-200 hover:border-orange-300" : "border-slate-200 bg-slate-50/70 opacity-70"
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{member.name}</h4>
                      <span className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-md border mt-1 ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                  }`}>
                    {isActive ? "نشط" : "معطل"}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border">
                    <span className="text-slate-500 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-orange-500" />
                      <span>رمز الـ PIN للدخول:</span>
                    </span>
                    <span className="font-black text-sm tracking-widest text-slate-800 bg-white px-2 py-0.5 rounded-md border font-mono">
                      {member.pin}
                    </span>
                  </div>

                  {member.phone && (
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>رقم الهاتف:</span>
                      <a href={`tel:${member.phone}`} className="font-bold text-blue-600 hover:underline">
                        {member.phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateStaff({
                      ...member,
                      isActive: !isActive
                    });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    isActive ? "bg-slate-100 text-slate-600 hover:bg-slate-200" : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {isActive ? "تعطيل الحساب" : "تفعيل الحساب"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`هل أنت متأكد من حذف الموظف "${member.name}"؟`)) {
                      onDeleteStaff(member.id);
                    }
                  }}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="حذف الموظف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 text-right" dir="rtl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-orange-500" />
                <span>إضافة موظف / مسؤول جديد</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-lg font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveStaff} className="space-y-3 text-xs text-slate-700">
              <div>
                <label className="block font-bold mb-1">الاسم الكامل: *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: يوسف المحمود"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">الدور والصلاحية: *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                >
                  <option value="manager">المدير العام (صلاحيات كاملة وتحكم مركزي)</option>
                  <option value="orders_clerk">مسؤول الطلبات والتنسيق مع الكباتن</option>
                  <option value="accountant">المحاسب المالي ومتابعة الإيرادات</option>
                  <option value="support">موظف الدعم الفني واستقبال الاتصالات</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">رمز الـ PIN للدخول (4-6 أرقام): *</label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="مثال: 4321"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl font-mono text-center tracking-widest text-base font-black focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">رقم الهاتف (اختياري):</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0991234567"
                  className="w-full py-2 px-3 bg-slate-50 border rounded-xl focus:outline-hidden focus:border-orange-500"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  حفظ وإضافة الموظف ✓
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
