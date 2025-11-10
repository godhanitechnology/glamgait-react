import { useEffect, useState } from "react";
import { Star, Truck, Package, Gift, Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import VideoPopUp from "../Ui/VideoPopUp";
import ImagePop from "../Ui/ImagePop";
import ReturnsDetails from "../Information/ReturnsDetails";
import { ApiURL, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";
import ReletedProduct from "../Components/ReletedProduct";
import { getGuestId } from "../utils/guest";
import toast from "react-hot-toast";

function SingleProduct() {
  const { p_id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const user = userInfo();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.post(`/getproductbyid/${p_id}`);
        if (response.data.status === 1) {
          const productData = response.data.data;
          setProduct(productData);

          if (productData.productcolors?.length > 0) {
            const firstColor = productData.productcolors[0];
            setSelectedColor(firstColor.color.color_name);

            // Separate images and videos from first color
            const media = firstColor.productimages.map((img) => img.image_url);
            const imageFiles = media.filter(
              (file) => !/\.(mp4|mov|avi|mkv|webm)$/i.test(file)
            );
            const videos = media.filter((file) =>
              /\.(mp4|mov|avi|mkv|webm)$/i.test(file)
            );

            setSelectedColorImages(imageFiles);
            setVideoFiles(videos);
          }

          if (productData.productsizes?.length > 0) {
            setSelectedSize(productData.productsizes[0].size.size_name);
          }
        } else {
          console.error(response.data.message || "Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (p_id) fetchProduct();
  }, [p_id]);

  const handleAddToCart = async () => {
    if (!product) return;

    const payload = {
      u_id: user?.u_id || undefined,
      guest_id: user?.u_id ? undefined : getGuestId(),
      p_id: product.p_id,
      sc_id: product.sc_id,
      size_id:
        product.productsizes?.find((s) => s.size.size_name === selectedSize)
          ?.size_id || null,
      pcolor_id:
        product.productcolors?.find((c) => c.color.color_name === selectedColor)
          ?.pcolor_id || null,
      quantity,
    };

    try {
      const response = await axiosInstance.post("/createcart", payload);
      if (response.data.status === 1) {
        toast.success("Added to cart successfully");
      } else {
        console.log(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      console.log("Something went wrong");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  // Flatten all product images across colors if no color selected
  const allMedia =
    selectedColorImages.length > 0
      ? selectedColorImages
      : product.productcolors?.flatMap((c) =>
          c.productimages.map((img) => img.image_url)
        ) || [];

  const imageFiles = allMedia.filter(
    (file) => !/\.(mp4|mov|avi|mkv|webm)$/i.test(file)
  );
  const videoFilesFromAll = allMedia.filter((file) =>
    /\.(mp4|mov|avi|mkv|webm)$/i.test(file)
  );

  const finalVideoFiles =
    videoFiles.length > 0 ? videoFiles : videoFilesFromAll;

  const discount =
    product?.original_price && product?.original_price > product?.price
      ? Math.round(
          ((product.original_price - product.price) / product.original_price) *
            100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#F3F0ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-4 col-span-2 lg:col-span-2">
            {imageFiles.map((file, index) => (
              <div
                key={index}
                className="relative  bg-gray-100 overflow-hidden rounded-lg cursor-pointer w-full h-64 md:h-120 lg:h-150"
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={`${ApiURL}/assets/Products/${file}`}
                  alt={`Product view ${index + 1}`}
                  className="w-full h-full  object-cover hover:opacity-95 transition"
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="space-y-6 col-span-2 lg:col-span-1">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product?.name}
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
                  ₹{product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.original_price}
                </span>
                {discount && (
                  <span className="text-sm text-white bg-red-600 px-2 py-0.5 rounded-md">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            {product.productcolors?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Color
                </h3>
                <div className="flex gap-2">
                  {product.productcolors.map((color) => (
                    <button
                      key={color.pcolor_id}
                      onClick={() => {
                        setSelectedColor(color.color.color_name);
                        const media = color.productimages.map(
                          (img) => img.image_url
                        );
                        const imgs = media.filter(
                          (file) => !/\.(mp4|mov|avi|mkv|webm)$/i.test(file)
                        );
                        const vids = media.filter((file) =>
                          /\.(mp4|mov|avi|mkv|webm)$/i.test(file)
                        );
                        setSelectedColorImages(imgs);
                        setVideoFiles(vids);
                        setSelectedImage(0);
                      }}
                      style={{ backgroundColor: color.color.color_code }}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.color.color_name
                          ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                          : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

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
            {product.productsizes?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">Size</h3>
                  <button
                    onClick={() => setShowSizePopup(true)}
                    className="text-sm text-gray-600 underline hover:text-gray-900 cursor-pointer"
                  >
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.productsizes.map((size) => (
                    <button
                      key={size.size_id}
                      onClick={() => setSelectedSize(size.size.size_name)}
                      className={`w-12 h-12 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
                        selectedSize === size.size.size_name
                          ? "bg-[#02382A] text-white shadow-sm"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {size.size.size_name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#02382A] text-white py-4 rounded-lg font-semibold hover:bg-[#F3F4F6] border border-[#02382A] hover:text-[#02382A] transition-colors"
            >
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
                    On all Over India orders over ₹1500
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
                <span className="text-gray-600">{product?.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-900">Fit</span>
                <span className="text-gray-600">{product?.fit}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Sections */}
      {finalVideoFiles.length > 0 && (
        <VideoPopUp
          videoSrc={`${ApiURL}/assets/Products/${finalVideoFiles[0]}`}
          onClose={() => setShowPopup(false)}
          autoPlay={true}
        />
      )}
      {showPopup && <ReturnsDetails onClose={() => setShowPopup(false)} />}
      {showSizePopup && <ImagePop onClose={() => setShowSizePopup(false)} />}
      <ReletedProduct
        cate_id={product.cate_id}
        currentProductId={product.p_id}
      />
    </div>
  );
}

export default SingleProduct;
