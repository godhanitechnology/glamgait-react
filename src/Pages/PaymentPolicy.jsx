import world from "../assets/world.png";
import callf from "../assets/callf.svg";
import mailfooter from "../assets/mailfooter.svg";

const PaymentPolicy = () => {
  return (
    <div className="container max-w-4xl p-6 mx-auto text-justify">
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-4xl font-bold text-black">Payment Policy</h1>
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
      </div>
      <div className="space-y-10 text-sm text-gray-700">
        <section className="space-y-4">
          <p className="mb-4">
            We accept the following credit and debit cards, digital payments,
            and other methods for secure checkout on glamgait.com.
          </p>

          <h2 className="text-2xl font-semibold text-black">
            Accepted Payment Methods
          </h2>
          <ul className="space-y-1 list-disc list-inside">
            <li>American Express</li>
            <li>VISA</li>
            <li>Mastercard</li>
            <li>RuPay</li>
            <li>Google Pay</li>
            <li>UPI</li>
          </ul>
          <p className="mt-4">
            Once you select checkout, you will be transferred to our secure
            payment gateway, where you can complete payment using American
            Express, Google Pay, Mastercard, Visa, UPI, BHIM, or opt for Cash On
            Delivery.
          </p>
        </section>

        {/* Add This Section  */}
        <section className="space-y-3">
          <div>
            <h3 className="text-2xl font-semibold text-black">
              Secure Payments
            </h3>
            <p className="mt-2">
              All payments made on our website are processed through secure and
              encrypted payment gateways. We use SSL (Secure Socket Layer)
              technology to ensure that your personal and payment information is
              protected at all times.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-black">
              Pricing & Charges
            </h3>
            <p className="mt-2">
              All prices displayed on the website are in INR (₹). Any applicable
              taxes, shipping charges, or additional fees will be clearly shown
              at checkout before payment is completed.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-black">
              Payment Confirmation
            </h3>
            <p className="mt-2">
              Once your payment is successfully processed, you will receive an
              order confirmation via email.
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-black">Contact Info</h2>
          <p>For any payment-related queries, please reach out to us:</p>

          {/* Change This  */}
          <div className="space-y-3">
            <p>Glamgait</p>

            <div className="flex items-center gap-2">
              <img src={mailfooter} alt="mail" />
              <a
                href="mailto:support@glamgait.com"
                className="text-blue-600 underline"
              >
                support@glamgait.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <img src={callf} alt="call" />
              <span>+91 84019 70022</span>
            </div>

            <div className="flex items-center gap-2">
              <img src={world} alt="world" className="w-5 h-5" />
              <a
                href="https://www.glamgait.com"
                className="text-blue-600 underline"
              >
                www.glamgait.com
              </a>
            </div>

            <p>
              Address: 312, Capital Plaza, Near D-Mart, Yogi Chowk, Surat,
              Gujarat 395010, India
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentPolicy;
