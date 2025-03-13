import api from "./api";
import { Subprocess, CreateSubprocessData } from "../types/process.types";

export const getSubprocesses = async (): Promise<Subprocess[]> => {
  const response = await api.get("/subprocess");
  return response.data;
};
  
export const getSubprocessesByParent = async (
    parentSubId: number
  ): Promise<Subprocess[]> => {
    const response = await api.get("/subprocess/children", {
      params: { parentSubId },
    });
    return response.data;
  };
  
  
export const createSubprocess = async (
    data: CreateSubprocessData
  ): Promise<Subprocess> => {
    const response = await api.post("/subprocess", data);
    return response.data;
  };
  

export const deleteSubprocess = async (id: number): Promise<void> => {
  await api.delete(`/subprocess/${id}`);
};
