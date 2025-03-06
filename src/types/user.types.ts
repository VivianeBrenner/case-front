export interface UserData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
  }


export type UserRole = "admin" | "gerente" | "usuario";

export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
}
