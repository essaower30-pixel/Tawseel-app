import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bell, 
  Volume2, 
  VolumeX, 
  X, 
  ShoppingBag, 
  ArrowLeft, 
  Bike, 
  Store as StoreIcon, 
  Sparkles,
  Music
} from "lucide-react";
import { Order } from "../types";
import { 
  isSoundEnabled, 
  setSoundEnabled, 
  playOrderAlertSound, 
  getSoundType, 
  setSoundType, 
  SoundType 
} from "../utils/soundNotifications";

export interface ToastItem {
  id: string;
  order?: Order;
  title: string;
  message: string;
  targetRole?: "admin" | "store_owner" | "driver" | "customer" | "all";
  type: "new_order" | "status_change" | "driver_assigned" | "info" | "success" | "warning";
  createdAt: number;
}

interface ToastNotificationProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  onDismissAll?: () => void;
  onViewOrder: (order: Order) => void;
  currentRole: string;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toasts,
  onDismiss,
  onDismissAll,
  onViewOrder,
  currentRole,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());
  const [soundChoice, setSoundChoice] = useState<SoundType>(() => getSoundType());
  const [showSoundSettings, setShowSoundSettings] = useState<boolean>(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playOrderAlertSound();
    }
  };

  const handleSoundSelect = (type: SoundType) => {
    setSoundChoice(type);
    setSoundType(type);
    playOrderAlertSound(type);
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex flex-col items-center gap-2.5 pointer-events-none max-w-md mx-auto" dir="rtl">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.15 } }}
            className="w-full pointer-events-auto bg-slate-900/95 text-white backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border border-orange-500/40 relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/15 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

            <div className="flex items-start gap-3">
              {/* Icon Badge */}
              <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30 animate-bounce-slow">
                {toast.type === "new_order" ? (
                  <ShoppingBag className="w-6 h-6" />
                ) : toast.type === "driver_assigned" ? (
                  <Bike className="w-6 h-6" />
                ) : (
                  <Bell className="w-6 h-6" />
                )}
              </div>

              {/* Toast Content */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-black text-sm text-white flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400 inline" />
                      {toast.title}
                    </span>

                    {toast.type === "info" ? (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
                        التطبيق نشط ⚡
                      </span>
                    ) : (
                      <span className="bg-orange-500/20 text-orange-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-500/30">
                        {currentRole === "admin"
                          ? "إشعار الإدارة 🛡️"
                          : currentRole === "store_owner"
                          ? "إشعار المتجر 🏪"
                          : currentRole === "driver"
                          ? "إشعار الكابتن 🛵"
                          : `طلب #${toast.order.id}`}
                      </span>
                    )}

                    {soundOn && toast.type === "new_order" && (
                      <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-emerald-500/20 flex items-center gap-0.5">
                        <Volume2 className="w-2.5 h-2.5 animate-pulse" />
                        <span>رنين</span>
                      </span>
                    )}
                  </div>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => onDismiss(toast.id)}
                    className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-bold leading-relaxed line-clamp-2">
                  {toast.message}
                </p>

                {/* Details summary (only for real orders) */}
                {toast.type !== "info" && toast.order.id !== "tw-live" && (
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-300 flex-wrap">
                    {toast.order.storeName && (
                      <span className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">
                        <StoreIcon className="w-3 h-3 text-orange-400" />
                        {toast.order.storeName}
                      </span>
                    )}
                    {toast.order.total !== undefined && toast.order.total > 0 && (
                      <span className="font-black text-orange-400 bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-700">
                        {toast.order.total.toLocaleString()} ل.س
                      </span>
                    )}
                    {toast.order.customerName && (
                      <span className="text-slate-400">
                        👤 {toast.order.customerName}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2.5 mt-1 border-t border-slate-800">
                  {toast.type === "info" || toast.order.id === "tw-live" ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (onDismissAll) {
                          onDismissAll();
                        } else {
                          onDismiss(toast.id);
                        }
                      }}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black py-2 px-3 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>حسناً، التطبيق قيد العمل بنجاح ✓</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onViewOrder(toast.order);
                        onDismiss(toast.id);
                      }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-black py-2 px-3 rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5"
                    >
                      <span>
                        {currentRole === "admin"
                          ? "معاينة وإدارة الطلب في لوحة الإدارة 🛵"
                          : currentRole === "store_owner"
                          ? "قبول وتجهيز الطلب في المتجر ⚡"
                          : currentRole === "driver"
                          ? "استلام وتوصيل الطلب 🚀"
                          : "معاينة وتفاصيل الطلب"}
                      </span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Sound quick toggle button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={toggleSound}
                      className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
                        soundOn
                          ? "bg-slate-800 text-orange-400 border-orange-500/40 hover:bg-slate-700"
                          : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                      }`}
                      title={soundOn ? "صوت الرنين مفعّل (انقر للكتم)" : "صوت الرنين مكتوم (انقر للتفعيل)"}
                    >
                      {soundOn ? (
                        <Volume2 className="w-4 h-4 text-orange-400 animate-pulse" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Sound settings & preview button */}
                  <button
                    type="button"
                    onClick={() => setShowSoundSettings(!showSoundSettings)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs transition-colors"
                    title="خيارات نغمات التنبيه"
                  >
                    <Music className="w-4 h-4 text-slate-300" />
                  </button>
                </div>

                {/* Extended Sound Selection panel */}
                {showSoundSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-2 mt-2 border-t border-slate-800 space-y-1.5"
                  >
                    <div className="text-[10px] font-black text-slate-400 flex items-center justify-between">
                      <span>اختر نغمة التنبيه للطلبات:</span>
                      <button
                        type="button"
                        onClick={() => playOrderAlertSound(soundChoice)}
                        className="text-orange-400 hover:underline flex items-center gap-0.5"
                      >
                        <Volume2 className="w-3 h-3" />
                        تجربة النغمة
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[
                        { id: "chime", label: "نغمة هادئة" },
                        { id: "ringtone", label: "رنين هاتف" },
                        { id: "cashier", label: "كاشير" },
                        { id: "urgent", label: "تنبيه سريع" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSoundSelect(item.id as SoundType)}
                          className={`text-[10px] font-bold py-1 px-1 rounded-lg border transition-all truncate ${
                            soundChoice === item.id
                              ? "bg-orange-500 text-white border-orange-400"
                              : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
