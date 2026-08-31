import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

const STORAGE_FILE = path.join(process.cwd(), "server_storage.json");

// Default initial stores
const defaultInitialStores = [
  {
    id: "store_yasmin",
    name: "مطعم الياسمين الدمشقي",
    category: "restaurants",
    image: "https://images.unsplash.com/photo-1561651823-34feb02250e4?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    deliveryTime: "20-30 دقيقة",
    deliveryFee: 5,
    locationNode: "store_yasmin",
    featuredProduct: "شاورما دجاج سوبر محمرة",
    status: "open",
    isApproved: true,
    description: "أشهى المأكولات الشامية والشاورما والبروستد بالطعم الأصلي",
    workingHours: "11:00 ص - 12:00 م"
  },
  {
    id: "store_pizza",
    name: "مطعم بيتزا الضيعة",
    category: "restaurants",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60",
    rating: 4.6,
    deliveryTime: "25-35 دقيقة",
    deliveryFee: 6,
    locationNode: "store_pizza",
    featuredProduct: "بيتزا نابوليتانا بالفرن العربي",
    status: "open",
    isApproved: true,
    description: "بيتزا نابوليتانا، مناقيش وفطائر طازجة على الحطب",
    workingHours: "12:00 م - 01:00 ص"
  },
  {
    id: "store_baraka",
    name: "سوبرماركت البركة للغذاء",
    category: "supermarkets",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    deliveryTime: "15-25 دقيقة",
    deliveryFee: 4,
    locationNode: "store_baraka",
    featuredProduct: "سلة التوفير الأسبوعية للقرية",
    status: "open",
    isApproved: true,
    description: "كافة المواد الغذائية، التموينية، المنظفات والألبان الطازجة",
    workingHours: "08:00 ص - 12:00 منتصف الليل"
  },
  {
    id: "store_shifa",
    name: "صيدلية الشفاء المركزية",
    category: "pharmacies",
    image: "https://images.unsplash.com/photo-1586015555751-63c25a0b73c4?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    deliveryTime: "10-20 دقيقة",
    deliveryFee: 3,
    locationNode: "store_shifa",
    featuredProduct: "حقيبة الإسعافات المنزلية الشاملة",
    status: "open",
    isApproved: true,
    description: "أدوية، مستلزمات طبية، رعاية الأم والطفل وحليب الرضع",
    workingHours: "خدمة 24 ساعة متواصلة"
  },
  {
    id: "store_elite",
    name: "خضروات وفواكه النخبة",
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500&auto=format&fit=crop&q=60",
    rating: 4.7,
    deliveryTime: "20-30 دقيقة",
    deliveryFee: 4,
    locationNode: "store_elite",
    featuredProduct: "صندوق خضار المزرعة اليومي المشكل",
    status: "open",
    isApproved: true,
    description: "خضار وفاكهة منتقاة بعناية يومياً من مزارع القرية والمحافظة",
    workingHours: "07:00 ص - 10:00 م"
  },
  {
    id: "store_baghdad",
    name: "حلويات بغداد الشرقية",
    category: "sweets",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&auto=format&fit=crop&q=60",
    rating: 4.8,
    deliveryTime: "25-35 دقيقة",
    deliveryFee: 5,
    locationNode: "store_baghdad",
    featuredProduct: "صينية وربات وكنافة نابلسية خشنة",
    status: "open",
    isApproved: true,
    description: "أشهى الحلويات الشرقية، الكنافة، البقلاوة والمعمول الفاخر بالسمن العربي",
    workingHours: "10:00 ص - 11:00 م"
  },
  {
    id: "clinic_dr_ahmad",
    name: "عيادة الدكتور أحمد لطب الأسرة",
    category: "doctors",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&auto=format&fit=crop&q=60",
    rating: 4.95,
    deliveryTime: "حجز مسبق",
    deliveryFee: 0,
    locationNode: "center",
    featuredProduct: "استشارة وزيارة منزلية لكبار السن",
    contactPhone: "0933112233",
    status: "open",
    isApproved: true,
    isService: true,
    description: "فحص عام، متابعة الضغط والسكري، ومعاينة الحالات الطارئة",
    workingHours: "04:00 م - 09:00 م"
  },
  {
    id: "craft_electric",
    name: "ورشة النور للتمديدات والكهرباء",
    category: "crafts",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60",
    rating: 4.85,
    deliveryTime: "طلب فوري",
    deliveryFee: 0,
    locationNode: "center",
    featuredProduct: "صيانة طوارئ وأعطال منزلية سريعة",
    contactPhone: "0944556677",
    status: "open",
    isApproved: true,
    isService: true,
    description: "صيانة منزلية، تمديد كابلات وإنارة، تركيب طاقة شمسية"
  },
  {
    id: "craft_paint",
    name: "ورشة المعلم سامر للدهان والديكور",
    category: "crafts",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60",
    rating: 4.75,
    deliveryTime: "حسب الاتفاق",
    deliveryFee: 0,
    locationNode: "center",
    featuredProduct: "دهانات وديكورات داخلية وخارجية",
    contactPhone: "0955667788",
    status: "open",
    isApproved: true,
    isService: true,
    description: "دهان منازل، ديكورات جصية وورق جدران"
  },
  {
    id: "service_taxi",
    name: "كابتن تيسير للتوصيل الخاص",
    category: "drivers",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60",
    rating: 4.9,
    deliveryTime: "طلب فوري",
    deliveryFee: 0,
    locationNode: "center",
    featuredProduct: "توصيل ركاب ورحلات خارجية",
    contactPhone: "0966778899",
    status: "open",
    isApproved: true,
    isService: true,
    description: "توصيل خاص للقرى المجاورة والمدينة بسيارة مكيفة"
  },
  {
    id: "store_gypsum_decor",
    name: "جبس بورد وديكور",
    category: "crafts",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    deliveryTime: "حسب الاتفاق والمقاسات",
    deliveryFee: 0,
    locationNode: "center",
    featuredProduct: "ديكورات جبس بورد وأسقف مستعارة وقواطع جدارية",
    contactPhone: "0961141215",
    ownerPhone: "0961141215",
    ownerName: "فني ديكور وجبس",
    ownerPin: "1234",
    status: "closed",
    isApproved: false,
    isService: true,
    description: "تركيب وتنفيذ أعمال جبس بورد، أسقف معلقة، ديكورات شاشات، قواطع جدارية، وإضاءة ليد بروفايل مخفية عصرية",
    workingHours: "09:00 ص - 09:00 م",
    priority: 1
  }
];

function readServerData() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed.isCleanSlate) {
        if (!parsed.stores) parsed.stores = [];
        if (!parsed.orders) parsed.orders = [];
        if (!parsed.products) parsed.products = [];
        if (!parsed.notifications) parsed.notifications = [];
        return parsed;
      }
      if (!parsed.stores) parsed.stores = defaultInitialStores;
      if (!parsed.orders) parsed.orders = [];
      if (!parsed.products) parsed.products = [];
      if (!parsed.notifications) parsed.notifications = [];
      
      // Ensure gypsum decor store exists if not clean slate
      if (!parsed.stores.some((s: any) => s.id === "store_gypsum_decor" || s.ownerPhone === "0961141215")) {
        const gypsum = defaultInitialStores.find((s) => s.id === "store_gypsum_decor");
        if (gypsum) {
          parsed.stores.unshift(gypsum);
          writeServerData(parsed);
        }
      }
      return parsed;
    }
  } catch (err) {
    console.error("Error reading server storage:", err);
  }

  const initialData = {
    isCleanSlate: false,
    stores: defaultInitialStores,
    orders: [],
    products: [],
    notifications: [],
    lastUpdated: Date.now()
  };
  writeServerData(initialData);
  return initialData;
}

function writeServerData(data: any) {
  try {
    data.lastUpdated = Date.now();
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing server storage:", err);
  }
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 2. API: Unified Full Sync Endpoint
app.get("/api/sync", (req, res) => {
  const data = readServerData();
  res.json(data);
});

// 3. API: Get all stores
app.get("/api/stores", (req, res) => {
  const data = readServerData();
  res.json(data.stores || []);
});

// 4. API: Register / Add a store (from mobile merchant registration or admin dashboard)
app.post("/api/stores", (req, res) => {
  const newStore = req.body;
  if (!newStore || !newStore.name) {
    return res.status(400).json({ error: "اسم المتجر مطلوب" });
  }

  const data = readServerData();
  const cleanPhone = (p?: string) => (p || "").replace(/[^0-9]/g, "");
  const targetPhone = cleanPhone(newStore.ownerPhone || newStore.contactPhone);

  const existingIdx = data.stores.findIndex((s: any) => {
    if (s.id === newStore.id) return true;
    if (targetPhone && (cleanPhone(s.ownerPhone) === targetPhone || cleanPhone(s.contactPhone) === targetPhone)) {
      return true;
    }
    return false;
  });

  if (existingIdx >= 0) {
    data.stores[existingIdx] = { ...data.stores[existingIdx], ...newStore };
  } else {
    data.stores.unshift(newStore);
  }

  // Record system broadcast notification
  data.notifications = [
    {
      id: "notif_" + Date.now(),
      type: "STORE_REGISTERED",
      title: "طلب انضمام متجر جديد 🏪",
      message: `قام متجر "${newStore.name}" بالتسجيل وينتظر موافقة واعتماد الإدارة.`,
      targetStoreId: newStore.id,
      timestamp: Date.now()
    },
    ...(data.notifications || []).slice(0, 30)
  ];

  writeServerData(data);
  return res.json({ success: true, store: newStore });
});

// 5. API: Approve Store (Sets isApproved: true, status: 'open')
app.post("/api/stores/:id/approve", (req, res) => {
  const storeId = req.params.id;
  const data = readServerData();
  const store = data.stores.find((s: any) => s.id === storeId);

  if (!store) {
    return res.status(404).json({ error: "المتجر غير موجود" });
  }

  store.isApproved = true;
  store.status = "open";

  // Add approval broadcast notification
  data.notifications = [
    {
      id: "notif_" + Date.now(),
      type: "STORE_APPROVED",
      title: "تم اعتماد وتفعيل المتجر 🎉",
      message: `تم اعتماد وتفعيل متجر "${store.name}" بنجاح وأصبح متاحاً للزبائن.`,
      targetStoreId: store.id,
      timestamp: Date.now()
    },
    ...(data.notifications || []).slice(0, 30)
  ];

  writeServerData(data);
  return res.json({ success: true, store });
});

// 6. API: Update Store
app.put("/api/stores/:id", (req, res) => {
  const storeId = req.params.id;
  const updates = req.body;
  const data = readServerData();
  const idx = data.stores.findIndex((s: any) => s.id === storeId);

  if (idx >= 0) {
    data.stores[idx] = { ...data.stores[idx], ...updates };
    writeServerData(data);
    return res.json({ success: true, store: data.stores[idx] });
  }

  return res.status(404).json({ error: "المتجر غير موجود" });
});

// 7. API: Delete Store
app.delete("/api/stores/:id", (req, res) => {
  const storeId = req.params.id;
  const data = readServerData();
  data.stores = data.stores.filter((s: any) => s.id !== storeId);
  writeServerData(data);
  res.json({ success: true });
});

// 8. API: Orders
app.get("/api/orders", (req, res) => {
  const data = readServerData();
  res.json(data.orders || []);
});

app.post("/api/orders", (req, res) => {
  const newOrder = req.body;
  const data = readServerData();
  data.orders = [newOrder, ...(data.orders || []).filter((o: any) => o.id !== newOrder.id)];

  // Record new order notification
  data.notifications = [
    {
      id: "notif_order_" + Date.now(),
      type: "NEW_ORDER",
      title: "طلب جديد وارد! 🛍️",
      message: `طلب #${newOrder.id} وارد إلى (${newOrder.storeName}) بقيمة ${newOrder.total} ل.س`,
      targetStoreId: newOrder.storeId,
      order: newOrder,
      timestamp: Date.now()
    },
    ...(data.notifications || []).slice(0, 30)
  ];

  writeServerData(data);
  res.json({ success: true, order: newOrder });
});

app.put("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const updates = req.body;
  const data = readServerData();
  const idx = data.orders.findIndex((o: any) => o.id === orderId);
  if (idx >= 0) {
    data.orders[idx] = { ...data.orders[idx], ...updates };

    // Record order status update notification
    data.notifications = [
      {
        id: "notif_update_" + Date.now(),
        type: "ORDER_UPDATED",
        title: "تحديث حالة الطلب 📦",
        message: `الطلب #${orderId}: ${updates.status || "تم تحديث الطلب"}`,
        order: data.orders[idx],
        timestamp: Date.now()
      },
      ...(data.notifications || []).slice(0, 30)
    ];

    writeServerData(data);
    return res.json({ success: true, order: data.orders[idx] });
  }
  res.status(404).json({ error: "الطلب غير موجود" });
});

// 9. API: Products
app.get("/api/products", (req, res) => {
  const data = readServerData();
  res.json(data.products || []);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  const data = readServerData();
  data.products = [newProduct, ...(data.products || []).filter((p: any) => p.id !== newProduct.id)];
  writeServerData(data);
  res.json({ success: true, product: newProduct });
});

app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const updates = req.body;
  const data = readServerData();
  const idx = (data.products || []).findIndex((p: any) => p.id === productId);
  if (idx >= 0) {
    data.products[idx] = { ...data.products[idx], ...updates };
    writeServerData(data);
    return res.json({ success: true, product: data.products[idx] });
  }
  res.status(404).json({ error: "المنتج غير موجود" });
});

app.delete("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const data = readServerData();
  data.products = (data.products || []).filter((p: any) => p.id !== productId);
  writeServerData(data);
  res.json({ success: true });
});

// 10. API: Clean Slate (Zero out demo data while preserving server data structures)
app.post("/api/clean-slate", (req, res) => {
  const { preserveCustomOnly, target } = req.body || {};
  const currentData = readServerData();

  if (target === "orders_only") {
    currentData.orders = [];
    currentData.notifications = [];
    writeServerData(currentData);
    return res.json({ success: true, message: "تم تصفير كافة الطلبات التجريبية بنجاح" });
  }

  // Complete Clean Slate
  const cleanedData = {
    isCleanSlate: true,
    stores: [],
    products: [],
    orders: [],
    notifications: [
      {
        id: "notif_clean_" + Date.now(),
        type: "SYSTEM",
        title: "تم تصفير البيانات التجريبية ✨",
        message: "تم بدء النظام على نظافة تامة وجاهز لإضافة متاجر القرية الحقيقية.",
        timestamp: Date.now()
      }
    ],
    lastUpdated: Date.now()
  };

  writeServerData(cleanedData);
  return res.json({ 
    success: true, 
    message: "تم تصفير كافة الأمثلة التجريبية والبدء على نظافة تامة مع حفظ هيكل البرنامج وإعداداته." 
  });
});

// 11. API: Restore Default Demo Data
app.post("/api/restore-defaults", (req, res) => {
  const resetData = {
    isCleanSlate: false,
    stores: defaultInitialStores,
    products: [],
    orders: [],
    notifications: [],
    lastUpdated: Date.now()
  };
  writeServerData(resetData);
  return res.json({ success: true, message: "تمت استعادة البيانات التجريبية الافتراضية بنجاح" });
});

// Mount Vite middleware for dev or static files for prod
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

start();

