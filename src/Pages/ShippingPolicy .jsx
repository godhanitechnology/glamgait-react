const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl text-gray-800 text-justify">
      <h1 className="text-4xl font-bold mb-6">SHIPPING POLICY</h1>

      <div className="space-y-8 text-sm text-gray-700">
        <p className="mb-4">
          We are committed to deliver your order accurately in good condition
          and always on time. We believe in express shipping and most of your
          order is shipped within 24 hours once the order is placed except on
          weekends or on public holidays. We deliver to all locations across
          India. We do not ship internationally.
        </p>

        <h2 className="font-semibold mt-6 text-3xl">
          What are the delivery charges?
        </h2>
        <p className="mb-4">We provide free shipping all over India.</p>

        <h2 className="font-semibold mt-6 text-3xl">When do we deliver</h2>
        <p className="mb-1">
          Order cutoff time:{" "}
          <strong>6:00 PM (GMT+05:30) India Standard Time (Kolkata)</strong>
        </p>
        <p className="mb-1">Processing time: 1-2 Days (Mon – Sat)</p>
        <p className="mb-1">Transit time: 3-7 Days (Mon – Sat)</p>
        <p className="mb-4">Shipping time: 3-7 Days (Mon – Sat)</p>

        <h2 className="font-semibold mt-6 text-3xl">Shipping in India</h2>
        <p className="mb-4">
          Shipping in India is free. This is to maintain the service level and
          provide your product on time. We use Ecom, Delivery, Shadowfax, etc.
          and Speed Post services to deliver in India.
        </p>

        <h2 className="font-semibold mt-6 text-3xl">
          What is the estimated delivery time?
        </h2>
        <p className="mb-1">
          We ship the product from our warehouse within 1-2 business days except
          on weekends or on public holidays.
        </p>
        <p className="mb-4">
          Generally it takes 3-7 days to reach the customer’s address after
          dispatching the order from our warehouse.
        </p>

        <h2 className="text-3xl font-bold mb-6 uppercase">
          WHAT HAPPENS IF MY ORDER IS LOST IN TRANSIT?
        </h2>
        <p className="mb-4">
          If a shipment is lost in transit, we wait for 15 days and then
          reprocess or reship the order.
        </p>
        <p className="mb-4">
          If you have any questions about our shipping policies, please visit
          our Help Desk section or contact us directly:
        </p>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Email:</strong> support@glamgait.com
          </p>
          <p>
            <strong>Phone / WhatsApp:</strong> +91 84019 70022
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
