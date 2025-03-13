/// <reference types="vite/client" />

import { create } from "zustand";

interface ConfigState {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000", 
  setApiUrl: (url) => set({ apiUrl: url }),
}));
