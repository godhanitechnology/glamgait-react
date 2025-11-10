/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  ToggleRight,
  ToggleLeft,
} from "lucide-react";
import { ApiURL } from "../../Variable";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axiosInstance from "../../Axios/axios";
import ProductModal from "./ProductModel";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(12);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    p_id: null,
    name: "",
  });

  // Fetch products with pagination, search, and subcategory filter
  const fetchProducts = async (page = 1, search = "", sc_id = "") => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${ApiURL}/getallproducts`, {
        page,
        perPage: itemsPerPage,
        search,
        sc_id: sc_id || undefined,
      });

      const { productData, totalCount } = response.data.data || {
        productData: [],
        totalCount: 0,
      };

      setProducts(productData || []);
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, []);

  // Toggle product status
  const handleStatusToggle = async (product) => {
    try {
      const newStatus = product.p_status === 1 ? 0 : 1;
      await axiosInstance.post(`${ApiURL}/changeproductstatus`, {
        p_id: product.p_id,
        p_status: newStatus,
      });
      toast.success(
        `Product status updated to ${newStatus === 1 ? "Active" : "Inactive"}`
      );
      fetchProducts(currentPage, searchTerm);
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  // Pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setLoading(true);
      fetchProducts(page, searchTerm);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Product Collection
        </h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search products by name or description..."
            className="text-black placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-black p-2 sm:p-3 rounded-md w-full sm:w-64"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
          />
          <button
            onClick={() => {
              setCurrentProduct(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-900 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg w-full sm:w-auto"
            aria-label="Add new product"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <RefreshCw
            className="w-12 h-12 text-gray-600 animate-spin"
            aria-label="Loading products"
          />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg font-medium" role="status">
            {searchTerm
              ? `No products found for "${searchTerm}"`
              : "No products found"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {products?.map((product) => {
              const firstImage = product.productcolors?.[0]?.productimages?.[0];

              return (
                <div
                  key={product.p_id}
                  className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <Link to={`/admin/product/${product.p_id}`}>
                    <div className="relative w-full h-64 sm:h-80 overflow-hidden">
                      {firstImage ? (
                        firstImage.image_url.match(
                          /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv)$/
                        ) ? (
                          <video
                            src={`${ApiURL}/assets/Products/${firstImage.image_url}`} // Use full relative path from backend
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            muted
                            playsInline
                            autoPlay
                            loop
                            aria-label={`Video for product ${product.name}`}
                          />
                        ) : (
                          <img
                            src={`${ApiURL}/assets/Products/${firstImage.image_url}`} // Use full relative path from backend
                            alt={`Image for product ${product.name}`}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/180x320?text=Image+Failed";
                            }}
                          />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-gray-500 font-medium">
                            No Media
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                  <div className="p-3 sm:p-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 mb-1">
                      {product.name}
                    </h4>

                    <p className="text-base sm:text-lg font-medium text-gray-900 mb-3">
                      ₹{product.price || product.original_price || "N/A"}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevent navigation on edit
                            setCurrentProduct(product);
                            setIsModalOpen(true);
                          }}
                          className="text-gray-600 hover:text-blue-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          aria-label={`Edit product ${product.name}`}
                        >
                          <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        {/* NEW: Status Toggle Button (replaces delete icon) */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleStatusToggle(product);
                          }}
                          className={`p-1.5 rounded-full transition-all duration-200 ${
                            product.p_status === 1
                              ? "text-green-600 hover:text-green-700 hover:bg-green-100"
                              : "text-red-600 hover:text-red-700 hover:bg-red-100"
                          }`}
                          aria-label={`Toggle status for ${
                            product.name
                          } (currently ${
                            product.p_status === 1 ? "Active" : "Inactive"
                          })`}
                          title={`Toggle Status: ${
                            product.p_status === 1 ? "Active" : "Inactive"
                          }`}
                        >
                          {product.p_status === 1 ? (
                            <ToggleRight className="w-5 h-5 sm:w-6 sm:h-6" />
                          ) : (
                            <ToggleLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                          )}
                        </button>
                        {/* Keep Delete Button (if you want both; otherwise remove this block) */}
                      </div>
                      <span className="bg-white/90 text-gray-800 text-xs sm:text-sm font-medium px-2 py-1 rounded-full shadow">
                        {product.category?.cate_name || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-2 max-w-7xl mx-auto">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:hover:bg-black transition-all duration-200 text-sm font-medium"
                aria-label="Previous page"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } transition-all duration-200`}
                      aria-label={`Page ${pageNumber}`}
                    >
                      {pageNumber}
                    </button>
                  );
                }
                return null;
              })}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:hover:bg-black transition-all duration-200 text-sm font-medium"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={currentProduct}
        refreshProducts={() => fetchProducts(currentPage, searchTerm)}
      />
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, p_id: null, name: "" })}
        itemType="product"
        itemName={deleteModal.name}
      />
    </div>
  );
};

export default Product;
