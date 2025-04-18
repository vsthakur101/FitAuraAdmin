import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, KeyRound } from 'lucide-react';
import { logout } from '../../utils/auth';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login');
    };

    return (
        <div
            className={`fixed top-0 right-0 z-30 h-16 w-full bg-black border-b border-gray-800 flex items-center justify-between pl-24 pr-6 text-white transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-56'
                }`}
        >
            {/* Branding */}
            <div className="text-xl font-bold tracking-wide">
                Fit<span className="text-blue-500">Aura</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
                <button
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <div className="w-8 h-8 rounded-full bg-gray-600 text-sm flex items-center justify-center">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{user?.name || 'User'}</span>
                    <ChevronDown size={16} />
                </button>

                {showDropdown && (
                    <div
                        className="absolute right-0 top-12 bg-gray-900 border border-gray-700 rounded-md shadow-md w-48 text-sm overflow-hidden"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <div
                            onClick={() => navigate('/trainer/update-password')}
                            className="px-4 py-2 flex items-center gap-2 hover:bg-gray-800 cursor-pointer"
                        >
                            <KeyRound size={16} /> Update Password
                        </div>
                        <div
                            onClick={handleLogout}
                            className="px-4 py-2 flex items-center gap-2 text-red-400 hover:bg-gray-800 cursor-pointer"
                        >
                            <LogOut size={16} /> Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;