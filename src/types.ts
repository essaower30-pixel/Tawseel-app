export interface StoreSize {
  name: string;
  price: number;
}

export interface StoreAddition {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  unit?: string;
  stock?: number;
  description: string;
  image: string;
  category: string;
  storeId: string;
  isOffer?: boolean;
  originalPrice?: number;
  offerLabel?: string;
  sizes?: StoreSize[];
  additions?: StoreAddition[];
  isHidden?: boolean;
}

export interface Store {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  locationNode: string;
  featuredProduct?: string;
  contactPhone?: string;
  ownerName?: string;
  ownerPhone?: string;
  ownerPin?: string;
  isApproved?: boolean;
  status?: "open" | "closed";
  description?: string;
  workingHours?: string;
  priority?: number;
  maxRegularProducts?: number;
  maxOfferProducts?: number;
  isService?: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface MapNode {
  id: string;
  name: string;
  x: number;
  y: number;
  type: "intersection" | "store" | "landmark";
  arabicName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: StoreSize;
  selectedAdditions?: StoreAddition[];
  totalItemPrice: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  pin: string;
  storeId?: string;
}

export interface RegisteredCustomer {
  id: string;
  name: string;
  phone: string;
  addressLandmark?: string;
  addressDetails?: string;
  notes?: string;
  registeredBy?: string; // e.g. "المدير العام"
  registeredAt: string;
  totalOrdersCount?: number;
  totalSpent?: number;
}

export interface Message {
  id: string;
  sender: "customer" | "driver" | "store" | "system";
  text?: string;
  audioUrl?: string;
  audioDuration?: number;
  imageUrl?: string;
  timestamp: string;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  couponCode?: string;
  total: number;
  status: "pending" | "accepted" | "preparing" | "picked_up" | "delivered" | "cancelled";
  createdAt: string;
  customerName: string;
  customerPhone: string;
  addressLandmark: string;
  addressDetails?: string;
  notes?: string;
  paymentMethod?: "cash" | "electronic";
  customOrderText?: string;
  prescriptionImage?: string;
  prescriptionNotes?: string;
  isServiceOrder?: boolean;
  serviceType?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverVehicle?: string;
  assignedAt?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder?: number;
  isActive: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: "manager" | "orders_clerk" | "accountant" | "support";
  pin: string;
  phone?: string;
  isActive?: boolean;
  createdAt?: string;
}

export interface DriverMember {
  id: string;
  name: string;
  phone: string;
  username?: string;
  password?: string;
  pin?: string;
  status: "available" | "busy" | "offline";
  totalDeliveries?: number;
  earnings?: number;
  rating?: number;
  vehicle?: string;
  notes?: string;
  createdAt?: string;
}

export interface Craftsman {
  id: string;
  name: string;
  craft: string;
  phone: string;
  neighborhood: string;
  description?: string;
  availability?: "available" | "busy" | "offline";
  rating?: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
}

export interface AppSettings {
  appName: string;
  logoUrl?: string;
  customAppIcon?: string;
  contactPhone: string;
  currency: string;
  baseDeliveryFee: number;
  minOrderValue: number;
  activeRegions: string[];
}
