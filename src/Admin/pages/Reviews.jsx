/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { ApiURL } from "../../Variable";
import toast from "react-hot-toast";
import axiosInstance from "../../Axios/axios";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviewsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    reviewId: null,
    name: "",
  });

  // Fetch Reviews
  const fetchReviews = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`${ApiURL}/getalluserreviews`, {
        page,
        perPage: reviewsPerPage,
        search: searchTerm,
      });

      if (response.data.status === 1) {
        const data = response.data.data;
        setReviews(data.reviwes || []);
        const totalCount = data.totalCount || 0;
        setTotalPages(Math.ceil(totalCount / reviewsPerPage));
      } else {
        setReviews([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
  }, [currentPage, searchTerm]);

  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Toggle Publish
  const togglePublish = async (reviewId, currentStatus) => {
    try {
      // Convert boolean → 1/0 safely
      const newStatus = currentStatus ? 0 : 1;

      await axiosInstance.post(`${ApiURL}/togglereviewpublish`, {
        r_id: reviewId,
        is_published: newStatus,
      });

      toast.success(newStatus ? "Published" : "Unpublished");
      fetchReviews(currentPage);
    } catch (error) {
      toast.error("Failed to update");
      console.error(error);
    }
  };

  // Delete
  const handleDelete = (reviewId, name) => {
    setDeleteModal({ isOpen: true, reviewId, name });
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(
        `${ApiURL}/deletereview/${deleteModal.reviewId}`
      );
      toast.success("Review deleted");
      fetchReviews(currentPage);
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setDeleteModal({ isOpen: false, reviewId: null, name: "" });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start + 1 < maxPagesToShow)
      start = Math.max(1, end - maxPagesToShow + 1);
    for (let i = start; i <= end; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Review Management
        </h1>
        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm transition"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No reviews found</p>
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {reviews.map((review) => (
              <div
                key={review.r_id}
                className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.user?.first_name || "Anonymous"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm font-medium">
                      {review.rating}
                    </span>
                    <svg
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {review.message || "No comment"}
                </p>

                <div className="flex items-center justify-between">
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={review.is_published}
                      onChange={() =>
                        togglePublish(review.r_id, review.is_published)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    <span className="ml-2 text-xs font-medium text-gray-600">
                      {review.is_published ? "Live" : "Draft"}
                    </span>
                  </label>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(review.r_id, review.user?.first_name)
                    }
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => (
                    <tr
                      key={review.r_id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {review.user?.first_name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <span className="font-medium">{review.rating}</span>
                          <svg
                            className="w-4 h-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                        {review.message || "No comment"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium flex items-center justify-end gap-3">
                        {/* Toggle Switch */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={review.is_published}
                            onChange={() =>
                              togglePublish(review.r_id, review.is_published)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>

                        <button
                          onClick={() =>
                            handleDelete(review.r_id, review.user?.first_name)
                          }
                          className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Previous
              </button>

              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentPage === number
                      ? "bg-black text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, reviewId: null, name: "" })
        }
        onConfirm={confirmDelete}
        itemType="review"
        itemName={deleteModal.name || "this review"}
      />
    </div>
  );
};

export default Reviews;
