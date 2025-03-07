import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authservice"
import { UserData } from "../../types/user.types";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserData>({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    setErro(null);

    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErro("Todos os campos são obrigatórios!");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErro("Formato de e-mail inválido!");
      return;
    }

    if (formData.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    try {
      await register({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        confirmarSenha: formData.confirmarSenha,
      });

      navigate("/", { replace: true });
    } catch (error) {
      setErro("Falha no cadastro. Tente novamente.");
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-bold text-center text-gray-900">Criar uma Conta</h2>

          {erro && <p className="text-red-500 text-sm text-center mt-2">{erro}</p>}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-900">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
              placeholder="Seu nome"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
              placeholder="********"
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">Confirmar Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 focus:ring-2 focus:ring-purple-500"
              placeholder="********"
              required
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
