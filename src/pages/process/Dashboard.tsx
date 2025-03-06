import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProcessFlow from "../../components/flow/ProcessFlow";
import ProcessChart from "../../components/charts/ProcessChart"
import { useAuthStore } from "../../store/authStore";
import Sidebar from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedArea, setSelectedArea] = useState("Todas");

  const areas: string[] = ["Todas", "Recursos Humanos", "Financeiro", "TI"];
  const processos = [
    { id: "1", nome: "Contratação de Funcionários", atualizado: "05/03/2025" },
    { id: "2", nome: "Avaliação de Performance", atualizado: "20/02/2025" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <Sidebar />
      <div className="flex-1">
        <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white ml-12">Dashboard</h1>
          <div>
            {user?.role === "admin" && (
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg">
                Gerenciar Usuários
              </button>
            )}

            {user?.role !== "usuario" && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Criar Novo Processo
              </button>
            )}
          </div>
        </header>
        <div className="container mx-auto mt-6 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Total de Processos</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Processos Ativos</h3>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Processos Concluídos</h3>
            <p className="text-2xl font-bold">4</p>
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
          {processos.map((processo) => (
            <div
              key={processo.id}
              className="bg-white text-gray-900 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition-all"
              onClick={() => navigate(`/process/${processo.id}`)}
            >
              <h3 className="text-lg font-bold">Processo: {processo.nome}</h3>
              <p className="text-sm text-gray-600">Última atualização: {processo.atualizado}</p>
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
