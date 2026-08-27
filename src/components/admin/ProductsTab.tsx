import React, { useState } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Utensils, 
  Tag, 
  Percent, 
  Eye, 
  EyeOff, 
  Layers, 
  X, 
  Check, 
  Image as ImageIcon 
} from "lucide-react";
import { Category, Product, Store, StoreAddition, StoreSize } from "../../types";
import { ImageUploader } from "../ImageUploader";

interface ProductsTabProps {
  products: Product[];
  stores: Store[];
  categories: Category[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  currency: string;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  stores,
  categories,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  currency
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [storeId, setStoreId] = useState(stores[0]?.id || "");
  const [category, setCategory] = useState("restaurants");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [originalPrice, setOriginalPrice] = useState("");
  const [offerLabel, setOfferLabel] = useState("عرض خاص");
  const [isHidden, setIsHidden] = useState(false);

  // Sizes & Additions
  const [sizes, setSizes] = useState<StoreSize[]>([]);
  const [sizeName, setSizeName] = useState("");
  const [sizePrice, setSizePrice] = useState("");

  const [additions, setAdditions] = useState<StoreAddition[]>([]);
  const [additionName, setAdditionName] = useState("");
  const [additionPrice, setAdditionPrice] = useState("");

  const openAddModal = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setStoreId(stores[0]?.id || "");
    setCategory(categories[0]?.id || "restaurants");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60");
    setIsOffer(false);
    setOriginalPrice("");
    setOfferLabel("عرض خاص");
    setIsHidden(false);
    setSizes([]);
    setAdditions([]);
    setShowModal(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setPrice(prod.price.toString());
    setStoreId(prod.storeId);
    setCategory(prod.category);
    setDescription(prod.description || "");
    setImage(prod.image);
    setIsOffer(Boolean(prod.isOffer));
    setOriginalPrice(prod.originalPrice ? prod.originalPrice.toString() : "");
    setOfferLabel(prod.offerLabel || "عرض خاص");
    setIsHidden(Boolean(prod.isHidden));
    setSizes(prod.sizes ? [...prod.sizes] : []);
    setAdditions(prod.additions ? [...prod.additions] : []);
    setShowModal(true);
  };

  const handleAddSize = () => {
    if (!sizeName.trim()) return;
    setSizes([...sizes, { name: sizeName.trim(), price: Number(sizePrice) || 0 }]);
    setSizeName("");
    setSizePrice("");
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleAddAddition = () => {
    if (!additionName.trim()) return;
    setAdditions([...additions, { name: additionName.trim(), price: Number(additionPrice) || 0 }]);
    setAdditionName("");
    setAdditionPrice("");
  };

  const handleRemoveAddition = (index: number) => {
    setAdditions(additions.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(price);
    if (!name.trim() || isNaN(priceNum)) return;

    const prodData: Product = {
      id: editingProduct ? editingProduct.id : "prod_" + Date.now(),
      name: name.trim(),
      price: priceNum,
      storeId,
      category,
      description,
      image: image || "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60",
      isOffer,
      originalPrice: isOffer && originalPrice ? parseFloat(originalPrice) : undefined,
      offerLabel: isOffer ? offerLabel : undefined,
      isHidden,
      sizes: sizes.length > 0 ? sizes : undefined,
      additions: additions.length > 0 ? additions : undefined
    };

    if (editingProduct) {
      onUpdateProduct(prodData);
    } else {
      onAddProduct(prodData);
    }

    setShowModal(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStore = selectedStoreId === "all" || p.storeId === selectedStoreId;
    return matchesSearch && matchesStore;
  });

  return (
    <div className="space-y-6 text-right font-sans" dir="rtl">
      {/* Top Controls: Search, Store Filter, Add Product Button */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center flex-wrap gap-2.5 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في الأصناف والوجبات..."
              className="w-full pr-9 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:border-orange-500"
            />
          </div>

          {/* Filter by store */}
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-hidden"
          >
            <option value="all">كافة المتاجر ({products.length} صنف)</option>
            {stores.map(st => (
              <option key={st.id} value={st.id}>{st.name}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة صنف / منتج جديد 🍽️</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(prod => {
          const store = stores.find(s => s.id === prod.storeId);

          return (
            <div 
              key={prod.id} 
              className={`bg-white rounded-3xl border transition-all p-3.5 shadow-xs flex flex-col justify-between space-y-3 ${
                prod.isHidden ? "opacity-60 bg-slate-50 border-slate-300" : "border-slate-200 hover:border-orange-300"
              }`}
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden mb-2.5 aspect-video bg-slate-100">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover" 
                  />
                  {prod.isOffer && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-md">
                      {prod.offerLabel || "عرض خاص"}
                    </span>
                  )}
                  <span className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    {store?.name || "متجر عام"}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-black text-xs sm:text-sm text-slate-900 line-clamp-1">{prod.name}</h4>
                  <div className="text-left font-black text-xs text-orange-600 shrink-0">
                    {prod.price.toLocaleString()} {currency}
                    {prod.isOffer && prod.originalPrice && (
                      <span className="block text-[10px] text-slate-400 line-through font-normal">
                        {prod.originalPrice.toLocaleString()} {currency}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{prod.description || "لا يوجد وصف"}</p>

                {/* Sizes and Additions preview badges */}
                {(prod.sizes || prod.additions) && (
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[10px] font-bold text-slate-500">
                    {prod.sizes && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded-md border">
                        {prod.sizes.length} أحجام
                      </span>
                    )}
                    {prod.additions && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded-md border">
                        {prod.additions.length} إضافات
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateProduct({
                      ...prod,
                      isHidden: !prod.isHidden
                    });
                  }}
                  className={`p-2 rounded-xl text-xs font-bold transition-all ${
                    prod.isHidden ? "bg-slate-200 text-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  title={prod.isHidden ? "إظهار الصنف للزبائن" : "إخفاء الصنف"}
                >
                  {prod.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(prod)}
                    className="p-2 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl transition-all cursor-pointer"
                    title="تعديل الصنف"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`هل أنت متأكد من حذف صنف "${prod.name}"؟`)) {
                        onDeleteProduct(prod.id);
                      }
                    }}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer"
                    title="حذف الصنف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto pt-6 sm:pt-4 pb-48 sm:pb-6">
          <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4 text-right my-auto" dir="rtl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-500" />
                <span>{editingProduct ? "تعديل الصنف والخيارات 🍽️" : "إضافة صنف جديد 🍽️"}</span>
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">اسم الصنف / الوجبة: *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: شاورما عربي دبل"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">السعر ({currency}): *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="25000"
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-slate-700">المتجر التابع له: *</label>
                  <select
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                  >
                    {stores.map(st => (
                      <option key={st.id} value={st.id}>{st.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-slate-700">التصنيف:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-hidden focus:border-orange-500"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Image Uploader (Studio & Camera, No URL) */}
              <ImageUploader
                value={image}
                onChange={(val) => setImage(val)}
                label="صورة الوجبة أو المنتج"
                helperText="التقط صورة للوجبة بالكاميرا أو استورد صورتها من المعرض"
                aspectRatio="wide"
                presets={[
                  { label: "شاورما عربي", emoji: "🌯", url: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500&auto=format&fit=crop&q=60" },
                  { label: "برغر وبطاطا", emoji: "🍔", url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
                  { label: "بيتزا إيطالية", emoji: "🍕", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60" },
                  { label: "فروج مشوي", emoji: "🍗", url: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&auto=format&fit=crop&q=60" },
                  { label: "مشروبات وعصير", emoji: "🥤", url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&auto=format&fit=crop&q=60" },
                  { label: "منتجات بقالية", emoji: "🧀", url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60" }
                ]}
              />

              <div>
                <label className="block font-bold mb-1 text-slate-700">الوصف والمكونات:</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="سندويش شاورما مع بطاطا ومخلل وثومية..."
                  className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-orange-500"
                />
              </div>

              {/* Offer Toggle */}
              <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-200 space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isOffer}
                    onChange={(e) => setIsOffer(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                  <span className="font-black text-orange-900">تفعيل كعرض خاص أو تخفيض مميز 🏷️</span>
                </label>

                {isOffer && (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">السعر الأصلي قبل الخصم:</label>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="30000"
                        className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">شارة العرض:</label>
                      <input
                        type="text"
                        value={offerLabel}
                        onChange={(e) => setOfferLabel(e.target.value)}
                        placeholder="خصم 20%"
                        className="w-full py-2 px-3 bg-white border border-slate-300 rounded-xl"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Sizes (الأحجام والمقاسات) */}
              <div className="bg-slate-50 p-3 rounded-2xl border space-y-2">
                <h4 className="font-black text-slate-800">الأحجام والمقاسات (اختياري):</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sizeName}
                    onChange={(e) => setSizeName(e.target.value)}
                    placeholder="اسم الحجم (صغير، عائلي..)"
                    className="flex-1 py-1.5 px-3 bg-white border rounded-xl"
                  />
                  <input
                    type="number"
                    value={sizePrice}
                    onChange={(e) => setSizePrice(e.target.value)}
                    placeholder="فارق السعر (+ل.س)"
                    className="w-28 py-1.5 px-3 bg-white border rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-xl font-black"
                  >
                    إضافة
                  </button>
                </div>

                {sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sizes.map((sz, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-white border px-2.5 py-1 rounded-xl text-[11px] font-bold">
                        <span>{sz.name} (+{sz.price} {currency})</span>
                        <button type="button" onClick={() => handleRemoveSize(i)} className="text-red-500 hover:text-red-700">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Additions (الإضافات والخيارات) */}
              <div className="bg-slate-50 p-3 rounded-2xl border space-y-2">
                <h4 className="font-black text-slate-800">الإضافات والخيارات الإضافية (اختياري):</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={additionName}
                    onChange={(e) => setAdditionName(e.target.value)}
                    placeholder="اسم الإضافة (جبنة إضافية..)"
                    className="flex-1 py-1.5 px-3 bg-white border rounded-xl"
                  />
                  <input
                    type="number"
                    value={additionPrice}
                    onChange={(e) => setAdditionPrice(e.target.value)}
                    placeholder="السعر (+ل.س)"
                    className="w-28 py-1.5 px-3 bg-white border rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddAddition}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-xl font-black"
                  >
                    إضافة
                  </button>
                </div>

                {additions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {additions.map((ad, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 bg-white border px-2.5 py-1 rounded-xl text-[11px] font-bold">
                        <span>{ad.name} (+{ad.price} {currency})</span>
                        <button type="button" onClick={() => handleRemoveAddition(i)} className="text-red-500 hover:text-red-700">✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {editingProduct ? "حفظ التعديلات ✓" : "إضافة الصنف الآن 🍽️"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
