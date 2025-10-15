import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ApiURL, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";
import toast from "react-hot-toast";
import { getGuestId } from "../utils/guest";

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.productcolors[0]);
  const [isAdding, setIsAdding] = useState(false);

  console.log(product, "product");

  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/product/${product.p_id}`);
  }, [navigate, product.p_id]);

  const discount =
    product?.original_price && product?.original_price > product?.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : 0;

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    setIsAdding(true);

    try {

      const firstSizeId = product.productsizes?.length ? product.productsizes[0].size_id : null;
      const wishlistData = {
        u_id: userInfo?.u_id || null,
        guest_id: !userInfo?.u_id ? getGuestId() : null,
        p_id: product.p_id,
        sc_id: product.sc_id,
        pcolor_id: selectedColor?.pcolor_id || null,
        size_id: firstSizeId ||null,
      };

      const response = await axiosInstance.post("/addtowishlist", wishlistData);

      if (response.data.status === 1) {
        toast.success("Added to wishlist");
      } else {
        toast.error(response.data.message || "Already in wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="w-[220px] md:w-full bg-[#F3F0ED] rounded-xl overflow-hidden relative hover:shadow-md  duration-300 mx-auto z-10">
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-[2px] rounded-sm z-10">
          {discount}% off
        </div>
      )}

      {/* Heart Icon */}
      <button
        className="absolute top-2 right-2 p-1 rounded-full hover:scale-110 transition z-10"
        onClick={handleAddToWishlist}
      >
        <Heart size={20} className="text-gray-600" />
      </button>

      {/* Product Image */}
      <img
        src={`${ApiURL}/assets/Products/${selectedColor?.productimages[0].image_url}`}
        alt={product?.name}
        className="w-full h-[300px] md:h-[350px] object-cover"
        onClick={handleCardClick}
      />

      {/* Product Info */}
      <div className="px-3 pt-2 pb-4 bg-[#F3F0ED]">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-[13px] font-medium text-gray-800 leading-4">
              {product?.name}
            </h3>
            <p className="text-[11px] text-gray-500 mt-[2px]">
              {selectedColor.name}
            </p>
          </div>
          <div className="text-right">
            <span className="text-gray-400 line-through text-[11px] block">
              ${product?.original_price}
            </span>
            <span className="text-[13px] font-semibold text-gray-800">
              ${product?.price}
            </span>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 mt-2">
          {product?.productcolors?.map((color, idx) => (
            <span
              key={color?.pcolor_id}
              onClick={() => setSelectedColor(color)}
              className={`w-4 h-4 rounded-full border border-gray-300 cursor-pointer transition ${
                selectedColor.color?.color_code === color?.color?.color_code
                  ? "ring-2 ring-gray-700"
                  : ""
              }`}
              style={{ backgroundColor: color.color.color_code }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
