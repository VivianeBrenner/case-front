import { create } from "zustand";
import axios from "axios";

interface AuthState {
  token: string | null;
  isAdmin: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAdmin: false,

  login: async (email, senha) => {
    const { data } = await axios.post("http://localhost:5000/login", { email, senha });
    set({ token: data.token, isAdmin: data.isAdmin });
    localStorage.setItem("token", data.token);
  },

  logout: () => {
    set({ token: null, isAdmin: false });
    localStorage.removeItem("token");
  },
}));
