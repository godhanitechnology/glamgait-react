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
            We accept the following credit and debit cards, digital payments,
            and other methods for secure checkout on glamgait.com.
          </p>

          <h2 className="text-3xl font-semibold text-black">
            Accepted Payment Methods
          </h2>
          <ul className="list-disc list-inside space-y-1">
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

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">Contact Info</h2>
          <p>For any payment-related queries, please reach out to us:</p>
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
            <br />
            Address: 312, Capital Plaza, Near D-Mart, Yogi Chowk, Surat, Gujarat
            395010, India
          </p>
        </section>
      </div>
    </div>
  );
};

export default PaymentPolicy;
