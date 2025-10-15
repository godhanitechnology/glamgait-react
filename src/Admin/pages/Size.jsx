import { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import axiosInstance from "../../Axios/axios";
import { ApiURL, showToaster } from "../../Variable";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Sizes = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sizeData, setSizeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    size_name: "",
    cate_id: "",
    size_id: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    size_id: null,
    name: "",
  });

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get(`${ApiURL}/getcategory`);
      if (response?.data?.status) {
        setCategories(response?.data?.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const fetchSizes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${ApiURL}/getsize`);
      if (response?.data?.status) setSizeData(response?.data?.data);
      else setSizeData([]);
    } catch (error) {
      console.error("Error fetching sizes:", error);
      setSizeData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSizes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        size_name: formData?.size_name,
        cate_id: formData?.cate_id,
        ...(isEdit && { size_id: formData?.size_id }),
      };

      if (isEdit) {
        const response = await axiosInstance.put(
          `${ApiURL}/updatesize`,
          payload
        );
        showToaster(response?.data?.status, response?.data?.description);
      } else {
        const response = await axiosInstance.post(`${ApiURL}/addsize`, payload);
        showToaster(response?.data?.status, response?.data?.description);
      }
      fetchSizes();
      setIsModalOpen(false);
      setFormData({ size_name: "", cate_id: "", size_id: null });
      setIsEdit(false);
    } catch (error) {
      console.log(error);
      showToaster(0, "Error saving size");
    }
  };

  const handleDelete = (size_id, size_name) => {
    setDeleteModal({ isOpen: true, size_id, name: size_name });
  };

  const confirmDelete = async () => {
    try {
      const response = await axiosInstance.delete(`${ApiURL}/deletesize/${deleteModal.size_id}`);
      showToaster(response?.data?.status, response?.data?.description);
      if (response?.data?.status) fetchSizes();
    } catch (error) {
      console.log(error);
      showToaster(0, "Error deleting size");
    } finally {
      setDeleteModal({ isOpen: false, size_id: null, name: "" });
    }
  };

  const getCategoryName = (cateId) => {
    const category = categories.find((cat) => cat.cate_id === parseInt(cateId));
    return category ? category.cate_name : cateId;
  };

  const filteredSizes = sizeData?.filter((size) =>
    size?.size_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Size Management</h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search sizes..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => {
              setIsEdit(false);
              setFormData({ size_name: "", cate_id: "", size_id: null });
              setIsModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-black hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Size</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : filteredSizes?.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No sizes found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSizes?.map((size) => (
                <tr key={size?.size_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                        {size?.size_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">
                        {getCategoryName(size?.cate_id)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setIsEdit(true);
                        setFormData({
                          size_name: size?.size_name,
                          cate_id: size?.cate_id,
                          size_id: size?.size_id,
                        });
                        setIsModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(size?.size_id, size?.size_name)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? "Edit Size" : "Add New Size"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size Name
                </label>
                <input
                  autoFocus
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData?.size_name}
                  onChange={(e) =>
                    setFormData({ ...formData, size_name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData?.cate_id}
                  onChange={(e) =>
                    setFormData({ ...formData, cate_id: e.target.value })
                  }
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.cate_id} value={category.cate_id}>
                      {category.cate_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-indigo-700"
                >
                  {isEdit ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, size_id: null, name: "" })}
        onConfirm={confirmDelete}
        itemType="size"
        itemName={deleteModal.name}
      />
    </div>
  );
};

export default Sizes;