import api from "./api";

export const getAreas = async () => {
  const response = await api.get("/areas");
  return response.data;
};

export const createArea = async (nome: string) => {
  return api.post("/areas", { nome });
};

export const updateArea = async (id: number, nome: string) => {
  return api.put(`/areas/${id}`, { nome });
};

export const deleteArea = async (id: number) => {
  return api.delete(`/areas/${id}`);
};
