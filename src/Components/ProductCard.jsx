import { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApiURL, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";
import toast from "react-hot-toast";
import { getGuestId } from "../utils/guest";
import RatingBadge from "./RatingBadge";

const ProductCard = ({
  product,
  wishlistMap,
  onWishlistChange,
  reviewsSummary,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.productcolors[0]);

  const user = userInfo();
  const navigate = useNavigate();

  const wishlistKey = selectedColor?.pcolor_id
    ? `${product.p_id}-${selectedColor.pcolor_id}`
    : null;

  const isWished =
    wishlistKey && wishlistMap ? !!wishlistMap[wishlistKey] : false;
  const wishlistId =
    wishlistKey && wishlistMap ? wishlistMap[wishlistKey]?.w_id || null : null;

  const handleCardClick = useCallback(() => {
    const name = product?.name || "product";

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Final clean URL
    navigate(`/product/${slug}`);
  }, [navigate, product?.name]);

  const discount =
    product?.original_price && product?.original_price > product?.price
      ? product.original_price - product.price
      : 0;

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!selectedColor?.pcolor_id) {
      toast.error("Please select a color");
      return;
    }

    try {
      if (isWished && wishlistId) {
        const res = await axiosInstance.post(`${ApiURL}/removewishlist`, {
          w_id: wishlistId,
        });

        if (res.data.status === 1) {
          toast.success("Removed from wishlist");
          onWishlistChange();
        }
      } else {
        const firstSize = product.productsizes?.[0];
        const psize_id = firstSize?.psize_id || null;

        const payload = {
          u_id: user?.u_id || null,
          guest_id: user?.u_id ? null : getGuestId(),
          p_id: product.p_id,
          sc_id: product.sc_id,
          pcolor_id: selectedColor.pcolor_id,
          psize_id: psize_id,
        };

        const res = await axiosInstance.post(
          `${ApiURL}/addtowishlist`,
          payload
        );

        if (res.data.status === 1) {
          toast.success("Added to wishlist");
          onWishlistChange();
        } else {
          toast.error(res.data.description || "Already in wishlist");
        }
      }
    } catch (err) {
      toast.error("Wishlist action failed");
      console.error(err);
    }
  };

  return (
    <div className="w-[220px] md:w-full bg-[#F3F0ED] rounded-xl overflow-hidden relative hover:shadow-md duration-300 mx-auto z-10 cursor-pointer">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-[2px] rounded-sm z-10">
          ₹{discount} OFF
        </div>
      )}

      {/* Wishlist Heart */}
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:scale-110 transition z-20"
      >
        <Heart
          size={20}
          className={`transition-all duration-300 ${
            isWished
              ? "fill-red-500 text-red-500 scale-110"
              : "text-gray-600 hover:text-red-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <div onClick={handleCardClick}>
        <img
          src={`${ApiURL}/assets/Products/${selectedColor?.productimages[0]?.image_url}`}
          alt={product?.name}
          className="w-full h-[300px] md:h-[350px] object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x350?text=No+Image";
          }}
        />
      </div>

      {/* Product Info */}
      <div
        className="px-3 pt-2 pb-4 bg-[#F3F0ED] h-[150px]"
        onClick={handleCardClick}
      >
        <div className="flex flex-col items-start mb-1 space-y-1">
          <div>
            <h3 className="text-[16px] font-medium text-gray-800 leading-4 line-clamp-1">
              {product?.name}
            </h3>
            <p className="text-[11px] text-gray-500 mt-0.5">
              {selectedColor?.color?.color_name || "Color"}
            </p>
          </div>
          <div className="text-left">
            {product?.original_price > product?.price && (
              <span className="text-gray-400 line-through text-[11px] block">
                ₹{product?.original_price}
              </span>
            )}
            <span className="text-[14px] font-semibold text-gray-800">
              ₹{product?.price}
            </span>
          </div>
          <RatingBadge p_id={product.p_id} reviewsSummary={reviewsSummary} />
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 mt-2">
          {product?.productcolors?.map((color) => (
            <button
              key={color.pcolor_id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                selectedColor?.pcolor_id === color.pcolor_id
                  ? "border-black scale-110"
                  : "border-gray-300 hover:border-gray-600"
              }`}
              style={{ backgroundColor: color.color?.color_code || "#ccc" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
