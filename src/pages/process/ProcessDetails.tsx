import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Process } from "../../types/process.types";
import { getProcessById } from "../../services/processService";

const ProcessDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [process, setProcess] = useState<Process | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProcess = async () => {
      if (!id) {
        setError("Processo não encontrado.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProcessById(Number(id)); 
        setProcess(data);
      } catch (error) {
        setError("Erro ao buscar processo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProcess();
  }, [id]);

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
      >
        ← Voltar
      </button>

      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : process ? (
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-2xl font-bold mb-4">{process.name}</h2>
          <p><strong>Área:</strong> {process.area}</p>
          <p><strong>Status:</strong> {process.status}</p>
          <p><strong>Responsável:</strong> {process.responsible}</p>
          <p><strong>Tipo:</strong> {process.type}</p>

          <h3 className="text-xl font-semibold mt-6">Subprocessos</h3>
          <ul className="mt-2">
            {process.subprocesses.map((sub) => (
              <li key={sub.id} className="p-2 border rounded-lg bg-gray-100 mb-2">
                {sub.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Erro: Nenhum dado encontrado.</p>
      )}
    </div>
  );
};

export default ProcessDetails;
