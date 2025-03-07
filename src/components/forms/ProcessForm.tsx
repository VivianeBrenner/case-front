import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProcess, getProcesses, updateProcess } from "../../services/processService";
import { ProcessData } from "../../types/process.types";

const ProcessForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const [processData, setProcessData] = useState<ProcessData>({
    name: "",
    area: "",
    type: "",
    status: "",
    responsible: "",
    tools: "",
    documentation: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit) {
      
      const loadProcess = async () => {
        try {
            setLoading(true);
            const data = await getProcesses();
            if (!data) throw new Error("Processo não encontrado");
            setLoading(false);
          setProcessData(data);
        } catch (err) {
          setError("Erro ao carregar os dados do processo.");
        }
      };
      loadProcess();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProcessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProcessData((prev) => ({ ...prev, documentation: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        await updateProcess(Number(id), processData.name, processData.status);
      } else {
        await createProcess(processData.name, processData.status);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao salvar o processo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mb-4">
        <button onClick={() => navigate("/dashboard")} className="bg-gray-700 text-white px-4 py-2 rounded-lg">
          ← Voltar
        </button>
      </div>

      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {isEdit ? "Editar Processo" : "Criar Novo Processo"}
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome do Processo</label>
              <input type="text" name="name" value={processData.name} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
            </div>

            <div>
              <label className="block text-sm font-medium">Área</label>
              <select name="area" value={processData.area} onChange={handleChange} className="w-full p-2 border rounded-lg">
                {["Recursos Humanos", "Financeiro", "TI", "Operações"].map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select name="status" value={processData.status} onChange={handleChange} className="w-full p-2 border rounded-lg">
                {["Pendente", "Em andamento", "Concluído"].map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Responsável</label>
              <input type="text" name="responsible" value={processData.responsible} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
            </div>

            <div>
              <label className="block text-sm font-medium">Ferramentas Utilizadas</label>
              <input type="text" name="tools" value={processData.tools} onChange={handleChange} className="w-full p-2 border rounded-lg" required />
            </div>

            <div>
              <label className="block text-sm font-medium">Documentação</label>
              <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded-lg" />
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-gray-400 text-white rounded-lg">
                Cancelar
              </button>
              <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                {loading ? "Salvando..." : "Salvar Processo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProcessForm;
