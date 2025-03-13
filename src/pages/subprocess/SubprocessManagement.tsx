import { useEffect, useState } from "react";
import {
    getSubprocesses,
    createSubprocess,
    deleteSubprocess,
} from "../../services/subprocessService";
import { Subprocess } from "../../types/process.types";

const SubprocessManagement = () => {
    const [subprocesses, setSubprocesses] = useState<Subprocess[]>([]);
    const [newSubprocess, setNewSubprocess] = useState("");
    const [selectedProcessId, setSelectedProcessId] = useState<number | null>(
        null
    );

    useEffect(() => {
        const fetchSubprocesses = async () => {
            try {
                const data = await getSubprocesses();
                setSubprocesses(data);
            } catch (error) {
                console.error("Erro ao buscar subprocessos:", error);
            }
        };

        fetchSubprocesses();
    }, []);

    const handleCreateSubprocess = async () => {
        if (!newSubprocess.trim() || !selectedProcessId) return;
        try {
            const created = await createSubprocess({
                nome: newSubprocess,
                processId: selectedProcessId
            });
            setSubprocesses([...subprocesses, created]);
            setNewSubprocess("");
        } catch (error) {
            console.error("Erro ao criar subprocesso:", error);
        }
    };

    const handleDeleteSubprocess = async (id: number) => {
        try {
            await deleteSubprocess(id);
            setSubprocesses(subprocesses.filter((sub) => sub.id !== id));
        } catch (error) {
            console.error("Erro ao deletar subprocesso:", error);
        }
    };

    return (
        <div className="min-h-screen p-6 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold mb-4">Gerenciar Subprocessos</h2>

            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={newSubprocess}
                    onChange={(e) => setNewSubprocess(e.target.value)}
                    placeholder="Novo Subprocesso"
                    className="p-2 border rounded-lg text-black"
                />
                <select
                    value={selectedProcessId || ""}
                    onChange={(e) => setSelectedProcessId(Number(e.target.value))}
                    className="p-2 border rounded-lg text-black"
                >
                    <option value="">Selecione um processo</option>
                    {/* Simples placeholders; se você quiser buscar dinamicamente, faça outro fetch. */}
                    <option value="1">Processo 1</option>
                    <option value="2">Processo 2</option>
                </select>
                <button
                    onClick={handleCreateSubprocess}
                    className="bg-green-600 px-4 py-2 rounded-lg"
                >
                    Adicionar
                </button>
            </div>

            <ul>
                {subprocesses.map((sub) => (
                    <li
                        key={sub.id}
                        className="flex justify-between bg-white text-black p-2 rounded-lg mb-2"
                    >
                        {sub.nome}
                        <button
                            onClick={() => handleDeleteSubprocess(sub.id)}
                            className="text-red-500 hover:text-red-700 transition-all"
                        >
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubprocessManagement;
