import React from 'react';

const PaymentMethods = () => {
  const samplePaymentMethods = [
    { id: 1, type: 'Credit Card', lastFour: '1234', cardType: 'Visa' },
    { id: 2, type: 'Credit Card', lastFour: '5678', cardType: 'MasterCard' },
    { id: 3, type: 'PayPal', lastFour: '', cardType: 'PayPal' },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Methods</h2>
      
      <div className="space-y-4">
        {samplePaymentMethods.length === 0 ? (
          <p className="text-gray-700">No payment methods added.</p>
        ) : (
          <ul className="space-y-4">
            {samplePaymentMethods.map((method) => (
              <li
                key={method.id}
                className="cursor-pointer p-4 border rounded-md bg-gray-50 shadow-sm flex items-center justify-between hover:bg-gray-100 transition-colors duration-300"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                    {method.type}
                  </p>
                  <p className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    {method.cardType} ending in {method.lastFour}
                  </p>
                </div>
                <button className="text-blue-600 hover:underline transition-colors duration-300">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <button className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300">
          Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
