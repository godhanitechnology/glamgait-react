import Hero from "../Components/Hero";
import Categories from "../Components/Categories";
import FourCategories from "../Components/FourCategories";
import NewArrivals from "../Components/NewArrivals";
import Services from "../Components/Services";
// import CustomersSay from "../Components/CustomersSay";
import WatchAndBuy from "../Components/WatchAndBuy";
import StayInLoop from "../Components/StayInLoop";
// import waves from "../assets/waves.png";

const HomePage = () => {
  return (
    // ✅ Restrict only this wrapper from creating Y scroll
    <div className="overflow-x-hidden relative">
      <Hero />
      <Categories />

      <div className="relative overflow-hidden z-0">
        {/* === Decorative Left Light Image === */}
        {/* <div className="absolute top-140 -right-22 md:top-158 md:-right-30 lg:top-272 lg:-right-28 xl:top-250 xl:-right-44 z-10 pointer-events-none">
          <img
            src={leftlight}
            alt="Decorative Lantern"
            className="w-40 h-40 md:w-56 md:h-56 lg:w-52 lg:h-52 xl:w-80 xl:h-80 object-contain opacity-90"
          />
        </div> */}

        {/* === Waves 1 === */}
        {/* <div className="hidden md:block absolute -top-48 right-0 md:top-80 md:-right-20 lg:top-114 lg:-right-25 2xl:-right-25 2k:right-0 4k:right-50 z-10 pointer-events-none">
          <img
            src={waves}
            alt="Wave Decoration"
            className="w-[25rem] md:w-80 md:h-80 lg:w-100 lg:h-100 xl:w-120 xl:h-120 rotate-[-15deg]"
          />
        </div> */}

        {/* === New Arrivals Section === */}
        <NewArrivals />

        {/* === Waves 2 === */}
        {/* <div className="hidden md:block absolute -bottom-40 left-0 md:bottom-220 md:left-50 lg:bottom-250 lg:left-60 xl:left-110 xl:bottom-280 2xl:left-170 2xl:bottom-280 z-10 pointer-events-none">
          <img
            src={waves}
            alt="Wave Decoration"
            className="w-[25rem] md:w-80 md:h-80 lg:w-100 lg:h-100 xl:w-120 xl:h-120 -rotate-15"
          />
        </div> */}

        {/* === Four Categories Section === */}
        <FourCategories />

        {/* Rest of the Page */}
        <Services />
      </div>
      {/* <CustomersSay /> */}
      <WatchAndBuy />
      <StayInLoop />
    </div>
  );
};

export default HomePage;
