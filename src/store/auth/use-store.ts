import { create } from "zustand";

export type TypesGetLogin = {
  current_user: {
    uid: string;
    name: string;
    full_name: string | null;
    last_name: string | null;
    birth_date: string | null;
    gender: "male" | "female" | "other" | null;
    email: string | null;
    picture: string | null;
  };
  csrf_token: string;
  logout_token: string;
  access_token: string;
  error?: boolean;
};

export type UserStore = {
  user: TypesGetLogin | null;
  setUser: (user: TypesGetLogin) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("userSession", JSON.stringify(user));
  },
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("userSession");
    localStorage.removeItem("cart");
  },
}));
