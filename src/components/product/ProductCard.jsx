import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ id, imageUrl, productName, price, oldPrice, discount, ratings }) => {
  return (
    <div className="relative flex flex-col w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Image Section */}
      <Link to={`/product/${id}`} className="relative flex h-40 overflow-hidden">
        <img className="w-full h-full object-cover transition-transform transform group-hover:scale-110" src={imageUrl} alt="product" />
        <span className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md transition-transform transform hover:scale-110">
          <FaShoppingCart className="text-gray-800 text-lg cursor-pointer hover:text-gray-600" />
        </span>
      </Link>

      {/* Details Section */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <Link to={`/product/${id}`} className="text-lg font-semibold text-gray-800 hover:text-gray-600">
          {productName}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-red-400">${price}</span>
            {oldPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">${oldPrice}</span>
            )}
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                className={`h-5 w-5 ${index < ratings ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
