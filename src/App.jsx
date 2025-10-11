import { useState , useEffect} from "react";

import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation  } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SingleProductPage from "./Pages/SingleProductPage";
import WhatsAppIcon from "./Ui/WhatsappIcon";
import NotFound from "./Components/NotFound";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import AllProductPage from "./Pages/AllProductPage";
import Register from "./Components/Register";
import Login from "./Components/Login";

import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import AboutPage from "./Pages/AboutPage";
import Blog from "./Components/Blog";
import SingleBlog from "./Components/SingleBlog";
import Profileorder from "./Components/Profileorder";
import OrderDetails from "./Components/OrderDetails";
import PersonalInfo from "./Components/PersonalInfo";
import SelectAddress from "./Components/SelectAddress";
import BackToTop from "./Ui/BackToTop";


function App() {
  const location = useLocation();

  // ✅ Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="relative">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<SingleProductPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<AllProductPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/myorders" element={<Profileorder />} />
          <Route path="/OrderDetails" element={<OrderDetails />} />
          <Route path="/myinfo" element={<PersonalInfo />} />
          <Route path="/selectaddress" element={<SelectAddress />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppIcon />
        <BackToTop/>
      </div>
    </>
  );
}

export default App;
