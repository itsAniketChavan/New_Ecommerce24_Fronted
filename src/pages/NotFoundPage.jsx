import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 mb-8">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
