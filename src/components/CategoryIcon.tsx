import React from "react";
import {
  Utensils,
  ShoppingBag,
  Pill,
  Leaf,
  CakeSlice,
  Stethoscope,
  Wrench,
  Car,
  Store as StoreIcon,
  Coffee,
  Sparkles,
  Gift,
  Shirt,
  Smartphone,
  BookOpen,
  Scissors,
  Home,
  Flame,
  Tag,
  Percent,
  BadgePercent,
  Zap,
  TrendingUp
} from "lucide-react";

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = "w-4 h-4" }) => {
  switch (name) {
    case "Flame":
      return <Flame className={className} />;
    case "Tag":
      return <Tag className={className} />;
    case "Percent":
    case "BadgePercent":
      return <Percent className={className} />;
    case "Zap":
      return <Zap className={className} />;
    case "TrendingUp":
      return <TrendingUp className={className} />;
    case "Utensils":
      return <Utensils className={className} />;
    case "ShoppingBag":
      return <ShoppingBag className={className} />;
    case "Pill":
      return <Pill className={className} />;
    case "Leaf":
      return <Leaf className={className} />;
    case "CakeSlice":
      return <CakeSlice className={className} />;
    case "Stethoscope":
      return <Stethoscope className={className} />;
    case "Wrench":
      return <Wrench className={className} />;
    case "Car":
      return <Car className={className} />;
    case "Coffee":
      return <Coffee className={className} />;
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Gift":
      return <Gift className={className} />;
    case "Shirt":
      return <Shirt className={className} />;
    case "Smartphone":
      return <Smartphone className={className} />;
    case "BookOpen":
      return <BookOpen className={className} />;
    case "Scissors":
      return <Scissors className={className} />;
    case "Home":
      return <Home className={className} />;
    default:
      return <StoreIcon className={className} />;
  }
};

export const AVAILABLE_CATEGORY_ICONS = [
  { id: "Flame", label: "شعلة العروض والتخفيضات 🔥" },
  { id: "Tag", label: "بطاقة أسعار وعروض 🏷️" },
  { id: "Percent", label: "نسبة خصم وتنزيلات ٪" },
  { id: "Sparkles", label: "عروض مميزة وهدايا ✨" },
  { id: "Utensils", label: "مطاعم ومأكولات" },
  { id: "ShoppingBag", label: "سوبرماركت وتسوق" },
  { id: "Pill", label: "صيدلية وأدوية" },
  { id: "Leaf", label: "خضار وفواكه" },
  { id: "CakeSlice", label: "حلويات ومخبوزات" },
  { id: "Stethoscope", label: "صحة وعيادات" },
  { id: "Wrench", label: "صيانة وورش" },
  { id: "Car", label: "سيارات وتوصيل" },
  { id: "Coffee", label: "مقاهي ومشروبات" },
  { id: "Gift", label: "هدايا ومناسبات" },
  { id: "Shirt", label: "ألبسة وأقمشة" },
  { id: "Smartphone", label: "إلكترونيات وموبايل" },
  { id: "BookOpen", label: "قرطاسية ومكتبات" },
  { id: "Scissors", label: "صالونات وحلاقة" },
  { id: "Home", label: "منزل ومفروشات" },
  { id: "Zap", label: "توصيل سريع وفوري ⚡" },
  { id: "TrendingUp", label: "الأكثر مبيعاً ورواجاً 📈" }
];
