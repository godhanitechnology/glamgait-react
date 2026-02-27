import ProductCard from "./ProductCard"; // Make sure this exists
import HomePageBanner from "../Components/HomePageBanner";
import singlebanner from "../assets/singlebanner.jpg";
import axiosInstance from "../Axios/axios";
import { useEffect, useState } from "react";
import { userInfo } from "../Variable";
import { getGuestId } from "../utils/guest";

const ReletedProduct = ({ cate_name, currentProductId, cate_id }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const [reviewsSummary, setReviewsSummary] = useState({});

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.post(
        `/productbycategory/${cate_name}`,
        { limit: 5, cate_id },
      );

      const filteredProducts =
        response?.data?.data?.products?.filter(
          (item) => item.p_id !== currentProductId,
        ) || [];

      setRelatedProducts(filteredProducts);

      // Fetch reviews immediately after getting products
      if (filteredProducts.length > 0) {
        const productIds = filteredProducts.map((p) => p.p_id);

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
                rating: item.average_rating || 0,
                count: item.total_reviews || 0,
              };
            });

            setReviewsSummary(summary);
          }
        } catch (err) {
          console.error("Reviews fetch failed", err);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (cate_name) fetchProducts();
  }, [cate_name]);

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

  return (
    <>
      {relatedProducts?.length > 0 && (
        <section className="pt-12 px-4 bg-[#F3F0ED]">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-[30px] md:text-[34px] xl:text-[34px] font-bold text-gray-800 mb-2">
              Related Products
            </h2>
            <p className="text-[12px] md:text-[16px] text-gray-600">
              Discover more styles you may like.
            </p>
          </div>

          {/* Product Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-4 overflow-x-auto lg:grid lg:grid-cols-4 md:gap-6 scrollbar-hide pb-12">
              {relatedProducts?.slice(0, 4)?.map((product) => (
                <div
                  key={product.p_id}
                  className="flex-shrink-0 w-[250px] sm:w-[240px] md:w-[250px] lg:w-[230px] xl:w-[300px]"
                >
                  <ProductCard
                    product={product}
                    wishlistMap={wishlistMap}
                    onWishlistChange={refreshWishlist}
                    reviewsSummary={reviewsSummary}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <HomePageBanner
              title="Discover Timeless Comfort"
              bgImage={singlebanner}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default ReletedProduct;
