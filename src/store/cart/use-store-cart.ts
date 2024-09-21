import { create } from "zustand";

export type TypesCartStore = {
  id: string;
  products: string;
  image: string;
  quantity: number;
};

export type CartStore = {
  cart: TypesCartStore[] | null;
  setCart: (cart: TypesCartStore[]) => void;
  clearCart: () => void;
  removeProduct: (id: string) => void;
  updateProduct: (id: string, quantity: number) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: null,
  setCart: (cart) => {
    set({ cart });
    localStorage.setItem("cart", JSON.stringify(cart));
  },
  clearCart: () => {
    set({ cart: null });
    localStorage.removeItem("cart");
  },
  removeProduct: (id) => {
    set((state) => {
      const newCart =
        state.cart?.filter((product) => product.id !== id) || null;
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
  updateProduct: (id, quantity) => {
    set((state) => {
      const newCart = state.cart?.map((product) => {
        if (product.id === id) {
          return { ...product, quantity };
        }
        return product;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { cart: newCart };
    });
  },
}));
