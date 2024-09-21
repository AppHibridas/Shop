import { create } from "zustand";

export type TypesGetLogin = {
  current_user: {
    uid: string;
    name: string;
    lastName: string;
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
  setUser: (user) => set({ user }),
  clearUser: () => {
    set({ user: null });
    localStorage.removeItem("userSession");
  },
}));
