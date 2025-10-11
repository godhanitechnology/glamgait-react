// AddAddress.jsx
import React from 'react';
import { X } from 'lucide-react';

const AddAddress = ({ onClose, addressType, setAddressType }) => {
  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Add New Address</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Name</label>
            <input
              type="text"
              placeholder="Alexa Williams"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#063d32]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="(603) 555-0123"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#063d32]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Address</label>
            <input
              type="text"
              placeholder="4140 Parker Rd. Allentown, New Mexico 31134"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#063d32]"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">City</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#063d32] appearance-none bg-white">
              <option>New Mexico</option>
              <option>California</option>
              <option>Texas</option>
              <option>New York</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Country</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#063d32] appearance-none bg-white">
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>

          {/* Save Address As */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">Save Address As</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAddressType('HOME')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  addressType === 'HOME'
                    ? 'bg-[#063d32] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                HOME
              </button>
              <button
                type="button"
                onClick={() => setAddressType('WORK')}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  addressType === 'WORK'
                    ? 'bg-[#063d32] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                WORK
              </button>
            </div>
          </div>

          {/* Add Button */}
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
