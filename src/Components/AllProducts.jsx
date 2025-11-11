import React, { useState, useEffect } from "react";
import { Heart, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import HomePageBanner from "../Components/HomePageBanner";
import singlebanner from "../assets/singlebanner.jpg";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../Axios/axios";

const Allproducts = () => {
  const [filters, setFilters] = useState({
    subcategories: [],
    fabrics: [],
    works: [],
    occasions: [],
    styles: [],
    sizes: [],
  });
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [searchParams] = useSearchParams();
  const cate_id = searchParams.get("cate_id");
  const categoryName = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("a-z");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    price: true,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 6;

  useEffect(() => {
    const fetchCategoryFilters = async () => {
      if (!cate_id) return;

      try {
        const [subRes, fabricRes, workRes, occRes, styleRes, sizeRes] =
          await Promise.all([
            axiosInstance.get(`/getsubcategory/${cate_id}`),
            axiosInstance.get(`/getfabrics/${cate_id}`),
            axiosInstance.get(`/getworks/${cate_id}`),
            axiosInstance.get(`/getoccasions/${cate_id}`),
            axiosInstance.get(`/getstyles/${cate_id}`),
            axiosInstance.get(`/getsize/${cate_id}`),
          ]);

        setFilters({
          subcategories: subRes.data.data || [],
          fabrics: fabricRes.data.data || [],
          works: workRes.data.data || [],
          occasions: occRes.data.data || [],
          styles: styleRes.data.data || [],
          sizes: sizeRes.data.data || [],
        });
      } catch (error) {
        console.error("Error fetching category filters:", error);
      }
    };

    fetchCategoryFilters();
  }, [cate_id]);

  const fetchProducts = async () => {
    try {
      const payload = {
        cate_id,
        subcategories: selectedSubcategories,
        fabrics: selectedFabrics,
        works: selectedWorks,
        occasions: selectedOccasions,
        styles: selectedStyles,
        sizes: selectedSizes,
        price_min: priceRange[0],
        price_max: priceRange[1],
        sort_by:
          sortBy === "a-z"
            ? "name_asc"
            : sortBy === "z-a"
            ? "name_desc"
            : sortBy === "low-high"
            ? "price_asc"
            : "price_desc",
        page,
        limit,
      };

      const response = await axiosInstance.post(
        `/productbycategory/${cate_id}`,
        payload
      );

      if (response.data.status === 1) {
        setProducts(response.data.data);
        setTotalProducts(response.data.total_count); // total products from backend
      } else {
        setProducts([]);
        setTotalProducts(0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Call on filter/sort/page change
  useEffect(() => {
    if (cate_id) fetchProducts();
  }, [
    cate_id,
    selectedSubcategories,
    selectedFabrics,
    selectedWorks,
    selectedOccasions,
    selectedStyles,
    selectedSizes,
    priceRange,
    sortBy,
    page,
  ]);

  const toggleSubcategory = (val) => {
    setSelectedSubcategories((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };
  const toggleFabric = (val) => {
    setSelectedFabrics((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };
  const toggleWork = (val) => {
    setSelectedWorks((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };
  const toggleOccasion = (val) => {
    setSelectedOccasions((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };
  const toggleStyle = (val) => {
    setSelectedStyles((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };
  const toggleSizeNew = (val) => {
    setSelectedSizes((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedFabrics([]);
    setSelectedWorks([]);
    setSelectedOccasions([]);
    setSelectedStyles([]);
    setSelectedSizes([]);
    setPriceRange([0, 100000]);
  };

  return (
    <div className="min-h-screen bg-[#f3f0ed] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-8 py-4">
        <div className="flex flex-col lg:flex-row sm:gap-8 gap-2">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center justify-center gap-2 bg-[#f3f0ed] border border-gray-300 px-4 py-3 rounded-lg sm:mb-4 mb-0 shadow-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters</span>
          </button>

          {/* 🔘 Sidebar Filters */}
          <aside
            className={`${
              mobileFilterOpen ? "block" : "hidden"
            } lg:block w-full lg:w-72 flex-shrink-0`}
          >
            <div className="bg-[#f3f0ed] border border-gray-200 rounded-lg overflow-hidden lg:sticky lg:top-28 shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between sm:p-4 p-2 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Filters Sidebar */}
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-12rem)] overflow-y-auto">
                {/* Subcategory */}
                {filters?.subcategories?.length > 0 && (
                  <div className="p-4">
                    <span className="font-medium text-gray-900">
                      Collections
                    </span>
                    <div className="mt-2 space-y-2">
                      {filters?.subcategories?.map((val) => (
                        <label
                          key={val.sc_id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSubcategories.includes(val.sc_id)}
                            onChange={() => toggleSubcategory(val.sc_id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            {val?.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fabric */}
                {filters?.fabrics?.length > 0 && (
                  <div className="p-4">
                    <span className="font-medium text-gray-900">Fabric</span>
                    <div className="mt-2 space-y-2">
                      {filters.fabrics.map((val) => (
                        <label
                          key={val.f_id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFabrics.includes(val.f_id)}
                            onChange={() => toggleFabric(val.f_id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            {val?.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work */}
                {filters.works.length > 0 && (
                  <div className="p-4">
                    <span className="font-medium text-gray-900">Work</span>
                    <div className="mt-2 space-y-2">
                      {filters.works.map((val) => (
                        <label
                          key={val.work_id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedWorks.includes(val.work_id)}
                            onChange={() => toggleWork(val.work_id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            {val?.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Occasion */}
                {filters.occasions.length > 0 && (
                  <div className="p-4">
                    <span className="font-medium text-gray-900">Occasion</span>
                    <div className="mt-2 space-y-2">
                      {filters.occasions.map((val) => (
                        <label
                          key={val.occasion_id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedOccasions.includes(
                              val.occasion_id
                            )}
                            onChange={() => toggleOccasion(val.occasion_id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            {val?.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Style */}
                {filters.styles.length > 0 && (
                  <div className="p-4">
                    <span className="font-medium text-gray-900">Style</span>
                    <div className="mt-2 space-y-2">
                      {filters.styles.map((val) => (
                        <label
                          key={val.style_id}
                          className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedStyles.includes(val.style_id)}
                            onChange={() => toggleStyle(val.style_id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                          />
                          <span className="text-sm text-gray-700">
                            {val?.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size */}
                {filters.sizes.length > 0 && (
                  <div className="p-4">
                    <span className="font-medium text-gray-900">Size</span>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {filters.sizes.map((val) => (
                        <label
                          key={val.size_id}
                          className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 p-1.5 rounded"
                        >
                          <input
                            type="checkbox"
                            checked={selectedSizes.includes(val.size_id)}
                            onChange={() => toggleSizeNew(val.size_id)}
                            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700">
                            {val?.size_name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {/* Price */}
                <div className="p-4">
                  <span className="font-medium text-gray-900">Price</span>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={0}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        min={0}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Max"
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <h2 className="text-[28px] md:text-[34px] font-bold text-gray-800 mb-2">
              {categoryName ? `${categoryName} - Collection` : "All Products"}
            </h2>

            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{products.length}</span>{" "}
                of <span className="font-semibold">{products.length}</span>{" "}
                products
              </p>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-[#f3f0ed]"
              >
                <option value="a-z">Sort By: A-Z</option>
                <option value="z-a">Sort By: Z-A</option>
                <option value="low-high">Price: Low - High</option>
                <option value="high-low">Price: High - Low</option>
              </select>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 ">
                {products.map((product) => (
                  <div className="flex sm:w-[240px] md:w-[225px] lg:w-[260px] xl:w-[280px]">
                    <ProductCard key={product.p_id} product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-2">No products found</p>
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
        <div className="flex justify-center mt-6 gap-3">
          {Array.from({ length: Math.ceil(totalProducts / limit) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <HomePageBanner
        title="Discover Timeless Comfort"
        bgImage={singlebanner}
      />
    </div>
  );
};

export default Allproducts;
