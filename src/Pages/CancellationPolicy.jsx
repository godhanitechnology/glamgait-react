const CancellationPolicy = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center text-justify">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-5xl font-bold text-black">Cancellation Policy</h1>
          <p className="text-sm text-gray-600 mt-2">
            Effective Date: 25 February 2026
          </p>
        </div>

        <div className="space-y-10 text-sm text-gray-700">
          <section className="space-y-4">
            <p>
              At <strong>GlamGait.com</strong>, we strive to provide a smooth
              and satisfactory shopping experience. Please review our
              cancellation policy below before placing your order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              1. Order Cancellation
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                You may request cancellation of your order{" "}
                <strong>before it is shipped</strong>.
              </li>
              <li>
                To cancel an order, please contact our Customer Support team at{" "}
                <a
                  href="mailto:support@glamgait.com"
                  className="text-blue-600 underline"
                >
                  support@glamgait.com
                </a>{" "}
                or{" "}
                <a href="tel:+918401970022" className="text-blue-600 underline">
                  +91 84019 70022
                </a>{" "}
                with your order number and cancellation request.
              </li>
              <li>
                Orders that have already been shipped <strong>cannot</strong> be
                canceled. In such cases, please follow our{" "}
                <a href="/return-refund" className="text-blue-600 underline">
                  Return & Refund Policy
                </a>{" "}
                once you receive the item.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              2. Cancellation Timeframe
            </h2>
            <table className="w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 font-semibold">
                    Order Status
                  </th>
                  <th className="border border-gray-300 px-4 py-2 font-semibold">
                    Cancellation Allowed?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Order Placed — Not Yet Processed
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Yes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Order Processing — Not Yet Shipped
                  </td>
                  <td className="border border-gray-300 px-4 py-2">Yes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Order Shipped
                  </td>
                  <td className="border border-gray-300 px-4 py-2">No</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3">
              We will confirm the cancellation to you via email within{" "}
              <strong>24–48 hours</strong> of your request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              3. Refunds After Cancellation
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                If your order is successfully canceled before shipment, you will
                receive a <strong>full refund</strong>.
              </li>
              <li>
                Refunds will be issued via the original payment method used at
                the time of purchase.
              </li>
              <li>
                Please allow <strong>3–10 business days</strong> (depending on
                your bank or payment provider) for the refund to reflect in your
                account.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              4. How to Request a Cancellation
            </h2>
            <p>To request a cancellation, please provide:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Your Order Number</li>
              <li>Full Name</li>
              <li>Email used for the order</li>
              <li>Reason for cancellation (optional)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              5. Exceptions & Special Cases
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Customized or personalized products may not be eligible for
                cancellation after processing begins.
              </li>
              <li>
                Orders placed under promotional codes or special offers follow
                the same cancellation terms unless otherwise stated.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              6. Changes to This Policy
            </h2>
            <p>
              We may update this Cancellation Policy from time to time. The
              latest version will be available on{" "}
              <a
                href="https://www.glamgait.com"
                className="text-blue-600 underline"
              >
                glomagait.com
              </a>{" "}
              with the updated <strong>Effective Date</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">Contact Us</h2>
            <p>For any cancellation-related queries, please contact:</p>
            <p>
              Email:{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
              <br />
              Phone:{" "}
              <a href="tel:+918401970022" className="text-blue-600 underline">
                +91 84019 70022
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
