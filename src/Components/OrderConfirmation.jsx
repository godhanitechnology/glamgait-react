import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import img from "../assets/Order-Confirm.png";
const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f0ed] px-4">
      <div className="w-full max-w-md text-center">
        <img src={img} alt="" />
        <h1 className="text-4xl font-semibold my-5">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order {orderId ? `#${orderId}` : ""} is Confirmed !
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            You can track your order in your profile or check your email for
            order details.
          </p>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-[#063d32] text-white py-3 px-6 rounded-md hover:bg-[#052d25] transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
