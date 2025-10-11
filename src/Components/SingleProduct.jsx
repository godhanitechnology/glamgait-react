import { useState } from "react";
import { Star, Truck, Package, Gift, Minus, Plus } from "lucide-react";
import products from "../data/products";
import VideoPopUp from "../Ui/VideoPopUp";
import { useParams } from "react-router-dom";
import ImagePop from "../Ui/ImagePop";
import ReturnsDetails from "../Information/ReturnsDetails";

function SingleProduct() {
  const { productId } = useParams(); // Get productId from URL
  const id = parseInt(productId, 10); // Convert to number

  const product = products.categories
    .flatMap((category) =>
      category.subcategories.flatMap((subcategory) => subcategory.products)
    )
    .find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSizePopup, setShowSizePopup] = useState(false);

  const images = product?.colors.map((color) => color.image) || [];

  return (
    <div className="min-h-screen bg-[#F3F0ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* First Column - First Image */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={images[0]}
                alt="Product view 1"
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setSelectedImage(0)}
              />
            </div>
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={images[2]}
                alt="Product view 3"
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setSelectedImage(2)}
              />
            </div>
          </div>

          {/* Second Column - Second Image */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={images[1]}
                alt="Product view 2"
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setSelectedImage(1)}
              />
            </div>
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-lg">
              <img
                src={images[3]}
                alt="Product view 4"
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setSelectedImage(3)}
              />
            </div>
          </div>

          {/* Third Column - Product Details */}
          <div className="space-y-6 col-span-2 lg:col-span-1">
            {/* <div className="text-sm text-gray-500">
              {product?.category} / {product?.subcategory}
            </div> */}

            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product?.title}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gray-900 text-gray-900"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">5.0 (2 reviews)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-900">
                  ${product.newPrice}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
                <span className="text-sm text-white bg-red-600 px-2 py-0.5 rounded-md">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Color {product?.colors.map((c) => c.name).join(" / ")}
              </h3>
              <div className="flex gap-2">
                {product?.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full bg-${
                      color.name === "blue" ? "blue-800" : "amber-800"
                    } border-2 ${
                      selectedColor === color.name
                        ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                        : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] rounded hover:bg-gray-200"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium w-10 h-10 bg-[#F3F4F6] text-center flex items-center justify-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] rounded hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                <button
                  onClick={() => setShowSizePopup(true)}
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {product?.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-md text-sm font-medium flex items-center justify-center transition-colors
          ${
            selectedSize === size
              ? "bg-[#02382A] text-white shadow-sm"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }
        `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-[#02382A] text-white py-4 rounded-lg font-semibold hover:bg-[#F3F4F6] border  border-[#02382A] hover:text-[#02382A] transition-colors">
              ADD TO BAG
            </button>

            <div className="text-center text-sm text-gray-600">
              YashRajput <span className="text-red-600">Purchased</span> this
              item <span className="font-semibold">31 minutes</span> ago from{" "}
              <span className="font-semibold">Jamnpur</span>
            </div>

            <div className="border-t border-b border-gray-200 py-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">SKU:</span>
                <span className="font-medium">398890</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Delivery by:</span>
                <div className="text-right">
                  <div className="font-medium">11 Aug Thursday</div>
                  {/* <button className="text-blue-600 text-xs hover:underline">
                    View Details
                  </button> */}
                </div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                Return and Exchange Within 4 Days
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Truck className="w-6 h-6 text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Free Shipping</h4>
                  <p className="text-sm text-gray-600">
                    On all U.S. orders over $100
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Package className="w-6 h-6 text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Easy Returns</h4>
                  <p className="text-sm text-gray-600">
                    Extended returns through January 31.{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowPopup(true);
                      }}
                      className="underline hover:text-gray-900 cursor-pointer"
                    >
                      Returns Details.
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Gift className="w-6 h-6 text-gray-700 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Send It As A Gift
                  </h4>
                  <p className="text-sm text-gray-600">
                    Add a free personalized note during checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Part shirt, part jacket, all style.
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <div className="flex justify-between text-sm border-b border-[#DDDBDC]">
                <span className="font-semibold text-gray-900">Model</span>
                <span className="text-gray-600">{product?.modelInfo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-900">Fit</span>
                <div className="text-right">
                  <div className="text-gray-600">Questions about fit?</div>
                  {/* <div className="flex gap-2 justify-end">
                    <a href="#" className="text-blue-600 hover:underline">
                      Contact Us
                    </a>
                    <a href="#" className="text-blue-600 hover:underline">
                      Size Guide
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {product?.video && <VideoPopUp />}
      {showPopup && <ReturnsDetails onClose={() => setShowPopup(false)} />}
      {showSizePopup && <ImagePop onClose={() => setShowSizePopup(false)} />}
    </div>
  );
}

export default SingleProduct;
