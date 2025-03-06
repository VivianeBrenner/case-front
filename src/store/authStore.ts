import { create } from "zustand";
import { User } from "../types/user.types";

interface AuthState {
  user: User | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,

  login: async (email, senha) => {
    const mockUsers: User[] = [
      { id: "1", nome: "Admin", email: "admin@email.com", role: "admin" },
      { id: "2", nome: "Gerente", email: "gerente@email.com", role: "gerente" },
      { id: "3", nome: "Usuário", email: "usuario@email.com", role: "usuario" },
    ];

    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error("Usuário não encontrado!");

    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));
