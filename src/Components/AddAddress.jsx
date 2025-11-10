import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axiosInstance from "../Axios/axios";
import { userInfo } from "../Variable";
import toast from "react-hot-toast";

const AddAddress = ({
  onClose,
  addressType,
  setAddressType,
  refreshAddresses,
  editingAddress,
}) => {
  const user = userInfo();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (editingAddress) {
      setFormData({
        first_name: editingAddress.first_name,
        last_name: editingAddress.last_name,
        email: editingAddress.email,
        phone_number: editingAddress.phone_number,
        address: editingAddress.address,
        apartment: editingAddress.apartment,
        city: editingAddress.city,
        state: editingAddress.state,
        zip_code: editingAddress.zip_code,
      });
      setAddressType(editingAddress.address_type);
    }
  }, [editingAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        u_id: user?.u_id,
        address_type: addressType,
      };

      let res;
      if (editingAddress) {
        payload.add_id = editingAddress.add_id;
        res = await axiosInstance.put("/updateaddress", payload); // Update API
      } else {
        res = await axiosInstance.post("/addaddress", payload); // Add API
      }

      if (res?.data?.status === 1) {
        toast.success(res.data.description || "Address saved successfully");
        refreshAddresses();
        onClose();
      } else {
        console.log(res?.data?.description || "Failed to save address");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Add New Address</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex gap-2">
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
            />
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
            />
          </div>

          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
          />

          {/* Phone */}
          <input
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
          />

          {/* Address */}
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
          />

          {/* Apartment */}
          <input
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            placeholder="Apartment, Suite, etc. (Optional)"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
          />

          {/* State & City */}
          <div className="flex gap-2">
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State"
              required
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
            />
          </div>

          {/* ZIP */}
          <input
            name="zip_code"
            value={formData.zip_code}
            onChange={handleChange}
            placeholder="ZIP Code"
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#063d32]"
          />

          {/* Address Type */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setAddressType("HOME")}
              className={`px-6 py-2 rounded-md font-medium ${
                addressType === "HOME"
                  ? "bg-[#063d32] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              HOME
            </button>
            <button
              type="button"
              onClick={() => setAddressType("WORK")}
              className={`px-6 py-2 rounded-md font-medium ${
                addressType === "WORK"
                  ? "bg-[#063d32] text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              WORK
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#063d32] text-white py-3 rounded-lg hover:bg-[#052d25] transition font-medium mt-6"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
