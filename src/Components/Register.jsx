// src/pages/Register.jsx
import React, { useState } from "react";
import loginmain from "../assets/loginmain.jpg"; // adjust if path differs
import fb1 from "../assets/fb1.svg";
import apple from "../assets/apple.svg";
import google from "../assets/google.svg";
import rightlight from "../assets/rightlight.png";
import leftlight from "../assets/leftlight.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { first_name, last_name, email, password } = formData;
    if (!first_name || !last_name || !email || !password) {
      console.log("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/userregister", formData);
      if (response.data.status === 1) {
        toast.success("Registration Successful!");
        navigate("/login");
      } else {
        console.log(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

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
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#F3F0ED] rounded-md  focus:outline-none focus:border-[#063d32]"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#F3F0ED] focus:outline-none focus:border-[#063d32]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#F3F0ED] focus:outline-none focus:border-[#063d32]"
            />

            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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
              disabled={loading}
              className="w-full bg-[#02382A] text-white py-3 rounded-md hover:bg-white border border-[#02382A] hover:text-[#02382A] transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Already have account */}
          <p className="text-center text-sm mt-4">
            Already Have An Account?{" "}
            <Link
              to="/login"
              className="text-[#063d32] font-medium hover:underline"
            >
              Log In
            </Link>
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
