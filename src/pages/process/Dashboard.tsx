import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProcessFlow from "../../components/flow/ProcessFlow";
import ProcessChart from "../../components/charts/ProcessChart"

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedArea, setSelectedArea] = useState("Todas");

  const areas: string[] = ["Todas", "Recursos Humanos", "Financeiro", "TI"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xxl font-bold text-white">Dashboard</h1>
        <button
          onClick={() => navigate("/process/new")}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
        >
          + Novo Processo
        </button>
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
          <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Processo: Contratação de Funcionários</h3>
            <p className="text-sm text-gray-600">Última atualização: 05/03/2025</p>
          </div>
          <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Processo: Avaliação de Performance</h3>
            <p className="text-sm text-gray-600">Última atualização: 20/02/2025</p>
          </div>
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
  );
};

export default Dashboard;
