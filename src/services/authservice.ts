import api from "./api";

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    nome: string;
  };
}

export const login = async (
  email: string,
  senha: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/auth/login", {
      email,
      senha,
    });
    if (!response.data.access_token) {
      throw new Error("Token não recebido do servidor");
    }

    localStorage.setItem("token", response.data.access_token);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Credenciais inválidas");
    } else if (error.request) {
      throw new Error("Erro de conexão com o servidor");
    } else {
      throw new Error("Erro ao fazer login");
    }
  }
};

export const registerUser = async ({
  nome,
  email,
  senha,
  confirmarSenha,
}: {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}) => {
  if (senha !== confirmarSenha) {
    throw new Error("As senhas não conferem");
  }

  try {
    const response = await api.post("/auth/register", {
      nome,
      email,
      senha,
      confirmarSenha,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Erro ao registrar usuário");
    }
    throw new Error("Erro de conexão com o servidor");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.clear();
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};
