import axios from "axios";
import { axiosInstance } from "../intance/axios-instance";
import { useQuery } from "@tanstack/react-query";

export type TypesCreateUser = {
  firstName: string;
  lastName: string;
  birthDate: string;
  photo: string;
  gender: "male" | "female" | "other" | null;
  email: string;
  password: string;
  confirmPassword: string;
};

type ResponseCreateUser = {
  isCreated: boolean;
  error: string | null;
  message: string | null;
  uid: number | null;
};

const createUser = async (
  props: TypesCreateUser
): Promise<ResponseCreateUser> => {
  try {
    const response = await axiosInstance().post("/api/v1/user/register", props);
    return {
      isCreated: true,
      error: null,
      message: response.data.message,
      uid: response.data.uid,
    };
  } catch (error) {
    console.error("error getToken", error);

    if (axios.isAxiosError(error)) {
      return {
        isCreated: false,
        error: error.response?.data?.error || "Unknown error",
      } as ResponseCreateUser;
    } else {
      return {
        isCreated: false,
        error: "An unexpected error occurred",
      } as ResponseCreateUser;
    }
  }
};

export const useCreateUserQuery = (
  props: TypesCreateUser & { shouldFetch: boolean }
) => {
  const query = useQuery<ResponseCreateUser, Error>({
    queryKey: ["login", props],
    queryFn: () => createUser(props),
    enabled:
      props.shouldFetch &&
      props.email !== "" &&
      props.password !== "" &&
      props.confirmPassword !== "" &&
      props.firstName !== "" &&
      props.lastName !== "" &&
      props.birthDate !== "" &&
      props.photo !== "",
  });

  return {
    ...query,
    refetch: query.refetch,
  };
};
