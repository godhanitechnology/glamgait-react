import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AddAddress from "./AddAddress";
import axiosInstance from "../Axios/axios";
import { ApiURL, userInfo } from "../Variable";
import toast from "react-hot-toast";

const PersonalInfo = () => {
  const [userData, setUserData] = useState(null);
  const [editingField, setEditingField] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null); // NEW: address being edited
  const [addressType, setAddressType] = useState("HOME");
  const [addresses, setAddresses] = useState([]);
  const user = userInfo();
  const u_id = user?.u_id;

  // Fetch user data and addresses
  const fetchUser = async () => {
    if (!u_id) return;
    try {
      const res = await axiosInstance.get(`${ApiURL}/user/${u_id}`);
      if (res.data.status === 1) setUserData(res.data.data);
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchAddress = async () => {
    if (!u_id) return;
    try {
      const res = await axiosInstance.post(`${ApiURL}/getaddress`, { u_id });
      if (res.data.status === 1) setAddresses(res.data.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchAddress();
  }, [u_id]);

  // Edit & Save user info
  const handleEdit = (field) => {
    setEditingField(field);
    setInputValue(userData[field] || "");
  };
  const handleSave = async () => {
    try {
      const res = await axiosInstance.put(`${ApiURL}/user/${u_id}`, {
        [editingField]: inputValue,
      });
      if (res.data.status === 1) {
        setUserData((prev) => ({ ...prev, [editingField]: inputValue }));
        setEditingField("");
        toast.success("User info updated!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE address
  const handleDeleteAddress = async (add_id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await axiosInstance.post(`${ApiURL}/deleteaddress`, { add_id });
      if (res.data.status === 1) {
        toast.success("Address deleted successfully");
        fetchAddress();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT address
  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressType(addr.address_type || "HOME");
    setIsModalOpen(true);
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row bg-[#f3f0ed] min-h-screen font-inter">
      {/* Left Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <SideBar />
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-[#f3f0ed] p-6 sm:p-10 md:pl-16">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">My Info</h1>

        {/* Contact Details */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Contact Details</h2>
          {["first_name", "email", "password"].map((field) => (
            <div
              key={field}
              className="flex justify-between items-center border-b border-gray-300 pb-2"
            >
              <div>
                <p className="text-sm text-gray-500">
                  {field === "first_name"
                    ? "Your Name"
                    : field === "password"
                    ? "Password"
                    : "Email Address"}
                </p>
                {editingField === field ? (
                  <input
                    type={field === "password" ? "password" : "text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 mt-1"
                  />
                ) : (
                  <p className="font-medium text-gray-800">
                    {field === "password" ? "••••••••" : userData[field] || "N/A"}
                  </p>
                )}
              </div>
              {editingField === field ? (
                <div className="flex gap-2">
                  <button
                    className="text-sm font-medium text-green-600 hover:text-green-800"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                    onClick={() => setEditingField("")}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  onClick={() => handleEdit(field)}
                >
                  Change
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Address Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Address</h2>
            <button
              onClick={() => {
                setEditingAddress(null);
                setIsModalOpen(true);
              }}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
            >
              Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses?.map((addr) => (
              <div
                key={addr.add_id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <p className="font-medium text-gray-900 mb-1">
                  {addr.first_name} {addr.last_name}
                </p>
                <p className="text-sm text-gray-700 mb-1">{addr.phone_number}</p>
                <p className="text-sm text-gray-600 mb-4 leading-snug">
                  {addr.address}, {addr.apartment}, {addr.city}-{addr.zip_code},{" "}
                  {addr.state}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <button className="text-xs border border-gray-400 px-3 py-1 rounded-md">
                    {addr.address_type || "Home"}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="text-sm font-medium text-red-400  hover:text-red-800"
                    onClick={() => handleDeleteAddress(addr.add_id)}
                  >
                    Remove
                  </button>
                  <button
                    className="text-sm font-medium  text-[#02382A] hover:[#02382A]"
                    onClick={() => handleEditAddress(addr)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddAddress
          onClose={() => setIsModalOpen(false)}
          addressType={addressType}
          setAddressType={setAddressType}
          refreshAddresses={fetchAddress}
          editingAddress={editingAddress}
        />
      )}
    </div>
  );
};

export default PersonalInfo;