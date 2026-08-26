import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AppSettings, 
  AuditLog, 
  Category, 
  Coupon, 
  Craftsman, 
  DriverMember, 
  MapNode, 
  Order, 
  Product, 
  RegisteredCustomer,
  StaffMember, 
  Store, 
  UserProfile 
} from "../types";
import { 
  initialStaff, 
  initialDrivers, 
  initialCraftsmen, 
  initialCoupons, 
  initialAppSettings,
  initialCustomers 
} from "../data/adminInitialData";
import { AdminHeader, AdminTab } from "./admin/AdminHeader";
import { StatsTab } from "./admin/StatsTab";
import { StoresTab } from "./admin/StoresTab";
import { ProductsTab } from "./admin/ProductsTab";
import { StaffTab } from "./admin/StaffTab";
import { DriversTab } from "./admin/DriversTab";
import { CraftsmenTab } from "./admin/CraftsmenTab";
import { LandmarksTab } from "./admin/LandmarksTab";
import { CouponsTab } from "./admin/CouponsTab";
import { OrdersTab } from "./admin/OrdersTab";
import { SettingsTab } from "./admin/SettingsTab";
import { CredentialsVaultTab } from "./admin/CredentialsVaultTab";
import { OrdersArchiveReportsTab } from "./admin/OrdersArchiveReportsTab";

interface DashboardProps {
  userRole: "admin" | "store_owner" | "driver";
  userProfile: UserProfile;
  stores: Store[];
  products: Product[];
  orders: Order[];
  categories?: Category[];
  mapNodes?: MapNode[];
  onAddStore: (store: Store) => void;
  onUpdateStore: (store: Store) => void;
  onDeleteStore: (storeId: string) => void;
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, status: any) => void;
  onAssignDriver?: (orderId: string, driver: DriverMember | null) => void;
  onLogout: () => void;
  onAddCategory?: (category: Category) => void;
  onDeleteCategory?: (categoryId: string) => void;
  onAddMapNode?: (node: MapNode) => void;
  onDeleteMapNode?: (nodeId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  userRole,
  userProfile,
  stores,
  products,
  orders,
  categories = [],
  mapNodes = [],
  onAddStore,
  onUpdateStore,
  onDeleteStore,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onAssignDriver,
  onLogout,
  onAddCategory,
  onDeleteCategory,
  onAddMapNode,
  onDeleteMapNode
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>("stats");

  // Persistent Emergency Rush Mode
  const [isEmergencyRush, setIsEmergencyRush] = useState<boolean>(() => {
    return localStorage.getItem("tw_emergency_rush") === "true";
  });

  const handleToggleEmergencyRush = () => {
    const nextVal = !isEmergencyRush;
    setIsEmergencyRush(nextVal);
    localStorage.setItem("tw_emergency_rush", nextVal.toString());
  };

  // Staff Members State
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem("tw_staff_members");
      return saved ? JSON.parse(saved) : initialStaff;
    } catch {
      return initialStaff;
    }
  });

  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(() => {
    return staffList.find(s => s.role === "manager") || staffList[0] || null;
  });

  const handleAddStaff = (staff: StaffMember) => {
    const next = [...staffList, staff];
    setStaffList(next);
    localStorage.setItem("tw_staff_members", JSON.stringify(next));
  };

  const handleUpdateStaff = (staff: StaffMember) => {
    const next = staffList.map(s => s.id === staff.id ? staff : s);
    setStaffList(next);
    localStorage.setItem("tw_staff_members", JSON.stringify(next));
  };

  const handleDeleteStaff = (staffId: string) => {
    const next = staffList.filter(s => s.id !== staffId);
    setStaffList(next);
    localStorage.setItem("tw_staff_members", JSON.stringify(next));
  };

  // Drivers State
  const [driversList, setDriversList] = useState<DriverMember[]>(() => {
    try {
      const saved = localStorage.getItem("tw_drivers");
      return saved ? JSON.parse(saved) : initialDrivers;
    } catch {
      return initialDrivers;
    }
  });

  const handleAddDriver = (driver: DriverMember) => {
    const next = [...driversList, driver];
    setDriversList(next);
    localStorage.setItem("tw_drivers", JSON.stringify(next));
  };

  const handleUpdateDriver = (driver: DriverMember) => {
    const next = driversList.map(d => d.id === driver.id ? driver : d);
    setDriversList(next);
    localStorage.setItem("tw_drivers", JSON.stringify(next));
  };

  const handleDeleteDriver = (driverId: string) => {
    const next = driversList.filter(d => d.id !== driverId);
    setDriversList(next);
    localStorage.setItem("tw_drivers", JSON.stringify(next));
  };

  // Craftsmen State
  const [craftsmenList, setCraftsmenList] = useState<Craftsman[]>(() => {
    try {
      const saved = localStorage.getItem("tw_craftsmen");
      return saved ? JSON.parse(saved) : initialCraftsmen;
    } catch {
      return initialCraftsmen;
    }
  });

  const handleAddCraftsman = (craftsman: Craftsman) => {
    const next = [...craftsmenList, craftsman];
    setCraftsmenList(next);
    localStorage.setItem("tw_craftsmen", JSON.stringify(next));
  };

  const handleUpdateCraftsman = (craftsman: Craftsman) => {
    const next = craftsmenList.map(c => c.id === craftsman.id ? craftsman : c);
    setCraftsmenList(next);
    localStorage.setItem("tw_craftsmen", JSON.stringify(next));
  };

  const handleDeleteCraftsman = (id: string) => {
    const next = craftsmenList.filter(c => c.id !== id);
    setCraftsmenList(next);
    localStorage.setItem("tw_craftsmen", JSON.stringify(next));
  };

  // Coupons State
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem("tw_coupons");
      return saved ? JSON.parse(saved) : initialCoupons;
    } catch {
      return initialCoupons;
    }
  });

  const handleAddCoupon = (coupon: Coupon) => {
    const next = [...coupons, coupon];
    setCoupons(next);
    localStorage.setItem("tw_coupons", JSON.stringify(next));
  };

  const handleUpdateCoupon = (coupon: Coupon) => {
    const next = coupons.map(c => c.code === coupon.code ? coupon : c);
    setCoupons(next);
    localStorage.setItem("tw_coupons", JSON.stringify(next));
  };

  const handleDeleteCoupon = (code: string) => {
    const next = coupons.filter(c => c.code !== code);
    setCoupons(next);
    localStorage.setItem("tw_coupons", JSON.stringify(next));
  };

  // App Settings State
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem("tw_app_settings");
      return saved ? JSON.parse(saved) : initialAppSettings;
    } catch {
      return initialAppSettings;
    }
  });

  const handleUpdateAppSettings = (settings: AppSettings) => {
    setAppSettings(settings);
    localStorage.setItem("tw_app_settings", JSON.stringify(settings));
  };

  // Registered Customers State (Manual registration by admin + customers)
  const [registeredCustomers, setRegisteredCustomers] = useState<RegisteredCustomer[]>(() => {
    try {
      const saved = localStorage.getItem("tw_registered_customers");
      return saved ? JSON.parse(saved) : initialCustomers;
    } catch {
      return initialCustomers;
    }
  });

  const handleAddCustomer = (customer: RegisteredCustomer) => {
    const next = [customer, ...registeredCustomers];
    setRegisteredCustomers(next);
    localStorage.setItem("tw_registered_customers", JSON.stringify(next));
  };

  const handleUpdateCustomer = (customer: RegisteredCustomer) => {
    const next = registeredCustomers.map(c => c.id === customer.id ? customer : c);
    setRegisteredCustomers(next);
    localStorage.setItem("tw_registered_customers", JSON.stringify(next));
  };

  const handleDeleteCustomer = (customerId: string) => {
    const next = registeredCustomers.filter(c => c.id !== customerId);
    setRegisteredCustomers(next);
    localStorage.setItem("tw_registered_customers", JSON.stringify(next));
  };

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem("tw_audit_logs");
      return saved ? JSON.parse(saved) : [
        {
          id: "log_1",
          timestamp: new Date().toISOString(),
          user: "المدير العام",
          role: "manager",
          action: "تسجيل الدخول للنظام",
          details: "تم فتح لوحة التحكم المركزية للإدارة"
        }
      ];
    } catch {
      return [];
    }
  });

  // Registered customers count
  const registeredCount = Math.max(orders.length + registeredCustomers.length, registeredCustomers.length);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
      {/* Header & Tabs Navigation */}
      <AdminHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isEmergencyRush={isEmergencyRush}
        onToggleEmergencyRush={handleToggleEmergencyRush}
        staffList={staffList}
        currentStaff={currentStaff}
        onSelectStaff={setCurrentStaff}
        onLogout={onLogout}
      />

      {/* Main Tab Content */}
      <main className="transition-all duration-300 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {activeTab === "stats" && (
              <StatsTab
                stores={stores}
                products={products}
                orders={orders}
                staffList={staffList}
                driversList={driversList}
                craftsmenList={craftsmenList}
                registeredCustomersCount={registeredCount}
                onNavigateToTab={setActiveTab}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {activeTab === "archive_reports" && (
              <OrdersArchiveReportsTab
                orders={orders}
                stores={stores}
                drivers={driversList}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {activeTab === "vault" && (
              <CredentialsVaultTab
                customers={registeredCustomers}
                stores={stores}
                drivers={driversList}
                staff={staffList}
                onUpdateCustomer={handleUpdateCustomer}
                onAddCustomer={handleAddCustomer}
                onUpdateStore={onUpdateStore}
                onUpdateDriver={handleUpdateDriver}
                onUpdateStaff={handleUpdateStaff}
              />
            )}

            {activeTab === "stores" && (
              <StoresTab
                stores={stores}
                categories={categories}
                products={products}
                onAddStore={onAddStore}
                onUpdateStore={onUpdateStore}
                onDeleteStore={onDeleteStore}
                onAddCategory={onAddCategory || (() => {})}
                onDeleteCategory={onDeleteCategory || (() => {})}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {activeTab === "products" && (
              <ProductsTab
                products={products}
                stores={stores}
                categories={categories}
                onAddProduct={onAddProduct}
                onUpdateProduct={onUpdateProduct}
                onDeleteProduct={onDeleteProduct}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                orders={orders}
                driversList={driversList}
                onUpdateOrderStatus={onUpdateOrderStatus}
                onAssignDriver={onAssignDriver}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {activeTab === "staff" && (
              <StaffTab
                staffList={staffList}
                onAddStaff={handleAddStaff}
                onUpdateStaff={handleUpdateStaff}
                onDeleteStaff={handleDeleteStaff}
              />
            )}

            {activeTab === "drivers" && (
              <DriversTab
                driversList={driversList}
                onAddDriver={handleAddDriver}
                onUpdateDriver={handleUpdateDriver}
                onDeleteDriver={handleDeleteDriver}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {activeTab === "craftsmen" && (
              <CraftsmenTab
                craftsmenList={craftsmenList}
                onAddCraftsman={handleAddCraftsman}
                onUpdateCraftsman={handleUpdateCraftsman}
                onDeleteCraftsman={handleDeleteCraftsman}
              />
            )}

            {activeTab === "landmarks" && (
              <LandmarksTab
                mapNodes={mapNodes}
                onAddMapNode={onAddMapNode || (() => {})}
                onDeleteMapNode={onDeleteMapNode || (() => {})}
              />
            )}

            {activeTab === "coupons" && (
              <CouponsTab
                coupons={coupons}
                onAddCoupon={handleAddCoupon}
                onUpdateCoupon={handleUpdateCoupon}
                onDeleteCoupon={handleDeleteCoupon}
                currency={appSettings.currency || "ل.س"}
              />
            )}

            {(activeTab === "customers" || activeTab === "logs" || activeTab === "settings" || activeTab === "share") && (
              <SettingsTab
                currentSubView={activeTab}
                appSettings={appSettings}
                onUpdateAppSettings={handleUpdateAppSettings}
                orders={orders}
                registeredUsers={[]}
                registeredCustomers={registeredCustomers}
                onAddCustomer={handleAddCustomer}
                onUpdateCustomer={handleUpdateCustomer}
                onDeleteCustomer={handleDeleteCustomer}
                auditLogs={auditLogs}
                stores={stores}
                onNavigateToTab={setActiveTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
