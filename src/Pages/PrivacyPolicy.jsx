import world from "../assets/world.png";
import mailfooter from "../assets/mailfooter.svg";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl text-justify">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-4xl font-bold text-black">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mt-2">
          Effective Date: 25 February, 2026
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
        <section className="space-y-4">
          <p className="mb-4">
            At <strong>Glamgait</strong>, we value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website{" "}
            <a
              href="https://www.glamgait.com"
              className="text-blue-600 underline"
            >
              www.glamgait.com
            </a>
            .
          </p>
          <p>
            By using our website, you agree to the terms of this Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            1. Information We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <h3 className="text-xl font-extrabold mt-4">
            A. Personal Information
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Shipping & Billing Address</li>
            <li>
              Payment Information (processed securely via third-party payment
              gateways)
            </li>
          </ul>

          <h3 className="text-xl font-extrabold mt-4">
            B. Non-Personal Information
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>IP Address</li>
            <li>Browser Type</li>
            <li>Device Information</li>
            <li>Pages Visited</li>
            <li>Cookies & Tracking Data</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            2. How We Use Your Information
          </h2>
          <p>We use the information collected for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Processing and delivering orders</li>
            <li>Providing customer support</li>
            <li>Improving our website and services</li>
            <li>Sending order updates</li>
            <li>Marketing and promotional communications (with consent)</li>
            <li>Running advertisements (Google Ads, Meta Ads)</li>
            <li>Preventing fraud and ensuring website security</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            3. Google & Third-Party Services (Important for Google Ads Approval)
          </h2>
          <p>We use third-party services including but not limited to:</p>
          <ul className="list-disc list-inside space-y-1">
            <strong>
              <li>Google Analytics</li>
              <li>Google Ads / Remarketing</li>
              <li>Facebook Pixel (Meta Pixel)</li>
            </strong>
            <li>Payment Gateways (Razorpay / Stripe / etc.)</li>
          </ul>
          <p className="mt-2">
            These services may use cookies, tracking pixels, and similar
            technologies to collect information about your behavior on our
            website.
          </p>
          <h3 className="text-xl font-semibold mt-3">Google Advertising</h3>
          <p>
            Google uses cookies to serve ads based on your previous visits to
            our website or other websites. You may opt out of personalized
            advertising by visiting:{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="text-blue-600 underline break-all"
            >
              https://www.google.com/settings/ads
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            4. Cookies Policy
          </h2>
          <p>We use cookies to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enhance user experience</li>
            <li>Analyze website traffic</li>
            <li>Personalize advertisements</li>
          </ul>
          <p className="mt-2">
            You can disable cookies through your browser settings. However, some
            features of the website may not function properly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            5. Data Sharing & Disclosure
          </h2>
          <p>
            We do <strong>not sell your personal information</strong>.
          </p>
          <p>We may share information with:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Shipping partners & logistics providers</li>
            <li>Payment processors / providers</li>
            <li>Marketing & analytics partners</li>
            <li>Legal authorities (if required by law)</li>
          </ul>
          <p className="mt-2">
            All third parties are obligated to protect your data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            6. Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information. Payment transactions are
            encrypted using SSL technology.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access your personal data</li>
            <li>Request correction of incorrect data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>
          <p className="mt-2">To exercise these rights, contact us at:</p>
          <p>
            <div className="flex gap-2 items-center pt-5">
              <img src={mailfooter} alt="" />
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
              <img src={world} alt="" className="h-5 w-5" />
              Phone: +91 84019 70022
            </div>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            8. Children's Privacy
          </h2>
          <p>
            Our website is not intended for children under 13 years of age. We
            do not knowingly collect personal data from children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">
            9. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with an updated effective date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-3xl font-semibold text-black">10. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please
            contact:
          </p>
          <p>
            <strong> Glamgait</strong>
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
            <br /> India (GJ)
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
