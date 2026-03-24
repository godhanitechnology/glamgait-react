const CancellationPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-justify bg-white">
      <div className="container max-w-4xl p-6 mx-auto">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-5xl font-bold text-black">Cancellation Policy</h1>
          <p className="mt-2 text-sm text-gray-600">
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

          {/* Change the Section  */}
          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              Order Cancellation
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                You may cancel your order <strong>before it is shipped</strong>.
              </li>
              <li>
                To cancel, please contact our Customer Support team with:
                <ul className="pl-4 list-disc list-inside">
                  <li>Order Number</li>
                  <li>Your Full Name</li>
                  <li>Email used for the order</li>
                </ul>
                You can contact us by:
                <br />
                <a
                  href="mailto:support@glamgait.com"
                  className="text-blue-600 underline"
                >
                  support@glamgait.com
                </a>{" "}
                or{" "}
                <a href="tel:+918401970022" className="text-blue-600 underline">
                  +91 84019 70022
                </a>
              </li>
              <li>
                Orders that have already been shipped <strong>cannot</strong> be
                canceled. In such cases, please follow our{" "}
                <a href="/return-refund" className="text-blue-600 underline">
                  Return & Refund Policy
                </a>{" "}
                once you receive the item.
              </li>
              <li>
                After we accept your cancellation, we will send you a
                confirmation email within 24–48 hours.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              2. Cancellation Timeframe
            </h2>
            <table className="w-full text-left border border-collapse border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 font-semibold border border-gray-300">
                    Order Status
                  </th>
                  <th className="px-4 py-2 font-semibold border border-gray-300">
                    Cancellation Allowed?
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">
                    Order Placed — Not Yet Processed
                  </td>
                  <td className="px-4 py-2 border border-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">
                    Order Processing — Not Yet Shipped
                  </td>
                  <td className="px-4 py-2 border border-gray-300">Yes</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300">
                    Order Shipped
                  </td>
                  <td className="px-4 py-2 border border-gray-300">No</td>
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
            <ul className="space-y-1 list-disc list-inside">
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

          {/* Change This Section  */}
          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              4. How to Request a Cancellation
            </h2>
            <p>
              To request a cancellation, please provide the following
              information:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Your Order Number</li>
              <li>Your Full Name</li>
              <li>Email Address used for the order</li>
              <li>Reason for cancellation (optional)</li>
            </ul>
            <p>
              You can send this information to us by email at{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>{" "}
              or tell us over phone at{" "}
              <a href="tel:+918401970022" className="text-blue-600 underline">
                +91 84019 70022
              </a>
              .
            </p>
          </section>

          {/* Change This Section  */}
          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              5. Exceptions & Special Cases
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                Some products cannot be canceled once processing begins. This
                includes:
                <ul className="pl-4 list-disc list-inside">
                  <li>
                    Customised or personalised products (e.g., name‑printed or
                    tailor‑made items)
                  </li>
                </ul>
              </li>
              <li>
                Orders purchased under promotional codes, special discounts, or
                limited‑time offers follow the same standard cancellation terms
                unless otherwise specified in the offer details.
              </li>
            </ul>
          </section>

          {/* Change This Section */}
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
                target="_blank"
                rel="noopener noreferrer"
              >
                glamgait.com
              </a>{" "}
              with the updated <strong>Effective Date</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">Contact Us</h2>
            <p>For any cancellation‑related queries, please contact us:</p>
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
              <br />
              Address: 312, Capital Plaza, Near D‑Mart, Yogi Chowk, Surat,
              Gujarat 395010, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;
