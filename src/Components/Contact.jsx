import React, { useState } from "react";
import leftlonglight from "../assets/leftlonglight.png";
import location from "../assets/location.svg";
import phone from "../assets/phone.svg";
import mail from "../assets/mail.svg";
import pattern from "../assets/pattern.png";
import ig from "../assets/ig.svg";
import fb from "../assets/fb.svg";
import yt from "../assets/yt.svg";
import axiosInstance from "../Axios/axios"; // Make sure this is your configured Axios instance
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      console.log("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/addcontact", { name, email, message });

      if (response.data?.status === 1) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        console.log(response.data?.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-[#F3F0ED] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute -right-5 top-15 md:-right-5 md:top-25 2xl:right-10 2xl:top-30 transform -translate-y-1/2 z-15">
        <img
          src={leftlonglight}
          alt="Lantern"
          className="w-10 h-30 md:w-28 md:h-85 md:-right-10"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 bg-white md:p-10 p-4 rounded-lg shadow-2xl">
        <img
          src={pattern}
          alt="Pattern"
          className="absolute left-0 top-0 h-30 w-30 md:h-60 md:w-65 z-0"
        />
        <img
          src={pattern}
          alt="Pattern"
          className="absolute right-0 bottom-0 h-30 w-30 md:h-60 md:w-65 rotate-180 z-0"
        />
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg mt-2">
            If you have any query or suggestion, you can contact us here. We would love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <div className="flex items-center justify-center">
            <div className="bg-white w-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                Leave us a message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First, Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02382A]"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02382A]"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02382A] h-24 resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-[#02382A] text-white py-2 rounded-md cursor-pointer transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "SEND"}
                </button>
              </form>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5"><img src={location} alt="Location" /></div>
                <p className="text-gray-700">
                  Information technologies
                  <br /> building, Victoria Island, Lagos,
                  <br /> Nigeria.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5"><img src={phone} alt="Phone" /></div>
                <a href="tel:+23408112364568" className="text-gray-700">+234 081-1236-4568</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-5"><img src={mail} alt="Email" /></div>
                <a href="mailto:support@glamgait.com" className="text-gray-700">support@glamgait.com</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex space-x-3">
                  <a href="https://www.instagram.com/glamgait_india/" target="_blank" rel="noopener noreferrer">
                    <img src={ig} alt="Instagram" className="h-8 w-8"/>
                  </a>
                  <a href="https://www.facebook.com/glamgait.in/" target="_blank" rel="noopener noreferrer">
                    <img src={fb} alt="Facebook" className="h-8 w-8"/>
                  </a>
                  <a href="https://www.youtube.com/@GlamgaitIndia" target="_blank" rel="noopener noreferrer">
                    <img src={yt} alt="Youtube" className="h-7.5 w-7.5"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full h-64 sm:h-72 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.974713693577!2d3.409401614279148!3d6.427678895304472!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c8a3c8e8e8e%3A0x1234567890abcdef!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1634567890!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
