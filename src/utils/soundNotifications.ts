/**
 * Sound & System Notification Manager
 * Provides Web Audio API synthesized ringtones and Web Notification API integration.
 */

export type SoundType = "chime" | "ringtone" | "cashier" | "urgent";

const STORAGE_SOUND_ENABLED = "tw_sound_notifications_enabled";
const STORAGE_SOUND_TYPE = "tw_sound_notification_type";
const STORAGE_SOUND_VOLUME = "tw_sound_notification_volume";

// Shared AudioContext
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

// Unlock audio on first touch/click
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    // Remove listeners once unlocked
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("touchstart", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
  window.addEventListener("click", unlockAudio, { passive: true });
  window.addEventListener("touchstart", unlockAudio, { passive: true });
  window.addEventListener("keydown", unlockAudio, { passive: true });
}

/**
 * Check if sound notifications are enabled
 */
export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_SOUND_ENABLED);
  return stored === null ? true : stored === "true";
}

/**
 * Toggle or set sound notifications enabled
 */
export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_SOUND_ENABLED, String(enabled));
  // Unlock audio if enabling
  if (enabled) {
    getAudioContext();
  }
}

/**
 * Get configured sound type
 */
export function getSoundType(): SoundType {
  if (typeof window === "undefined") return "chime";
  return (localStorage.getItem(STORAGE_SOUND_TYPE) as SoundType) || "chime";
}

/**
 * Set sound type
 */
export function setSoundType(type: SoundType): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_SOUND_TYPE, type);
}

/**
 * Play a synthesized sound alert for incoming orders
 */
export function playOrderAlertSound(typeOverride?: SoundType): void {
  if (!isSoundEnabled()) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const type = typeOverride || getSoundType();
    const now = ctx.currentTime;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.7, now);
    masterGain.connect(ctx.destination);

    if (type === "cashier") {
      // Crisp "Cha-Ching" cashier bell
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(987.77, now); // B5
      gain1.gain.setValueAtTime(0.6, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain1);
      gain1.connect(masterGain);
      osc1.start(now);
      osc1.stop(now + 0.5);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(1318.51, now + 0.08); // E6
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.setValueAtTime(0.8, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now + 0.08);
      osc2.stop(now + 1.2);

    } else if (type === "ringtone") {
      // Pleasant double ring / phone chime
      const playPulse = (startTime: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, startTime);
        osc.frequency.setValueAtTime(850, startTime + 0.05);
        osc.frequency.setValueAtTime(800, startTime + 0.1);
        
        gain.gain.setValueAtTime(0.5, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.35);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      };

      playPulse(now);
      playPulse(now + 0.18);
      playPulse(now + 0.55);
      playPulse(now + 0.73);

    } else if (type === "urgent") {
      // Vibrant attention-getting triple beep
      [0, 0.14, 0.28, 0.5, 0.64].forEach((offset, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        const freq = idx >= 3 ? 1046.5 : 880; // High A5 to C6
        osc.frequency.setValueAtTime(freq, now + offset);
        gain.gain.setValueAtTime(0.35, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now + offset);
        osc.stop(now + offset + 0.1);
      });

    } else {
      // "Chime" default: Elegant 3-note melodic arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [
        { freq: 523.25, time: 0, dur: 0.3 }, // C5
        { freq: 659.25, time: 0.12, dur: 0.3 }, // E5
        { freq: 783.99, time: 0.24, dur: 0.4 }, // G5
        { freq: 1046.50, time: 0.38, dur: 0.9 }, // C6
      ];

      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(n.freq, now + n.time);
        
        gain.gain.setValueAtTime(0, now + n.time);
        gain.gain.linearRampToValueAtTime(0.6, now + n.time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.time + n.dur);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now + n.time);
        osc.stop(now + n.time + n.dur);
      });
    }
  } catch (err) {
    console.warn("Could not play synthesized order alert:", err);
  }
}

/**
 * Request Notification permission from browser
 */
export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return false;
  }
  try {
    if (Notification.permission === "granted") {
      return true;
    }
    if (Notification.permission !== "denied") {
      const result = await Notification.requestPermission();
      return result === "granted";
    }
    return false;
  } catch (e) {
    console.warn("Notification permission request failed:", e);
    return false;
  }
}

/**
 * Show system / browser notification if permitted
 */
export function showSystemNotification(title: string, options?: NotificationOptions): void {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "granted") {
    try {
      const n = new Notification(title, {
        icon: "/icon-192.png",
        badge: "/icon-192.png",
        dir: "rtl",
        lang: "ar",
        ...options,
      });
      n.onclick = () => {
        window.focus();
        n.close();
      };
    } catch (e) {
      console.warn("System notification error:", e);
    }
  }
}

/**
 * Cross-tab and Background Broadcast Channel for Real-time events
 */
let broadcastChannel: BroadcastChannel | null = null;

export function getOrderBroadcastChannel(): BroadcastChannel | null {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) return null;
  if (!broadcastChannel) {
    try {
      broadcastChannel = new BroadcastChannel("tw_live_orders_channel");
    } catch (e) {
      console.warn("BroadcastChannel not supported:", e);
    }
  }
  return broadcastChannel;
}

export function broadcastNewOrder(order: any): void {
  const channel = getOrderBroadcastChannel();
  if (channel) {
    try {
      channel.postMessage({ type: "NEW_ORDER", order, timestamp: Date.now() });
    } catch {}
  }
  // Also dispatch a window event for same-tab subscribers
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("tw_new_order_event", { detail: { order, timestamp: Date.now() } })
    );
  }
}
