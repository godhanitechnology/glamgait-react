import { useState } from "react";
import { User, Package, Menu, X, LogOut, AlertTriangle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { userInfo } from "../Variable";

const SideBar = ({ onMenuChange = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = userInfo();

  const activeMenu =
    location.pathname === "/myinfo"
      ? "info"
      : location.pathname === "/myorders"
      ? "orders"
      : "";

  const breadcrumbLabel =
    activeMenu === "orders"
      ? "My Orders"
      : activeMenu === "info"
      ? "Personal Info"
      : "";

  const handleMenuClick = (menu) => {
    onMenuChange(menu);

    if (menu === "info") navigate("/myinfo");
    else if (menu === "orders") navigate("/myorders");

    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("GlamGait");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-[#f3f0ed] px-5 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <h1 className="text-lg font-semibold text-gray-900">My Account</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-[#f3f0ed] md:min-h-screen w-full md:w-96 p-6 sm:p-8 font-sans md:pl-20 sticky top-0 z-40 transition-all duration-300`}
      >
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <span
            className="hover:text-gray-900 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">{breadcrumbLabel}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-1 h-7 bg-gray-800 rounded-sm mt-0.5"></div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Hello {user?.first_name}
            </h1>
          </div>
          <p className="text-sm text-gray-500 pl-3">Welcome to your Account</p>
        </div>

        {/* Menu */}
        <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
          {/* My Orders */}
          <button
            onClick={() => handleMenuClick("orders")}
            className={`flex items-center gap-3 w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-md transition-colors relative text-sm sm:text-base ${
              activeMenu === "orders"
                ? "bg-[#f6f6f6] text-gray-900"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {activeMenu === "orders" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-800 rounded-full"></div>
            )}
            <Package size={20} strokeWidth={1.5} />
            <span>My Orders</span>
          </button>

          {/* My Info */}
          <button
            onClick={() => handleMenuClick("info")}
            className={`flex items-center gap-3 w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-md transition-colors relative text-sm sm:text-base ${
              activeMenu === "info"
                ? "bg-[#f6f6f6] text-gray-900"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {activeMenu === "info" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-800 rounded-full"></div>
            )}
            <User size={20} strokeWidth={1.5} />
            <span>My Info</span>
          </button>

          {/* Logout */}
          <button
            className="flex items-center gap-3 w-full text-left py-2 sm:py-3 px-3 sm:px-4 rounded-md transition-colors relative bg-red-200 text-gray-900 hover:bg-red-300 text-sm sm:text-base"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center space-y-4">
            <AlertTriangle className="mx-auto text-red-500" size={40} />
            <h2 className="text-lg font-semibold text-gray-900">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-between gap-4 mt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2 px-4 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 px-4 bg-red-600 rounded-md text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
