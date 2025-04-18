import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const Layout = () => (
  <div className="flex h-screen">
    <div className="flex-1 flex flex-col">
      <main className="p-4 flex-1 overflow-y-auto">
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </main>
    </div>
  </div>
);

export default Layout;
