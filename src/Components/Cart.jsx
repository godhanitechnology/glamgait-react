import React, { useState } from "react";
import { X, Check, Plus, Minus, ShoppingBag } from "lucide-react";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import Return from "../assets/Return.png";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Diamond Pearl Engagement Ring",
      price: 160,
      oldPrice: 170,
      color: "Silver",
      returnDays: 15,
      deliveryDate: "Feb 25, 2025",
      image: c1,
      quantity: 1,
      selected: true,
    },
    {
      id: 2,
      name: "Rose Gold Lotus Necklace",
      price: 200,
      oldPrice: 220,
      color: "Gold",
      returnDays: 15,
      deliveryDate: "Feb 25, 2025",
      image: c2,
      quantity: 1,
      selected: true,
    },
  ]);

  // Remove item
  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Toggle selection (tick)
  const toggleSelect = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Increase quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const selectedCount = cartItems.filter((item) => item.selected).length;
  const subtotal = cartItems
    .filter((item) => item.selected)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const taxes = 25;
  const delivery = 0;
  const grandTotal = subtotal + taxes + delivery;

  // ✅ Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f0ed] px-4 pb-32">
        <div className="bg-white rounded-full p-6 shadow-sm mb-4">
          <ShoppingBag className="w-10 h-10 text-[#0d3b2e]" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Your cart is empty.
        </h3>
        <p className="text-sm text-gray-500 text-center max-w-md mb-6">
          You don’t have any products in your cart yet. Start exploring our
          collections and add your favorite items!
        </p>
        <button className="bg-[#0d3b2e] text-white px-5 py-2 rounded-md hover:bg-[#0b3126] transition">
          Continue Shopping
        </button>
      </div>
    );
  }

  // 🛍️ Normal Cart Layout
  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          {/* ✅ Select All Section */}
          <div className="flex items-center gap-2 mb-4">
            <div
              onClick={() =>
                setCartItems((prev) =>
                  prev.map((item) => ({
                    ...item,
                    selected: selectedCount !== cartItems.length,
                  }))
                )
              }
              className={`w-5 h-5 flex items-center justify-center border rounded cursor-pointer transition ${
                selectedCount === cartItems.length
                  ? "bg-[#063d32] border-[#063d32]"
                  : "border-gray-400"
              }`}
            >
              {selectedCount === cartItems.length && (
                <Check size={14} className="text-white" />
              )}
            </div>
            <span className="text-sm text-gray-700">
              {selectedCount}/{cartItems.length} Items Selected
            </span>
          </div>

          {/* 🛒 Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl flex flex-col md:flex-row gap-4 p-4 mb-4 shadow-sm relative"
            >
              {/* Remove Button (Desktop only) */}
              <button
                onClick={() => handleRemove(item.id)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black hidden md:block"
              >
                <X size={18} />
              </button>

              {/* Select Checkbox */}
              <div
                onClick={() => toggleSelect(item.id)}
                className={`absolute top-3 left-3 w-5 h-5 flex items-center justify-center border rounded cursor-pointer transition ${
                  item.selected
                    ? "bg-[#063d32] border-[#063d32]"
                    : "border-gray-400"
                }`}
              >
                {item.selected && <Check size={14} className="text-white" />}
              </div>
              {/* Product Image */}
              <div className="flex justify-center md:block">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-60 md:w-28 md:h-40 object-cover rounded-lg md:ml-6"
                />
              </div>
              {/* Product Info */}
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-md font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.price.toFixed(2)}{" "}
                    <span className="line-through text-gray-400 text-sm">
                      ${item.oldPrice.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">Color: {item.color}</p>

                  {/* Quantity Buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm">Qty:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 text-gray-600 hover:text-black"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 text-gray-600 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Delivery and Return Info */}
                <div className="mt-3 text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <img src={Return} alt="Return Icon" className="w-4 h-4" />
                    <p>{item.returnDays} Days return available</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <img src={Box} alt="Delivery Icon" className="w-4 h-4" /> */}
                    <p>Delivered by {item.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* ✅ Wishlist + Cross Button on Mobile */}
              <div className="flex items-center justify-between md:justify-start md:gap-2 mt-2 md:mt-0">
                <button className="border px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                  MOVE TO WISHLIST
                </button>

                {/* Cross Icon only visible on mobile */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-gray-600 hover:text-black md:hidden ml-3"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full lg:w-1/3 h-fit">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-2">Enter Discount Code</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="OFFER50"
                className="border border-gray-300 rounded-md flex-1 px-3 py-2 text-sm"
              />
              <button className="bg-[#063d32] text-white px-4 py-2 rounded-md text-sm hover:bg-[#052d25]">
                APPLY
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <span>Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Delivery Fee</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full mt-6 bg-[#063d32] text-white py-3 rounded-md hover:bg-[#052d25]"
            onClick={() => navigate("/selectaddress")}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
