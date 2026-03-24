import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

const Categories = () => {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState([]);

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
      if (response?.data?.status) setCategories(response.data.data);
      else setCategories([]);
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
            {categories?.map((category) => {
              const image = category.cate_image;
              const cate_name = category.cate_name
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s-]/g, "") // allow both cases
                .replace(/\s+/g, "-") // spaces → dashes
                .replace(/-+/g, "-") // multiple dashes → one
                .replace(/^-+|-+$/g, "");
              return (
                <div className="hover:scale-105 transition-all duration-300">
                  <NavLink
                    key={category.cate_id}
                    to={`/collections/${cate_name}`}
                    className="rounded-lg overflow-hidden cursor-pointer flex-shrink-0 xl:flex-shrink xl:min-w-0 xl:basis-1/5"
                  >
                    <div className="relative pt-[120%] w-42 h-60 md:w-60 md:h-87 z-30">
                      <img
                        src={`${ApiURL}/assets/Category/${image}`}
                        alt={category.cate_name}
                        className="absolute inset-0 w-full h-full object-cover hover:brightness-110 transition-all duration-300"
                        loading="lazy"
                        width="240"
                        height="360"
                        decoding="async"
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
      {/* Decorative bottom images */}
      <div className=" relative overflow-visible z-10"></div>
    </section>
  );
};

export default Categories;
