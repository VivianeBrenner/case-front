import api from "./api";

export const getProcesses = async () => {
  const response = await api.get("/process");
  return response.data;
};

export const getProcessById = async (id: number) => {
  const response = await api.get(`/process/${id}`);
  return response.data;
};

export const createProcess = async (data: Record<string, any>) => {
  return api.post("/process", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const updateProcess = async (id: number, data: Record<string, any>) => {
  return api.put(`/process/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const deleteProcess = async (id: number) => {
  try {
    await api.delete(`/process/${id}`);
  } catch (error) {
    console.error("Erro ao deletar processo:", error);
    throw error;
  }
};
