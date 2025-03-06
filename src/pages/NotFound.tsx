import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-lg">Página não encontrada!</p>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
