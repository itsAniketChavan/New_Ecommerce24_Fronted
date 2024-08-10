  import React, { useState, useEffect } from 'react';
  import Loader from '../../pages/Loader';
  import OrderDetails from './OrderDetails';

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const itemsPerPage = 4;

  const getStatusStyles = (status) => {
    switch (status) {
      case 'processing':
        return 'border border-yellow-700 bg-yellow-100 text-yellow-700 px-2 py-1 rounded';
      case 'shipped':
        return 'border border-blue-700 bg-blue-100 text-blue-700 px-2 py-1 rounded';
      case 'delivered':
        return 'border border-green-700 bg-green-100 text-green-700 px-2 py-1 rounded';
      case 'cancelled':
        return 'border border-red-700 bg-red-100 text-red-700 px-2 py-1 rounded';
      default:
        return 'border border-gray-700 bg-gray-100 text-gray-700 px-2 py-1 rounded';
    }
  };

  const OrderDetailsPage = ({ order, onBack }) => {
    if (!order) return <p>No order found</p>;

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <button onClick={onBack} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Back to Orders
        </button>
        <OrderDetails order={order} />
      </div>
    );
  };

  const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
      const fetchOrders = async () => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        const userId = storedUserData._id;
        try {
          setLoading(true);
          const response = await fetch(`${BASE_URL}/api/users/${userId}/orders`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const data = await response.json();
        
          if (data.success) {
            setOrders(data.orders);
          } else {
            setError('Failed to load orders');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []);

    const totalPages = Math.ceil(orders.length / itemsPerPage);

    const handlePageChange = (page) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    const handleOrderClick = (orderId) => {
      const order = orders.find((o) => o._id === orderId);
      setSelectedOrder(order);
    };

    const handleBack = () => {
      setSelectedOrder(null);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        {selectedOrder ? (
          <OrderDetailsPage order={selectedOrder} onBack={handleBack} />
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Photo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-blue-100 transition-colors duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleOrderClick(order._id)} // Handle click on order row
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className="w-16 h-16 object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderItems[0].name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <span className={getStatusStyles(order.orderStatus)}>{order.orderStatus}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  export default MyOrders;
