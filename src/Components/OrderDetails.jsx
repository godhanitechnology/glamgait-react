import { useState, useEffect } from "react";
import { ChevronLeft, Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import axiosInstance from "../Axios/axios";
import { ApiURL } from "../Variable";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) return;

      try {
        const orderRes = await axiosInstance.get(
          `${ApiURL}/getorder/${orderId}`
        );
        const orderData = orderRes.data.data;
        setOrder(orderData);

        // 2. AWB se tracking fetch karo — yahan orderData use karo, order state ka wait mat karo!
        if (orderData?.awb_number) {
          try {
            const trackRes = await axiosInstance.get(
              `${ApiURL}/track/${orderData.awb_number}`
            );
            if (trackRes.data.status === 1 && trackRes.data.data) {
              setTracking(trackRes.data.data);
            }
          } catch (trackErr) {
            console.log("Tracking API failed:", trackErr);
          }
        }
      } catch (err) {
        console.error("Order fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  // Ab yeh safety net bhi add kar dete hain (extra strong)
  useEffect(() => {
    if (order?.awb_number && !tracking) {
      const retry = async () => {
        try {
          const res = await axiosInstance.get(
            `${ApiURL}/track/${order.awb_number}`
          );
          if (res.data.status === 1 && res.data.data) {
            setTracking(res.data.data);
          }
        } catch (err) {
          console.log("Retry failed");
        }
      };
      retry();
    }
  }, [order]);

  // Current status from latest scan
  const getCurrentStatus = () => {
    if (!tracking?.tracking_detail || tracking.tracking_detail.length === 0) {
      return "Order Placed";
    }
    const latest =
      tracking.tracking_detail[tracking.tracking_detail.length - 1];
    return latest.scan;
  };

  const currentStatus = tracking ? getCurrentStatus() : "Processing";

  // Sort scans: latest first
  const sortedScans = tracking?.tracking_detail
    ? [...tracking.tracking_detail].reverse()
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f0ed] text-gray-600 text-lg">
        Loading your order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f0ed] text-red-600">
        Order not found
      </div>
    );
  }

  return (
    <div className="bg-[#f3f0ed]">

    <div className="max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row font-inter ">
      <div className="w-full md:w-1/4 md:sticky md:top-0 md:h-screen">
        <SideBar />
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-4 bg-[#f3f0ed]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <ChevronLeft
            className="cursor-pointer"
            size={24}
            onClick={() => navigate("/myorders")}
          />
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold"># {order.orderId}</h3>
              <p className="text-sm text-gray-600 mt-1">
                Placed on:{" "}
                <span className="font-medium">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "N/A"}
                </span>
              </p>
              <p className="text-sm font-semibold text-[#00382e] mt-2">
                Current Status: {currentStatus}
              </p>
              {order.awb_number && (
                <p className="text-sm text-gray-600 mt-2 flex items-center gap-2">
                  <Package size={16} />
                  Tracking ID:{" "}
                  <span className="font-mono font-bold">
                    {order.awb_number}
                  </span>
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#00382e]">
                ₹{order.grandTotal.toFixed(2)}
              </p>
              <p className="text-green-600 font-medium">Free Shipping</p>
            </div>
          </div>
        </div>

        {/* Live Tracking Timeline */}
        {order.awb_number && sortedScans.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Truck className="text-[#00382e]" />
              Live Tracking Updates
            </h3>

            <div className="space-y-5">
              {sortedScans?.map((scan, index) => {
                const isLatest = index === 0;
                return (
                  <div
                    key={index}
                    className={`flex gap-5 p-3 rounded-xl border-l-4 ${
                      isLatest
                        ? "border-[#00382e] bg-green-50 shadow-md"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {scan.scan.includes("Delivered") ? (
                        <CheckCircle className="text-green-600" size={28} />
                      ) : scan.scan.includes("Out for") ||
                        scan.scan.includes("Pickup") ? (
                        <Truck className="text-blue-600" size={28} />
                      ) : (
                        <Package className="text-orange-600" size={28} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4
                          className={`text-md font-bold ${
                            isLatest ? "text-[#00382e]" : "text-gray-800"
                          }`}
                        >
                          {scan.scan}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(scan.scan_date_time).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                            }
                          )}{" "}
                          •{" "}
                          {new Date(scan.scan_date_time).toLocaleTimeString(
                            "en-IN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>

                      <p className="text-gray-700 flex items-center gap-2">
                        <MapPin size={16} />
                        {scan.location}
                      </p>

                      {scan.remark && (
                        <p className="mt-3 text-sm font-bold text-orange-700 bg-orange-100 px-4 py-2 rounded-full inline-block">
                          {scan.remark}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : order?.awb_number ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 mb-8">
            <Package size={60} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg">
              Tracking will appear here once pickup is done
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 mb-8">
            <Package size={60} className="mx-auto mb-4 text-gray-400" />
            <p className="text-lg">Order is being prepared for shipment</p>
          </div>
        )}

        {/* Products */}
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
          {order.orderItems.map((item) => (
            <div key={item.orderItemId} className="p-6 flex gap-6">
              <img
                src={`${ApiURL}/assets/Products/${item.imageUrl}`}
                alt={item.productName}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">
                  {item.productName}
                </h3>
                {item.color && (
                  <p className="text-gray-600">
                    Color: {item.color.color_name}
                  </p>
                )}
                {item?.size && (
                  <p className="text-gray-600">Size: {item.size}</p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <p>
                    Quantity: <span className="font-bold">{item.quantity}</span>
                  </p>
                  <p className="text-xl font-bold text-[#00382e]">
                    ₹{item.totalAmount?.toFixed(2) || item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderDetails;
