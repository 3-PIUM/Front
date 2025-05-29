// store/useCartStore.ts
import { create } from "zustand";

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  originalPrice: number;
  discountRate: number;
  option: string;
}

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
