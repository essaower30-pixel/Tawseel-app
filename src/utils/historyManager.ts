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
  isAdminMode: boolean;
  exitAdmin: () => void;
  isDriverMode: boolean;
  exitDriver: () => void;
  currentStoreOwnerId: string | null;
  exitStoreOwner: () => void;
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

  // 7. If at the root screen, prevent accidental tab exit and inform user that background notifications stay active
  const now = Date.now();
  if (now - lastBackPressTime > 2500) {
    lastBackPressTime = now;
    if (onStayActiveNotice) {
      onStayActiveNotice("التطبيق يستمر في العمل واستقبال تنبيهات الطلبات الجديدة 🔔");
    }
    window.history.pushState({ twApp: true, depth: 2 }, "");
    return true;
  }

  return false;
}
