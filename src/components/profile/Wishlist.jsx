import React, { useState } from 'react';
import { BsCurrencyRupee } from 'react-icons/bs'; // Import the Rupee icon
import wirelessMouse from '../../assets/images/mouse.jpg'; // Adjust the path as needed
import bluetoothKeyboard from '../../assets/images/keyboard.jpg'; // Adjust the path as needed
import gamingMonitor from '../../assets/images/monitor.jpg'; // Adjust the path as needed

const Wishlist = () => {
  const sampleWishlistItems = [
    { id: 1, name: 'Wireless Mouse', image: wirelessMouse, price: 25 },
    { id: 2, name: 'Bluetooth Keyboard', image: bluetoothKeyboard, price: 45 },
    { id: 3, name: 'Gaming Monitor', image: gamingMonitor, price: 300 },
    { id: 4, name: 'Another Item', image: wirelessMouse, price: 30 },
    { id: 5, name: 'Yet Another Item', image: bluetoothKeyboard, price: 40 },
    { id: 6, name: 'Final Item', image: gamingMonitor, price: 350 },
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleWishlistItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sampleWishlistItems.length / itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Wishlist</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentItems.length === 0 ? (
          <p className="text-gray-700 col-span-full">Your wishlist is empty.</p>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg bg-gray-50 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <BsCurrencyRupee className="mr-1" />
                  {item.price}
                </p>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="text-blue-600 hover:underline">Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="text-gray-700">Page {currentPage} of {totalPages}</p>
        <button
          className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
