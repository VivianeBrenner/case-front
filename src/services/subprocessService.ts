import api from "./api";
import { Subprocess } from "../types/suprocess.types";

export const getSubprocesses = async (): Promise<Subprocess[]> => {
  const response = await api.get("/subprocess");
  return response.data;
};

export const createSubprocess = async (name: string, processId: number): Promise<Subprocess> => {
  const response = await api.post("/subprocess", { nome: name, processoId: processId });
  return response.data;
};


export const deleteSubprocess = async (id: number): Promise<void> => {
  await api.delete(`/subprocess/${id}`);
};
