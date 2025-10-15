// import { useState , useEffect} from "react";

// import "./App.css";
// import Navbar from "./Components/Navbar";
// import { Route, Routes, useLocation  } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
// import SingleProductPage from "./Pages/SingleProductPage";
// import WhatsAppIcon from "./Ui/WhatsappIcon";
// import NotFound from "./Components/NotFound";
// import Contact from "./Components/Contact";
// import Footer from "./Components/Footer";
// import AllProductPage from "./Pages/AllProductPage";
// import Register from "./Components/Register";
// import Login from "./Components/Login";

// import Cart from "./Components/Cart";
// import Wishlist from "./Components/Wishlist";
// import AboutPage from "./Pages/AboutPage";
// import Blog from "./Components/Blog";
// import SingleBlog from "./Components/SingleBlog";
// import Profileorder from "./Components/Profileorder";
// import OrderDetails from "./Components/OrderDetails";
// import PersonalInfo from "./Components/PersonalInfo";
// import SelectAddress from "./Components/SelectAddress";
// import BackToTop from "./Ui/BackToTop";

// function App() {
//   const location = useLocation();

//   // ✅ Scroll to top when location changes
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   return (
//     <>
//       <div className="relative">
//         <Navbar />
//         <Routes>
// <Route path="/" element={<HomePage />} />
// <Route path="/product/:productId" element={<SingleProductPage />} />
// <Route path="/contact" element={<Contact />} />
// <Route path="/shop" element={<AllProductPage />} />
// <Route path="/register" element={<Register />} />
// <Route path="/login" element={<Login />} />
// <Route path="/cart" element={<Cart />} />
// <Route path="/wishlist" element={<Wishlist />} />
// <Route path="/about" element={<AboutPage />} />
// <Route path="/blog" element={<Blog />} />
// <Route path="/blog/:id" element={<SingleBlog />} />
// <Route path="/myorders" element={<Profileorder />} />
// <Route path="/OrderDetails" element={<OrderDetails />} />
// <Route path="/myinfo" element={<PersonalInfo />} />
// <Route path="/selectaddress" element={<SelectAddress />} />
// <Route path="*" element={<NotFound />} />
//         </Routes>
// <Footer />
// <WhatsAppIcon />
// <BackToTop/>
//       </div>
//     </>
//   );
// }

// export default App;

import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react"; // Import useEffect
import "./App.css";
import Navbar from "./Components/Navbar";
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
import Categories from "./Admin/pages/Category";
import Colors from "./Admin/pages/Color";
import Product from "./Admin/pages/Product";
import ProductDetail from "./Admin/pages/ProductDetail";
import ContactUs from "./Admin/pages/Contact";
import Users from "./Admin/pages/Users";
import Orders from "./Admin/pages/Orders";
import InstagramSection from "./Admin/pages/InstagramSection";
import Reviews from "./Admin/pages/Reviews";
import Sliders from "./Admin/pages/Slider";
import Dashboard from "./Admin/pages/Dashboard";
import AdminLayout from "./Admin/AdminLayout";
import SubCategories from "./Admin/pages/SubCategories";
import { Toaster } from "react-hot-toast";
import Fabrics from "./Admin/pages/Fabric";
import Sizes from "./Admin/pages/Size";
import ProductAttributes from "./Admin/pages/ProductAttributes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Client Routes */}
          <Route
            element={
              <>
                <Navbar />
                <Outlet />
                <Footer />
                <WhatsAppIcon />
                <BackToTop />
              </>
            }
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:p_id" element={<SingleProductPage />} />
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
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<Categories />} />
            <Route path="subcategories" element={<SubCategories />} />
            <Route path="colors" element={<Colors />} />
            <Route path="product-attributes" element={<ProductAttributes />} />
            <Route path="sizes" element={<Sizes />} />
            <Route path="product" element={<Product />} />
            <Route path="product/:p_id" element={<ProductDetail />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="instagram" element={<InstagramSection />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="sliders" element={<Sliders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
