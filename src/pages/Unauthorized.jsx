// src/pages/UnauthorizedPage.jsx
import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700">You do not have permission to access this page.</p>
        <a href="/" className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
