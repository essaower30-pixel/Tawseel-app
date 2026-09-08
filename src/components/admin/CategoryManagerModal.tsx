import React, { useState, useEffect } from "react";
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
  X,
  Edit2,
  Save,
  Layers
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
  onUpdateCategory?: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  initialOpenAddForm?: boolean;
}

export const POPULAR_CATEGORY_PRESETS = [
  { label: "لحوم وملاحم وجزارة", icon: "Beef", emoji: "🥩" },
  { label: "ألبسة وملابس وأزياء", icon: "Shirt", emoji: "👕" },
  { label: "مخابز وأفران ومعجنات", icon: "Croissant", emoji: "🥐" },
  { label: "ألبان وأجبان ومشتقاتها", icon: "Milk", emoji: "🥛" },
  { label: "أسماك ومأكولات بحرية", icon: "Fish", emoji: "🐟" },
  { label: "فواكه وخضار منتقاة", icon: "Apple", emoji: "🍎" },
  { label: "بيتزا وفطائر سريعة", icon: "Pizza", emoji: "🍕" },
  { label: "إلكترونيات وموبايلات", icon: "Smartphone", emoji: "📱" },
  { label: "مستلزمات أطفال ومواليد", icon: "Baby", emoji: "👶" },
  { label: "أحذية وحقائب جلدية", icon: "Footprints", emoji: "👟" },
  { label: "منزل ومفروشات وديكور", icon: "Home", emoji: "🏠" },
  { label: "عطور وهدايا وتحف", icon: "Gift", emoji: "🎁" }
];

export const detectIconFromName = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes("لحم") || lower.includes("جزار") || lower.includes("قصاب") || lower.includes("مفروم") || lower.includes("كباب")) return "Beef";
  if (lower.includes("ملابس") || lower.includes("لباس") || lower.includes("ثياب") || lower.includes("أزياء") || lower.includes("قميص") || lower.includes("فستان")) return "Shirt";
  if (lower.includes("مخبز") || lower.includes("أفران") || lower.includes("فرن") || lower.includes("معجنات") || lower.includes("كرواسان") || lower.includes("خبز")) return "Croissant";
  if (lower.includes("لبن") || lower.includes("حليب") || lower.includes("جبن") || lower.includes("ألبان") || lower.includes("مشتقات")) return "Milk";
  if (lower.includes("سمك") || lower.includes("أسماك") || lower.includes("جمبري") || lower.includes("بحري")) return "Fish";
  if (lower.includes("فواكه") || lower.includes("فاكهة") || lower.includes("تفاح") || lower.includes("تمر")) return "Apple";
  if (lower.includes("بيتزا") || lower.includes("فطائر")) return "Pizza";
  if (lower.includes("أطفال") || lower.includes("رضيع") || lower.includes("مواليد") || lower.includes("حفاضات") || lower.includes("بيبي")) return "Baby";
  if (lower.includes("حذاء") || lower.includes("أحذية") || lower.includes("شنط") || lower.includes("حقائب")) return "Footprints";
  if (lower.includes("ساعات") || lower.includes("ساعة") || lower.includes("إكسسوار")) return "Watch";
  if (lower.includes("موبايل") || lower.includes("هاتف") || lower.includes("جوال") || lower.includes("إلكترونيات") || lower.includes("شواحن")) return "Smartphone";
  if (lower.includes("مفروشات") || lower.includes("أثاث") || lower.includes("ستائر") || lower.includes("سجاد") || lower.includes("ديكور")) return "Home";
  if (lower.includes("عطر") || lower.includes("بخور") || lower.includes("هدية") || lower.includes("هدايا") || lower.includes("ورد") || lower.includes("زهور")) return "Gift";
  if (lower.includes("كافيه") || lower.includes("قهوة") || lower.includes("بن") || lower.includes("محمصة") || lower.includes("شاي")) return "Coffee";
  if (lower.includes("حلاقة") || lower.includes("صالون") || lower.includes("كوافير") || lower.includes("تجميل")) return "Scissors";
  if (lower.includes("صيدل") || lower.includes("دواء") || lower.includes("علاج") || lower.includes("أدوية")) return "Pill";
  if (lower.includes("طرد") || lower.includes("شحن") || lower.includes("توصيل سريع")) return "Package";
  return "ShoppingBag";
};

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  categories,
  stores,
  onReorderCategories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  initialOpenAddForm = false
}) => {
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("ShoppingBag");
  const [showAddForm, setShowAddForm] = useState(initialOpenAddForm);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Editing state
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editIcon, setEditIcon] = useState("ShoppingBag");

  useEffect(() => {
    if (initialOpenAddForm) {
      setShowAddForm(true);
    }
  }, [initialOpenAddForm, isOpen]);

  if (!isOpen) return null;

  // Move item in array helper
  const moveCategory = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= categories.length || fromIndex === toIndex) return;
    const updated = [...categories];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    onReorderCategories(updated);
    triggerSaveFeedback("تم تحديث ترتيب التصنيفات وحفظه بنجاح");
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

  // Smart Sort: By most stores (demand) with Offers at top
  const handleSortByPopularity = () => {
    const sorted = [...categories].sort((a, b) => {
      if (a.id === "offers") return -1;
      if (b.id === "offers") return 1;
      const countA = stores.filter((s) => s.category === a.id).length;
      const countB = stores.filter((s) => s.category === b.id).length;
      return countB - countA;
    });
    onReorderCategories(sorted);
    triggerSaveFeedback("تم ترتيب التصنيفات حسب الأكثر طلباً ومتاجر");
  };

  // Reset to default categories
  const handleResetToDefault = () => {
    if (confirm("هل تريد استعادة الترتيب الافتراضي للتصنيفات؟")) {
      const existingIds = new Set(initialCategories.map((c) => c.id));
      const customOnes = categories.filter((c) => !existingIds.has(c.id));
      const merged = [...initialCategories, ...customOnes];
      onReorderCategories(merged);
      triggerSaveFeedback("تمت استعادة الترتيب الافتراضي");
    }
  };

  const triggerSaveFeedback = (msg = "تم الحفظ بنجاح") => {
    setStatusMessage(msg);
    setSaveSuccessNotice(true);
    setTimeout(() => {
      setSaveSuccessNotice(false);
      setStatusMessage(null);
    }, 2800);
  };

  const handleLabelChange = (val: string) => {
    setNewCatLabel(val);
    const suggested = detectIconFromName(val);
    setNewCatIcon(suggested);
  };

  const handleAddSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = newCatLabel.trim();
    if (!clean) return;

    // Check duplicate
    const exists = categories.some(
      (c) => c.label.trim().toLowerCase() === clean.toLowerCase()
    );
    if (exists) {
      alert(`التصنيف "${clean}" موجود مسبقاً في القائمة!`);
      return;
    }

    const id = "cat_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    const newCategory: Category = {
      id,
      label: clean,
      icon: newCatIcon
    };

    onAddCategory(newCategory);
    setNewCatLabel("");
    setNewCatIcon("ShoppingBag");
    triggerSaveFeedback(`تمت إضافة تصنيف "${clean}" وحفظه سحابياً بنجاح! 🎉`);
  };

  const handleQuickAddPreset = (preset: { label: string; icon: string; emoji: string }) => {
    // Check if already exists
    const exists = categories.some((c) => c.label.includes(preset.label) || preset.label.includes(c.label));
    if (exists) {
      alert(`تصنيف (${preset.label}) موجود بالفعل في القائمة!`);
      return;
    }

    setNewCatLabel(preset.label);
    setNewCatIcon(preset.icon);
    setShowAddForm(true);
  };

  const startEditCategory = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditLabel(cat.label);
    setEditIcon(cat.icon);
  };

  const saveEditCategory = () => {
    if (!editingCatId || !editLabel.trim()) return;
    if (onUpdateCategory) {
      onUpdateCategory({
        id: editingCatId,
        label: editLabel.trim(),
        icon: editIcon
      });
    } else {
      const updated = categories.map((c) =>
        c.id === editingCatId ? { ...c, label: editLabel.trim(), icon: editIcon } : c
      );
      onReorderCategories(updated);
    }
    setEditingCatId(null);
    triggerSaveFeedback("تم تحديث بيانات التصنيف بنجاح");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-right my-auto"
        dir="rtl"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base flex items-center gap-2">
                <span>إدارة وإضافة التصنيفات الرئيسية</span>
                <span className="text-[11px] font-bold bg-emerald-500 text-white px-2.5 py-0.5 rounded-full">
                  شامل المنصة 🏷️
                </span>
              </h3>
              <p className="text-xs text-slate-300 font-semibold">
                أضف تصنيفات عامة جديدة (ملابس، لحوم، مخابز...) ورتّب ظهورها في شريط الصفحة الرئيسية
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
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-3.5 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-black text-slate-700 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-orange-500" />
              <span>معاينة حية لشريط الصفحة الرئيسية (كما يراه الزبون والتاجر):</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">
              ({categories.length} تصنيف نشط)
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {/* All stores fixed tab */}
            <div className="shrink-0 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-[11px] font-extrabold flex items-center gap-1.5 opacity-60">
              <StoreIcon className="w-3 h-3 text-orange-500" />
              <span>جميع المحلات</span>
            </div>

            {/* Dynamic categories preview */}
            {categories.map((cat, idx) => {
              const isOffers = cat.id === "offers";
              return (
                <div
                  key={cat.id}
                  className={`shrink-0 px-3 py-1.5 rounded-xl border text-[11px] font-extrabold flex items-center gap-1.5 shadow-2xs transition-all ${
                    idx === 0
                      ? isOffers
                        ? "bg-red-600 text-white border-red-700 ring-2 ring-red-400/30"
                        : "bg-orange-500 text-white border-orange-600 ring-2 ring-orange-400/30"
                      : isOffers
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-white text-slate-800 border-slate-200"
                  }`}
                >
                  <CategoryIcon name={cat.icon} className={`w-3.5 h-3.5 ${isOffers ? "text-red-500" : "text-orange-600"}`} />
                  <span>{cat.label}</span>
                  {idx === 0 && <span className="text-[9px] bg-white/20 px-1 rounded-md">الأول ⭐</span>}
                  {isOffers && idx !== 0 && <span className="text-[9px] bg-red-100 text-red-700 px-1 rounded-md">🔥</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Presets Section (One-click fill) */}
        <div className="bg-amber-50/70 border-b border-amber-200/70 p-3 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>تصنيفات رئيسية شائعة ومطلوبة (انقر للتعبئة الفورية):</span>
            </span>
            <span className="text-[10px] font-bold text-amber-800/80">
              مثل لحوم، ملابس، مخابز، أسماك...
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto scrollbar-none">
            {POPULAR_CATEGORY_PRESETS.map((preset) => {
              const alreadyExists = categories.some((c) => c.label.includes(preset.label) || preset.label.includes(c.label));
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleQuickAddPreset(preset)}
                  className={`text-[11px] font-bold py-1 px-2.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                    alreadyExists
                      ? "bg-amber-100/60 border-amber-300/60 text-amber-900 opacity-70"
                      : "bg-white hover:bg-amber-100 border-amber-300 text-amber-950 shadow-2xs hover:border-amber-400"
                  }`}
                  title={alreadyExists ? "مضاف مسبقاً" : "انقر لإضافة هذا التصنيف"}
                >
                  <span>{preset.emoji}</span>
                  <span>{preset.label}</span>
                  {alreadyExists ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Plus className="w-3 h-3 text-amber-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="p-3.5 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center flex-wrap gap-1.5">
            {/* Sort by most stores */}
            <button
              type="button"
              onClick={handleSortByPopularity}
              className="text-xs font-black py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-2xs"
              title="ترتيب التصنيفات حسب عدد المتاجر النشطة تلقائياً"
            >
              <TrendingUp className="w-3.5 h-3.5 text-orange-600" />
              <span>ترتيب حسب الأكثر طلباً 📈</span>
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
            className={`text-xs font-black py-2 px-4 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 ${
              showAddForm
                ? "bg-slate-800 text-white"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 text-white"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? "إغلاق نموذج الإضافة" : "➕ إضافة تصنيف رئيسي جديد"}</span>
          </button>
        </div>

        {/* Add Category Collapsible Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden bg-emerald-50/80 border-b border-emerald-200 p-4 shrink-0"
            >
              <form onSubmit={handleAddSubmit} className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-black text-xs">
                  <Tag className="w-4 h-4 text-emerald-700" />
                  <span>بيانات التصنيف العام الجديد:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      اسم التصنيف الرئيسي: *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCatLabel}
                      onChange={(e) => handleLabelChange(e.target.value)}
                      placeholder="مثال: لحوم وملاحم، ملابس وأزياء، مخابز..."
                      className="w-full py-2.5 px-3 bg-white border border-emerald-300 rounded-xl text-xs font-bold focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-400/20 text-slate-900 shadow-2xs"
                      autoFocus
                    />
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">
                      💡 سيتم اختيار الأيقونة المناسبة تلقائياً حسب الكلمة التي تكتبها.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-800 mb-1">
                      أيقونة وشكل التصنيف:
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 shrink-0 shadow-2xs">
                        <CategoryIcon name={newCatIcon} className="w-5 h-5 text-emerald-600" />
                      </div>
                      <select
                        value={newCatIcon}
                        onChange={(e) => setNewCatIcon(e.target.value)}
                        className="w-full py-2.5 px-3 bg-white border border-emerald-300 rounded-xl text-xs font-bold focus:outline-hidden focus:border-emerald-600 text-slate-900 shadow-2xs"
                      >
                        {AVAILABLE_CATEGORY_ICONS.map((icon) => (
                          <option key={icon.id} value={icon.id}>
                            {icon.label} ({icon.id})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewCatLabel("");
                    }}
                    className="py-2 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-md cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>حفظ ونشر التصنيف في المنصة فوراً ✓</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notice Info / Success Banner */}
        <div className="px-4 py-2.5 bg-blue-50/60 border-b border-blue-100 flex items-center justify-between text-xs text-blue-900 shrink-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-[11px] font-bold text-blue-800">
              اسحب العنصر من المقبض <strong>(⋮⋮)</strong> أو استخدم الأسهم لترتيب الأقسام. يمكنك تعديل أو حذف أي تصنيف مخصص.
            </span>
          </div>
          {saveSuccessNotice && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-lg flex items-center gap-1 shrink-0 shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{statusMessage || "تم الحفظ والتحديث فوراً"}</span>
            </motion.span>
          )}
        </div>

        {/* Drag & Drop Categories List */}
        <div className="p-3 sm:p-4 space-y-2 overflow-y-auto flex-1 divide-y divide-slate-100">
          {categories.map((cat, index) => {
            const isOffers = cat.id === "offers";
            const storeCount = stores.filter((s) => s.category === cat.id).length;
            const isDragging = draggedIndex === index;
            const isOver = dragOverIndex === index;
            const isEditing = editingCatId === cat.id;

            return (
              <div
                key={cat.id}
                draggable={!isEditing}
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
                {isEditing ? (
                  <div className="p-3 bg-orange-50/90 rounded-2xl border border-orange-300 space-y-3">
                    <div className="flex items-center justify-between text-xs font-black text-orange-950">
                      <span>تعديل بيانات التصنيف:</span>
                      <button
                        type="button"
                        onClick={() => setEditingCatId(null)}
                        className="text-slate-500 hover:text-slate-800 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        className="py-2 px-3 bg-white border border-orange-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                        placeholder="اسم التصنيف"
                      />
                      <select
                        value={editIcon}
                        onChange={(e) => setEditIcon(e.target.value)}
                        className="py-2 px-3 bg-white border border-orange-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
                      >
                        {AVAILABLE_CATEGORY_ICONS.map((icon) => (
                          <option key={icon.id} value={icon.id}>
                            {icon.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingCatId(null)}
                        className="py-1.5 px-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer"
                      >
                        إلغاء
                      </button>
                      <button
                        type="button"
                        onClick={saveEditCategory}
                        className="py-1.5 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-lg cursor-pointer shadow-xs"
                      >
                        حفظ التعديل ✓
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                      index === 0
                        ? isOffers
                          ? "bg-red-50/70 border-red-200/90 shadow-2xs"
                          : "bg-orange-50/50 border-orange-200/90 shadow-2xs"
                        : isOffers
                        ? "bg-red-50/40 hover:bg-red-50/70 border-red-200/70"
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
                            ? isOffers
                              ? "bg-red-600 text-white shadow-xs"
                              : "bg-orange-500 text-white shadow-xs"
                            : index === 1
                            ? "bg-slate-800 text-white"
                            : isOffers
                            ? "bg-red-500 text-white"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Category Icon */}
                      <div className={`w-8 h-8 rounded-xl bg-white border flex items-center justify-center shrink-0 shadow-2xs ${
                        isOffers ? "border-red-200 text-red-600" : "border-slate-200 text-orange-600"
                      }`}>
                        <CategoryIcon name={cat.icon} className={`w-4 h-4 ${isOffers ? "text-red-500" : "text-orange-600"}`} />
                      </div>

                      {/* Category Title & Store Count */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                            {cat.label}
                          </span>
                          {index === 0 && (
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap ${
                              isOffers ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                            }`}>
                              في الصدارة ⭐
                            </span>
                          )}
                          {isOffers && index !== 0 && (
                            <span className="text-[10px] font-black bg-red-100 text-red-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                              الأكثر أهمية وتفاعلاً 🔥
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold">
                          {isOffers
                            ? "عروض وتخفيضات حصرية لجميع المتاجر والطلبات"
                            : storeCount === 0
                            ? "لا توجد متاجر مرتبطة حالياً"
                            : `${storeCount} ${storeCount === 1 ? "متجر مسجل" : "متاجر مسجلة"}`}
                        </p>
                      </div>
                    </div>

                    {/* Left side: Reorder Arrows, Edit & Delete Buttons */}
                    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 mr-2">
                      {/* Move to Top button */}
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => moveToTop(index)}
                          className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                            isOffers
                              ? "text-red-500 hover:text-red-700 hover:bg-red-100"
                              : "text-slate-400 hover:text-orange-600 hover:bg-orange-50"
                          }`}
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

                      {/* Edit Category Button */}
                      {!isOffers && (
                        <button
                          type="button"
                          onClick={() => startEditCategory(cat)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                          title="تعديل اسم أو أيقونة التصنيف"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete Category */}
                      <button
                        type="button"
                        onClick={() => {
                          if (isOffers) {
                            alert("تصنيف (العروض الحالية) هو قسم رئيسي للتطبيق لا يمكن حذفه، ويمكنك تغيير ترتيبه ونقله لأي موضع تريده.");
                            return;
                          }
                          if (storeCount > 0) {
                            alert(`لا يمكن حذف التصنيف لوجود ${storeCount} متجر مرتبط به حالياً. قم بنقل المتاجر لتصنيف آخر أولاً.`);
                            return;
                          }
                          if (confirm(`هل أنت متأكد من حذف تصنيف "${cat.label}"؟`)) {
                            onDeleteCategory(cat.id);
                            triggerSaveFeedback("تم حذف التصنيف بنجاح");
                          }
                        }}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer mr-0.5"
                        title="حذف التصنيف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-600 font-bold">
            إجمالي التصنيفات المعتمدة: <strong className="text-slate-900">{categories.length}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl shadow-md cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>حفظ وإغلاق نافذة التصنيفات</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
