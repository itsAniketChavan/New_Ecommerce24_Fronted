import React, { useEffect, useState } from 'react';
import { FaBox, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VendorUpdateProduct from './VendorUpdateProduct';
import Loader from '../../pages/Loader'; 
  

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PAGE_SIZE = 5; // Number of products per page

const VendorAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); 
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status === 404) {
          setError('Products not found.');
          throw new Error('Products not found.');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        // console.log("Y")
        const data = await response.json();
        setProducts(data.products); // Assuming data.products is the list of all products
        setTotalPages(Math.ceil(data.products.length / PAGE_SIZE));
      } catch (error) {
        toast.error(error.message || 'An error occurred while fetching products');
        setError(error.message || 'An error occurred while fetching products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const paginatedProducts = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return products.slice(start, end);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        // Refresh the product list
        const updatedProducts = products.filter(product => product._id !== id);
        setProducts(updatedProducts);
        setTotalPages(Math.ceil(updatedProducts.length / PAGE_SIZE));

        // Adjust the current page if necessary
        if (currentPage > Math.ceil(updatedProducts.length / PAGE_SIZE)) {
          setCurrentPage(prevPage => prevPage - 1);
        }

        toast.success('Product deleted successfully');
      } catch (error) {
        toast.error(error.message || 'An error occurred while deleting the product');
        console.error(error);
      }
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Set the selected product for editing
  };

  const handleBackToList = () => {
    setSelectedProduct(null); // Clear the selected product to show the list again
  };

  return (
    <> 
    {loading && <Loader/>}
    <div className="p-6 bg-white rounded-lg shadow-md">
       
      <ToastContainer />
      {selectedProduct ? (
        // Render the update form when a product is selected
        <VendorUpdateProduct
          product={selectedProduct}
          onBack={handleBackToList}
          onProductUpdated={(updatedProduct) => {
            // Update the product in the list
            setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
            setSelectedProduct(null);
            toast.success('Product updated successfully');
          }}
        />
      ) : (
        <>
          <h1 className="text-3xl font-bold flex items-center mb-4">
            <FaBox className="text-2xl mr-2" />
            All Products
          </h1>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr>
                    <th className="border p-2">Image</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Stock</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts().map(product => (
                    <tr key={product._id}>
                      <td className="border p-2">
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="border p-2">{product.name}</td>
                      <td className="border p-2">${product.price}</td>
                      <td className="border p-2">{product.category}</td>
                      <td className="border p-2">{product.stock}</td>
                      <td className="border p-2">
                        <button
                          className="text-blue-500 mr-2"
                          onClick={() => handleEdit(product)} // Call handleEdit with the product
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => handleDelete(product._id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
    </>
  );
};

export default VendorAllProducts;
