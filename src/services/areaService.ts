import api from "./api";

export const getAreas = async (): Promise<{ id: number; nome: string }[]> => {
  const response = await api.get("/areas");
  return response.data;
};

export const createArea = async (nome: string): Promise<{ id: number; nome: string }> => {
  const response = await api.post("/areas", { nome });
  return response.data;
};

export const updateArea = async (id: number, nome: string): Promise<{ id: number; nome: string }> => {
  const response = await api.put(`/areas/${id}`, { nome });
  return response.data;
};

export const deleteArea = async (id: number): Promise<void> => {
  await api.delete(`/areas/${id}`);
};
