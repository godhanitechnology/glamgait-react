import world from "../assets/world.png";
import callf from "../assets/callf.svg";
import mailfooter from "../assets/mailfooter.svg";

const PaymentPolicy = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl text-justify">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-black">Payment Policy</h1>
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
      </div>

      <div className="space-y-10 text-sm text-gray-700">
        <section className="space-y-4">
          <p className="mb-4">
            Welcome to glomagait.com (“we”, “us”, “our”). This Payment Policy
            explains how payments are processed, accepted payment methods,
            billing processes, security measures, and refund conditions. By
            placing an order on glomagait.com, you agree to this policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            1. Accepted Payment Methods
          </h2>
          <p>We accept the following payment methods at checkout:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Credit & Debit Cards</strong>: Visa, MasterCard, RuPay,
              American Express
            </li>
            <li>
              <strong>Digital Wallets</strong>: Google Pay, PhonePe, Paytm,
              Amazon Pay
            </li>
            <li>
              <strong>UPI & Wallets</strong>: Google Pay UPI, PhonePe, Paytm,
              etc.
            </li>
            <li>
              <strong>Net Banking</strong> (All Banks)
            </li>
          </ul>
          <p className="mt-2 italic">
            Note: The availability of certain payment methods may vary depending
            on your region and currency.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            2. Payment Authorization
          </h2>
          <p>
            By submitting your payment information, you authorize glomagait.com
            to charge the selected payment method for the total order amount,
            including applicable taxes and shipping charges.
          </p>
          <p>
            We may obtain authorization from your card issuer or payment
            provider before processing your order. This authorization helps
            verify your payment details and ensures sufficient funds are
            available. Any authorization hold placed by your bank may
            temporarily show as pending on your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            3. Pricing & Billing
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              All prices displayed on glomagait.com are in{" "}
              <strong>Indian Rupees (₹)</strong> unless otherwise stated.
            </li>
            <li>
              Product prices, shipping fees, taxes, and applicable charges will
              be clearly shown at checkout before payment is completed.
            </li>
            <li>
              You agree to pay the total amount for your order when submitting
              the payment.
            </li>
            <li>
              glomagait.com is not responsible for bank fees, exchange rate
              differences, or currency conversion charges imposed by your
              financial institution.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            4. Payment Security
          </h2>
          <p>
            Your payment information is processed securely using
            industry-standard encryption (SSL) and security protocols. We do{" "}
            <strong>not store full credit card numbers</strong> on our servers.
          </p>
          <p>
            All online transactions are processed via trusted payment gateways
            that comply with <strong>PCI DSS</strong> (Payment Card Industry
            Data Security Standard). For supported digital wallets (e.g., Google
            Pay), tokens and secure protocols are used to protect your financial
            information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            5. Failed or Declined Transactions
          </h2>
          <p>If your payment is declined by your bank or payment provider:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your order will not be processed.</li>
            <li>You may try a different payment method.</li>
            <li>
              If you believe the decline was an error, contact your bank or
              payment service provider for assistance.
            </li>
          </ul>
          <p className="mt-2">
            We may also contact you if additional verification is required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            6. Order Confirmation & Invoicing
          </h2>
          <p>After successfully completing a payment:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              You will receive an <strong>order confirmation email</strong>{" "}
              containing details of your purchase.
            </li>
            <li>
              A digital invoice or receipt will be available via email or your
              glomagait.com account dashboard.
            </li>
            <li>Please keep this documentation for your records.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            7. Refunds & Chargebacks
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              All refunds are processed according to our{" "}
              <strong>
                {" "}
                <a href="/return-refund" className="text-blue-600 underline">
                  Return & Refund Policy
                </a>
              </strong>
              .
            </li>
            <li>
              If eligible for a refund, funds will be returned to the original
              payment method.
            </li>
            <li>
              Refund processing times may vary depending on your bank or issuer.
            </li>
            <li>
              Unauthorized chargebacks without contacting us first may result in
              order cancellation or suspension.
            </li>
          </ul>
          <p className="mt-2 font-semibold italic">
            Important: Before initiating a chargeback with your bank, please
            contact our customer support so we can resolve your concern
            efficiently.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            8. Taxes & Duties
          </h2>
          <p>
            Applicable taxes and duties are calculated at checkout based on
            local regulations and your shipping address. You are responsible
            for:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Paying all applicable taxes, duties, or fees charged by your local
              jurisdiction.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            9. Changes to Payment Policy
          </h2>
          <p>
            We may update this Payment Policy from time to time to reflect
            changes in legal requirements, payment methods, or business
            practices. Updated versions will be posted on this page with a
            revised “Last Updated” date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">10. Contact Us</h2>
          <p>For payment-related questions or support, please contact us at:</p>
          <p>
            Glamgait
            <br />
            <div className="flex gap-2 items-center pt-5">
              <img src={mailfooter} alt="mail" />
              Email:{" "}
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
            </div>
            <br />
            <div className="flex gap-2 items-center">
              <img src={callf} alt="call" />
              Phone: +91 84019 70022
            </div>
            <br />
            <div className="flex gap-2 items-center">
              <img src={world} alt="world" className="h-5 w-5" />
              Website:{" "}
              <a
                href="https://www.glamgait.com"
                className="text-blue-600 underline"
              >
                www.glamgait.com
              </a>
            </div>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PaymentPolicy;
