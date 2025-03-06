import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      console.log("Usuário cadastrado:", { nome, email, senha });

      navigate("/login"); // Redireciona para login após cadastro
    } catch {
      setErro("Falha no cadastro. Tente novamente.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Criar uma Conta
        </h2>

        {erro && <p className="text-red-500 text-sm text-center mt-2">{erro}</p>}

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-900">
            Nome
          </label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
            placeholder="Seu nome"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            E-mail
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
            placeholder="seu@email.com"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Senha
          </label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
            placeholder="********"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-900">
            Confirmar Senha
          </label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
            placeholder="********"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-6 hover:bg-purple-700 transition-all"
        >
          Cadastrar
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Já tem uma conta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-500 hover:underline cursor-pointer"
          >
            Entrar
          </span>
        </p>
      </div>
    </section>
  );
};

export default Register;
