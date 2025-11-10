// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import SideBar from "./SideBar";
// import { ApiURL, userInfo } from "../Variable";
// import axiosInstance from "../Axios/axios";

// const Profileorder = () => {
//   const statusMap = {
//     1: "Pending",
//     2: "Accepted",
//     3: "Preparing",
//     4: "Shipped",
//     5: "Delivered",
//     6: "Cancelled",
//   };
//   const [activeTab, setActiveTab] = useState("Active");
//   const [orders, setOrders] = useState([]);

//   const navigate = useNavigate();

//   const tabs = ["Active", "Cancelled", "Completed"];

//   const user = userInfo();
//   const u_id = user?.u_id;

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         if (!u_id) return;
//         const res = await axiosInstance.get(`${ApiURL}/getorder/${u_id}`);
//         if (res.data.status === 1) {
//           setOrders(res.data.data);
//         } else {
//           setOrders([]);
//         }
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setOrders([]);
//       }
//     };
//     fetchOrders();
//   }, [u_id]);

//   //  Filter orders by tab
//   const filteredOrders = orders.filter((order) => {
//     if (activeTab === "Active") return order.status === 1; // pending/active
//     if (activeTab === "Cancelled") return order.status === 0; // cancelled
//     if (activeTab === "Completed") return order.status === 2; // completed
//     return true;
//   });

//   return (
//     <div className="bg-[#f3f0ed] min-h-screen flex flex-col md:flex-row font-inter">
//       {/* Sidebar */}
//       <div className="w-full md:w-1/4">
//         <SideBar />
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-4 sm:p-6 md:p-10 bg-[#f3f0ed]">
//         <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
//           My Orders
//         </h2>

//         {/* Tabs */}
//         <div className="flex justify-between border-b border-gray-300 mb-8">
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`relative pb-3 w-1/3 text-sm sm:text-lg font-medium transition-all duration-300 text-center rounded-t-md ${
//                 activeTab === tab
//                   ? "text-gray-900 bg-[#f6f6f6] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
//                   : "text-gray-500 hover:text-gray-800"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Orders List */}
//         <div className="space-y-6">
//           {filteredOrders?.map((order, i) => (
//             <div
//               key={order.orderId}
//               className="bg-[#f6f6f6] rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100"
//             >
//               {/* Header */}
//               <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-4">
//                 <div>
//                   <p>
//                     <span className="font-medium text-gray-800">Order no:</span>{" "}
//                     {order.orderId}
//                   </p>
//                   <p className="font-light">Order Date: {order?.date}</p>
//                   <p className="font-light">
//                     Estimated Delivery Date: {order?.delivery}
//                   </p>
//                 </div>

//                 <div className="mt-3 sm:mt-0 text-left sm:text-right font-light text-gray-500">
//                   <p>
//                     <span className="font-light text-gray-500">
//                       Order Status:
//                     </span>{" "}
//                     <span className="text-black">
//                       {statusMap[order.status] || "Unknown"}
//                     </span>
//                   </p>
//                   <p>
//                     <span className="font-light text-gray-500">
//                       Payment Method:
//                     </span>{" "}
//                     {order.paymentStatus}
//                   </p>
//                 </div>
//               </div>

//               <hr className="my-3" />

//               {/* Product Info */}
//               <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                 {order.orderItems.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-[#f6f6f6] p-4 rounded-md"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={`${ApiURL}/assets/Products/${item.imageUrl}`}
//                         alt={item.productName}
//                         className="w-20 h-20 rounded-md object-cover"
//                       />
//                       <div>
//                         <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
//                           {item.productName}
//                         </h3>
//                         <p className="text-xs sm:text-sm text-gray-600">
//                           Colour:{" "}
//                           <span className="text-black">
//                             {item.color?.color_name || "N/A"}
//                           </span>
//                         </p>
//                         <p className="text-xs sm:text-sm text-gray-600">
//                           Qty:{" "}
//                           <span className="text-black">{item.quantity}</span>
//                         </p>
//                         <p className="text-xs sm:text-sm text-gray-600">
//                           Total:{" "}
//                           <span className="text-black">
//                             ₹{item.totalAmount.toFixed(2)}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Button logic */}
//                 <div className="w-full sm:w-auto">
//                   {order.status === "Active" ? (
//                     <button
//                       onClick={() => navigate("/orderdetails")}
//                       className="mt-3 sm:mt-0 bg-[#002e25] text-white px-5 py-2 rounded-md hover:bg-[#004534] transition text-sm sm:text-base w-full sm:w-auto text-center"
//                     >
//                       View Details
//                     </button>
//                   ) : order.status === "Cancelled" ? (
//                     <button
//                       disabled
//                       className="mt-3 sm:mt-0 bg-red-100 text-red-700 px-5 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center cursor-not-allowed"
//                     >
//                       Successfully Cancelled
//                     </button>
//                   ) : (
//                     <button
//                       disabled
//                       className="mt-3 sm:mt-0 bg-green-100 text-green-700 px-5 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto text-center cursor-not-allowed"
//                     >
//                       Received Successfully
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* No orders message */}
//           {filteredOrders.length === 0 && (
//             <div className="text-center text-gray-500 text-sm py-10">
//               No {activeTab.toLowerCase()} orders found.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profileorder;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { ApiURL, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";
import toast from "react-hot-toast";
import ConfirmDeleteModal from "../Admin/pages/ConfirmDeleteModal";

const Profileorder = () => {
  const statusMap = {
    1: "Pending",
    2: "Accepted",
    3: "Preparing",
    4: "Shipped",
    5: "Delivered",
    6: "Cancelled",
  };

  const [activeTab, setActiveTab] = useState("Active");
  const [orders, setOrders] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const navigate = useNavigate();
  const tabs = ["Active", "Cancelled", "Completed"];
  const user = userInfo();
  const u_id = user?.u_id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!u_id) return;
        const res = await axiosInstance.get(`${ApiURL}/getorder/${u_id}`);
        if (res.data.status === 1) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      }
    };
    fetchOrders();
  }, [u_id]);

  const handleCancelOrder = async () => {
    try {
      const res = await axiosInstance.put(`${ApiURL}/cancelorder`, {
        order_id: selectedOrderId,
      });
      if (res.data.status === 1) {
        toast.success("Order cancelled successfully!");
        // Update local UI instantly
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === selectedOrderId ? { ...o, status: 6 } : o
          )
        );
      } else {
        console.log(res.data.message || "Failed to cancel order.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setShowCancelModal(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "Active") return [1, 2, 3, 4].includes(order.status); // Pending to Shipped
    if (activeTab === "Cancelled") return order.status === 6; // Cancelled
    if (activeTab === "Completed") return [5].includes(order.status); // Delivered
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
          {filteredOrders?.map((order) => (
            <div
              key={order.orderId}
              className="bg-[#f6f6f6] rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-4">
                <div>
                  <p>
                    <span className="font-medium text-gray-800">Order no:</span>{" "}
                    {order.orderId}
                  </p>
                  <p className="font-light">
                    Customer: {order.address.first_name}{" "}
                    {order.address.last_name}
                  </p>
                  <p className="font-light">
                    Address: {order.address.address}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                </div>

                <div className="mt-3 sm:mt-0 text-left sm:text-right font-light text-gray-500">
                  <p>
                    <span className="font-light text-gray-500">
                      Order Status:
                    </span>{" "}
                    <span className="text-black">
                      {statusMap[order.status] || "Unknown"}
                    </span>
                  </p>
                  <p>
                    <span className="font-light text-gray-500">
                      Payment Method:
                    </span>{" "}
                    {order.paymentStatus}
                  </p>
                </div>
              </div>

              <hr className="my-3" />

              {/* Product Info */}
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex items-center gap-4 bg-[#f6f6f6] p-4 rounded-md"
                  >
                    <img
                      src={`${ApiURL}/assets/Products/${item.imageUrl}`}
                      alt={item.productName}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Subcategory: {item.subCategoryName}
                      </p>
                      {item.size && (
                        <p className="text-sm text-gray-600">
                          Size: {item.size}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">
                        Color: {item.color?.color_name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">
                        Total: ₹{item.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-4 border-t pt-3 text-right space-y-1">
                <p>Subtotal: ₹{order.totalPrice.toFixed(2)}</p>
                <p>Shipping: ₹{order.shippingCharge.toFixed(2)}</p>
                <p>Tax: ₹{order.tax.toFixed(2)}</p>
                <p className="font-semibold">
                  Grand Total: ₹{order.grandTotal.toFixed(2)}
                </p>
              </div>

              {/* Action Button */}
              {/* Action Buttons */}
              <div className="mt-4 flex justify-end gap-3">
                {order.status === 1 && (
                  <button
                    onClick={() => {
                      setSelectedOrderId(order.orderId);
                      setShowCancelModal(true);
                    }}
                    className="bg-red-100 text-red-700 px-5 py-2 rounded-md text-sm sm:text-base hover:bg-red-200 transition"
                  >
                    Cancel Order
                  </button>
                )}

                <button
                  onClick={() => navigate(`/orderdetails/${order.orderId}`)}
                  className="bg-[#002e25] text-white px-5 py-2 rounded-md hover:bg-[#004534] transition text-sm sm:text-base"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-10">
              No {activeTab.toLowerCase()} orders found.
            </div>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelOrder}
        itemType="order"
        itemName={`#${selectedOrderId}`}
      />
    </div>
  );
};

export default Profileorder;
