import backgroundImage from "../assets/singlebanner.jpg";

const HomePageBanner = ({
  title = "comfort and lasting style",
  bgImage = backgroundImage,
}) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
        width="1440"
        height="450"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default HomePageBanner;
