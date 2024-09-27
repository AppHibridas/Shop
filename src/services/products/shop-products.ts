import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

type TypeShopProduct = {
  nid: string;
  stock: string;
};

export type TypesCreateProduct = {
  uid: number;
  uuid: string;
  productos: TypeShopProduct[];
};

type TypesProduct = {
  status: string;
  message: string;
  error?: boolean;
};

export const shopProducts = async (
  props: TypesCreateProduct
): Promise<TypesProduct> => {
  try {
    const response = await axiosInstance().post(
      "/api/v1/productos/orden",
      props
    );
    return response.data;
  } catch (error) {
    console.error("error shopProducts", error);
    return { error: true } as TypesProduct;
  }
};

export const useShopProducts = (props: TypesCreateProduct) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["shop-products"],
    queryFn: () => shopProducts(props),
    enabled: props && props.productos && props.productos.length > 0,
  });

  return { data, isLoading, refetch };
};
