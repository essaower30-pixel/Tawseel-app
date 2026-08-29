import React, { useState } from "react";
import { ArrowRight, Trash2, Plus, Minus, Tag, Check, MapPin, Phone, User, ShoppingCart, ShieldCheck } from "lucide-react";
import { CartItem, MapNode, Store, StoreAddition, StoreSize, UserProfile } from "../types";

interface CartCheckoutProps {
  cartItems: CartItem[];
  onAddToCart: (product: any, selectedSize?: StoreSize, selectedAdditions?: StoreAddition[]) => void;
  onRemoveFromCart: (product: any, selectedSize?: StoreSize, selectedAdditions?: StoreAddition[]) => void;
  onClearCart: () => void;
  onCheckout: (orderDetails: any) => void;
  onBackToShopping: () => void;
  selectedLandmark: string;
  onSelectLandmark: (id: string) => void;
  mapNodes: MapNode[];
  stores: Store[];
  customerUser: UserProfile | null;
}

export const CartCheckout: React.FC<CartCheckoutProps> = ({
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
  onBackToShopping,
  selectedLandmark,
  onSelectLandmark,
  mapNodes,
  stores,
  customerUser
}) => {
  const [customerName, setCustomerName] = useState(customerUser?.name || "");
  const [customerPhone, setCustomerPhone] = useState(customerUser?.phone || "");
  const [notes, setNotes] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "electronic">("cash");

  const currentStoreId = cartItems.length > 0 ? cartItems[0].product.storeId : "";
  const currentStore = stores.find((s) => s.id === currentStoreId);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalItemPrice * item.quantity, 0);
  const deliveryFee = currentStore ? currentStore.deliveryFee : 5;

  const discountAmount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discountPercent) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (code === "TAWSEEL" || code === "WELCOME" || code === "KORAYA") {
      setAppliedCoupon({ code, discountPercent: 15 });
      setCouponInput("");
    } else {
      setCouponError("كود الخصم غير صالح أو منتهي الصلاحية.");
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      alert("الرجاء إدخال الاسم ورقم الهاتف للتوصيل.");
      return;
    }

    const resolvedLandmark = 
      mapNodes.find(n => n.id === selectedLandmark || n.arabicName === selectedLandmark || n.name === selectedLandmark)?.arabicName || 
      mapNodes.find(n => n.id === selectedLandmark || n.arabicName === selectedLandmark || n.name === selectedLandmark)?.name || 
      selectedLandmark;

    onCheckout({
      storeId: currentStoreId,
      storeName: currentStore ? currentStore.name : "متجر محلي",
      items: cartItems,
      subtotal,
      deliveryFee,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      total,
      customerName,
      customerPhone,
      addressLandmark: resolvedLandmark,
      addressDetails,
      notes,
      paymentMethod
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 space-y-6" dir="rtl">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToShopping}
          className="flex items-center gap-1.5 text-xs font-black text-slate-700 bg-white hover:bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
        >
          <ArrowRight className="w-4 h-4 text-orange-500" />
          <span>متابعة التسوق</span>
        </button>

        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={onClearCart}
            className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 py-2 px-3 rounded-xl border border-red-100 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>إفراغ السلة</span>
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl mx-auto flex items-center justify-center text-orange-500">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800">سلة التسوق فارغة حالياً</h3>
          <p className="text-slate-400 text-xs max-w-sm mx-auto">
            تصفح المتاجر والمطاعم وأضف وجباتك ومنتجاتك المفضلة لتصلك ساخنة وسريعة!
          </p>
          <button
            type="button"
            onClick={onBackToShopping}
            className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-3 px-6 rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            تصفح المتاجر والبدء بالطلب 🛍️
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Items List */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 text-right">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-slate-800 text-sm">
                  محتويات السلة من ({currentStore?.name || "المتجر"})
                </h3>
                <span className="text-xs font-bold text-slate-400">{cartItems.length} أصناف</span>
              </div>

              <div className="divide-y divide-slate-100">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover bg-slate-100"
                      />
                      <div>
                        <h4 className="font-extrabold text-slate-800 text-xs">{item.product.name}</h4>
                        {item.selectedSize && (
                          <span className="text-[10px] text-orange-600 font-bold block">
                            الحجم: {item.selectedSize.name}
                          </span>
                        )}
                        {item.selectedAdditions && item.selectedAdditions.length > 0 && (
                          <span className="text-[10px] text-slate-400 font-bold block">
                            إضافات: {item.selectedAdditions.map((a) => a.name).join("، ")}
                          </span>
                        )}
                        <span className="text-xs font-black text-slate-900 mt-1 block">
                          {item.totalItemPrice * item.quantity} ل.س
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.product, item.selectedSize, item.selectedAdditions)}
                        className="w-6 h-6 bg-white text-slate-700 hover:text-red-600 rounded-lg flex items-center justify-center shadow-xs font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-black text-slate-800 min-w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onAddToCart(item.product, item.selectedSize, item.selectedAdditions)}
                        className="w-6 h-6 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow-xs font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address & Customer Details Form */}
            <form id="checkout-form" onSubmit={handleConfirmOrder} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 text-right">
              <h3 className="font-black text-slate-800 text-sm flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>بيانات التوصيل والعنوان</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">الاسم الكريم:</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="الاسم الكامل"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">رقم الموبايل:</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="09xxxxxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="font-extrabold text-slate-700 block mb-1">المعلم أو المنطقة الأقرب لك:</label>
                <select
                  value={selectedLandmark}
                  onChange={(e) => onSelectLandmark(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none text-slate-800"
                >
                  {mapNodes.map((node) => {
                    const label = node.arabicName || node.name;
                    return (
                      <option key={node.id} value={label}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="text-xs">
                <label className="font-extrabold text-slate-700 block mb-1">تفاصيل العنوان أو الشارع:</label>
                <input
                  type="text"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="مثال: بجانب الصيدلية، الطابق الثاني، قرب الجامع..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none"
                />
              </div>

              <div className="text-xs">
                <label className="font-extrabold text-slate-700 block mb-1">ملاحظات خاصة للمندوب أو المتجر:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: زيادة الثوم، بدون مخلل، الاتصال عند الوصول..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none"
                />
              </div>
            </form>
          </div>

          {/* Order Summary & Payment */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4 text-right">
              <h3 className="font-black text-slate-800 text-sm">ملخص الفاتورة</h3>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="كود الخصم (مثال: TAWSEEL)"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-bold outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs px-3 rounded-xl cursor-pointer"
                  >
                    تطبيق
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> تم تطبيق كود ({appliedCoupon.code}) بنسبة {appliedCoupon.discountPercent}%
                  </p>
                )}
                {couponError && <p className="text-[10px] text-red-500 font-bold">{couponError}</p>}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
                <div className="flex justify-between text-slate-600 font-bold">
                  <span>قيمة المنتجات:</span>
                  <span>{subtotal} ل.س</span>
                </div>
                <div className="flex justify-between text-slate-600 font-bold">
                  <span>أجور التوصيل:</span>
                  <span>{deliveryFee} ل.س</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-black">
                    <span>خصم الكوبون:</span>
                    <span>-{discountAmount} ل.س</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-black text-base pt-2 border-t border-slate-100">
                  <span>المجموع النهائي:</span>
                  <span>{total} ل.س</span>
                </div>
              </div>

              {/* Payment Option */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="text-xs font-extrabold text-slate-700 block">طريقة الدفع:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`py-2 px-3 rounded-xl border font-black transition-all cursor-pointer ${
                      paymentMethod === "cash"
                        ? "bg-orange-50 border-orange-500 text-orange-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    💵 نقداً عند الاستلام
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("electronic")}
                    className={`py-2 px-3 rounded-xl border font-black transition-all cursor-pointer ${
                      paymentMethod === "electronic"
                        ? "bg-orange-50 border-orange-500 text-orange-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    💳 سيريتل كاش / هرم
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 cursor-pointer active:scale-98 transition-all text-center"
              >
                تأكيد وإرسال الطلب فوراً 🚀
              </button>

              <p className="text-[10px] text-slate-400 text-center font-bold">
                🔒 ضمان التوصيل السريع والآمن من الباب إلى الباب
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
