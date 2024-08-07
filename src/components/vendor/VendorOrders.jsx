import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import Loader from '../../pages/Loader'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const getStatusStyles = (status) => {
  switch (status) {
    case 'processing':
      return 'border border-yellow-700 bg-yellow-100 text-yellow-700 px-2 py-1 rounded';
    case 'shipped':
      return 'border border-blue-700 bg-blue-100 text-blue-700 px-2 py-1 rounded';
    case 'delivered':
      return 'border border-green-700 bg-green-100 text-green-700 px-2 py-1 rounded';
    default:
      return 'border border-gray-700 bg-gray-100 text-gray-700 px-2 py-1 rounded';
  }
};

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const ordersPerPage = 3;

  const fetchOrders = async () => {
    setIsLoading(true); 

    try {
      const response = await fetch(`${BASE_URL}/api/orders/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdate = async (orderId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/orders/${orderId}/process`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ orderStatus: 'shipped' }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Order updated successfully");
        // Re-fetch the orders to get the updated list
        fetchOrders();
      } else {
        console.error(data.message);
        toast.error("Error updating order");
      }
    } catch (error) {
      console.error('An error occurred while updating the order:', error);
    }
  };

  return (
    <> 
      <ToastContainer />
      {isLoading && <Loader />} 
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Vendor Orders</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Photo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ minWidth: '150px' }}>Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-100 transition-colors duration-300 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderItems[0].name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shippingInfo.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shippingInfo.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={getStatusStyles(order.orderStatus)}>{order.orderStatus}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.totalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {order.orderStatus === 'delivered' ? (
                      <FaCheck className="text-green-500 text-2xl" />
                    ) : (
                      <button
                        onClick={() => handleUpdate(order._id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                      >
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 ease-in-out mr-2"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastOrder >= orders.length}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default VendorOrders;
