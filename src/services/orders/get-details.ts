import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

type Detail = {
  producto: {
    field_image: string;
    title: string;
    body: string;
  };
  stock: number;
};

type TypeOrderDetail = {
  uuid: number;
  productos: Detail[];
};

export type TypesOrders = {
  order: TypeOrderDetail;
  message: string;
  error?: boolean;
};

export const getOrdersDetails = async (uuid: string): Promise<TypesOrders> => {
  if (uuid) {
    try {
      const response = await axiosInstance().get(
        `/api/v1/productos/orden/detalle/${uuid}?_format=json`
      );
      return {
        order: response.data,
        message: "success",
        error: false,
      } as TypesOrders;
    } catch (error) {
      console.error("error shopProducts", error);
      return { error: true } as TypesOrders;
    }
  } else {
    return { error: true } as TypesOrders;
  }
};

export const useGetOrdersDetails = (uuid: string) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-order-details"],
    queryFn: () => getOrdersDetails(uuid),
    enabled: !!uuid,
  });

  return { data, isLoading, refetch };
};
