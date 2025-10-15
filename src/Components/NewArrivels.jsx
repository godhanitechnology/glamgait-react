// NewArrivels.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import waves from "../assets/waves.png";
import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

const NewArrivels = () => {
  const [activeTab, setActiveTab] = useState("newArrivals");
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // 👇 Fetch both new arrivals & best sellers (can be separate APIs)
        const [newArrivalsRes, bestSellerRes] = await Promise.all([
          axiosInstance.post(`${ApiURL}/getproducts`, { limit: 8 }),
          axiosInstance.post(`${ApiURL}/getproducts`, { limit: 8 }),
        ]);
        setNewArrivals(newArrivalsRes.data.data || []);
        setBestSeller(bestSellerRes.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  console.log(newArrivals, "new");

  const currentProducts =
    activeTab === "newArrivals" ? newArrivals : bestSeller;

  return (
    <section className="relative sm:pt-0 md:pt-16 md:px-4 bg-[#F3F0ED] overflow-x-hidden">
      {/* Decorative Lanterns */}
      <div className=" relative overflow-visible z-10">
        <img
          src={waves}
          alt="Wave Decoration"
          className="absolute top-90 -right-10 lg:top-90 lg:-right-33 xl:right-20 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[28rem] 2xl:h-[28rem] z-0 -rotate-30"
        />
      </div>

      {/* Title and Description */}
      <div className="text-center max-w-4xl mx-auto mb-8 relative z-20">
        <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">
          {activeTab === "newArrivals" ? "New Arrivals" : "Best Sellers"}
        </h2>
        <p className="text-[12px] md:text-[16px] text-gray-600">
          {activeTab === "newArrivals"
            ? "Step into the season with our latest collection of trendsetting styles, bold colors, and effortless fits."
            : "Discover the most-loved pieces that everyone’s raving about. Timeless styles, trusted by thousands."}
        </p>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 md:mb-12 mb-6 relative z-20">
        <button
          onClick={() => setActiveTab("bestSeller")}
          className={`px-6 py-2 rounded-[10px] text-gray-800 text-[14px] lg:text-[16px]  transition ${
            activeTab === "bestSeller"
              ? "bg-[#02382A] text-white"
              : "bg-white shadow"
          }`}
        >
          BEST SELLER
        </button>
        <button
          onClick={() => setActiveTab("newArrivals")}
          className={`px-6 py-2 rounded-[10px] text-gray-800 text-[14px] lg:text-[16px] transition ${
            activeTab === "newArrivals"
              ? "bg-[#02382A] text-white"
              : "bg-white shadow"
          }`}
        >
          NEW ARRIVALS
        </button>
      </div>
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="flex space-x-4 overflow-x-auto lg:grid  lg:grid-cols-4 md:gap-6 scrollbar-hide py-2 ">
          {currentProducts?.map((product) => (
            <div
              key={product.p_id}
              className="flex-shrink-0 w-[250px] sm:w-[240px] md:w-[250px] lg:w-[230px] xl:w-[300px]"
            >
              <ProductCard product={product}  />
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Waves */}

      {/* <div className="relative overflow-visible z-10">
        <img
          src={waves}
          alt="Wave Decoration"
          className="absolute -bottom-50 right-100 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-[28rem] 2xl:h-[28rem] z-0 scale-x-90"
        />
      </div> */}
    </section>
  );
};

export default NewArrivels;
