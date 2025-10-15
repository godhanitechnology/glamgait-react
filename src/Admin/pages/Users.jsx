/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  ArrowPathIcon,
  UserCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Axios/axios";
import { ApiURL, userInfo } from "../../Variable";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    userId: null,
    full_name: "",
  });

  const userData = userInfo();
  const token = userData?.token;

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${ApiURL}/getusers`, {
        params: { page, limit: itemsPerPage, search: searchTerm },
      });
      const { users, totalPages } = response.data.data || {
        users: [],
        totalPages: 1,
      };
      setUsers(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, searchTerm]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchUsers(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleDelete = (userId, full_name) => {
    setDeleteModal({ isOpen: true, userId, full_name });
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`${ApiURL}/user/delete/${deleteModal.userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("User deleted successfully!");
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setDeleteModal({ isOpen: false, userId: null, full_name: "" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="flex w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <MagnifyingGlassIcon
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ArrowPathIcon className="h-12 w-12 text-gray-400 animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-10 text-gray-500 text-lg">
          No users found
        </div>
      ) : (
        <>
          {/* Table Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr
                      key={user.u_id}
                      className="hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        <span className="text-gray-800 font-medium">
                          {user.full_name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDelete(user.u_id, user.full_name)}
                          className="text-red-600 hover:text-red-900"
                          aria-label={`Delete ${user.full_name}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 flex items-center gap-1"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              Prev
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 flex items-center gap-1"
            >
              Next
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() =>
          setDeleteModal({ isOpen: false, userId: null, full_name: "" })
        }
        onConfirm={confirmDelete}
        itemType="user"
        itemName={deleteModal.full_name}
      />
    </div>
  );
};

export default Users;
