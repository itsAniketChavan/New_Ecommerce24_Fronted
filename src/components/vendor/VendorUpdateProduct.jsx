import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorUpdateProduct = ({ product, onBack }) => {
  const [productDetails, setProductDetails] = useState(product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setProductDetails(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    try {
      // Exclude images from updatedProductDetails
      const { images, ...updatedProductDetails } = productDetails;

      const response = await fetch(`${BASE_URL}/api/products/${productDetails._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedProductDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error ${response.status}: ${errorData.message}`);
      }

      // Show success message
      toast.success('Product updated successfully');

    //   // Clear form fields (optional)
    //   setProductDetails({
    //     name: '',
    //     price: '',
    //     category: '',
    //     stock: 1,
    //     images: [] // Reset images field
    //   });

      // Wait for the toast to be displayed before navigating back
      setTimeout(() => {
        onBack();
      }, 2000); // Delay of 2 seconds to ensure the toast is visible
    } catch (error) {
      // Show error message
      toast.error(error.message || 'An error occurred while updating the product');
      setError(error.message || 'An error occurred while updating the product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            step="0.01"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block text-gray-700">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productDetails.stock}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={loading}>
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default VendorUpdateProduct;
