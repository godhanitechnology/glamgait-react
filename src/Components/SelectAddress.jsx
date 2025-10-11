import React, { useState } from 'react';
import { Plus, MoreVertical, Phone, X } from 'lucide-react';
import AddAddress from './AddAddress';

const SelectAddress = () => {
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressType, setAddressType] = useState('HOME');

  const addresses = [
    {
      id: 1,
      name: 'Alexa Williams',
      address: '6391 Elgin St. Celina, Delaware 10299',
      phone: '(239) 555-0108',
      isHome: true,
    },
    {
      id: 2,
      name: 'Alexa Williams',
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      phone: '(603) 555-0123',
      isHome: false,
    },
    {
      id: 3,
      name: 'Alexa Williams',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
      phone: '(229) 555-0109',
      isHome: false,
    },
    {
      id: 4,
      name: 'Wade Warren',
      address: '3891 Ranchview Dr. Richardson, California 62639',
      phone: '(270) 555-0117',
      isHome: false,
    },
  ];

  const subtotal = 360.0;
  const taxes = 25.0;
  const deliveryFee = 0;
  const grandTotal = subtotal + taxes + deliveryFee;

  return (
    <div className="bg-[#f3f0ed] min-h-screen px-4 md:px-10 py-10">
      <h2 className="text-2xl font-semibold mb-6">Select Address</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section - Addresses */}
        <div className="flex-1">
          {/* Default Address */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Default Address</h3>
            <div
              onClick={() => setSelectedAddress(addresses[0].id)}
              className="bg-white rounded-xl p-5 shadow-sm cursor-pointer relative"
            >
              <div className="flex items-start gap-3">
                {/* Radio Button */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                    selectedAddress === addresses[0].id
                      ? 'border-[#063d32]'
                      : 'border-gray-400'
                  }`}
                >
                  {selectedAddress === addresses[0].id && (
                    <div className="w-3 h-3 rounded-full bg-[#063d32]"></div>
                  )}
                </div>

                {/* Address Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{addresses[0].name}</h4>
                    {addresses[0].isHome && (
                      <span className="bg-[#063d32] text-white text-xs px-2 py-0.5 rounded">
                        HOME
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {addresses[0].address}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{addresses[0].phone}</span>
                  </div>
                </div>

                {/* Three Dots Menu */}
                <button className="text-gray-600 hover:text-black">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Other Addresses */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Other Address</h3>
            <div className="space-y-3">
              {addresses.slice(1).map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className="bg-white rounded-xl p-5 shadow-sm cursor-pointer relative"
                >
                  <div className="flex items-start gap-3">
                    {/* Radio Button */}
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                        selectedAddress === address.id
                          ? 'border-[#063d32]'
                          : 'border-gray-400'
                      }`}
                    >
                      {selectedAddress === address.id && (
                        <div className="w-3 h-3 rounded-full bg-[#063d32]"></div>
                      )}
                    </div>

                    {/* Address Details */}
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{address.name}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {address.address}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{address.phone}</span>
                      </div>
                    </div>

                    {/* Three Dots Menu */}
                    <button className="text-gray-600 hover:text-black">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add New Address Button */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-6 border-2 border-gray-300 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white transition">
            <Plus size={20} />
            <span className="font-medium">ADD NEW ADDRESS</span>
          </button>
        </div>

        {/* Right Section - Order Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full lg:w-1/3 h-fit">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Delivery Fee</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Grand Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button
            className="w-full mt-6 bg-[#063d32] text-white py-3 rounded-md hover:bg-[#052d25] transition"
          >
            CONTINUE
          </button>
        </div>
      </div>

      {/* Add New Address Modal */}
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

export default SelectAddress;