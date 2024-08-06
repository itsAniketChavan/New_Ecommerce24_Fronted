import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorProductCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(1);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 4) {
      toast.error("You can upload up to 4 images.");
      return;
    }

    const newImages = [...images];
    const newPreviews = [...imagePreviews];

    files.forEach((file) => {
      newImages.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const imagesBase64 = await Promise.all(images.map(convertToBase64));

      const payload = {
        name,
        description,
        price,
        category,
        stock,
        images: imagesBase64
      };

      const response = await fetch(`${BASE_URL}/api/products/`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error ${response.status}: ${errorData.message}`);
      }

      await response.json();
      toast.success("Product created successfully");
      navigate("/vendor");
    } catch (error) {
      setError(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div>
              <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900">Product Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Product Name"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="block mb-2 text-lg font-medium text-gray-900">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                rows="2"
                placeholder="Product Description"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="price" className="block mb-2 text-lg font-medium text-gray-900">Price</label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  step="0.01"
                  placeholder="Product Price"
                  required
                />
              </div>
              <div>
                <label htmlFor="stock" className="block mb-2 text-lg font-medium text-gray-900">Stock</label>
                <input
                  type="number"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                  placeholder="Stock Quantity"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="category" className="block mb-2 text-lg font-medium text-gray-900">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                placeholder="Product Category"
                required
              />
            </div>
            <div className="mt-4">
              <label htmlFor="images" className="block mb-2 text-lg font-medium text-gray-900">Product Images (up to 4)</label>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
                required
              />
              <div className="mt-4 flex flex-wrap">
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md mr-2 mb-2"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default VendorProductCreate;
