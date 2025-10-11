import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const ProductCard = ({id, title, oldPrice, newPrice, colors = [], discount }) => {
  if (!Array.isArray(colors) || colors.length === 0) return null;

  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/product/${id}`); // Use id from product for dynamic navigation
  }, [navigate, id]);

  return (
    <div
      onClick={handleCardClick}
      className="w-full bg-[#F3F0ED] rounded-xl overflow-hidden relative hover:shadow-md  duration-300 mx-auto z-10"
    >
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-[2px] rounded-sm z-10">
          {discount}% off
        </div>
      )}

      {/* Heart Icon */}
      <button className="absolute top-2 right-2 p-1 rounded-full hover:scale-110 transition z-10">
        <Heart size={20} className="text-gray-600" />
      </button>

      {/* Product Image */}
      <img
        src={selectedColor.image}
        alt={title}
        className="w-full h-[350px] object-cover"
      />

      {/* Product Info */}
      <div className="px-3 pt-2 pb-4 bg-[#F3F0ED]">
        {/* Title and Price Row */}
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-[13px] font-medium text-gray-800 leading-4">
              {title}
            </h3>
            <p className="text-[11px] text-gray-500 mt-[2px]">
              {selectedColor.name}
            </p>
          </div>
          <div className="text-right">
            <span className="text-gray-400 line-through text-[11px] block">
              ${oldPrice}
            </span>
            <span className="text-[13px] font-semibold text-gray-800">
              ${newPrice}
            </span>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 mt-2">
          {colors.map((color, idx) => (
            <span
              key={idx}
              onClick={() => setSelectedColor(color)}
              className={`w-4 h-4 rounded-full border border-gray-300 cursor-pointer transition ${
                selectedColor.code === color.code ? "ring-2 ring-gray-700" : ""
              }`}
              style={{ backgroundColor: color.code }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
