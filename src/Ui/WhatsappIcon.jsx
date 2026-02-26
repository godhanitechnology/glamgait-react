import whatsapp from "../assets/whatsapp.png";

const WhatsAppIcon = () => {
  const phoneNumber = "+918401970022";
  const message = "Hello! I would like to chat with you.";
  const encodedMessage = encodeURIComponent(message);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
      aria-label="Chat on WhatsApp"
    >
      <img
        src={whatsapp}
        alt="WhatsApp Chat"
        className="w-12 h-12 md:w-20 md:h-20 hover:scale-110 transition-transform duration-300 rounded-full"
      />
    </a>
  );
};

export default WhatsAppIcon;
