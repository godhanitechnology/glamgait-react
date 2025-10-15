import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import leftlight from "../assets/leftlight.png";
import rightlight from "../assets/rightlight.png";
import waves from "../assets/waves.png";
import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("/getcategory");
      if (response?.data?.status === 1) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      } 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="relative py-16 px-4 bg-[#F3F0ED] overflow-visible">
      {/* Top title and description */}
      <div className="text-center max-w-4xl mx-auto mb-6 md:mb-12 relative z-10">
        <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">
          Shop By Categories
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-600">
          Explore our categories and find your style
        </p>
      </div>

      {/* Scroll Buttons - Hidden on xl and above */}
      <div className="hidden lg:flex xl:hidden items-center justify-between max-w-7xl mx-auto mb-4 px-4 pointer-events-none">
        <button
          onClick={() => scroll("left")}
          className="absolute left-10 bottom-5 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition pointer-events-auto"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-10 bottom-5 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition pointer-events-auto"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Horizontal Scrollable Categories on <xl, Grid on xl+ */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          ref={scrollRef}
          className="overflow-x-auto xl:overflow-visible hide-scrollbar scroll-smooth xl:px-0"
        >
          <div className="flex space-x-4 w-max xl:w-auto xl:grid xl:grid-cols-5 xl:gap-5 xl:space-x-0">
            {categories?.map((category, index) => {
              const image = category.cate_image;
              return (
                <div className="hover:scale-105 transition-all duration-300">
                  <NavLink
                    key={category.cate_id || index}
                    to={`/shop?cate_id=${
                      category.cate_id
                    }&category=${encodeURIComponent(category.cate_name)}`}
                    className="rounded-lg overflow-hidden cursor-pointer flex-shrink-0 xl:flex-shrink xl:min-w-0 xl:basis-1/5"
                  >
                    <div className="relative pt-[120%] w-42 h-60 md:w-60 md:h-87 z-30">
                      <img
                        src={`${ApiURL}/assets/Category/${image}`}
                        alt={category.cate_name}
                        className="absolute inset-0 w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                      />
                    </div>
                    <div className="mt-3 text-center pb-2">
                      <span className="text-gray-800 text-base md:text-lg font-semibold capitalize">
                        {category.cate_name}
                      </span>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative top right and most right waves */}
      <div className="hidden md:block absolute top-0 right-20 md:-top-5 md:right-5 lg:right-30 lg:-top-15 xl:right-40 xl:-top-30 2xl:right-80 2xl:-top-30 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 z-0">
        <img
          src={waves}
          alt="Decorative"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="hidden md:block absolute top-50 right-[-50px] lg:top-60 lg:-right-20 xl:top-50 xl:-right-10 2xl:top-50 2xl:right-20 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 z-0 -rotate-30">
        <img
          src={waves}
          alt="Decorative"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Decorative bottom images */}
      <div className=" relative overflow-visible z-10">
        <div className="absolute -bottom-30 -left-7 sm:-bottom-34 sm:left-25 md:-bottom-48 md:left-28 lg:-bottom-53 lg:left-48 xl:-top-12 xl:left-38 2xl:left-80 w-30 h-40 sm:w-40 sm:h-45 md:w-50 md:h-60 lg:w-60 lg:h-65 xl:w-70 xl:h-80 2xl:w-90 2xl:h-90">
          <img
            src={leftlight}
            alt="Decorative"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="hidden md:block absolute bottom-[-50px] right-10 md:-bottom-49 md:-right-5 lg:-bottom-55 lg:right-10 xl:-bottom-74 xl:right-20 2xl:right-80 w-48 h-48 md:w-64 md:h-64 lg:w-70 lg:h-70 xl:w-80 xl:h-80 2xl:w-90 2xl:h-90">
          <img
            src={rightlight}
            alt="Decorative"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Categories;
