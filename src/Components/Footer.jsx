import { Link } from "react-router-dom";
import leftlonglight from "../assets/leftlonglight.png";
import footerbg from "../assets/footerbg.jpg";
import footer1 from "../assets/footer1.jpg";
import logo from "../assets/logo.svg";
import fb from "../assets/fb.svg";
import ig from "../assets/ig.svg";
import yt from "../assets/yt.svg";
import mailfooter from "../assets/mailfooter.svg";
import callf from "../assets/callf.svg";
import locationf from "../assets/locationf.svg";
// Payment icons
import gpayImg from "../assets/payment/gpay.svg";
import phonepeImg from "../assets/payment/phonepe.svg";
import upiImg from "../assets/payment/upi.svg";
import visaImg from "../assets/payment/visa.svg";
import mastercardImg from "../assets/payment/mastercard.svg";
import rupayImg from "../assets/payment/rupay.svg";
import netbankingImg from "../assets/payment/netbanking.svg";

const Footer = () => {
  return (
    <footer className="relative w-full font-inter text-[#1c1c1c] lg:min-h-[400px] overflow-hidden bg-[#f2e7d5] p-4">
      {/* Decorative Lamps */}
      {/* <img
        src={leftlonglight}
        alt="Decor"
        className="absolute -right-1 lg:-left-10 lg:top-10 lg:w-20 xl:-left-10 xl:top-0 xl:w-25 2xl:left-0 z-11 pointer-events-none"
      />
      <img
        src={leftlonglight}
        alt="Decor"
        className="hidden lg:block absolute lg:left-105 lg:w-10 xl:left-120 xl:w-9 2xl:left-150 2k:left-210 4k:left-270 z-10 pointer-events-none"
      />
      <img
        src={leftlonglight}
        alt="Decor"
        className="hidden lg:block absolute lg:left-115 lg:w-8 xl:left-130 xl:w-7 2xl:left-160 2k:left-220 4k:left-280 z-10 pointer-events-none"
      />
      <img
        src={leftlonglight}
        alt="Decor"
        className="hidden lg:block absolute lg:-right-5 lg:w-18 xl:right-5 xl:w-20 2xl:right-0 z-10 pointer-events-none"
      /> */}

      {/* Footer Content */}
      <div className="relative py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 z-10">
        {/* Background Behind Content */}
        <div className="absolute inset-0 -z-10 lg:hidden">
          <img
            src={footer1}
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Brand Section */}
        <div className="flex flex-col">
          <div>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <p className="text-sm xl:text-[16px] leading-relaxed mb-4 max-w-xs">
              Glamgait creates fun, fashionable, and comfy kidswear — designed
              with love and style, right here in India.
            </p>
          </div>
          <div className="flex space-x-2">
            <a
              href="https://www.facebook.com/Glamgait.Fashion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" className="h-7.5 w-7.5" />
            </a>
            <a
              href="https://www.instagram.com/glamgait/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ig} alt="Instagram" className="h-7.5 w-7.5" />
            </a>
            <a
              href="https://www.youtube.com/@Glamgait-store"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={yt} alt="YouTube" className="h-7 w-7" />
            </a>
          </div>
        </div>

        {/* Home Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            {/* <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:underline">
                Shipping & Returns
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Our Policy
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
            <li>
              <Link to="/terms" className="hover:underline">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:underline">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/return-refund" className="hover:underline">
                Return & Refund Policy
              </Link>
            </li>
            <li>
              <Link to="/payment" className="hover:underline">
                Payment Policy{" "}
              </Link>
            </li>
            <li>
              <Link to="/cancellationpolicy" className="hover:underline">
                Cancellation Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm lg:text-base">
            <li className="flex gap-2 ">
              <div className="h-5 w-5">
                <img src={locationf} alt="" />
              </div>
              312, Capital Plaza,
              <br /> Near D-Mart, Yogi Chowk,
              <br /> Surat Gujarat 395010
              <br /> India
            </li>
            <li className="flex gap-2 items-center">
              <div className="h-5 w-5">
                <img src={callf} alt="" />
              </div>
              <a href="tel:+918401970022" className="hover:underline">
                +91 84019 70022
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <div className="h-5 w-5">
                <img src={mailfooter} alt="" />
              </div>
              <a href="mailto:support@glamgait.com" className="hover:underline">
                support@glamgait.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Secure Payment Trust Seal */}
      <div className="relative z-20 py-5 px-4 bg-[#F1E8D7] lg:bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
          {/* Label */}
          <div className="flex items-center gap-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 6V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V6L12 2Z"
                fill="#7a5c3b"
              />
              <path
                d="M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
                fill="white"
              />
            </svg>
            <span className="text-[10px] sm:text-xs font-bold text-[#7a5c3b] tracking-[0.15em] uppercase">
              100% Secure Payments
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            {[
              { src: gpayImg, alt: "Google Pay" },
              { src: phonepeImg, alt: "PhonePe" },
              { src: upiImg, alt: "UPI" },
              { src: visaImg, alt: "Visa" },
              { src: mastercardImg, alt: "Mastercard" },
              { src: rupayImg, alt: "RuPay" },
              { src: netbankingImg, alt: "Net Banking" },
            ].map((pm) => (
              <div
                key={pm.alt}
                className="w-16 h-10 flex items-center justify-center bg-white border border-[#e0d0bc] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <img
                  src={pm.src}
                  alt={pm.alt}
                  title={pm.alt}
                  className="max-h-5 sm:max-h-6 max-w-[52px] w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-20 text-center text-xs sm:text-sm lg:text-base text-black font-medium bg-[#F1E8D7] lg:bg-transparent">
        © 2024 Glamgait is a brand owned and operated by Trishulom Cloths
        Online, Surat, India.
      </div>
      <div className="relative z-20 text-center text-xs sm:text-sm lg:text-base text-black font-medium bg-[#F1E8D7] lg:bg-transparent">
        Design by Godhani Technology.
      </div>

      {/* <div className="lg:absolute inset-x-0 bottom-0 z-0 h-full">
        <img
          src={footerbg}
          alt="Footer Background"
          className="w-full h-full lg:object-cover object-contain"
        />
      </div> */}
    </footer>
  );
};

export default Footer;
