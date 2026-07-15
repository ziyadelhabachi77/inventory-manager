import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Package,
  Layers,
} from "lucide-react";

export const NAV_LINKS = [
  { path: '/', label: "Dashboard", icon: LayoutDashboard },
  { path: '/products', label: "Products", icon: Package },
  { path: '/orders', label: "Orders", icon: ShoppingCart },
  { path: '/suppliers', label: "Suppliers", icon: Truck },
  { path: '/categories', label: "Categories", icon: Layers },
];

export const STOCK_LEVEL = {
  stock_low: 15,
  stock_critical: 5,
};


export const BASE_URL = "http://localhost:5050/api"
