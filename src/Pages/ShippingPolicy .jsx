const ShippingPolicy = () => {
  return (
    <div className="container max-w-3xl px-4 py-8 mx-auto text-justify text-gray-800">
      <h1 className="mb-6 text-4xl font-bold text-center">SHIPPING POLICY</h1>

      <div className="space-y-8 text-sm text-gray-700">
        <p className="mb-4">
          This policy applies to orders within India. It is designed to ensure
          that you are clearly informed about our shipping process. By placing
          an order on glamgait.com, you agree to the terms outlined below.
        </p>

        {/* A */}
        <h2 className="mt-6 text-3xl font-semibold">A. SHIPPING COST</h2>
        <p className="mb-4">
          We offer <strong>free shipping</strong> across India on all orders.
        </p>

        {/* B */}
        <h2 className="mt-6 text-3xl font-semibold">
          B. PROCESSING & DELIVERY TIME
        </h2>
        <p className="mb-1">
          Order cut-off time: <strong>02:00 PM (IST)</strong>
        </p>
        <p className="mb-1">
          Handling time: <strong>1–2 business days</strong> (Monday to Saturday)
        </p>
        <p className="mb-1">
          Transit time: <strong>6–7 business days</strong> (Monday to Saturday)
        </p>
        <p className="mb-4">
          Estimated total delivery time: <strong>7–9 business days</strong> from
          the date of order.
        </p>

        {/* C */}
        <h2 className="mt-6 text-3xl font-semibold">C. SHIPPING METHOD</h2>
        <p className="mb-4">
          We use trusted courier partners such as Bluedart, Delhivery,
          Xpressbees, and DTDC for delivering orders.
        </p>

        {/* D */}
        <h2 className="mt-6 text-3xl font-semibold">D. CHANGE OF ADDRESS</h2>
        <p className="mb-4">
          You can request a change of delivery address within 24 hours of
          placing your order. Once the order has been shipped, the address
          cannot be modified. Please contact us at{" "}
          <a
            href="mailto:support@glamgait.com"
            className="text-blue-600 underline"
          >
            support@glamgait.com
          </a>
          .
        </p>

        {/* E */}
        <h2 className="mt-6 text-3xl font-semibold">E. ORDER CANCELLATION</h2>
        <p className="mb-4">
          Orders can be canceled before dispatch. Once the order has been
          shipped, cancellation is not possible. Please refer to our Return &
          Refund Policy.
        </p>

        {/* F */}
        <h2 className="mt-6 text-3xl font-semibold">
          F. PARCELS DAMAGED IN TRANSIT
        </h2>
        <p className="mb-4">
          If your parcel is damaged during transit, please refuse delivery or
          contact us within 48 hours with proof (images). We will assist you in
          resolving the issue.
        </p>

        {/* NEW G */}
        <h2 className="mt-6 text-3xl font-semibold">G. DELIVERY DELAYS</h2>
        <p className="mb-4">
          While we aim to deliver orders within the estimated timeframe, delays
          may occur due to courier issues, weather conditions, or unforeseen
          circumstances.
        </p>

        {/* CONTACT */}
        <p className="mt-8 text-base">For any questions, contact us:</p>
        <div className="mt-2 space-y-1">
          <p>
            <strong>Email:</strong> support@glamgait.com
          </p>
          <p>
            <strong>Phone:</strong> +91 84019 70022
          </p>
          <p>
            <strong>Address:</strong> 312, Capital Plaza, Near D-Mart, Yogi
            Chowk, Surat, Gujarat 395010, India
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
