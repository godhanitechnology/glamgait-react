const RefundPolicy = () => {
  return (
    <div className="bg-white min-h-screen text-justify">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-semibold text-black mt-2">
            RETURN AND REFUND POLICY
          </h2>
        </div>

        <div className="space-y-10 text-sm text-gray-700">
          <section>
            <p className="mb-4">
              We want you to be completely satisfied with your purchase. If you
              need to return an item, please read through our return and refund
              policies below to ensure a smooth process.
            </p>

            <h2 className="text-3xl font-semibold text-black mt-6 mb-3">
              Return Policy
            </h2>
            <p className="mb-3">
              To qualify for a return, the product must be returned within{" "}
              <strong>7 calendar days</strong> of delivery in{" "}
              <strong>unused, undamaged condition</strong>, with all original
              tags and packaging attached. You must notify us within 7 days of
              delivery to initiate the return process by emailing{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
              .
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Important:</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                Products purchased during <strong>sales, discounts</strong>, or
                with <strong>coupon codes</strong>, as well as items from{" "}
                <strong>clearance sales</strong>, are{" "}
                <strong>non-returnable</strong> and{" "}
                <strong>non-exchangeable</strong>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              Refund Options
            </h2>
            <p className="mb-3">
              We offer two refund methods for your convenience:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-4">
              <li>
                <strong>Bank Transfer:</strong>
                <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                  <li>
                    Receive{" "}
                    <strong>approximately 100% of the product price</strong>
                  </li>
                  <li>
                    A <strong>₹200 return pickup charge</strong> will apply
                    (Please note, the return charge may vary depending on the
                    size and weight of the item).
                  </li>
                </ul>
              </li>
            </ol>
            <p className="mb-3">
              <strong>Refunds are processed through:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>
                <strong>Google Pay, Paytm, PhonePe</strong>, or{" "}
                <strong>bank transfer</strong> (No cash refunds).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              Return Process
            </h2>
            <ol className="list-decimal list-inside space-y-3 mb-4">
              <li>
                <strong>Initiate Return:</strong> Once we approve your return
                request, we'll arrange a <strong>reverse pickup</strong> within
                2-3 business days.
              </li>
              <li>
                <strong>Product Inspection:</strong> Once the item arrives at
                our warehouse, we will inspect its condition to verify
                eligibility for a refund.
              </li>
              <li>
                <strong>Refund Issuance:</strong> After verification, we will
                confirm your refund amount via email or WhatsApp, and the refund
                will be processed within 2-3 business days.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              Returning Your Product
            </h2>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                <strong>360-Degree Video:</strong> Before opening the package,
                please send us a video showing the condition of the product.
              </li>
              <li>
                <strong>Pickup:</strong> If you choose the reverse pickup
                option, please ensure the product is unused, unwashed, and all
                original tags are still attached.
              </li>
              <li>
                <strong>Self-Ship:</strong> If we are unable to offer pickup in
                your area, you may ship the item back at your own cost. Please
                include your order number and return ID in the package.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              Exchange Policy
            </h2>
            <p className="mb-3">
              We offer <strong>free exchanges</strong> for eligible products. If
              you'd like to exchange an item, simply contact us, and once your
              request is approved, we will arrange a reverse pickup. After
              verifying the returned item, we will send you the new product at
              no extra charge.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              Order Cancellation Policy
            </h2>
            <p className="mb-4">
              You may cancel your order anytime before it is dispatched from our
              warehouse. If the item has already been delivered, please follow
              the return process outlined above.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mt-10 mb-4 uppercase">
              Need Assistance?
            </h2>
            <p className="mb-4">
              If you have any questions or need help with returns, exchanges, or
              cancellations, don't hesitate to reach out to us at{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>{" "}
              or call us at{" "}
              <a href="tel:+918401970022" className="text-blue-600 underline">
                +91 84019 70022
              </a>
              . We are here to assist you!
            </p>
            <p className="font-semibold">
              Thank you for shopping with Glamgait!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
