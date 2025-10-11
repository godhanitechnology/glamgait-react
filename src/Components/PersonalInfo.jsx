import React, { useState } from "react";
import SideBar from "./SideBar";
import AddAddress from "./AddAddress";

const PersonalInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressType, setAddressType] = useState("HOME");

  return (
    <div className="flex flex-col md:flex-row bg-[#f3f0ed] min-h-screen font-inter">
      {/* Left Sidebar */}
      <div className="md:w-1/3 lg:w-1/4">
        <SideBar onMenuChange={() => {}} />
      </div>

      {/* Right Content */}
      <div className="flex-1 bg-[#f3f0ed] p-6 sm:p-10 md:pl-16">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">My Info</h1>

        {/* Contact Details */}
        <div className="space-y-6">
          <h2 className="text-lg font-medium text-gray-900">Contact Details</h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <div>
                <p className="text-sm text-gray-500">Your Name</p>
                <p className="font-medium text-gray-800">Jhanvi Shah</p>
              </div>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Change
              </button>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium text-gray-800">Jhanvi@gmail.com</p>
              </div>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Change
              </button>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <div>
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">8980252445</p>
              </div>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Change
              </button>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-2">
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="font-medium text-gray-800">••••••••</p>
              </div>
              <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Address</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
            >
              Add New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
              >
                <p className="font-medium text-gray-900 mb-1">Jhanvi Shah</p>
                <p className="text-sm text-gray-700 mb-1">8980252445</p>
                <p className="text-sm text-gray-600 mb-4 leading-snug">
                  1/4 Pragatinagar Flats, opp. jain derasor, near Jain derasor,
                  Vijaynagar road
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  <button className="text-xs border border-gray-400 px-3 py-1 rounded-md">
                    {index === 3 ? "Office" : index === 4 ? "Home2" : "Home"}
                  </button>
                  {index === 1 ? (
                    <button className="text-xs border border-gray-400 px-3 py-1 rounded-md">
                      Default billing address
                    </button>
                  ) : index === 2 ? (
                    <button className="text-xs border border-gray-400 px-3 py-1 rounded-md">
                      Default shipping address
                    </button>
                  ) : (
                    <button className="text-xs border border-gray-400 px-3 py-1 rounded-md">
                      Set as default
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Remove
                  </button>
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
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
        />
      )}
    </div>
  );
};

export default PersonalInfo;
