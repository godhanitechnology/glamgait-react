import React from "react";

const TermsofService = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black">Terms & Conditions</h1>
          <p className="text-sm text-gray-600 mt-2">
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
              Welcome to Glamgait.com. These Terms & Conditions govern your use
              of our website and services. By accessing or purchasing from
              Glamgait, you agree to comply with and be bound by the following
              terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              1. General Conditions
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                By using this website, you confirm that you are at least 18
                years old or accessing under the supervision of a
                parent/guardian.
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
            <ul className="list-disc list-inside space-y-1">
              <li>
                Glamgait sells fashion apparel, accessories, and related
                products.
              </li>
              <li>
                All product descriptions, images, and prices are subject to
                change without notice.
              </li>
              <li>
                We strive to display product colors accurately; however, actual
                colors may vary due to screen settings.
              </li>
              <li>Product availability is subject to stock.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              3. Pricing & Payments
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                All prices are listed in INR (₹) and inclusive/exclusive of GST
                (as mentioned).
              </li>
              <li>
                We accept payments via UPI, Debit/Credit Cards, Net Banking,
                Wallets, and Cash on Delivery (if applicable).
              </li>
              <li>
                Glamgait reserves the right to cancel any order due to pricing
                errors or suspected fraudulent activity.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              4. Order Acceptance & Cancellation
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Orders are confirmed only after successful payment or COD
                confirmation.
              </li>
              <li>
                We reserve the right to cancel orders due to:
                <ul className="list-circle list-inside ml-6 mt-1 space-y-1">
                  <li>Incorrect pricing</li>
                  <li>Stock unavailability</li>
                  <li>Suspicious transactions</li>
                </ul>
              </li>
              <li>Customers may cancel orders before dispatch.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              5. Shipping & Delivery
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Delivery timelines are estimates and may vary due to location or
                courier delays.
              </li>
              <li>
                We are not responsible for delays caused by courier partners or
                natural disruptions.
              </li>
              <li>
                Shipping charges (if any) will be clearly mentioned at checkout.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              6. Returns, Refunds & Exchanges
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Customers may request return/exchange within 7 days of delivery.
              </li>
              <li>
                Products must be unused, unwashed, and in original packaging.
              </li>
              <li>
                Refunds will be processed within 10 business days after product
                inspection.
              </li>
              <li>
                Certain items (innerwear, customized products, sale items) may
                not be eligible for return.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              7. Intellectual Property
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                All content on Glamgait.com (logos, images, text, graphics) is
                the property of Glamgait and protected by copyright laws.
              </li>
              <li>Unauthorized reproduction or use is strictly prohibited.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              8. User Conduct
            </h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Upload harmful or illegal content.</li>
              <li>Attempt unauthorized access to the website.</li>
              <li>Use the website for fraudulent purposes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-3xl font-semibold text-black">
              9. Limitation of Liability
            </h2>
            <p>Glamgait shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Indirect or incidental damages.</li>
              <li>Losses arising from misuse of products.</li>
              <li>Technical errors or temporary website downtime.</li>
            </ul>
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
              These Terms shall be governed by and interpreted in accordance
              with the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of courts in Surat, Gujarat.
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
              Address: 312, Capital Plaza, Near D-Mart, Yogi Chowk, Surat-395010
              (GJ)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsofService;
