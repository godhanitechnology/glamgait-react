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
