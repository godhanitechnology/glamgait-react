// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Plus, MoreVertical, Phone } from "lucide-react";
// import AddAddress from "./AddAddress";
// import toast from "react-hot-toast";
// import { ApiURL, razorpayKEY, userInfo } from "../Variable";
// import axiosInstance from "../Axios/axios";

// const SelectAddress = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = userInfo();
//   const u_id = user?.u_id;
//   const cartItems = location.state?.cartItems || [];

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [addressType, setAddressType] = useState("HOME");
//   const [subtotal, setSubtotal] = useState(0);
//   // const [taxes, setTaxes] = useState(0);
//   const [deliveryFee, setDeliveryFee] = useState(0);
//   const [showAllAddresses, setShowAllAddresses] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   // Fetch addresses
//   const fetchAddresses = async () => {
//     try {
//       const res = await axiosInstance.post(`${ApiURL}/getaddress`, { u_id });
//       setAddresses(res.data.data || []);
//     } catch (error) {
//       setAddresses([]);
//       console.error("Error fetching addresses:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//     if (cartItems.length > 0) {
//       const sub = cartItems.reduce(
//         (acc, item) => acc + item.price * item.quantity,
//         0
//       );
//       setSubtotal(sub);
//       // setTaxes(25);
//       setDeliveryFee(0);
//     }
//   }, []);

//   const grandTotal = subtotal + deliveryFee;

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     script.onload = () => console.log("Razorpay loaded");
//     script.onerror = () => console.log("Payment SDK failed to load");
//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   const handleContinue = async () => {
//     if (!selectedAddress) {
//       console.log("Please select an address to continue");
//       return;
//     }

//     const orderData = {
//       u_id,
//       cart_items: cartItems.map((item) => ({
//         p_id: item.p_id,
//         sc_id: item.sc_id || null,
//         size_id: item.size_id || null,
//         pcolor_id: item.pcolor_id || null,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       subtotal,
//       shipping: deliveryFee,
//       // tax: taxes,
//       total: grandTotal,
//       address_id: selectedAddress,
//       payment_method: paymentMethod.toLowerCase(),
//     };

//     try {
//       const response = await axiosInstance.post(
//         `${ApiURL}/createorder`,
//         orderData
//       );

//       if (response.data.status !== 1) {
//         console.log(response.data.message || "Failed to place order");
//         return;
//       }

//       const order_id = response.data.data.order_id;

//       // Online Payment Flow
//       if (paymentMethod.toLowerCase() === "online") {
//         if (!window.Razorpay) {
//           console.log("Razorpay SDK not loaded yet");
//           return;
//         }

//         // Ensure we have rzp_order_id from backend
//         const { rzp_order_id, amount, currency } = response.data.data;
//         if (!rzp_order_id) {
//           console.log("Razorpay order ID missing from backend");
//           return;
//         }

//         const options = {
//           key: razorpayKEY,
//           amount: amount,
//           currency: currency,
//           name: "GlamGait",
//           description: `Order #${order_id}`,
//           order_id: rzp_order_id,
//           handler: async function (razorpayResponse) {
//             const payload = {
//               razorpay_payment_id: razorpayResponse.razorpay_payment_id,
//               razorpay_order_id: razorpayResponse.razorpay_order_id,
//               razorpay_signature: razorpayResponse.razorpay_signature,
//               order_id,
//               u_id,
//             };

//             if (
//               !payload.razorpay_payment_id ||
//               !payload.razorpay_order_id ||
//               !payload.razorpay_signature
//             ) {
//               console.error("Missing fields:", payload);
//               return;
//             }

//             try {
//               const verifyResponse = await axiosInstance.post(
//                 `${ApiURL}/verifyPayment`,
//                 payload
//               );

//               if (verifyResponse.data.status === 1) {
//                 toast.success("Payment successful!");
//                 navigate("/order-confirmation", {
//                   state: { orderId: order_id },
//                 });
//               } else {
//                 console.log(
//                   verifyResponse.data.message || "Payment verification failed"
//                 );
//               }
//             } catch (error) {
//               console.error("Error verifying payment:", error);
//             }
//           },
//           prefill: {
//             name: user?.name || "",
//             email: user?.email || "",
//             contact: user?.phone || "",
//           },
//           theme: { color: "#063d32" },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } else {
//         toast.success("Order placed successfully!");
//         navigate("/order-confirmation", { state: { orderId: order_id } });
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   console.log(addresses?.length, "length");

//   useEffect(() => {
//     if (addresses?.length === 0) {
//       setIsModalOpen(true);
//     } else {
//       setIsModalOpen(false);
//     }
//   }, [addresses, cartItems]);

//   const displayedAddresses = showAllAddresses
//     ? addresses
//     : addresses?.slice(0, 3);

//   return (
//     <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10">
//       <h2 className="text-2xl font-semibold mb-6">Select Address</h2>
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* LEFT: Address list */}
//         <div className="flex-1">
//           {addresses?.length > 0 ? (
//             <div className="space-y-3">
//               {displayedAddresses.map((address) => (
//                 <div
//                   key={address.add_id}
//                   onClick={() => setSelectedAddress(address.add_id)}
//                   className={`bg-white rounded-xl p-5 shadow-sm cursor-pointer ${
//                     selectedAddress === address.add_id
//                       ? "border-2 border-[#063d32]"
//                       : "border border-transparent"
//                   }`}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div
//                       className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
//                         selectedAddress === address.add_id
//                           ? "border-[#063d32]"
//                           : "border-gray-400"
//                       }`}
//                     >
//                       {selectedAddress === address.add_id && (
//                         <div className="w-3 h-3 rounded-full bg-[#063d32]" />
//                       )}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-1">
//                         <h4 className="font-medium">
//                           {address.first_name} {address.last_name}
//                         </h4>
//                         <span className="bg-[#063d32] text-white text-xs px-2 py-0.5 rounded">
//                           {address.type || "HOME"}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-1">
//                         {address.address}, {address.apartment}, {address.city} -{" "}
//                         {address.zip_code}, {address.state}
//                       </p>
//                       <div className="flex items-center gap-1 text-sm text-gray-600">
//                         <Phone size={14} />
//                         <span>{address.phone_number}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               {addresses.length > 3 && (
//                 <button
//                   onClick={() => setShowAllAddresses(!showAllAddresses)}
//                   className="text-[#063d32] font-medium mt-4 hover:underline"
//                 >
//                   {showAllAddresses ? "View Less" : "View More"}
//                 </button>
//               )}
//             </div>
//           ) : (
//             <p className="text-gray-500 mb-4">No addresses found.</p>
//           )}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="w-full mt-6 border-2 border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white transition"
//           >
//             <Plus size={20} />
//             <span className="font-medium">ADD NEW ADDRESS</span>
//           </button>
//         </div>

//         {/* RIGHT: Order Summary */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm w-full lg:w-1/3 h-fit">
//           <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
//           {cartItems.length > 0 ? (
//             <>
//               {cartItems.map((item) => (
//                 <div key={item.cart_id} className="flex gap-4 border-b py-4">
//                   <div className="w-20 h-26">
//                     <img
//                       src={`${ApiURL}/assets/Products/${item.images[0]}`}
//                       alt={item.product_name}
//                       className="w-full h-full object-cover rounded"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-medium">{item.product_name}</p>
//                     <p className="text-sm text-gray-500">
//                       Size: <span className="font-medium">{item.size}</span>
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Colour:{" "}
//                       <span className="font-medium">
//                         {item.color.color_name}
//                       </span>
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Qty: <span className="font-medium">{item.quantity}</span>
//                     </p>
//                     <p className="text-sm font-medium mt-1">
//                       Total: ₹{(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               {/* Payment Method */}

//               {/* <div className="mt-4">
//                 <h4 className="text-sm font-semibold mb-2">Payment Method</h4>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       value="COD"
//                       checked={paymentMethod === "COD"}
//                       onChange={() => setPaymentMethod("COD")}
//                       className="w-4 h-4 accent-black"
//                     />
//                     <span>Cash on Delivery</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       value="Online"
//                       checked={paymentMethod === "Online"}
//                       onChange={() => setPaymentMethod("Online")}
//                       className="w-4 h-4 accent-black"
//                     />
//                     <span>Online Payment</span>
//                   </label>
//                 </div>
//               </div> */}
//               {/* Pricing Summary */}
//               <div className="mt-4 space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 {/* <div className="flex justify-between text-sm">
//                   <span>Taxes</span>
//                   <span>₹{taxes.toFixed(2)}</span>
//                 </div> */}
//                 <div className="flex justify-between text-sm">
//                   <span>Delivery Fee</span>
//                   <span className="text-green-600 font-medium">
//                     {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
//                   </span>
//                 </div>
//               </div>
//               <hr className="my-4" />
//               <div className="flex justify-between font-semibold text-lg">
//                 <span>Grand Total</span>
//                 <span>₹{grandTotal.toFixed(2)}</span>
//               </div>

//             {/* payment button */}

//               {/* <button
//                 onClick={handleContinue}
//                 className="w-full mt-6 bg-[#063d32] text-white py-3 rounded-md hover:bg-[#052d25] transition"
//               >
//                 {paymentMethod === "Online" ? "PAY NOW" : "CONFIRM ORDER"}
//               </button> */}
//             </>
//           ) : (
//             <p className="text-gray-500">No cart items found.</p>
//           )}
//         </div>
//       </div>

//       {isModalOpen && (
//         <AddAddress
//           onClose={() => setIsModalOpen(false)}
//           addressType={addressType}
//           setAddressType={setAddressType}
//           refreshAddresses={fetchAddresses}
//         />
//       )}
//     </div>
//   );
// };

// export default SelectAddress;

import React, { useState, useEffect } from "react";
import { X, Plus, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AddAddress from "./AddAddress";
import toast from "react-hot-toast";
import { ApiURL, razorpayKEY, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";

const SelectAddress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = userInfo();
  const u_id = user?.u_id;

  // Cart items from Buy Now or Cart page
  const cartItems = location.state?.cartItems || [];

  console.log(cartItems, "cart");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Fetch addresses
  const fetchAddresses = async () => {
    if (!u_id) return;
    try {
      const res = await axiosInstance.post(`${ApiURL}/getaddress`, { u_id });
      setAddresses(res.data.data || []);
      if (res.data.data?.length > 0) {
        setSelectedAddress(res.data.data[0].add_id);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    if (u_id) fetchAddresses();

    // Calculate subtotal
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setSubtotal(total);
    }
  }, [cartItems, u_id]);

  const grandTotal = subtotal + deliveryFee;

  // Load Razorpay
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleContinue = async () => {
    if (!u_id) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select or add a delivery address");
      return;
    }

    const orderItems = cartItems?.map((item) => ({
      p_id: item.p_id,
      pcolor_id: item.pcolor_id,
      psize_id: item.psize_id || null,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      u_id,
      cart_items: orderItems,
      subtotal,
      shipping: deliveryFee,
      total: grandTotal,
      address_id: selectedAddress,
      payment_method: paymentMethod.toLowerCase(),
    };

    try {
      const res = await axiosInstance.post(`${ApiURL}/createorder`, orderData);

      if (res.data.status !== 1) {
        toast.error(res.data.message || "Order failed");
        return;
      }

      const { order_id, rzp_order_id, amount } = res.data.data;

      if (paymentMethod === "online") {
        const options = {
          key: razorpayKEY,
          amount: amount * 100,
          currency: "INR",
          name: "GlamGait",
          description: `Order #${order_id}`,
          order_id: rzp_order_id,
          handler: async (response) => {
            try {
              const verifyRes = await axiosInstance.post(
                `${ApiURL}/verifyPayment`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id,
                }
              );

              if (verifyRes.data.status === 1) {
                toast.success("Payment successful!");
                navigate("/order-confirmation", {
                  state: { orderId: order_id },
                });
              } else {
                toast.error("Payment failed");
              }
            } catch (err) {
              toast.error("Payment verification failed");
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
      toast.error("Order placement failed");
    }
  };

  // Auto open address modal if no address
  useEffect(() => {
    if (u_id && addresses.length === 0) {
      setIsModalOpen(true);
    }
  }, [addresses, u_id]);

  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">Select Delivery Address</h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* LEFT: Addresses */}
        <div className="flex-1 space-y-4">
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <div
                key={addr.add_id}
                onClick={() => setSelectedAddress(addr.add_id)}
                className={`bg-white p-5 rounded-xl cursor-pointer transition-all border-2 ${
                  selectedAddress === addr.add_id
                    ? "border-[#063d32] shadow-md"
                    : "border-gray-200"
                }`}
              >
                <div className="flex gap-4">
                  <input
                    type="radio"
                    checked={selectedAddress === addr.add_id}
                    onChange={() => setSelectedAddress(addr.add_id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">
                        {addr.first_name} {addr.last_name}
                      </h4>
                      <span className="bg-[#063d32] text-white text-xs px-3 py-1 rounded-full">
                        {addr.type || "HOME"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {addr.address}, {addr.city} - {addr.zip_code}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Phone size={14} /> {addr.phone_number}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">
              No addresses found
            </p>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full border-2 border-dashed border-gray-400 rounded-xl py-4 flex items-center justify-center gap-3 hover:border-[#063d32] transition"
          >
            <Plus size={22} />
            <span className="font-medium">Add New Address</span>
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-lg w-full lg:w-96 h-fit">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cartItems.map((item, i) => (
              <div key={i} className="flex gap-4 pb-4 border-b">
                <img
                  src={`${ApiURL}/assets/Products/${
                    item.image_url || item.images?.[0]
                  }`}
                  alt={item.product_name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.product_name}</p>
                  <p className="text-xs text-gray-600">
                    {item.color_name} • {item.size_name || "Free Size"}
                  </p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  <p className="font-semibold mt-1">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          {/* <div className="mt-6">
            <h4 className="font-semibold mb-3">Payment Method</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-[#063d32]"
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 accent-[#063d32]"
                />
                <span>Online Payment (Razorpay)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedAddress}
            className="w-full mt-8 bg-[#063d32] text-white py-4 rounded-xl font-bold hover:bg-[#052d25] transition disabled:opacity-50"
          >
            {paymentMethod === "online" ? "PAY NOW" : "PLACE ORDER"}
          </button> */}
        </div>
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <AddAddress
          onClose={() => {
            setIsModalOpen(false);
            fetchAddresses();
          }}
          refreshAddresses={fetchAddresses}
        />
      )}
    </div>
  );
};

export default SelectAddress;
