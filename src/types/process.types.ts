export interface Subprocess {
    id: number;
    name: string;
    expanded: boolean;
  }
  
  export interface HistoryEntry {
    date: string;
    action: string;
  }
  
  export interface Comment {
    user: string;
    text: string;
  }
  
  export interface Process {
    id: string;
    name: string;
    area: string;
    status: string;
    responsible: string;
    type: string;
    subprocesses: Subprocess[];
    history: HistoryEntry[];
    comments: Comment[];
  }
  
  export interface ProcessData {
    name: string;
    area: string;
    type: string;
    status: string;
    responsible: string;
    tools: string;
    documentation: File | null;
  }
  
  export interface ProcessFormProps {
    initialData?: ProcessData;
  }