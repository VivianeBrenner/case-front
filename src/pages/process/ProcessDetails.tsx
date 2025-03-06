import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Process } from "../../types/process.types";

const mockProcess: Process = {
  id: "1",
  name: "Contratação de Funcionários",
  area: "Recursos Humanos",
  status: "Em andamento",
  responsible: "Ana Silva",
  type: "Manual",
  subprocesses: [
    { id: 1, name: "Triagem de currículos", expanded: false },
    { id: 2, name: "Entrevistas", expanded: false },
  ],
  history: [
    { date: "05/03/2025", action: "Status alterado para 'Em andamento'" },
    { date: "04/03/2025", action: "Processo criado" },
  ],
  comments: [
    { user: "João", text: "Precisamos revisar os critérios de seleção." },
  ],
};

const ProcessDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [process, setProcess] = useState<Process | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      setError("Processo não encontrado.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setProcess(mockProcess);
      setLoading(false);
    }, 1000);
  }, [id]);

  const toggleSubprocess = (subId: number) => {
    setProcess((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        subprocesses: prev.subprocesses.map((sub) =>
          sub.id === subId ? { ...sub, expanded: !sub.expanded } : sub
        ),
      };
    });
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProcess((prev) => prev ? { ...prev, [name]: value } : null);
};


  const saveChanges = () => {
    console.log("Novos dados:", process);
    setIsEditing(false);
  }

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
          <h2 className="text-2xl font-bold mb-4">
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={process.name}
                onChange={handleEdit}
                className="border p-2 rounded-lg w-full"
              />
            ) : (
              process.name
            )}
          </h2>
          <p>
            <strong>Área:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={process.name}
                onChange={handleEdit}
                className="border p-2 rounded-lg w-full"
              />
            ) : (
              process.area
            )}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            {isEditing ? (
              <select
                name="status"
                value={process.status}
                onChange={handleEdit}
                className="border p-2 rounded-lg"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
              </select>
            ) : (
              process.status
            )}
          </p>
          <p>
            <strong>Responsável:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="responsible"
                value={process.responsible}
                onChange={handleEdit}
                className="border p-2 rounded-lg"
              />
            ) : (
              process.responsible
            )}
          </p>
          <p>
            <strong>Tipo:</strong> {process.type}
          </p>

          <h3 className="text-xl font-semibold mt-6">Subprocessos</h3>
          <ul className="mt-2">
            {process.subprocesses.map((sub) => (
              <li
                key={sub.id}
                className="p-2 border rounded-lg bg-gray-100 mb-2 cursor-pointer"
                onClick={() => toggleSubprocess(sub.id)}
              >
                {sub.name} {sub.expanded ? "🔽" : "▶"}
                {sub.expanded && <p className="text-sm text-gray-700 mt-2">Detalhes do subprocesso...</p>}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Histórico</h3>
          <ul className="mt-2">
            {process.history.map((entry, index) => (
              <li key={index} className="p-2 border rounded-lg bg-gray-100 mb-2">
                <strong>{entry.date}:</strong> {entry.action}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-6">Comentários</h3>
          <ul className="mt-2">
            {process.comments.map((comment, index) => (
              <li key={index} className="p-2 border rounded-lg bg-gray-100 mb-2">
                <strong>{comment.user}:</strong> {comment.text}
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveChanges}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                >
                  Salvar Alterações
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-auto"
              >
                Editar Processo
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-red-500 mt-4">Erro: Nenhum dado encontrado.</p>
      )}
    </div>
  );
};

export default ProcessDetails;
