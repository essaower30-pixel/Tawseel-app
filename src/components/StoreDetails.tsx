import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShoppingCart, Plus, Minus, Star, Clock, Check, X, Shield, Phone, Sparkles, Send, MessageSquare, Pill, Stethoscope, ShoppingBag, Edit3, SlidersHorizontal, RotateCcw, Search, Tag, ArrowUpDown, ThumbsUp, Award, Heart, MessageCircle } from "lucide-react";
import { CartItem, Order, Product, Store, StoreAddition, StoreReview, StoreSize, UserProfile } from "../types";
import { ContactActions } from "./ContactActions";
import { PrescriptionModal } from "./PrescriptionModal";
import { CustomStoreOrderModal } from "./CustomStoreOrderModal";
import { StoreReviewModal } from "./StoreReviewModal";

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
  landmarks?: string[];
  currentLandmark?: string;
  reviews?: StoreReview[];
  onAddReview?: (review: Omit<StoreReview, "id" | "createdAt">) => void;
  userOrders?: Order[];
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
  onSubmitCustomOrder,
  landmarks = ["دوار الساعة (وسط البلد)", "تقاطع الشمال", "تقاطع الجنوب", "مفرق الشرق", "مستودع الغرب", "مسجد الروضة الكبير", "مدرسة المتفوقين الثانوية", "مستوصف القرية الصحي", "ساحة البلدية والديوان", "مجمع الياسمين السكني"],
  currentLandmark = "دوار الساعة (وسط البلد)",
  reviews = [],
  onAddReview,
  userOrders = []
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<StoreSize | null>(null);
  const [selectedAdditions, setSelectedAdditions] = useState<StoreAddition[]>([]);

  // Price & Budget Slider State
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);
  const [onlyOffers, setOnlyOffers] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc">("default");
  const [showPriceSlider, setShowPriceSlider] = useState<boolean>(false);

  // Special Modals
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showCustomOrderModal, setShowCustomOrderModal] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Main Tabs: "products" (menu) vs "reviews" (ratings & feedback)
  const [activeMainTab, setActiveMainTab] = useState<"products" | "reviews">("products");
  const [reviewStarFilter, setReviewStarFilter] = useState<"all" | "5" | "4" | "with_comments">("all");

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceName, setServiceName] = useState(customerUser?.name || "");
  const [servicePhone, setServicePhone] = useState(customerUser?.phone || "");
  const [serviceNotes, setServiceNotes] = useState("");
  const [serviceSchedule, setServiceSchedule] = useState("الآن (عاجل)");

  // Reviews list for this store
  const storeReviewsList = useMemo(() => {
    return (reviews || []).filter((r) => r.storeId === store.id);
  }, [reviews, store.id]);

  // Computed Rating Statistics
  const ratingStats = useMemo(() => {
    if (storeReviewsList.length === 0) {
      return {
        average: store.rating || 5.0,
        totalCount: store.ratingCount || 0,
        breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        hasReviews: false
      };
    }
    const sum = storeReviewsList.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = Number((sum / storeReviewsList.length).toFixed(1));
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    storeReviewsList.forEach((r) => {
      const star = Math.max(1, Math.min(5, Math.round(r.rating)));
      breakdown[star] = (breakdown[star] || 0) + 1;
    });
    return {
      average: avg,
      totalCount: storeReviewsList.length,
      breakdown,
      hasReviews: true
    };
  }, [storeReviewsList, store.rating, store.ratingCount]);

  // Filtered reviews based on user selection
  const filteredReviews = useMemo(() => {
    return storeReviewsList.filter((r) => {
      if (reviewStarFilter === "5") return r.rating === 5;
      if (reviewStarFilter === "4") return r.rating >= 4;
      if (reviewStarFilter === "with_comments") return r.comment && r.comment.trim().length > 0;
      return true;
    });
  }, [storeReviewsList, reviewStarFilter]);

  // Check if customer has an eligible completed order that can be reviewed
  const eligibleDeliveredOrder = useMemo(() => {
    if (!userOrders || userOrders.length === 0) return null;
    return userOrders.find((o) => {
      const isThisStore = o.storeId === store.id || o.storeName === store.name;
      const isDelivered = o.status === "delivered";
      const alreadyReviewed = storeReviewsList.some((r) => r.orderId === o.id);
      return isThisStore && isDelivered && !alreadyReviewed;
    });
  }, [userOrders, store.id, store.name, storeReviewsList]);

  const allStoreProducts = useMemo(() => {
    return products.filter((p) => p.storeId === store.id && !p.isHidden);
  }, [products, store.id]);

  const minStorePrice = useMemo(() => {
    if (allStoreProducts.length === 0) return 0;
    return Math.min(...allStoreProducts.map((p) => p.price));
  }, [allStoreProducts]);

  const maxStorePrice = useMemo(() => {
    if (allStoreProducts.length === 0) return 10000;
    return Math.max(...allStoreProducts.map((p) => p.price));
  }, [allStoreProducts]);

  // Current slider value (if null, equals maxStorePrice)
  const currentMaxPrice = maxPriceFilter !== null ? maxPriceFilter : maxStorePrice;

  // Step for smooth slider adjustments
  const sliderStep = useMemo(() => {
    const diff = maxStorePrice - minStorePrice;
    if (diff <= 2000) return 100;
    if (diff <= 10000) return 500;
    if (diff <= 50000) return 1000;
    return 2500;
  }, [minStorePrice, maxStorePrice]);

  const isPriceFiltered = maxPriceFilter !== null && maxPriceFilter < maxStorePrice;

  // Percentage for floating visual label badge
  const pricePercentage = useMemo(() => {
    if (maxStorePrice <= minStorePrice) return 100;
    const pct = ((currentMaxPrice - minStorePrice) / (maxStorePrice - minStorePrice)) * 100;
    return Math.min(100, Math.max(0, pct));
  }, [currentMaxPrice, minStorePrice, maxStorePrice]);

  // Filtered & Sorted products
  const storeProducts = useMemo(() => {
    return allStoreProducts
      .filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = maxPriceFilter === null ? true : p.price <= maxPriceFilter;
        const matchesOffers = onlyOffers ? !!p.isOffer : true;
        return matchesSearch && matchesPrice && matchesOffers;
      })
      .sort((a, b) => {
        if (sortBy === "price_asc") return a.price - b.price;
        if (sortBy === "price_desc") return b.price - a.price;
        return 0;
      });
  }, [allStoreProducts, searchQuery, maxPriceFilter, onlyOffers, sortBy]);

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
            <button
              type="button"
              onClick={() => setActiveMainTab("reviews")}
              className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-800 hover:border-amber-400/60 px-3.5 py-1.5 rounded-xl border border-slate-700 transition-all cursor-pointer group select-none active:scale-95"
              title="انقر لعرض آراء وتقييمات الزبائن"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:scale-115 transition-transform" />
              <span className="font-black text-amber-300">{ratingStats.average}</span>
              <span className="text-slate-400 text-[11px]">
                ({ratingStats.totalCount > 0 ? `${ratingStats.totalCount} تقييم` : "تقييم أولي"})
              </span>
            </button>

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

      {/* Main View Selector Tabs (Menu vs Reviews) */}
      <div className="flex items-center p-1.5 bg-slate-200/70 backdrop-blur-xs rounded-2xl border border-slate-200 gap-1.5 select-none">
        <button
          type="button"
          onClick={() => setActiveMainTab("products")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeMainTab === "products"
              ? "bg-white text-orange-600 shadow-sm border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>الأصناف والمنتجات ({allStoreProducts.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("reviews")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
            activeMainTab === "reviews"
              ? "bg-white text-orange-600 shadow-sm border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
          }`}
        >
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>تقييمات وآراء الزبائن ({storeReviewsList.length})</span>
          <span className="bg-amber-100 text-amber-800 font-black text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
            {ratingStats.average} ★
          </span>
        </button>
      </div>

      {/* Main Tab 1: Products & Menu */}
      {activeMainTab === "products" && (
        <>
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

      {/* Search & Price Filter Controls */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Input with Clear Button */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن صنف أو منتج داخل هذا المتجر..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 focus:bg-white rounded-2xl py-2.5 pr-10 pl-9 text-xs font-bold outline-none text-slate-800 transition-all text-right"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls: Price Slider Toggle, Offers Toggle, Sort */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Price Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPriceSlider(!showPriceSlider)}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-black py-2.5 px-2.5 sm:px-3.5 rounded-2xl border transition-all cursor-pointer select-none active:scale-95 ${
                isPriceFiltered || showPriceSlider
                  ? "bg-orange-500 text-white border-orange-600 shadow-md shadow-orange-500/20 ring-2 ring-orange-400/30"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">نطاق السعر</span>
              {isPriceFiltered && (
                <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
              )}
            </button>

            {/* Special Offers Toggle Button */}
            <button
              type="button"
              onClick={() => setOnlyOffers(!onlyOffers)}
              className={`flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-black py-2.5 px-2.5 sm:px-3.5 rounded-2xl border transition-all cursor-pointer select-none active:scale-95 ${
                onlyOffers
                  ? "bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/20 ring-2 ring-rose-400/30"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">العروض 🔥</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 py-2.5 px-2 sm:px-3 rounded-2xl text-[11px] sm:text-xs font-bold outline-none cursor-pointer text-right appearance-none pr-2 sm:pr-3 pl-6 sm:pl-8 truncate"
              >
                <option value="default">الترتيب: الافتراضي</option>
                <option value="price_asc">الأقل سعراً ⬆️</option>
                <option value="price_desc">الأعلى سعراً ⬇️</option>
              </select>
              <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Interactive Price Range Slider Section with Visual Indicator */}
        <AnimatePresence>
          {(showPriceSlider || isPriceFiltered) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden pt-1"
            >
              <div className="bg-gradient-to-br from-orange-50/90 via-amber-50/70 to-orange-100/40 p-3.5 sm:p-4 rounded-3xl border border-orange-200/90 shadow-sm space-y-4">
                {/* Header of the Slider Card */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-500/20">
                      💰
                    </span>
                    <div>
                      <h5 className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                        <span>تصفية الأصناف حسب الميزانية</span>
                        {isPriceFiltered && (
                          <span className="text-[10px] bg-orange-200/80 text-orange-900 font-extrabold px-2 py-0.5 rounded-full">
                            مفلتر
                          </span>
                        )}
                      </h5>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 font-semibold leading-tight">
                        اسحب المؤشر لتحديد سقف السعر الأقصى
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isPriceFiltered && (
                      <button
                        type="button"
                        onClick={() => setMaxPriceFilter(null)}
                        className="text-[10px] sm:text-[11px] text-slate-600 hover:text-red-600 bg-white hover:bg-red-50 border border-slate-200 hover:border-red-200 py-1.5 px-2.5 rounded-xl flex items-center gap-1 font-bold cursor-pointer transition-all active:scale-95 shadow-xs"
                        title="إلغاء تصفية السعر"
                      >
                        <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>إعادة ضبط</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Floating Visual Price Indicator & Track */}
                <div className="relative pt-6 pb-2 px-1 select-none">
                  {/* Floating Dynamic Label Indicator (Follows thumb smoothly) */}
                  <div
                    className="absolute top-0 -translate-x-1/2 transition-all duration-75 pointer-events-none z-10"
                    style={{ left: `${pricePercentage}%` }}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="bg-slate-900 text-white text-[10px] sm:text-xs font-black py-1 px-2.5 rounded-xl shadow-lg shadow-slate-900/30 whitespace-nowrap flex items-center gap-1 border border-slate-700">
                        <span>حتى</span>
                        <span className="text-amber-400 font-extrabold text-xs sm:text-sm">
                          {currentMaxPrice.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-slate-300">ل.س</span>
                      </div>
                      {/* Downward triangle pointer */}
                      <div className="w-0 h-0 border-x-4 border-x-transparent border-t-[5px] border-t-slate-900 -mt-[1px]" />
                    </div>
                  </div>

                  {/* Range Track & Input */}
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min={minStorePrice}
                      max={maxStorePrice}
                      step={sliderStep}
                      value={currentMaxPrice}
                      onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                      className="w-full h-3 bg-slate-200/90 rounded-full appearance-none cursor-pointer accent-orange-500 hover:accent-orange-600 focus:outline-none transition-all touch-none"
                    />
                  </div>

                  {/* Min / Max Range Markers */}
                  <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-black text-slate-500 px-1 pt-2">
                    <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-orange-200/60 shadow-xs">
                      الحد الأدنى: {minStorePrice.toLocaleString()} ل.س
                    </span>
                    <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-orange-200/60 shadow-xs">
                      الحد الأقصى: {maxStorePrice.toLocaleString()} ل.س
                    </span>
                  </div>
                </div>

                {/* Quick Budget Presets Chips (Optimized for mobile touch) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-orange-200/70">
                  <span className="text-[10px] font-black text-slate-600 ml-1">ميزانيات جاهزة:</span>
                  <button
                    type="button"
                    onClick={() => setMaxPriceFilter(null)}
                    className={`text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer border active:scale-95 ${
                      maxPriceFilter === null
                        ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-orange-50"
                    }`}
                  >
                    عرض كل الأسعار
                  </button>
                  {maxStorePrice > minStorePrice && (
                    <>
                      <button
                        type="button"
                        onClick={() => setMaxPriceFilter(Math.round(minStorePrice + (maxStorePrice - minStorePrice) * 0.33))}
                        className={`text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer border active:scale-95 ${
                          maxPriceFilter === Math.round(minStorePrice + (maxStorePrice - minStorePrice) * 0.33)
                            ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-orange-50"
                        }`}
                      >
                        اقتصادي ({Math.round(minStorePrice + (maxStorePrice - minStorePrice) * 0.33).toLocaleString()} ل.س)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMaxPriceFilter(Math.round(minStorePrice + (maxStorePrice - minStorePrice) * 0.66))}
                        className={`text-[10px] sm:text-[11px] font-black px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer border active:scale-95 ${
                          maxPriceFilter === Math.round(minStorePrice + (maxStorePrice - minStorePrice) * 0.66)
                            ? "bg-orange-600 text-white border-orange-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-orange-50"
                        }`}
                      >
                        متوسط ({Math.round(minStorePrice + (maxStorePrice - minStorePrice) * 0.66).toLocaleString()} ل.س)
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Summary Bar */}
        {(searchQuery || isPriceFiltered || onlyOffers || sortBy !== "default") && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-slate-600">
              <span>الفلاتر النشطة:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg border border-slate-200">
                  بحث: "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery("")} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {isPriceFiltered && (
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-900 px-2 py-0.5 rounded-lg border border-orange-200">
                  سعر ≤ {currentMaxPrice.toLocaleString()} ل.س
                  <button type="button" onClick={() => setMaxPriceFilter(null)} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {onlyOffers && (
                <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 px-2 py-0.5 rounded-lg border border-rose-200">
                  العروض فقط
                  <button type="button" onClick={() => setOnlyOffers(false)} className="hover:text-red-500 cursor-pointer">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <div className="text-[11px] font-black text-slate-500">
              عرض {storeProducts.length} من أصل {allStoreProducts.length} منتج
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {storeProducts.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200/80 space-y-4">
            <p className="text-4xl">🔍</p>
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                {isPriceFiltered || searchQuery || onlyOffers
                  ? "لا توجد أصناف تطابق معايير التصفية المحددة"
                  : "لا توجد منتجات مسجلة حالياً في هذا المتجر"}
              </h4>
              <p className="text-slate-500 text-xs max-w-md mx-auto">
                {isPriceFiltered || searchQuery || onlyOffers
                  ? "جرّب توسيع نطاق السعر أو إلغاء كلمة البحث، أو اطلب ما تريده مباشرة كطلب خاص وسنقوم بتأمينه لك."
                  : `لا تقلق! يمكنك إرسال طلبك الخاص وسيقوم متجر (${store.name}) بتأمينه لك فوراً.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {(isPriceFiltered || searchQuery || onlyOffers) && (
                <button
                  type="button"
                  onClick={() => {
                    setMaxPriceFilter(null);
                    setSearchQuery("");
                    setOnlyOffers(false);
                  }}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 px-5 rounded-2xl transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إلغاء كافة الفلاتر</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowCustomOrderModal(true)}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs py-2.5 px-6 rounded-2xl shadow-sm cursor-pointer transition-all active:scale-95"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>طلب هذا المنتج بالاسم / بالصورة 🛍️</span>
              </button>
            </div>
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
        </>
      )}

      {/* Main Tab 2: Store Reviews & Ratings */}
      {activeMainTab === "reviews" && (
        <div className="space-y-6">
          {/* Ratings Overview Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left: Overall Big Score */}
              <div className="flex flex-col items-center justify-center text-center p-5 bg-gradient-to-b from-amber-50 to-orange-50/50 rounded-3xl border border-amber-200/80 w-full md:w-64 shrink-0 space-y-2">
                <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                  {ratingStats.average}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(ratingStats.average)
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-300 stroke-[1.5]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs font-black text-slate-600">
                  {ratingStats.totalCount > 0
                    ? `بناءً على ${ratingStats.totalCount} تقييم من الزبائن`
                    : "لا توجد تقييمات مسجلة بعد"}
                </p>
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-amber-200/60 text-amber-900 rounded-full text-[10px] font-black">
                  <Award className="w-3 h-3 text-amber-700" />
                  <span>متجر معتمد بالقرية</span>
                </div>
              </div>

              {/* Right: Star Distribution Bars */}
              <div className="flex-1 w-full space-y-2.5">
                <h4 className="text-xs font-black text-slate-700 mb-2">توزيع التقييمات حسب النجوم:</h4>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = (ratingStats.breakdown as any)[star] || 0;
                  const pct = ratingStats.totalCount > 0 ? Math.round((count / ratingStats.totalCount) * 100) : 0;
                  return (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-bold text-slate-600 text-left flex items-center justify-end gap-1 shrink-0" dir="ltr">
                        <span>{star}</span>
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      </span>
                      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 relative">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            star >= 4
                              ? "bg-amber-400"
                              : star === 3
                              ? "bg-yellow-400"
                              : "bg-orange-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-16 text-slate-500 font-bold text-[11px] text-right shrink-0">
                        {count} ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Write Review Callout Banner */}
            <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                  ⭐
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-xs sm:text-sm">
                    {eligibleDeliveredOrder
                      ? "🎉 قمت بالشراء من هذا المتجر مؤخراً! شاركنا تقييمك"
                      : "هل قمت بالطلب من هذا المتجر؟"}
                  </h4>
                  <p className="text-slate-600 text-[11px] font-semibold mt-0.5">
                    {eligibleDeliveredOrder
                      ? "رأيك يساعد أهل القرية في التعرف على جودة الخدمة والأصناف المميزة."
                      : "التقييمات مخصصة لزبائن المنصة بعد إتمام الطلب وتوصيله لضمان أعلى مصداقية."}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5 active:scale-95 shrink-0"
              >
                <Star className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                <span>أضف تقييمك وتجربتك ⭐</span>
              </button>
            </div>

            {/* Filter Chips Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-black text-slate-600 ml-1">تصفية التقييمات:</span>
                <button
                  type="button"
                  onClick={() => setReviewStarFilter("all")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    reviewStarFilter === "all"
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  الكل ({storeReviewsList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStarFilter("5")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    reviewStarFilter === "5"
                      ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  5 نجوم فقط ⭐ ({ratingStats.breakdown[5] || 0})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStarFilter("4")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    reviewStarFilter === "4"
                      ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  4 نجوم فأعلى 🌟 ({(ratingStats.breakdown[5] || 0) + (ratingStats.breakdown[4] || 0)})
                </button>
                <button
                  type="button"
                  onClick={() => setReviewStarFilter("with_comments")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    reviewStarFilter === "with_comments"
                      ? "bg-orange-500 text-white border-orange-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  مع تعليق نصي 💬 ({storeReviewsList.filter((r) => r.comment && r.comment.trim()).length})
                </button>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto text-2xl">
                ⭐
              </div>
              <h4 className="font-extrabold text-slate-800 text-base">لا توجد مراجعات تطابق الفلتر المختار</h4>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                جرّب اختيار فلتر آخر أو كن أول من يكتب مراجعة لهذا المتجر بعد استلام طلبك!
              </p>
              <button
                type="button"
                onClick={() => setReviewStarFilter("all")}
                className="text-xs font-bold text-orange-600 hover:underline cursor-pointer pt-1"
              >
                عرض جميع التقييمات
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3 text-right"
                >
                  <div className="space-y-2.5">
                    {/* Review Card Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-400 to-amber-500 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                          {rev.customerName ? rev.customerName.charAt(0) : "ز"}
                        </div>
                        <div>
                          <h5 className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                            <span>{rev.customerName || "زبون المنصة"}</span>
                            <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-md font-bold">
                              ✓ مشتري معتمد
                            </span>
                          </h5>
                          <span className="text-[10px] text-slate-400 font-semibold block">
                            {new Date(rev.createdAt).toLocaleDateString("ar-SY", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Stars Badge */}
                      <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200/70 px-2 py-1 rounded-xl shrink-0">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-black text-amber-800 text-xs">{rev.rating}.0</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {rev.tags && rev.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {rev.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Comment Text */}
                    {rev.comment && (
                      <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                        "{rev.comment}"
                      </p>
                    )}
                  </div>

                  {/* Owner Reply if available */}
                  {rev.reply && (
                    <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-3 space-y-1 mt-1 text-right">
                      <div className="flex items-center gap-1.5 text-[11px] font-black text-orange-900">
                        <MessageCircle className="w-3.5 h-3.5 text-orange-600" />
                        <span>رد صاحب المتجر ({store.name}):</span>
                      </div>
                      <p className="text-xs text-orange-800 font-semibold leading-relaxed">
                        {rev.reply}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
        landmarks={landmarks}
        currentLandmark={currentLandmark}
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
        landmarks={landmarks}
        currentLandmark={currentLandmark}
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

      {/* Store Review Modal */}
      <StoreReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        storeName={store.name}
        storeId={store.id}
        orderId={eligibleDeliveredOrder?.id}
        customerName={customerUser?.name || "زبون المنصة"}
        customerPhone={customerUser?.phone}
        onSubmit={(reviewData) => {
          if (onAddReview) {
            onAddReview(reviewData);
          }
        }}
      />
    </div>
  );
};
