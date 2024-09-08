import { TypesGetLogin } from "../../store/auth/use-store";
import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

const getToken = async (name: string, pass: string): Promise<TypesGetLogin> => {
  try {
    const response = await axiosInstance.post("/user/login?_format=json", {
      name: name,
      pass: pass,
    });
    console.log(response);
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
  return useQuery<TypesGetLogin, Error>({
    queryKey: ["login", name, pass],
    queryFn: () => getToken(name, pass),
    enabled: shouldFetch && name !== "" && pass !== "",
  });
};
