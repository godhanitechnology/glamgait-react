// import React from "react";
// import fb1 from "../assets/fb1.svg";
// import apple from "../assets/apple.svg";
// import google from "../assets/google.svg";
// import rightlight from "../assets/rightlight.png";
// import waves from "../assets/waves.png";
// import loginmain from "../assets/loginmain.jpg";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   return (
//     <div className="relative flex flex-col md:flex-row h-[calc(100vh-80px)] bg-white font-inter overflow-hidden mt-[-20px] sm:px-20">
//       {/* ✅ Decorative Lamp (Right side on mobile, centered on desktop) */}
//       <img
//         src={rightlight}
//         alt="Decorative Lamp"
//         className="
//     absolute
//     top-[5%] right-[0%]
//     md:top-[23%] md:right-[50%]
//     transform md:-translate-y-1/2 md:translate-x-1/2
//     w-28 sm:w-32 md:w-40
//     sm:opacity-100
//     opacity-60
//     pointer-events-none
//     transition-all duration-500
//     z-20 md:z-0
//   "
//       />
//       <img
//         src={waves}
//         alt="Top Right Decoration"
//         className="
//     absolute
//     top-0
//     right-0
//     object-contain
//     opacity-90
//     pointer-events-none
//     z-30
//   "
//       />

//       {/* Left Side Image */}
//       <div className="hidden lg:flex w-1/2 h-full">
//         <img
//           src={loginmain}
//           alt="Login main"
//           className="w-full h-[80vh] object-contain self-center"
//         />
//       </div>

//       {/* Right Side Form */}
//       <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-2 sm:px-4 md:px-6 lg:px-10 h-full my-10 relative z-10">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center font-serif">
//           Create Account
//         </h2>

//         {/* Input Fields */}
//         <div className="w-full max-w-md space-y-2">
//           <input
//             type="text"
//             placeholder="First Name"
//             className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
//           />

//           {/* ✅ Create Account Button */}
//           <button className="w-full bg-black text-white py-3 rounded-md mt-4 hover:bg-gray-900 transition duration-300">
//             Create Account
//           </button>

//           {/* Already Have Account */}
//           <div className="flex justify-center gap-1 mt-2 text-sm text-gray-600">
//             <p>Already Have An Account?</p>
//             <button
//               onClick={() => navigate("/login")}
//               className="text-black font-medium hover:underline"
//             >
//               Log In
//             </button>
//           </div>

//           {/* OR Divider */}
//           <div className="flex items-center justify-center mt-3">
//             <span className="text-gray-400 text-sm">Or</span>
//           </div>

//           {/* Social Login */}
//           <div className="flex justify-center gap-6 mt-2">
//             <img
//               src={apple}
//               alt="Apple"
//               className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
//             />
//             <img
//               src={google}
//               alt="Google"
//               className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
//             />
//             <img
//               src={fb1}
//               alt="Facebook"
//               className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
//             />
//           </div>

//           {/* Terms and Conditions */}
//           <p className="text-center text-xs text-gray-500 mt-4">
//             By Clicking Register Now you Agree to Terms & Conditions and
//             Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// src/pages/Register.jsx
import React, { useState } from "react";
import loginmain from "../assets/loginmain.jpg"; // adjust if path differs
import fb1 from "../assets/fb1.svg";
import apple from "../assets/apple.svg";
import google from "../assets/google.svg";
import rightlight from "../assets/rightlight.png";
import leftlight from "../assets/leftlight.png";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <img
        src={rightlight}
        alt="Decorative Lamp"
        className="
    absolute hidden md:block top-0 md:left-15 lg:left-120 xl:left-190 2xl:left-260 w-40 lg:w-38 2xl:w-50"
      />
      <img
        src={leftlight}
        alt="Top Right Decoration"
        className="absolute hidden md:block top-18 right-0 lg:w-20 xl:w-25 z-30 "
      />

      {/* Left - Image */}
      <div className="hidden lg:flex w-1/2">
        <img
          src={loginmain}
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full">
          {/* Top Icon & Title */}
          <div className="flex flex-col items-center mb-6">
            {/* <img
              src="https://cdn-icons-png.flaticon.com/512/3468/3468379.png"
              alt="Lamp Icon"
              className="w-10 h-10 mb-2"
            /> */}
            <h2 className="text-2xl font-bold">Create Account</h2>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-3 bg-[#F3F0ED] rounded-md  focus:outline-none focus:border-[#063d32]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-3 rounded-md bg-[#F3F0ED] focus:outline-none focus:border-[#063d32]"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md bg-[#F3F0ED] focus:outline-none focus:border-[#063d32]"
            />

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md bg-[#F3F0ED] focus:outline-none focus:border-[#063d32] cursor-pointer"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#02382A] text-white py-3 rounded-md hover:bg-[#ffffff] border border-[#02382A] hover:text-[#02382A] transition"
            >
              Register
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm mt-4">
            Already Have An Account?{" "}
            <a
              href="/login"
              className="text-[#063d32] font-medium hover:underline"
            >
              Log In
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-sm text-gray-500">Or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition">
              <img
                src={apple}
                alt="Apple"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
              />{" "}
            </button>
            <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition">
              <img
                src={google}
                alt="Google"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
              />
            </button>
            <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition">
              <img
                src={fb1}
                alt="Facebook"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
              />{" "}
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking Register Now you agree to Terms & Conditions and Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
