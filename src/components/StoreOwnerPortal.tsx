import React, { useState, useMemo } from "react";
import { 
  Store as StoreIcon, 
  Package, 
  Utensils, 
  Clock, 
  CheckCircle2, 
  Bike, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  ArrowRight,
  User,
  Power,
  Archive,
  FileText,
  Send,
  Printer,
  Calendar,
  DollarSign,
  Volume2,
  VolumeX
} from "lucide-react";
import { Order, Product, Store, UserProfile, Category } from "../types";
import { ContactActions } from "./ContactActions";
import { openWhatsApp } from "../utils/whatsapp";
import { playOrderAlertSound, isSoundEnabled, setSoundEnabled } from "../utils/soundNotifications";

interface StoreOwnerPortalProps {
  storeId: string;
  stores: Store[];
  products: Product[];
  orders: Order[];
  categories: Category[];
  userProfile: UserProfile;
  onUpdateStore: (store: Store) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onLogout: () => void;
  onBackToCustomerView?: () => void;
  currency?: string;
}

export const StoreOwnerPortal: React.FC<StoreOwnerPortalProps> = ({
  storeId,
  stores,
  products,
  orders,
  categories,
  userProfile,
  onUpdateStore,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onLogout,
  onBackToCustomerView,
  currency = "ل.س"
}) => {
  const currentStore = stores.find((s) => s.id === storeId) || {
    id: storeId,
    name: userProfile.name || "متجر القرية",
    category: "food",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    deliveryTime: "20-30 دقيقة",
    deliveryFee: 5000,
    locationNode: "center",
    status: "open" as const,
    contactPhone: userProfile.phone || "0944111222"
  };

  const [activeTab, setActiveTab] = useState<"orders" | "products" | "archive">("orders");
  const [archiveDateFilter, setArchiveDateFilter] = useState<"all" | "today" | "yesterday" | "week">("all");
  const [isOpen, setIsOpen] = useState<boolean>(currentStore.status !== "closed");
  const [soundAlerts, setSoundAlerts] = useState<boolean>(() => isSoundEnabled());

  const handleToggleSound = () => {
    const next = !soundAlerts;
    setSoundAlerts(next);
    setSoundEnabled(next);
    if (next) {
      playOrderAlertSound("ringtone");
    }
  };

  const handleToggleStoreStatus = () => {
    const nextStatus = isOpen ? "closed" : "open";
    setIsOpen(!isOpen);
    onUpdateStore({ ...currentStore, status: nextStatus });
  };

  // Filter orders for this store
  const storeOrders = orders.filter(
    (o) => o.storeId === currentStore.id || o.storeName === currentStore.name
  );

  // Archive filtered orders
  const archivedStoreOrders = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const startOfWeek = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    return storeOrders.filter((o) => {
      const t = new Date(o.createdAt).getTime();
      if (archiveDateFilter === "today" && t < startOfToday) return false;
      if (archiveDateFilter === "yesterday" && (t < startOfYesterday || t >= startOfToday)) return false;
      if (archiveDateFilter === "week" && t < startOfWeek) return false;
      return true;
    });
  }, [storeOrders, archiveDateFilter]);

  const storeArchiveStats = useMemo(() => {
    let deliveredTotal = 0;
    let deliveredCount = 0;
    archivedStoreOrders.forEach((o) => {
      if (o.status === "delivered") {
        deliveredCount++;
        deliveredTotal += o.subtotal || 0;
      }
    });
    return { deliveredTotal, deliveredCount };
  }, [archivedStoreOrders]);

  const handleSendMerchantReportWhatsApp = () => {
    const periodLabel = archiveDateFilter === "today" ? "اليوم" : archiveDateFilter === "yesterday" ? "الأمس" : archiveDateFilter === "week" ? "آخر 7 أيام" : "كافة الطلبات";
    let msg = `📊 *تقرير مبيعات متجر (${currentStore.name})* 📊\n📅 *الفترة:* ${periodLabel}\n⏱️ *تاريخ الإصدار:* ${new Date().toLocaleString("ar-SY")}\n\n📦 *إجمالي الطلبات:* ${archivedStoreOrders.length} طلب\n✅ *المسلمة بنجاح:* ${storeArchiveStats.deliveredCount} طلب\n💰 *صافي مبيعات المتجر:* ${storeArchiveStats.deliveredTotal.toLocaleString()} ${currency}\n\n───────────────\nتفاصيل الطلبات:\n`;
    archivedStoreOrders.forEach((o) => {
      msg += `• #${o.id.slice(-4)} | ${o.customerName} | ${o.subtotal?.toLocaleString()} ${currency} | ${o.status === "delivered" ? "مسلم ✅" : o.status}\n`;
    });
    msg += `\n───────────────\nتطبيق توصيل - بوابة التاجر 🌟`;
    openWhatsApp({ phone: currentStore.contactPhone || userProfile.phone, message: msg });
  };

  // Filter products for this store
  const storeProducts = products.filter((p) => p.storeId === currentStore.id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-right font-sans pb-12" dir="rtl">
      {/* Merchant Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-5 sm:p-7 text-white shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-500/25 shrink-0">
              🏪
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">{currentStore.name}</h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${
                    isOpen
                      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {isOpen ? "المتجر مفتوح لاستقبال الطلبات 🟢" : "المتجر مغلق حالياً 🔴"}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-semibold mt-0.5 flex items-center gap-2">
                <span>هاتف المتجر: <strong className="font-mono text-slate-200">{currentStore.contactPhone || userProfile.phone}</strong></span>
                <span>•</span>
                <span>أجرة التوصيل: {currentStore.deliveryFee.toLocaleString()} {currency}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Sound alert toggle for store orders */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`py-2 px-3.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                soundAlerts
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
              }`}
              title="تفعيل/كتم صوت رنين الطلبات الواردة للمتجر"
            >
              {soundAlerts ? <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{soundAlerts ? "رنين الطلبات مفعّل 🔔" : "الصوت مكتوم"}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleStoreStatus}
              className={`py-2 px-3.5 rounded-xl border text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                isOpen
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{isOpen ? "إغلاق المتجر مؤقتاً" : "فتح المتجر للزبائن"}</span>
            </button>

            {onBackToCustomerView && (
              <button
                type="button"
                onClick={onBackToCustomerView}
                className="py-2 px-3.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <ArrowRight className="w-4 h-4 text-orange-400" />
                <span>تصفح كزبون</span>
              </button>
            )}

            <button
              type="button"
              onClick={onLogout}
              className="py-2 px-3.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <span className="text-slate-400 text-xs font-bold block">إجمالي طلبات المتجر</span>
            <span className="text-xl font-black text-orange-400">{storeOrders.length} طلب</span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700">
            <span className="text-slate-400 text-xs font-bold block">طلبات نشطة قيد التحضير</span>
            <span className="text-xl font-black text-blue-400">
              {storeOrders.filter((o) => o.status === "pending" || o.status === "accepted" || o.status === "preparing").length} طلب
            </span>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700 col-span-2 sm:col-span-1">
            <span className="text-slate-400 text-xs font-bold block">عدد الأصناف في المنيو</span>
            <span className="text-xl font-black text-emerald-400">{storeProducts.length} صنف</span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`py-2.5 px-4 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "orders"
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>طلبات متجري الواردة ({storeOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("archive")}
          className={`py-2.5 px-4 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "archive"
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Archive className="w-4 h-4" />
          <span>أرشيف الطلبات والتقارير ({storeOrders.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`py-2.5 px-4 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            activeTab === "products"
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>قائمة الأصناف والأسعار ({storeProducts.length})</span>
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {storeOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-2">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-black text-sm text-slate-700">لا توجد طلبات مسجلة لهذا المتجر حالياً</h4>
              <p className="text-xs text-slate-400">ستظهر طلبات الزبائن الواردة هنا فور إرسالها.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {storeOrders.map((order) => {
                const hasDriver = Boolean(order.driverName || order.driverPhone);

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl border border-slate-200 hover:border-orange-300 p-5 sm:p-6 shadow-xs space-y-4 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 font-black text-xs flex items-center justify-center">
                          #{order.id.slice(-4)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-sm text-slate-900">طلب الزبون: {order.customerName}</h4>
                            <span className="text-xs font-mono text-slate-400">
                              {new Date(order.createdAt).toLocaleTimeString("ar-SY", { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            المعلم: <strong className="text-slate-800">{order.addressLandmark}</strong>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black border ${
                            order.status === "pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : order.status === "accepted" || order.status === "preparing"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : order.status === "picked_up"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {order.status === "pending"
                            ? "طلب جديد بانتظار القبول 🟡"
                            : order.status === "accepted" || order.status === "preparing"
                            ? "جاري التجهيز بالمحل 🍳"
                            : order.status === "picked_up"
                            ? "تم الاستلام من الكابتن 🛵"
                            : "تم التسليم بنجاح 🟢"}
                        </span>
                      </div>
                    </div>

                    {/* Dispatch & Driver info Box */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      {/* Driver Status for Store */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                        <div className="flex items-center gap-2">
                          <Bike className="w-4 h-4 text-orange-500" />
                          <span className="font-black text-slate-800">كابتن التوصيل المكلف من الإدارة:</span>
                        </div>
                        {hasDriver ? (
                          <div className="space-y-2 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-slate-900">{order.driverName}</span>
                              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                تم التكليف
                              </span>
                            </div>
                            <p className="text-slate-400 text-[11px]">{order.driverVehicle || "دراجة نارية"}</p>
                            <div className="pt-1 border-t border-slate-200">
                              <ContactActions
                                phone={order.driverPhone!}
                                name={order.driverName!}
                                defaultMessage={`مرحباً كابتن (${order.driverName})، من إدارة متجر (${currentStore.name}) بخصوص تجهيز الطلب #${order.id.slice(-4)}.`}
                                variant="pills"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 space-y-1">
                            <p className="font-bold">بانتظار توجيه وتعيين كابتن من الإدارة ⏳</p>
                            <p className="text-[10px] text-amber-700">تقوم إدارة المنصة بتعيين أقرب كابتن لاستلام الطلب فور جهوزيته.</p>
                          </div>
                        )}
                      </div>

                      {/* Items */}
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                        <span className="font-black text-slate-800 block">الأصناف المطلوبة للتحضير:</span>
                        <div className="divide-y divide-slate-200 text-slate-700 space-y-1 max-h-28 overflow-y-auto">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="pt-1 flex items-center justify-between font-bold">
                              <span>{it.quantity}x {it.product.name} {it.selectedSize ? `(${it.selectedSize.name})` : ""}</span>
                              <span className="font-mono">{it.totalItemPrice.toLocaleString()} {currency}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t flex justify-between font-black text-slate-900">
                          <span>قيمة المنتجات:</span>
                          <span className="text-orange-600">{order.subtotal.toLocaleString()} {currency}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100">
                      {order.status === "pending" && (
                        <button
                          type="button"
                          onClick={() => onUpdateOrderStatus(order.id, "accepted")}
                          className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-xs transition-all cursor-pointer"
                        >
                          قبول الطلب وبدء التحضير 🍳
                        </button>
                      )}

                      {(order.status === "accepted" || order.status === "preparing") && (
                        <button
                          type="button"
                          onClick={() => onUpdateOrderStatus(order.id, "picked_up")}
                          className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-xs transition-all cursor-pointer"
                        >
                          تسليم الطلب للكابتن 🛵
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Store Archive & Reports Tab */}
      {activeTab === "archive" && (
        <div className="space-y-4">
          {/* Filter & Summary Header */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-slate-700">الفترة:</span>
              {[
                { id: "all", label: "كافة الطلبات" },
                { id: "today", label: "اليوم" },
                { id: "yesterday", label: "الأمس" },
                { id: "week", label: "آخر 7 أيام" }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setArchiveDateFilter(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    archiveDateFilter === f.id
                      ? "bg-slate-900 text-white font-black shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSendMerchantReportWhatsApp}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال تقرير مبيعاتي بالواتساب 📊</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>طباعة</span>
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold">إجمالي مبيعات المتجر</span>
              <p className="text-lg font-black text-emerald-600">
                {storeArchiveStats.deliveredTotal.toLocaleString()} <span className="text-xs font-bold text-slate-500">{currency}</span>
              </p>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold">الطلبات المسلمة بنجاح</span>
              <p className="text-lg font-black text-slate-900">
                {storeArchiveStats.deliveredCount} <span className="text-xs font-bold text-slate-400">طلب</span>
              </p>
            </div>
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs text-slate-400 font-bold">إجمالي سجل الأرشيف</span>
              <p className="text-lg font-black text-orange-600">
                {archivedStoreOrders.length} <span className="text-xs font-bold text-slate-400">طلب</span>
              </p>
            </div>
          </div>

          {/* Archived Orders List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            {archivedStoreOrders.length === 0 ? (
              <div className="p-10 text-center space-y-2">
                <Archive className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-black text-slate-700">لا توجد طلبات مؤرشفة في الفترة المحددة</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-3 px-4">رقم الطلب</th>
                      <th className="py-3 px-4">التاريخ والوقت</th>
                      <th className="py-3 px-4">الزبون</th>
                      <th className="py-3 px-4">الكابتن</th>
                      <th className="py-3 px-4">قيمة المبيعات</th>
                      <th className="py-3 px-4">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {archivedStoreOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-black font-mono">#{o.id.slice(-4)}</td>
                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {new Date(o.createdAt).toLocaleString("ar-SY", {
                            month: "numeric",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </td>
                        <td className="py-3 px-4 font-bold">{o.customerName}</td>
                        <td className="py-3 px-4">
                          {o.driverName ? (
                            <span className="font-bold text-orange-700">🛵 {o.driverName}</span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">بدون كابتن</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900 whitespace-nowrap">
                          {o.subtotal?.toLocaleString()} {currency}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                              o.status === "delivered"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : o.status === "cancelled"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {o.status === "delivered" ? "مسلم 🟢" : o.status === "cancelled" ? "ملغي 🔴" : "نشط 🟡"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {storeProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-3xl border border-slate-200 p-4 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-32 object-cover rounded-2xl"
                  />
                  <h4 className="font-black text-slate-900 text-sm">{prod.name}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{prod.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="font-black text-sm text-orange-600 font-mono">
                    {prod.price.toLocaleString()} {currency}
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg font-bold">
                    متاح
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
