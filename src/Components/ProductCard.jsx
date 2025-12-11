// import React, { useEffect, useState } from "react";
// import { Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useCallback } from "react";
// import { ApiURL, userInfo } from "../Variable";
// import axiosInstance from "../Axios/axios";
// import toast from "react-hot-toast";
// import { getGuestId } from "../utils/guest";
// import RatingBadge from "./RatingBadge";

// const ProductCard = ({ product }) => {
//   const [selectedColor, setSelectedColor] = useState(product.productcolors[0]);
//   const [isWished, setIsWished] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);

//   const user = userInfo();

//   const navigate = useNavigate();

//   const handleCardClick = useCallback(() => {
//     navigate(`/product/${product.p_id}`);
//   }, [navigate, product.p_id]);

//   const discount =
//     product?.original_price && product?.original_price > product?.price
//       ? product.original_price - product.price
//       : 0;
//   useEffect(() => {
//     const checkWishlist = async () => {
//       if (!product.p_id || !selectedColor?.pcolor_id) return;

//       try {
//         const identifier = user?.u_id || getGuestId();
//         const query = user?.u_id
//           ? `u_id=${identifier}`
//           : `guest_id=${identifier}`;
//         const res = await axiosInstance.get(`/getwishlist?${query}`);

//         if (res.data.status === 1) {
//           const wishedItem = res.data.data.find(
//             (item) =>
//               item.p_id === product.p_id &&
//               item.pcolor_id === selectedColor.pcolor_id
//           );

//           if (wishedItem) {
//             setIsWished(true);
//             setWishlistId(wishedItem.w_id);
//           } else {
//             setIsWished(false);
//             setWishlistId(null);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to check wishlist", err);
//       }
//     };

//     checkWishlist();
//   }, [product.p_id, selectedColor?.pcolor_id, user]);

//   const toggleWishlist = async (e) => {
//     e.stopPropagation();

//     try {
//       if (isWished && wishlistId) {
//         // Remove from wishlist using w_id
//         const res = await axiosInstance.post("/removewishlist", {
//           w_id: wishlistId,
//         });

//         if (res.data.status === 1) {
//           setIsWished(false);
//           setWishlistId(null);
//           toast.success("Removed from wishlist");
//         }
//       } else {
//         // Add to wishlist
//         const firstSizeId = product.productsizes?.[0]?.size_id || null;
//         const payload = {
//           u_id: user?.u_id || null,
//           guest_id: !user?.u_id ? getGuestId() : null,
//           p_id: product.p_id,
//           sc_id: product.sc_id,
//           pcolor_id: selectedColor.pcolor_id,
//           size_id: firstSizeId,
//         };

//         const res = await axiosInstance.post("/addtowishlist", payload);

//         if (res.data.status === 1) {
//           // Extract w_id from response (adjust path as per your API)
//           const newWishlistItem = res.data.data || res.data.wishlist;
//           setWishlistId(newWishlistItem?.w_id || newWishlistItem?.id);
//           setIsWished(true);
//           toast.success("Added to wishlist");
//         }
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-[220px] md:w-full bg-[#F3F0ED] rounded-xl overflow-hidden relative hover:shadow-md duration-300 mx-auto z-10">
//       {/* Discount Badge */}
//       {discount > 0 && (
//         <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-[2px] rounded-sm z-10">
//           ₹{discount} OFF
//         </div>
//       )}
//       {/* Heart Icon */}
//       <button
//         className="absolute top-2 right-2 p-1 rounded-full hover:scale-110 transition z-10"
//         onClick={toggleWishlist}
//       >
//         <Heart
//           size={20}
//           className={`transition-all duration-300 ${
//             isWished
//               ? "fill-red-500 text-red-500 "
//               : "text-gray-600 hover:text-red-500"
//           } `}
//         />{" "}
//       </button>

//       {/* Product Image */}
//       <img
//         src={`${ApiURL}/assets/Products/${selectedColor?.productimages[0].image_url}`}
//         alt={product?.name}
//         className="w-full h-[300px] md:h-[350px] object-cover"
//         onClick={handleCardClick}
//       />

//       {/* Product Info */}
//       <div className="px-3 pt-2 pb-4 bg-[#F3F0ED] h-[150px]">
//         {/* Title and Price Row */}
//         <div className="flex flex-col items-start mb-1 space-y-1">
//           <div>
//             <h3 className="text-[16px] font-medium text-gray-800 leading-4 line-clamp-1">
//               {product?.name}
//             </h3>
//             <p className="text-[11px] text-gray-500 mt-0.5">
//               {selectedColor.name}
//             </p>
//           </div>
//           <div className="text-left">
//             <span className="text-gray-400 line-through text-[11px] block">
//               ₹{product?.original_price}
//             </span>
//             <span className="text-[14px] font-semibold text-gray-800">
//               ₹{product?.price}
//             </span>
//           </div>
//           {/* Dynamic Rating & Review Count */}
//           <RatingBadge p_id={product.p_id} />
//         </div>

//         {/* Color Swatches */}
//         <div className="flex items-center gap-2 mt-2">
//           {product?.productcolors?.map((color) => (
//             <span
//               key={color?.pcolor_id}
//               onClick={() => setSelectedColor(color)}
//               className={`w-4 h-4 rounded-full border border-gray-300 cursor-pointer transition ${
//                 selectedColor.color?.color_code === color?.color?.color_code
//                   ? "ring-2 ring-gray-700"
//                   : ""
//               }`}
//               style={{ backgroundColor: color.color.color_code }}
//             ></span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React, { useEffect, useState, useCallback } from "react";
// import { Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { ApiURL, userInfo } from "../Variable";
// import axiosInstance from "../Axios/axios";
// import toast from "react-hot-toast";
// import { getGuestId } from "../utils/guest";
// import RatingBadge from "./RatingBadge";

// const ProductCard = ({ product }) => {
//   console.log(product, "product");

//   const [selectedColor, setSelectedColor] = useState(product.productcolors[0]);
//   const [isWished, setIsWished] = useState(false);
//   const [wishlistId, setWishlistId] = useState(null);

//   const user = userInfo();
//   const navigate = useNavigate();

//   const handleCardClick = useCallback(() => {
//     navigate(`/product/${product.p_id}`);
//   }, [navigate, product.p_id]);

//   const discount =
//     product?.original_price && product?.original_price > product?.price
//       ? product.original_price - product.price
//       : 0;

//   // Check if this exact variant (p_id + pcolor_id + any size) is in wishlist
//   useEffect(() => {
//     const checkWishlist = async () => {
//       if (!product.p_id || !selectedColor?.pcolor_id) return;

//       try {
//         const identifier = user?.u_id || getGuestId();
//         const query = user?.u_id
//           ? `u_id=${identifier}`
//           : `guest_id=${identifier}`;
//         const res = await axiosInstance.get(`${ApiURL}/getwishlist?${query}`);

//         if (res.data.status === 1) {
//           const wishedItem = res.data.data.find(
//             (item) =>
//               item.p_id === product.p_id &&
//               item.pcolor_id === selectedColor.pcolor_id
//           );

//           setIsWished(!!wishedItem);
//           setWishlistId(wishedItem?.w_id || null);
//         }
//       } catch (err) {
//         console.error("Wishlist check failed", err);
//       }
//     };

//     checkWishlist();
//   }, [product.p_id, selectedColor?.pcolor_id, user]);

//   // Toggle Wishlist
//   const toggleWishlist = async (e) => {
//     e.stopPropagation();

//     if (!selectedColor?.pcolor_id) {
//       toast.error("Please select a color");
//       return;
//     }

//     try {
//       if (isWished && wishlistId) {
//         // Remove from wishlist
//         const res = await axiosInstance.post(`${ApiURL}/removewishlist`, {
//           w_id: wishlistId,
//         });

//         if (res.data.status === 1) {
//           setIsWished(false);
//           setWishlistId(null);
//           toast.success("Removed from wishlist");
//         }
//       } else {
//         // Add to wishlist
//         const payload = {
//           u_id: user?.u_id || null,
//           guest_id: user?.u_id ? null : getGuestId(),
//           p_id: product.p_id,
//           sc_id: product.sc_id,
//           pcolor_id: selectedColor.pcolor_id,
//           psize_id: null, // Optional: you can allow size selection later
//         };

//         const res = await axiosInstance.post(
//           `${ApiURL}/addtowishlist`,
//           payload
//         );

//         if (res.data.status === 1) {
//           const newItem = res.data.data || res.data.wishlist;
//           setWishlistId(newItem?.w_id);
//           setIsWished(true);
//           toast.success("Added to wishlist");
//         } else {
//           toast.error(res.data.description || "Already in wishlist");
//         }
//       }
//     } catch (err) {
//       toast.error("Wishlist action failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-[220px] md:w-full bg-[#F3F0ED] rounded-xl overflow-hidden relative hover:shadow-md duration-300 mx-auto z-10 cursor-pointer">
//       {/* Discount Badge */}
//       {discount > 0 && (
//         <div className="absolute top-2 left-2 bg-red-500 text-white text-[11px] font-semibold px-2 py-[2px] rounded-sm z-10">
//           ₹{discount} OFF
//         </div>
//       )}

//       {/* Wishlist Heart */}
//       <button
//         onClick={toggleWishlist}
//         className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:scale-110 transition z-20"
//       >
//         <Heart
//           size={20}
//           className={`transition-all duration-300 ${
//             isWished
//               ? "fill-red-500 text-red-500 scale-110"
//               : "text-gray-600 hover:text-red-500"
//           }`}
//         />
//       </button>

//       {/* Product Image */}
//       <div onClick={handleCardClick}>
//         <img
//           src={`${ApiURL}/assets/Products/${selectedColor?.productimages[0]?.image_url}`}
//           alt={product?.name}
//           className="w-full h-[300px] md:h-[350px] object-cover"
//           onError={(e) => {
//             e.target.src = "https://via.placeholder.com/300x350?text=No+Image";
//           }}
//         />
//       </div>

//       {/* Product Info */}
//       <div
//         className="px-3 pt-2 pb-4 bg-[#F3F0ED] h-[150px]"
//         onClick={handleCardClick}
//       >
//         <div className="flex flex-col items-start mb-1 space-y-1">
//           <div>
//             <h3 className="text-[16px] font-medium text-gray-800 leading-4 line-clamp-1">
//               {product?.name}
//             </h3>
//             <p className="text-[11px] text-gray-500 mt-0.5">
//               {selectedColor?.color?.color_name || "Color"}
//             </p>
//           </div>
//           <div className="text-left">
//             {product?.original_price > product?.price && (
//               <span className="text-gray-400 line-through text-[11px] block">
//                 ₹{product?.original_price}
//               </span>
//             )}
//             <span className="text-[14px] font-semibold text-gray-800">
//               ₹{product?.price}
//             </span>
//           </div>
//           <RatingBadge p_id={product.p_id} />
//         </div>

//         {/* Color Swatches */}
//         <div className="flex items-center gap-2 mt-2">
//           {product?.productcolors?.map((color) => (
//             <button
//               key={color.pcolor_id}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setSelectedColor(color);
//               }}
//               className={`w-6 h-6 rounded-full border-2 transition-all ${
//                 selectedColor?.pcolor_id === color.pcolor_id
//                   ? "border-black scale-110"
//                   : "border-gray-300 hover:border-gray-600"
//               }`}
//               style={{ backgroundColor: color.color?.color_code || "#ccc" }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React, { useEffect, useState, useCallback } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ApiURL, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";
import toast from "react-hot-toast";
import { getGuestId } from "../utils/guest";
import RatingBadge from "./RatingBadge";

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(product.productcolors[0]);
  const [isWished, setIsWished] = useState(false);
  const [wishlistId, setWishlistId] = useState(null);

  const user = userInfo();
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    // navigate(`/product/${product.p_id}`);
    navigate(
      `/product?p_id=${product.p_id}&name=${product.name.replace(/\s+/g, "-")}`
    );
  }, [navigate, product.p_id]);

  const discount =
    product?.original_price && product?.original_price > product?.price
      ? product.original_price - product.price
      : 0;

  // Check wishlist status
  useEffect(() => {
    const checkWishlist = async () => {
      if (!product.p_id || !selectedColor?.pcolor_id) return;

      try {
        const identifier = user?.u_id || getGuestId();
        const query = user?.u_id
          ? `u_id=${identifier}`
          : `guest_id=${identifier}`;
        const res = await axiosInstance.get(`${ApiURL}/getwishlist?${query}`);

        if (res.data.status === 1) {
          const wishedItem = res.data.data.find(
            (item) =>
              item.p_id === product.p_id &&
              item.pcolor_id === selectedColor.pcolor_id
          );
          setIsWished(!!wishedItem);
          setWishlistId(wishedItem?.w_id || null);
        }
      } catch (err) {
        console.error("Wishlist check failed", err);
      }
    };
    checkWishlist();
  }, [product.p_id, selectedColor?.pcolor_id, user]);

  // Toggle Wishlist – NOW SELECTS FIRST SIZE IF AVAILABLE
  const toggleWishlist = async (e) => {
    e.stopPropagation();

    if (!selectedColor?.pcolor_id) {
      toast.error("Please select a color");
      return;
    }

    try {
      if (isWished && wishlistId) {
        // Remove from wishlist
        const res = await axiosInstance.post(`${ApiURL}/removewishlist`, {
          w_id: wishlistId,
        });

        if (res.data.status === 1) {
          setIsWished(false);
          setWishlistId(null);
          toast.success("Removed from wishlist");
        }
      } else {
        // Add to wishlist — AUTO SELECT FIRST SIZE IF EXISTS
        const firstSize = product.productsizes?.[0];
        const psize_id = firstSize?.psize_id || null; // Use psize_id from productsizes

        const payload = {
          u_id: user?.u_id || null,
          guest_id: user?.u_id ? null : getGuestId(),
          p_id: product.p_id,
          sc_id: product.sc_id,
          pcolor_id: selectedColor.pcolor_id,
          psize_id: psize_id, // ← NOW CORRECTLY SENDS psize_id
        };

        const res = await axiosInstance.post(
          `${ApiURL}/addtowishlist`,
          payload
        );

        if (res.data.status === 1) {
          const newItem = res.data.data || res.data.wishlist;
          setWishlistId(newItem?.w_id);
          setIsWished(true);
          toast.success("Added to wishlist");
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
          <RatingBadge p_id={product.p_id} />
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
