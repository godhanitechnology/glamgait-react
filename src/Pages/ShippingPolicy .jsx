const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-gray-800 text-justify">
      <h1 className="text-4xl font-bold mb-6 text-center">SHIPPING POLICY</h1>

      <div className="space-y-8 text-sm text-gray-700">
        <p className="mb-4">
          This policy is applicable to orders within India. This policy is
          designed to ensure that you are clearly aware of our shipping policies
          and procedures. By ordering from this store, you accept the policies
          contained herein.
        </p>

        <h2 className="font-semibold mt-6 text-3xl">A. SHIPPING COSTS</h2>
        <p className="mb-4">We are offering free shipping all over India.</p>

        <h2 className="font-semibold mt-6 text-3xl">
          B. TRANSIT, HANDLING & ORDER CUT-OFF TIME
        </h2>
        <p className="mb-1">
          Generally, shipments are in transit for 6–7 days (Monday to Saturday).
        </p>
        <p className="mb-1">
          Order cut-off time is 02:00 PM India Standard Time (IST).
        </p>
        <p className="mb-4">
          Order handling time is 1–2 business days (Monday to Saturday).
        </p>

        <h2 className="font-semibold mt-6 text-3xl">C. DELIVERY TERMS</h2>
        <p className="mb-4">
          We use the Bluedart ,Delhivery ,Xpressbees ,DTDC Curriers to deliver
          the product.
        </p>

        <h2 className="font-semibold mt-6 text-3xl">D. CHANGE OF ADDRESS</h2>
        <p className="mb-4">
          We cannot change the delivery address once the order is shipped. If
          you need to change the delivery address, please contact us within 24
          hours of placing your order at{" "}
          <a
            href="mailto:support@glamgait.com"
            className="text-blue-600 underline"
          >
            support@glamgait.com
          </a>
          .
        </p>

        <h2 className="font-semibold mt-6 text-3xl">E. CANCELLATIONS</h2>
        <p className="mb-4">
          If you change your mind before you have received your order, we are
          able to accept cancellations at any time before the order has been
          dispatched. If an order has already been dispatched, please refer to
          our refund policy.
        </p>

        <h2 className="font-semibold mt-6 text-3xl">
          F. PARCELS DAMAGED IN TRANSIT
        </h2>
        <p className="mb-4">
          If you find a parcel is damaged in transit, if possible, please reject
          the parcel from the courier and get in touch with our customer
          service. If the parcel has been delivered without you being present,
          please contact customer service with the next steps.
        </p>

        <p className="mt-8 text-base">For any questions, contact us at:</p>
        <div className="space-y-1 mt-2">
          <p>
            <strong>Email:</strong> support@glamgait.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
