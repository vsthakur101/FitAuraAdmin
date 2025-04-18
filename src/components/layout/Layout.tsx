import { Outlet } from "react-router-dom";

const Layout = () => (
  <div className="flex h-screen">
    <div className="flex-1 flex flex-col">
      <main className="p-4 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
