import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProcess, getProcesses, updateProcess } from "../../services/processService";
import { getAreas, createArea } from "../../services/areaService";
import { uploadFile } from "../../services/fileService";
import { ProcessData, ProcessPayload } from "../../types/process.types";

const ProcessForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  const [processData, setProcessData] = useState<ProcessData>({
    name: "",
    areaId: 0,
    status: "",
    responsible: "",
    documentation: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [areas, setAreas] = useState<{ id: number; nome: string }[]>([]);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (isEdit) {
      const loadProcess = async () => {
        try {
          setLoading(true);
          const data = await getProcesses();
          if (!data) throw new Error("Processo não encontrado");
          setProcessData(data);
          setLoading(false);
        } catch (err) {
          setError("Erro ao carregar os dados do processo.");
        }
      };
      loadProcess();
    }

    const fetchAreas = async () => {
      console.log("fetchAreas");
      try {
        const areaList = await getAreas();
        setAreas(areaList.map((area: { id: number; nome: string }) => ({ id: area.id, nome: area.nome })));
        console.log("areas", areaList);
      } catch (err) {
        console.error("Erro ao carregar áreas:", err);
      }
    };

    fetchAreas();
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProcessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let uploadedFileName = null;

      if (selectedFile) {
        const uploadResponse = await uploadFile(selectedFile);
        uploadedFileName = uploadResponse.filename;
      }

      const requestBody: ProcessPayload = {
        nome: processData.name,
        areaId: Number(processData.areaId),
        status: processData.status,
        responsible: processData.responsible,
        documentation: uploadedFileName || null,
      };

      if (isEdit) {
        await updateProcess(Number(id), requestBody);
      } else {
        await createProcess(requestBody);
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao salvar o processo.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateArea = async () => {
    if (!newArea.trim()) return;
    try {
      const newAreaResponse = await createArea(newArea);
      setAreas((prev) => [...prev, { id: newAreaResponse.id, nome: newArea }]);
      setProcessData((prev) => ({ ...prev, areaId: newAreaResponse.id }));
      setShowAreaModal(false);
      setNewArea("");
    } catch (err) {
      console.error("Erro ao criar área:", err);
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

          {showAreaModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-bold mb-4">Nova Área</h3>
                <input
                  type="text"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="w-full p-2 border rounded-lg mb-4"
                  placeholder="Nome da área"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAreaModal(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateArea}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 p-4">
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
              <div className="flex space-x-2">
                <select
                  name="areaId"
                  value={processData.areaId || ""}
                  onChange={(e) => {
                    const selectedAreaId = Number(e.target.value);
                    const flattenedAreas = Array.isArray(areas[0]) ? areas[0] : areas;
                    const selectedArea = flattenedAreas.find((area: { id: number; nome: string }) => area.id === selectedAreaId);

                    setProcessData((prev) => ({
                      ...prev,
                      areaId: selectedArea ? selectedArea.id : 0,
                      area: selectedArea ? selectedArea.nome : "",
                    }));
                  }}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="" disabled selected>
                    Selecione uma área
                  </option>
                  {((Array.isArray(areas[0]) ? areas[0] : areas) as { id: number; nome: string }[]).map(
                    (area) => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    )
                  )}
                </select>
                <button
                  type="button"
                  onClick={() => setShowAreaModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={processData.status || ""} 
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="" disabled selected>
                  Selecione um status
                </option>
                {["Em andamento", "Concluído"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
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
              <label className="block text-sm font-medium">Documentação</label>
              <input
                type="file"
                onChange={handleFileSelect}
                className="w-full p-2 border rounded-lg"
              />
              {selectedFile && (
                <p className="text-sm text-gray-500 mt-1">Arquivo selecionado: {selectedFile.name}</p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
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
