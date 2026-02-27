import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
// Always-needed layout components (small, load eagerly)
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhatsAppIcon from "./Ui/WhatsappIcon";
import BackToTop from "./Ui/BackToTop";
import SmartScrollManager from "./Components/SmartScrollManager";
import { lazy, Suspense } from "react";

// ─── Lazy-loaded page components (code split per route) ───────────────────────
const HomePage = lazy(() => import("./Pages/HomePage"));
const SingleProductPage = lazy(() => import("./Pages/SingleProductPage"));
const AllProductPage = lazy(() => import("./Pages/AllProductPage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const ShippingPolicy = lazy(() => import("./Pages/ShippingPolicy "));
const RefundPolicy = lazy(() => import("./Pages/RefundPolicy"));
const TermsofService = lazy(() => import("./Pages/TermsofService"));
const CancellationPolicy = lazy(() => import("./Pages/CancellationPolicy"));
const PaymentPolicy = lazy(() => import("./Pages/PaymentPolicy"));
const Contact = lazy(() => import("./Components/Contact"));
const Register = lazy(() => import("./Components/Register"));
const Login = lazy(() => import("./Components/Login"));
const Cart = lazy(() => import("./Components/Cart"));
const Wishlist = lazy(() => import("./Components/Wishlist"));
const Blog = lazy(() => import("./Components/Blog"));
const SingleBlog = lazy(() => import("./Components/SingleBlog"));
const Profileorder = lazy(() => import("./Components/Profileorder"));
const OrderDetails = lazy(() => import("./Components/OrderDetails"));
const PersonalInfo = lazy(() => import("./Components/PersonalInfo"));
const SelectAddress = lazy(() => import("./Components/SelectAddress"));
const OrderConfirmation = lazy(() => import("./Components/OrderConfirmation"));
const SearchResults = lazy(() => import("./Components/SearchResults"));
const NotFound = lazy(() => import("./Components/NotFound"));

// ─── Admin (loaded only when /admin route is hit) ────────────────────────────
const AdminLayout = lazy(() => import("./Admin/AdminLayout"));
const Dashboard = lazy(() => import("./Admin/pages/Dashboard"));
const Categories = lazy(() => import("./Admin/pages/Category"));
const SubCategories = lazy(() => import("./Admin/pages/SubCategories"));
const Colors = lazy(() => import("./Admin/pages/Color"));
const Product = lazy(() => import("./Admin/pages/Product"));
const ProductDetail = lazy(() => import("./Admin/pages/ProductDetail"));
const ContactUs = lazy(() => import("./Admin/pages/Contact"));
const Users = lazy(() => import("./Admin/pages/Users"));
const Orders = lazy(() => import("./Admin/pages/Orders"));
const InstagramSection = lazy(() => import("./Admin/pages/InstagramSection"));
const Reviews = lazy(() => import("./Admin/pages/Reviews"));
const Sliders = lazy(() => import("./Admin/pages/Slider"));
const Announcement = lazy(() => import("./Admin/pages/Announcements"));
const Fabrics = lazy(() => import("./Admin/pages/Fabric"));
const Sizes = lazy(() => import("./Admin/pages/Size"));
const ProductAttributes = lazy(() => import("./Admin/pages/ProductAttributes"));
const PromotionsManagement = lazy(
  () => import("./Admin/pages/PromotionsManagement"),
);

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 500,
          style: {
            background: "#F3F0ED",
            color: "#1f2937",
            padding: "16px 20px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            fontSize: "14px",
            fontWeight: 500,
            maxWidth: "300px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // green
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red
              secondary: "#FFFFFF",
            },
          },
        }}
      />
      <BrowserRouter>
        <SmartScrollManager />
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes>
            {/* Client Routes */}
            <Route
              element={
                <>
                  <Navbar />
                  <main id="main-content">
                    <Outlet />
                  </main>
                  <Footer />
                  <WhatsAppIcon />
                  <BackToTop />
                </>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:slug" element={<SingleProductPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/collections/:cate_name"
                element={<AllProductPage />}
              />
              <Route
                path="/collections/:cate_name/:filterValue"
                element={<AllProductPage />}
              />
              <Route
                path="/collections/:filterValue"
                element={<AllProductPage />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<SingleBlog />} />
              <Route path="/myorders" element={<Profileorder />} />
              <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
              <Route path="/myinfo" element={<PersonalInfo />} />
              <Route path="/selectaddress" element={<SelectAddress />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/return-refund" element={<RefundPolicy />} />
              <Route path="/terms" element={<TermsofService />} />
              <Route path="/payment" element={<PaymentPolicy />} />
              <Route path="/search" element={<SearchResults />} />
              <Route
                path="/cancellationpolicy"
                element={<CancellationPolicy />}
              />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />

              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="announcements" element={<Announcement />} />
              <Route path="categories" element={<Categories />} />
              <Route path="subcategories" element={<SubCategories />} />
              <Route path="colors" element={<Colors />} />
              <Route
                path="product-attributes"
                element={<ProductAttributes />}
              />
              <Route path="sizes" element={<Sizes />} />
              <Route path="product" element={<Product />} />
              <Route path="product/:p_id" element={<ProductDetail />} />
              <Route path="contact" element={<ContactUs />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="instagram" element={<InstagramSection />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="sliders" element={<Sliders />} />
              <Route path="offer-coupon" element={<PromotionsManagement />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
