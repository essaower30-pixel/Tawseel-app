import React, { useState } from "react";
import { 
  Archive, 
  Clock, 
  Package, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Bike, 
  Store as StoreIcon, 
  Eye, 
  ChevronLeft,
  ShoppingBag,
  ExternalLink,
  Phone
} from "lucide-react";
import { Order, CartItem } from "../types";

interface CustomerOrdersArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  customerPhone?: string;
  customerName?: string;
  onSelectOrderToTrack?: (order: Order) => void;
  onReorder?: (items: CartItem[]) => void;
  currency?: string;
}

export const CustomerOrdersArchiveModal: React.FC<CustomerOrdersArchiveModalProps> = ({
  isOpen,
  onClose,
  orders,
  customerPhone,
  customerName,
  onSelectOrderToTrack,
  onReorder,
  currency = "ل.س"
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Filter orders matching this customer
  const customerOrders = orders.filter((o) => {
    if (!customerPhone && !customerName) return true; // if guest with local orders, show all recorded locally
    const matchesPhone = customerPhone && o.customerPhone === customerPhone;
    const matchesName = customerName && o.customerName === customerName;
    return matchesPhone || matchesName;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "قيد المراجعة والموافقة 🟡", bg: "bg-amber-50 text-amber-700 border-amber-200" };
      case "accepted":
      case "preparing":
        return { label: "جاري تجهيز الوجبة بالمحل 🍳", bg: "bg-blue-50 text-blue-700 border-blue-200" };
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

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans" dir="rtl">
      <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto text-right max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
              <Archive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">سجل طلباتي المؤرشفة 📦</h3>
              <p className="text-xs text-slate-400">يمكنك الرجوع لجميع طلباتك السابقة وإعادة طلبها بضغطة واحدة</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-black p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Orders List / Details Body */}
        <div className="overflow-y-auto space-y-3.5 flex-1 pr-1 pl-1">
          {customerOrders.length === 0 ? (
            <div className="p-10 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-black text-sm text-slate-700">لا يوجد لديك طلبات سابقة بعد</h4>
              <p className="text-xs text-slate-400">عند إتمام أي طلب جديد سيتم حفظه هنا في أرشيفك الدائم.</p>
            </div>
          ) : (
            customerOrders.map((order) => {
              const statusInfo = getStatusBadge(order.status);
              const isSelected = selectedOrder?.id === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl p-4 transition-all space-y-3"
                >
                  {/* Order Top Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">#{order.id.slice(-5)}</span>
                        <span className="font-bold text-slate-700 text-xs flex items-center gap-1">
                          <StoreIcon className="w-3.5 h-3.5 text-orange-500" />
                          <span>{order.storeName}</span>
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {new Date(order.createdAt).toLocaleString("ar-SY", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${statusInfo.bg}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Order Items Preview */}
                  <div className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-1">
                    <div className="font-bold text-slate-800 text-[11px]">محتويات الطلب:</div>
                    <div className="space-y-0.5">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px]">
                          <span>{item.quantity}x {item.product?.name}</span>
                          <span className="font-bold text-slate-900">{item.totalItemPrice?.toLocaleString()} {currency}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Captain Info */}
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <div>
                      {order.driverName && (
                        <span className="text-[11px] text-orange-700 font-bold flex items-center gap-1">
                          <Bike className="w-3.5 h-3.5" />
                          <span>كابتن التوصيل: {order.driverName}</span>
                        </span>
                      )}
                    </div>
                    <div className="font-black text-slate-900 text-sm">
                      الإجمالي: {order.total?.toLocaleString()} {currency}
                    </div>
                  </div>

                  {/* Actions (Reorder / Track Order) */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {order.status !== "delivered" && order.status !== "cancelled" && onSelectOrderToTrack && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectOrderToTrack(order);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>تتبع الطلب الحي 🛵</span>
                      </button>
                    )}

                    {onReorder && (
                      <button
                        type="button"
                        onClick={() => {
                          onReorder(order.items);
                          onClose();
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                        title="إضافة منتجات هذا الطلب للسلة وإعادة الطلب فوراً"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
                        <span>إعادة الطلب 🔄</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
