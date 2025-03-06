import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, senha);
      navigate("/dashboard");
    } catch {
      setErro("Email ou senha inválidos!");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Bem-vindo de volta!
        </h2>

        {erro && <p className="text-red-500 text-sm text-center mt-2">{erro}</p>}

        <div className="mt-6">
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

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" /> Lembrar-me
          </label>
          <a href="#" className="text-sm text-purple-500 hover:underline">
            Esqueceu a senha?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white p-3 rounded-lg mt-6 hover:bg-purple-700 transition-all"
        >
          Entrar
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Não tem uma conta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-500 hover:underline cursor-pointer"
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </section>
  );
};

export default Login;
