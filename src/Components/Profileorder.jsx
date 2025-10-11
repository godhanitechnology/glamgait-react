import React, { useState } from "react";
import c1 from "../assets/c1.jpg";
import c2 from "../assets/c2.jpg";
import c3 from "../assets/c3.jpg"; // ✅ you can reuse or replace
import c4 from "../assets/c4.jpg"; // ✅ you can reuse or replace
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

const Profileorder = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const navigate = useNavigate();

  const tabs = ["Active", "Cancelled", "Completed"];

  const orders = [
    // ✅ Active Orders (2)
    {
      id: "#123456789",
      date: "2 June 2023 2:40 PM",
      delivery: "8 June 2023",
      status: "Active",
      method: "Cash on delivery",
      img: c1,
      title: "Black Printed T-shirt",
      colour: "Pink",
      qty: 1,
      total: "$23.00",
    },
    {
      id: "#987654321",
      date: "2 June 2023 2:40 PM",
      delivery: "8 June 2023",
      status: "Active",
      method: "Cash on delivery",
      img: c2,
      title: "Printed blue & white Coat",
      colour: "White",
      qty: 1,
      total: "$143.00",
    },

    // ✅ Cancelled (1)
    {
      id: "#555666777",
      date: "10 June 2023 1:20 PM",
      delivery: "—",
      status: "Cancelled",
      method: "Online Payment",
      img: c3,
      title: "Checked Casual Shirt",
      colour: "Gray",
      qty: 1,
      total: "$59.00",
    },

    // ✅ Completed (1)
    {
      id: "#888999000",
      date: "1 June 2023 11:15 AM",
      delivery: "7 June 2023",
      status: "Completed",
      method: "Cash on delivery",
      img: c4,
      title: "Classic White Hoodie",
      colour: "White",
      qty: 2,
      total: "$110.00",
    },
  ];

  // ✅ Filter orders by tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Active") return order.status === "Active";
    if (activeTab === "Cancelled") return order.status === "Cancelled";
    if (activeTab === "Completed") return order.status === "Completed";
    return true;
  });

  return (
    <div className="bg-[#f3f0ed] min-h-screen flex flex-col md:flex-row font-inter">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <SideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 md:p-10 bg-[#f3f0ed]">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
          My Orders
        </h2>

        {/* Tabs */}
        <div className="flex justify-between border-b border-gray-300 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 w-1/3 text-sm sm:text-lg font-medium transition-all duration-300 text-center rounded-t-md ${
                activeTab === tab
                  ? "text-gray-900 bg-[#f6f6f6] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, i) => (
            <div
              key={i}
              className="bg-[#f6f6f6] rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-4">
                <div>
                  <p>
                    <span className="font-medium text-gray-800">Order no:</span>{" "}
                    {order.id}
                  </p>
                  <p className="font-light">Order Date: {order.date}</p>
                  <p className="font-light">
                    Estimated Delivery Date: {order.delivery}
                  </p>
                </div>

                <div className="mt-3 sm:mt-0 text-left sm:text-right font-light text-gray-500">
                  <p>
                    <span className="font-light text-gray-500">
                      Order Status:
                    </span>{" "}
                    {order.status}
                  </p>
                  <p>
                    <span className="font-light text-gray-500">
                      Payment Method:
                    </span>{" "}
                    {order.method}
                  </p>
                </div>
              </div>

              <hr className="my-3" />

              {/* Product Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={order.img}
                    alt={order.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                      {order.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Colour: <span className="text-black">{order.colour}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Qty: <span className="text-black">{order.qty}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Total: <span className="text-black">{order.total}</span>
                    </p>
                  </div>
                </div>

                {/* Button logic */}
                <div className="w-full sm:w-auto">
                  {order.status === "Active" ? (
                    <button
                      onClick={() => navigate("/orderdetails")}
                      className="mt-3 sm:mt-0 bg-[#002e25] text-white px-5 py-2 rounded-md hover:bg-[#004534] transition text-sm sm:text-base w-full sm:w-auto text-center"
                    >
                      View Details
                    </button>
                  ) : order.status === "Cancelled" ? (
                    <button
                      disabled
                      className="mt-3 sm:mt-0 bg-red-100 text-red-700 px-5 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center cursor-not-allowed"
                    >
                      Successfully Cancelled
                    </button>
                  ) : (
                    <button
                      disabled
                      className="mt-3 sm:mt-0 bg-green-100 text-green-700 px-5 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center cursor-not-allowed"
                    >
                      Received Successfully
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* No orders message */}
          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-10">
              No {activeTab.toLowerCase()} orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profileorder;
