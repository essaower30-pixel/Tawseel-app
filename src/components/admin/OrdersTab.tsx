import React, { useState } from "react";
import { 
  Clock, 
  Search, 
  Phone, 
  MapPin, 
  Bike, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Package, 
  User, 
  Store as StoreIcon,
  ChevronDown
} from "lucide-react";
import { DriverMember, Order } from "../../types";
import { ContactActions } from "../ContactActions";

interface OrdersTabProps {
  orders: Order[];
  driversList: DriverMember[];
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  currency: string;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  driversList,
  onUpdateOrderStatus,
  currency
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [assignedDrivers, setAssignedDrivers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("tw_order_assigned_drivers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleAssignDriver = (orderId: string, driverName: string) => {
    const next = { ...assignedDrivers, [orderId]: driverName };
    setAssignedDrivers(next);
    localStorage.setItem("tw_order_assigned_drivers", JSON.stringify(next));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "بانتظار الموافقة 🟡", bg: "bg-amber-50 text-amber-700 border-amber-200" };
      case "accepted":
      case "preparing":
        return { label: "جاري التجهيز بالمحل 🍳", bg: "bg-blue-50 text-blue-700 border-blue-200" };
      case "picked_up":
        return { label: "مع الكابتن بالطريق 🛵", bg: "bg-purple-50 text-purple-700 border-purple-200" };
      case "delivered":
        return { label: "تم التسليم بنجاح 🟢", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "cancelled":
        return { label: "ملغي 🔴", bg: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { label: status, bg: "bg-slate-50 text-slate-700 border-slate-200" };
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          o.customerPhone.includes(searchQuery) ||
                          o.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span>الطلبات النشطة والجدولة والعمليات 🕒</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">متابعة مسار الطلبات الحية، تعيين الكباتن، وتحديث مراحل التجهيز والتسليم</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">إجمالي الطلبات:</span>
          <span className="px-3 py-1 bg-orange-50 text-orange-600 font-black text-xs rounded-xl border border-orange-200">
            {orders.length} طلب
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Filter Pills */}
        <div className="flex items-center flex-wrap gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
          {[
            { id: "all", label: "كافة الطلبات" },
            { id: "pending", label: "قيد الانتظار" },
            { id: "preparing", label: "جاري التجهيز" },
            { id: "picked_up", label: "قيد التوصيل" },
            { id: "delivered", label: "تم التسليم" },
            { id: "cancelled", label: "ملغية" }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? "bg-orange-500 text-white shadow-sm font-black"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              {tab.label} ({tab.id === "all" ? orders.length : orders.filter(o => o.status === tab.id).length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الطلب، الزبون..."
            className="w-full pr-9 pl-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-2">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-black text-sm text-slate-700">لا توجد طلبات في هذا القسم حالياً</h4>
          <p className="text-xs text-slate-400">ستظهر الطلبات الجديدة هنا فور قيام الزبائن بإرسالها.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const statusInfo = getStatusBadge(order.status);
            const assignedDriver = assignedDrivers[order.id];

            return (
              <div 
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-orange-300 transition-all p-5 shadow-xs space-y-4"
              >
                {/* Header: Order ID, Time, Store Name, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-xs">
                      #{order.id.slice(-4)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm text-slate-900">{order.storeName}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(order.createdAt).toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">رقم الطلب: <strong className="font-mono">{order.id}</strong></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-black border ${statusInfo.bg}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>

                {/* Body: Customer details + Items + Financials */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  {/* Customer & Address */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border space-y-2">
                    <h5 className="font-black text-slate-700 flex items-center gap-1.5 text-xs">
                      <User className="w-3.5 h-3.5 text-orange-500" />
                      <span>بيانات الزبون والعنوان:</span>
                    </h5>
                    <div className="space-y-1 text-[11px] text-slate-600">
                      <p><strong className="text-slate-800">الاسم:</strong> {order.customerName}</p>
                      <div className="pt-1 pb-1">
                        <span className="text-[10px] text-slate-500 font-bold block mb-1">هاتف وتواصل الزبون:</span>
                        <ContactActions
                          phone={order.customerPhone}
                          name={order.customerName}
                          defaultMessage={`مرحباً ${order.customerName}، بخصوص طلبك #${order.id.slice(-4)} من متجر ${order.storeName}.`}
                          variant="pills"
                        />
                      </div>
                      <p className="flex items-center gap-1">
                        <strong className="text-slate-800">المعلم:</strong>
                        <span className="text-orange-600 font-bold">{order.addressLandmark}</span>
                      </p>
                      {order.addressDetails && (
                        <p className="text-slate-500">{order.addressDetails}</p>
                      )}
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border space-y-2">
                    <h5 className="font-black text-slate-700 flex items-center gap-1.5 text-xs">
                      <Package className="w-3.5 h-3.5 text-orange-500" />
                      <span>محتويات الطلب ({order.items.length} صنف):</span>
                    </h5>
                    <div className="space-y-1 text-[11px] text-slate-700 max-h-28 overflow-y-auto">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span>{it.quantity}x {it.product.name} {it.selectedSize ? `(${it.selectedSize.name})` : ""}</span>
                          <span className="font-bold">{it.totalItemPrice.toLocaleString()} {currency}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total and Driver Dispatch */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border space-y-2 flex flex-col justify-between">
                    <div>
                      <h5 className="font-black text-slate-700 text-xs">الحساب الإجمالي:</h5>
                      <div className="space-y-1 text-[11px] text-slate-600 mt-1">
                        <div className="flex justify-between">
                          <span>قيمة المنتجات:</span>
                          <span className="font-bold">{order.subtotal.toLocaleString()} {currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>أجرة التوصيل:</span>
                          <span className="font-bold text-blue-600">+{order.deliveryFee.toLocaleString()} {currency}</span>
                        </div>
                        {order.discount && order.discount > 0 ? (
                          <div className="flex justify-between text-red-600 font-bold">
                            <span>خصم الكوبون:</span>
                            <span>-{order.discount.toLocaleString()} {currency}</span>
                          </div>
                        ) : null}
                        <div className="flex justify-between font-black text-xs text-orange-600 pt-1 border-t">
                          <span>المجموع الكلي:</span>
                          <span>{order.total.toLocaleString()} {currency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Assign Driver Dropdown */}
                    <div className="pt-2 border-t">
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">تعيين كابتن التوصيل:</label>
                      <select
                        value={assignedDriver || ""}
                        onChange={(e) => handleAssignDriver(order.id, e.target.value)}
                        className="w-full py-1.5 px-2 bg-white border border-slate-200 rounded-xl text-[11px] font-bold focus:outline-hidden"
                      >
                        <option value="">-- اختر كابتن من الأسطول --</option>
                        {driversList.map(d => (
                          <option key={d.id} value={d.name}>{d.name} ({d.status === "available" ? "متاح" : "مشغول"})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Footer Actions: Status Transition Buttons */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(order.id, "accepted")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        order.status === "accepted" || order.status === "preparing"
                          ? "bg-blue-600 text-white" 
                          : "bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700"
                      }`}
                    >
                      قبول وتجهيز 🍳
                    </button>

                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(order.id, "picked_up")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        order.status === "picked_up"
                          ? "bg-purple-600 text-white" 
                          : "bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700"
                      }`}
                    >
                      مع الكابتن 🛵
                    </button>

                    <button
                      type="button"
                      onClick={() => onUpdateOrderStatus(order.id, "delivered")}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        order.status === "delivered"
                          ? "bg-emerald-600 text-white" 
                          : "bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700"
                      }`}
                    >
                      تم التسليم ✅
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`إلغاء الطلب #${order.id.slice(-4)}؟`)) {
                          onUpdateOrderStatus(order.id, "cancelled");
                        }
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        order.status === "cancelled"
                          ? "bg-red-600 text-white" 
                          : "bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700"
                      }`}
                    >
                      إلغاء الطلب ✕
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة الفاتورة</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
