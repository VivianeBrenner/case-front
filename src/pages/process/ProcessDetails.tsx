import { useState, useEffect, JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Process, Subprocess } from "../../types/process.types";
import { getProcessById, deleteProcess } from "../../services/processService";
import { createSubprocess, getSubprocessesByParent } from "../../services/subprocessService";
import { FiPlus, FiMaximize, FiMinimize, FiEdit, FiTrash2 } from "react-icons/fi";
import { useConfigStore } from "../../store/configStore";

const ProcessDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const apiUrl = useConfigStore.getState().apiUrl;

  const [process, setProcess] = useState<Process | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSubprocesses, setOpenSubprocesses] = useState<{ [key: number]: boolean }>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [parentSubId, setParentSubId] = useState<number | null>(null);

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
      } catch (err) {
        setError("Erro ao buscar processo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProcess();
  }, [id]);

  const handleDelete = async () => {
    if (!process) return;
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o processo "${process.nome}"?`);
    if (confirmDelete) {
      try {
        await deleteProcess(process.id);
        navigate("/dashboard");
      } catch (err) {
        alert("Erro ao excluir o processo.");
      }
    }
  };

  const toggleSubprocess = async (subId: number) => {
    if (openSubprocesses[subId]) {
      setOpenSubprocesses((prev) => ({
        ...prev,
        [subId]: false,
      }));
    } else {
      try {
        const children = await getSubprocessesByParent(subId);

        setProcess((prevProcess) => {
          if (!prevProcess) return prevProcess;

          const updateChildren = (subs: Subprocess[]): Subprocess[] => {
            return subs.map((sub) => {
              if (sub.id === subId) {
                return { ...sub, subprocesses: children };
              }
              if (sub.subprocesses && sub.subprocesses.length > 0) {
                return { ...sub, subprocesses: updateChildren(sub.subprocesses) };
              }
              return sub;
            });
          };

          return {
            ...prevProcess,
            subprocesses: updateChildren(prevProcess.subprocesses || []),
          };
        });

        setOpenSubprocesses((prev) => ({
          ...prev,
          [subId]: true,
        }));
      } catch (err) {
        console.error("Erro ao carregar subprocessos filhos", err);
      }
    }
  };

  const handleCreateSubprocess = async () => {
    if (!process) return;
    if (!newSubName.trim()) return;

    try {
      await createSubprocess({
        nome: newSubName,
        processId: parentSubId ? null : process.id,
        parentSubId: parentSubId,
      });
      setShowCreateForm(false);
      setNewSubName("");
      setParentSubId(null);

      const updated = await getProcessById(Number(id));
      setProcess(updated);
    } catch (err) {
      alert("Erro ao criar subprocesso");
      console.error(err);
    }
  };

  const openCreateForSub = (subId: number) => {
    setParentSubId(subId);
    setShowCreateForm(true);
  };

  function renderSubprocessList(subprocesses: Subprocess[]): JSX.Element {
    return (
      <ul className="mt-2">
        {subprocesses.map((sub) => {
          const isOpen = openSubprocesses[sub.id] || false;

          return (
            <li key={sub.id} className="p-2 border rounded-lg bg-gray-100 mb-2 flex flex-col">
              <div className="flex justify-between items-center">
                <span className="text-gray-900">{sub.nome}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => openCreateForSub(sub.id)}
                    className="ml-2 bg-green-600 text-white px-2 py-1 rounded flex items-center"
                  >
                    <FiPlus />
                  </button>
                  <button
                    onClick={() => toggleSubprocess(sub.id)}
                    className="ml-2 bg-yellow-600 text-white px-2 py-1 rounded flex items-center"
                    title={isOpen ? "Fechar subprocessos" : "Abrir subprocessos"}
                  >
                    {isOpen ? <FiMinimize /> : <FiMaximize />}
                  </button>
                </div>
              </div>
              {isOpen && sub.subprocesses && sub.subprocesses.length > 0 && (
                <div className="ml-6 mt-2">{renderSubprocessList(sub.subprocesses)}</div>
              )}
            </li>
          );
        })}
      </ul>
    );
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
        <div className="bg-white rounded-lg max-w-3xl mx-auto mt-6 relative">
          <div className="absolute top-0 right-0 flex space-x-2 p-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                alert("Essa funcionalidade estará disponível em breve!");
              }}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              <FiEdit size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
            >
              <FiTrash2 size={18} />
            </button>
          </div>

          <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-4">
            <h2 className="text-2xl font-bold mb-4">{process.nome}</h2>
            <p className="mb-2">
              <strong>Área:</strong> {process.area?.nome}
            </p>
            <p className="mb-2">
              <strong>Status:</strong> {process.status}
            </p>
            <p className="mb-2">
              <strong>Responsável:</strong> {process.responsible}
            </p>
            <p className="mb-2">
              <strong>Documentação:</strong>{" "}
              {process.documentation ? (
                <a
                  href={`${apiUrl}/uploads/${process.documentation}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800 transition"
                >
                  Visualizar Arquivo
                </a>
              ) : (
                "Nenhuma documentação"
              )}
            </p>
          </div>
        </div>
      ) : null}


      {process && (
        <div className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-3xl mx-auto mt-6">
          {showCreateForm && (
            <div className="mt-4 p-4 rounded-lg text-gray-900">
              <h3 className="font-bold mb-2">
                {parentSubId ? "Criar Subprocesso Filho" : "Criar Subprocesso"}
              </h3>
              <div className="flex">
                <input
                  type="text"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="Nome do subprocesso"
                  className="border p-2 flex-grow text-gray-900"
                />
                <button
                  onClick={handleCreateSubprocess}
                  className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setParentSubId(null);
                    setNewSubName("");
                  }}
                  className="ml-2 bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between max-w-3xl mx-auto mt-8 mb-4">
            <h3 className="text-xl font-semibold">Subprocessos</h3>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 text-white px-3 py-1 rounded flex items-center"
            >
              <FiPlus className="mr-1" />
              Criar Subprocesso
            </button>
          </div>

          {process.subprocesses && process.subprocesses.length > 0 ? (
            renderSubprocessList(process.subprocesses)
          ) : (
            <p className="text-gray-400">Nenhum subprocesso encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default ProcessDetails;  