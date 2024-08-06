import React from 'react';

const ErrorPopup = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <div className="bg-white p-6 rounded shadow-lg text-center">
        <div className="text-red-600 text-xl font-bold mb-4">
          Something went wrong
        </div>
        <div className="text-gray-700 mb-4">
          The backend server is currently down. Please try again later.
        </div>
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
