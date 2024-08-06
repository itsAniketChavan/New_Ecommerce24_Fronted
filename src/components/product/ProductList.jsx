import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; // Adjust the import path as needed
import Loader from '../../pages/Loader';
import ErrorPage from '../../pages/ErrorPage';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ITEMS_PER_PAGE = 6;

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products data from API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsData(data.products); // Adjust this if the structure of the response is different
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error}</div>;

  // Calculate the starting and ending index of the items to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = productsData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(productsData.length / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="px-10 py-6">
      {/* Product grid with 3 cards per row */}
      <div className="flex flex-wrap gap-10">
        {currentProducts.map((product) => (
          <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <ProductCard
              id={product._id} // Pass the product ID
              imageUrl={product.images[0].url}
              productName={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              ratings={product.ratings}
            />
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 mx-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
