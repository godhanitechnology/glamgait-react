// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import {
//   FaTrash,
//   FaRupeeSign,
//   FaChevronDown,
//   FaChevronUp,
//   FaSearch,
//   FaSpinner,
//   FaInfoCircle,
// } from "react-icons/fa";
// import { toast } from "react-hot-toast";
// import axiosInstance from "../../Axios/axios";
// import { ApiURL } from "../../Variable";
// import TrackingSection from "./TrackingSection";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   // const [expandedOrder, setExpandedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openOrderId, setOpenOrderId] = useState(null);
//   const [logistics, setLogistics] = useState([]);
//   const [selectedLogistic, setSelectedLogistic] = useState(null);
//   const [loadingLogistics, setLoadingLogistics] = useState(false);
//   const [trackingDetails, setTrackingDetails] = useState([]);
//   const [limit] = useState(20);
//   useEffect(() => {
//     fetchOrders(currentPage, searchTerm);
//   }, [currentPage, searchTerm]);

//   const fetchOrders = async (page = 1, search = "") => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.post(`${ApiURL}/getallorders`, {
//         page,
//         limit: limit,
//         search,
//       });
//       if (response?.data?.status === 1) {
//         setOrders(response.data.data.orders || []);
//         setTotalPages(response.data.data.totalPages || 1);
//         setTotalOrders(response.data.data.totalOrders || 0);
//       } else {
//         setOrders([]);
//         setTotalPages(1);
//         setTotalOrders(0);
//       }
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);

//       setOrders([]);
//       setTotalPages(1);
//       setTotalOrders(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const confirmDelete = (orderId) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       deleteOrder(orderId);
//     }
//   };

//   const deleteOrder = async (orderId) => {
//     try {
//       const response = await axiosInstance.post(`${ApiURL}/cancelorder`, {
//         order_id: orderId,
//       });
//       if (response.data.status === 1) {
//         fetchOrders(currentPage, searchTerm);
//         toast.success("Order cancelled successfully!");
//       } else {
//         console.log(response.data.description || "Order cancellation failed!");
//       }
//     } catch (error) {
//       console.error("Cancel failed:", error);
//     }
//   };

//   const handleSearch = () => {
//     setCurrentPage(1);
//   };

//   const fetchLogistics = async (expressflyOrderId) => {
//     try {
//       setLoadingLogistics(true);
//       const res = await axiosInstance.post(
//         `${ApiURL}/get-logistics/${expressflyOrderId}`
//       );

//       if (res.data.status === 1) {
//         // data comes as object {16: {}, 19: {}}
//         const arr = Object.values(res.data.data);
//         setLogistics(arr);
//       } else {
//         setLogistics([]);
//         toast.error(res.data.message);
//       }
//     } catch (e) {
//       toast.error("Failed to load logistics");
//     } finally {
//       setLoadingLogistics(false);
//     }
//   };

//   const toggleOrder = (order) => {
//     console.log(order.orderId);
//     console.log(openOrderId, "open");

//     if (openOrderId === order.orderId) {
//       setOpenOrderId(null); // collapse
//     } else {
//       setOpenOrderId(order.orderId); // expand
//       order.logist;
//       if (!order.logistic_id) {
//         fetchLogistics(order.expressfly_order_id);
//       }
//     }
//   };

//   const shipOrder = async (orderId) => {
//     if (!selectedLogistic) {
//       return toast.error("Please select a logistic partner");
//     }

//     try {
//       toast.loading("Shipping order...", { id: "ship" });

//       const order = orders.find((o) => o.orderId === orderId);

//       const res = await axiosInstance.post(`${ApiURL}/ship-order`, {
//         expressfly_order_id: order.expressfly_order_id,
//         logistic_id: selectedLogistic.logistic_id,
//       });

//       toast.dismiss("ship");

//       if (res.data.status === 1) {
//         toast.success("Order shipped successfully");
//         fetchOrders(currentPage, searchTerm);
//       } else {
//         toast.error(res.data.message || "Failed to ship order");
//       }
//     } catch (error) {
//       toast.dismiss("ship");
//       toast.error("Error while shipping");
//     }
//   };

//   const handleTracking = async (order) => {
//     try {
//       const response = await axiosInstance.get(
//         `${ApiURL}/track/${order.awb_number}`
//       );
//       setTrackingDetails(response.data.data);
//     } catch (error) {
//       console.log(error);
//       setTrackingDetails([]);
//     }
//   };

//   const printLabel = (awb) => {
//     if (!awb) {
//       toast.error("AWB not available");
//       return;
//     }

//     // This will auto-download perfect PDF
//     const url = `${ApiURL}/shipping-label/${awb}`;
//     window.open(url, "_blank");

//     toast.success("Label downloading...");
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-100">
//         <FaSpinner className="animate-spin h-12 w-12 text-gray-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
//       <div className=" px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Order Management
//           </h1>
//           <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
//             <div className="relative w-full sm:w-64">
//               <input
//                 type="text"
//                 placeholder="Search orders..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-sm"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//                 aria-label="Search orders"
//               />
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             </div>
//           </div>
//         </div>

//         {/* Orders List */}
//         <div className="space-y-4">
//           {orders.length === 0 ? (
//             <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
//               <p className="text-gray-500 text-lg" role="status">
//                 No orders found.
//               </p>
//             </div>
//           ) : (
//             orders?.map((order) => (
//               <div
//                 key={order.orderId}
//                 className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
//               >
//                 {/* Order Header */}
//                 <div
//                   className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
//                   onClick={() => toggleOrder(order)}
//                   role="button"
//                   tabIndex={0}
//                   aria-label={`Toggle order ${order.orderId} details`}
//                 >
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
//                     <div className="space-y-1">
//                       <p className="text-sm font-semibold text-gray-700">
//                         Order #
//                       </p>
//                       <p className="text-base font-medium text-gray-900">
//                         #{order.orderId}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm font-semibold text-gray-700">
//                         Customer
//                       </p>
//                       <p className="text-sm text-gray-900">
//                         {order.customerName || "Unknown Customer"}
//                       </p>
//                     </div>
//                     <div className="space-y-1">
//                       <p className="text-sm font-semibold text-gray-700">
//                         Amount
//                       </p>
//                       <p className="text-lg font-bold text-green-600">
//                         ₹{order.grandTotal.toFixed(2)}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         {order.paymentStatus || "N/A"}
//                       </p>
//                     </div>
//                     <div className="flex items-center justify-end sm:justify-start">
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           toggleOrder(order);
//                         }}
//                         className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
//                         aria-label={
//                           openOrderId === order.orderId
//                             ? "Collapse order details"
//                             : "Expand order details"
//                         }
//                       >
//                         {openOrderId === order.orderId ? (
//                           <FaChevronUp className="h-4 w-4 text-gray-500" />
//                         ) : (
//                           <FaChevronDown className="h-4 w-4 text-gray-500" />
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Order Details - Expanded */}
//                 {openOrderId === order.orderId && (
//                   <div className="p-4 sm:p-6 bg-gray-50 animate-slide-down">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                       {/* Shipping Details */}
//                       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                         <div className="flex items-center mb-4">
//                           <FaInfoCircle className="h-5 w-5 text-blue-500 mr-2" />
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             Shipping Details
//                           </h3>
//                         </div>
//                         <div className="space-y-2 text-sm text-gray-600">
//                           {order.address.first_name !== "N/A" &&
//                             order.address.last_name !== "N/A" && (
//                               <p>
//                                 <span className="font-medium text-gray-800">
//                                   Name:
//                                 </span>{" "}
//                                 {order.address.first_name}{" "}
//                                 {order?.address?.last_name}
//                               </p>
//                             )}
//                           {order.address.address !== "N/A" && (
//                             <p>
//                               <span className="font-medium text-gray-800">
//                                 Address:
//                               </span>{" "}
//                               {order.address.address}
//                             </p>
//                           )}
//                           {(order.address.city !== "N/A" ||
//                             order.address.state !== "N/A") && (
//                             <p>
//                               <span className="font-medium text-gray-800">
//                                 Location:
//                               </span>{" "}
//                               {order.address.city || "N/A"},{" "}
//                               {order.address.state || "N/A"}{" "}
//                               {order.address.zip_code !== "N/A"
//                                 ? ` - ${order.address.zip_code}`
//                                 : ""}
//                             </p>
//                           )}
//                           {order.address.phone_number !== "N/A" && (
//                             <p>
//                               <span className="font-medium text-gray-800">
//                                 Phone:
//                               </span>{" "}
//                               {order.address.phone_number}
//                             </p>
//                           )}
//                           {order.address.email !== "N/A" && (
//                             <p>
//                               <span className="font-medium text-gray-800">
//                                 Email:
//                               </span>{" "}
//                               {order.address.email}
//                             </p>
//                           )}
//                           {order.address.add_type !== "N/A" && (
//                             <p>
//                               <span className="font-medium text-gray-800">
//                                 Type:
//                               </span>{" "}
//                               {order.address.add_type}
//                             </p>
//                           )}
//                           {!(
//                             order.address.customerName !== "N/A" ||
//                             order.address.address !== "N/A" ||
//                             order.address.email !== "N/A" ||
//                             order.address.phone_number !== "N/A"
//                           ) && (
//                             <p className="text-gray-500 italic">
//                               No shipping details available
//                             </p>
//                           )}
//                         </div>
//                       </div>

//                       {/* Payment Details */}
//                       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                         <div className="flex items-center mb-4">
//                           <FaRupeeSign className="h-5 w-5 text-green-500 mr-2" />
//                           <h3 className="font-semibold text-lg text-gray-800">
//                             Payment Details
//                           </h3>
//                         </div>
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between py-1 border-b border-gray-200">
//                             <span className="text-gray-600">Subtotal</span>
//                             <span className="font-medium text-gray-900">
//                               ₹{order?.totalPrice.toFixed(2)}
//                             </span>
//                           </div>
//                           <div className="flex justify-between py-1 border-b border-gray-200">
//                             <span className="text-gray-600">Shipping</span>
//                             <span className="font-medium text-gray-900">
//                               ₹{order?.shippingCharge.toFixed(2)}
//                             </span>
//                           </div>
//                           {/* <div className="flex justify-between py-1 border-b border-gray-200">
//                             <span className="text-gray-600">Tax</span>
//                             <span className="font-medium text-gray-900">
//                               ₹{order?.tax.toFixed(2)}
//                             </span>
//                           </div> */}
//                           <div className="flex justify-between py-2 border-b border-gray-200 font-semibold text-lg text-gray-800">
//                             <span>Grand Total</span>
//                             <span>₹{order?.grandTotal.toFixed(2)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Order Items */}
//                     <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
//                       <h3 className="font-semibold text-lg mb-4 text-gray-800">
//                         Order Items ({order?.orderItems?.length || 0})
//                       </h3>
//                       <div className="space-y-4">
//                         {order?.orderItems?.map((item) => (
//                           <div
//                             key={item?.orderItemId}
//                             className="flex flex-col sm:flex-row items-start gap-4 border-b border-gray-200 pb-4 last:border-0"
//                           >
//                             <img
//                               src={
//                                 item.imageUrl
//                                   ? `${ApiURL}/assets/Products/${item.imageUrl}`
//                                   : "https://via.placeholder.com/80x80?text=No+Image"
//                               }
//                               alt={item.productName || "Item"}
//                               className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
//                               onError={(e) => {
//                                 e.target.src =
//                                   "https://via.placeholder.com/80x80?text=No+Image";
//                               }}
//                             />
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-medium text-gray-800 text-sm sm:text-base mb-1">
//                                 {item.productName || "Unknown Item"}
//                               </h4>
//                               <p className="text-xs sm:text-sm text-gray-600 mb-1">
//                                 Sub-Category: {item.subCategoryName || "N/A"}
//                               </p>
//                               {item.color && (
//                                 <div className="flex items-center gap-2 mb-2">
//                                   <div
//                                     className="w-3 h-3 rounded-full"
//                                     style={{
//                                       backgroundColor:
//                                         item.color.color_code || "#000",
//                                     }}
//                                   />
//                                   <span className="text-xs sm:text-sm text-gray-600">
//                                     {item.color.color_name || "N/A"}
//                                   </span>
//                                 </div>
//                               )}
//                               <div className="flex items-center justify-between sm:justify-start gap-4 text-sm">
//                                 <span className="text-gray-600">
//                                   Qty: {item.quantity}
//                                 </span>
//                                 <span className="text-gray-600">
//                                   ₹{item.price.toFixed(2)}
//                                 </span>
//                                 <span className="font-medium text-gray-900">
//                                   ₹{item.totalAmount.toFixed(2)}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
//                       <button
//                         onClick={() => confirmDelete(order.orderId)}
//                         className="w-full sm:w-auto px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm font-medium"
//                         aria-label="Cancel order"
//                       >
//                         <FaTrash className="w-4 h-4" />
//                         Cancel Order
//                       </button>
//                     </div>
//                     {openOrderId === order.orderId && (
//                       <div className="p-4 bg-gray-100 rounded-xl mt-3">
//                         {/* If logistic already selected → show ONLY Track Order */}
//                         {order?.logistic_id ? (
//                           <div className="flex gap-4">
//                             <button
//                               className="px-6 py-2 bg-green-600 text-white rounded-xl"
//                               onClick={() => handleTracking(order)}
//                             >
//                               Track Order
//                             </button>
//                             {trackingDetails && (
//                               <div className="mt-4">
//                                 <TrackingSection
//                                   trackingData={trackingDetails}
//                                 />
//                               </div>
//                             )}
//                           </div>
//                         ) : (
//                           <div>
//                             {loadingLogistics ? (
//                               <p>Loading logistics...</p>
//                             ) : (
//                               <>
//                                 <select
//                                   className="border p-2 rounded-xl w-full"
//                                   onChange={(e) =>
//                                     setSelectedLogistic(
//                                       logistics.find(
//                                         (l) =>
//                                           String(l.logistic_id) ===
//                                           String(e.target.value)
//                                       )
//                                     )
//                                   }
//                                 >
//                                   <option value="">Select Logistic</option>

//                                   {logistics?.map((l) => (
//                                     <option
//                                       key={l.logistic_id}
//                                       value={l.logistic_id}
//                                     >
//                                       {l.logistic} – ₹{l.total}
//                                     </option>
//                                   ))}
//                                 </select>

//                                 {/* Show logo also */}
//                                 {selectedLogistic && (
//                                   <div className="flex items-center gap-3 mt-2">
//                                     <img
//                                       src={`https://cp.expressfly.in/logos/${selectedLogistic.logo_image}`}
//                                       className="h-10 w-auto rounded-md"
//                                     />
//                                     <span className="text-gray-700 font-medium">
//                                       {selectedLogistic.logistic}
//                                     </span>
//                                   </div>
//                                 )}

//                                 <button
//                                   disabled={!selectedLogistic}
//                                   onClick={() => shipOrder(order.orderId)}
//                                   className="w-full mt-3 px-6 py-2.5 bg-blue-600 text-white rounded-xl"
//                                 >
//                                   Ship Order
//                                 </button>
//                               </>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     <button
//                       onClick={() => printLabel(order.awb_number)}
//                       disabled={!order.awb_number}
//                       className={`px-6 py-3 rounded-xl font-medium text-white transition-all shadow-md ${
//                         order.awb_number
//                           ? "bg-red-600 hover:bg-red-700"
//                           : "bg-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       {order.awb_number ? "Download Print Label" : "No AWB Yet"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}

//           {/* Pagination */}
//           {totalOrders > 0 && (
//             <div className="mt-8 flex flex-wrap justify-center gap-2">
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                   key={i + 1}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-4 py-2 rounded-xl text-sm font-medium ${
//                     currentPage === i + 1
//                       ? "bg-black text-white shadow-md"
//                       : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                   } transition-all duration-200 min-w-[40px]`}
//                   aria-label={`Page ${i + 1}`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  FaTrash,
  FaRupeeSign,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaSpinner,
  FaInfoCircle,
  FaTruck,
  FaBoxOpen,
  FaDownload,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Axios/axios";
import { ApiURL } from "../../Variable";
import TrackingSection from "./TrackingSection";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [openOrderId, setOpenOrderId] = useState(null);
  const [logistics, setLogistics] = useState([]);
  const [selectedLogistic, setSelectedLogistic] = useState(null);
  const [loadingLogistics, setLoadingLogistics] = useState(false);
  const [trackingDetails, setTrackingDetails] = useState([]);
  const limit = 20;

  useEffect(() => {
    fetchOrders(currentPage, searchTerm);
  }, [currentPage]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setCurrentPage(1);
        fetchOrders(1, searchTerm);
      } else if (searchTerm === "") {
        fetchOrders(currentPage, "");
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${ApiURL}/getallorders`, {
        page,
        limit,
        search,
      });
      if (response?.data?.status === 1) {
        setOrders(response.data.data.orders || []);
        setTotalPages(response.data.data.totalPages || 1);
      } else {
        setOrders([]);
      }
    } catch (error) {
      toast.error("Failed to load orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (orderId) => {
    // clear tracking when switching orders
    if (openOrderId !== orderId) {
      setTrackingDetails([]);
    }

    setOpenOrderId(openOrderId === orderId ? null : orderId);

    if (openOrderId !== orderId && orders) {
      const order = orders.find((o) => o.orderId === orderId);
      if (order && !order.logistic_id && order.expressfly_order_id) {
        fetchLogistics(order.expressfly_order_id);
      }
    }
  };

  const fetchLogistics = async (expressflyOrderId) => {
    try {
      setLoadingLogistics(true);
      const res = await axiosInstance.post(
        `${ApiURL}/get-logistics/${expressflyOrderId}`,
      );
      if (res.data.status === 1) {
        setLogistics(Object.values(res.data.data));
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Failed to load logistics");
    } finally {
      setLoadingLogistics(false);
    }
  };

  const shipOrder = async (orderId) => {
    if (!selectedLogistic) return toast.error("Select a logistic partner");

    toast.loading("Shipping order...", { id: "ship" });
    try {
      const order = orders.find((o) => o.orderId === orderId);
      const res = await axiosInstance.post(`${ApiURL}/ship-order`, {
        expressfly_order_id: order.expressfly_order_id,
        logistic_id: selectedLogistic.logistic_id,
      });

      toast.dismiss("ship");
      if (res.data.status === 1) {
        toast.success("Order shipped!");
        fetchOrders(currentPage, searchTerm);
      } else {
        toast.error(res.data.message || "Shipping failed");
      }
    } catch {
      toast.dismiss("ship");
      toast.error("Shipping error");
    }
  };

  const handleTracking = async (awb) => {
    setTrackingDetails([]);
    try {
      const res = await axiosInstance.get(`${ApiURL}/track/${awb}`);
      setTrackingDetails(res.data.data);
    } catch {
      setTrackingDetails([]);
    }
  };

  const printLabel = (awb) => {
    if (!awb) return toast.error("No AWB");
    window.open(`${ApiURL}/shipping-label/${awb}`, "_blank");
    toast.success("Downloading label...");
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      const res = await axiosInstance.put(`${ApiURL}/cancelorder`, {
        order_id: orderId,
      });
      if (res.data.status === 1) {
        toast.success("Order cancelled");
        fetchOrders(currentPage, searchTerm);
      }
    } catch {
      toast.error("Failed to cancel");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-5xl text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Order Management
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by order ID, name, phone..."
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6 md:gap-8">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
              <FaBoxOpen className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            orders.map((order) => {
              return (
                <div
                  key={order.orderId}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Card Header */}
                  <div
                    className="p-5 sm:p-6 cursor-pointer bg-gradient-to-r from-indigo-50 to-white"
                    onClick={() => toggleOrder(order.orderId)}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Order ID
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          #{order.orderId}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Customer
                        </p>
                        <p className="font-semibold text-gray-800 truncate">
                          {`${order?.address?.first_name} ${
                            order?.address?.last_name || "NA"
                          }`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Amount
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{order.grandTotal.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {order.paymentStatus}
                        </p>
                      </div>
                      <div className="flex items-center justify-between lg:justify-end gap-3">
                        <span
                          className={`px-4 py-1.5 rounded-full text-white text-sm font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                        {/* Print Label Button - Always Visible */}
                        {order.awb_number && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              printLabel(order.awb_number);
                            }}
                            className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition transform hover:scale-105"
                            title="Download Label"
                          >
                            <FaDownload size={18} />
                          </button>
                        )}
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg hover:bg-gray-200 transition"
                        >
                          {openOrderId === order.orderId ? (
                            <FaChevronUp size={20} />
                          ) : (
                            <FaChevronDown size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {openOrderId === order.orderId && (
                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* Shipping Info */}
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <FaTruck className="text-indigo-600" /> Shipping
                            Address
                          </h3>
                          <div className="space-y-2 text-gray-700">
                            <p className="font-medium">
                              {order.address.first_name}{" "}
                              {order.address.last_name}
                            </p>
                            <p>{order.address?.address}</p>
                            <p>{order.address?.apartment}</p>

                            <p>
                              {order.address.city}, {order.address.state} -{" "}
                              {order.address.zip_code}
                            </p>
                            <p className="font-medium">
                              Phone: {order.address.phone_number}
                            </p>
                            {order.address.email !== "N/A" && (
                              <p>Email: {order.address.email}</p>
                            )}
                          </div>
                        </div>

                        {/* Payment Summary */}
                        <div className="bg-white p-5 rounded-xl shadow-sm">
                          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <FaRupeeSign className="text-green-600" /> Payment
                            Summary
                          </h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-medium">
                                ₹{order.totalPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shipping</span>
                              <span className="font-medium">
                                ₹{order.shippingCharge.toFixed(2)}
                              </span>
                            </div>
                            <div className="border-t pt-3">
                              <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>₹{order.grandTotal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
                        <h3 className="font-bold text-lg mb-4">
                          Items ({order.orderItems.length})
                        </h3>
                        <div className="space-y-4">
                          {order.orderItems.map((item) => (
                            <div
                              key={item.orderItemId}
                              className="flex gap-4 pb-4 border-b last:border-0"
                            >
                              <img
                                src={
                                  item.imageUrl
                                    ? `${ApiURL}/assets/Products/${item.imageUrl}`
                                    : "/placeholder.jpg"
                                }
                                alt={item.productName}
                                className="w-16 h-16 object-cover rounded-lg"
                                onError={(e) =>
                                  (e.target.src = "/placeholder.jpg")
                                }
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  {item.productName}
                                </h4>
                                {item.sku && (
                                  <p className="text-sm text-gray-600">
                                    SKU: {item.sku}
                                  </p>
                                )}
                                {item.color && (
                                  <p className="text-sm text-gray-600">
                                    Color: {item.color.color_name}
                                  </p>
                                )}
                                {item.size && (
                                  <p className="text-sm text-gray-600">
                                    Size: {item.size}
                                  </p>
                                )}
                                <p className="text-sm text-gray-600">
                                  Qty: {item.quantity} × ₹{item.price} = ₹
                                  {item.totalAmount}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3">
                        {order.logistic_id ? (
                          <button
                            onClick={() => handleTracking(order.awb_number)}
                            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium flex items-center gap-2"
                          >
                            <FaTruck /> Track Order
                          </button>
                        ) : (
                          <>
                            <select
                              className="px-5 py-3 border border-gray-300 rounded-xl bg-white"
                              onChange={(e) =>
                                setSelectedLogistic(
                                  logistics.find(
                                    (l) =>
                                      String(l.logistic_id) === e.target.value,
                                  ),
                                )
                              }
                            >
                              <option value="">Choose Logistic</option>
                              {logistics.map((l) => (
                                <option
                                  key={l.logistic_id}
                                  value={l.logistic_id}
                                >
                                  {l.logistic} – ₹{l.total}
                                </option>
                              ))}
                            </select>
                            {selectedLogistic && (
                              <div className="flex items-center gap-3">
                                <img
                                  src={`https://cp.expressfly.in/logos/${selectedLogistic.logo_image}`}
                                  alt={selectedLogistic.logistic}
                                  className="h-10 rounded"
                                />
                                <span className="font-medium">
                                  {selectedLogistic.logistic}
                                </span>
                              </div>
                            )}
                            <button
                              onClick={() => shipOrder(order.orderId)}
                              disabled={!selectedLogistic || loadingLogistics}
                              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl font-medium"
                            >
                              Ship Order
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => cancelOrder(order.orderId)}
                          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium flex items-center gap-2"
                        >
                          <FaTrash /> Cancel Order
                        </button>
                      </div>

                      {trackingDetails.length > 0 && (
                        <div className="mt-6">
                          <TrackingSection trackingData={trackingDetails} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-5 py-2.5 rounded-lg font-medium transition ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
