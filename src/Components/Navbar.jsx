import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  TextAlignEnd,
  X,
  CircleUser,
} from "lucide-react";
import logo from "../assets/logo.svg";
import axiosInstance from "../Axios/axios";
import { userInfo } from "../Variable";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const user = userInfo();
  const u_id = user?.u_id;
  const token = user?.auth_token;

  const searchParams = new URLSearchParams(location.search);
  const currentCateId = searchParams.get("cate_id");

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY + windowHeight;
      setIsAtBottom(scrollPosition >= documentHeight - 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("/getcategory");
      if (response?.data?.status === 1) {
        setCategories(response?.data?.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const menuItems = [
    { to: "/", label: "Home" },
    ...categories.map((cat) => ({
      to: `/shop?cate_id=${cat.cate_id}&category=${encodeURIComponent(
        cat.cate_name
      )}`,
      label: cat.cate_name,
      cate_id: cat.cate_id,
    })),
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {/* Sticky full-width navbar */}
      <nav className="sticky top-0 z-60">
        <div className="bg-[#F3F0ED] shadow-md">
          <div className="max-w-7xl mx-auto w-full px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-black">
              <img src={logo} alt="GlamGait Logo" className="h-10 w-auto" />
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex space-x-6 mr-6">
              {menuItems?.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    item.cate_id
                      ? item.cate_id.toString() === currentCateId
                        ? "text-black font-medium"
                        : "text-[#767676] hover:text-black"
                      : location.pathname === item.to
                      ? "text-black font-medium"
                      : "text-[#767676] hover:text-black"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Icons & Hamburger */}
            <div className="flex items-center">
              <div className="flex space-x-4 text-gray-600">
                {/* Search icon with toggle */}
                <Search
                  className="cursor-pointer hover:text-black"
                  onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                />
                <Link
                  to="/wishlist"
                  className="cursor-pointer hover:text-black"
                >
                  <Heart className="hover:text-black" />
                </Link>
                <Link to="/cart" className="cursor-pointer hover:text-black">
                  <ShoppingCart className="hover:text-black" />
                </Link>
                <CircleUser
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    if (u_id && token) {
                      navigate("/myorders");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              </div>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden ml-4 text-gray-600 hover:text-black"
                onClick={toggleMenu}
              >
                {isOpen ? <X size={24} /> : <TextAlignEnd size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔍 Search Bar (opens on icon click) */}
      {isMobileSearchOpen && (
        <div
          className={`fixed ${
            isAtBottom ? "bottom-0" : ""
          }w-full bg-white shadow-md px-4 py-3 flex items-center justify-center z-60`}
        >
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-xl items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                // placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full flex-1 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
      )}

      {/* 🔥 Mobile dropdown menu as fixed overlay */}
      {isOpen && (
        <div
          className={`lg:hidden fixed ${
            isAtBottom ? "bottom-0" : "top-[72px]"
          } left-0 w-full bg-[#F3F0ED] z-50 shadow-md px-4 py-4 transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={
                  item.cate_id
                    ? item.cate_id.toString() === currentCateId
                      ? "text-black font-medium"
                      : "text-[#767676] hover:text-black"
                    : location.pathname === item.to
                    ? "text-black font-medium"
                    : "text-[#767676] hover:text-black"
                }
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
