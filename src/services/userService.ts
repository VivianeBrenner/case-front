import api from "./api";

export const userService = {
  getUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      throw error;
    }
  },

  updateUserRole: async (userId: number, role: string) => {
    try {
      const response = await api.put(`/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar papel do usuário:", error);
      throw error;
    }
  },
};
