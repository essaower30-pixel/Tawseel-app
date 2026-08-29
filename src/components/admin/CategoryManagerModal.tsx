import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tag,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  ArrowUpToLine,
  ArrowDownToLine,
  TrendingUp,
  Check,
  Eye,
  Store as StoreIcon,
  HelpCircle,
  X
} from "lucide-react";
import { Category, Store } from "../../types";
import { CategoryIcon, AVAILABLE_CATEGORY_ICONS } from "../CategoryIcon";
import { initialCategories } from "../../data/initialData";

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  stores: Store[];
  onReorderCategories: (newCategories: Category[]) => void;
  onAddCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  categories,
  stores,
  onReorderCategories,
  onAddCategory,
  onDeleteCategory
}) => {
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("ShoppingBag");
  const [showAddForm, setShowAddForm] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  if (!isOpen) return null;

  // Move item in array helper
  const moveCategory = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= categories.length || fromIndex === toIndex) return;
    const updated = [...categories];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    onReorderCategories(updated);
    triggerSaveFeedback();
  };

  const moveToTop = (index: number) => {
    moveCategory(index, 0);
  };

  const moveToBottom = (index: number) => {
    moveCategory(index, categories.length - 1);
  };

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    moveCategory(draggedIndex, dropIndex);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Smart Sort: By most stores (demand)
  const handleSortByPopularity = () => {
    const sorted = [...categories].sort((a, b) => {
      const countA = stores.filter((s) => s.category === a.id).length;
      const countB = stores.filter((s) => s.category === b.id).length;
      return countB - countA;
    });
    onReorderCategories(sorted);
    triggerSaveFeedback();
  };

  // Reset to default categories
  const handleResetToDefault = () => {
    if (confirm("هل تريد استعادة الترتيب الافتراضي للتصنيفات؟")) {
      // Keep any custom created ones at the end
      const existingIds = new Set(initialCategories.map((c) => c.id));
      const customOnes = categories.filter((c) => !existingIds.has(c.id));
      const merged = [...initialCategories, ...customOnes];
      onReorderCategories(merged);
      triggerSaveFeedback();
    }
  };

  const triggerSaveFeedback = () => {
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatLabel.trim()) return;

    const id = "cat_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const newCategory: Category = {
      id,
      label: newCatLabel.trim(),
      icon: newCatIcon
    };

    onAddCategory(newCategory);
    setNewCatLabel("");
    setShowAddForm(false);
    triggerSaveFeedback();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-right"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <GripVertical className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base flex items-center gap-2">
                <span>ترتيب وإدارة تصنيفات الصفحة الرئيسية</span>
                <span className="text-[11px] font-bold bg-orange-500 text-white px-2.5 py-0.5 rounded-full">
                  سحب وإفلات 🖐️
                </span>
              </h3>
              <p className="text-xs text-slate-300 font-semibold">
                تحكّم في تسلسل ظهور التصنيفات الأكثر طلباً لظهورها في مقدمة شريط الرئيسية
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Preview Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-3.5 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-black text-slate-600 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-orange-500" />
              <span>معاينة حية لشريط الصفحة الرئيسية (كما يراه الزبون):</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              (من اليمين إلى اليسار حسب الترتيب)
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* All stores fixed tab */}
            <div className="shrink-0 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-[11px] font-extrabold flex items-center gap-1.5 opacity-60">
              <StoreIcon className="w-3 h-3 text-orange-500" />
              <span>جميع المحلات</span>
            </div>

            {/* Dynamic categories preview */}
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className={`shrink-0 px-3 py-1.5 rounded-xl border text-[11px] font-extrabold flex items-center gap-1.5 shadow-2xs transition-all ${
                  idx === 0
                    ? "bg-orange-500 text-white border-orange-600 ring-2 ring-orange-400/30"
                    : "bg-white text-slate-800 border-slate-200"
                }`}
              >
                <CategoryIcon name={cat.icon} className="w-3 h-3" />
                <span>{cat.label}</span>
                {idx === 0 && <span className="text-[9px] bg-white/20 px-1 rounded-md">الأول ⭐</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="p-4 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center flex-wrap gap-1.5">
            {/* Sort by most stores */}
            <button
              type="button"
              onClick={handleSortByPopularity}
              className="text-xs font-black py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="ترتيب التصنيفات حسب عدد المتاجر النشطة تلقائياً"
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              <span>ترتيب حسب الأكثر طلباً ومتاجر 📈</span>
            </button>

            {/* Reset to default */}
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs font-bold py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>استعادة الترتيب الافتراضي</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className={`text-xs font-black py-2 px-3.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
              showAddForm
                ? "bg-slate-800 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-white active:scale-95"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? "إغلاق النموذج" : "إضافة تصنيف جديد ➕"}</span>
          </button>
        </div>

        {/* Add Category Collapsible Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-orange-50/70 border-b border-orange-200/80 p-4 shrink-0"
            >
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      اسم التصنيف الجديد:
                    </label>
                    <input
                      type="text"
                      required
                      value={newCatLabel}
                      onChange={(e) => setNewCatLabel(e.target.value)}
                      placeholder="مثال: مخابز وأفران، أدوات منزلية..."
                      className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      أيقونة التصنيف:
                    </label>
                    <select
                      value={newCatIcon}
                      onChange={(e) => setNewCatIcon(e.target.value)}
                      className="w-full py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-hidden focus:border-orange-500 text-slate-800"
                    >
                      {AVAILABLE_CATEGORY_ICONS.map((icon) => (
                        <option key={icon.id} value={icon.id}>
                          {icon.label} ({icon.id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md cursor-pointer active:scale-95"
                  >
                    إضافة إلى التصنيفات ➕
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notice Info */}
        <div className="px-5 py-2.5 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900 shrink-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-[11px] font-bold text-blue-800">
              اسحب العنصر من أيقونة المقبض <strong>(⋮⋮)</strong> أو استخدم الأسهم لتحريك التصنيف للأعلى/الأسفل.
            </span>
          </div>
          {saveSuccessNotice && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg flex items-center gap-1 shrink-0"
            >
              <Check className="w-3 h-3" />
              <span>تم تحديث الترتيب فوراً</span>
            </motion.span>
          )}
        </div>

        {/* Drag & Drop Categories List */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1 divide-y divide-slate-100">
          {categories.map((cat, index) => {
            const storeCount = stores.filter((s) => s.category === cat.id).length;
            const isDragging = draggedIndex === index;
            const isOver = dragOverIndex === index;

            return (
              <div
                key={cat.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`pt-2 first:pt-0 transition-all ${
                  isDragging
                    ? "opacity-30 scale-98"
                    : isOver
                    ? "border-t-2 border-orange-500 transform translate-y-1"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    index === 0
                      ? "bg-orange-50/50 border-orange-200/90 shadow-2xs"
                      : "bg-slate-50/80 hover:bg-slate-100/80 border-slate-200/70"
                  }`}
                >
                  {/* Right side: Drag handle, Rank Badge, Icon & Label */}
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    {/* Drag Grip Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
                      title="اسحب لتغيير الترتيب"
                    >
                      <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>

                    {/* Rank Badge */}
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                        index === 0
                          ? "bg-orange-500 text-white shadow-xs"
                          : index === 1
                          ? "bg-slate-800 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Category Icon */}
                    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-2xs">
                      <CategoryIcon name={cat.icon} className="w-4 h-4 text-orange-600" />
                    </div>

                    {/* Category Title & Store Count */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                          {cat.label}
                        </span>
                        {index === 0 && (
                          <span className="text-[10px] font-black bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                            في الصدارة ⭐
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        {storeCount === 0
                          ? "لا توجد متاجر مرتبطة حالياً"
                          : `${storeCount} ${storeCount === 1 ? "متجر مسجل" : "متاجر مسجلة"}`}
                      </p>
                    </div>
                  </div>

                  {/* Left side: Reorder Arrows & Delete Button */}
                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 mr-2">
                    {/* Move to Top button */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveToTop(index)}
                        className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all cursor-pointer"
                        title="نقل إلى الصدارة فوراً"
                      >
                        <ArrowUpToLine className="w-4 h-4" />
                      </button>
                    )}

                    {/* Move Up */}
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveCategory(index, index - 1)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                        index === 0
                          ? "text-slate-300 opacity-40 cursor-not-allowed"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                      }`}
                      title="تحريك لأعلى"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>

                    {/* Move Down */}
                    <button
                      type="button"
                      disabled={index === categories.length - 1}
                      onClick={() => moveCategory(index, index + 1)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                        index === categories.length - 1
                          ? "text-slate-300 opacity-40 cursor-not-allowed"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                      }`}
                      title="تحريك لأسفل"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Move to Bottom */}
                    {index < categories.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveToBottom(index)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                        title="نقل إلى النهاية"
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                      </button>
                    )}

                    {/* Delete Category */}
                    <button
                      type="button"
                      onClick={() => {
                        if (storeCount > 0) {
                          alert(`لا يمكن حذف التصنيف لوجود ${storeCount} متجر مرتبط به.`);
                          return;
                        }
                        if (confirm(`هل أنت متأكد من حذف تصنيف "${cat.label}"؟`)) {
                          onDeleteCategory(cat.id);
                          triggerSaveFeedback();
                        }
                      }}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer mr-1"
                      title="حذف التصنيف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 font-bold">
            إجمالي التصنيفات: <strong className="text-slate-800">{categories.length}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95"
          >
            حفظ وإغلاق نافذة الترتيب ✓
          </button>
        </div>
      </motion.div>
    </div>
  );
};
