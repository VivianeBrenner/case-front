export interface Subprocess {
  id: number;
  nome: string;
  subprocesses?: Subprocess[];
  expanded: boolean;
}

export interface CreateSubprocessData {
  nome: string;
  processId?: number | null;
  parentSubId?: number | null;
}
  
  export interface Comment {
    user: string;
    text: string;
  }
  
  export interface Process {
    id: number;
    nome: string;
    area: {
      nome: string;
    };
    status: string;
    responsible: string;
    documentation?: string;
    updatedAt: string;
    subprocesses: Subprocess[];
  }
  
  export interface ProcessData {
    name: string;
    areaId: number;
    status: string;
    responsible: string;
    documentation: File | null;
  }
  
  export interface ProcessFormProps {
    initialData?: ProcessData;
  }

  export interface ProcessState {
    processes: Process[];
    loadProcesses: () => Promise<void>;
    addProcess: (name: string, status: string) => Promise<void>;
    updateProcessById: (id: number, name: string, status: string) => Promise<void>;
    removeProcess: (id: number) => Promise<void>;
  }

  export interface ProcessPayload {
    nome: string;
    areaId: number;
    status: string;
    responsible: string;
    documentation?: string | null;
  }