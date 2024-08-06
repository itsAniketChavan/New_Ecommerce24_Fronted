import React from 'react';

const CustomerSupport = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Support</h2>
      <p className="text-gray-700 mb-4">For any questions or support, please reach out to us through the following methods:</p>
      <ul className="space-y-4">
        <li className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Email Support</h3>
          <p className="text-gray-700">support@example.com</p>
        </li>
        <li className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Phone Support</h3>
          <p className="text-gray-700">+1 (800) 123-4567</p>
        </li>
        <li className="p-4 border rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">Live Chat</h3>
          <p className="text-gray-700">Available on our website during business hours.</p>
        </li>
      </ul>
    </div>
  );
};

export default CustomerSupport;
