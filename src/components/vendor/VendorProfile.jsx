import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from 'react-spinners/PulseLoader'; // Import the PulseLoader
import Loader from '../../pages/Loader'; // Import the PageLoader

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorProfile = () => {
  const [vendorData, setVendorData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarPath: ''
  });

  const [isLoading, setIsLoading] = useState(false); // State for loading vendor data
  const [isUpdating, setIsUpdating] = useState(false); // State for loading update

  useEffect(() => {
    const fetchVendorData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('user'));
      const userId = storedUserData._id; 
      setIsLoading(true); // Set loading state to true
      try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const { name, email, phone, avatar } = data.user;
          setVendorData({ name, email, phone, avatar });
        } else {
          toast.error(data.message || 'Failed to fetch vendor data');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    fetchVendorData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setVendorData({
        ...vendorData,
        avatarPath: reader.result
        
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true); // Set updating state to true
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const userId = storedUserData._id; 
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(vendorData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.log(error);
    } finally {
      setIsUpdating(false); // Reset updating state
    }
  };

  return (
    <> 
    {isLoading && <Loader />} 
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
       {/* Show page loader when loading vendor data */}
      <h2 className="text-2xl font-bold mb-4">Vendor Profile Information</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={vendorData.name}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="Jane Smith"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={vendorData.email}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="jane.smith@vendor.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-lg font-medium text-gray-900">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={vendorData.phone}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="987-654-3210"
            required
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block mb-2 text-lg font-medium text-gray-900">Profile Picture</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
          
        </div>

        <button
          type="submit"
          className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <PulseLoader color="#ffffff" size={10} />
          ) : (
            'Update Profile'
          )}
        </button>
      </form>
    </div>
    </>
  );
};

export default VendorProfile;
