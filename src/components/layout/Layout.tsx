// src/components/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="p-4 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
