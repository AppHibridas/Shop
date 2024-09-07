import { axiosInstance } from "./intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

type TypesProduct = {
  title: string;
  image: string;
  body: string;
  tags: string;
};

export const getProducts = async (): Promise<TypesProduct[]> => {
  try {
    const response = await axiosInstance.get("/api/v1/products");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
