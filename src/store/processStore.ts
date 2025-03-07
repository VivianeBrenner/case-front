import { create } from "zustand";
import { getProcesses, createProcess, updateProcess, deleteProcess } from "../services/processService";

interface Process {
  id: number;
  name: string;
  status: string;
}

interface ProcessState {
  processes: Process[];
  loadProcesses: () => Promise<void>;
  addProcess: (name: string, status: string) => Promise<void>;
  updateProcessById: (id: number, name: string, status: string) => Promise<void>;
  removeProcess: (id: number) => Promise<void>;
}

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

  addProcess: async (name, status) => {
    try {
      const newProcess = await createProcess(name, status);
      set((state) => ({ processes: [...state.processes, newProcess] }));
    } catch (error) {
      console.error("Erro ao criar processo:", error);
    }
  },

  updateProcessById: async (id, name, status) => {
    try {
      await updateProcess(id, name, status);
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
