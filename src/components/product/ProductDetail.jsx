import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../pages/Loader'; // Adjust the path as needed
import ErrorPage from '../../pages/ErrorPage'; // Adjust the path as needed
import { BsCurrencyRupee } from "react-icons/bs";


const BASE_URL = import.meta.env.VITE_BASE_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImage] = useState("");
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product details from API
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);

          // Initialize the first image as active
          if (data.product.images && data.product.images.length > 0) {
            setActiveImage(data.product.images[0].url);
          }
        } else {
          throw new Error('Failed to fetch product details');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleBuy = () => {
    navigate('/checkout', { state: { product, amount } });
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <div className='container mx-auto p-8'>
      <div className='flex flex-col lg:flex-row gap-16 lg:gap-24'>
        {/* Image Gallery */}
        <div className='flex flex-col gap-6 lg:w-1/2'>
          <img
            src={activeImg}
            alt="Active Product"
            className='w-full h-96 object-cover rounded-lg border border-gray-300 shadow-xl transition-transform transform hover:scale-105'
          />
          <div className='flex flex-row gap-2'>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className='w-24 h-24 rounded-md cursor-pointer border border-gray-300 shadow-sm transition-transform transform hover:scale-105 hover:border-violet-500'
                onClick={() => setActiveImage(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='flex flex-col gap-4 lg:w-1/2'>
          <div className='p-6 bg-white rounded-lg shadow-xl'>
            <div className='mb-4'>
              <span className='text-violet-600 font-semibold text-lg'>{product.category}</span>
              <h1 className='text-4xl font-bold text-gray-900 mt-2'>{product.name}</h1>
            </div>
            <p className='text-gray-700 text-lg mb-4'>
              {product.description}
            </p>
            <h6 className="text-3xl font-semibold text-gray-800 mb-4 flex items-center">
  <BsCurrencyRupee className="mr-1" />
  {product.price.toFixed(2)}
</h6>

            <div className='flex flex-row items-center gap-8'>
              <div className='flex flex-row items-center gap-2'>
                <button
                  className='bg-gray-200 py-3 px-6 rounded-lg text-violet-800 text-xl transition-colors duration-300 hover:bg-violet-200 hover:text-violet-600 shadow-sm'
                  onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
                  disabled={amount === 1}
                >
                  -
                </button>
                <span className='py-2 px-4 rounded-lg text-2xl'>{amount}</span>
                <button
                  className='bg-gray-200 py-3 px-6 rounded-lg text-violet-800 text-xl transition-colors duration-300 hover:bg-violet-200 hover:text-violet-600 shadow-sm'
                  onClick={() => setAmount((prev) => Math.min(prev + 1, product.stock))}
                  disabled={amount === product.stock}
                >
                  +
                </button>
              </div>

              {product.stock > 0 ? (
                <button
                  className='bg-violet-800 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 hover:bg-violet-700 shadow-md'
                  onClick={handleBuy}
                >
                  Buy
                </button>
              ) : (
                <span className='bg-gray-300 text-red-400 py-3 px-8 rounded-lg font-semibold'>
                  Currently Unavailable
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
