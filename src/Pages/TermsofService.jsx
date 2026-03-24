import React from "react";

const TermsofService = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-4xl p-6 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-black">Terms & Conditions</h1>
          <p className="mt-2 text-sm text-gray-600">
            Effective Date: 25 February 2026
          </p>
          <p className="text-sm text-gray-600">
            Website:{" "}
            <a
              href="https://www.glamgait.com"
              className="text-blue-600 underline"
            >
              www.glamgait.com
            </a>
          </p>
          <p className="text-sm text-gray-600">Company Name: Glamgait</p>
        </div>

        <div className="space-y-10 text-sm text-gray-700">
          <section>
            <p className="mb-4">
              Welcome to Glamgait.com. By accessing or purchasing from our
              website, you agree to comply with and be bound by the following
              Terms & Conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              1. General Conditions
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                By using this website, you confirm that you are at least 18
                years old or using it under parental supervision.
              </li>
              <li>
                We reserve the right to refuse service to anyone for any reason
                at any time.
              </li>
              <li>
                You agree not to misuse the website or violate any applicable
                laws.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              2. Products & Services
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>Glamgait offers fashion apparel and related products.</li>
              <li>
                All product descriptions, images, and prices are subject to
                change without notice.
              </li>
              <li>
                We strive for accuracy, but actual product colors may vary due
                to screen differences.
              </li>
              <li>Product availability is subject to stock.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              3. Pricing & Payments
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                All prices are listed in INR (₹) and applicable taxes will be
                clearly mentioned at checkout.
              </li>
              <li>
                We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and
                Cash on Delivery (if available).
              </li>
              <li>
                We reserve the right to cancel orders in case of pricing errors
                or suspected fraudulent activity.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-semibold text-black">
              4. Order Acceptance & Cancellation
            </h2>

            <ul className="space-y-2 list-disc list-inside">
              <li>
                Orders are confirmed only after successful payment or Cash on
                Delivery (COD) confirmation.
              </li>

              <li>
                We reserve the right to cancel or refuse any order under the
                following circumstances:
                <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
                  <li>Incorrect pricing or product information</li>
                  <li>Product out of stock or unavailable</li>
                  <li>Suspected fraudulent or unauthorized transactions</li>
                </ul>
              </li>

              <li>
                Customers may request order cancellation{" "}
                <strong>before the order is dispatched</strong>.
              </li>

              <li>
                Once the order has been shipped, cancellation is not possible.
                In such cases, customers may refer to our{" "}
                <a href="/return-refund" className="text-blue-600 underline">
                  Return & Refund Policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              5. Shipping & Delivery
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                Delivery timelines are estimates and may vary due to external
                factors.
              </li>
              <li>
                We are not responsible for delays caused by courier partners or
                unforeseen circumstances.
              </li>
              <li>
                Shipping charges (if applicable) will be shown at checkout.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              6. Returns, Refunds & Exchanges
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                Returns and exchanges are governed by our Return & Refund
                Policy.
              </li>
              <li>
                Products must be unused, unwashed, and in original packaging.
              </li>
              <li>
                Refunds will be processed within 10 business days after product
                inspection.
              </li>
              <li>Certain items may not be eligible for return.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              7. Intellectual Property
            </h2>
            <ul className="space-y-1 list-disc list-inside">
              <li>
                All content on this website (logos, images, text, graphics) is
                owned by Glamgait and protected by copyright laws.
              </li>
              <li>Unauthorized use is strictly prohibited.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              8. User Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Upload harmful or illegal content.</li>
              <li>Attempt unauthorized access to the website.</li>
              <li>Use the website for fraudulent purposes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              9. Limitation of Liability
            </h2>
            <p>
              Glamgait shall not be liable for indirect damages, losses due to
              misuse of products, or technical issues.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              10. Privacy Policy
            </h2>
            <p>
              Your use of Glamgait.com is also governed by our{" "}
              <a href="/privacy" className="text-blue-600 underline">
                Privacy Policy
              </a>
              , which explains how we collect and use your data in compliance
              with Indian data protection laws and applicable Google policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              11. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of India. All disputes shall
              be subject to jurisdiction of courts in Surat, Gujarat.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              12. Contact Information
            </h2>
            <p>For any queries regarding these Terms, please contact:</p>
            <p>
              Glamgait
              <br />
              Email:{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
              <br />
              Phone: +91 84019 70022
              <br />
              Address: 312, Capital Plaza,
              <br /> Near D-Mart, Yogi Chowk,
              <br /> Surat Gujarat 395010
              <br /> India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsofService;
