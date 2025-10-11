// import React from "react";
// import Hero from "../Components/Hero";
// import Categories from "../Components/Categories";
// import FourCategories from "../Components/FourCategories";
// import NewArrivels from "../Components/NewArrivels";
// import Services from "../Components/Services";
// import CustomersSay from "../Components/CustomersSay";
// import WatchAndBuy from "../Components/WatchAndBuy";
// import StayInLoop from "../Components/StayInLoop";

// const HomePage = () => {
//   return (
//     <div>
//       <Hero />
//       <Categories />
//       <NewArrivels />
//       <FourCategories />
//       <Services />
//       <CustomersSay />
//       <WatchAndBuy />
//       <StayInLoop />
//     </div>
//   );
// };

// export default HomePage;


import React from "react";
import Hero from "../Components/Hero";
import Categories from "../Components/Categories";
import FourCategories from "../Components/FourCategories";
import NewArrivels from "../Components/NewArrivels";
import Services from "../Components/Services";
import CustomersSay from "../Components/CustomersSay";
import WatchAndBuy from "../Components/WatchAndBuy";
import StayInLoop from "../Components/StayInLoop";
import leftlight from "../assets/leftlight.png";

const HomePage = () => {
  return (
    <div className="overflow-x-hidden relative">
      <Hero />
      <Categories />

      {/* ===== Shared Wrapper for Image + Components ===== */}
      <div className="relative overflow-x-hidden z-0">
        
        {/* === Decorative Image Positioned Absolutely === */}
        <div className=" absolute top-185 -right-20 md:top-210 md:-right-25 lg:top-315 lg:-right-31 xl:top-315 xl:-right-33 z-50 pointer-events-none">
          <img
            src={leftlight}
            alt="Decorative Lantern"
            className="
              w-30 h-30 
              md:w-40 md:h-40
              lg:w-50 lg:h-50 
              xl:w-40 xl:h-60 
              object-contain 
              mt-[-6rem] 
              mr-4 
              xl:mt-[-8rem] 
              xl:mr-10
            "
          />
        </div>

        {/* Components under the image */}
        <NewArrivels />
        <FourCategories />
      </div>

      {/* Rest of the Page */}
      <Services />
      <CustomersSay />
      <WatchAndBuy />
      <StayInLoop />
    </div>
  );
};

export default HomePage;

