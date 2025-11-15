// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   TextAlignEnd,
//   X,
//   CircleUser,
// } from "lucide-react";
// import logo from "../assets/logo.svg";
// import axiosInstance from "../Axios/axios";
// import { userInfo } from "../Variable";

// const Navbar = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAtBottom, setIsAtBottom] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
//   const [announcements, setAnnouncements] = useState([]);
//   const user = userInfo();
//   const u_id = user?.u_id;
//   const token = user?.auth_token;
//   const searchParams = new URLSearchParams(location.search);
//   const currentCateId = searchParams.get("cate_id");
//   const navigate = useNavigate();
//   const toggleMenu = () => setIsOpen(!isOpen);

//   // Auto-change announcements every 4 seconds
//   useEffect(() => {
//     if (announcements.length === 0) return; //avoid error when empty
//     const interval = setInterval(() => {
//       setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [announcements]);

//   // Handle scroll detection
//   useEffect(() => {
//     const handleScroll = () => {
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;
//       const scrollPosition = window.scrollY + windowHeight;
//       setIsAtBottom(scrollPosition >= documentHeight - 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//       setIsMobileSearchOpen(false);
//     }
//   };
//   const getAnnouncements = async () => {
//     try {
//       const response = await axiosInstance.get("/getannouncements");
//       if (response?.data?.status === 1) {
//         setAnnouncements(response?.data?.data);
//       } else {
//         setAnnouncements([]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getCategories = async () => {
//     try {
//       const response = await axiosInstance.get("/getcategory");
//       if (response?.data?.status === 1) {
//         setCategories(response?.data?.data);
//       } else {
//         setCategories([]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//     getAnnouncements();
//   }, []);

//   const menuItems = [
//     { to: "/", label: "Home" },
//     ...categories.map((cat) => ({
//       to: `/shop?cate_id=${cat.cate_id}&category=${encodeURIComponent(
//         cat.cate_name
//       )}`,
//       label: cat.cate_name,
//       cate_id: cat.cate_id,
//     })),
//     { to: "/contact", label: "Contact Us" },
//   ];

//   return (
//     <>
//       {/* Announcement Bar */}
//       {announcements.length > 0 && (
//         <div className="w-full bg-[#02382A] text-white text-sm py-2 text-center font-medium tracking-wide overflow-hidden">
//           <div className="transition-all duration-500 ease-in-out">
//             <span
//               key={announcements[currentAnnouncement]?.ann_id}
//               className="block animate-fade"
//             >
//               {announcements[currentAnnouncement]?.text}{" "}
//               <Link to="/shop" className="underline">
//                 Shop Now
//               </Link>
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Main Navbar */}
//       <nav className="sticky top-0 z-60">
//         <div className="bg-[#F3F0ED] shadow-md">
//           <div className="max-w-7xl mx-auto w-full px-4 py-4 flex justify-between items-center">
//             {/* Logo */}
//             <Link to="/" className="text-xl font-bold text-black">
//               <img src={logo} alt="GlamGait Logo" className="h-10 w-auto" />
//             </Link>

//             {/* Desktop Menu */}
//             <div className="hidden lg:flex space-x-6 mr-6">
//               {menuItems?.map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   className={
//                     item.cate_id
//                       ? item.cate_id.toString() === currentCateId
//                         ? "text-black font-medium"
//                         : "text-[#767676] hover:text-black"
//                       : location.pathname === item.to
//                       ? "text-black font-medium"
//                       : "text-[#767676] hover:text-black"
//                   }
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Icons + Hamburger */}
//             <div className="flex items-center">
//               <div className="flex space-x-4 text-gray-600">
//                 <Search
//                   className="cursor-pointer hover:text-black"
//                   onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
//                 />
//                 <Link
//                   to="/wishlist"
//                   className="cursor-pointer hover:text-black"
//                 >
//                   <Heart className="hover:text-black" />
//                 </Link>
//                 <Link to="/cart" className="cursor-pointer hover:text-black">
//                   <ShoppingCart className="hover:text-black" />
//                 </Link>
//                 <CircleUser
//                   className="cursor-pointer hover:text-black"
//                   onClick={() => {
//                     if (u_id && token) {
//                       navigate("/myorders");
//                     } else {
//                       navigate("/login");
//                     }
//                   }}
//                 />
//               </div>

//               {/* Mobile Hamburger */}
//               <button
//                 className="lg:hidden ml-4 text-gray-600 hover:text-black"
//                 onClick={toggleMenu}
//               >
//                 {isOpen ? <X size={24} /> : <TextAlignEnd size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Search Bar */}
// {isMobileSearchOpen && (
//   <div
//     className={`fixed ${
//       isAtBottom ? "bottom-0" : ""
//     } w-full bg-white shadow-md px-4 py-3 flex items-center justify-center z-60`}
//   >
//     <form
//       onSubmit={handleSearch}
//       className="flex w-full max-w-xl items-center"
//     >
//       <div className="relative w-full">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full flex-1 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none"
//           placeholder="Search..."
//         />
//       </div>
//     </form>
//   </div>
// )}

//       {/* 📱 Mobile Menu */}
//       {isOpen && (
//         <div
//           className={`lg:hidden fixed ${
//             isAtBottom ? "bottom-0" : "top-[72px]"
//           } left-0 w-full bg-[#F3F0ED] z-50 shadow-md px-4 py-4 transition-all duration-300 ease-in-out`}
//         >
//           <div className="flex flex-col space-y-4">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.to}
//                 to={item.to}
//                 className={
//                   item.cate_id
//                     ? item.cate_id.toString() === currentCateId
//                       ? "text-black font-medium"
//                       : "text-[#767676] hover:text-black"
//                     : location.pathname === item.to
//                     ? "text-black font-medium"
//                     : "text-[#767676] hover:text-black"
//                 }
//                 onClick={toggleMenu}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
// export default Navbar;

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

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = userInfo();
  const u_id = user?.u_id;
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

  const searchParams = new URLSearchParams(location.search);
  const currentCateId = searchParams.get("cate_id");
  const navRef = useRef(null);

  // Fetch Data
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
    try {
      const [subRes, fabricRes, workRes, occRes, styleRes] = await Promise.all([
        axiosInstance.get(`/getsubcategory/${cate_id}`),
        axiosInstance.get(`/getfabrics/${cate_id}`),
        axiosInstance.get(`/getworks/${cate_id}`),
        axiosInstance.get(`/getoccasions/${cate_id}`),
        axiosInstance.get(`/getstyles/${cate_id}`),
      ]);

      setMegaMenuData({
        Collection: subRes?.data?.data || [],
        Fabric: fabricRes?.data?.data || [],
        Work: workRes?.data?.data || [],
        Occasion: occRes?.data?.data || [],
        Style: styleRes?.data?.data || [],
      });
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getAnnouncements();
  }, []);

  // Auto-scroll announcements
  useEffect(() => {
    if (!announcements.length) return;
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [announcements]);

  // Scroll detection
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

  // Update menu bounds
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
        `${startOffset}px`
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
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  const toggleMobileSection = (cate_id, section) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [cate_id]: prev[cate_id] === section ? null : section,
    }));
  };

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
      {/* Announcement Bar */}
      {announcements.length > 0 && (
        <div className="bg-[#02382A] text-white text-xs md:text-sm py-2 text-center font-medium">
          <div className="transition-opacity duration-500">
            <span key={announcements[currentAnnouncement]?.ann_id}>
              {announcements[currentAnnouncement]?.text}{" "}
              <Link to="/shop" className="underline hover:no-underline">
                Shop Now
              </Link>
            </span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav ref={navRef} className="sticky bg-[#f3f0ed] shadow-md top-0 z-50 ">
        <div className="max-w-7xl mx-auto px-4 py-3   flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-black">
            <img src={logo} alt="Logo" className="h-9 md:h-10 w-auto" />
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
                    fetchCategoryFilters(item.cate_id);
                    setShowMegaMenu(true);
                  }
                }}
              >
                <Link
                  to={item.to}
                  className={`text-[16px] font-medium transition-colors ${
                    item.cate_id
                      ? item.cate_id.toString() === currentCateId
                        ? "text-black font-medium"
                        : "text-[#767676] hover:text-black"
                      : location.pathname === item.to
                      ? "text-black font-medium"
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
            <Search
              className="cursor-pointer hover:text-black"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            />
            <Link to="/wishlist" className="cursor-pointer hover:text-black">
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
            <button className="lg:hidden" onClick={toggleMenu}>
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
            <div className="px-4 py-8 ">
              <div className="flex justify-evenly">
                {/* Dynamic Columns */}
                {megaMenuData.Collection?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[16px] uppercase tracking-widest text-gray-900 mb-4">
                      Collections
                    </h3>
                    <ul className="space-y-2">
                      {megaMenuData.Collection.map((it, i) => (
                        <li key={i}>
                          <Link
                            to={`/shop?cate_id=${
                              hoveredCategory.cate_id
                            }&collection=${encodeURIComponent(it.name)}`}
                            className="block text-sm text-gray-600 hover:text-black transition"
                            onClick={() => setShowMegaMenu(false)} // ADD THIS
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {megaMenuData.Fabric?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[16px] uppercase tracking-widest text-gray-900 mb-4">
                      Fabric
                    </h3>
                    <ul className="space-y-2">
                      {megaMenuData.Fabric.map((it, i) => (
                        <li key={i}>
                          <Link
                            to={`/shop?cate_id=${
                              hoveredCategory.cate_id
                            }&fabric=${encodeURIComponent(it.name)}`}
                            className="block text-sm text-gray-600 hover:text-black transition"
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {megaMenuData.Occasion?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[16px] uppercase tracking-widest text-gray-900 mb-4">
                      Occasion
                    </h3>
                    <ul className="space-y-2">
                      {megaMenuData.Occasion.map((it, i) => (
                        <li key={i}>
                          <Link
                            to={`/shop?cate_id=${
                              hoveredCategory.cate_id
                            }&occasion=${encodeURIComponent(it.name)}`}
                            className="block text-sm text-gray-600 hover:text-black transition"
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {megaMenuData.Work?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[16px] uppercase tracking-widest text-gray-900 mb-4">
                      Work
                    </h3>
                    <ul className="space-y-2">
                      {megaMenuData.Work.map((it, i) => (
                        <li key={i}>
                          <Link
                            to={`/shop?cate_id=${
                              hoveredCategory.cate_id
                            }&work=${encodeURIComponent(it.name)}`}
                            className="block text-sm text-gray-600 hover:text-black transition"
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {megaMenuData.Style?.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[16px] uppercase tracking-widest text-gray-900 mb-4">
                      Styles
                    </h3>
                    <ul className="space-y-2">
                      {megaMenuData.Style.map((it, i) => (
                        <li key={i}>
                          <Link
                            to={`/shop?cate_id=${
                              hoveredCategory.cate_id
                            }&style=${encodeURIComponent(it.name)}`}
                            className="block text-sm text-gray-600 hover:text-black transition"
                          >
                            {it.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Search */}
      {isMobileSearchOpen && (
        <div
          className={`fixed ${
            isAtBottom ? "bottom-0" : ""
          } w-full bg-white shadow-md px-4 py-3 flex items-center justify-center z-60`}
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
                className="w-full flex-1 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none"
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

          {/* Drawer */}
          <div
            className={`
        fixed top-0 right-0 h-full w-80 bg-[#f3f0ed] shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 " : "translate-x-full"}
      `}
          >
            {/* Close button (top-right) */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>

            {/* Scrollable content */}
            <div className="p-6 pt-16 space-y-1 overflow-y-auto h-full">
              {menuItems?.map((item) => (
                <div
                  key={item.to}
                  className="border-b border-gray-200 last:border-0"
                >
                  {/* ---------- CATEGORY (with sub-sections) ---------- */}
                  {item.cate_id ? (
                    <>
                      {/* Category header – expand/collapse */}
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

                      {/* Expanded content */}
                      {mobileExpanded[item.cate_id] && (
                        <div className="pb-4 space-y-4">
                          {/* All X */}
                          <Link
                            to={item.to}
                            onClick={() => setIsOpen(false)}
                            className="block pl-4 text-sm font-bold text-gray-700"
                          >
                            All {item.label}
                          </Link>

                          {/* Dynamic sections */}
                          {[
                            { key: "Collection", label: "Collection" },
                            { key: "Fabric", label: "Fabric" },
                            { key: "Occasion", label: "Occasion" },
                            { key: "Work", label: "Work" },
                            { key: "Style", label: "Style" },
                          ].map(({ key, label }) => {
                            const data = megaMenuData[key];
                            if (!data?.length) return null;

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
                                    {data.map((it, i) => (
                                      <li key={i}>
                                        <Link
                                          to={`/shop?cate_id=${item.cate_id}&${
                                            key === "Collection"
                                              ? "collection"
                                              : key.toLowerCase()
                                          }=${encodeURIComponent(it.name)}`}
                                          onClick={() => setIsOpen(false)}
                                          className="block text-sm text-gray-600 hover:text-black"
                                        >
                                          {it.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    /* ---------- SIMPLE LINK (Home / Contact) ---------- */
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
