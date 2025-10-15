import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { userInfo } from "../Variable";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const user = userInfo();

  // useEffect(() => {
  //   if (!user?.auth_token || user?.u_type !== "0") {
  //     navigate("/login", { replace: true });
  //   }
  // }, [user, navigate]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/30"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="relative flex flex-col w-64 h-full bg-white">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <Sidebar />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
