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