import { useAuthStore } from "../../store/authStore";

const UserManagement = () => {
  const { user } = useAuthStore();

  if (user?.role !== "admin") {
    return <p className="text-red-500">Acesso negado.</p>;
  }

  return <h1>Gerenciamento de Usuários</h1>;
};

export default UserManagement;
