import { useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import { RootState } from '../../redux/store';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isCollapsed = useSelector((state: RootState) => state.sidebar.isCollapsed);

  return (
    <div className="flex min-h-screen overflow-hidden bg-black text-white">
      <Sidebar />
      <div className={`flex-1 transition-all ${isCollapsed ? 'ml-16' : 'ml-56'}`}>
        <Header />
        <div className="pt-20 px-4 overflow-y-auto h-[calc(100vh-64px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;