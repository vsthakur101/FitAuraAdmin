import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCollapsed, toggleSidebar } from '../../redux/slices/sidebarSlice';
import {
  Home,
  Users,
  ClipboardList,
  Bell,
  StickyNote,
  LogOut,
  Menu,
} from 'lucide-react'; // or any icon lib you like
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';

const menuItems = [
  { name: 'Home', icon: <Home size={20} />, path: '/trainer/dashboard' },
  { name: 'Clients', icon: <Users size={20} />, path: '/trainer/clients' },
  { name: 'Plans', icon: <ClipboardList size={20} />, path: '/trainer/plans' },
  { name: 'Reminders', icon: <Bell size={20} />, path: '/trainer/reminders' },
  { name: 'Notes', icon: <StickyNote size={20} />, path: '/trainer/notes' },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div
      className={`bg-black text-white h-screen fixed top-0 left-0 transition-all duration-300 z-40 
      ${isCollapsed ? 'w-16' : 'w-56'}`}
      onMouseEnter={() => dispatch(setCollapsed(false))}
      onMouseLeave={() => dispatch(setCollapsed(true))}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-between p-4">
        <button onClick={handleToggle} className="text-white">
          <Menu size={20} />
        </button>
        {!isCollapsed && <div className="text-xl font-bold tracking-wide">
          Fit<span className="text-blue-500">Aura</span>
        </div>}
      </div>

      {/* Menu items */}
      <ul className="space-y-2 mt-6">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition hover:bg-gray-800 ${location.pathname === item.path ? 'bg-gray-800' : ''
                }`}
            >
              {item.icon}
              {!isCollapsed && <span className="text-sm">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout at bottom */}
      <div className="absolute bottom-4 w-full px-4">
        <button className="flex items-center gap-3 w-full py-2 rounded-md hover:bg-red-600" onClick={handleLogout}>
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
