/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  TrashIcon,
  StarIcon,
  XMarkIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { ApiURL } from "../../Variable";
import toast from "react-hot-toast";
import axiosInstance from "../../Axios/axios";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviewsPerPage] = useState(10);

  // Modal
  const [modal, setModal] = useState({
    open: false,
    editMode: false,
    reviewId: null,
  });
  const [form, setForm] = useState({
    product: "",
    rating: 0,
    comment: "",
    name: "",
    image: null,
    preview: null,
  });

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    reviewId: null,
    name: "",
  });

  const [submitting, setSubmitting] = useState(false);

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
        setReviews(data.reviews || []);
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

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.post(`${ApiURL}/getproducts`, {
        limit: 100,
      });
      if (res.data.status === 1) setProducts(res.data.data || []);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  useEffect(() => {
    fetchReviews(currentPage);
    fetchProducts();
  }, [currentPage, searchTerm]);

  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Delete
  const handleDelete = (reviewId, name) =>
    setDeleteModal({ isOpen: true, reviewId, name });

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

  const togglePublish = async (reviewId, currentStatus) => {
    try {
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

  // Open Add/Edit Modal
  const openModal = (edit = false, review = null) => {
    if (edit && review) {
      setForm({
        product: review.p_id || "",
        rating: review.rating || 0,
        comment: review.message || "",
        name: review.reviewer_name || "",
        image: null,
        preview: review.image_url ? `${ApiURL}/${review.image_url}` : null,
      });
      setModal({ open: true, editMode: true, reviewId: review.r_id });
    } else {
      resetForm();
      setModal({ open: true, editMode: false, reviewId: null });
    }
  };

  const resetForm = () =>
    setForm({
      product: "",
      rating: 0,
      comment: "",
      name: "",
      image: null,
      preview: null,
    });

  // Add or Edit Review
  const handleSubmit = async () => {
    if (!form.product || form.rating === 0 || !form.comment.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("p_id", form.product);
      formData.append("rating", form.rating);
      formData.append("message", form.comment);
      formData.append("is_published", 1);
      if (form.name) formData.append("user_name", form.name);
      if (form.image) formData.append("userReviewImage", form.image);

      if (modal.editMode) {
        formData.append("r_id", modal.reviewId);
        await axiosInstance.post(`${ApiURL}/updateuserreview`, formData);
        toast.success("Review updated!");
      } else {
        await axiosInstance.post(`${ApiURL}/addfakereview`, formData);
        toast.success("Review added!");
      }

      setModal({ open: false, editMode: false, reviewId: null });
      resetForm();
      fetchReviews(currentPage);
    } catch (error) {
      toast.error("Failed to save review");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getPageNumbers = () => {
    const pages = [];
    const max = 5;
    const half = Math.floor(max / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Review Management
        </h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search reviews..."
            className="flex-1 sm:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            onClick={() => openModal(false)}
            className="bg-black text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition"
          >
            Add Review
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">
          No reviews found
        </div>
      ) : (
        <>
          {/* Mobile Cards */}
          <div className="block lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div
                key={r.r_id}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col"
              >
                {/* Image */}
                {r.image_url && (
                  <img
                    src={`${ApiURL}/assets/UserReviews/${r.image_url}`}
                    alt="review"
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-2 flex-1">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {r.reviewer_name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 font-medium">
                      {r.rating}
                    </span>
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 mb-2 line-clamp-2 flex-1">
                  {r.message}
                </p>

                {/* Product */}
                <p className="text-xs text-gray-500 italic mb-3">
                  Product: {r.product_name}
                </p>

                {/* Publish Toggle + Actions */}
                <div className="flex justify-between items-center mt-auto">
                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={r.is_published}
                      onChange={() => togglePublish(r.r_id, r.is_published)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600 text-xs"></div>
                    <span className="ml-1 text-xs text-gray-600">
                      {r.is_published ? "Live" : "Draft"}
                    </span>
                  </label>

                  {/* Actions */}
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => openModal(true, r)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(r.r_id, r.reviewer_name)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left">Image</th>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Product</th>
                  <th className="px-6 py-3 text-left">Rating</th>
                  <th className="px-6 py-3 text-left">Comment</th>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {reviews.map((r) => (
                  <tr key={r.r_id}>
                    <td className="px-6 py-3">
                      {r.image_url ? (
                        <img
                          src={`${ApiURL}/assets/UserReviews/${r.image_url}`}
                          alt="review"
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-3 font-medium">
                      {r.reviewer_name || "User"}
                    </td>
                    <td className="px-6 py-3">{r.product_name || "N/A"}</td>
                    <td className="px-6 py-3 flex items-center gap-1">
                      {r.rating}
                      <StarIcon className="w-4 h-4 text-yellow-500" />
                    </td>
                    <td className="px-6 py-3">{r.message}</td>
                    <td className="px-6 py-3 text-gray-500">
                      {formatDate(r.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* Publish Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={r.is_published}
                            onChange={() =>
                              togglePublish(r.r_id, r.is_published)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>

                        {/* Edit & Delete */}
                        <button
                          onClick={() => openModal(true, r)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(r.r_id, r.reviewer_name)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2 flex-wrap">
              {getPageNumbers().map((n) => (
                <button
                  key={n}
                  onClick={() => paginate(n)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === n
                      ? "bg-black text-white"
                      : "bg-white border border-gray-300 text-gray-700"
                  }`}
                >
                  {n}
                </button>
              ))}
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

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setModal({ open: false, editMode: false })}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              {modal.editMode ? "Edit Review" : "Add New Review"}
            </h2>

            {/* Product */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black text-sm"
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.p_id} value={p.p_id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`p-1 ${
                      star <= form.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    <StarIcon className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black text-sm"
              />
            </div>

            {/* Name / Email */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Image
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.files[0],
                      preview: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                />
                {form.preview && (
                  <img
                    src={form.preview}
                    alt="preview"
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>

            <button
              disabled={submitting}
              onClick={handleSubmit}
              className="w-full bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
            >
              {submitting
                ? "Saving..."
                : modal.editMode
                ? "Update Review"
                : "Add Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
