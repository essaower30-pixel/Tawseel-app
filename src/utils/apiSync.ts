import { Store, Order, Product, Category } from "../types";
import { initialStores, initialProducts, initialCategories, initialMapNodes } from "../data/initialData";
import { initialOrders } from "../data/adminInitialData";

export interface ServerNotification {
  id: string;
  type: "STORE_REGISTERED" | "STORE_APPROVED" | "NEW_ORDER" | "ORDER_UPDATED";
  title: string;
  message: string;
  targetStoreId?: string;
  order?: Order;
  timestamp: number;
}

export interface ServerSyncData {
  stores: Store[];
  products: Product[];
  orders: Order[];
  notifications?: ServerNotification[];
  categories?: Category[];
  lastUpdated: number;
}

const API_BASE = "";

// Ensure gypsum decor store is in initial list if missing from local cache
export function ensureInitialStoresPreserved(currentStores: Store[]): Store[] {
  const gypsumStore = initialStores.find(s => s.id === "store_gypsum_decor" || s.ownerPhone === "0961141215");
  if (!gypsumStore) return currentStores;

  const exists = currentStores.some(s => s.id === gypsumStore.id || s.ownerPhone === gypsumStore.ownerPhone);
  if (!exists) {
    return [gypsumStore, ...currentStores];
  }
  return currentStores;
}

// Fetch unified data from central server
export async function fetchServerSync(): Promise<ServerSyncData | null> {
  try {
    const res = await fetch(`${API_BASE}/api/sync`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store"
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    // Graceful offline fallback
    return null;
  }
}

// Register or Add a new Store on the central server (so all devices see it immediately)
export async function registerStoreOnServer(store: Store): Promise<Store> {
  try {
    const res = await fetch(`${API_BASE}/api/stores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store)
    });
    if (res.ok) {
      const data = await res.json();
      return data.store || store;
    }
  } catch (err) {
    console.warn("Failed to reach server, saved locally:", err);
  }
  return store;
}

// Approve and activate a store (Sets isApproved: true, status: 'open')
export async function approveStoreOnServer(storeId: string): Promise<Store | null> {
  try {
    const res = await fetch(`${API_BASE}/api/stores/${storeId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      const data = await res.json();
      return data.store || null;
    }
  } catch (err) {
    console.warn("Failed to approve store on server:", err);
  }
  return null;
}

// Update store details on central server
export async function updateStoreOnServer(store: Store): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/stores/${store.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(store)
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

// Delete store from central server
export async function deleteStoreOnServer(storeId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/stores/${storeId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

// Add/save order on central server
export async function saveOrderOnServer(order: Order): Promise<Order> {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });
    if (res.ok) {
      const data = await res.json();
      return data.order || order;
    }
  } catch (err) {
    console.warn("Failed to send order to server:", err);
  }
  return order;
}

// Update order status on central server
export async function updateOrderOnServer(orderId: string, updates: Partial<Order>): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

// Save product on central server
export async function saveProductOnServer(product: Product): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (res.ok) {
      const data = await res.json();
      return data.product || product;
    }
  } catch (err) {
    console.warn("Failed to send product to server:", err);
  }
  return product;
}

// Update product on central server
export async function updateProductOnServer(product: Product): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

// Delete product on central server
export async function deleteProductOnServer(productId: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/products/${productId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

