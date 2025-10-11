// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   TextAlignEnd,
//   X,
//   CircleUser,
// } from "lucide-react";
// import logo from "../assets/logo.svg";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { to: "/", label: "Home" },
//     { to: "/shop", label: "Sarees" },
//     { to: "/lehengas", label: "Lehengas" },
//     { to: "/salwar-kameez", label: "Salwar Kameez" },
//     { to: "/kurtis", label: "Kurtis" },
//     { to: "/kids-wear", label: "Kids Wear" },
//     { to: "/contact-us", label: "Contact Us" },
//   ];

//   return (
//     <>
//       {/* Sticky full-width navbar */}
//       <nav className="sticky top-0 z-50 ">

//           <div className="bg-[#F3F0ED] shadow-md">

//         <div className="max-w-7xl mx-auto w-full px-4 py-4 flex justify-between items-center">
//           {/* Logo */}
//           <Link to="/" className="text-xl font-bold text-black">
//             <img src={logo} alt="GlamGait Logo" className="h-10 w-auto" />
//           </Link>

//           {/* Desktop menu */}
//           <div className="hidden lg:flex space-x-6 mr-6">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-black font-medium"
//                     : "text-[#767676] hover:text-black"
//                 }
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* Icons & Hamburger */}
//           <div className="flex items-center">
//             <div className="flex space-x-4 text-gray-600">
//               <Search className="cursor-pointer hover:text-black" />
//               <Link to="/wishlist" className="cursor-pointer hover:text-black">
//                 <Heart className="hover:text-black" />
//               </Link>
//               <Link to="/cart" className="cursor-pointer hover:text-black">
//                 <ShoppingCart className="hover:text-black" />
//               </Link>
//               <Link to="/register" className="cursor-pointer hover:text-black">
//                 <CircleUser className="hover:text-black" />
//               </Link>
//             </div>

//             {/* Mobile hamburger */}
//             <button
//               className="lg:hidden ml-4 text-gray-600 hover:text-black"
//               onClick={toggleMenu}
//             >
//               {isOpen ? <X size={24} /> : <TextAlignEnd size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>
//       </nav>

//       {/* 🔥 Mobile dropdown menu as absolute overlay */}
//       {isOpen && (
//         <div className="lg:hidden absolute top-[72px] left-0 w-full bg-[#F3F0ED] z-40 rounded-2xl shadow-md px-4 py-4 transition-all duration-300 ease-in-out">
//           <div className="flex flex-col space-y-4">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-black font-medium"
//                     : "text-[#767676] hover:text-black"
//                 }
//                 onClick={toggleMenu}
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react"; // Added useEffect
// import { Link, NavLink } from "react-router-dom";
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   TextAlignEnd,
//   X,
//   CircleUser,
// } from "lucide-react";
// import logo from "../assets/logo.svg";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isAtBottom, setIsAtBottom] = useState(false); // Track if scrolled to bottom

//   const toggleMenu = () => setIsOpen(!isOpen);

//   // Detect scroll position to adjust menu placement
//   useEffect(() => {
//     const handleScroll = () => {
//       const windowHeight = window.innerHeight;
//       const documentHeight = document.documentElement.scrollHeight;
//       const scrollPosition = window.scrollY + windowHeight;
//       // Check if user is near the bottom (within 10px)
//       setIsAtBottom(scrollPosition >= documentHeight - 10);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const menuItems = [
//     { to: "/", label: "Home" },
//     { to: "/shop", label: "Sarees" },
//     { to: "/lehengas", label: "Lehengas" },
//     { to: "/salwar-kameez", label: "Salwar Kameez" },
//     { to: "/kurtis", label: "Kurtis" },
//     { to: "/kids-wear", label: "Kids Wear" },
//     { to: "/contact-us", label: "Contact Us" },
//   ];

//   return (
//     <>
//       {/* Sticky full-width navbar */}
//       <nav className="sticky top-0 z-50">
//         <div className="bg-[#F3F0ED] shadow-md">
//           <div className="max-w-7xl mx-auto w-full px-4 py-4 flex justify-between items-center">
//             {/* Logo */}
//             <Link to="/" className="text-xl font-bold text-black">
//               <img src={logo} alt="GlamGait Logo" className="h-10 w-auto" />
//             </Link>

//             {/* Desktop menu */}
//             <div className="hidden lg:flex space-x-6 mr-6">
//               {menuItems.map((item) => (
//                 <NavLink
//                   key={item.to}
//                   to={item.to}
//                   className={({ isActive }) =>
//                     isActive
//                       ? "text-black font-medium"
//                       : "text-[#767676] hover:text-black"
//                   }
//                 >
//                   {item.label}
//                 </NavLink>
//               ))}
//             </div>

//             {/* Icons & Hamburger */}
//             <div className="flex items-center">
//               <div className="flex space-x-4 text-gray-600">
//                 <Search className="cursor-pointer hover:text-black" />
//                 <Link to="/wishlist" className="cursor-pointer hover:text-black">
//                   <Heart className="hover:text-black" />
//                 </Link>
//                 <Link to="/cart" className="cursor-pointer hover:text-black">
//                   <ShoppingCart className="hover:text-black" />
//                 </Link>
//                 <Link to="/register" className="cursor-pointer hover:text-black">
//                   <CircleUser className="hover:text-black" />
//                 </Link>
//               </div>

//               {/* Mobile hamburger */}
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

//       {/* 🔥 Mobile dropdown menu as fixed overlay */}
//       {isOpen && (
//         <div
//           className={`lg:hidden fixed ${
//             isAtBottom ? "bottom-0" : "top-[72px]"
//           } left-0 w-full bg-[#F3F0ED] z-50 shadow-md px-4 py-4 transition-all duration-300 ease-in-out`}
//         >
//           <div className="flex flex-col space-y-4">
//             {menuItems.map((item) => (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-black font-medium"
//                     : "text-[#767676] hover:text-black"
//                 }
//                 onClick={toggleMenu}
//               >
//                 {item.label}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingCart,
  TextAlignEnd,
  X,
  CircleUser,
} from "lucide-react";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Sarees" },
    { to: "/lehengas", label: "Lehengas" },
    { to: "/salwar-kameez", label: "Salwar Kameez" },
    { to: "/kurtis", label: "Kurtis" },
    { to: "/kids-wear", label: "Kids Wear" },
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
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-medium"
                      : "text-[#767676] hover:text-black"
                  }
                >
                  {item.label}
                </NavLink>
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
                <Link
                  to="/register"
                  className="cursor-pointer hover:text-black"
                >
                  <CircleUser className="hover:text-black" />
                </Link>
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
                className="w-full flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300"
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
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-medium"
                    : "text-[#767676] hover:text-black"
                }
                onClick={toggleMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
