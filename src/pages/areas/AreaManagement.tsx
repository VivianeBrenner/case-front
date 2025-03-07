import { useEffect, useState } from "react";
import { getAreas, createArea, deleteArea } from "../../services/areaService";
import { Area } from "../../types/areas.type";

const AreaManagement = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [newAreaName, setNewAreaName] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data: Area[] = await getAreas();
        setAreas(data);
      } catch (error) {
        console.error("Erro ao buscar áreas:", error);
      }
    };

    fetchAreas();
  }, []);


  const handleCreateArea = async () => {
    if (newAreaName.trim() === "") return;
    try {
      const { data: createdArea } = await createArea(newAreaName);
      setAreas([...areas, createdArea]);
      setNewAreaName("");
    } catch (error) {
      console.error("Erro ao criar área:", error);
    }
  };
  

  const handleDeleteArea = async (area: Area) => {
    try {
      await deleteArea(area.id);
      setAreas(areas.filter((a) => a.id !== area.id));
    } catch (error) {
      console.error("Erro ao deletar área:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Gerenciar Áreas</h2>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newAreaName}
          onChange={(e) => setNewAreaName(e.target.value)}
          placeholder="Nova Área"
          className="p-2 border rounded-lg text-black"
        />
        <button onClick={handleCreateArea} className="bg-green-600 px-4 py-2 rounded-lg">
          Adicionar
        </button>
      </div>

      <ul>
        {areas.map((area) => (
          <li key={area.id} className="flex justify-between bg-white text-black p-2 rounded-lg mb-2">
            {area.name}
            <button onClick={() => handleDeleteArea(area)} className="text-red-500">
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AreaManagement;
