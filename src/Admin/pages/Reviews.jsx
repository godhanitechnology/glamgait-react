/* eslint-disable no-undef */
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

  // Fetch reviews
  const fetchReviews = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${ApiURL}/getallreviews`, {
        params: { page, limit: reviewsPerPage, search: searchTerm },
      });
      setReviews(response.data.data.reviews || []);
      setTotalPages(response.data.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.data.pagination?.currentPage || 1);
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

  // Delete review
  const handleDelete = (reviewId, name) => {
    setDeleteModal({ isOpen: true, reviewId, name });
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(
        `${ApiURL}/deletereview/${deleteModal.reviewId}`
      );
      toast.success("Review deleted!");
      fetchReviews(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error deleting review");
    } finally {
      setDeleteModal({ isOpen: false, reviewId: null, name: "" });
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfPagesToShow);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="container  px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Review Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full sm:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search reviews"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon
            className="h-12 w-12 text-gray-400 animate-spin"
            aria-label="Loading reviews"
          />
        </div>
      ) : reviews?.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-base sm:text-lg" role="status">
            No reviews found
          </p>
        </div>
      ) : (
        <>
          {/* Desktop: Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                    Comment
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews?.map((review) => (
                  <tr key={review.review_id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700 text-sm">
                        {review.user?.full_name || "Unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700 text-sm">
                        {review.rating || "N/A"}/5
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 truncate max-w-full">
                        {review.comment || "No comment"}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(review.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <button
                        onClick={() =>
                          handleDelete(review.review_id, review.user?.full_name)
                        }
                        className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-full hover:bg-red-200 transition-colors"
                        aria-label={`Delete review from ${
                          review.user?.full_name || "Unknown"
                        }`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: Card View */}
          <div className="md:hidden space-y-4">
            {reviews?.map((review) => (
              <div
                key={review.review_id}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {review.user?.full_name || "Unknown"}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleDelete(review.review_id, review.user?.full_name)
                    }
                    className="text-red-600 hover:text-red-900 bg-red-100 p-2 rounded-full hover:bg-red-200 transition-colors"
                    aria-label={`Delete review from ${
                      review.user?.full_name || "Unknown"
                    }`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-sm text-gray-900 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded-full">
                    {review.rating || "N/A"}/5
                  </span>
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  {review.comment || "No comment"}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(review.createdAt)}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black hover:bg-black text-white"
                }`}
                aria-label="Previous page"
              >
                Previous
              </button>

              <div className="md:hidden flex items-center text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </div>

              <div className="hidden md:flex gap-1">
                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === number
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-label={`Page ${number}`}
                  >
                    {number}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-lg text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-black"
                }`}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, reviewId: null, name: "" })
        }
        onConfirm={confirmDelete}
        itemType="review"
        itemName={deleteModal.name || "Unknown"}
      />
    </div>
  );
};

export default Reviews;
