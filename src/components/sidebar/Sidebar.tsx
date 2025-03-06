import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuthStore } from "../../store/authStore";

const Sidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 fixed top-4 left-4 bg-gray-800 text-white rounded-lg z-[60]"
                >
                    <FiMenu size={24} />
                </button>
            )}

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-[50]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-64 p-4 shadow-lg bg-gray-800 z-[60] transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"
                    }`}
            >

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Menu</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white p-2 rounded-lg hover:bg-gray-700"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <ul className="mt-4 ml-10 space-y-2">
                    <li>
                        <button
                            className="flex items-center space-x-3 text-white hover:text-gray-300 w-full p-2 rounded-lg hover:bg-gray-700 transition"
                            onClick={() => { navigate("/dashboard"); setIsOpen(false); }}
                        >
                            <FiHome size={20} /> <span>Dashboard</span>
                        </button>
                    </li>
                    <li><button
                        className="flex items-center space-x-3 text-white hover:text-gray-300 w-full p-2 rounded-lg hover:bg-gray-700 transition"
                        onClick={() => { navigate("/settings"); setIsOpen(false); }}
                    >
                        <FiSettings size={20} /> <span>Configurações</span>
                    </button>
                    </li>
                    <li>
                        <button
                            className="flex items-center space-x-3 text-white hover:text-gray-300 w-full p-2 rounded-lg hover:bg-gray-700 transition"
                            onClick={() => { logout(); setIsOpen(false); }}
                        >
                            <FiLogOut size={20} /> <span>Sair</span>
                        </button>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Sidebar;
