import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

type TypesProduct = {
  nid: string;
  title: string;
  image: string;
  body: string;
  tags: string;
  error?: boolean;
};

export const getProducts = async (): Promise<TypesProduct[]> => {
  try {
    const response = await axiosInstance().get("/api/v1/products");
    return response.data;
  } catch (error) {
    console.error("error getProducts", error);
    return [{ error: true } as TypesProduct];
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
