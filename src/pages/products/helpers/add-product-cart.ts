import { useCartStore, TypesCartStore } from "@/store/cart/use-store-cart";

export const useAddProductCart = () => {
  const setCart = useCartStore((state) => state.setCart);
  const cart = useCartStore((state) => state.cart) || [];

  const addProductCart = (product: TypesCartStore) => {
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists) {
      const newCart = cart.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return addProductCart;
};
