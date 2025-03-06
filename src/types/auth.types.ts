export interface AuthCredentials {
    email: string;
    senha: string;
  }
  
  export interface AuthStore {
    login: (email: string, senha: string) => Promise<void>;
  }