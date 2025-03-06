import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProcessData, ProcessFormProps } from "../../types/process.types";

const ProcessForm: React.FC<ProcessFormProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const [processData, setProcessData] = useState<ProcessData>(
    initialData || {
      name: "",
      area: "Recursos Humanos",
      type: "Manual",
      status: "Pendente",
      responsible: "",
      tools: "",
      documentation: null,
    }
  );

  const areas = ["Recursos Humanos", "Financeiro", "TI", "Operações"];
  const types = ["Manual", "Sistêmico"];
  const statuses = ["Pendente", "Em andamento", "Concluído"];

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Processo salvo:", processData);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
        >
          ← Voltar
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {initialData ? "Editar Processo" : "Criar Novo Processo"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome do Processo</label>
            <input
              type="text"
              name="name"
              value={processData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Área</label>
            <select
              name="area"
              value={processData.area}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              {areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Tipo</label>
            <select
              name="type"
              value={processData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={processData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Responsável</label>
            <input
              type="text"
              name="responsible"
              value={processData.responsible}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Ferramentas Utilizadas</label>
            <input
              type="text"
              name="tools"
              value={processData.tools}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Documentação</label>
            <input type="file" onChange={handleFileUpload} className="w-full p-2 border rounded-lg" />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Salvar Processo
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ProcessForm;
