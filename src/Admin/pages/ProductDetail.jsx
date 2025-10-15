/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  RefreshCw,
  Edit,
  Trash2,
  ArrowLeft,
  Info,
  Palette,
  Ruler,
  Tag,
} from "lucide-react";
import toast from "react-hot-toast";
import ProductModal from "./ProductModel";
import { ApiURL } from "../../Variable";
import axiosInstance from "../../Axios/axios";

const ProductDetail = () => {
  const { p_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainMedia, setMainMedia] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${ApiURL}/getproductbyid/${p_id}`
      );
      const productData = response.data.data;

      if (productData?.productcolors?.length > 0) {
        const firstColor = productData.productcolors[0];
        setSelectedColor(firstColor);
        const firstImageUrl = firstColor.productimages?.[0]?.image_url;
        setMainMedia(
          firstImageUrl ? `${ApiURL}/assets/Products/${firstImageUrl}` : ""
        );
      }

      setProduct(productData);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to fetch product details");
      navigate("/admin/product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (p_id) fetchProduct();
  }, [p_id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axiosInstance.delete(`${ApiURL}/deleteproduct/${p_id}`);
        toast.success("Product deleted successfully");
        navigate("/admin/product");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete product");
      }
    }
  };

  const refreshProduct = () => fetchProduct();

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const firstImageUrl = color.productimages?.[0]?.image_url;
    setMainMedia(
      firstImageUrl ? `${ApiURL}/assets/Products/${firstImageUrl}` : ""
    );
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainMedia(`${ApiURL}/assets/Products/${imageUrl}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <RefreshCw className="w-10 h-10 text-gray-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6  pb-4">
        <button
          onClick={() => navigate("/admin/product")}
          className="flex items-center gap-2 text-gray-700 hover:text-black transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left: Gallery */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
            {mainMedia ? (
              mainMedia.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i) ? (
                <video
                  src={mainMedia}
                  className="w-full h-full object-cover rounded-xl"
                  controls
                />
              ) : (
                <img
                  src={mainMedia}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x500?text=No+Image")
                  }
                />
              )
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500 font-medium">
                No Media
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {selectedColor?.productimages?.length > 0 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400">
              {selectedColor.productimages.map((media) => (
                <button
                  key={media.image_id}
                  onClick={() => handleThumbnailClick(media.image_url)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${
                    mainMedia === `${ApiURL}/assets/Products/${media.image_url}`
                      ? "border-black scale-105"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  <img
                    src={`${ApiURL}/assets/Products/${media.image_url}`}
                    alt="thumb"
                    className="w-full h-full object-cover"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/80x80?text=No+Thumb")
                    }
                  />
                </button>
              ))}
            </div>
          )}

          {/* Colors */}
          {product?.productcolors?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-600" /> Select Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.productcolors.map((color) => (
                  <button
                    key={color.pcolor_id}
                    onClick={() => handleColorChange(color)}
                    className={`px-4 py-2 rounded-lg border text-sm transition-all font-medium ${
                      selectedColor?.pcolor_id === color.pcolor_id
                        ? "border-black bg-gray-100"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {color.color?.color_name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 lg:sticky lg:top-4 self-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="space-y-4">
            {/* Price */}
            <div className="flex items-center gap-3 text-lg">
              <Tag className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600 font-medium">Price:</span>
              <span className="font-semibold text-gray-900">
                ₹{product.price || "N/A"}
              </span>
              {product.original_price &&
                product.original_price !== product.price && (
                  <span className="line-through text-gray-500 text-sm">
                    ₹{product.original_price}
                  </span>
                )}
            </div>

            {/* Model */}
            <div className="flex items-center gap-3 text-gray-700">
              <Info className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Model:</span>
              <span>{product.model || "N/A"}</span>
            </div>

            {/* Fit */}
            <div className="flex items-center gap-3 text-gray-700">
              <Ruler className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Fit:</span>
              <span>{product.fit || "N/A"}</span>
            </div>

            {/* Category & Attributes */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <Tag className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Category:</span>
                <span>{product.subcategory?.name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Palette className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Fabric:</span>
                <span>{product.fabric?.name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Info className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Work:</span>
                <span>{product.work?.name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Info className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Occasion:</span>
                <span>{product.occasion?.name || "N/A"}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Info className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Style:</span>
                <span>{product.style?.name || "N/A"}</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-4">
              <span className="text-gray-600 font-medium block mb-1">
                Description:
              </span>
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Sizes */}
            {product.productsizes?.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-gray-600" /> Available Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.productsizes.map((size) => (
                    <span
                      key={size.size.size_id}
                      className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm font-medium"
                    >
                      {size.size.size_name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        refreshProducts={refreshProduct}
      />
    </div>
  );
};

export default ProductDetail;
