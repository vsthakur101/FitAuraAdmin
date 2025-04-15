import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Clears token
        navigate("/login");
    };

    return (
        <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center">
            {/* Left Side – Brand or Page Title */}
            <div className="text-xl font-bold text-gray-800">
                FitAura Trainer Panel
            </div>

            {/* Right Side – User Info & Logout */}
            <div className="flex items-center gap-4">
                {/* User Avatar (placeholder for now) */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                    T
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="text-sm px-3 py-1.5 border rounded-lg text-red-600 border-red-400 hover:bg-red-50"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
