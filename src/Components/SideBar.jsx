import React, { useState, useEffect } from "react";
import { User, Package, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = ({ onMenuChange = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ derive active menu based on current route
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
    console.log("Menu clicked:", menu);
    onMenuChange(menu);

    if (menu === "info") navigate("/myinfo");
    else if (menu === "orders") navigate("/myorders");

    setIsOpen(false); // ✅ close sidebar on mobile after click
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
              Hello Jhanvi
            </h1>
          </div>
          <p className="text-sm text-gray-500 pl-3">Welcome to your Account</p>
        </div>

        {/* Menu */}
        <div className="space-y-1">
          <button
            onClick={() => handleMenuClick("orders")}
            className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md transition-colors relative ${
              activeMenu === "orders"
                ? "bg-[#f6f6f6] text-gray-900"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {activeMenu === "orders" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-800 rounded-full"></div>
            )}
            <Package size={20} strokeWidth={1.5} />
            <span className="text-base">My Orders</span>
          </button>

          <button
            onClick={() => handleMenuClick("info")}
            className={`flex items-center gap-3 w-full text-left py-2 px-3 rounded-md transition-colors relative ${
              activeMenu === "info"
                ? "bg-[#f6f6f6] text-gray-900"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {activeMenu === "info" && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-800 rounded-full"></div>
            )}
            <User size={20} strokeWidth={1.5} />
            <span className="text-base">My Info</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
