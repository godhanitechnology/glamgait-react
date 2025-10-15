// // import React from "react";
// // import Hero from "../Components/Hero";
// // import Categories from "../Components/Categories";
// // import FourCategories from "../Components/FourCategories";
// // import NewArrivels from "../Components/NewArrivels";
// // import Services from "../Components/Services";
// // import CustomersSay from "../Components/CustomersSay";
// // import WatchAndBuy from "../Components/WatchAndBuy";
// // import StayInLoop from "../Components/StayInLoop";

// // const HomePage = () => {
// //   return (
// //     <div>
// //       <Hero />
// //       <Categories />
// //       <NewArrivels />
// //       <FourCategories />
// //       <Services />
// //       <CustomersSay />
// //       <WatchAndBuy />
// //       <StayInLoop />
// //     </div>
// //   );
// // };

// // export default HomePage;


// import React from "react";
// import Hero from "../Components/Hero";
// import Categories from "../Components/Categories";
// import FourCategories from "../Components/FourCategories";
// import NewArrivels from "../Components/NewArrivels";
// import Services from "../Components/Services";
// import CustomersSay from "../Components/CustomersSay";
// import WatchAndBuy from "../Components/WatchAndBuy";
// import StayInLoop from "../Components/StayInLoop";
// import leftlight from "../assets/leftlight.png";

// const HomePage = () => {
//   return (
//     <div className="overflow-x-hidden relative">
//       <Hero />
//       <Categories />

//       {/* ===== Shared Wrapper for Image + Components ===== */}
//       <div className="relative overflow-x-hidden z-0">
        
//         {/* === Decorative Image Positioned Absolutely === */}
//         <div className=" absolute top-185 -right-20 md:top-210 md:-right-25 lg:top-315 lg:-right-31 xl:top-315 xl:-right-33 z-50 pointer-events-none">
//           <img
//             src={leftlight}
//             alt="Decorative Lantern"
//             className="
//               w-30 h-30 
//               md:w-40 md:h-40
//               lg:w-50 lg:h-50 
//               xl:w-40 xl:h-60 
//               object-contain 
//               mt-[-6rem] 
//               mr-4 
//               xl:mt-[-8rem] 
//               xl:mr-10
//             "
//           />
//         </div>

//         {/* Components under the image */}
//         <NewArrivels />
//         <FourCategories />
//       </div>

//       {/* Rest of the Page */}
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
import waves from "../assets/waves.png";

const HomePage = () => {
  return (
    // ✅ Restrict only this wrapper from creating Y scroll
    <div className="overflow-x-hidden relative">
      <Hero />
      <Categories />

      <div className="relative overflow-hidden z-0">
        {/* === Decorative Left Light Image === */}
        <div className="absolute top-140 -right-22 md:top-158 md:-right-30 lg:top-272 lg:-right-28 xl:top-250 xl:-right-44 z-10 pointer-events-none">
          <img
            src={leftlight}
            alt="Decorative Lantern"
            className="w-40 h-40 md:w-56 md:h-56 lg:w-52 lg:h-52 xl:w-80 xl:h-80 object-contain opacity-90"
          />
        </div>

        {/* === Waves 1 === */}
        <div className="hidden md:block absolute -top-48 right-0 md:top-80 md:-right-20 lg:top-114 lg:-right-25 xl:top-120 xl:-right-30 2xl:top-120 2xl:right-30 z-10 pointer-events-none">
          <img
            src={waves}
            alt="Wave Decoration"
            className="w-[25rem] md:w-80 md:h-80 lg:w-100 lg:h-100 xl:w-120 xl:h-120 rotate-[-15deg]"
          />
        </div>

        {/* === New Arrivals Section === */}
        <NewArrivels />

        {/* === Waves 2 === */}
        <div className="hidden md:block absolute -bottom-40 left-0 md:bottom-220 md:left-50 lg:bottom-250 lg:left-60 xl:left-110 xl:bottom-280 2xl:left-170 2xl:bottom-280 z-10 pointer-events-none">
          <img
            src={waves}
            alt="Wave Decoration"
            className="w-[25rem] md:w-80 md:h-80 lg:w-100 lg:h-100 xl:w-120 xl:h-120 -rotate-15"
          />
        </div>

        {/* === Four Categories Section === */}
        <FourCategories />

      {/* Rest of the Page */}
      <Services />
      </div>
      <CustomersSay />
      <WatchAndBuy />
      <StayInLoop />
    </div>
  );
};

export default HomePage;
