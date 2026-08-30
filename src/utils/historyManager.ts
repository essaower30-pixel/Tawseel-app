/**
 * History & Back Button Manager
 * Prevents accidental app closure on Android/browser back button taps
 * and ensures modals, store views, and portals close gracefully.
 */

export interface BackHandlerState {
  hasOpenModal: boolean;
  closeModal: () => void;
  isViewingCart: boolean;
  closeCart: () => void;
  hasSelectedStore: boolean;
  closeStore: () => void;
  hasActiveOrder?: boolean;
  closeActiveOrder?: () => void;
  isAdminMode: boolean;
  exitAdmin: () => void;
  isDriverMode: boolean;
  exitDriver: () => void;
  currentStoreOwnerId: string | null;
  exitStoreOwner: () => void;
  selectedCategory?: string;
  resetCategory?: () => void;
}

let lastBackPressTime = 0;

/**
 * Ensures a safety history state exists
 */
export function initHistoryProtection(): void {
  if (typeof window === "undefined" || !window.history) return;
  try {
    // If state is not already tagged, replace state
    if (!window.history.state || !window.history.state.twApp) {
      window.history.replaceState({ twApp: true, depth: 1 }, "");
      window.history.pushState({ twApp: true, depth: 2 }, "");
    }
  } catch (e) {
    console.warn("History pushState error:", e);
  }
}

/**
 * Handle popstate when user presses physical or browser back button
 */
export function handleAppBackButton(
  state: BackHandlerState,
  onStayActiveNotice?: (msg: string) => void
): boolean {
  if (typeof window === "undefined") return false;

  // 1. If a modal is open, close the modal first
  if (state.hasOpenModal) {
    state.closeModal();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 2. If viewing cart, go back to main screen
  if (state.isViewingCart) {
    state.closeCart();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 3. If viewing a store's details, go back to store list
  if (state.hasSelectedStore) {
    state.closeStore();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 3b. If viewing active order tracker, go back to store list
  if (state.hasActiveOrder && state.closeActiveOrder) {
    state.closeActiveOrder();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 4. If in Admin mode, exit back to customer view
  if (state.isAdminMode) {
    state.exitAdmin();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 5. If in Driver mode, exit back to customer view
  if (state.isDriverMode) {
    state.exitDriver();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 6. If in Store Owner mode, exit back
  if (state.currentStoreOwnerId) {
    state.exitStoreOwner();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 6b. If on a filtered category (e.g. crafts or restaurants), go back to "all" stores
  if (state.selectedCategory && state.selectedCategory !== "all" && state.resetCategory) {
    state.resetCategory();
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  // 7. If at the root screen, prevent accidental app termination and inform user that notifications remain active
  const now = Date.now();
  if (now - lastBackPressTime > 2000) {
    lastBackPressTime = now;
    if (onStayActiveNotice) {
      onStayActiveNotice("التطبيق يستمر في العمل واستقبال تنبيهات ورنين الطلبات الجديدة 🔔");
    }
  } else {
    // If tapped rapidly again, reassure the user that the app is active in background
    if (onStayActiveNotice) {
      onStayActiveNotice("تطبيق التوصيل نشط في الخلفية 🛵 الإشعارات والرنين يعملان باستمرار.");
    }
  }
  window.history.pushState({ twApp: true, depth: 2 }, "");
  return true;
}
