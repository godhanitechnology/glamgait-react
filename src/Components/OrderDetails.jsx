import React, { useState } from "react";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const OrderDetails = () => {
  const navigate = useNavigate();

  // Step progress setup
  const steps = ["Order Placed", "Inprogress", "Shipped", "Delivered"];
  const currentStatus = "Shipped";
  const currentStepIndex = steps.indexOf(currentStatus);
  const progressPercent =
    currentStepIndex === -1
      ? 0
      : (currentStepIndex / (steps.length - 1)) * 98;
  const dotHalfPx = 10;

  // ✅ Dynamic product list (for cross functionality)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Printed white coat",
      color: "White",
      qty: 1,
      price: 29.0,
      img: c1,
    },
    {
      id: 2,
      name: "Men Blue Shirt",
      color: "Blue",
      qty: 1,
      price: 29.0,
      img: c2,
    },
  ]);

  // ✅ Remove product handler
  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-[#f3f0ed] min-h-screen flex flex-col md:flex-row font-inter">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 md:sticky md:top-0 md:h-screen">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 bg-[#f3f0ed]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <ChevronLeft
            className="cursor-pointer"
            size={22}
            onClick={() => navigate("/myorders")}
          />
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
            Order Details
          </h2>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Order no: <span className="font-normal">#123456789</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Placed on:{" "}
              <span className="text-gray-700">2 June 2023, 2:40 PM</span>
            </p>
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            Total:{" "}
            <span className="font-semibold">
              $
              {products
                .reduce((sum, p) => sum + p.price * p.qty, 0)
                .toFixed(2)}
            </span>
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="w-full mb-10">
          <div className="relative">
            {/* Steps */}
            <div className="relative z-20 flex justify-between items-center">
              {steps.map((step, i) => {
                const isActive = i <= currentStepIndex;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center relative z-30"
                  >
                    <div
                      className={`w-5 h-5 rounded-full mb-2 ${isActive ? "bg-[#00382e]" : "bg-gray-300"
                        }`}
                    />
                    <p
                      className={`text-[10px] sm:text-xs md:text-sm font-medium ${isActive ? "text-gray-800" : "text-gray-400"
                        }`}
                    >
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Light background line */}
          <div className="absolute top-[10px] left-[32px] right-[32px] h-[2px] bg-gray-200 z-10" />


            {/* Dark active line */}
            <div
              className="absolute top-[10px] left-[32px] h-[2px] bg-[#00382e] z-20 transition-all duration-500"
              style={{
                width: `calc((100% - 20px) * ${progressPercent / 100})`,
              }}
            />
          </div>

          {/* Progress Note */}
          <div className="mt-6 bg-white p-3 sm:p-5 rounded-md text-xs sm:text-sm text-gray-700 shadow-sm">
            <p>
              <span className="font-medium">8 June 2023, 3:40 PM —</span> Your
              order is currently{" "}
              <span className="font-semibold">{currentStatus}</span>.
            </p>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
          {products.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No products remaining in this order.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4"
              >
                {/* Left: Image + Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      <span className="font-medium">Color:</span>{" "}
                      <span className="text-gray-800">{product.color}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Qty, Price & Delete */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto text-sm sm:text-base text-gray-700">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-semibold">Qty:</span>
                    <span>{product.qty}</span>
                  </div>

                  <span className="font-semibold text-gray-800 ml-4">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleRemove(product.id)}
                    className="ml-4 text-gray-400 hover:text-red-600 text-lg sm:text-xl transition-all"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
