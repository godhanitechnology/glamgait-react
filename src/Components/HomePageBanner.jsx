import backgroundImage from "../assets/singlebanner.jpg";

const HomePageBanner = ({
  title = "comfort and lasting style",
  bgImage = backgroundImage,
  smallImage, // e.g., 600px version
  mediumImage, // e.g., 1200px version
}) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
      <img
        src={bgImage}
        srcSet={`
          ${smallImage} 600w,
          ${mediumImage} 1200w,
          ${bgImage} 2000w
        `}
        sizes="(max-width: 600px) 600px, (max-width: 1200px) 1200px, 2000px"
        alt={title}
        className="absolute inset-0 object-cover object-center w-full h-full"
        width="1440"
        height="450"
        loading="eager"
        fetchPriority="high"
      />
      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="px-4 text-2xl font-bold text-center sm:text-3xl md:text-4xl lg:text-5xl drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default HomePageBanner;
