import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 fixed top-4 left-4 bg-gray-800 text-white rounded-lg z-50"
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={24} />} 
      </button>

      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <h2 className="text-xl font-bold ml-10 mt-1">Menu</h2>
        <ul className="mt-4 ml-10 space-y-2">
          <li><button onClick={() => { navigate("/dashboard"); setIsOpen(false); }}>Dashboard</button></li>
          <li><button onClick={() => { navigate("/process"); setIsOpen(false); }}>Processos</button></li>
          <li><button onClick={() => { navigate("/settings"); setIsOpen(false); }}>Configurações</button></li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
