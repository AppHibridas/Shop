import { create } from "zustand";

export type ConfigStore = {
  optionsDataExample: boolean;
  urlBackend: string;
};

const parseBoolean = (value: string | undefined): boolean => {
  return value === "true";
};

export const useConfigStore = create<ConfigStore>(() => ({
  optionsDataExample:
    parseBoolean(import.meta.env.VITE_APP_EXAMPLE_DATA) ?? false,
  urlBackend: import.meta.env.VITE_APP_API_BASE_URL,
}));
