import React, { useState, useMemo } from "react";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "./ProductCard";
import productsData from "../data/products"; // Assuming products.js
// import waves from "../assets/waves.png";
import HomePageBanner from "../Components/HomePageBanner";
import singlebanner from "../assets/singlebanner.jpg";

const Allproducts = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("a-z");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    price: true,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // 🔄 Flatten the nested product structure
  const allProducts = useMemo(() => {
    const result = [];
    productsData.categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        subcategory.products.forEach((product) => {
          result.push({
            ...product,
            category: category.name,
            subcategory: subcategory.name,
          });
        });
      });
    });
    return result;
  }, []);

  // 🧠 Filtering and Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      // Filter by category (subcategory in this case)
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.subcategory)
      ) {
        return false;
      }

      // Filter by sizes
      if (
        selectedSizes.length > 0 &&
        !product.sizes.some((size) => selectedSizes.includes(size))
      ) {
        return false;
      }

      // Filter by price range (use newPrice)
      if (
        product.newPrice < priceRange[0] ||
        product.newPrice > priceRange[1]
      ) {
        return false;
      }

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === "a-z") return a.title.localeCompare(b.title);
      if (sortBy === "z-a") return b.title.localeCompare(a.title);
      if (sortBy === "low-high") return a.newPrice - b.newPrice;
      if (sortBy === "high-low") return b.newPrice - a.newPrice;
      return 0;
    });

    return filtered;
  }, [allProducts, selectedCategories, selectedSizes, priceRange, sortBy]);

  // 🔧 Handlers
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceRange([0, 1000]);
  };

  return (
    <div className="min-h-screen bg-[#f3f0ed] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-8 py-4">
        <div className="flex flex-col lg:flex-row sm:gap-8 gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 bg-[#f3f0ed] border border-gray-300 px-4 py-3 rounded-lg sm:mb-4 mb-0 shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>

          {/* Sidebar Filters */}
          <aside
            className={`${
              mobileFilterOpen ? "block" : "hidden"
            } lg:block w-full lg:w-72 flex-shrink-0`}
          >
            <div className="bg-[#f3f0ed] border border-gray-200 rounded-lg overflow-hidden lg:sticky lg:top-28 shadow-sm">
              {/* Filter Header */}
              <div className="flex items-center justify-between sm:p-4 p-2 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  <span className="hidden lg:inline">Filter</span>
                  <span className="lg:hidden">Filters</span>
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close filters"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200 max-h-[calc(100vh-12rem)] overflow-y-auto">
                {/* Category */}
                <div className="p-4">
                  <button
                    onClick={() => toggleSection("category")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-gray-900">Category</span>
                    {expandedSections.category ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {expandedSections.category && (
                    <div className="mt-3 space-y-2">
                      {/* Replace hardcoded categories with dynamic ones */}
                      {[...new Set(allProducts.map((p) => p.subcategory))].map(
                        (category) => (
                          <label
                            key={category}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                            />
                            <span className="text-sm text-gray-700">
                              {category}
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Size */}
                <div className="p-4">
                  <button
                    onClick={() => toggleSection("size")}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="font-medium text-gray-900">Size</span>
                    {expandedSections.size ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                  {expandedSections.size && (
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <label
                          key={size}
                          className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(size)}
                            onChange={() => toggleSize(size)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700">{size}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="p-4">
                  <button
                    onClick={() => toggleSection("price")}
                    className="flex items-center justify-between w-full text-left mb-4"
                  >
                    <span className="font-medium text-gray-900">Price</span>
                    {expandedSections.price ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {expandedSections.price && (
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-semibold text-gray-900">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>

                      <div className="relative h-2 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-2 bg-black rounded-full"
                          style={{
                            left: `${(priceRange[0] / 1000) * 100}%`,
                            right: `${100 - (priceRange[1] / 1000) * 100}%`,
                          }}
                        />

                        {/* Min */}
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[0]}
                          onChange={(e) => {
                            const val = Math.min(
                              Number(e.target.value),
                              priceRange[1] - 10
                            );
                            setPriceRange([val, priceRange[1]]);
                          }}
                          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer"
                        />

                        {/* Max */}
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={priceRange[1]}
                          onChange={(e) => {
                            const val = Math.max(
                              Number(e.target.value),
                              priceRange[0] + 10
                            );
                            setPriceRange([priceRange[0], val]);
                          }}
                          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            {/* Top bar */}
            <div>
              <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">

                Women’s Clothing & Apparel - New Arrivals</h2>
            <div className="flex justify-between items-center mb-6">
              
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">
                  {filteredAndSortedProducts.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold">{allProducts.length}</span>{" "}
                products
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-[#f3f0ed]"
              >
                <option value="a-z">Sort By: A-Z</option>
                <option value="z-a">Sort By: Z-A</option>
                <option value="low-high">Price: Low - High</option>
                <option value="high-low">Price: High - Low</option>
              </select>
            </div>
            </div>

            {/* Product cards */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 justify-items-center">
                {filteredAndSortedProducts.map((product) => (
                  <div className="flex-shrink-0 w-[250px] sm:w-[240px] md:w-[225px] lg:w-[260px] xl:w-[300px]s">
                  <ProductCard key={product.id} {...product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm mb-4">
                  Try adjusting your filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-black underline hover:text-gray-700"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      {/* <div className="hidden md:block absolute top-0 right-20 md:-top-5 md:right-5 lg:right-30 lg:-top-15 xl:right-40 xl:-top-30 2xl:right-80 2xl:-top-30 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 z-0">
        <img
          src={waves}
          alt="Decorative"
          className="w-full h-full object-contain"
        />
      </div> */}
      {/* <div className="hidden md:block absolute top-50 right-[-50px] md:top-50 md:-right-30 lg:top-60 lg:-right-20 xl:top-50 xl:-right-10 2xl:top-50 2xl:-right-5 w-48 h-48 md:w-80 md:h-80 lg:w-80 lg:h-80 xl:w-96 xl:h-96 2xl:w-120 2xl:h-120 z-0 -rotate-60 -scale-x-90">
        <img
          src={waves}
          alt="Decorative"
          className="w-full h-full object-contain"
        />
      </div> */}
      <div >
           <HomePageBanner
        title="Discover Timeless Comfort"
        bgImage={singlebanner}
      />

    </div>
    </div>
  );
};

export default Allproducts;
