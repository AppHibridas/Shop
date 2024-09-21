import { TypesGetLogin } from "../../store/auth/use-store";
import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

const getToken = async (name: string, pass: string): Promise<TypesGetLogin> => {
  try {
    const response = await axiosInstance(false).post("/user/login?_format=json", {
      name: name,
      pass: pass,
    });
    return response.data;
  } catch (error) {
    console.error("error getToken", error);
    return {
      error: true,
    } as TypesGetLogin;
  }
};

export const useLoginQuery = (
  name: string,
  pass: string,
  shouldFetch: boolean
) => {
  const query = useQuery<TypesGetLogin, Error>({
    queryKey: ["login", name, pass],
    queryFn: () => getToken(name, pass),
    enabled: shouldFetch && name !== "" && pass !== "",
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};
