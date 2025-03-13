import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authservice";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    setIsSubmitting(true);
    setErro(null);

    try {
      const response = await login(email, senha);
     
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
        navigate("/dashboard");
      } else {
        setErro("Erro ao autenticar, tente novamente.");
      }
    } catch (error) {
      setErro("Email ou senha inválidos!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Bem-vindo de volta!
        </h2>

        {erro && <p className="text-red-500 text-sm text-center mt-2">{erro}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-900">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Lembrar-me
            </label>
            <a href="#" className="text-sm text-purple-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

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
