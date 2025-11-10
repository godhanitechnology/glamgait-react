import React, { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import cartempty from "../assets/cartempty.png";
import axiosInstance from "../Axios/axios";
import { ApiURL, userInfo } from "../Variable";
import { getGuestId } from "../utils/guest";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const user = userInfo();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!user?.u_id && !!user?.auth_token;

  const fetchCart = async () => {
    try {
      const identifier = user?.u_id || getGuestId();
      const query = user?.u_id
        ? `u_id=${identifier}`
        : `guest_id=${identifier}`;

      const response = await axiosInstance.get(`/getcart?${query}`);
      if (response.data.status === 1) {
        setCartItems(response.data.data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateCartQty = async (cart_id, quantity) => {
    try {
      const payload = { cart_id, quantity };
      const response = await axiosInstance.post("/updatecart", payload);
      if (response.data.status === 1) {
        fetchCart();
      } else {
        console.log(response.data.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Update cart error:", error);
    }
  };

  // Remove item
  const handleRemove = async (cart_id) => {
    try {
      const response = await axiosInstance.post("/removecart", {
        cart_id,
      });
      if (response.data.status === 1) {
        setCartItems((prev) => prev.filter((item) => item.cart_id !== cart_id));
        toast.success("Item removed from cart");
      } else {
        console.log(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  // Increase/decrease quantity
  const increaseQty = (cart_id, currentQty) =>
    updateCartQty(cart_id, currentQty + 1);
  const decreaseQty = (cart_id, currentQty) => {
    if (currentQty > 1) updateCartQty(cart_id, currentQty - 1);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      console.log("Please log in to proceed to checkout");
      navigate("/login");
      return;
    }
    if (!cartItems.length) {
      console.log("Cart is empty");
      return;
    }
    navigate("/selectaddress", { state: { cartItems } });
  };

  // Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxes = 25;
  const delivery = 0;
  const grandTotal = subtotal + taxes + delivery;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F3F0ED] h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <img src={cartempty} alt="" className="mx-auto w-48 h-48" />
          <h1 className="text-2xl font-bold mt-5">Your Cart Is Empty.</h1>
          <p className="text-gray-500 text-sm mt-2">
            You don’t have any products in your cart yet. Start exploring our
            Shop page!
          </p>
          <div className="mt-5">
            <Link
              to="/shop"
              className="bg-[#02382A] text-white px-6 py-2 rounded-md hover:bg-[#052d25]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {cartItems?.map((item) => (
            <div
              key={item.cart_id}
              className="bg-white rounded-2xl flex flex-col md:flex-row gap-4 p-4 mb-4 shadow-sm relative"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.cart_id)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Image */}
              <div className="flex justify-center md:block">
                <img
                  src={`${ApiURL}/assets/Products/${item.images[0]}`}
                  alt={item.product_name}
                  className="w-40 h-60 md:w-28 md:h-40 object-cover rounded-lg md:ml-6"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col  flex-1 justify-center">
                <div>
                  <h3 className="text-md font-medium">{item.product_name}</h3>
                  <p className="text-sm text-gray-500">
                   ₹{item.price.toFixed(2)}{" "}
                    <span className="line-through text-gray-400 text-sm">
                     ₹{item.original_price.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Color: {item.color?.color_name}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm">Qty:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => decreaseQty(item.cart_id, item.quantity)}
                        className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.cart_id, item.quantity)}
                        className="px-2 py-1 text-gray-600 hover:text-black cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full lg:w-1/3 h-fit">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-2">Enter Discount Code</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="OFFER50"
                className="border border-gray-300 rounded-md flex-1 px-3 py-2 text-sm"
              />
              <button className="bg-[#063d32] text-white px-4 py-2 rounded-md text-sm cursor-pointer">
                APPLY
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <span>Taxes</span>
            <span>₹{taxes.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Delivery Fee</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full mt-6 bg-[#063d32] text-white py-3 rounded-md hover:bg-white hover:text-[#02382A] border border-[#02382A] cursor-pointer"
            onClick={handleCheckout}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
