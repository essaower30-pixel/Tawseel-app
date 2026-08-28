import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShoppingCart, Plus, Minus, Star, Clock, Check, X, Shield, Phone, Sparkles, Send, MessageSquare, Pill, Stethoscope, ShoppingBag, Edit3 } from "lucide-react";
import { CartItem, Product, Store, StoreAddition, StoreSize, UserProfile } from "../types";
import { ContactActions } from "./ContactActions";
import { PrescriptionModal } from "./PrescriptionModal";
import { CustomStoreOrderModal } from "./CustomStoreOrderModal";

interface StoreDetailsProps {
  store: Store;
  onBack: () => void;
  cartItems: CartItem[];
  onAddToCart: (product: Product, selectedSize?: StoreSize, selectedAdditions?: StoreAddition[]) => void;
  onRemoveFromCart: (product: Product, selectedSize?: StoreSize, selectedAdditions?: StoreAddition[]) => void;
  onViewCart: () => void;
  products: Product[];
  customerUser: UserProfile | null;
  onSubmitCustomOrder?: (orderData: any) => void;
}

export const StoreDetails: React.FC<StoreDetailsProps> = ({
  store,
  onBack,
  cartItems,
  onAddToCart,
  onRemoveFromCart,
  onViewCart,
  products,
  customerUser,
  onSubmitCustomOrder
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<StoreSize | null>(null);
  const [selectedAdditions, setSelectedAdditions] = useState<StoreAddition[]>([]);

  // Special Modals
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showCustomOrderModal, setShowCustomOrderModal] = useState(false);

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState(customerUser?.name || "");
  const [servicePhone, setServicePhone] = useState(customerUser?.phone || "");
  const [serviceNotes, setServiceNotes] = useState("");
  const [serviceSchedule, setServiceSchedule] = useState("الآن (عاجل)");

  const storeProducts = products
    .filter((p) => p.storeId === store.id)
    .filter(
      (p) =>
        (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !p.isHidden
    );

  const getProductCountInCart = (productId: string) => {
    return cartItems
      .filter((item) => item.product.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleOpenCustomization = (product: Product) => {
    if ((product.sizes && product.sizes.length > 0) || (product.additions && product.additions.length > 0)) {
      setSelectedProduct(product);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);
      setSelectedAdditions([]);
    } else {
      onAddToCart(product);
    }
  };

  const toggleAddition = (addition: StoreAddition) => {
    setSelectedAdditions((prev) =>
      prev.find((a) => a.name === addition.name)
        ? prev.filter((a) => a.name !== addition.name)
        : [...prev, addition]
    );
  };

  const confirmCustomizationAdd = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, selectedSize || undefined, selectedAdditions);
      setSelectedProduct(null);
      setSelectedSize(null);
      setSelectedAdditions([]);
    }
  };

  const calculateCustomPrice = () => {
    if (!selectedProduct) return 0;
    const base = selectedSize ? selectedSize.price : selectedProduct.price;
    const additionsTotal = selectedAdditions.reduce((sum, a) => sum + a.price, 0);
    return base + additionsTotal;
  };

  const isPharmacy = store.category === "pharmacies" || store.id === "store_shifa" || store.name.includes("صيدل");
  const isDoctor = store.category === "doctors" || store.name.includes("طبيب") || store.name.includes("دكتور") || store.name.includes("عيادة");
  const isServiceStore = ["crafts", "drivers"].includes(store.category) || (store.isService && !isPharmacy && !isDoctor);

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceNotes.trim()) {
      alert("الرجاء توضيح تفاصيل الخدمة المطلوبة.");
      return;
    }
    if (onSubmitCustomOrder) {
      onSubmitCustomOrder({
        storeId: store.id,
        storeName: store.name,
        customerName: serviceName,
        customerPhone: servicePhone,
        serviceNotes,
        serviceSchedule,
        isServiceOrder: true
      });
    }
    setShowServiceModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 py-4" dir="rtl">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-black text-slate-700 bg-white hover:bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs cursor-pointer transition-all active:scale-95"
        >
          <ArrowRight className="w-4 h-4 text-orange-500" />
          <span>الرجوع للمتاجر</span>
        </button>

        {totalCartCount > 0 && (
          <button
            type="button"
            onClick={onViewCart}
            className="flex items-center gap-2 text-xs font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 py-2.5 px-4 rounded-xl shadow-lg shadow-orange-500/25 cursor-pointer active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>عرض السلة ({totalCartCount} سلع)</span>
          </button>
        )}
      </div>

      {/* Store Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden text-right">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${store.image}')` }}
        />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-[11px] font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>متجر محلي موثوق ومفعل</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black">{store.name}</h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-medium">
            {store.description || "أفضل وأجود المنتجات المحلية مع توصيل سريع حتى باب منزلك."}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
            <div className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="font-bold">{store.rating}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="text-orange-400 font-bold">أجور التوصيل: {store.deliveryFee} ل.س</span>
            </div>
            {store.contactPhone && (
              <div className="flex items-center gap-2">
                <ContactActions
                  phone={store.contactPhone}
                  name={store.name}
                  defaultMessage={`مرحباً متجر (${store.name})، أود الاستفسار عن منتجاتكم وطلبات التوصيل.`}
                  variant="pills"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Quick Action Buttons for Pharmacy or Doctors or Services */}
      {isPharmacy && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div>
            <h4 className="font-black text-emerald-900 text-sm">💊 خدمة طلب واستشارة الوصفات والراشيتات الطبية</h4>
            <p className="text-emerald-700 text-xs font-semibold mt-0.5">
              يمكنك تصوير الراشيتة بالكاميرا فوراً أو استيرادها من الاستديو ليقوم الصيدلاني بتجهيزها وصرفها لك.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPrescriptionModal(true)}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <Pill className="w-4 h-4" />
            <span>طلب أدوية وراشيتة طبية 📋</span>
          </button>
        </div>
      )}

      {isDoctor && (
        <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div>
            <h4 className="font-black text-cyan-950 text-sm">🩺 استشارة طبية وطلب فحص / راشيتة أدوية</h4>
            <p className="text-cyan-800 text-xs font-semibold mt-0.5">
              يمكنك إرفاق صورة الراشيتة الطبية (كاميرا أو استديو) واستشارة الطبيب مباشرة وتحديد الموعد.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPrescriptionModal(true)}
            className="w-full sm:w-auto bg-cyan-700 hover:bg-cyan-800 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <Stethoscope className="w-4 h-4" />
            <span>إرسال راشيتة / استشارة للطبيب 📋</span>
          </button>
        </div>
      )}

      {/* CUSTOM STORE ORDER BANNER (For all stores) */}
      <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-right shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
            🛍️
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-xs sm:text-sm">
              لم تجد ما تبحث عنه في القائمة؟ طلب مخصص من ({store.name})
            </h4>
            <p className="text-slate-600 text-[11px] font-semibold mt-0.5">
              اكتب طلبك الخاص أو صوّر ورقة المقاضي / المنتج بالكاميرا وسيحضرها لك المتجر فوراً!
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowCustomOrderModal(true)}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-md shadow-orange-600/20 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>طلب خاص من هذا المتجر ✍️</span>
        </button>
      </div>

      {isServiceStore && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
          <div>
            <h4 className="font-black text-blue-900 text-sm">🛠️ حجز خدمة أو طلب استشارة وموعد</h4>
            <p className="text-blue-700 text-xs font-semibold mt-0.5">
              تواصل مباشرة مع صاحب المهنة أو حدد موعداً وسيقوم بالرد وتلبية طلبك.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowServiceModal(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            طلب الخدمة الآن 🚀
          </button>
        </div>
      )}

      {/* Search Input for Products */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن منتج بالاسم أو الوصف داخل هذا المتجر..."
          className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-xl py-2.5 px-4 text-xs font-bold outline-none text-slate-800 transition-all text-right"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {storeProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200/80 space-y-3">
            <p className="text-4xl">📦</p>
            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">لم نعثر على هذا الصنف في القائمة</h4>
            <p className="text-slate-500 text-xs max-w-md mx-auto">
              لا تقلق! يمكنك إرسال اسم المنتج أو وصفه كطلب خاص وسيقوم متجر ({store.name}) بتأمينه لك فوراً.
            </p>
            <button
              type="button"
              onClick={() => setShowCustomOrderModal(true)}
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs py-2.5 px-6 rounded-2xl shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>طلب هذا المنتج بالاسم / بالصورة 🛍️</span>
            </button>
          </div>
        ) : (
          storeProducts.map((product) => {
            const count = getProductCountInCart(product.id);
            const hasOptions = (product.sizes && product.sizes.length > 0) || (product.additions && product.additions.length > 0);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative text-right"
              >
                {product.isOffer && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                    {product.offerLabel || "عرض خاص"}
                  </span>
                )}

                <div className="space-y-2">
                  <div className="h-36 rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-black text-slate-800 text-sm">{product.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{product.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900">{product.price} ل.س</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">{product.originalPrice} ل.س</span>
                      )}
                    </div>
                    {product.unit && <span className="text-[10px] text-slate-400 font-bold block">{product.unit}</span>}
                  </div>

                  {hasOptions ? (
                    <button
                      type="button"
                      onClick={() => handleOpenCustomization(product)}
                      className="bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 font-black text-xs py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>تخصيص وإضافة</span>
                    </button>
                  ) : count > 0 ? (
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(product)}
                        className="w-7 h-7 bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-lg flex items-center justify-center shadow-xs font-bold transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-slate-800 min-w-4 text-center">{count}</span>
                      <button
                        type="button"
                        onClick={() => onAddToCart(product)}
                        className="w-7 h-7 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center shadow-xs font-bold transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-2 px-3 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة للسلة</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Sticky Bottom Cart Bar if items exist */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-4 right-4 max-w-lg mx-auto z-40"
            dir="rtl"
          >
            <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-4 shadow-2xl border border-slate-700 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white shrink-0">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span>السلة الحالية</span>
                    <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {totalCartCount} {totalCartCount === 1 ? "عنصر" : "عناصر"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs font-semibold mt-0.5">
                    اضغط لمعاينة وتأكيد عنوان التوصيل
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onViewCart}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm py-2.5 px-4 sm:px-5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95"
              >
                <span>معاينة السلة</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Customization Modal (Sizes & Additions) */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-right"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-black text-slate-800 text-base">{selectedProduct.name}</h3>
                  <p className="text-slate-400 text-xs font-bold">اختر الحجم والإضافات المفضلة</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sizes */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 block">اختر الحجم:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz.name}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 ${
                          selectedSize?.name === sz.name
                            ? "bg-orange-50 border-orange-500 text-orange-700 shadow-xs"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{sz.name}</span>
                        <span className="font-black text-slate-900">{sz.price} ل.س</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Additions */}
              {selectedProduct.additions && selectedProduct.additions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-700 block">إضافات اختيارية:</label>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {selectedProduct.additions.map((add) => {
                      const isChecked = selectedAdditions.some((a) => a.name === add.name);
                      return (
                        <div
                          key={add.name}
                          onClick={() => toggleAddition(add)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold cursor-pointer transition-all ${
                            isChecked
                              ? "bg-orange-50 border-orange-300 text-orange-900"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                                isChecked ? "bg-orange-500 border-orange-500 text-white" : "border-slate-300 bg-white"
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span>{add.name}</span>
                          </div>
                          <span className="text-slate-500 font-bold">+{add.price} ل.س</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-bold">السعر النهائي</span>
                  <span className="text-lg font-black text-slate-900">{calculateCustomPrice()} ل.س</span>
                </div>
                <button
                  type="button"
                  onClick={confirmCustomizationAdd}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  تأكيد وإضافة للسلة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Prescription Modal */}
      <PrescriptionModal
        isOpen={showPrescriptionModal}
        onClose={() => setShowPrescriptionModal(false)}
        stores={[store]}
        defaultStoreId={store.id}
        defaultStoreCategory={store.category}
        userProfile={customerUser}
        landmarks={["وسط البلد", "الحي الغربي", "الحي الشرقي", "قرب المسجد الكبير", "طريق المدرسة", "مفرق المزارع"]}
        currentLandmark="وسط البلد"
        onSubmit={(orderData) => {
          if (onSubmitCustomOrder) {
            onSubmitCustomOrder(orderData);
          }
        }}
      />

      {/* Custom Store Order Modal */}
      <CustomStoreOrderModal
        isOpen={showCustomOrderModal}
        onClose={() => setShowCustomOrderModal(false)}
        stores={[store]}
        defaultStoreId={store.id}
        userProfile={customerUser}
        landmarks={["وسط البلد", "الحي الغربي", "الحي الشرقي", "قرب المسجد الكبير", "طريق المدرسة", "مفرق المزارع"]}
        currentLandmark="وسط البلد"
        onSubmit={(orderData) => {
          if (onSubmitCustomOrder) {
            onSubmitCustomOrder(orderData);
          }
        }}
      />

      {/* Service Modal */}
      <AnimatePresence>
        {showServiceModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-right"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-slate-800 text-base">🛠️ حجز خدمة أو موعد</h3>
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleServiceSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">اسمك الكريم:</label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="الاسم الكامل"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">رقم الموبايل:</label>
                  <input
                    type="tel"
                    required
                    value={servicePhone}
                    onChange={(e) => setServicePhone(e.target.value)}
                    placeholder="09xxxxxxxx"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none text-left"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">الموعد المفضل:</label>
                  <select
                    value={serviceSchedule}
                    onChange={(e) => setServiceSchedule(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none"
                  >
                    <option value="الآن (عاجل)">الآن (عاجل في أسرع وقت)</option>
                    <option value="خلال اليوم">خلال اليوم</option>
                    <option value="غداً صباحاً">غداً صباحاً</option>
                    <option value="غداً مساءً">غداً مساءً</option>
                  </select>
                </div>

                <div>
                  <label className="font-extrabold text-slate-700 block mb-1">تفاصيل العمل أو الخدمة:</label>
                  <textarea
                    rows={3}
                    required
                    value={serviceNotes}
                    onChange={(e) => setServiceNotes(e.target.value)}
                    placeholder="اشرح العمل المطلوب والمكان بالتفصيل..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  تأكيد حجز الخدمة 🚀
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
