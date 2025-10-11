import React from "react";
import notfound from "../assets/notfound.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-[#F3F0ED] h-screen flex items-center justify-center p-4">
      <div className="justify-items-center">
        <div className="w-50 h-30 md:w-[300px] md:h-[200px]">
          <img src={notfound} alt="" />
        </div>
        <div className="justify-items-center">
            <h1 className="xl:text-[34px] text-[24px] text-black font-bold mt-5">Oops! Page not found</h1>
            <p className="text-[#807D7E] text-[14px] text-center">The page you are looking for might have been removed or
temporarily unavailable.</p>
        </div>
        <div className="text-center bg-[#02382A] text-white px-4 py-1.5 rounded-[8px] w-fit mt-5">
          <Link to="/">Go Back Home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
