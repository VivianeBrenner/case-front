import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { User } from "../../types/user.types";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);



  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <button onClick={() => navigate("/dashboard")} className="bg-gray-700 text-white px-4 py-2 rounded-lg">
          ← Voltar
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Usuários</h1>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3">ID</th>
            <th className="p-3">Nome</th>
            <th className="p-3">Email</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-3 text-center">{u.id}</td>
              <td className="p-3 text-center">{u.nome}</td>
              <td className="p-3 text-center">{u.email}</td>
              <td className="p-3 text-center">
                <select
                  value={u.role}
                  onChange={(e) => {
                    e.preventDefault();
                    alert("Essa funcionalidade estará disponível em breve!");
                  }}
                  className="p-2 border rounded"
                >
                  <option value="USER">Usuário</option>
                  <option value="MANAGER">Gerente</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
