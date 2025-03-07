import { create } from "zustand";
import api from "../services/api";

interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,

  login: async (email, senha) => {
    try {
      const response = await api.post("/auth/login", { email, senha });
      const { access_token } = response.data;

      const userResponse = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      set({ user: userResponse.data, token: access_token });
    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Credenciais inválidas");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null });
  },
}));
