import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShoppingBag,
  ShoppingCart,
  Store as StoreIcon,
  Search,
  MapPin,
  Sparkles,
  ArrowLeft,
  LogOut,
  Star,
  Clock,
  Send,
  Flame,
  ShieldCheck,
  Bike,
  LogIn,
  Utensils,
  Pill,
  Leaf,
  CakeSlice,
  Stethoscope,
  Wrench,
  Car,
  QrCode,
  Share2,
  Copy,
  Check,
  Tag,
  MessageSquare,
  AlertTriangle,
  Lock,
  Plus,
  Minus,
  Compass,
  Smartphone,
  Phone,
  Archive
} from "lucide-react";
import { CartItem, Category, DriverMember, MapNode, Order, Product, Store, StoreAddition, StoreSize, UserProfile } from "./types";
import { initialCategories, initialMapNodes, initialProducts, initialStores } from "./data/initialData";
import { initialDrivers, initialOrders } from "./data/adminInitialData";
import { AuthModal } from "./components/AuthModal";
import { StoreDetails } from "./components/StoreDetails";
import { CartCheckout } from "./components/CartCheckout";
import { OrderTracker } from "./components/OrderTracker";
import { Dashboard } from "./components/Dashboards";
import { DriverPortal } from "./components/DriverPortal";
import { StoreOwnerPortal } from "./components/StoreOwnerPortal";
import { CustomerOrdersArchiveModal } from "./components/CustomerOrdersArchiveModal";
import { InstallPromptModal } from "./components/InstallPromptModal";
import { openWhatsApp } from "./utils/whatsapp";

// Category Icon Helper Component
function CategoryIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "Utensils":
      return <Utensils className={className} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "Pill":
      return <Pill className={className} />;
    case "Leaf":
      return <Leaf className={className} />;
    case "CakeSlice":
      return <CakeSlice className={className} />;
    case "Stethoscope":
      return <Stethoscope className={className} />;
    case "Wrench":
      return <Wrench className={className} />;
    case "Car":
      return <Car className={className} />;
    default:
      return <StoreIcon className={className} />;
  }
}

export const OFFICIAL_APP_URL = "https://essaower30-pixel.github.io/Tawseel-app/";

export default function App() {
  // Global State with LocalStorage Persistence
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem("tw_cart_items");
    return raw ? JSON.parse(raw) : [];
  });
  const [isViewingCart, setIsViewingCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Data State
  const [stores, setStores] = useState<Store[]>(() => {
    const raw = localStorage.getItem("tw_stores");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    return initialStores;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const raw = localStorage.getItem("tw_products");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    return initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const raw = localStorage.getItem("tw_categories");
    return raw ? JSON.parse(raw) : initialCategories;
  });

  const [mapNodes, setMapNodes] = useState<MapNode[]>(() => {
    const raw = localStorage.getItem("tw_map_nodes");
    return raw ? JSON.parse(raw) : initialMapNodes;
  });

  // User & Role State
  const [userRole, setUserRole] = useState<"guest" | "customer" | "store_owner" | "admin" | "driver">(() => {
    return (localStorage.getItem("tw_user_role") as any) || "customer";
  });

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showCustomerArchiveModal, setShowCustomerArchiveModal] = useState<boolean>(false);

  const [currentStoreId, setCurrentStoreId] = useState<string | null>(() => {
    return localStorage.getItem("tw_current_store_id") || null;
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    const raw = localStorage.getItem("tw_viewing_admin");
    return localStorage.getItem("tw_user_role") === "admin" ? raw !== "false" : raw === "true";
  });

  const [isDriverMode, setIsDriverMode] = useState<boolean>(() => {
    const raw = localStorage.getItem("tw_viewing_driver");
    return localStorage.getItem("tw_user_role") === "driver" ? raw !== "false" : raw === "true";
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const raw = localStorage.getItem("tw_customer_user") || localStorage.getItem("tw_user_profile");
    return raw ? JSON.parse(raw) : { name: "أحمد العلي", phone: "0988776655", pin: "1234" };
  });

  // Admin PIN Gate Modal
  const [showAdminPinModal, setShowAdminPinModal] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState("");
  const ADMIN_SECRET_PIN = "1234";

  // Drivers Fleet State
  const [driversList, setDriversList] = useState<DriverMember[]>(() => {
    try {
      const raw = localStorage.getItem("tw_drivers_list");
      return raw ? JSON.parse(raw) : initialDrivers;
    } catch {
      return initialDrivers;
    }
  });

  // Active Order State
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    try {
      const raw = localStorage.getItem("tw_active_order");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [allOrders, setAllOrders] = useState<Order[]>(() => {
    try {
      const raw = localStorage.getItem("tw_orders_list") || localStorage.getItem("tw_all_orders");
      return raw ? JSON.parse(raw) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [selectedLandmark, setSelectedLandmark] = useState<string>("center");
  const [emergencyRush, setEmergencyRush] = useState<boolean>(() => {
    return localStorage.getItem("tw_emergency_rush") === "true";
  });

  // Auto-scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedStore, isViewingCart, activeOrder, isAdminMode, isDriverMode]);

  // Synchronize Storage
  useEffect(() => {
    localStorage.setItem("tw_stores", JSON.stringify(stores));
  }, [stores]);

  useEffect(() => {
    localStorage.setItem("tw_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("tw_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("tw_map_nodes", JSON.stringify(mapNodes));
  }, [mapNodes]);

  useEffect(() => {
    localStorage.setItem("tw_cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("tw_drivers_list", JSON.stringify(driversList));
  }, [driversList]);

  useEffect(() => {
    localStorage.setItem("tw_viewing_admin", String(isAdminMode));
  }, [isAdminMode]);

  useEffect(() => {
    localStorage.setItem("tw_viewing_driver", String(isDriverMode));
  }, [isDriverMode]);

  useEffect(() => {
    if (currentStoreId) {
      localStorage.setItem("tw_current_store_id", currentStoreId);
    } else {
      localStorage.removeItem("tw_current_store_id");
    }
  }, [currentStoreId]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem("tw_active_order", JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem("tw_active_order");
    }
  }, [activeOrder]);

  useEffect(() => {
    localStorage.setItem("tw_orders_list", JSON.stringify(allOrders));
  }, [allOrders]);

  // Dynamic Live Sync: Keep active customer order updated with assigned driver & status in real-time
  useEffect(() => {
    if (activeOrder) {
      const fresh = allOrders.find((o) => o.id === activeOrder.id);
      if (
        fresh &&
        (fresh.status !== activeOrder.status ||
          fresh.driverName !== activeOrder.driverName ||
          fresh.driverPhone !== activeOrder.driverPhone ||
          fresh.driverVehicle !== activeOrder.driverVehicle)
      ) {
        setActiveOrder(fresh);
      }
    }
  }, [allOrders]);

  const handleUpdateOrderStatus = (orderId: string, status: any) => {
    setAllOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated = { ...o, status };
          if (activeOrder && activeOrder.id === orderId) {
            setActiveOrder(updated);
          }
          return updated;
        }
        return o;
      })
    );
  };

  const handleAssignDriverToOrder = (orderId: string, driver: DriverMember | null) => {
    setAllOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updated: Order = {
            ...o,
            driverId: driver ? driver.id : undefined,
            driverName: driver ? driver.name : undefined,
            driverPhone: driver ? driver.phone : undefined,
            driverVehicle: driver ? (driver.vehicle || "دراجة نارية") : undefined,
            assignedAt: driver ? new Date().toISOString() : undefined,
            // When driver is assigned to a pending order, move status to accepted automatically
            status: o.status === "pending" && driver ? "accepted" : o.status
          };
          if (activeOrder && activeOrder.id === orderId) {
            setActiveOrder(updated);
          }
          return updated;
        }
        return o;
      })
    );
  };

  useEffect(() => {
    if (userRole) {
      localStorage.setItem("tw_user_role", userRole);
    }
    if (userProfile) {
      localStorage.setItem("tw_customer_user", JSON.stringify(userProfile));
      localStorage.setItem("tw_user_profile", JSON.stringify(userProfile));
    }
  }, [userRole, userProfile]);

  // Handlers for Cart
  const handleAddToCart = (product: Product, selectedSize?: StoreSize, selectedAdditions: StoreAddition[] = []) => {
    if (cartItems.length > 0 && cartItems[0].product.storeId !== product.storeId) {
      const confirmClear = window.confirm(
        "لقد قمت بإضافة منتج من متجر مختلف. هل تود إفراغ السلة وتحديثها بمنتجات المتجر الجديد؟"
      );
      if (!confirmClear) return;
      const basePrice = selectedSize ? selectedSize.price : product.price;
      const additionsTotal = selectedAdditions.reduce((sum, a) => sum + a.price, 0);
      setCartItems([
        {
          product,
          quantity: 1,
          selectedSize,
          selectedAdditions,
          totalItemPrice: basePrice + additionsTotal
        }
      ]);
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => {
        if (item.product.id !== product.id) return false;
        const sameSize = (item.selectedSize?.name || "") === (selectedSize?.name || "");
        const itemAdditions = item.selectedAdditions?.map((a) => a.name).sort().join(",") || "";
        const targetAdditions = selectedAdditions.map((a) => a.name).sort().join(",") || "";
        return sameSize && itemAdditions === targetAdditions;
      });

      if (existing) {
        return prev.map((item) => {
          if (item === existing) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      }

      const basePrice = selectedSize ? selectedSize.price : product.price;
      const additionsTotal = selectedAdditions.reduce((sum, a) => sum + a.price, 0);
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize,
          selectedAdditions,
          totalItemPrice: basePrice + additionsTotal
        }
      ];
    });
  };

  const handleRemoveFromCart = (product: Product, selectedSize?: StoreSize, selectedAdditions: StoreAddition[] = []) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => {
        if (item.product.id !== product.id) return false;
        const sameSize = (item.selectedSize?.name || "") === (selectedSize?.name || "");
        const itemAdditions = item.selectedAdditions?.map((a) => a.name).sort().join(",") || "";
        const targetAdditions = selectedAdditions.map((a) => a.name).sort().join(",") || "";
        return sameSize && itemAdditions === targetAdditions;
      });

      if (!existing) return prev;

      if (existing.quantity === 1) {
        return prev.filter((item) => item !== existing);
      } else {
        return prev.map((item) => (item === existing ? { ...item, quantity: item.quantity - 1 } : item));
      }
    });
  };

  const handleCheckout = (orderData: any) => {
    const store = stores.find((s) => s.id === orderData.storeId);
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee = store ? store.deliveryFee : 5;
    const total = subtotal + deliveryFee;
    const orderId = orderData.id || "tw-" + Math.floor(Math.random() * 90000 + 10000);

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: "pending",
      subtotal,
      deliveryFee,
      total,
      storeName: store ? store.name : "متجر القرية",
      ...orderData
    };

    setActiveOrder(newOrder);
    setAllOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
    setCartItems([]);
    setIsViewingCart(false);
  };

  const handleCustomOrder = (customData: any) => {
    const orderId = "tw-" + Math.floor(Math.random() * 90000 + 10000);
    const newOrder: Order = {
      id: orderId,
      status: "pending",
      createdAt: new Date().toISOString(),
      items: [],
      subtotal: 0,
      deliveryFee: 5,
      total: 5,
      storeId: customData.storeId || "custom_order",
      storeName: customData.storeName || "طلب مخصص",
      customerName: customData.customerName || userProfile?.name || "زبون القرية",
      customerPhone: customData.customerPhone || userProfile?.phone || "09xxxxxxxx",
      addressLandmark: selectedLandmark,
      ...customData
    };

    setActiveOrder(newOrder);
    setAllOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
  };

  const handleAuthSuccess = (profile: UserProfile, role: "customer" | "store_owner" | "admin" | "driver") => {
    localStorage.setItem("tw_customer_user", JSON.stringify(profile));
    localStorage.setItem("tw_user_role", role);
    setUserProfile(profile);
    setUserRole(role);
    setShowAuthModal(false);
    if (role === "driver") {
      setIsDriverMode(true);
      setIsAdminMode(false);
      setSelectedStore(null);
      setIsViewingCart(false);
      localStorage.setItem("tw_viewing_driver", "true");
      localStorage.setItem("tw_viewing_admin", "false");
    } else if (role === "admin") {
      setIsAdminMode(true);
      setIsDriverMode(false);
      setSelectedStore(null);
      setIsViewingCart(false);
      localStorage.setItem("tw_viewing_admin", "true");
      localStorage.setItem("tw_viewing_driver", "false");
    } else if (role === "store_owner" && profile.storeId) {
      setCurrentStoreId(profile.storeId);
      localStorage.setItem("tw_current_store_id", profile.storeId);
      setIsAdminMode(false);
      setIsDriverMode(false);
      setSelectedStore(null);
      setIsViewingCart(false);
    } else {
      setIsAdminMode(false);
      setIsDriverMode(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("tw_customer_user");
    localStorage.removeItem("tw_user_role");
    localStorage.removeItem("tw_current_store_id");
    localStorage.removeItem("tw_viewing_admin");
    localStorage.removeItem("tw_viewing_driver");
    setUserProfile(null);
    setUserRole("guest");
    setCurrentStoreId(null);
    setCartItems([]);
    setActiveOrder(null);
    setSelectedStore(null);
    setIsViewingCart(false);
    setIsAdminMode(false);
    setIsDriverMode(false);
    setShowAuthModal(true);
  };

  const handleShareWhatsApp = (type: "regular" | "business") => {
    const text = `السلام عليكم ورحمة الله وبركاته 🛍️ تصفح واطلب من تطبيق "توصيل" للقرية - توصيل سريع للمأكولات، التموينات، والصيدلية إلى عتبة بيتك!\nرابط التطبيق الرسمي المباشر:\n${OFFICIAL_APP_URL}`;
    openWhatsApp({
      message: text,
      type
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(OFFICIAL_APP_URL);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Filtered Stores
  const visibleStores = stores.filter((store) => {
    if (store.isApproved === false) return false;
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (store.description && store.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (store.featuredProduct && store.featuredProduct.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const offerProducts = products.filter((p) => p.isOffer);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // If user is guest and no profile exists
  if (userRole === "guest" && !userProfile) {
    return (
      <AuthModal
        onRegister={handleAuthSuccess}
        stores={stores}
        onAddStore={(newStore) => setStores((prev) => [...prev, newStore])}
        activeOrder={activeOrder}
        onTrackOrder={() => {
          if (activeOrder) {
            setUserRole("customer");
          }
        }}
        onClose={() => {
          const guestProfile: UserProfile = { name: "زائر متسوق", phone: "09xxxxxxxx", pin: "1234" };
          setUserProfile(guestProfile);
          setUserRole("customer");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950 pb-12" dir="rtl">
      {/* Top Application Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-4 px-4 sm:px-6 sticky top-0 z-50 shadow-xs select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div
            onClick={() => {
              if (!activeOrder) {
                setSelectedStore(null);
                setIsViewingCart(false);
                setIsAdminMode(false);
                setIsDriverMode(false);
              }
            }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-orange-500 flex items-center justify-center shadow-md border border-slate-800">
              <Bike className="w-5.5 h-5.5 animate-bounce-slow" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base sm:text-xl tracking-tight leading-none">
                توصيل
              </h1>
              <p className="text-[9px] text-slate-400 font-bold leading-none mt-1 hidden xs:block">
                توصيل المتاجر والقرية
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {activeOrder ? (
              <button
                type="button"
                onClick={() => {
                  setSelectedStore(null);
                  setIsViewingCart(false);
                  setIsAdminMode(false);
                }}
                className="bg-orange-500 text-white hover:bg-orange-600 font-extrabold text-xs py-2 px-4 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block" />
                <span>تتبع طلبك الحالي</span>
              </button>
            ) : (
              <>
                {/* Login Button in Header (Always shows text 'تسجيل الدخول') */}
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="py-2 px-3 sm:px-4 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700 transition-all cursor-pointer flex items-center justify-center gap-1.5 text-xs font-black shadow-xs active:scale-95 whitespace-nowrap"
                  title="تسجيل الدخول / تبديل الحساب"
                >
                  <LogIn className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>تسجيل الدخول</span>
                </button>

                {/* Admin Mode Switch Button */}
                {userRole === "admin" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (isAdminMode) {
                        setIsAdminMode(false);
                      } else {
                        setAdminPinInput("");
                        setAdminPinError("");
                        setShowAdminPinModal(true);
                      }
                      setIsDriverMode(false);
                      setSelectedStore(null);
                      setIsViewingCart(false);
                    }}
                    className={`p-2.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-extrabold shadow-xs ${
                      isAdminMode
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                    title={isAdminMode ? "لوحة الزبون" : "لوحة المدير"}
                  >
                    <ShieldCheck className={`w-4 h-4 ${isAdminMode ? "text-orange-500 animate-pulse" : "text-orange-500"}`} />
                    <span className="hidden xs:inline-block">
                      {isAdminMode ? "لوحة الزبون" : "لوحة المدير"}
                    </span>
                  </button>
                )}

                {/* Driver Mode Switch Button */}
                {userRole === "admin" && !isAdminMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDriverMode(!isDriverMode);
                      setIsViewingCart(false);
                      setSelectedStore(null);
                    }}
                    className={`p-2.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-extrabold shadow-xs ${
                      isDriverMode
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                    title={isDriverMode ? "لوحة الزبون" : "لوحة السائق"}
                  >
                    <Bike className={`w-4 h-4 ${isDriverMode ? "text-orange-500 animate-pulse" : "text-slate-500"}`} />
                    <span className="hidden xs:inline-block">
                      {isDriverMode ? "لوحة الزبون" : "لوحة السائق"}
                    </span>
                  </button>
                )}

                {/* Return to Driver Board if Driver */}
                {userRole === "driver" && !isDriverMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDriverMode(true);
                      setIsViewingCart(false);
                      setSelectedStore(null);
                    }}
                    className="p-2.5 sm:p-2 rounded-xl border border-orange-500 bg-orange-500 text-white font-extrabold text-xs shadow-xs cursor-pointer flex items-center gap-1.5 hover:bg-orange-600 transition-all animate-pulse"
                    title="العودة للوحة القيادة ومراقبة الطلبات"
                  >
                    <Bike className="w-4 h-4" />
                    <span>العودة للوحة السائق 🏍️</span>
                  </button>
                )}

                {/* Customer Orders Archive Button */}
                {!isAdminMode && !isDriverMode && (
                  <button
                    type="button"
                    onClick={() => setShowCustomerArchiveModal(true)}
                    className="p-2.5 sm:py-2 sm:px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-xs active:scale-95 whitespace-nowrap"
                    title="أرشيف وسجل طلباتي السابقة"
                  >
                    <Archive className="w-4 h-4 text-orange-600" />
                    <span className="hidden sm:inline-block">أرشيف طلباتي</span>
                  </button>
                )}

                {/* Cart Button */}
                {!isAdminMode && !isDriverMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStore(null);
                      setIsViewingCart(true);
                    }}
                    className={`relative p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                      cartItems.length > 0
                        ? "bg-orange-500 border-white text-white shadow-lg shadow-orange-500/15 font-extrabold text-xs px-2.5 sm:px-3.5"
                        : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="hidden xs:inline-block">
                      {cartItems.length > 0 ? `السلة (${totalCartCount})` : "السلة"}
                    </span>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-slate-900 text-white rounded-full text-[10px] flex items-center justify-center font-extrabold border border-white">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                )}


              </>
            )}

            {/* Back to Home Button */}
            {userProfile && (isAdminMode || isDriverMode || selectedStore || isViewingCart) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedStore(null);
                  setIsViewingCart(false);
                  setIsAdminMode(false);
                  setIsDriverMode(false);
                }}
                className="py-2 px-3 sm:px-4 rounded-xl border border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600 transition-all cursor-pointer flex items-center gap-1.5 font-black text-xs sm:text-sm shadow-xs animate-fade-in"
                title="الرجوع للقائمة الرئيسية"
              >
                <ArrowLeft className="w-4 h-4 text-orange-600" />
                <span>الرئيسية / عودة</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full relative min-h-[500px]">
        {/* Router Views with Smooth Transition */}
        <AnimatePresence mode="wait">
          {userRole === "store_owner" && currentStoreId ? (
            <motion.div
              key={`store_owner_${currentStoreId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <StoreOwnerPortal
                storeId={currentStoreId}
                stores={stores}
                products={products}
                orders={allOrders}
                categories={categories}
                userProfile={userProfile!}
                onUpdateStore={(s) => setStores((prev) => prev.map((item) => (item.id === s.id ? s : item)))}
                onAddProduct={(p) => setProducts((prev) => [...prev, p])}
                onUpdateProduct={(p) => setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)))}
                onDeleteProduct={(id) => setProducts((prev) => prev.filter((item) => item.id !== id))}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onLogout={handleLogout}
                onBackToCustomerView={() => {
                  setUserRole("customer");
                  setCurrentStoreId(null);
                }}
                currency="ل.س"
              />
            </motion.div>
          ) : isAdminMode && userRole === "admin" ? (
            <motion.div
              key="admin_dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Dashboard
                userRole="admin"
                userProfile={userProfile!}
                stores={stores}
                products={products}
                orders={allOrders}
                categories={categories}
                mapNodes={mapNodes}
                onAddStore={(s) => setStores((prev) => [...prev, s])}
                onUpdateStore={(s) => setStores((prev) => prev.map((item) => (item.id === s.id ? s : item)))}
                onDeleteStore={(id) => setStores((prev) => prev.filter((item) => item.id !== id))}
                onAddProduct={(p) => setProducts((prev) => [...prev, p])}
                onUpdateProduct={(p) => setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)))}
                onDeleteProduct={(id) => setProducts((prev) => prev.filter((item) => item.id !== id))}
                onAddCategory={(cat) => setCategories((prev) => [...prev, cat])}
                onDeleteCategory={(catId) => setCategories((prev) => prev.filter((c) => c.id !== catId))}
                onAddMapNode={(node) => setMapNodes((prev) => [...prev, node])}
                onDeleteMapNode={(nodeId) => setMapNodes((prev) => prev.filter((n) => n.id !== nodeId))}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onAssignDriver={handleAssignDriverToOrder}
                onLogout={handleLogout}
              />
            </motion.div>
          ) : (userRole === "driver" && isDriverMode) || (userRole === "admin" && isDriverMode) ? (
            <motion.div
              key="driver_dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DriverPortal
                userProfile={userProfile!}
                orders={allOrders}
                stores={stores}
                driversList={driversList}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onAssignDriver={handleAssignDriverToOrder}
                onLogout={handleLogout}
                onBackToCustomerView={() => {
                  setIsDriverMode(false);
                  setUserRole("customer");
                }}
                currency="ل.س"
              />
            </motion.div>
          ) : activeOrder ? (
            <motion.div
              key={`order_tracker_${activeOrder.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <OrderTracker
                order={activeOrder}
                onBack={() => setActiveOrder(null)}
                mapNodes={mapNodes}
                stores={stores}
                onCancelOrder={handleUpdateOrderStatus}
              />
            </motion.div>
          ) : isViewingCart ? (
            <motion.div
              key="cart_checkout"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <CartCheckout
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={() => setCartItems([])}
                onCheckout={handleCheckout}
                onBackToShopping={() => setIsViewingCart(false)}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={setSelectedLandmark}
                customerUser={userProfile}
                mapNodes={mapNodes}
                stores={stores}
              />
            </motion.div>
          ) : selectedStore ? (
            <motion.div
              key={`store_details_${selectedStore.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <StoreDetails
                store={stores.find((st) => st.id === selectedStore.id) || selectedStore}
                onBack={() => setSelectedStore(null)}
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onViewCart={() => setIsViewingCart(true)}
                products={products}
                onSubmitCustomOrder={handleCustomOrder}
                customerUser={userProfile}
              />
            </motion.div>
          ) : (
            /* ========================================================================= */
            /* THE COMPLETE MAIN HOME VIEW (الواجهة الأولى / الرئيسية للتطبيق)             */
            /* ========================================================================= */
            <motion.div
              key="main_home_view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* 1. Emergency High Rush Alert Banner (Conditional) */}
            {emergencyRush && (
              <div
                className="bg-red-600 text-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-between gap-4 border border-red-500 text-right animate-pulse"
                dir="rtl"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl shrink-0">🚨</span>
                  <div>
                    <h4 className="font-black text-sm sm:text-base">
                      تنبيه: تم تجميد استقبال الطلبات مؤقتاً بسبب ضغط العمل العالي
                    </h4>
                    <p className="text-xs text-red-100 mt-0.5">
                      نعمل بكامل طاقتنا لتجهيز وتوصيل الطلبات الحالية. سنعاود فتح واستقبال الطلبات قريباً!
                    </p>
                  </div>
                </div>
                <span className="bg-white/20 text-white text-[11px] font-black px-3 py-1.5 rounded-xl shrink-0 whitespace-nowrap">
                  وضع الضغط
                </span>
              </div>
            )}

            {/* 2. Main Hero Banner Card */}
            <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden select-none">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800')"
                }}
              />
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative space-y-1.5 sm:space-y-4 max-w-xl text-right">
                <span className="text-orange-500 font-extrabold text-[10px] sm:text-sm tracking-wider uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 animate-spin-slow" />
                  <span>توصيل المحافظة والقرى المجاورة</span>
                </span>
                <h2 className="text-lg sm:text-4xl font-extrabold tracking-tight leading-snug sm:leading-tight">
                  اطلب ما تحتاجه وسنصلك فوراً!
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  مأكولات، تموين، صيدليات، خضار فريش. حدد موقعك للتوصيل السريع.
                </p>
              </div>
            </div>

            {/* 3. Two Quick Action Grid Cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {/* Card 1: Weekly Hot Offers */}
              <div
                onClick={() => setSelectedCategory("offers")}
                className="bg-red-500 text-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer hover:bg-red-600 transition-all flex items-center justify-between shadow-xs hover:shadow-md group border border-red-400 min-w-0 text-right"
              >
                <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                  <span className="bg-white/20 text-white font-extrabold text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full uppercase inline-block">
                    العروض الأسبوعية
                  </span>
                  <h3 className="font-extrabold text-xs sm:text-lg truncate">تخفيضات لـ 30%</h3>
                  <p className="text-white/85 text-[9px] sm:text-xs font-semibold leading-normal truncate hidden xs:block">
                    وجبات وتموين غذائي بأرخص الأسعار.
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mr-2 sm:mr-0">
                  <Flame className="w-4 h-4 sm:w-6 sm:h-6 text-white fill-white" />
                </div>
              </div>

              {/* Card 2: Safe Communication & Fast Contact */}
              <div
                onClick={() => {
                  alert(
                    "سلامة كابتن التوصيل أولوية! حرصاً على حياته أثناء القيادة، تم توفير قنوات الاتصال الهاتفي والمراسلة عبر نسختي الواتساب (العادي والأعمال) للتنسيق الفوري دون تشتيت انتباهه على الطريق."
                  );
                }}
                className="bg-emerald-600 text-white p-3 sm:p-5 rounded-2xl sm:rounded-3xl cursor-pointer hover:bg-emerald-700 transition-all flex items-center justify-between shadow-xs hover:shadow-md group border border-emerald-500 min-w-0 text-right"
              >
                <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                  <span className="bg-white/20 text-white font-extrabold text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full uppercase inline-block font-sans">
                    سلامة وتواصل
                  </span>
                  <h3 className="font-extrabold text-xs sm:text-lg truncate">اتصال وواتساب مباشر</h3>
                  <p className="text-white/85 text-[9px] sm:text-xs font-semibold leading-normal truncate hidden xs:block">
                    تواصل بالاتصال والواتساب لحماية السائق على الطريق.
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform mr-2 sm:mr-0">
                  <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>

            {/* 4. Categories Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-right">
                <h3 className="text-sm sm:text-lg font-extrabold text-slate-900">
                  تصنيفات ومجالات التسوق
                </h3>
                <span className="text-[10px] text-slate-400 font-bold block sm:hidden">
                  اسحب لليسار 🫲
                </span>
              </div>

              <div className="flex overflow-x-auto pb-3 gap-2.5 select-none scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:pb-0">
                {/* All Stores Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className={`snap-center shrink-0 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right transition-all flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[115px] sm:min-w-0 ${
                    selectedCategory === "all"
                      ? "border-slate-900 bg-slate-900 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${
                      selectedCategory === "all" ? "bg-orange-500 text-slate-950" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <StoreIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold whitespace-nowrap">
                    جميع المحلات
                  </span>
                </button>

                {/* Categories List */}
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`snap-center shrink-0 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right transition-all flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[115px] sm:min-w-0 ${
                      selectedCategory === cat.id
                        ? "border-slate-900 bg-slate-900 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${
                        selectedCategory === cat.id
                          ? "bg-orange-500 text-slate-950"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <CategoryIcon name={cat.icon} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-xs sm:text-sm font-extrabold whitespace-nowrap">
                      {cat.label}
                    </span>
                  </button>
                ))}

                {/* Hot Offers Tab */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("offers")}
                  className={`snap-center shrink-0 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border text-right transition-all flex items-center gap-2 sm:gap-3 cursor-pointer min-w-[115px] sm:min-w-0 ${
                    selectedCategory === "offers"
                      ? "border-red-600 bg-red-600 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center ${
                      selectedCategory === "offers" ? "bg-white text-red-600" : "bg-red-50 text-red-500"
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold whitespace-nowrap font-sans">
                    العروض الحالية
                  </span>
                </button>
              </div>
            </div>

            {/* 6. Dynamic Content: Offers View OR Stores View */}
            {selectedCategory === "offers" ? (
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-right">
                  <Flame className="w-5.5 h-5.5 text-red-500 fill-red-500" />
                  <h3 className="text-lg font-extrabold text-slate-900">
                    قائمة العروض الحصرية الحالية
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {offerProducts.map((offer) => {
                    const storeOfProduct = stores.find((s) => s.id === offer.storeId);
                    const inCart = cartItems.find((ci) => ci.product.id === offer.id);
                    const qty = inCart ? inCart.quantity : 0;

                    return (
                      <div
                        key={offer.id}
                        className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex gap-4 relative overflow-hidden hover:shadow-md transition-all text-right"
                      >
                        <div className="absolute top-3 left-3 bg-red-500 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <Flame className="w-3 h-3 fill-white" />
                          <span>{offer.offerLabel || "تخفيض خاص"}</span>
                        </div>

                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                          <img
                            src={offer.image}
                            alt={offer.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            {storeOfProduct && (
                              <span className="text-[10px] text-slate-400 font-extrabold block mb-0.5">
                                متوفر في: {storeOfProduct.name}
                              </span>
                            )}
                            <h4 className="font-extrabold text-slate-800 text-sm leading-tight">
                              {offer.name}
                            </h4>
                            <p className="text-slate-400 text-[11px] line-clamp-1 mt-0.5">
                              {offer.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2.5">
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              <span className="font-extrabold text-base text-orange-600">
                                {offer.price} ل.س
                              </span>
                              {offer.originalPrice && (
                                <span className="text-slate-300 line-through text-xs font-semibold">
                                  {offer.originalPrice} ل.س
                                </span>
                              )}
                            </div>

                            {qty === 0 ? (
                              <button
                                type="button"
                                onClick={() => handleAddToCart(offer)}
                                className="bg-slate-900 text-white hover:bg-orange-500 hover:text-slate-950 font-bold text-xs py-2 px-3.5 rounded-xl transition-all shadow-xs cursor-pointer whitespace-nowrap"
                              >
                                إضافة للسلة
                              </button>
                            ) : (
                              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-1.5 py-1 shadow-xs select-none">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFromCart(offer)}
                                  className="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center text-xs font-extrabold text-slate-800">
                                  {qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(offer)}
                                  className="w-6 h-6 flex items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-xs cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Search and Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5 text-right">
                  <div className="flex items-center gap-2 select-none">
                    <StoreIcon className="w-5.5 h-5.5 text-slate-800" />
                    <h3 className="text-lg font-extrabold text-slate-800">
                      المتاجر والمحلات المتوفرة بالمنطقة
                    </h3>
                  </div>

                  <div className="relative w-full sm:max-w-xs">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث عن متجر بالاسم..."
                      className="w-full bg-white border border-slate-200 focus:border-slate-900 rounded-xl py-2.5 pr-10 pl-4 text-xs sm:text-sm outline-none text-slate-800 transition-all shadow-xs"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Stores Listing Grid */}
                {visibleStores.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-xs space-y-2">
                    <p className="text-slate-500 font-bold">عذراً، لم نجد أي متجر مطابق للبحث!</p>
                    <p className="text-slate-400 text-xs">
                      جرب تصنيفات أخرى في الأعلى لتكتشف محلات جديدة.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                    {visibleStores.map((store) => {
                      const categoryObj = categories.find((c) => c.id === store.category);
                      return (
                        <div
                          key={store.id}
                          onClick={() => setSelectedStore(store)}
                          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-500/25 transition-all duration-300 cursor-pointer flex flex-col group h-full text-right"
                        >
                          <div className="h-28 xs:h-36 sm:h-44 bg-slate-100 relative overflow-hidden">
                            <img
                              src={store.image}
                              alt={store.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-slate-900/85 backdrop-blur-md text-white font-extrabold text-[8px] sm:text-[10px] py-0.5 px-1.5 sm:py-1 sm:px-2.5 rounded-full flex items-center gap-1 shadow">
                              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-orange-400 fill-current" />
                              <span>{store.rating}</span>
                            </div>
                          </div>

                          <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                            <div className="space-y-1 sm:space-y-1.5 min-w-0">
                              <span className="text-[8px] sm:text-[10px] font-extrabold text-orange-600 bg-orange-500/10 py-0.5 px-1.5 sm:py-1 sm:px-2.5 rounded-full inline-block">
                                {categoryObj?.label || store.category}
                              </span>
                              <h4 className="font-extrabold text-slate-800 text-xs sm:text-base group-hover:text-orange-600 transition-colors truncate">
                                {store.name}
                              </h4>
                              {store.featuredProduct && (
                                <p className="text-slate-400 text-[9px] sm:text-xs font-medium truncate">
                                  سلعة مميزة: <b className="text-slate-500">{store.featuredProduct}</b>
                                </p>
                              )}
                              {store.workingHours && (
                                <p className="text-slate-400 text-[9px] sm:text-xs font-medium flex items-center gap-1 mt-0.5 truncate">
                                  <MapPin className="w-3 h-3 text-orange-500 shrink-0" />
                                  <span className="truncate">
                                    الدوام: <b className="text-slate-600 font-bold">{store.workingHours}</b>
                                  </span>
                                </p>
                              )}
                            </div>

                            <div className="border-t border-slate-100 pt-2 sm:pt-3 flex flex-col xs:flex-row xs:items-center justify-between text-[8px] sm:text-xs text-slate-500 gap-1">
                              <div className="flex items-center gap-1 shrink-0">
                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
                                <span>{store.deliveryTime}</span>
                              </div>
                              <div className="flex items-center gap-0.5 sm:gap-1 font-bold text-slate-700 truncate">
                                <Bike className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0" />
                                <span className="truncate">
                                  {store.isService ? "خدمة فورية" : `${store.deliveryFee} ل.س`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

              {/* 7. Village Map Landmark Guidance Footer Card */}
              <div className="bg-slate-900/5 border border-slate-200/60 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 select-none text-right">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                    <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                      استكشف القرية وخارطتها
                    </h4>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    تضم قريتنا العديد من المعالم والمدارس والمساجد والمستوصفات الطبية. قمنا بتسجيل كافة المعالم الرئيسية لتسهيل وصف العنوان للمندوب بمجرد اختيار معلم على الخريطة!
                  </p>
                </div>

                <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-extrabold flex items-center gap-1 shrink-0">
                  <MapPin className="w-4 h-4 text-emerald-500 animate-bounce" />
                  <span>شاهد خريطة التوصيل عند تحديد السلة</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Admin PIN Gate Modal with Smooth Animation */}
      <AnimatePresence>
        {showAdminPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs" dir="rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-sm rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
            >
              <div className="p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100 text-orange-500">
                  <Lock className="w-6 h-6 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-800">
                    منطقة الإدارة الآمنة
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                    الرجاء إدخال الرمز السري للمدير للمتابعة والتحكم في المتاجر والمنتجات.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (adminPinInput === ADMIN_SECRET_PIN) {
                      setIsAdminMode(true);
                      setShowAdminPinModal(false);
                      setAdminPinInput("");
                      setAdminPinError("");
                    } else {
                      setAdminPinError("الرمز السري غير صحيح! الرجاء المحاولة مرة أخرى.");
                      setAdminPinInput("");
                    }
                  }}
                  className="space-y-3"
                >
                  <div className="relative">
                    <input
                      type="password"
                      autoFocus
                      required
                      maxLength={4}
                      value={adminPinInput}
                      onChange={(e) => {
                        setAdminPinError("");
                        const cleaned = e.target.value.replace(/[^0-9]/g, "");
                        setAdminPinInput(cleaned);
                      }}
                      placeholder="••••"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-2xl py-3 px-4 text-center text-xl font-black tracking-[0.5em] outline-none text-slate-800 placeholder-slate-300"
                    />
                  </div>

                  {adminPinError && (
                    <p className="text-[10px] text-red-500 font-extrabold animate-fade-in">
                      {adminPinError}
                    </p>
                  )}

                  <div className="bg-orange-50/60 border border-orange-100/50 rounded-xl p-2.5 text-[10px] text-orange-800 font-semibold leading-relaxed">
                    💡 الرمز السري الافتراضي للنظام للتجربة هو:{" "}
                    <strong className="text-orange-900 font-extrabold">1234</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdminPinModal(false);
                        setAdminPinInput("");
                        setAdminPinError("");
                      }}
                      className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-extrabold transition-all cursor-pointer"
                    >
                      إلغاء
                    </button>

                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold shadow-xs shadow-orange-500/15 flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>دخول آمن</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standalone Elegant PWA Installation Modal on Entry */}
      <InstallPromptModal />

      {/* Customer Orders Archive Modal */}
      {showCustomerArchiveModal && (
        <CustomerOrdersArchiveModal
          orders={allOrders}
          currentCustomerPhone={userProfile?.phone}
          currentCustomerName={userProfile?.name}
          onClose={() => setShowCustomerArchiveModal(false)}
          onSelectOrderToTrack={(order) => {
            setActiveOrder(order);
            setShowCustomerArchiveModal(false);
            setSelectedStore(null);
            setIsViewingCart(false);
            setIsAdminMode(false);
            setIsDriverMode(false);
          }}
          onReorder={(items) => {
            if (items && items.length > 0) {
              setCartItems(items);
              setShowCustomerArchiveModal(false);
              setIsViewingCart(true);
              setSelectedStore(null);
            }
          }}
        />
      )}

      {/* Auth Modal Overlay when opened from Header */}
      {showAuthModal && (
        <AuthModal
          onRegister={handleAuthSuccess}
          stores={stores}
          onAddStore={(newStore) => setStores((prev) => [...prev, newStore])}
          activeOrder={activeOrder}
          onTrackOrder={() => {
            setShowAuthModal(false);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

