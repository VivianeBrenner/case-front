import api from "./api";


export const getProcesses = async () => {
    const response = await api.get("/process");
    return response.data;
  };
  

  export const getProcessById = async (id: number) => {
    const response = await api.get(`/process/${id}`);
    return response.data;
  };


export const createProcess = async (name: string, status: string) => {
  try {
    const response = await api.post("/process", { name, status });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar processo:", error);
    throw error;
  }
};


export const updateProcess = async (id: number, name: string, status: string) => {
  try {
    const response = await api.put(`/process/${id}`, { name, status });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar processo:", error);
    throw error;
  }
};


export const deleteProcess = async (id: number) => {
  try {
    await api.delete(`/process/${id}`);
  } catch (error) {
    console.error("Erro ao deletar processo:", error);
    throw error;
  }
};
