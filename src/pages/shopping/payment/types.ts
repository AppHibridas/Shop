import { TypesCartStore } from "@/store/cart/use-store-cart";

export type TypesPayment = {
  idOrder: string;
  products: TypesCartStore[];
};
