// ReviewCard.jsx
import React from "react";

// Assets (update these with actual paths)
import pattern from "../assets/pattern.png";
import quoteLeft from "../assets/quoteLeft.png";
import rightlight from "../assets/rightlight.png";

const ReviewCard = ({ name, review, image }) => {
  return (
    <div className="relative w-[300px] h-50 sm:w-[350px] md:w-[400px] 2xl:w-[700px] 2xl:h-[400px] rounded-xl bg-white overflow-hidden flex items-center justify-items-center">
      {/* Pattern (Left Side) */}
      <img
        src={pattern}
        alt="Pattern"
        className="absolute left-0 top-0 h-50 w-50 2xl:h-[400px] 2xl:w-[400px] z-0"
      />
      {/* Quote Icons */}
      <img
        src={quoteLeft}
        alt="Quote Left"
        className="absolute left-10 top-20 2xl:left-30 2xl:top-48 w-6 2xl:w-10 z-10"
      />
      <img
        src={quoteLeft}
        alt="Quote Right"
        className="absolute right-14 top-6 2xl:right-20 2xl:top-14 w-14 2xl:w-25 -scale-x-90 opacity-10 z-10"
      />
      {/* Light Overlay (Right Side) */}
      <img
        src={rightlight}
        alt="Light Overlay"
        className="absolute right-3 -top-5 h-30 w-14 2xl:h-60 2xl:w-28 z-0"
      />

      <div className="relative justify-items-center z-20 p-8">
        <div className="flex items-center gap-3 mb-2">
          <img
            src={image}
            alt={name}
            className="w-10 h-10 sm:w-12 sm:h-12 2xl:w-20 2xl:h-20 rounded-full object-cover border-2 border-gray-200"
          />
        </div>
          <div>
            <p className="text-sm sm:text-base 2xl:text-[24px] font-semibold text-gray-800 mb-2">{name}</p>
          </div>
        <p className="text-[12px] xl:text-[14px] 2xl:text-[20px] text-center text-gray-600 leading-relaxed line-clamp-3 md:px-4 2xl:px-8">
          {review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;