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
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Axios/axios";
import { ApiURL } from "../../Variable";

// Align statusOptions with backend statusMap and statusColorMap
const statusOptions = [
  { value: 1, label: "Pending", color: "#9CA3AF" },
  { value: 2, label: "Accepted", color: "#EAB308" },
  { value: 3, label: "Preparing", color: "#3B82F6" },
  { value: 4, label: "Shipped", color: "#A855F7" },
  { value: 5, label: "Delivered", color: "#22C55E" },
  { value: 6, label: "Cancelled", color: "#EF4444" },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit] = useState(20);

  useEffect(() => {
    fetchOrders(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const fetchOrders = async (page = 1, search = "") => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${ApiURL}/getallorders`, {
        page,
        limit: limit,
        search,
      });
      if (response?.data?.status === 1) {
        setOrders(response.data.data.orders || []);
        setTotalPages(response.data.data.totalPages || 1);
        setTotalOrders(response.data.data.totalOrders || 0);
      } else {
        setOrders([]);
        setTotalPages(1);
        setTotalOrders(0);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
     
      setOrders([]);
      setTotalPages(1);
      setTotalOrders(0);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axiosInstance.put(
        `${ApiURL}/updateorderstatus/${orderId}`,
        { status: Number(newStatus) }
      );
      if (response.data.status === 1) {
        fetchOrders(currentPage, searchTerm);
        toast.success("Status updated successfully!");
      } else {
        console.log(response.data.description || "Status update failed!");
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };
  1;

  const confirmDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(orderId);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await axiosInstance.post(`${ApiURL}/cancelorder`, {
        order_id: orderId,
      });
      if (response.data.status === 1) {
        fetchOrders(currentPage, searchTerm);
        toast.success("Order cancelled successfully!");
      } else {
        console.log(response.data.description || "Order cancellation failed!");
      }
    } catch (error) {
      console.error("Cancel failed:", error);
      
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <FaSpinner className="animate-spin h-12 w-12 text-gray-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className=" px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Order Management
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                aria-label="Search orders"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-500 text-lg" role="status">
                No orders found.
              </p>
            </div>
          ) : (
            orders?.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                {/* Order Header */}
                <div
                  className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => toggleExpand(order.orderId)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Toggle order ${order.orderId} details`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-700">
                        Order #
                      </p>
                      <p className="text-base font-medium text-gray-900">
                        #{order.orderId}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-700">
                        Customer
                      </p>
                      <p className="text-sm text-gray-900">
                        {order.customerName || "Unknown Customer"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-700">
                        Amount
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        ₹{order.grandTotal.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.paymentStatus || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-end sm:justify-start">
                      <span
                        className="inline-flex px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{
                          backgroundColor:
                            statusOptions.find((s) => s.value === order.status)
                              ?.color || "#6B7280",
                        }}
                        aria-label={`Order status: ${
                          statusOptions.find((s) => s.value === order.status)
                            ?.label || "Unknown"
                        }`}
                      >
                        {statusOptions.find((s) => s.value === order.status)
                          ?.label || "Unknown"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(order.orderId);
                        }}
                        className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        aria-label={
                          expandedOrder === order.orderId
                            ? "Collapse order details"
                            : "Expand order details"
                        }
                      >
                        {expandedOrder === order.orderId ? (
                          <FaChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <FaChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Details - Expanded */}
                {expandedOrder === order.orderId && (
                  <div className="p-4 sm:p-6 bg-gray-50 animate-slide-down">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {/* Shipping Details */}
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center mb-4">
                          <FaInfoCircle className="h-5 w-5 text-blue-500 mr-2" />
                          <h3 className="font-semibold text-lg text-gray-800">
                            Shipping Details
                          </h3>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          {order.address.first_name !== "N/A" &&
                            order.address.last_name !== "N/A" && (
                              <p>
                                <span className="font-medium text-gray-800">
                                  Name:
                                </span>{" "}
                                {order.address.first_name}{" "}
                                {order?.address?.last_name}
                              </p>
                            )}
                          {order.address.address !== "N/A" && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Address:
                              </span>{" "}
                              {order.address.address}
                            </p>
                          )}
                          {(order.address.city !== "N/A" ||
                            order.address.state !== "N/A") && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Location:
                              </span>{" "}
                              {order.address.city || "N/A"},{" "}
                              {order.address.state || "N/A"}{" "}
                              {order.address.zip_code !== "N/A"
                                ? ` - ${order.address.zip_code}`
                                : ""}
                            </p>
                          )}
                          {order.address.phone_number !== "N/A" && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Phone:
                              </span>{" "}
                              {order.address.phone_number}
                            </p>
                          )}
                          {order.address.email !== "N/A" && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Email:
                              </span>{" "}
                              {order.address.email}
                            </p>
                          )}
                          {order.address.add_type !== "N/A" && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Type:
                              </span>{" "}
                              {order.address.add_type}
                            </p>
                          )}
                          {!(
                            order.address.customerName !== "N/A" ||
                            order.address.address !== "N/A" ||
                            order.address.email !== "N/A" ||
                            order.address.phone_number !== "N/A"
                          ) && (
                            <p className="text-gray-500 italic">
                              No shipping details available
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                        <div className="flex items-center mb-4">
                          <FaRupeeSign className="h-5 w-5 text-green-500 mr-2" />
                          <h3 className="font-semibold text-lg text-gray-800">
                            Payment Details
                          </h3>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-1 border-b border-gray-200">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium text-gray-900">
                              ₹{order?.totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-gray-200">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium text-gray-900">
                              ₹{order?.shippingCharge.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-gray-200">
                            <span className="text-gray-600">Tax</span>
                            <span className="font-medium text-gray-900">
                              ₹{order?.tax.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-gray-200 font-semibold text-lg text-gray-800">
                            <span>Grand Total</span>
                            <span>₹{order?.grandTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="font-semibold text-lg mb-4 text-gray-800">
                        Order Items ({order?.orderItems?.length || 0})
                      </h3>
                      <div className="space-y-4">
                        {order?.orderItems?.map((item) => (
                          <div
                            key={item?.orderItemId}
                            className="flex flex-col sm:flex-row items-start gap-4 border-b border-gray-200 pb-4 last:border-0"
                          >
                            <img
                              src={
                                item.imageUrl
                                  ? `${ApiURL}/assets/Products/${item.imageUrl}`
                                  : "https://via.placeholder.com/80x80?text=No+Image"
                              }
                              alt={item.productName || "Item"}
                              className="w-20 h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/80x80?text=No+Image";
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-800 text-sm sm:text-base mb-1">
                                {item.productName || "Unknown Item"}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-600 mb-1">
                                Sub-Category: {item.subCategoryName || "N/A"}
                              </p>
                              {item.color && (
                                <div className="flex items-center gap-2 mb-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                      backgroundColor:
                                        item.color.color_code || "#000",
                                    }}
                                  />
                                  <span className="text-xs sm:text-sm text-gray-600">
                                    {item.color.color_name || "N/A"}
                                  </span>
                                </div>
                              )}
                              <div className="flex items-center justify-between sm:justify-start gap-4 text-sm">
                                <span className="text-gray-600">
                                  Qty: {item.quantity}
                                </span>
                                <span className="text-gray-600">
                                  ₹{item.price.toFixed(2)}
                                </span>
                                <span className="font-medium text-gray-900">
                                  ₹{item.totalAmount.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end mt-6">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order.orderId,
                            Number(e.target.value)
                          )
                        }
                        className="w-full sm:w-48 px-4 py-2.5 border border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 text-sm"
                        aria-label="Update order status"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => confirmDelete(order.orderId)}
                        className="w-full sm:w-auto px-6 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-sm flex items-center justify-center gap-2 text-sm font-medium"
                        aria-label="Cancel order"
                      >
                        <FaTrash className="w-4 h-4" />
                        Cancel Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Pagination */}
          {totalOrders > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-black text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition-all duration-200 min-w-[40px]`}
                  aria-label={`Page ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
