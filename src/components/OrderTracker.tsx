import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldAlert, 
  Bike, 
  Store as StoreIcon, 
  Package, 
  Headphones, 
  AlertTriangle,
  Receipt,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { MapNode, Order } from "../types";
import { ContactActions } from "./ContactActions";

interface OrderTrackerProps {
  order: Order;
  onBack: () => void;
  mapNodes: MapNode[];
  onCancelOrder?: (orderId: string) => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  order,
  onBack,
  mapNodes,
  onCancelOrder
}) => {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    switch (order.status) {
      case "pending": return 0;
      case "accepted": return 1;
      case "preparing": return 2;
      case "picked_up": return 3;
      case "delivered": return 4;
      default: return 0;
    }
  });

  // Simulated status progression for demo
  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (currentStep < 1) setCurrentStep(1);
    }, 4000);

    const timer2 = setTimeout(() => {
      if (currentStep < 2) setCurrentStep(2);
    }, 10000);

    const timer3 = setTimeout(() => {
      if (currentStep < 3) setCurrentStep(3);
    }, 22000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [currentStep]);

  const steps = [
    { title: "تم الاستلام", desc: "تم استقبال الطلب في النظام", icon: "📥" },
    { title: "تم التأكيد", desc: "المتجر اعتمد الطلب وبدأ به", icon: "✓" },
    { title: "قيد التجهيز", desc: "جاري الطهي والتحضير والتغليف", icon: "🍳" },
    { title: "مع الكابتن", desc: "السائق استلم الطلب وبالطريق إليك", icon: "🛵" },
    { title: "تم التسليم", desc: "وصل الطلب بالهناء والشفاء", icon: "🟢" }
  ];

  // Assigned driver sample or dynamic
  const driverName = "كابتن أبو شهاب";
  const driverPhone = "0955333444";
  const storePhone = "0944111222";
  const supportPhone = "0951854257";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-6 text-right font-sans" dir="rtl">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black text-slate-700 bg-white hover:bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <ArrowRight className="w-4 h-4 text-orange-500" />
          <span>الرجوع للرئيسية</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            طلب #{order.id.slice(-6)}
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>

      {/* Driver Road Safety Banner (حفاظاً على حياة وسلامة السائق) */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-5 sm:p-6 shadow-lg shadow-orange-500/15 border border-orange-400 space-y-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white text-orange-600 flex items-center justify-center font-black shrink-0 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base">
              تنبيه أمان وسلامة مرورية لكابتن التوصيل 🛵
            </h3>
            <p className="text-orange-100 text-xs font-medium">
              حرصاً على سلامة السائق أثناء القيادة على الطريق وتجنب تشتيته، تم إلغاء الرسائل الكتابية والمراسلة المباشرة.
            </p>
          </div>
        </div>
        <p className="text-[11px] sm:text-xs text-white/90 pt-1 leading-relaxed bg-black/10 p-3 rounded-2xl border border-white/15">
          📞 <strong>للتواصل السريع والضروري:</strong> يرجى إجراء اتصال هاتفي مباشر بالكابتن أو إرسال رسالة واتساب (عادي أو أعمال) ليتمكن من مراجعتها عند التوقف الآمن.
        </p>
      </div>

      {/* Progress Stepper Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>متابعة حالة وتجهيز الطلب</span>
            </h3>
            <p className="text-slate-500 text-xs font-bold mt-0.5">
              المتجر: <strong className="text-slate-800">{order.storeName}</strong> | الزبون:{" "}
              <strong className="text-slate-800">{order.customerName}</strong>
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 text-orange-700 px-4 py-2 rounded-2xl text-xs font-black text-center self-start sm:self-auto">
            الوقت المتوقع للوصول: 20 - 30 دقيقة ⏳
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/25 scale-102 font-black"
                    : isCompleted
                    ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1.5 text-xs font-black shadow-xs ${
                    isCurrent
                      ? "bg-white text-orange-600"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {isCompleted && !isCurrent ? "✓" : step.icon}
                </div>
                <h4 className="font-extrabold text-xs">{step.title}</h4>
                <p className={`text-[10px] mt-0.5 leading-tight ${isCurrent ? "text-orange-100" : "text-slate-400"}`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Communication Hub: Driver + Store + Support (With Dual WhatsApp) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Assigned Driver Contact */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-2xl shrink-0">
                  🛵
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">{driverName}</h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-full border border-emerald-200">
                      الكابتن المسؤول
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">
                    دراجة نارية سريعة • تقييم 4.9 ⭐
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              🛵 الكابتن مستعد لتوصيل طلبك حتى باب بيتك. للتنسيق السريع، اختر وسيلة التواصل المفضلة لديك أدناه:
            </p>
          </div>

          {/* Contact Buttons (Call + WhatsApp Regular + WhatsApp Business) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-extrabold text-slate-500 block">قنوات التواصل مع الكابتن:</span>
            <ContactActions 
              phone={driverPhone} 
              name={driverName}
              defaultMessage={`مرحباً كابتن، أنا الزبون (${order.customerName}) بخصوص طلبي #${order.id.slice(-4)} من متجر (${order.storeName}).`}
              variant="grid"
            />
          </div>
        </div>

        {/* Card 2: Store Contact */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-black text-xl shrink-0">
                  <StoreIcon className="w-6 h-6 text-slate-700" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">{order.storeName}</h4>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">
                    إدارة وتحضير الطلب في المتجر
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-500 text-xs leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
              🏪 لأي تعديل أو إضافة على الوجبة أو الاستفسار عن جهوزية الطلب، يمكنك التواصل مع إدارة المتجر مباشرة.
            </p>
          </div>

          {/* Contact Buttons (Call + WhatsApp Regular + WhatsApp Business) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-extrabold text-slate-500 block">قنوات التواصل مع المتجر:</span>
            <ContactActions 
              phone={storePhone} 
              name={order.storeName}
              defaultMessage={`مرحباً إدارة متجر (${order.storeName})، أنا الزبون (${order.customerName}) بخصوص طلبي #${order.id.slice(-4)}.`}
              variant="grid"
            />
          </div>
        </div>
      </div>

      {/* Order Summary Card & Customer Destination */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Receipt className="w-4.5 h-4.5 text-orange-500" />
            <span>تفاصيل الفاتورة ومحتويات الطلب</span>
          </h4>
          <span className="text-xs text-slate-400 font-bold">
            {order.items?.length || 0} أصناف
          </span>
        </div>

        {/* Address and Landmark Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-400 text-[10px] font-bold block">عنوان وموقع التسليم:</span>
              <span className="font-black text-slate-800 text-xs sm:text-sm">
                {order.addressLandmark || "وسط البلد"}
              </span>
              {order.addressDetails && (
                <span className="text-slate-500 block text-[11px] mt-0.5">{order.addressDetails}</span>
              )}
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-slate-400 text-[10px] font-bold block">هاتف المستلم:</span>
            <span className="font-mono font-black text-slate-800">{order.customerPhone}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="divide-y divide-slate-100 text-xs">
          {order.items &&
            order.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-orange-50 text-orange-600 font-black flex items-center justify-center text-xs">
                    {item.quantity}x
                  </span>
                  <div>
                    <span>{item.product.name}</span>
                    {item.selectedSize && (
                      <span className="text-slate-400 text-[10px] mr-1">({item.selectedSize.name})</span>
                    )}
                    {item.selectedAdditions && item.selectedAdditions.length > 0 && (
                      <span className="text-slate-400 text-[10px] mr-1">
                        + {item.selectedAdditions.map((a) => a.name).join("، ")}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-black text-slate-900 font-mono">
                  {(item.totalItemPrice * item.quantity).toLocaleString()} ل.س
                </span>
              </div>
            ))}
        </div>

        {/* Financial Totals */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>مجموع المنتجات:</span>
            <span className="font-bold font-mono">{order.subtotal.toLocaleString()} ل.س</span>
          </div>
          <div className="flex justify-between">
            <span>أجرة التوصيل السريع:</span>
            <span className="font-bold text-blue-600 font-mono">+{order.deliveryFee.toLocaleString()} ل.س</span>
          </div>
          {order.discount && order.discount > 0 ? (
            <div className="flex justify-between text-emerald-600 font-bold">
              <span>خصم الكوبون المطبق:</span>
              <span className="font-mono">-{order.discount.toLocaleString()} ل.س</span>
            </div>
          ) : null}
          <div className="flex justify-between font-black text-sm text-orange-600 pt-2 border-t border-slate-200">
            <span>المبلغ الإجمالي للدفع عند الاستلام:</span>
            <span className="font-mono text-base">{order.total.toLocaleString()} ل.س</span>
          </div>
        </div>

        {/* Support Footer */}
        <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-amber-400" />
            <div>
              <h5 className="font-black text-xs">خدمة العملاء والدعم الفني لمنصة "توصيل"</h5>
              <p className="text-slate-400 text-[10px]">جاهزون لمساعدتك في أي وقت على مدار الساعة</p>
            </div>
          </div>
          <ContactActions
            phone={supportPhone}
            name="دعم منصة توصيل"
            defaultMessage={`مرحباً خدمة العملاء، أود الاستفسار عن الطلب #${order.id.slice(-4)}.`}
            variant="compact"
          />
        </div>
      </div>
    </div>
  );
};
