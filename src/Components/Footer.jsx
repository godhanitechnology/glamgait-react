// import React from "react";
// import leftlonglight from "../assets/leftlonglight.png";
// import footerbg from "../assets/footerbg.jpg";
// import footer1 from "../assets/footer1.jpg";
// import logo from "../assets/logo.svg";
// import fb from "../assets/fb.svg";
// import ig from "../assets/ig.svg";
// import yt from "../assets/yt.svg";



// const Footer = () => {
//   return (
//     <footer className="relative w-full font-inter text-[#1c1c1c] lg:h-[900px] overflow-hidden">
//       {/* Background Image Covering Entire Footer at Bottom */}

//       {/* Decorative Lamps */}
//       <img
//         src={leftlonglight}
//         alt="Decor"
//         className="hidden lg:block absolute lg:-left-10 lg:top-10 lg:w-20 xl:left-10 xl:top-0 xl:w-25 2xl:left-60 z-10 pointer-events-none"
//       />
//       <img
//         src={leftlonglight}
//         alt="Decor"
//         className="hidden lg:block absolute lg:left-53 lg:w-10 xl:left-93 xl:w-9 2xl:left-150 z-10 pointer-events-none"
//       />
//       <img
//         src={leftlonglight}
//         alt="Decor"
//         className="hidden lg:block absolute lg:left-63 lg:w-8 xl:left-101 xl:w-7 2xl:left-158 z-10 pointer-events-none"
//       />
//       <img
//         src={leftlonglight}
//         alt="Decor"
//         className="hidden lg:block absolute lg:-right-5 lg:w-18 xl:right-35 xl:w-20 2xl:right-90 z-10 pointer-events-none"
//       />

//       {/* Footer Content Layered Above Background */}
//       <div className="relative py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 z-10">
//         {/* Background Image Behind Content */}
//         <div className="absolute inset-0 -z-10 lg:hidden">
//           <img
//             src={footer1}
//             alt="Footer Background"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Brand Section */}
//         <div className="flex flex-col justify-between">
//           <div>
//             <img src={logo} alt="" />{" "}
//             <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-4 max-w-xs">
//               We’re always seeking out new ways to improve our sustainability
//               efforts and eco-friendly production processes.
//             </p>
//           </div>
//           <div className="flex space-x-2">
//             {/* Social icons can be added here */}
//             <img src={fb} alt="" />
//             <img src={ig} alt="" />
//             <img src={yt} alt="" />
//           </div>
//         </div>

//         {/* Home Section */}
//         <div>
//           <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
//             Home
//           </h3>
//           <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
//             <li className="hover:underline cursor-pointer">About Us</li>
//             <li className="hover:underline cursor-pointer">Blogs</li>
//             <li className="hover:underline cursor-pointer">
//               Terms & Conditions
//             </li>
//             <li className="hover:underline cursor-pointer">Privacy Policy</li>
//             <li className="hover:underline cursor-pointer">
//               Shipping & Returns
//             </li>
//           </ul>
//         </div>

//         {/* Categories Section */}
//         <div>
//           <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
//             Categories
//           </h3>
//           <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
//             <li className="hover:underline cursor-pointer">Women's Sarees</li>
//             <li className="hover:underline cursor-pointer">Women's Lehengas</li>
//             <li className="hover:underline cursor-pointer">
//               Women's Salwar Kameez
//             </li>
//             <li className="hover:underline cursor-pointer">Women's Kurtis</li>
//           </ul>
//         </div>

//         {/* Contact Section */}
//         <div>
//           <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
//             Contact Us
//           </h3>
//           <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
//             <li>
//               123 Fashion St., Suite 456
//               <br />
//               City, State, ZIP Code
//             </li>
//             <li>
//               <a href="tel:+1234567890" className="hover:underline">
//                 +1 (123) 456-7890
//               </a>
//             </li>
//             <li>
//               <a href="mailto:support@fancy.com" className="hover:underline">
//                 support@fancy.com
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Copyright */}
//       <div className="relative z-20 text-center text-xs sm:text-sm lg:text-base text-black font-medium bg-[#F1E8D7] lg:bg-transparent">
//         © 2024 Fancy. All rights reserved.
//       </div>
//       <div className="lg:absolute inset-x-0 bottom-0 z-0 h-full">
//         <img
//           src={footerbg}
//           alt="Footer Background"
//           className="w-full h-full lg:object-cover object-contain"
//         />
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { Link } from "react-router-dom";
import leftlonglight from "../assets/leftlonglight.png";
import footerbg from "../assets/footerbg.jpg";
import footer1 from "../assets/footer1.jpg";
import logo from "../assets/logo.svg";
import fb from "../assets/fb.svg";
import ig from "../assets/ig.svg";
import yt from "../assets/yt.svg";

const Footer = () => {
  return (
    <footer className="relative w-full font-inter text-[#1c1c1c] lg:h-[900px] overflow-hidden">
      {/* Decorative Lamps */}
      <img
        src={leftlonglight}
        alt="Decor"
        className="absolute -right-1 lg:-left-10 lg:top-10 lg:w-20 xl:left-10 xl:top-0 xl:w-25 2xl:left-60 z-11 pointer-events-none"
      />
      <img
        src={leftlonglight}
        alt="Decor"
        className="hidden lg:block absolute lg:left-105 lg:w-10 xl:left-150 xl:w-9 2xl:left-210 z-10 pointer-events-none"
      />
      <img
        src={leftlonglight}
        alt="Decor"
        className="hidden lg:block absolute lg:left-115 lg:w-8 xl:left-160 xl:w-7 2xl:left-220 z-10 pointer-events-none"
      />
      <img
        src={leftlonglight}
        alt="Decor"
        className="hidden lg:block absolute lg:-right-5 lg:w-18 xl:right-35 xl:w-20 2xl:right-90 z-10 pointer-events-none"
      />

      {/* Footer Content */}
      <div className="relative py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 z-10">
        {/* Background Behind Content */}
        <div className="absolute inset-0 -z-10 lg:hidden">
          <img
            src={footer1}
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Brand Section */}
        <div className="flex flex-col justify-between">
          <div>
            <Link to="/">
            <img src={logo} alt="Logo" />
            </Link>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed mb-4 max-w-xs">
              We’re always seeking out new ways to improve our sustainability
              efforts and eco-friendly production processes.
            </p>
          </div>
          <div className="flex space-x-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" className="h-7 w-7"/>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ig} alt="Instagram" className="h-7 w-7"/>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={yt} alt="YouTube" className="h-7 w-7"/>
            </a>
          </div>
        </div>

        {/* Home Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Home
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:underline">
                Shipping & Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
            <li>
              <Link to="/shop" className="hover:underline">
                Women's Sarees
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline">
                Women's Lehengas
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline">
                Women's Salwar Kameez
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:underline">
                Women's Kurtis
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
            <li>
              123 Fashion St., Suite 456
              <br />
              City, State, ZIP Code
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:underline">
                +1 (123) 456-7890
              </a>
            </li>
            <li>
              <a href="mailto:support@fancy.com" className="hover:underline">
                support@fancy.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-20 text-center text-xs sm:text-sm lg:text-base text-black font-medium bg-[#F1E8D7] lg:bg-transparent">
        © 2024 Fancy. All rights reserved.
      </div>

      <div className="lg:absolute inset-x-0 bottom-0 z-0 h-full">
        <img
          src={footerbg}
          alt="Footer Background"
          className="w-full h-full lg:object-cover object-contain"
        />
      </div>
    </footer>
  );
};

export default Footer;
