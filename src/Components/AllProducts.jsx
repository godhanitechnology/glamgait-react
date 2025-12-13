import React, { useState, useEffect, useRef } from "react";
import { Heart, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import HomePageBanner from "../Components/HomePageBanner";
import singlebanner from "../assets/singlebanner.jpg";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import { reviewsData } from "../data/reviews";
import ReviewCard from "./ReviewCard";
import CategoryReviewSlider from "./CategoryReviewSlider";
import ScrollToTop from "./ScrollToTop";
import { userInfo } from "../Variable";
import { getGuestId } from "../utils/guest";

const Allproducts = () => {
  ScrollToTop();
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

  const { cate_name } = useParams();
  const [wishlistMap, setWishlistMap] = useState({});
  const [reviewsSummary, setReviewsSummary] = useState({}); // ← Add this state
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("a-z");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [cateId, setCateId] = useState(null);
  const [categoryDisplayName, setCategoryDisplayName] = useState("");
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 6;
  const navigate = useNavigate();
  const prevProductsRef = useRef([]);

  useEffect(() => {
    const collection = searchParams.get("collection");
    const fabric = searchParams.get("fabric");
    const occasion = searchParams.get("occasion");
    const work = searchParams.get("work");
    const style = searchParams.get("style");
    const highlight = searchParams.get("highlight");

    // Set selected filters from URL
    if (collection) {
      const matched = filters.subcategories.find(
        (s) => s.name === decodeURIComponent(collection)
      );
      if (matched) setSelectedSubcategories([matched.sc_id]);
    } else {
      setSelectedSubcategories([]);
    }

    if (fabric) {
      const matched = filters.fabrics.find(
        (f) => f.name === decodeURIComponent(fabric)
      );
      if (matched) setSelectedFabrics([matched.f_id]);
    } else {
      setSelectedFabrics([]);
    }

    if (occasion) {
      const matched = filters.occasions.find(
        (o) => o.name === decodeURIComponent(occasion)
      );
      if (matched) setSelectedOccasions([matched.occasion_id]);
    } else {
      setSelectedOccasions([]);
    }

    if (work) {
      const matched = filters.works.find(
        (w) => w.name === decodeURIComponent(work)
      );
      if (matched) setSelectedWorks([matched.work_id]);
    } else {
      setSelectedWorks([]);
    }

    if (style) {
      const matched = filters.styles.find(
        (s) => s.name === decodeURIComponent(style)
      );
      if (matched) setSelectedStyles([matched.style_id]);
    } else {
      setSelectedStyles([]);
    }
  }, [searchParams, filters]);

  useEffect(() => {
    if (cate_name) {
      const filtered = reviewsData.filter(
        (review) => review.category.toLowerCase() === cate_name.toLowerCase()
      );
      setCategoryReviews(filtered);
    }
  }, [cate_name]);

  useEffect(() => {
    if (!cate_name) {
      // If no category slug → show all products or redirect
      setCateId(null);
      setCategoryDisplayName("All Products");
      return;
    }

    const fetchCategoryId = async () => {
      try {
        // Call backend to get cate9_id from name/slug
        const res = await axiosInstance.get(`/getcategorybyname/${cate_name}`);

        if (res.data.status === 1 && res.data.data) {
          setCateId(res.data.data.cate_id);
          setCategoryDisplayName(res.data.data.cate_name || cate_name);
        } else {
          console.log("cate_not found");
        }
      } catch (err) {
        console.error("Category not found:", err);
      }
    };

    fetchCategoryId();
  }, [cate_name, navigate]);

  useEffect(() => {
    const fetchCategoryFilters = async () => {
      if (!cateId) return;

      try {
        const [subRes, fabricRes, workRes, occRes, styleRes, sizeRes] =
          await Promise.all([
            axiosInstance.get(`/getsubcategory/${cateId}`),
            axiosInstance.get(`/getfabrics/${cateId}`),
            axiosInstance.get(`/getworks/${cateId}`),
            axiosInstance.get(`/getoccasions/${cateId}`),
            axiosInstance.get(`/getstyles/${cateId}`),
            axiosInstance.get(`/getsize/${cateId}`),
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
  }, [cateId]);

  const fetchProducts = async () => {
    try {
      const payload = {
        cate_id: cateId,
        cate_name,
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
        `/productbycategory/${cate_name}`,
        payload
      );

      if (response.data.status === 1) {
        setProducts(response.data.data.products);
        setTotalProducts(response.data.total_count);
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
    if (cate_name) fetchProducts();
  }, [
    cate_name,
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

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = userInfo();
      const identifier = user?.u_id || getGuestId();

      try {
        const query = user?.u_id
          ? `u_id=${identifier}`
          : `guest_id=${identifier}`;

        const res = await axiosInstance.get(`/getwishlist?${query}`);

        if (res.data.status === 1) {
          const items = res.data.data || [];

          // Create fast lookup map: "p_id-pcolor_id" → true
          const map = {};
          items.forEach((item) => {
            const key = `${item.p_id}-${item.pcolor_id}`;
            map[key] = {
              wished: true,
              w_id: item.w_id, // optional: for remove
            };
          });

          setWishlistMap(map);
        }
      } catch (err) {
        console.error("Wishlist fetch failed", err);
      }
    };

    fetchWishlist();
  }, []);

  const refreshWishlist = async () => {
    const user = userInfo();
    const identifier = user?.u_id || getGuestId();
    try {
      const query = user?.u_id
        ? `u_id=${identifier}`
        : `guest_id=${identifier}`;

      const res = await axiosInstance.get(`/getwishlist?${query}`);

      if (res.data.status === 1) {
        const items = res.data.data || [];
        const map = {};
        items.forEach((item) => {
          const key = `${item.p_id}-${item.pcolor_id}`;
          map[key] = {
            wished: true,
            w_id: item.w_id,
          };
        });
        setWishlistMap(map); // ← Yeh update karega sab ProductCards ko
      }
    } catch (err) {
      console.error("Wishlist refresh failed", err);
    }
  };

  const fetchAllReviewsSummary = async () => {
    if (products.length === 0) return;

    const productIds = products.map((p) => p.p_id);

    try {
      const res = await axiosInstance.post("/getreviewsformultiple", {
        p_ids: productIds,
      });

      if (res.data.status === 1) {
        const data = res.data.data || {};
        const summary = {};

        Object.keys(data).forEach((p_id) => {
          const item = data[p_id];
          summary[p_id] = {
            rating: item.average_rating,
            count: item.total_reviews,
          };
        });

        setReviewsSummary(summary);
      }
    } catch (err) {
      console.error("Reviews fetch failed", err);
    }
  };

  useEffect(() => {
    const prev = prevProductsRef.current;
    const hasProductsNow = products.length > 0;
    const hadNoProductsBefore = prev.length === 0;

    if (hasProductsNow && hadNoProductsBefore) {
      fetchAllReviewsSummary();
    }

    prevProductsRef.current = products;
  }, [products]);

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

          {/* Sidebar Filters */}
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
              {cate_name ? `${cate_name} - Collection` : "All Products"}
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

            {products?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 ">
                {products?.map((product) => (
                  <div className="flex sm:w-[240px] md:w-[225px] lg:w-[260px] xl:w-[280px]">
                    <ProductCard
                      key={product.p_id}
                      product={product}
                      wishlistMap={wishlistMap}
                      onWishlistChange={refreshWishlist}
                      reviewsSummary={reviewsSummary}
                    />
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
        {/* AUTO-SCROLLING REVIEW SLIDER */}
      </div>
      {categoryReviews.length > 0 && (
        <CategoryReviewSlider
          reviews={categoryReviews}
          direction="left"
          speed="slow"
        />
      )}
      <HomePageBanner
        title="Discover Timeless Comfort"
        bgImage={singlebanner}
      />
    </div>
  );
};

export default Allproducts;
