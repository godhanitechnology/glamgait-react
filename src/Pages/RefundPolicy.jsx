const RefundPolicy = () => {
  return (
    <div className="min-h-screen text-justify bg-white">
      <div className="container max-w-4xl p-6 mx-auto">
        <div className="mb-8 text-center">
          <h2 className="mt-2 text-5xl font-semibold text-black">
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

            <h2 className="mt-6 mb-3 text-3xl font-semibold text-black">
              A. 7 DAY RETURN POLICY
            </h2>

            <p className="mb-3">
              You have 7 days from the date of delivery to request a return. To
              be eligible, the product must be unused, unworn, with tags, and in
              original packaging with proof of purchase.
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
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
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
              C. DAMAGED AND WRONG PRODUCTS OR ISSUES
            </h2>
            <p className="mb-3">
              Please inspect your order upon delivery. If you receive a damaged,
              defective, or incorrect item, contact us within 48 hours with
              images for verification.{" "}
            </p>
          </section>

          <section>
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
              D. EXCHANGES
            </h2>
            <p className="mb-3">
              We allow exchanges for defective, damaged, incorrect, or
              size-related issues (subject to availability). If you need to
              exchange a product, please contact us at{" "}
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
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
              E. RESTOCKING FEE
            </h2>
            <p className="mb-3">
              We do not charge a restocking fee on returns.
            </p>
          </section>

          {/* Refund Section Change  */}

          <section>
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
              F. REFUNDS
            </h2>
            <p className="mb-3">
              Once we receive and inspect your returned item, we will notify you
              regarding the approval or rejection of your refund. <br />
              If approved, the refund will be processed to your original payment
              method within 5–10 business days. <br />
              Please note that it may take additional time for your bank or
              payment provider to reflect the refund in your account.
            </p>
          </section>
          <section>
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
              G. RETURN SHIPPING
            </h2>
            <p className="mb-3">
              Return shipping costs are borne by the customer unless the product
              is defective or incorrect.
            </p>
          </section>
          <section>
            <h2 className="mt-8 mb-3 text-3xl font-semibold text-black">
              H. RETURN METHOD
            </h2>
            <p className="mb-3">
              All returns must be sent via courier to the provided return
              address after approval.{" "}
            </p>
          </section>

          <section>
            <h2 className="mt-10 mb-4 text-3xl font-bold text-black uppercase">
              I. Need Assistance?
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

          <section>
            <h2 className="mt-10 mb-4 text-3xl font-bold text-black uppercase">
              Need Assistance?
            </h2>

            <p className="mb-4">
              If you have any questions about our return or refund policies,
              feel free to contact us:
            </p>

            <div className="space-y-2">
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
