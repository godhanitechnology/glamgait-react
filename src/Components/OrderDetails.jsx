import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import axiosInstance from "../Axios/axios";
import { ApiURL, userInfo } from "../Variable";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const user = userInfo();
  const u_id = user?.u_id;

  const [order, setOrder] = useState(null);

  // Status map
  const statusMap = {
    1: "Pending",
    2: "Accepted",
    3: "Preparing",
    4: "Shipped",
    5: "Delivered",
    6: "Cancelled",
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!u_id || !orderId) return;

      try {
        const res = await axiosInstance.get(
          `${ApiURL}/getorder/${u_id}/${orderId}`
        );
        setOrder(res.data.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setOrder(null);
      }
    };

    fetchOrderDetails();
  }, [u_id, orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading order details...
      </div>
    );
  }

  // Progress bar width logic
  const progressPercent =
    order.status === 6 ? 100 : ((order.status - 1) / 4) * 100; // since 5 = Delivered

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
              Order no: <span className="font-normal">#{order.orderId}</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Placed on:{" "}
              <span className="text-gray-700">{order.date || "N/A"}</span>
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Status:{" "}
              <span
                className={`font-semibold ${
                  order.status === 6 ? "text-red-500" : "text-[#00382e]"
                }`}
              >
                {statusMap[order.status]}
              </span>
            </p>
          </div>

          <div className="text-sm sm:text-base text-gray-700">
            <p>
              Total:{" "}
              <span className="font-semibold">
                ₹{order.totalPrice.toFixed(2)}
              </span>
            </p>
            <p>
              Shipping:{" "}
              <span className="font-semibold">
                ₹{order.shippingCharge.toFixed(2)}
              </span>
            </p>
            <p>
              Tax:{" "}
              <span className="font-semibold">₹{order.tax.toFixed(2)}</span>
            </p>
            <p>
              Grand Total:{" "}
              <span className="font-semibold">
                ₹{order.grandTotal.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="w-full mb-10">
          <div className="relative">
            {/* Step indicators */}
            <div className="relative z-20 flex justify-between items-center">
              {Object.entries(statusMap)
                .filter(([key]) => key !== "6")
                .map(([key, label]) => {
                  const isActive =
                    order.status >= Number(key) && order.status !== 6;
                  return (
                    <div
                      key={key}
                      className="flex flex-col items-center text-center relative z-30"
                    >
                      <div
                        className={`w-5 h-5 rounded-full mb-2 transition-all duration-300 ${
                          order.status === 6
                            ? "bg-red-500"
                            : isActive
                            ? "bg-[#00382e]"
                            : "bg-gray-300"
                        }`}
                      />
                      <p
                        className={`text-[10px] sm:text-xs md:text-sm font-medium ${
                          order.status === 6
                            ? "text-red-500"
                            : isActive
                            ? "text-gray-800"
                            : "text-gray-400"
                        }`}
                      >
                        {label}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Background line */}
            <div className="absolute top-[10px] left-[32px] right-[32px] h-[2px] bg-gray-200 z-10" />

            {/* Active progress line */}
            <div
              className={`absolute top-[10px] left-[32px] h-[2px] ${
                order.status === 6 ? "bg-red-500" : "bg-[#00382e]"
              } z-20 transition-all duration-500`}
              style={{
                width:
                  order.status === 6
                    ? "100%"
                    : `calc((100% - 20px) * ${progressPercent / 100})`,
              }}
            />
          </div>

          <div className="mt-6 bg-white p-3 sm:p-5 rounded-md text-xs sm:text-sm text-gray-700 shadow-sm">
            <p>
              Current status:{" "}
              <span
                className={`font-semibold ${
                  order.status === 6 ? "text-red-500" : "text-[#00382e]"
                }`}
              >
                {statusMap[order.status]}
              </span>
            </p>
            {order.status === 6 && (
              <p className="text-red-500 text-xs mt-1">
                This order has been cancelled.
              </p>
            )}
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
          {order.orderItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500 text-sm">
              No products in this order.
            </div>
          ) : (
            order.orderItems.map((item) => (
              <div
                key={item.orderItemId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={`${ApiURL}/assets/Products/${item.imageUrl}`}
                    alt={item.productName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item.productName}
                    </h3>
                    {item.color && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        <span className="font-medium">Color:</span>{" "}
                        <span className="text-gray-800">
                          {item.color?.color_name}
                        </span>
                      </p>
                    )}
                    {item.size && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        <span className="font-medium">Size:</span>{" "}
                        <span className="text-gray-800">{item.size}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto text-sm sm:text-base text-gray-700">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-semibold">Qty:</span>
                    <span>{item.quantity}</span>
                  </div>
                  <span className="font-semibold text-gray-800 ml-4">
                    ₹{item.price.toFixed(2)}
                  </span>
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
