interface Processo {
  id: string;
  nome: string;
}

const ProcessTree = ({ processos }: { processos: Processo[] }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">📌 Processos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processos.length > 0 ? (
          processos.map((proc) => (
            <div key={proc.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{proc.nome}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum processo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default ProcessTree;
