import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
  CircleUser,
  Plus,
  Minus,
  TextAlignEnd,
} from "lucide-react";
import logo from "../assets/logo.svg";
import axiosInstance from "../Axios/axios";
import { userInfo } from "../Variable";
import { getGuestId } from "../utils/guest";
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = userInfo();
  const u_id = user?.u_id;
  const guestId = getGuestId();
  const token = user?.auth_token;
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [megaMenuData, setMegaMenuData] = useState({});
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [megaMenuCache, setMegaMenuCache] = useState({});
  const [showAuthChoice, setShowAuthChoice] = useState(false);
  const desktopSearchRef = useRef(null);
  const navRef = useRef(null);
  // Slug helper function
  const createSlug = (name) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target)
      ) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const getAnnouncements = async () => {
    try {
      const res = await axiosInstance.get("/getannouncements");
      if (res?.data?.status === 1) setAnnouncements(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/getcategory");
      if (res?.data?.status === 1) setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchCategoryFilters = async (cate_id) => {
    if (!cate_id) return;
    if (megaMenuCache[cate_id]) {
      setMegaMenuData(megaMenuCache[cate_id]);
      return;
    }
    try {
      const [styleRes, subRes, fabricRes, workRes, occRes] = await Promise.all([
        axiosInstance.get(`/getstyles/${cate_id}`),
        axiosInstance.get(`/getsubcategory/${cate_id}`),
        axiosInstance.get(`/getfabrics/${cate_id}`),
        axiosInstance.get(`/getworks/${cate_id}`),
        axiosInstance.get(`/getoccasions/${cate_id}`),
      ]);
      const data = {
        Style: styleRes?.data?.data || [],
        Collection: subRes?.data?.data || [],
        Fabric: fabricRes?.data?.data || [],
        Work: workRes?.data?.data || [],
        Occasion: occRes?.data?.data || [],
      };
      setMegaMenuCache((prev) => ({ ...prev, [cate_id]: data }));
      setMegaMenuData(data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };
  useEffect(() => {
    getCategories();
    getAnnouncements();
  }, []);

  useEffect(() => {
    if (!announcements.length) return;
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPos = window.scrollY + windowHeight;
      setIsAtBottom(scrollPos >= docHeight - 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateBounds = () => {
      const nav = navRef.current;
      if (!nav) return;
      const homeLink = nav.querySelector('a[href="/"]');
      const contactLink = nav.querySelector('a[href="/contact"]');
      if (!homeLink || !contactLink) return;
      const navRect = nav.getBoundingClientRect();
      const homeRect = homeLink.getBoundingClientRect();
      const contactRect = contactLink.getBoundingClientRect();
      const startOffset = homeRect.left - navRect.left;
      const endOffset = navRect.right - contactRect.right;
      document.documentElement.style.setProperty(
        "--nav-start",
        `${startOffset}px`,
      );
      document.documentElement.style.setProperty("--nav-end", `${endOffset}px`);
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, [categories]);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileSearchOpen(false);
    }
  };
  const toggleMobileSection = (cate_id, section) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [cate_id]: prev[cate_id] === section ? null : section,
    }));
  };
  // Menu items with cate_slug
  const menuItems = [
    { to: "/", label: "Home" },
    ...categories.map((cat) => {
      const cate_slug = createSlug(cat.cate_name);
      return {
        to: `/collections/${cate_slug}`,
        label: cat.cate_name,
        cate_id: cat.cate_id,
        cate_slug,
      };
    }),
    { to: "/contact", label: "Contact Us" },
  ];
  // Label mapping for display
  const labelMap = {
    Collection: "Collections",
    Fabric: "Fabric",
    Work: "Work",
    Occasion: "Occasion",
    Style: "Styles",
  };
  // Filter type for URL segment
  const typeMap = {
    Collection: "collection",
    Fabric: "fabric",
    Work: "work",
    Occasion: "occasion",
    Style: "style",
  };

  return (
    <>
      {/* Announcement Bar */}
      {announcements.length > 0 && (
        <div className="bg-[#02382A] text-white text-xs md:text-sm py-2 text-center font-medium">
          <div className="transition-opacity duration-500">
            <span key={announcements[currentAnnouncement]?.ann_id}>
              {announcements[currentAnnouncement]?.text}
            </span>
          </div>
        </div>
      )}
      <nav ref={navRef} className="sticky bg-[#f3f0ed] shadow-md top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Glamgait – Go to homepage">
            <img src={logo} alt="Glamgait" className="h-9 md:h-10 w-auto" />
          </Link>
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 mr-6">
            {menuItems.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => {
                  if (item.cate_id) {
                    setHoveredCategory(item);
                    if (megaMenuCache[item.cate_id]) {
                      setMegaMenuData(megaMenuCache[item.cate_id]);
                      setShowMegaMenu(true);
                    } else {
                      fetchCategoryFilters(item.cate_id);
                      setShowMegaMenu(true);
                    }
                  }
                }}
              >
                <Link
                  to={item.to}
                  className={`text-[16px] font-medium transition-colors ${
                    location.pathname.startsWith("/collections") &&
                    item.cate_slug
                      ? location.pathname.includes(item.cate_slug)
                        ? "text-black font-bold"
                        : "text-[#767676] hover:text-black"
                      : location.pathname === item.to
                        ? "text-black font-bold"
                        : "text-[#767676] hover:text-black"
                  }`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <button
              aria-label="Open search"
              aria-expanded={isMobileSearchOpen}
              className="cursor-pointer hover:text-black p-1 bg-transparent border-0"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search size={22} />
            </button>
            <Link to="/wishlist" aria-label="Go to wishlist">
              <Heart className="hover:text-black" />
            </Link>
            <Link to="/cart" aria-label="Go to cart">
              <ShoppingCart className="hover:text-black" />
            </Link>
            <button
              aria-label={
                u_id && token ? "Go to my orders" : "Sign in or register"
              }
              className="cursor-pointer hover:text-black p-1 bg-transparent border-0"
              onClick={() => {
                if (u_id && token) {
                  navigate("/myorders");
                } else {
                  setShowAuthChoice(true);
                }
              }}
            >
              <CircleUser size={22} />
            </button>

            {showAuthChoice && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                  <h3 className="text-lg font-medium mb-4">Welcome!</h3>
                  <p className="text-gray-600 mb-6">
                    You can continue shopping as a guest or sign in for better
                    experience
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setShowAuthChoice(false);
                        navigate("/login");
                      }}
                      className="w-full bg-black text-white py-3 rounded-md"
                    >
                      Login / Register
                    </button>

                    <button
                      onClick={() => {
                        setShowAuthChoice(false);
                        navigate("/myorders");
                      }}
                      className="w-full bg-gray-100 text-gray-800 py-3 rounded-md"
                    >
                      Continue as Guest
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              className="lg:hidden p-1"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <TextAlignEnd size={24} />}
            </button>
          </div>
        </div>
        {/* Mega Menu – Desktop */}
        {showMegaMenu && hoveredCategory?.cate_id && (
          <div
            className="max-w-5xl mx-auto absolute inset-x-0 top-full bg-[#f3f0ed] shadow-xl border-t"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => {
              setShowMegaMenu(false);
              setHoveredCategory(null);
            }}
          >
            <div className="px-4 py-8">
              <div className="flex justify-evenly gap-12">
                {Object.keys(megaMenuData).map((key) => {
                  const items = megaMenuData[key];
                  if (!items || items.length === 0) return null;
                  const label = labelMap[key] || key;
                  return (
                    <div key={key}>
                      <h3 className="font-bold text-[16px] uppercase tracking-widest text-gray-900 mb-4">
                        {label}
                      </h3>
                      <ul className="space-y-2">
                        {items.map((item, i) => {
                          const itemSlug = createSlug(item.name);
                          const linkTo = `/collections/${hoveredCategory.cate_slug}/${itemSlug}`;
                          return (
                            <li key={i}>
                              <Link
                                to={linkTo}
                                className="block text-sm text-gray-600 hover:text-black transition"
                                onClick={() => setShowMegaMenu(false)}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Mobile Search & Drawer */}
      {isMobileSearchOpen && (
        <div
          className={`fixed ${
            isAtBottom ? "bottom-0" : ""
          } w-full bg-white shadow-md px-4 py-3 flex items-center justify-center z-60`}
          ref={desktopSearchRef}
        >
          <form
            onSubmit={handleSearch}
            className="flex w-full max-w-xl items-center"
          >
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
      )}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-[#f3f0ed] shadow-2xl z-50 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>
            <div className="p-6 pt-16 space-y-1 overflow-y-auto h-full">
              {menuItems.map((item) => (
                <div
                  key={item.to}
                  className="border-b border-gray-200 last:border-0"
                >
                  {item.cate_id ? (
                    <>
                      <button
                        onClick={() => {
                          if (mobileExpanded[item.cate_id]) {
                            setMobileExpanded((prev) => ({
                              ...prev,
                              [item.cate_id]: null,
                            }));
                          } else {
                            setMobileExpanded((prev) => ({
                              ...prev,
                              [item.cate_id]: "all",
                            }));
                            fetchCategoryFilters(item.cate_id);
                          }
                        }}
                        className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900"
                      >
                        {item.label}
                        {mobileExpanded[item.cate_id] ? (
                          <Minus size={18} />
                        ) : (
                          <Plus size={18} />
                        )}
                      </button>
                      {mobileExpanded[item.cate_id] && (
                        <div className="pb-4 space-y-4">
                          <Link
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className="block pl-4 text-sm font-bold text-gray-700"
                          >
                            All {item.label}
                          </Link>
                          {Object.keys(megaMenuData).map((key) => {
                            const data = megaMenuData[key];
                            if (!data?.length) return null;
                            const label = labelMap[key] || key;
                            return (
                              <div key={key}>
                                <button
                                  onClick={() =>
                                    toggleMobileSection(item.cate_id, key)
                                  }
                                  className="w-full flex justify-between items-center py-2 pl-4 text-sm font-medium text-gray-700"
                                >
                                  {label}
                                  {mobileExpanded[item.cate_id] === key ? (
                                    <Minus size={16} />
                                  ) : (
                                    <Plus size={16} />
                                  )}
                                </button>
                                {mobileExpanded[item.cate_id] === key && (
                                  <ul className="pl-8 space-y-1">
                                    {data.map((it, i) => {
                                      const itemSlug = createSlug(it.name);
                                      const linkTo = `/collections/${item.cate_slug}/${itemSlug}`;
                                      return (
                                        <li key={i}>
                                          <Link
                                            to={linkTo}
                                            onClick={() => setIsOpen(false)}
                                            className="block text-sm text-gray-600 hover:text-black"
                                          >
                                            {it.name}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="block py-4 font-medium text-gray-900"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Navbar;
