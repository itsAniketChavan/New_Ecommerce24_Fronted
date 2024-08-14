import React from 'react';
import { BsCurrencyRupee } from 'react-icons/bs';

const OrderDetails = ({ order }) => {
  if (!order) return <p>No order found</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      {/* Grid layout for order details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
          <p className="text-gray-700">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-700">Status: {order.orderStatus}</p>
          <p className="text-gray-700">Paid At: {new Date(order.paidAt).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-700 flex items-center">
            Items Price: <BsCurrencyRupee className="ml-2 mr-1" />{order.itemsPrice.toFixed(2)}
          </p>
          <p className="text-gray-700 flex items-center">
            Shipping Price: <BsCurrencyRupee className="ml-2 mr-1" />{order.shippingPrice.toFixed(2)}
          </p>
          <p className="text-gray-700 flex items-center">
            Tax Price: <BsCurrencyRupee className="ml-2 mr-1" />{order.taxPrice.toFixed(2)}
          </p>
          <p className="text-gray-700 flex items-center">
            Total Price: <BsCurrencyRupee className="ml-2 mr-1" />{order.totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Shipping information */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Shipping Information:</h3>
        <p className="text-gray-700">
          {order.shippingInfo.name}, {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.country}
        </p>
        <p className="text-gray-700">Payment Info: {order.paymentInfo.status} (ID: {order.paymentInfo.id})</p>
      </div>

      {/* Order items list */}
      <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
      <ul className="border-t border-gray-200">
        {order.orderItems.map(item => (
          <li key={item._id} className="py-4 flex items-center border-b border-gray-200">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
            <span className="ml-4 flex items-center">
              {item.name} - <BsCurrencyRupee className="ml-2 mr-1" />{item.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderDetails;
