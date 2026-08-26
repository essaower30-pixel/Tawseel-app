import { Craftsman, DriverMember, StaffMember, Coupon, AuditLog, AppSettings, RegisteredCustomer, Order } from "../types";

export const initialCustomers: RegisteredCustomer[] = [
  { 
    id: "cust_1", 
    name: "الحاج أبو عدنان (أحمد الخالد)", 
    phone: "0991447788", 
    addressLandmark: "قرب الجامع الكبير", 
    addressDetails: "المنزل الثاني خلف مئذنة الجامع",
    notes: "طلب تسجيله هاتفياً لعدم معرفته بالهواتف الذكية - يفضل التواصل بالاتصال", 
    registeredBy: "المدير العام", 
    registeredAt: "2025-01-20", 
    totalOrdersCount: 8, 
    totalSpent: 124000 
  },
  { 
    id: "cust_2", 
    name: "أم بشار النجار", 
    phone: "0992558899", 
    addressLandmark: "الحارة الشرقية", 
    addressDetails: "بجانب معصرة الزيتون القديمة",
    notes: "سُجلت بمساعدة خدمة العملاء - تفضل الدفع النقدي عند الاستلام", 
    registeredBy: "مسؤول الطلبات", 
    registeredAt: "2025-02-05", 
    totalOrdersCount: 5, 
    totalSpent: 78000 
  },
  { 
    id: "cust_3", 
    name: "الأستاذ كمال خليل", 
    phone: "0993669900", 
    addressLandmark: "حي المدارس", 
    addressDetails: "عمارة المعلمين - الطابق الأول",
    notes: "مدرس متقاعد - تم تسجيله عبر اتصال هاتفي مع الإدارة", 
    registeredBy: "المدير العام", 
    registeredAt: "2025-02-12", 
    totalOrdersCount: 3, 
    totalSpent: 45000 
  }
];

export const initialStaff: StaffMember[] = [
  { id: "staff_1", name: "المدير العام (أبو أحمد)", role: "manager", pin: "1234", phone: "0991234567", isActive: true, createdAt: "2025-01-01" },
  { id: "staff_2", name: "أحمد علي (مسؤول الطلبات)", role: "orders_clerk", pin: "5555", phone: "0992345678", isActive: true, createdAt: "2025-01-10" },
  { id: "staff_3", name: "سامر كمال (المحاسب المالي)", role: "accountant", pin: "7777", phone: "0993456789", isActive: true, createdAt: "2025-01-15" },
  { id: "staff_4", name: "مروان يوسف (موظف الدعم)", role: "support", pin: "9999", phone: "0994567890", isActive: true, createdAt: "2025-02-01" }
];

export const initialDrivers: DriverMember[] = [
  { id: "driver_1", name: "الكابتن أبو محمود", username: "capt_mahmoud", phone: "0991112233", pin: "1111", status: "available", totalDeliveries: 142, earnings: 710000, rating: 4.9, vehicle: "دراجة نارية سوزوكي", createdAt: "2025-01-10" },
  { id: "driver_2", name: "الكابتن طارق السريع", username: "capt_tarek", phone: "0992223344", pin: "2222", status: "available", totalDeliveries: 98, earnings: 490000, rating: 4.8, vehicle: "سكوتر كهربائي", createdAt: "2025-01-20" },
  { id: "driver_3", name: "الكابتن وسيم الورد", username: "capt_waseem", phone: "0993334455", pin: "3333", status: "busy", totalDeliveries: 64, earnings: 320000, rating: 4.7, vehicle: "دراجة نارية هوائية", createdAt: "2025-02-05" }
];

export const initialCraftsmen: Craftsman[] = [
  { id: "craft_1", name: "المعلم أبو خالد السباك", craft: "سباك وتمديدات صحية", phone: "0994112233", neighborhood: "الحارة الشرقية", description: "صيانة وتمديد شبكات المياه والمضخات وفلاتر المياه على مدار الساعة", availability: "available", rating: 4.9 },
  { id: "craft_2", name: "الأستاذ فادي الكهربائي", craft: "كهربائي وطاقة شمسية", phone: "0995223344", neighborhood: "قرب الجامع الكبير", description: "تمديدات منزلية، صيانة إنفرتر وبطاريات طاقة شمسية، تصليح غسالات وبرادات", availability: "available", rating: 4.9 },
  { id: "craft_3", name: "المعلم هيثم النجار", craft: "نجارة وموبيليا وألمنيوم", phone: "0996334455", neighborhood: "شارع البلدية", description: "تفصيل وتصليح غرف نوم، مطابخ ألمنيوم، شبابيك وأبواب خشبية", availability: "available", rating: 4.8 },
  { id: "craft_4", name: "الحداد أبو سمير", craft: "حدادة وأبواب فولاذية", phone: "0997445566", neighborhood: "طريق السهل", description: "أبواب حماية، حمايات نوافذ، تصليح خزانات حديد وشناكل زراعية", availability: "available", rating: 4.7 },
  { id: "craft_5", name: "الدكتور سامر البيطار", craft: "طبيب بيطري وأدوية زراعية", phone: "0998556677", neighborhood: "مفرق المزارع", description: "معاينة الأبقار والمواشي والدواجن، توفير لقاحات وأدوية مرخصة", availability: "available", rating: 5.0 },
  { id: "craft_6", name: "الأسطى رضوان الميكانيكي", craft: "ميكانيك سيارات ودراجات", phone: "0999667788", neighborhood: "المدخل الغربي", description: "صيانة كهرباء وميكانيك الدراجات النارية والسيارات والشاحنات الخفيفة", availability: "available", rating: 4.8 }
];

export const initialCoupons: Coupon[] = [
  { code: "RAMADAN2025", discountPercent: 15, maxDiscount: 25000, minOrder: 50000, isActive: true },
  { code: "VILLAGE10", discountPercent: 10, maxDiscount: 15000, minOrder: 30000, isActive: true },
  { code: "WELCOME", discountPercent: 20, maxDiscount: 30000, minOrder: 40000, isActive: true }
];

export const initialAppSettings: AppSettings = {
  appName: "توصيل القرية الذكي",
  contactPhone: "0991234567",
  currency: "ل.س",
  baseDeliveryFee: 5000,
  minOrderValue: 10000,
  activeRegions: ["وسط البلد", "الحارة الشرقية", "الحارة الغربية", "حي المدارس", "طريق السهل", "منطقة المزارع"]
};

export const initialOrders: Order[] = [
  {
    id: "tw-98124",
    storeId: "1",
    storeName: "شاورما وبطاطا الضيعة",
    status: "picked_up",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    customerName: "الحاج أبو عدنان (أحمد الخالد)",
    customerPhone: "0991447788",
    addressLandmark: "قرب الجامع الكبير",
    addressDetails: "المنزل الثاني خلف مئذنة الجامع",
    driverId: "driver_1",
    driverName: "الكابتن أبو محمود",
    driverPhone: "0991112233",
    driverVehicle: "دراجة نارية سوزوكي",
    assignedAt: new Date(Date.now() - 10 * 60000).toISOString(),
    subtotal: 35000,
    deliveryFee: 5000,
    total: 40000,
    items: [
      {
        product: {
          id: "p1",
          name: "وجبة شاورما عربي دبل",
          price: 25000,
          description: "شاورما لحم عربي مع بطاطا ومخلل وثومية",
          image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500&auto=format&fit=crop&q=60",
          category: "food",
          storeId: "1"
        },
        quantity: 1,
        totalItemPrice: 25000
      },
      {
        product: {
          id: "p2",
          name: "صحن بطاطا مقلية عائلي",
          price: 10000,
          description: "بطاطا مقرمشة طازجة مع بهارات مميزة",
          image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&auto=format&fit=crop&q=60",
          category: "food",
          storeId: "1"
        },
        quantity: 1,
        totalItemPrice: 10000
      }
    ]
  },
  {
    id: "tw-98125",
    storeId: "2",
    storeName: "سوبرماركت الأمانة",
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
    customerName: "أم بشار النجار",
    customerPhone: "0992558899",
    addressLandmark: "الحارة الشرقية",
    addressDetails: "بجانب معصرة الزيتون القديمة",
    subtotal: 48000,
    deliveryFee: 5000,
    total: 53000,
    items: [
      {
        product: {
          id: "p3",
          name: "زيت زيتون بلدي بكر (1 لتر)",
          price: 40000,
          description: "عصرة أولى معصور على البارد",
          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60",
          category: "supermarkets",
          storeId: "2"
        },
        quantity: 1,
        totalItemPrice: 40000
      },
      {
        product: {
          id: "p4",
          name: "سكر أبيض ناعم (1 كغ)",
          price: 8000,
          description: "سكر نقي ممتاز للحلويات والشاي",
          image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=500&auto=format&fit=crop&q=60",
          category: "supermarkets",
          storeId: "2"
        },
        quantity: 1,
        totalItemPrice: 8000
      }
    ]
  }
];
