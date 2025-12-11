// /* eslint-disable react-hooks/exhaustive-deps */
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   RefreshCw,
//   Edit,
//   Trash2,
//   ArrowLeft,
//   Info,
//   Palette,
//   Ruler,
//   Tag,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import ProductModal from "./ProductModel";
// import { ApiURL } from "../../Variable";
// import axiosInstance from "../../Axios/axios";

// const ProductDetail = () => {
//   const { p_id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [mainMedia, setMainMedia] = useState("");

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.post(
//         `${ApiURL}/getproductbyid/${p_id}`
//       );
//       const productData = response.data.data;

//       if (productData?.productcolors?.length > 0) {
//         const firstColor = productData.productcolors[0];
//         setSelectedColor(firstColor);
//         const firstImageUrl = firstColor.productimages?.[0]?.image_url;
//         setMainMedia(
//           firstImageUrl ? `${ApiURL}/assets/Products/${firstImageUrl}` : ""
//         );
//       }

//       setProduct(productData);
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       navigate("/admin/product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (p_id) fetchProduct();
//   }, [p_id]);

//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axiosInstance.delete(`${ApiURL}/deleteproduct/${p_id}`);
//         toast.success("Product deleted successfully");
//         navigate("/admin/product");
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   const refreshProduct = () => fetchProduct();

//   const handleColorChange = (color) => {
//     setSelectedColor(color);
//     const firstImageUrl = color.productimages?.[0]?.image_url;
//     setMainMedia(
//       firstImageUrl ? `${ApiURL}/assets/Products/${firstImageUrl}` : ""
//     );
//   };

//   const handleThumbnailClick = (imageUrl) => {
//     setMainMedia(`${ApiURL}/assets/Products/${imageUrl}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <RefreshCw className="w-10 h-10 text-gray-500 animate-spin" />
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-50">
//         <p className="text-gray-600 text-lg font-medium">Product not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6  pb-4">
//         <button
//           onClick={() => navigate("/admin/product")}
//           className="flex items-center gap-2 text-gray-700 hover:text-black transition"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="font-medium">Back to Products</span>
//         </button>

//         <div className="flex gap-2">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold transition"
//           >
//             <Edit className="w-4 h-4" /> Edit
//           </button>
//           <button
//             onClick={handleDelete}
//             className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
//           >
//             <Trash2 className="w-4 h-4" /> Delete
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
//         {/* Left: Gallery */}
//         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//           <div className="relative aspect-[3/4] rounded-xl overflow-hidden group">
//             {mainMedia ? (
//               mainMedia.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/i) ? (
//                 <video
//                   src={mainMedia}
//                   className="w-full h-full object-cover rounded-xl"
//                   controls
//                 />
//               ) : (
//                 <img
//                   src={mainMedia}
//                   alt={product.name}
//                   className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
//                   onError={(e) =>
//                     (e.target.src =
//                       "https://via.placeholder.com/400x500?text=No+Image")
//                   }
//                 />
//               )
//             ) : (
//               <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-xl text-gray-500 font-medium">
//                 No Media
//               </div>
//             )}
//           </div>

//           {/* Thumbnails */}
//           {selectedColor?.productimages?.length > 0 && (
//             <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400">
//               {selectedColor.productimages.map((media) => (
//                 <button
//                   key={media.image_id}
//                   onClick={() => handleThumbnailClick(media.image_url)}
//                   className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-300 ${
//                     mainMedia === `${ApiURL}/assets/Products/${media.image_url}`
//                       ? "border-black scale-105"
//                       : "border-gray-200 hover:border-black"
//                   }`}
//                 >
//                   <img
//                     src={`${ApiURL}/assets/Products/${media.image_url}`}
//                     alt="thumb"
//                     className="w-full h-full object-cover"
//                     onError={(e) =>
//                       (e.target.src =
//                         "https://via.placeholder.com/80x80?text=No+Thumb")
//                     }
//                   />
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Colors */}
//           {product?.productcolors?.length > 0 && (
//             <div className="mt-6">
//               <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                 <Palette className="w-4 h-4 text-gray-600" /> Select Color
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.productcolors.map((color) => (
//                   <button
//                     key={color.pcolor_id}
//                     onClick={() => handleColorChange(color)}
//                     className={`px-4 py-2 rounded-lg border text-sm transition-all font-medium ${
//                       selectedColor?.pcolor_id === color.pcolor_id
//                         ? "border-black bg-gray-100"
//                         : "border-gray-300 hover:border-black"
//                     }`}
//                   >
//                     {color.color?.color_name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Right: Product Info */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 lg:sticky lg:top-4 self-start">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">
//             {product.name}
//           </h1>

//           <div className="space-y-4">
//             {/* Price */}
//             <div className="flex items-center gap-3 text-lg">
//               <Tag className="w-5 h-5 text-gray-500" />
//               <span className="text-gray-600 font-medium">Price:</span>
//               <span className="font-semibold text-gray-900">
//                 ₹{product.price || "N/A"}
//               </span>
//               {product.original_price &&
//                 product.original_price !== product.price && (
//                   <span className="line-through text-gray-500 text-sm">
//                     ₹{product.original_price}
//                   </span>
//                 )}
//             </div>

//             {/* Model */}
//             <div className="flex items-center gap-3 text-gray-700">
//               <Info className="w-5 h-5 text-gray-500" />
//               <span className="font-medium">Model:</span>
//               <span>{product.model || "N/A"}</span>
//             </div>

//             {/* Fit */}
//             <div className="flex items-center gap-3 text-gray-700">
//               <Ruler className="w-5 h-5 text-gray-500" />
//               <span className="font-medium">Fit:</span>
//               <span>{product.fit || "N/A"}</span>
//             </div>

//             {/* Category & Attributes */}
//             <div className="border-t pt-4 space-y-3">
//               <div className="flex items-center gap-3 text-gray-700">
//                 <Tag className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">Category:</span>
//                 <span>{product.subcategory?.name || "N/A"}</span>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <Palette className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">Fabric:</span>
//                 <span>{product.fabric?.name || "N/A"}</span>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <Info className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">Work:</span>
//                 <span>{product.work?.name || "N/A"}</span>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <Info className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">Occasion:</span>
//                 <span>{product.occasion?.name || "N/A"}</span>
//               </div>

//               <div className="flex items-center gap-3 text-gray-700">
//                 <Info className="w-5 h-5 text-gray-500" />
//                 <span className="font-medium">Style:</span>
//                 <span>{product.style?.name || "N/A"}</span>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="border-t pt-4">
//               <span className="text-gray-600 font-medium block mb-1">
//                 Description:
//               </span>
//               <p className="text-gray-800 leading-relaxed whitespace-pre-line">
//                 {product.description || "No description available"}
//               </p>
//             </div>

//             {/* Sizes */}
//             {product.productsizes?.length > 0 && (
//               <div className="border-t pt-4">
//                 <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                   <Ruler className="w-4 h-4 text-gray-600" /> Available Sizes
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {product.productsizes.map((size) => (
//                     <span
//                       key={size.size.size_id}
//                       className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm font-medium"
//                     >
//                       {size.size.size_name}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       <ProductModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         product={product}
//         refreshProducts={refreshProduct}
//       />
//     </div>
//   );
// };

// export default ProductDetail;


/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  RefreshCw,
  Edit,
  Trash2,
  ArrowLeft,
  Palette,
  Ruler,
  AlertCircle,
  CheckCircle,
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
  const [showStockMatrix, setShowStockMatrix] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${ApiURL}/getproductbyid/${p_id}`);
      const productData = response.data.data;

      // Build stock lookup: { "pcolor_id-psize_id": remaining_qty }
      const stockMap = {};
      productData.productvariants?.forEach(v => {
        stockMap[`${v.pcolor_id}-${v.psize_id}`] = v.remaining_qty;
      });

      // Attach stock to each size under each color
      const enhancedColors = productData.productcolors?.map(color => {
        const sizesWithStock = productData.productsizes?.map(ps => {
          const key = `${color.pcolor_id}-${ps.psize_id}`;
          const qty = stockMap[key] || 0;
          return {
            ...ps,
            remaining_qty: qty,
            in_stock: qty > 0,
            low_stock: qty > 0 && qty <= 5,
          };
        }) || [];

        return {
          ...color,
          sizes: sizesWithStock,
          has_stock: sizesWithStock.some(s => s.in_stock),
          total_available: sizesWithStock.reduce((sum, s) => sum + s.remaining_qty, 0),
        };
      }) || [];

      const enhancedProduct = {
        ...productData,
        productcolors: enhancedColors,
        total_stock: enhancedColors.reduce((sum, c) => sum + c.total_available, 0),
        has_any_stock: enhancedColors.some(c => c.has_stock),
      };

      setProduct(enhancedProduct);

      // Auto-select first available color
      const firstAvailableColor = enhancedColors.find(c => c.has_stock);
      if (firstAvailableColor) {
        setSelectedColor(firstAvailableColor);
        const firstImage = firstAvailableColor.productimages?.[0]?.image_url;
        setMainMedia(firstImage ? `${ApiURL}/assets/Products/${firstImage}` : "");
      }

    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product");
      navigate("/admin/product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (p_id) fetchProduct();
  }, [p_id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const firstImage = color.productimages?.[0]?.image_url;
    setMainMedia(firstImage ? `${ApiURL}/assets/Products/${firstImage}` : "");
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainMedia(`${ApiURL}/assets/Products/${imageUrl}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this product permanently?")) {
      try {
        await axiosInstance.delete(`${ApiURL}/deleteproduct/${p_id}`);
        toast.success("Product deleted");
        navigate("/admin/product");
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <RefreshCw className="w-12 h-12 text-gray-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-2xl text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-black">
          <ArrowLeft /> Back
        </button>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800">
            <Edit size={18} /> Edit Product
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-red-700">
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left: Media + Color Selector */}
        <div className="space-y-6">
          {/* Main Media */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            {mainMedia ? (
              mainMedia.endsWith(".mp4") ? (
                <video src={mainMedia} controls className="w-full aspect-[3/4] object-cover" />
              ) : (
                <img src={mainMedia} alt="Main" className="w-full aspect-[3/4] object-cover" />
              )
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-[3/4] flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {selectedColor?.productimages?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {selectedColor.productimages.map((img) => (
                <button
                  key={img.image_id}
                  onClick={() => handleThumbnailClick(img.image_url)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    mainMedia.includes(img.image_url) ? "border-black" : "border-gray-300"
                  }`}
                >
                  <img src={`${ApiURL}/assets/Products/${img.image_url}`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Color Selector */}
          <div className="bg-white p-5 rounded-2xl shadow">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" /> Available Colors
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.productcolors.map((color) => {
                const isSelected = selectedColor?.pcolor_id === color.pcolor_id;
                const outOfStock = !color.has_stock;

                return (
                  <button
                    key={color.pcolor_id}
                    onClick={() => handleColorChange(color)}
                    disabled={outOfStock}
                    className={`px-5 py-3 rounded-xl font-medium transition-all relative ${
                      isSelected
                        ? "bg-black text-white"
                        : outOfStock
                        ? "bg-gray-100 text-gray-400 line-through"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {color.color?.color_name}
                    {outOfStock && <span className="ml-2 text-xs">(Out of Stock)</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Details + Stock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold">₹{product.price}</span>
              {product.original_price > product.price && (
                <span className="text-xl text-gray-500 line-through ml-3">₹{product.original_price}</span>
              )}
            </div>

            {/* Stock Summary */}
            <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Available Stock</p>
                  <p className="text-3xl font-bold text-green-700">
                    {product.total_stock || 0}
                  </p>
                </div>
                {product.has_any_stock ? (
                  <CheckCircle className="w-12 h-12 text-green-600" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-red-600" />
                )}
              </div>
              {!product.has_any_stock && (
                <p className="mt-3 text-red-600 font-semibold">Currently Out of Stock</p>
              )}
            </div>

            {/* Size + Stock for Selected Color */}
            {selectedColor && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Ruler className="w-6 h-6" />
                  Available Sizes - {selectedColor.color?.color_name}
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {selectedColor.sizes.map((size) => {
                    const qty = size.remaining_qty;
                    return (
                      <div
                        key={size.psize_id}
                        className={`p-4 rounded-xl text-center font-medium border-2 transition-all ${
                          qty > 0
                            ? size.low_stock
                              ? "border-orange-500 bg-orange-50 text-orange-700"
                              : "border-green-500 bg-green-50 text-green-700"
                            : "border-gray-300 bg-gray-100 text-gray-400 line-through"
                        }`}
                      >
                        <div className="text-lg">{size.size?.size_name}</div>
                        <div className="text-xs mt-1">
                          {qty > 0 ? (qty <= 5 ? `Only ${qty} left!` : `${qty} in stock`) : "Out of Stock"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Toggle Full Stock Matrix */}
            <button
              onClick={() => setShowStockMatrix(!showStockMatrix)}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
            >
              {showStockMatrix ? "Hide" : "Show"} Full Stock Matrix
            </button>

            {showStockMatrix && (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Size → Color</th>
                      {product.productcolors.map(c => (
                        <th key={c.pcolor_id} className="border p-3 text-center">
                          {c.color?.color_name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {product.productsizes.map(ps => (
                      <tr key={ps.psize_id}>
                        <td className="border p-3 font-medium bg-gray-50">
                          {ps.size?.size_name}
                        </td>
                        {product.productcolors.map(color => {
                          const sizeInColor = color.sizes.find(s => s.psize_id === ps.psize_id);
                          const qty = sizeInColor?.remaining_qty || 0;
                          return (
                            <td key={color.pcolor_id} className="border p-3 text-center">
                              <span className={`font-bold ${qty > 0 ? "text-green-600" : "text-red-600"}`}>
                                {qty}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Other Info */}
            <div className="mt-10 space-y-4 text-gray-700">
              <p><strong>SKU:</strong> {product.sku || "N/A"}</p>
              <p><strong>Category:</strong> {product.subcategory?.name || "N/A"}</p>
              <p><strong>Description:</strong></p>
              <p className="whitespace-pre-line text-gray-600">{product.description || "No description"}</p>
            </div>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); fetchProduct(); }}
        product={product}
        refreshProducts={fetchProduct}
      />
    </div>
  );
};

export default ProductDetail;