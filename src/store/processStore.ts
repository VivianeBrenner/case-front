import { create } from "zustand";
import axios from "axios";

interface Processo {
  id: string;
  nome: string;
}

interface ProcessState {
  processos: Processo[];
  fetchProcessos: () => void;
}

export const useProcessStore = create<ProcessState>((set) => ({
  processos: [],
  
  fetchProcessos: async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/processos");
      set({ processos: data });
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
    }
  }
}));
