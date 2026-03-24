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
              By placing an order through glamgait.com, you are agreeing to the
              terms below. We set these policies to ensure that you are fully
              aware of our refund and return methods and procedures. These
              policies are applicable to orders in India.
            </p>

            <h2 className="text-3xl font-semibold text-black mt-6 mb-3">
              A. 7 DAY RETURN POLICY
            </h2>
            <p className="mb-3">
              We have a 7-day return policy, which means you have 7 days after
              receiving your order to request a return. To be eligible for a
              return, your item must be in the same condition that you received
              it — unworn, unused, with tags attached, and in its original
              packaging. You will also need the receipt or proof of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              B. RETURN PROCESS
            </h2>
            <p className="mb-3">
              To start a return, contact us at{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
              . If your return is accepted, we will provide you with
              instructions on how and where to send your package, along with a
              return shipping label if applicable.
            </p>
            <p className="mb-3">
              Items sent back to us without first requesting a return will not
              be accepted.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              C. DAMAGED AND WRONG PRODUCTS OR ISSUES
            </h2>
            <p className="mb-3">
              Please inspect your order upon receipt and contact us immediately
              if the item is defective, damaged, or if you received the wrong
              item. So that we can evaluate the issue and make it right.
            </p>
            <p className="mb-3">
              Depending on where you live, the time it may take for your
              exchanged product to reach you may vary.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              D. EXCHANGES
            </h2>
            <p className="mb-3">
              We only exchange products that are damaged, wrong product, wrong
              size, or defective. If you need to exchange a product, please
              contact us at{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              E. RESTOCKING FEE
            </h2>
            <p className="mb-3">
              We do not charge a restocking fee on returns.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-black mt-8 mb-3">
              F. REFUNDS
            </h2>
            <p className="mb-3">
              We will notify you once we’ve received and inspected your return,
              and let you know if the refund was approved or not. If approved,
              you’ll be automatically refunded on your original payment method.
              Please remember it can take some time for your bank or credit card
              company to process and post the refund too.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-black mt-10 mb-4 uppercase">
              Need Assistance?
            </h2>
            <p className="mb-4">
              If you have any questions about our return or refund policies,
              feel free to contact us at{" "}
              <p className="mt-4">
                <strong>Email:</strong> support@glamgait.com
              </p>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
