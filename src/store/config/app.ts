import { create } from "zustand";

export type ConfigStore = {
  optionsDataExample: boolean;
  urlBackend: string;
};

export const useConfigStore = create<ConfigStore>(() => ({
  optionsDataExample: import.meta.env.VITE_APP_EXAMPLE_DATA ?? false,
  urlBackend: import.meta.env.VITE_APP_API_BASE_URL,
}));
