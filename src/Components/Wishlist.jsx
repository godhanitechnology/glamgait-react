import React, { useState } from "react";
import { X } from "lucide-react";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import Return from "../assets/Return.png";
// import Heart from "../assets/heart.png";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Diamond Pearl Engagement Ring",
      price: 160,
      oldPrice: 170,
      color: "Silver",
      returnDays: 15,
      deliveryDate: "Feb 25, 2025",
      image: c1,
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
    },
  ]);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10 flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">My Wishlist</h2>

      {wishlistItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl flex flex-col md:flex-row gap-4 p-4 mb-4 shadow-sm relative"
              >
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-black"
                >
                  <X size={18} />
                </button>

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-32 h-40 object-cover rounded-lg"
                />

                {/* Product Info */}
                <div className="flex flex-col flex-1 gap-2">
                  <div>
                    <h3 className="text-md font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}{" "}
                      <span className="line-through text-gray-400 text-sm">
                        ${item.oldPrice.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  </div>

                  {/* Delivery and Return Info */}
                  <div className="text-sm text-gray-600 space-y-1">
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

                {/* Move to Cart Button */}
                <div className="flex items-center md:ml-4">
                  <button className="border px-3 py-2 text-sm rounded-md hover:bg-gray-100 whitespace-nowrap">
                    MOVE TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Empty Wishlist Section
        <div className="flex flex-col items-center justify-center flex-1 sm:mb-40 mb-32">
          <div className="bg-white rounded-full p-6 shadow-sm mb-4">
            {/* <img src={Heart} alt="Empty Heart" className="w-10 h-10" /> */}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Your wishlist is empty.
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-md mb-6">
            You don’t have any products in your wishlist yet. You’ll find lots
            of interesting products on our Shop page.
          </p>
          <button className="bg-[#0d3b2e] text-white px-5 py-2 rounded-md hover:bg-[#0b3126] transition">
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
