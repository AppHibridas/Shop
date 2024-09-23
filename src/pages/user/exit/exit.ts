import { useUserStore } from "@/store/auth/use-store";
import { useCartStore } from "@/store/cart/use-store-cart";
import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Exit: FC = () => {
  const clearUser = useUserStore((state) => state.clearUser);
  const clearCart = useCartStore((state) => state.clearCart);

  const history = useHistory();

  useEffect(() => {
    clearUser();
    clearCart();
    history.push("/home");
    window.location.reload();
  }, [clearUser, clearCart, history]);

  return null;
};

export default Exit;
