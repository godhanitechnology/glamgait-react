import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import HomePageBanner from "../Components/HomePageBanner";
import singlebanner from "../assets/singlebanner.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import CategoryReviewSlider from "./CategoryReviewSlider";
import ScrollToTop from "./ScrollToTop";
import { userInfo } from "../Variable";
import { getGuestId } from "../utils/guest";
import { Helmet } from "@dr.pogodin/react-helmet";
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
  const [allColors, setAllColors] = useState([]); // ← global colors
  const [selectedColors, setSelectedColors] = useState([]);
  const { cate_name, filterValue } = useParams();
  const [wishlistMap, setWishlistMap] = useState({});
  const [reviewsSummary, setReviewsSummary] = useState({});
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState("a-z");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [categoryReviews, setCategoryReviews] = useState([]);
  const [cateId, setCateId] = useState(null);
  const [categoryDisplayName, setCategoryDisplayName] = useState("");
  const [activeFilterName, setActiveFilterName] = useState("");
  const [limit] = useState(18);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [seo, setSeo] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const prevProductsRef = useRef([]);

  const createSlug = (name) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  // Set selected filters from URL filterValue (infer type by matching in filters)

  useEffect(() => {
    if (!filterValue || Object.keys(filters).length === 0) {
      setSelectedSubcategories([]);
      setSelectedFabrics([]);
      setSelectedWorks([]);
      setSelectedOccasions([]);
      setSelectedStyles([]);
      setActiveFilterName("");
      return;
    }
    let matched = null;
    let type = null;
    // Check each filter list for matching slug
    matched = filters.subcategories.find(
      (item) => createSlug(item.name) === filterValue
    );
    if (matched) {
      type = "collection";
      setSelectedSubcategories([matched.sc_id]);
      setActiveFilterName(matched.name);
    } else {
      matched = filters.fabrics.find(
        (item) => createSlug(item.name) === filterValue
      );
      if (matched) {
        type = "fabric";
        setSelectedFabrics([matched.f_id]);
        setActiveFilterName(matched.name);
      } else {
        matched = filters.works.find(
          (item) => createSlug(item.name) === filterValue
        );
        if (matched) {
          type = "work";
          setSelectedWorks([matched.work_id]);
          setActiveFilterName(matched.name);
        } else {
          matched = filters.occasions.find(
            (item) => createSlug(item.name) === filterValue
          );
          if (matched) {
            type = "occasion";
            setSelectedOccasions([matched.occasion_id]);
            setActiveFilterName(matched.name);
          } else {
            matched = filters.styles.find(
              (item) => createSlug(item.name) === filterValue
            );
            if (matched) {
              type = "style";
              setSelectedStyles([matched.style_id]);
              setActiveFilterName(matched.name);
            }
          }
        }
      }
    }
    // Clear other filters if a match found
    if (matched && type) {
      setSelectedSubcategories(type === "collection" ? [matched.sc_id] : []);
      setSelectedFabrics(type === "fabric" ? [matched.f_id] : []);
      setSelectedWorks(type === "work" ? [matched.work_id] : []);
      setSelectedOccasions(type === "occasion" ? [matched.occasion_id] : []);
      setSelectedStyles(type === "style" ? [matched.style_id] : []);
    }
  }, [filterValue, filters]);

  useEffect(() => {
    if (!cate_name) {
      // If no category slug → show all products or redirect
      setCateId(null);
      setCategoryDisplayName("All Products");
      return;
    }
    const fetchCategoryId = async () => {
      try {
        // Call backend to get cate_id from name/slug
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

  useEffect(() => {
    const fetchAllColors = async () => {
      try {
        const res = await axiosInstance.get("/getcolor");
        if (res.data.status === 1) {
          setAllColors(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching global colors:", error);
      }
    };

    fetchAllColors();
  }, []);

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
        colors: selectedColors,
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
        page: currentPage,
        limit: limit,
      };
      const response = await axiosInstance.post(
        `/productbycategory/${cate_name}`,
        payload
      );
      if (response.data.status === 1) {
        const { products, pagination } = response.data.data;
        setProducts(products || []);
        setTotalProducts(pagination.totalCount || 0);
        setTotalPages(pagination.totalPages || 0);
        // Optional: sync page if backend returned different page
        if (pagination.page !== currentPage) {
          setCurrentPage(pagination.page);
        }
      } else {
        setProducts([]);
        setTotalProducts(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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
    selectedColors,
    priceRange,
    sortBy,
    currentPage,
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

  const toggleColor = (colorId) => {
    setSelectedColors(
      (prev) =>
        prev.includes(colorId)
          ? prev.filter((id) => id !== colorId) // remove if already selected
          : [...prev, colorId] // add if not selected
    );
  };
  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedFabrics([]);
    setSelectedWorks([]);
    setSelectedOccasions([]);
    setSelectedStyles([]);
    setSelectedSizes([]);
    setSelectedColors([]);
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

  // In your React component
  const fetchCategoryReviews = async () => {
    if (!cate_name) return;

    try {
      const response = await axiosInstance.post("/getReviewsByCategory", {
        cate_name: cate_name,
        page: 1,
        perPage: 30,
      });

      if (response.data.status === 1) {
        const fetchedReviews = response.data.data.reviews || [];
        console.log("Fetched category reviews:", fetchedReviews);

        // Optional: Format dates or add any client-side processing
        const formatted = fetchedReviews.map((review) => ({
          ...review,
          createdAt: review.createdAt
            ? new Date(review.createdAt).toLocaleDateString()
            : "",
        }));

        setCategoryReviews(formatted);
      } else {
        console.log("No reviews found for category:", cate_name);
        setCategoryReviews([]);
      }
    } catch (error) {
      console.error("Error fetching category reviews:", error);
      setCategoryReviews([]);
    }
  };

  // useEffect(() => {
  //   fetchCategoryReviews();
  // }, [cate_name]);

  useEffect(() => {
    let title = "";
    let description = "";

    // ✅ Subcategory SEO (highest priority)
    if (activeFilterName && filters.subcategories.length > 0) {
      const sub = filters.subcategories.find(
        (s) => s.name === activeFilterName
      );

      if (sub) {
        title =
          sub.meta_title || `${sub.name} - ${categoryDisplayName} Collection`;

        description =
          sub.meta_description ||
          `Buy ${sub.name} online from our exclusive ${categoryDisplayName} collection.`;
      }
    }

    // ✅ Category SEO fallback
    if (!title) {
      title = `${categoryDisplayName} Collection | Buy Online`;
      description = `Shop latest ${categoryDisplayName} products with best price and fast delivery.`;
    }

    setSeo({ title, description });
  }, [activeFilterName, filters.subcategories, categoryDisplayName]);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>

        <meta name="description" content={seo.description} />
      </Helmet>

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
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h2>
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
                <div className="divide-y divide-gray-200 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
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
                              checked={selectedSubcategories.includes(
                                val.sc_id
                              )}
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
                      <span className="font-medium text-gray-900">
                        Occasion
                      </span>
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
                  {/* Color - Global */}
                  {allColors?.length > 0 && (
                    <div className="p-4">
                      <span className="font-medium text-gray-900">Color</span>
                      <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-3">
                        {allColors?.map((color) => (
                          <label
                            key={color.color_id}
                            className="flex flex-col items-center cursor-pointer group"
                          >
                            <div className="relative">
                              <div
                                className={`w-10 h-10 rounded-full border-2 transition-all ${
                                  selectedColors.includes(color.color_id)
                                    ? "border-black scale-110 shadow-md"
                                    : "border-gray-300 hover:border-gray-500"
                                }`}
                                style={{
                                  backgroundColor:
                                    color.color_code || "#ffffff",
                                }}
                              />
                              {selectedColors.includes(color.color_id) && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                    <svg
                                      className="w-3 h-3 text-black"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                            <span className="mt-1 text-xs text-gray-700 text-center truncate w-full">
                              {color.color_name}
                            </span>
                            <input
                              type="checkbox"
                              checked={selectedColors.includes(color.color_id)}
                              onChange={() => toggleColor(color.color_id)}
                              className="hidden"
                            />
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
                            setPriceRange([
                              Number(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-1/2 border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          min={0}
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number(e.target.value),
                            ])
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
                {activeFilterName
                  ? `${activeFilterName} - ${categoryDisplayName} Collection`
                  : `${categoryDisplayName} Collection`}
              </h2>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-semibold">
                    {totalProducts === 0 ? 0 : (currentPage - 1) * limit + 1} -{" "}
                    {Math.min(currentPage * limit, totalProducts)}
                  </span>{" "}
                  of <span className="font-semibold">{totalProducts}</span>{" "}
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
                  <p className="text-gray-500 text-lg mb-2">
                    No products found
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
          {/* Pagination Controls */}
          {totalProducts > 0 && totalPages > 1 && (
            <div className="flex flex-col items-center mt-10 mb-8">
              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                {/* Previous */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-5 py-2.5 rounded-lg font-medium border transition-all ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Previous
                </button>
                {/* Page Numbers - Smart limited display */}
                {(() => {
                  const pages = [];
                  const maxVisible = 5;
                  let startPage = Math.max(1, currentPage - 2);
                  let endPage = Math.min(
                    totalPages,
                    startPage + maxVisible - 1
                  );
                  if (endPage - startPage < maxVisible - 1) {
                    startPage = Math.max(1, endPage - maxVisible + 1);
                  }
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-11 h-11 rounded-lg font-medium transition-all ${
                          currentPage === i
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }
                  return pages;
                })()}
                {/* Next */}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2.5 rounded-lg font-medium border transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {/* AUTO-SCROLLING REVIEW SLIDER */}
        </div>
        {/* {categoryReviews.length > 0 && (
          <CategoryReviewSlider
            reviews={categoryReviews}
            direction="left"
            speed="slow"
            cate_name={cate_name}
          />
        )} */}
        <HomePageBanner
          title="Discover Timeless Comfort"
          bgImage={singlebanner}
        />
      </div>
    </>
  );
};
export default Allproducts;
