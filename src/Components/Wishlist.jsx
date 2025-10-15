import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Return from "../assets/Return.png";
import wishlistempty from "../assets/wishlistempty.png";
import { Link } from "react-router-dom";
import { userInfo, ApiURL } from "../Variable";
import axiosInstance from "../Axios/axios";
import { getGuestId } from "../utils/guest";
import toast from "react-hot-toast";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from backend

  const fetchWishlist = async () => {
    const identifier = userInfo?.u_id || getGuestId();
    const query = userInfo?.u_id
      ? `u_id=${identifier}`
      : `guest_id=${identifier}`;

    const response = await axiosInstance.get(`/getwishlist?${query}`);

    if (response.data.status === 1) {
      console.log("Wishlist items:", response.data.data);
      setWishlistItems(response.data.data);
    } else {
      console.log("Wishlist empty or error:", response.data.message);
      setWishlistItems([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
    setLoading(false);
  }, []);

  // Remove from wishlist
  const handleRemove = async (w_id) => {
    try {
      const response = await axiosInstance.post("/removewishlist", {
        w_id,
      });
      if (response.data.status === 1) {
        setWishlistItems((prev) => prev.filter((item) => item.w_id !== w_id));
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing wishlist item:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleMoveToCart = async (item) => {
    try {
      const identifier = userInfo?.u_id || getGuestId();

      const payload = {
        p_id: item.p_id,
        sc_id: item.sc_id,
        size_id: item.size_id,
        pcolor_id: item.pcolor_id,
        quantity: 1,
        ...(userInfo?.u_id
          ? { u_id: userInfo.u_id }
          : { guest_id: identifier }),
      };

      // Add to cart API
      const cartResponse = await axiosInstance.post("/createcart", payload);

      if (cartResponse.data.status === 1) {
        toast.success("Item moved to cart!");
        // Optionally remove from wishlist
        await handleRemove(item.w_id);
      } else {
        toast.error(cartResponse.data.message || "Failed to move to cart");
      }
    } catch (error) {
      console.error("Error moving item to cart:", error);
      toast.error("Failed to move item to cart");
    }
  };

  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10 flex flex-col">
      {loading ? (
        <p className="text-center text-gray-600 mt-10">Loading...</p>
      ) : wishlistItems.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {wishlistItems?.map((item) => (
                <div
                  key={item.w_id}
                  className="bg-white rounded-2xl flex flex-col md:flex-row gap-4 p-4 mb-4 shadow-sm relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.w_id)}
                    className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
                  >
                    <X size={18} />
                  </button>

                  {/* Product Image */}
                  <div className="flex items-center justify-center">
                    <img
                      src={`${ApiURL}/assets/Products/${item.images[0]}`}
                      alt={item.product_name}
                      className="w-40 h-60 md:w-28 md:h-40 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col flex-1 gap-2 justify-center">
                    <div>
                      <h3 className="text-xl font-medium">
                        {item.product_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}{" "}
                        <span className="line-through text-gray-400 text-sm">
                          ${item.original_price.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Color: {item.color.color_name}
                      </p>
                    </div>
                  </div>
                  {/* Move to Cart Button */}
                  <div className="flex items-center md:ml-4">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="border px-3 py-2 text-sm rounded-md hover:bg-[#02382A] hover:text-white whitespace-nowrap cursor-pointer"
                    >
                      MOVE TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // ✅ Empty Wishlist Design
        <div className="bg-[#F3F0ED] h-screen flex items-center justify-center p-4 w-full">
          <div className="text-center">
            <div className="w-40 h-24 md:w-[300px] md:h-[200px] mx-auto">
              <img
                src={wishlistempty}
                alt="Empty Wishlist"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="xl:text-[34px] text-[24px] text-black font-bold mt-5">
              Your Wishlist Is Empty.
            </h1>
            <p className="text-[#807D7E] text-[14px] text-center max-w-md mx-auto mt-2">
              You don’t have any products in the wishlist yet. You will find a
              lot of interesting products on our Shop page.
            </p>
            <div className="text-center bg-[#02382A] text-white px-4 py-1.5 rounded-[8px] w-fit mt-5 mx-auto">
              <Link to="/shop">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
