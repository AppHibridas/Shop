import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

type TypeOrder = {
  id_orden: string;
};

type TypesOrders = {
  orders: TypeOrder[];
  message: string;
  error?: boolean;
};

export const getOrders = async (uid: number): Promise<TypesOrders> => {
  if (uid) {
    try {
      const response = await axiosInstance().get(
        `/api/v1/productos/orden/${uid}?_format=json`
      );
      return {
        orders: response.data,
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

export const useGetOrders = (uid: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-orders"],
    queryFn: () => getOrders(uid),
    enabled: !!(uid && uid > 0),
  });

  return { data, isLoading, refetch };
};
