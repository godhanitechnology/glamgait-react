import { useEffect, useState } from "react";
import { Star, Truck, Package, Gift, Minus, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import VideoPopUp from "../Ui/VideoPopUp";
import ImagePop from "../Ui/ImagePop";
import ReturnsDetails from "../Information/ReturnsDetails";
import { ApiURL, userInfo } from "../Variable";
import axiosInstance from "../Axios/axios";
import ReletedProduct from "../Components/ReletedProduct";
import { getGuestId } from "../utils/guest";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

function SingleProduct() {
  const { p_id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // for lightbox
  const [mainIndex, setMainIndex] = useState(0); // mobile big image
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSizePopup, setShowSizePopup] = useState(false);
  const [selectedColorImages, setSelectedColorImages] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const navigate = useNavigate();
  const user = userInfo();

  const names = [
    "Yash Rajput",
    "Amit Sharma",
    "Priya Singh",
    "Neha Patel",
    "Ravi Mehta",
    "Karan Verma",
    "Simran Kaur",
    "Rahul Joshi",
    "Pooja Das",
    "Ankit Mishra",
  ];

  const cities = [
    "Mumbai",
    "Delhi",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Indore",
    "Pune",
    "Varanasi",
    "Kanpur",
    "Chennai",
  ];

  const times = [
    "2 minutes",
    "5 minutes",
    "9 minutes",
    "14 minutes",
    "18 minutes",
    "25 minutes",
    "31 minutes",
    "40 minutes",
    "45 minutes",
    "50 minutes",
  ];

  const [purchase, setPurchase] = useState({
    name: "Yash Rajput",
    time: "31 minutes",
    city: "Jamnagar",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTime = times[Math.floor(Math.random() * times.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];

      setPurchase({
        name: randomName,
        time: randomTime,
        city: randomCity,
      });
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

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

            const media = firstColor.productimages.map((img) => img.image_url);
            const imageFiles = media.filter(
              (file) => !/\.(mp4|mov|avi|mkv|webm)$/i.test(file)
            );
            const videos = media.filter((file) =>
              /\.(mp4|mov|avi|mkv|webm)$/i.test(file)
            );

            setSelectedColorImages(imageFiles);
            setVideoFiles(videos);
            setMainIndex(0); // Reset mobile view
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

  const handleBuyNow = async () => {
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
        // Build cart item for SelectAddress
        const cartItem = {
          cart_id: response.data.cart_id || Date.now(), // fallback ID
          p_id: product.p_id,
          sc_id: product.sc_id || null,
          size_id: payload.size_id,
          pcolor_id: payload.pcolor_id,
          quantity,
          price: product.price,
          product_name: product.name,
          images:
            selectedColorImages.length > 0
              ? selectedColorImages
              : [product.productimages?.[0]?.image_url].filter(Boolean),
          size: selectedSize,
          color:
            product.productcolors?.find(
              (c) => c.pcolor_id === payload.pcolor_id
            )?.color || {},
        };

        // toast.success("Redirecting to checkout...");

        // Navigate with state
        navigate("/selectaddress", {
          state: { cartItems: [cartItem] },
        });
      } else {
        toast.error(response.data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Buy Now error:", error);
      toast.error("Something went wrong");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  // Final image list (from selected color or fallback)
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
      ? product.original_price - product.price
      : 0;

  return (
    <>
      <Helmet>
        <title>{product.meta_title}</title>
        <meta name="description" content={product.meta_description} />
        <meta name="keywords" content={product.meta_keywords} />
      </Helmet>
      <div className="min-h-screen bg-[#F3F0ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="col-span-2">
              <div className="sm:hidden">
                <div
                  className="relative bg-gray-100 overflow-hidden rounded-lg cursor-pointer w-full h-114 mb-3"
                  onClick={(e) => {
                    // if image was just swiped, don't open
                    const img = e.currentTarget.querySelector("img");
                    if (img && img.dataset._justSwiped === "1") return;
                    // small delay so touchend/swipe flags settle on mobile
                    setTimeout(() => setSelectedImage(mainIndex), 50);
                  }}
                >
                  <img
                    src={`${ApiURL}/assets/Products/${imageFiles[mainIndex]}`}
                    alt="Main product"
                    className="w-full h-full object-cover select-none"
                    onTouchStart={(e) => {
                      // record start x for swipe detection
                      e.currentTarget.dataset.startx = String(
                        e.touches[0].clientX
                      );
                    }}
                    onTouchEnd={(e) => {
                      const imgEl = e.currentTarget;
                      const startX = parseFloat(imgEl.dataset.startx || "0");
                      const endX = e.changedTouches[0].clientX;
                      const diff = startX - endX;
                      if (Math.abs(diff) > 50) {
                        if (diff > 0 && mainIndex < imageFiles.length - 1) {
                          setMainIndex(mainIndex + 1);
                        } else if (diff < 0 && mainIndex > 0) {
                          setMainIndex(mainIndex - 1);
                        }
                        // mark as just swiped briefly to prevent tap right after swipe
                        imgEl.dataset._justSwiped = "1";
                        // clear flag after short interval
                        setTimeout(() => {
                          try {
                            delete imgEl.dataset._justSwiped;
                          } catch (err) {
                            // fallback: remove attribute
                            imgEl.removeAttribute("data-_just-swiped");
                          }
                        }, 300);
                      } else {
                        // Not a swipe — ensure we remove any stale flag
                        try {
                          delete imgEl.dataset._justSwiped;
                        } catch (err) {
                          imgEl.removeAttribute("data-_just-swiped");
                        }
                      }
                    }}
                    onClick={(ev) => {
                      // Prevent click if we just swiped. Otherwise let the parent handler open.
                      if (ev.currentTarget.dataset._justSwiped === "1") {
                        ev.stopPropagation();
                        ev.preventDefault();
                        return;
                      }
                      // Allow the parent div's onClick to handle opening (keeps behavior consistent).
                    }}
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
                  {imageFiles.slice(0, 7).map((file, idx) => (
                    <div
                      key={idx}
                      className={`relative flex-shrink-0 bg-gray-100 overflow-hidden rounded-lg cursor-pointer w-25 h-25 snap-center border-2 ${
                        mainIndex === idx
                          ? "border-[#02382A]"
                          : "border-transparent"
                      }`}
                      onClick={() => {
                        // set thumbnail as main and open lightbox immediately on mobile
                        setMainIndex(idx);
                        // small delay ensures mainIndex updates and mobile touch state settles
                        setTimeout(() => setSelectedImage(idx), 40);
                      }}
                    >
                      <img
                        src={`${ApiURL}/assets/Products/${file}`}
                        alt={`Thumb ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden sm:grid grid-cols-2 gap-4">
                {imageFiles.map((file, index) => (
                  <div
                    key={index}
                    className="group relative bg-gray-100 overflow-hidden rounded-lg cursor-pointer w-full h-64 md:h-120 lg:h-150"
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={`${ApiURL}/assets/Products/${file}`}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* FULL-SCREEN LIGHTBOX */}
            {selectedImage !== null && (
              <div
                key={selectedImage} // force remount each time selectedImage changes
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-hidden"
                onClick={() => setSelectedImage(null)}
              >
                <div
                  className="relative max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={`${ApiURL}/assets/Products/${imageFiles[selectedImage]}`}
                    alt="Full size"
                    className="w-100 h-full lg:w-150 lg:h-full object-contain select-none transition-transform duration-150 ease-out"
                    style={{
                      touchAction: "none", // disable browser zoom/scroll
                      transformOrigin: "center center",
                    }}
                    onTouchStart={(e) => {
                      if (e.touches.length === 1) {
                        e.currentTarget.dataset.startx = String(
                          e.touches[0].clientX
                        );
                        e.currentTarget.dataset.starty = String(
                          e.touches[0].clientY
                        );
                      } else if (e.touches.length === 2) {
                        const dx = e.touches[0].clientX - e.touches[1].clientX;
                        const dy = e.touches[0].clientY - e.touches[1].clientY;
                        e.currentTarget.dataset.startDist = Math.hypot(
                          dx,
                          dy
                        ).toString();
                        e.currentTarget.dataset.startScale =
                          e.currentTarget.dataset.scale || "1";
                      }
                    }}
                    onTouchMove={(e) => {
                      const img = e.currentTarget;
                      if (
                        e.touches.length === 1 &&
                        img.dataset.scale &&
                        parseFloat(img.dataset.scale) > 1
                      ) {
                        // Panning
                        const startX = parseFloat(img.dataset.startx || "0");
                        const startY = parseFloat(img.dataset.starty || "0");
                        const diffX = e.touches[0].clientX - startX;
                        const diffY = e.touches[0].clientY - startY;
                        img.style.transform = `translate(${diffX}px, ${diffY}px) scale(${img.dataset.scale})`;
                      } else if (e.touches.length === 2) {
                        // Pinch zoom
                        const dx = e.touches[0].clientX - e.touches[1].clientX;
                        const dy = e.touches[0].clientY - e.touches[1].clientY;
                        const dist = Math.hypot(dx, dy);
                        const startDist = parseFloat(
                          img.dataset.startDist || "1"
                        );
                        const startScale = parseFloat(
                          img.dataset.startScale || "1"
                        );
                        let newScale = (dist / startDist) * startScale;
                        newScale = Math.min(Math.max(newScale, 1), 4); // limit zoom between 1x–4x
                        img.dataset.scale = String(newScale);
                        img.style.transform = `scale(${newScale})`;
                      }
                    }}
                    onTouchEnd={(e) => {
                      const img = e.currentTarget;
                      // reset if zoomed out completely
                      const scale = parseFloat(img.dataset.scale || "1");
                      if (scale <= 1.02) {
                        img.dataset.scale = "1";
                        img.style.transform = "scale(1)";
                      }
                      // handle swipe for image navigation if not zoomed
                      if (e.changedTouches.length === 1 && scale === 1) {
                        const startX = parseFloat(img.dataset.startx || "0");
                        const endX = e.changedTouches[0].clientX;
                        const diff = startX - endX;
                        if (Math.abs(diff) > 50) {
                          if (diff > 0 && selectedImage < imageFiles.length - 1)
                            setSelectedImage(selectedImage + 1);
                          else if (diff < 0 && selectedImage > 0)
                            setSelectedImage(selectedImage - 1);
                        }
                      }
                    }}
                  />

                  <button
                    className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300"
                    onClick={() => setSelectedImage(null)}
                  >
                    ×
                  </button>

                  {selectedImage > 0 && (
                    <button
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(selectedImage - 1);
                      }}
                    >
                      ←
                    </button>
                  )}
                  {selectedImage < imageFiles.length - 1 && (
                    <button
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gray-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(selectedImage + 1);
                      }}
                    >
                      →
                    </button>
                  )}
                </div>
              </div>
            )}

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
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.original_price}
                  </span>

                  {discount > 0 && (
                    <span className="text-sm text-white bg-red-600 px-2 py-0.5 rounded-md">
                      Save ₹{discount}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[#02382A] font-bold">
                    inclusive of all taxes
                  </span>
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
                          setMainIndex(0);
                          setSelectedImage(null);
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
                    <h3 className="text-sm font-semibold text-gray-900">
                      Size
                    </h3>
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
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-100 text-[#02382A] py-4 rounded-lg font-semibold hover:bg-[#02382A] border border-[#02382A] hover:text-white transition-colors"
                >
                  ADD TO BAG
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#02382A] text-white py-4 rounded-lg font-semibold hover:bg-[#F3F4F6] border border-[#02382A] hover:text-[#02382A] transition-colors"
                >
                  BUY NOW
                </button>
              </div>

              <div className="text-center text-sm text-gray-600">
                {purchase.name} <span className="text-red-600">Purchased</span>{" "}
                this item <span className="font-semibold">{purchase.time}</span>{" "}
                ago from <span className="font-semibold">{purchase.city}</span>
              </div>

              <div className="border-t border-b border-gray-200 py-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">SKU:</span>
                  <span className="font-medium">{product?.sku}</span>
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
                    <h4 className="font-semibold text-gray-900">
                      Free Shipping
                    </h4>
                    <p className="text-sm text-gray-600">
                      On all Over India orders over ₹1500
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Package className="w-6 h-6 text-gray-700 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Easy Returns
                    </h4>
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
    </>
  );
}

export default SingleProduct;
