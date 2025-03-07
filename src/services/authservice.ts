import api from "./api";

export const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/auth/login", { email, senha });
  
      localStorage.setItem("token", response.data.access_token);
  
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error("Credenciais inválidas");
    }
  };

  export const register = async ({ nome, email, senha, confirmarSenha }: { nome: string; email: string; senha: string; confirmarSenha: string }) => {
    if (senha !== confirmarSenha) {
      throw new Error("As senhas não conferem.");
    }
    
    return api.post("/auth/register", { nome, email, senha, confirmarSenha });
  };

export const logout = () => {
  localStorage.removeItem("token");
};
