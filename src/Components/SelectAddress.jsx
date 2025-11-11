import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, MoreVertical, Phone } from "lucide-react";
import AddAddress from "./AddAddress";
import toast from "react-hot-toast";
import { ApiURL, razorpayKEY, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";

const SelectAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = userInfo();
  const u_id = user?.u_id;
  const cartItems = location.state?.cartItems || [];

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressType, setAddressType] = useState("HOME");
  const [subtotal, setSubtotal] = useState(0);
  // const [taxes, setTaxes] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      const res = await axiosInstance.post(`${ApiURL}/getaddress`, { u_id });
      setAddresses(res.data.data);
    } catch (error) {
      setAddresses([]);
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
    if (cartItems.length > 0) {
      const sub = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setSubtotal(sub);
      // setTaxes(25);
      setDeliveryFee(0);
    }
  }, []);

  const grandTotal = subtotal + deliveryFee;

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay loaded");
    script.onerror = () => console.log("Payment SDK failed to load");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleContinue = async () => {
    if (!selectedAddress) {
      console.log("Please select an address to continue");
      return;
    }

    const orderData = {
      u_id,
      cart_items: cartItems.map((item) => ({
        p_id: item.p_id,
        sc_id: item.sc_id || null,
        size_id: item.size_id || null,
        pcolor_id: item.pcolor_id || null,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      shipping: deliveryFee,
      // tax: taxes,
      total: grandTotal,
      address_id: selectedAddress,
      payment_method: paymentMethod.toLowerCase(),
    };

    try {
      const response = await axiosInstance.post(
        `${ApiURL}/createorder`,
        orderData
      );

      if (response.data.status !== 1) {
        console.log(response.data.message || "Failed to place order");
        return;
      }

      const order_id = response.data.data.order_id;

      // Online Payment Flow
      if (paymentMethod.toLowerCase() === "online") {
        if (!window.Razorpay) {
          console.log("Razorpay SDK not loaded yet");
          return;
        }

        // Ensure we have rzp_order_id from backend
        const { rzp_order_id, amount, currency } = response.data.data;
        if (!rzp_order_id) {
          console.log("Razorpay order ID missing from backend");
          return;
        }

        const options = {
          key: razorpayKEY,
          amount: amount,
          currency: currency,
          name: "GlamGait",
          description: `Order #${order_id}`,
          order_id: rzp_order_id,
          handler: async function (razorpayResponse) {
            const payload = {
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              order_id,
              u_id,
            };

            if (
              !payload.razorpay_payment_id ||
              !payload.razorpay_order_id ||
              !payload.razorpay_signature
            ) {
              console.error("Missing fields:", payload);
              return;
            }

            try {
              const verifyResponse = await axiosInstance.post(
                `${ApiURL}/verifyPayment`,
                payload
              );

              if (verifyResponse.data.status === 1) {
                toast.success("Payment successful!");
                navigate("/order-confirmation", {
                  state: { orderId: order_id },
                });
              } else {
                console.log(
                  verifyResponse.data.message || "Payment verification failed"
                );
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
            }
          },
          prefill: {
            name: user?.name || "",
            email: user?.email || "",
            contact: user?.phone || "",
          },
          theme: { color: "#063d32" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.success("Order placed successfully!");
        navigate("/order-confirmation", { state: { orderId: order_id } });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const displayedAddresses = showAllAddresses
    ? addresses
    : addresses?.slice(0, 3);

  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">Select Address</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT: Address list */}
        <div className="flex-1">
          {addresses?.length > 0 ? (
            <div className="space-y-3">
              {displayedAddresses.map((address) => (
                <div
                  key={address.add_id}
                  onClick={() => setSelectedAddress(address.add_id)}
                  className={`bg-white rounded-xl p-5 shadow-sm cursor-pointer ${
                    selectedAddress === address.add_id
                      ? "border-2 border-[#063d32]"
                      : "border border-transparent"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedAddress === address.add_id
                          ? "border-[#063d32]"
                          : "border-gray-400"
                      }`}
                    >
                      {selectedAddress === address.add_id && (
                        <div className="w-3 h-3 rounded-full bg-[#063d32]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">
                          {address.first_name} {address.last_name}
                        </h4>
                        <span className="bg-[#063d32] text-white text-xs px-2 py-0.5 rounded">
                          {address.type || "HOME"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {address.address}, {address.apartment}, {address.city} -{" "}
                        {address.zip_code}, {address.state}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{address.phone_number}</span>
                      </div>
                    </div>
                    <button className="text-gray-600 hover:text-black">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))}
              {addresses.length > 3 && (
                <button
                  onClick={() => setShowAllAddresses(!showAllAddresses)}
                  className="text-[#063d32] font-medium mt-4 hover:underline"
                >
                  {showAllAddresses ? "View Less" : "View More"}
                </button>
              )}
            </div>
          ) : (
            <p className="text-gray-500 mb-4">No addresses found.</p>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 border-2 border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white transition"
          >
            <Plus size={20} />
            <span className="font-medium">ADD NEW ADDRESS</span>
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full lg:w-1/3 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div key={item.cart_id} className="flex gap-4 border-b py-4">
                  <div className="w-20 h-26">
                    <img
                      src={`${ApiURL}/assets/Products/${item.images[0]}`}
                      alt={item.product_name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      Size: <span className="font-medium">{item.size}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Colour:{" "}
                      <span className="font-medium">
                        {item.color.color_name}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: <span className="font-medium">{item.quantity}</span>
                    </p>
                    <p className="text-sm font-medium mt-1">
                      Total: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              {/* Payment Method */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Payment Method</h4>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="w-4 h-4 accent-black"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={() => setPaymentMethod("Online")}
                      className="w-4 h-4 accent-black"
                    />
                    <span>Online Payment</span>
                  </label>
                </div>
              </div>
              {/* Pricing Summary */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between text-sm">
                  <span>Taxes</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div> */}
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Grand Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-[#063d32] text-white py-3 rounded-md hover:bg-[#052d25] transition"
              >
                {paymentMethod === "Online" ? "PAY NOW" : "CONFIRM ORDER"}
              </button>
            </>
          ) : (
            <p className="text-gray-500">No cart items found.</p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddAddress
          onClose={() => setIsModalOpen(false)}
          addressType={addressType}
          setAddressType={setAddressType}
        />
      )}
    </div>
  );
};

export default SelectAddress;
