import React, { useState, useRef, useEffect } from "react";
import { 
  Settings, 
  Users, 
  FileText, 
  Share2, 
  DollarSign, 
  Phone, 
  ShieldAlert, 
  Copy, 
  Check, 
  QrCode, 
  MessageCircle,
  MessageSquare,
  Clock,
  UserCheck,
  Printer,
  ShieldCheck,
  Megaphone,
  Store as StoreIcon,
  Bike,
  Sparkles,
  Plus,
  Search,
  Edit,
  Trash2,
  MapPin,
  UserPlus,
  HeartHandshake,
  Store,
  Upload,
  Image as ImageIcon,
  Smartphone,
  Download,
  RefreshCw,
  Info,
  ExternalLink
} from "lucide-react";
import { AppSettings, AuditLog, Order, RegisteredCustomer, Store as StoreType, UserProfile } from "../../types";
import { openWhatsApp } from "../../utils/whatsapp";
import { 
  DEFAULT_APP_ICON_KEY, 
  getActiveAppIcon, 
  updateDynamicPwaManifest, 
  generateDefaultSvgIcon, 
  resizeImageToDataUrl 
} from "../../utils/pwaManager";

interface SettingsTabProps {
  currentSubView: "customers" | "logs" | "settings" | "share";
  appSettings: AppSettings;
  onUpdateAppSettings: (settings: AppSettings) => void;
  orders: Order[];
  registeredUsers?: UserProfile[];
  registeredCustomers?: RegisteredCustomer[];
  onAddCustomer?: (customer: RegisteredCustomer) => void;
  onUpdateCustomer?: (customer: RegisteredCustomer) => void;
  onDeleteCustomer?: (customerId: string) => void;
  auditLogs: AuditLog[];
  stores?: StoreType[];
  onNavigateToTab?: (tab: any) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  currentSubView,
  appSettings,
  onUpdateAppSettings,
  orders,
  registeredUsers = [],
  registeredCustomers = [],
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer,
  auditLogs,
  stores = [],
  onNavigateToTab
}) => {
  const [appName, setAppName] = useState(appSettings.appName);
  const [contactPhone, setContactPhone] = useState(appSettings.contactPhone);
  const [currency, setCurrency] = useState(appSettings.currency || "ل.س");
  const [baseDeliveryFee, setBaseDeliveryFee] = useState(appSettings.baseDeliveryFee);
  const [minOrderValue, setMinOrderValue] = useState(appSettings.minOrderValue);
  const [newRegion, setNewRegion] = useState("");
  const [regions, setRegions] = useState<string[]>(appSettings.activeRegions || ["وسط البلد", "الحارة الشرقية", "حي المدارس", "الحارة الغربية", "طريق السهل"]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<"general" | "merchants" | "drivers">("general");

  // Customer Management States
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerFilter, setCustomerFilter] = useState<"all" | "admin" | "orders">("all");
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<RegisteredCustomer | null>(null);

  // Customer Form State
  const [cName, setCName] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cLandmark, setCLandmark] = useState(regions[0] || "وسط البلد");
  const [cAddressDetails, setCAddressDetails] = useState("");
  const [cNotes, setCNotes] = useState("");

  // Customer WhatsApp Welcome Message Modal
  const [selectedCustomerForWA, setSelectedCustomerForWA] = useState<RegisteredCustomer | null>(null);
  const [copiedCustomerWA, setCopiedCustomerWA] = useState(false);

  // PWA & Dynamic App Icon State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [appIcon, setAppIcon] = useState<string>(() => getActiveAppIcon(undefined, appSettings.appName));
  const [isUpdatingIcon, setIsUpdatingIcon] = useState(false);
  const [iconUpdateSuccess, setIconUpdateSuccess] = useState(false);
  const [showPwaInstallGuide, setShowPwaInstallGuide] = useState(false);

  useEffect(() => {
    // Keep app icon in sync
    const current = getActiveAppIcon(undefined, appName);
    setAppIcon(current);
  }, [appName]);

  const handleIconFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      alert("حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 8 ميغابايت");
      return;
    }

    setIsUpdatingIcon(true);
    try {
      const reader = new FileReader();
      reader.onerror = () => {
        setIsUpdatingIcon(false);
        alert("حدث خطأ أثناء قراءة الصورة، يرجى المحاولة مرة أخرى.");
      };
      reader.onload = async (event) => {
        try {
          const rawDataUrl = event.target?.result as string;
          if (!rawDataUrl) {
            setIsUpdatingIcon(false);
            return;
          }

          // Standardize icon to 512x512 PNG dataUrl for rock-solid mobile compatibility
          const standardIcon = await resizeImageToDataUrl(rawDataUrl, 512, 512);

          // Store persistently in LocalStorage
          try {
            localStorage.setItem(DEFAULT_APP_ICON_KEY, standardIcon);
          } catch (storageErr) {
            console.warn("Storage quota fallback:", storageErr);
          }

          setAppIcon(standardIcon);

          // Update AppSettings state & persistent store
          onUpdateAppSettings({
            ...appSettings,
            appName: appName.trim(),
            customAppIcon: standardIcon
          });

          // Instantly generate and inject dynamic PWA manifest Blob
          await updateDynamicPwaManifest({
            appName: appName.trim(),
            iconDataUrl: standardIcon,
            themeColor: "#f97316"
          });

          setIsUpdatingIcon(false);
          setIconUpdateSuccess(true);
          setTimeout(() => setIconUpdateSuccess(false), 3500);
        } catch (innerErr) {
          console.error("Error in onload:", innerErr);
          setIsUpdatingIcon(false);
          alert("حدث خطأ أثناء ضبط أبعاد الصورة.");
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Error processing icon:", err);
      setIsUpdatingIcon(false);
    }
  };

  const handleResetToDefaultIcon = async () => {
    setIsUpdatingIcon(true);
    try {
      localStorage.removeItem(DEFAULT_APP_ICON_KEY);
      const defaultIcon = generateDefaultSvgIcon(512, "#f97316", appName.split(" ")[0] || "توصيل");
      setAppIcon(defaultIcon);

      onUpdateAppSettings({
        ...appSettings,
        appName: appName.trim(),
        customAppIcon: undefined
      });

      await updateDynamicPwaManifest({
        appName: appName.trim(),
        iconDataUrl: defaultIcon,
        themeColor: "#f97316"
      });

      setIsUpdatingIcon(false);
      setIconUpdateSuccess(true);
      setTimeout(() => setIconUpdateSuccess(false), 3500);
    } catch (err) {
      console.error("Error resetting icon:", err);
      setIsUpdatingIcon(false);
    }
  };

  const handleTriggerPwaInstall = async () => {
    const win = window as any;
    if (win.deferredPrompt) {
      try {
        win.deferredPrompt.prompt();
        const choiceResult = await win.deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted PWA installation");
        }
        win.deferredPrompt = null;
      } catch (err) {
        setShowPwaInstallGuide(true);
      }
    } else {
      setShowPwaInstallGuide(true);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAppSettings({
      appName: appName.trim(),
      contactPhone: contactPhone.trim(),
      currency: currency.trim(),
      baseDeliveryFee: Number(baseDeliveryFee),
      minOrderValue: Number(minOrderValue),
      activeRegions: regions,
      customAppIcon: appIcon
    });

    // Update dynamic manifest with updated name
    updateDynamicPwaManifest({
      appName: appName.trim(),
      iconDataUrl: appIcon,
      themeColor: "#f97316"
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleAddRegion = () => {
    if (!newRegion.trim() || regions.includes(newRegion.trim())) return;
    setRegions([...regions, newRegion.trim()]);
    setNewRegion("");
  };

  const handleRemoveRegion = (reg: string) => {
    setRegions(regions.filter(r => r !== reg));
  };

  // Build unified customer list merging manual registrations + orders
  const customerMap: Record<string, { name: string; phone: string; count: number; total: number; landmark?: string; details?: string; notes?: string; source: "admin" | "app"; id?: string }> = {};

  // First seed with manually registered customers
  registeredCustomers.forEach(rc => {
    customerMap[rc.phone] = {
      id: rc.id,
      name: rc.name,
      phone: rc.phone,
      count: rc.totalOrdersCount || 0,
      total: rc.totalSpent || 0,
      landmark: rc.addressLandmark,
      details: rc.addressDetails,
      notes: rc.notes || "تم التسجيل بمساعدة الإدارة",
      source: "admin"
    };
  });

  // Next augment with order records
  orders.forEach(o => {
    if (o.customerPhone) {
      if (!customerMap[o.customerPhone]) {
        customerMap[o.customerPhone] = {
          name: o.customerName || "زبون",
          phone: o.customerPhone,
          count: 0,
          total: 0,
          landmark: o.addressLandmark,
          details: o.addressDetails,
          notes: o.notes,
          source: "app"
        };
      }
      customerMap[o.customerPhone].count += 1;
      customerMap[o.customerPhone].total += o.total || 0;
      if (!customerMap[o.customerPhone].name && o.customerName) {
        customerMap[o.customerPhone].name = o.customerName;
      }
      if (!customerMap[o.customerPhone].landmark && o.addressLandmark) {
        customerMap[o.customerPhone].landmark = o.addressLandmark;
      }
    }
  });

  const allCustomersList = Object.values(customerMap);

  const filteredCustomers = allCustomersList.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone.includes(customerSearch) ||
      (c.landmark && c.landmark.toLowerCase().includes(customerSearch.toLowerCase())) ||
      (c.notes && c.notes.toLowerCase().includes(customerSearch.toLowerCase()));
    
    const matchesFilter = 
      customerFilter === "all" ||
      (customerFilter === "admin" && c.source === "admin") ||
      (customerFilter === "orders" && c.source === "app");

    return matchesSearch && matchesFilter;
  });

  const openAddCustomerModal = () => {
    setEditingCustomer(null);
    setCName("");
    setCPhone("");
    setCLandmark(regions[0] || "وسط البلد");
    setCAddressDetails("");
    setCNotes("تم تسجيله هاتفياً عبر الإدارة لعدم معرفته بالتطبيق الذكي");
    setShowAddCustomerModal(true);
  };

  const openEditCustomerModal = (cust: any) => {
    const existing = registeredCustomers.find(rc => rc.phone === cust.phone) || {
      id: cust.id || `cust_${Date.now()}`,
      name: cust.name,
      phone: cust.phone,
      addressLandmark: cust.landmark || regions[0] || "وسط البلد",
      addressDetails: cust.details || "",
      notes: cust.notes || "",
      registeredBy: "المدير العام",
      registeredAt: new Date().toISOString().split("T")[0],
      totalOrdersCount: cust.count,
      totalSpent: cust.total
    };
    setEditingCustomer(existing);
    setCName(existing.name);
    setCPhone(existing.phone);
    setCLandmark(existing.addressLandmark || regions[0] || "وسط البلد");
    setCAddressDetails(existing.addressDetails || "");
    setCNotes(existing.notes || "");
    setShowAddCustomerModal(true);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cName.trim() || !cPhone.trim()) return;

    if (editingCustomer && onUpdateCustomer) {
      onUpdateCustomer({
        ...editingCustomer,
        name: cName.trim(),
        phone: cPhone.trim(),
        addressLandmark: cLandmark,
        addressDetails: cAddressDetails.trim(),
        notes: cNotes.trim()
      });
    } else if (onAddCustomer) {
      const newCust: RegisteredCustomer = {
        id: `cust_${Date.now()}`,
        name: cName.trim(),
        phone: cPhone.trim(),
        addressLandmark: cLandmark,
        addressDetails: cAddressDetails.trim(),
        notes: cNotes.trim(),
        registeredBy: "المدير العام (مساعدة هاتفية)",
        registeredAt: new Date().toISOString().split("T")[0],
        totalOrdersCount: 0,
        totalSpent: 0
      };
      onAddCustomer(newCust);
      setSelectedCustomerForWA(newCust);
    }

    setShowAddCustomerModal(false);
  };

  const handleDeleteCustomerClick = (phone: string, id?: string) => {
    if (confirm("هل أنت متأكد من حذف هذا الزبون من السجل؟")) {
      const targetId = id || registeredCustomers.find(rc => rc.phone === phone)?.id;
      if (targetId && onDeleteCustomer) {
        onDeleteCustomer(targetId);
      }
    }
  };

  const generateWelcomeCustomerMessage = (cust: RegisteredCustomer | { name: string; phone: string; landmark?: string; addressLandmark?: string }) => {
    const landmark = "addressLandmark" in cust && cust.addressLandmark ? cust.addressLandmark : ("landmark" in cust ? cust.landmark : "القرية");
    return `أهلاً بك يا ${cust.name} الكرام في منصة *${appSettings.appName}* لتوصيل كافة طلبات القرية 🛍️\n\nتم تسجيل بياناتك وعنوانك (${landmark || "القرية"}) بنجاح في النظام بمساعدة الإدارة.\n\n📞 يمكنك دائماً الاتصال بنا أو مراسلتنا بالطلبات التي تحتاجها وسنقوم بتوصيلها فوراً لباب منزلك!\n\nرقم خدمة التوصيل: ${appSettings.contactPhone || "0991234567"}`;
  };

  const handleSendCustomerWA = (cust: RegisteredCustomer | { name: string; phone: string; landmark?: string; addressLandmark?: string }, type: "regular" | "business") => {
    const text = generateWelcomeCustomerMessage(cust);
    openWhatsApp({
      phone: cust.phone,
      message: text,
      type
    });
  };

  const OFFICIAL_APP_URL = "https://essaower30-pixel.github.io/Tawseel-app/";

  const handleCopyAppUrl = () => {
    navigator.clipboard.writeText(OFFICIAL_APP_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Subview 1: Customers Directory
  if (currentSubView === "customers") {
    return (
      <div className="space-y-6 text-right font-sans" dir="rtl">
        {/* Header with Explanation & Action Buttons */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-black text-2xl shrink-0 shadow-sm border border-orange-100">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-slate-900 text-base sm:text-lg">
                    سجل ودليل الزبائن والمجتمع 👥
                  </h3>
                  <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    خدمة كبار السن والمساعدة
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  إدارة بيانات أهالي القرية مع إمكانية تسجيل الزبائن نيابة عنهم لمن لا يجيد استخدام التطبيق
                </p>
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {onNavigateToTab && (
                <button
                  type="button"
                  onClick={() => onNavigateToTab("stores")}
                  className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer border border-slate-200"
                >
                  <StoreIcon className="w-4 h-4 text-orange-500" />
                  <span>إدارة وإضافة المتاجر 🏪</span>
                </button>
              )}

              <button
                type="button"
                onClick={openAddCustomerModal}
                className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>تسجيل زبون جديد نيابة عنه ➕</span>
              </button>
            </div>
          </div>

          {/* Quick Notice for Admin Assistance */}
          <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
            <HeartHandshake className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-black">ميزة تسجيل الزبائن والمتاجر من قبل الإدارة:</span>
              <p className="text-amber-800 text-[11px] leading-relaxed">
                تتيح لك هذه الميزة استقبال اتصالات كبار السن أو من لا يجيدون التطبيقات الذكية وتسجيل بياناتهم وعناوينهم وأرقامهم، مع إمكانية إرسال رسالة ترحيبية عبر الواتساب وتثبيت تفاصيلهم في النظام لسهولة طلبهم المستقبلي.
              </p>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="ابحث بالاسم، رقم الهاتف، المعلم الجغرافي أو الملاحظات..."
                className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setCustomerFilter("all")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${customerFilter === "all" ? "bg-white text-slate-900 shadow-xs font-black" : "text-slate-500"}`}
                >
                  الكل ({allCustomersList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerFilter("admin")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${customerFilter === "admin" ? "bg-white text-slate-900 shadow-xs font-black" : "text-slate-500"}`}
                >
                  مسجل بالإدارة 🛡️ ({registeredCustomers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerFilter("orders")}
                  className={`px-3 py-1.5 rounded-xl transition-all ${customerFilter === "orders" ? "bg-white text-slate-900 shadow-xs font-black" : "text-slate-500"}`}
                >
                  من الطلبات 📱 ({allCustomersList.filter(c => c.source === "app").length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.length === 0 ? (
            <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <h4 className="font-black text-slate-700 text-sm">لم يتم العثور على زبائن يطابقون البحث</h4>
              <p className="text-xs text-slate-400">يمكنك إضافة زبون جديد فوراً بنقرة زر أعلاه</p>
              <button
                type="button"
                onClick={openAddCustomerModal}
                className="mt-2 px-4 py-2 bg-orange-500 text-white text-xs font-black rounded-xl cursor-pointer"
              >
                تسجيل أول زبون الآن ➕
              </button>
            </div>
          ) : (
            filteredCustomers.map((c, idx) => {
              const isAdminAssisted = c.source === "admin";
              return (
                <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-orange-200 transition-all">
                  <div className="space-y-3">
                    {/* Top Row: Avatar, Name, Phone & Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base shadow-xs ${
                          isAdminAssisted ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-orange-50 text-orange-600 border border-orange-100"
                        }`}>
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-black text-sm text-slate-900">{c.name}</h4>
                            {isAdminAssisted && (
                              <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 font-bold px-1.5 py-0.2 rounded-md" title="تم تسجيله بمساعدة الإدارة">
                                مساعدة 🛡️
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-mono font-bold mt-0.5">{c.phone}</p>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-black bg-slate-100 text-slate-700 shrink-0">
                        {c.count} {c.count === 1 ? "طلب" : "طلبات"}
                      </span>
                    </div>

                    {/* Address Landmark & Notes */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                        <span>{c.landmark || "وسط البلد"} {c.details ? `(${c.details})` : ""}</span>
                      </div>
                      {c.notes && (
                        <p className="text-[11px] text-slate-500 font-medium line-clamp-2 pr-5">
                          💬 {c.notes}
                        </p>
                      )}
                    </div>

                    {/* Spend Total */}
                    <div className="flex items-center justify-between text-xs pt-1 px-1">
                      <span className="text-slate-400 font-bold">إجمالي المشتريات:</span>
                      <span className="font-black text-orange-600 font-mono">
                        {c.total.toLocaleString()} {currency}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      <a
                        href={`tel:${c.phone}`}
                        className="py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95"
                        title="اتصال هاتفي مباشر"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>اتصال</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleSendCustomerWA(c, "regular")}
                        className="py-2 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                        title="مراسلة عبر واتساب العادي"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>واتساب</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendCustomerWA(c, "business")}
                        className="py-2 bg-[#075E54]/15 hover:bg-[#075E54]/25 text-[#075E54] rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer"
                        title="مراسلة عبر واتساب الأعمال"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>أعمال</span>
                      </button>
                    </div>

                    {/* Secondary Edit & Delete Actions */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => openEditCustomerModal(c)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                        title="تعديل بيانات الزبون"
                      >
                        <Edit className="w-3.5 h-3.5 text-blue-500" />
                        <span>تعديل</span>
                      </button>

                      {isAdminAssisted && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCustomerClick(c.phone, c.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                          title="حذف من السجل"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal: Add/Edit Customer on their behalf */}
        {showAddCustomerModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans" dir="rtl">
            <div className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-lg shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      {editingCustomer ? "تعديل بيانات الزبون 👥" : "تسجيل زبون جديد نيابة عنه ➕"}
                    </h4>
                    <p className="text-[11px] text-slate-400">خدمة موجهة لكبار السن ولمن يتصل هاتفياً للطلب</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCustomer} className="space-y-3.5">
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">اسم الزبون / اللقب *</label>
                  <input
                    type="text"
                    required
                    value={cName}
                    onChange={(e) => setCName(e.target.value)}
                    placeholder="مثال: الحاج أبو عدنان، أم بشار، الأستاذ كمال"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">رقم الهاتف للتواصل والواتساب *</label>
                  <input
                    type="tel"
                    required
                    value={cPhone}
                    onChange={(e) => setCPhone(e.target.value)}
                    placeholder="مثال: 0991234567"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">المعلم الجغرافي / الحارة في القرية</label>
                  <select
                    value={cLandmark}
                    onChange={(e) => setCLandmark(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                  >
                    {regions.map((reg, rIdx) => (
                      <option key={rIdx} value={reg}>{reg}</option>
                    ))}
                    <option value="أخرى / موقع مخصص">موقع آخر / خارج القرية</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">تفاصيل السكن / العنوان الدقيق</label>
                  <input
                    type="text"
                    value={cAddressDetails}
                    onChange={(e) => setCAddressDetails(e.target.value)}
                    placeholder="مثال: جانب معصرة الزيتون، الطابق الثاني، خلف المسجد"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">ملاحظات مساعدة الإدارة (اختياري)</label>
                  <textarea
                    rows={2}
                    value={cNotes}
                    onChange={(e) => setCNotes(e.target.value)}
                    placeholder="مثال: كبير بالسن، يفضل الاتصال الصوتي، الدفع نقدي دائماً"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCustomerModal(false)}
                    className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
                  >
                    {editingCustomer ? "حفظ التعديلات ✓" : "تأكيد تسجيل الزبون ➕"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Customer Registration Success & WhatsApp Confirmation */}
        {selectedCustomerForWA && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans" dir="rtl">
            <div className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      تم تسجيل الزبون بنجاح! 🎉
                    </h4>
                    <p className="text-[11px] text-slate-400">إرسال رسالة ترحيب وتأكيد للزبون</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCustomerForWA(null)}
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <span className="font-black text-slate-700 block">نص رسالة الترحيب:</span>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed text-[11px]">
                  {generateWelcomeCustomerMessage(selectedCustomerForWA)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSendCustomerWA(selectedCustomerForWA, "regular")}
                  className="py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>واتساب العادي 💬</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendCustomerWA(selectedCustomerForWA, "business")}
                  className="py-2.5 px-3 bg-[#075E54] hover:bg-[#054a43] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب الأعمال 💼</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(generateWelcomeCustomerMessage(selectedCustomerForWA));
                  setCopiedCustomerWA(true);
                  setTimeout(() => setCopiedCustomerWA(false), 2000);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                {copiedCustomerWA ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCustomerWA ? "تم نسخ نص الرسالة!" : "نسخ نص الترحيب"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Subview 2: Audit Logs
  if (currentSubView === "logs") {
    return (
      <div className="space-y-6 text-right font-sans" dir="rtl">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              <span>سجل عمليات الموظفين والإدارة 📑</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">توثيق زمني لكافة الإجراءات والتعديلات والطلبات التي تمت على النظام</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {auditLogs.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                لا توجد سجلات عمليات مسجلة حتى الآن.
              </div>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900">{log.user}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200">
                        {log.role}
                      </span>
                    </div>
                    <p className="text-slate-600 font-bold">{log.action}</p>
                    <p className="text-slate-400 text-[11px]">{log.details}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString("ar-SY")}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // Subview 3: Central Administrative App Distribution & Broadcast Portal (الجهة المسؤولة حصراً عن توزيع التطبيق)
  if (currentSubView === "share") {
    const originUrl = OFFICIAL_APP_URL;
    
    // Announcement templates
    const templates = {
      general: `🛍️ *إعلان رسمي من إدارة تطبيق (${appSettings.appName})*\n\nأهالينا الكرام، أصبح بإمكانكم الآن تصفح كافة مطاعم، بقاليات، صيدليات، وحرفيي المنطقة والطلب أونلاين مع خدمة التوصيل السريع إلى باب بيوتكم!\n\n📲 *رابط التطبيق الرسمي المباشر:*\n${originUrl}\n\n(يمكنكم فتح الرابط وتثبيت التطبيق على الشاشة الرئيسية فوراً)`,
      merchants: `🏪 *دعوة رسمية لأصحاب المتاجر والمطاعم والصيدليات للانضمام لمنصة (${appSettings.appName})*\n\nسجل متجرك الآن واعرض منتجاتك لأهالي المحافظة مع إدارة متكاملة للطلبات وفريق كباتن توصيل جاهز لنقل طلباتك.\n\n🌐 *رابط الانضمام والتسجيل:*\n${originUrl}`,
      drivers: `🛵 *فرصة عمل: انضم لفريق كباتن التوصيل في منصة (${appSettings.appName})*\n\nنبحث عن شباب نشيطين للانضمام لأسطول التوصيل مع عوائد ممتازة وحرية في أوقات العمل.\n\n📍 *رابط التسجيل وبدء العمل:*\n${originUrl}`
    };

    const currentText = templates[selectedTemplate];

    const handleShareWA = (type: "regular" | "business") => {
      openWhatsApp({
        message: currentText,
        type
      });
    };

    const handleCopyAnnouncement = () => {
      navigator.clipboard.writeText(currentText);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    };

    return (
      <div className="space-y-6 text-right font-sans" dir="rtl">
        {/* Header with Authority Notice */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md shadow-orange-500/25">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-white text-base sm:text-lg">
                    بوابة إدارة ونشر وتوزيع التطبيق المركزية 📢
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    الجهة المسؤولة حصراً
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  أنت كإدارة المنصة المسؤول الرسمي والوحيد عن نشر روابط التطبيق وتوزيعه على أهالي المحافظة والمتاجر والكباتن.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-xs text-slate-200 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              تم حصر قنوات مشاركة ونشر التطبيق في لوحة الإدارة فقط لضمان النشر المنظم والرسمي، بينما يحتفظ الزبائن بخاصية تثبيت التطبيق والباركود على هواتفهم.
            </span>
          </div>
        </div>

        {/* Distribution Hub Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Announcement Builder & Share Actions (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>صياغة وبث رسائل النشر الرسمية</span>
              </h4>
              <span className="text-[11px] text-slate-400 font-bold">جاهزة للإرسال الفوري</span>
            </div>

            {/* Template Selector Tabs */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-600 block">اختر نوع الرسالة المستهدفة:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTemplate("general")}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                    selectedTemplate === "general"
                      ? "bg-orange-500 text-white border-orange-500 shadow-xs shadow-orange-500/20"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>أهالي القرية 👥</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTemplate("merchants")}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                    selectedTemplate === "merchants"
                      ? "bg-orange-500 text-white border-orange-500 shadow-xs shadow-orange-500/20"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>أصحاب المحلات 🏪</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTemplate("drivers")}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                    selectedTemplate === "drivers"
                      ? "bg-orange-500 text-white border-orange-500 shadow-xs shadow-orange-500/20"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>كباتن التوصيل 🛵</span>
                </button>
              </div>
            </div>

            {/* Message Preview Box */}
            <div className="space-y-1.5">
              <span className="text-xs font-black text-slate-600 block">نص الإعلان الرسمي المعاكس:</span>
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-700 font-medium whitespace-pre-line leading-relaxed">
                {currentText}
              </div>
            </div>

            {/* Share & Broadcast Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleShareWA("regular")}
                className="py-3 px-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>واتساب العادي 💬</span>
              </button>

              <button
                type="button"
                onClick={() => handleShareWA("business")}
                className="py-3 px-3 bg-[#075E54] hover:bg-[#054a43] text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>واتساب الأعمال 💼</span>
              </button>

              <button
                type="button"
                onClick={handleCopyAnnouncement}
                className="py-3 px-3 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                {copiedMessage ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">تم نسخ النص! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300" />
                    <span>نسخ نص الإعلان</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Link Section */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-black text-slate-600 block">رابط التطبيق المباشر:</span>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <input
                  type="text"
                  readOnly
                  value={originUrl}
                  className="w-full bg-transparent text-xs font-mono text-slate-700 font-bold focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleCopyAppUrl}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black flex items-center gap-1 shrink-0 cursor-pointer active:scale-95 shadow-xs"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "تم النسخ!" : "نسخ الرابط"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Printable QR Code & Shop Posters (5 cols) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-orange-500" />
                  <span>باركود الملصقات والمحلات 📷</span>
                </h4>
                <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-black">
                  قابل للطباعة
                </span>
              </div>

              {/* Printable Poster Card Visual */}
              <div className="mt-4 p-5 bg-gradient-to-b from-slate-50 to-orange-50/40 border-2 border-dashed border-orange-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-md">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      originUrl
                    )}`}
                    alt="App Direct QR Code"
                    className="w-40 h-40"
                  />
                </div>
                <div className="space-y-1">
                  <h5 className="font-black text-sm text-slate-900">تطبيق {appSettings.appName}</h5>
                  <p className="text-[11px] text-slate-500 font-bold max-w-xs">
                    امسح الرمز بكاميرا جوالك واطلب كل ما تحتاجه ليصلك فوراً!
                  </p>
                </div>
              </div>
            </div>

            {/* Poster Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4 text-orange-400" />
                <span>طباعة بوستر الباركود لتعليقه في المحلات 🖨️</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 font-semibold">
                يمكن طباعة هذا الرمز كملصقات على واجهات المتاجر وأكياس الطلبات
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subview 4: General Settings (Default)
  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs">
        <h3 className="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-500" />
          <span>الإعدادات العامة ورسوم الخدمة ⚙️</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">تعديل اسم التطبيق، أجور التوصيل الافتراضية، المناطق الجغرافية، والعملة</p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">اسم المنصة / التطبيق</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">رقم هاتف الإدارة والدعم</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">رسوم التوصيل الأساسية الافتراضية ({currency})</label>
            <input
              type="number"
              value={baseDeliveryFee}
              onChange={(e) => setBaseDeliveryFee(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">الحد الأدنى لقيمة الطلب ({currency})</label>
            <input
              type="number"
              value={minOrderValue}
              onChange={(e) => setMinOrderValue(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-1">رمز العملة</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>
        </div>

        {/* PWA App Icon & Mobile Install Management Section */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span>أيقونة التطبيق وتثبيت الهاتف (PWA App Icon) 📱</span>
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                تخصيص أيقونة التثبيت للشاشات الرئيسية على هواتف أندرويد وآيفون، ويتم حقنها ديناميكياً في ملف الـ Manifest لمنع أي تلف في الصورة.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>PWA Standalone جاهز</span>
              </span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center gap-6 justify-between">
            {/* Live Mobile Icon Preview Box */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105">
                  <img
                    src={appIcon}
                    alt="App Icon Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                  512×512
                </div>
              </div>

              <div className="space-y-1 text-right">
                <span className="text-xs font-black text-slate-800 block">معاينة الأيقونة على الشاشة الرئيسية</span>
                <p className="text-[11px] text-slate-500">
                  الأيقونة الحالية: {appSettings.customAppIcon ? "صورة مخصصة مرفوعة من المدير" : "أيقونة متجهة برمجية فائقة الدقة"}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                    192x192 & 512x512
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                    Maskable + Any
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600">
                    حقن ديناميكي Blob
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp, image/svg+xml"
                onChange={handleIconFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUpdatingIcon}
                className="flex-1 md:flex-none py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Upload className="w-4 h-4" />
                <span>{isUpdatingIcon ? "جاري معالجة الصورة..." : "تغيير أيقونة التطبيق 📷"}</span>
              </button>

              {appSettings.customAppIcon && (
                <button
                  type="button"
                  onClick={handleResetToDefaultIcon}
                  disabled={isUpdatingIcon}
                  className="py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
                  title="استعادة الأيقونة الافتراضية"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>الأيقونة الافتراضية</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleTriggerPwaInstall}
                className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-orange-400" />
                <span>تجربة التثبيت على الهاتف 📲</span>
              </button>
            </div>
          </div>

          {iconUpdateSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-black text-emerald-700 flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>تم تحديث أيقونة التطبيق ومستند التثبيت (Manifest & Favicon) فوراً وديناميكياً بنجاح! 🎉</span>
            </div>
          )}
        </div>

        {/* Regions */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <label className="text-xs font-black text-slate-700 block">الأحياء والمناطق النشطة للتوصيل في القرية</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              placeholder="أدخل اسم حارة أو منطقة جديدة..."
              className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden"
            />
            <button
              type="button"
              onClick={handleAddRegion}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs rounded-xl"
            >
              إضافة حي
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {regions.map((reg, rIdx) => (
              <span
                key={rIdx}
                className="px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl text-xs font-black flex items-center gap-2"
              >
                <span>{reg}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRegion(reg)}
                  className="text-orange-400 hover:text-red-600 font-bold"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <span>حفظ كافة الإعدادات</span>
            {savedSuccess && <Check className="w-4 h-4 text-white" />}
          </button>
          {savedSuccess && (
            <span className="text-xs font-black text-emerald-600">تم حفظ الإعدادات بنجاح ✓</span>
          )}
        </div>
      </form>

      {/* Modal: PWA Installation Step-by-Step Guide */}
      {showPwaInstallGuide && (
        <div 
          className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans overflow-y-auto" 
          dir="rtl"
          onClick={() => setShowPwaInstallGuide(false)}
        >
          <div 
            className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border border-slate-100 space-y-4 my-auto relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">
                    طريقة تثبيت التطبيق على الموبايل 📲
                  </h4>
                  <p className="text-[11px] text-slate-400">ليعمل كتطبيق مستقل (Standalone App) بكامل الشاشة</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPwaInstallGuide(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-black text-xs cursor-pointer border border-slate-200"
              >
                إغلاق ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Note about AI Studio Frame */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-1.5 font-black text-amber-900">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>ملاحظة هامة حول تثبيت التطبيق:</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">
                  إذا كنت تتصفح من داخل نافذة منصة <strong>Google AI Studio</strong>، فإن المتصفح سيحاول تثبيت منصة AI Studio. لتثبيت تطبيقك الخاص باسم <strong>({appSettings.appName})</strong> وأيقونته البرمجية، افتح الرابط المباشر في متصفحك:
                </p>
                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.open(OFFICIAL_APP_URL, "_blank");
                    }}
                    className="flex-1 py-2.5 px-3 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>فتح التطبيق في نافذة مستقلة 🚀</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(OFFICIAL_APP_URL);
                      alert("تم نسخ رابط التطبيق المباشر! يمكنك فتحه في متصفح كروم وتثبيته فوراً.");
                    }}
                    className="py-2.5 px-3 bg-white border border-amber-300 text-amber-900 font-black rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-4 h-4" />
                    <span>نسخ الرابط</span>
                  </button>
                </div>
              </div>

              {/* Android Box */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">1</span>
                  <span>على هواتف أندرويد (Google Chrome / Samsung):</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed pr-7">
                  افتح الرابط المباشر للتطبيق، ثم اضغط على قائمة النقاط الثلاث <span className="font-mono font-black">⋮</span> في أعلى المتصفح، واختر <strong className="text-orange-600">"تثبيت التطبيق"</strong> أو <strong className="text-orange-600">"Install app"</strong>. ستظهر أيقونة التطبيق المخصصة فوراً على شاشة هاتفك الرئيسية.
                </p>
              </div>

              {/* iOS Box */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px]">2</span>
                  <span>على هواتف آيفون (Safari):</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed pr-7">
                  افتح الرابط المباشر في Safari، ثم اضغط على زر المشاركة <span className="font-black text-sky-600">Share ⎋</span> في أسفل الشاشة، واختر <strong className="text-orange-600">"إضافة إلى الصفحة الرئيسية (Add to Home Screen)"</strong>.
                </p>
              </div>

              {/* Dynamic Manifest Status */}
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-orange-800 font-black text-[11px]">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ملف التثبيت مفعل ومحقون ديناميكياً بالأيقونة والمقاسات الصحيحة (192x192 & 512x512)</span>
                </div>
                <p className="text-[10px] text-orange-700">
                  تم ضبط وضع التشغيل المستقل Display: standalone ليعمل التطبيق بدون أشرطة متصفح كأنه تطبيق جوال حقيقي.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPwaInstallGuide(false)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs rounded-xl shadow-xs transition-all cursor-pointer text-center"
              >
                إغلاق والعودة للتطبيق ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
