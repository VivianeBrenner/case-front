import { create } from "zustand";
import { getProcesses, createProcess, updateProcess, deleteProcess } from "../services/processService";
import { ProcessState } from "../types/process.types";

export const useProcessStore = create<ProcessState>((set) => ({
  processes: [],

  loadProcesses: async () => {
    try {
      const data = await getProcesses();
      set({ processes: data });
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
    }
  },

  addProcess: async (name: string, status: string) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('status', status);
      const response = await createProcess(formData);
      const newProcess = response.data;
      set((state) => ({ processes: [...state.processes, newProcess] }));
    } catch (error) {
      console.error("Erro ao criar processo:", error);
    }
  },

  updateProcessById: async (id: number, name: string, status: string) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('status', status);
      await updateProcess(id, formData);
      set((state) => ({
        processes: state.processes.map((proc) =>
          proc.id === id ? { ...proc, name, status } : proc
        ),
      }));
    } catch (error) {
      console.error("Erro ao atualizar processo:", error);
    }
  },

  removeProcess: async (id) => {
    try {
      await deleteProcess(id);
      set((state) => ({
        processes: state.processes.filter((proc) => proc.id !== id),
      }));
    } catch (error) {
      console.error("Erro ao deletar processo:", error);
    }
  },
}));
