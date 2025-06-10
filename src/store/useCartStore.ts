import { create } from "zustand";

interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  originalPrice: number;
  discountRate: number;
  option?: string;
  availableOptions?: string[];
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, option?: string) => void;
  increaseQuantity: (id: string, option?: string) => void; // 수정됨
  decreaseQuantity: (id: string, option?: string) => void;
  updateOption: (id: string, prevOption: string, newOption: string) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.id === item.id && i.option === item.option
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.option === item.option
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),

  removeItem: (id: string, option?: string) =>
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === id && item.option === option)
      ),
    })),
  increaseQuantity: (id: string, option?: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.option === option
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (id: string, option?: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.option === option
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      ),
    })),
  updateOption: (id: string, prevOption: string, newOption: string) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.option === prevOption
          ? { ...item, option: newOption }
          : item
      ),
    })),
}));
