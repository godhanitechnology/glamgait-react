import world from "../assets/world.png";
import mailfooter from "../assets/mailfooter.svg";

const About = () => {
  return (
    <div className="relative bg-[#f3f0ed] min-h-screen flex justify-center sm:py-16 py-4 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Decorative Images */}
      {/* <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 right-24 w-16 md:w-20 opacity-100 pointer-events-none"
      />
      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 right-48 w-16 md:w-16 opacity-100 pointer-events-none"
      />
      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 left-24 w-16 md:w-20 opacity-100 pointer-events-none"
      />
      <img
        src={leftlight}
        alt="decorator"
        className="hidden sm:block absolute top-0 left-48 w-16 md:w-16 opacity-100 pointer-events-none"
      /> */}

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-[#00382e] text-center mb-6">
          About Us
        </h1>

        <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify">
          <strong className="text-[#00382e] text-lg">
            About Us – Glamgait.com
          </strong>
          <br />
          Welcome to Glamgait.com, your trusted destination for trendy,
          affordable, and high-quality fashion for women and kids across India.
          <br />
          At Glamgait, we believe that fashion is not just about clothing — it’s
          about confidence, comfort, and self-expression. Our mission is to
          bring stylish, premium-quality products at prices that make fashion
          accessible to everyone.
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">Who We Are</strong>
          <br />
          Glamgait.com is an India-based eCommerce fashion brand dedicated to
          offering carefully curated collections including:
          <br />
          • Women’s ethnic wear
          <br />
          • Sarees & dress materials
          <br />
          • Co-ord sets
          <br />
          • Kids fashion seasonal collections
          <br />
          • Trend-driven wear
          <br />
          We focus on quality fabrics, comfortable fits, and designs inspired by
          modern trends and traditional elegance.
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">Our Mission</strong>
          <br />
          Our goal is simple:
          <br />
          <strong>
            To deliver fashionable, affordable, and reliable shopping
            experiences to every household in India.
          </strong>
          <br />
          We continuously work with trusted manufacturers and suppliers to
          ensure:
          <br />
          • Quality-checked products
          <br />
          • Fair pricing
          <br />
          • Secure transactions
          <br />
          • Reliable delivery partners
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">
            Why Choose Glamgait?
          </strong>
          <br />
          • Affordable Pricing
          <br />
          • Quality Assurance Checks
          <br />
          • Secure Online Payments
          <br />
          • Cash on Delivery (COD) Available
          <br />
          • Customer Support Assistance
          <br />
          • Easy Order Tracking
          <br />
          We aim to build long-term relationships with our customers by
          maintaining transparency and reliability in every order.
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">
            Product Quality & Responsibility
          </strong>
          <br />
          Every product listed on Glamgait.com goes through a verification
          process before being published. Product descriptions, images, and
          specifications are reviewed to ensure they accurately represent the
          item.
          <br />
          We are committed to:
          <br />
          • Providing clear product details
          <br />
          • Displaying real pricing information
          <br />
          • Transparent pricing
          <br />
          • Ethical sourcing practices
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">
            Customer Trust & Transparency
          </strong>
          <br />
          Your trust matters to us. That’s why we maintain:
          <br />
          • Clear Return & Refund Policies
          <br />
          • Transparent Shipping Information
          <br />
          • Secure Checkout Process (SSL Protected)
          <br />
          • Dedicated Customer Support
          <br />
          If you ever have questions or concerns, our support team is always
          ready to assist you.
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">Our Vision</strong>
          <br />
          We aspire to become one of India’s most trusted and loved online
          fashion brands by delivering consistent value, quality, and customer
          satisfaction.
          <br />
          <br />
          <strong className="text-[#00382e] text-lg">
            Contact Information
          </strong>
          <br />
          For inquiries, partnerships, or support, please contact us at:
          <br />
          <div className="flex gap-2 items-center pt-5">
            <img src={mailfooter} alt="mail" />
            Email: support@glamgait.com
          </div>
          <br />
          <div className="flex gap-2 items-center">
            <img src={world} alt="world" className="h-5 w-5" />
            Website: www.glamgait.com
          </div>
          <br />
          Business Hours: Monday – Saturday, 10:00 AM – 6:00 PM (IST)
        </p>
      </div>
    </div>
  );
};

export default About;
