import { useEffect } from "react";
import { useProcessStore } from "../store/processStore";
import ProcessTree from "../components/ProcessTree";

const Dashboard = () => {
  const { processos, fetchProcessos } = useProcessStore();

  useEffect(() => {
    fetchProcessos();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Processos da Empresa</h1>
      <ProcessTree processos={processos} />
    </div>
  );
};

export default Dashboard;