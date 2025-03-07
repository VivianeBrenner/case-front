import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProcesses } from "../../services/processService";
import { Process } from "../../types/process.types";
import ProcessFlow from "../../components/flow/ProcessFlow";
import ProcessChart from "../../components/charts/ProcessChart";
import { useAuthStore } from "../../store/authStore";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedArea, setSelectedArea] = useState("Todas");
  const [processes, setProcesses] = useState<Process[]>([]); 

  const areas: string[] = ["Todas", "Recursos Humanos", "Financeiro", "TI", "Operações"];

  
  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const data = await getProcesses();
        setProcesses(data); 
      } catch (error) {
        console.error("Erro ao buscar processos:", error);
      }
    };

    fetchProcesses();
  }, []);

  
  const filteredProcesses: Process[] = selectedArea === "Todas"
    ? processes
    : processes.filter((process) => process.area === selectedArea);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white ml-12">Dashboard</h1>
          <div>
            {user?.role === "admin" && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/users")} 
              >
                Gerenciar Usuários
              </button>
            )}

            {user?.role !== "usuario" && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={() => navigate("/process/new")} 
              >
                Criar Novo Processo
              </button>
            )}
          </div>
        </header>

        <div className="container mx-auto mt-6 p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Total de Processos</h3>
              <p className="text-2xl font-bold">{filteredProcesses.length}</p>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Meus Processos</h2>
            <select
              className="bg-white text-gray-900 p-2 rounded-lg border"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
            >
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredProcesses.map((process) => (
              <div
                key={process.id}
                className="bg-white text-gray-900 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all"
                onClick={() => navigate(`/process/${process.id}`)}
              >
                <h3 className="text-lg font-bold">Processo: {process.name}</h3>
                <p className="text-sm text-gray-600">
                  Última atualização: {new Date(process.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Hierarquia de Processos</h2>
            <ProcessFlow />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Distribuição dos Processos</h2>
            <ProcessChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
