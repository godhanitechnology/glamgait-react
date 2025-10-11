import React, { useState } from "react";
import fb1 from "../assets/fb1.svg";
import apple from "../assets/apple.svg";
import google from "../assets/google.svg";
import rightlight from "../assets/rightlight.png";
import leftlight from "../assets/leftlight.png";

import loginmain from "../assets/loginmain.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
  
  return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* ✅ Decorative Lamp (Right side on mobile, centered on desktop) */}
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

      {/* Left Side Image */}
      <div className="hidden lg:block md:flex w-1/2 h-full">
        <img
          src={loginmain}
          alt="Login main"
          className="w-full h-[80vh] object-contain self-center"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-4 sm:px-4 md:px-6 lg:px-10 h-full my-10 relative z-10">
        <h2 className="text-3xl sm:text-4xl font-bold sm:mb-4 text-center font-serif">
          Welcome Back
        </h2>

        {/* Input Fields */}
        <div className="w-full max-w-md space-y-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-[#F3F0ED] rounded-md px-4 py-3 focus:outline-none "
          />
          <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md bg-[#F3F0ED] focus:outline-none "
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 cursor-pointer"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>

          {/* ✅ Create Account Button */}
          <button className="w-full bg-[#02382A] text-white py-3 rounded-md mt-4 hover:bg-white transition duration-300 border border-[#02382A] hover:text-[#02382A] ">
            Create Account
          </button>

          {/* Already Have Account */}
          <div className="flex justify-center gap-1 mt-2 text-sm text-gray-600">
            <p>Not have an account?</p>
            <button
              onClick={() => navigate("/register")}
              className="text-black font-medium hover:underline"
            >
              Register
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center mt-3">
            <span className="text-gray-400 text-sm">Or</span>
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-6 mt-2">
            <img
              src={apple}
              alt="Apple"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            />
            <img
              src={google}
              alt="Google"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            />
            <img
              src={fb1}
              alt="Facebook"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
