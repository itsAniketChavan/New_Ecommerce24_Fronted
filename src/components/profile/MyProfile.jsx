import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from 'react-spinners/PulseLoader'; // Import PulseLoader
import Loader from '../../pages/Loader'; // Import your custom Loader

const BASE_URL = import.meta.env.VITE_BASE_URL;

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarPath: ''
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('user'));
      const userId = storedUserData._id;
      try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setUserData(data.user);
        } else {
          toast.error('Failed to load user data.');
        }
      } catch (error) {
        toast.error('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData({
        ...userData,
        avatarPath: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true); // Set updating to true when profile update starts
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const userId = storedUserData._id;
     
    try {
      const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Profile updated!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile.');
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  if (loading) {
    return <Loader />; // Show Loader while fetching data
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name || ''}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email || ''}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block mb-2 text-lg font-medium text-gray-900">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userData.phone || ''}
            onChange={handleInputChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
            placeholder="123-456-7890"
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
            onChange={handleAvatarChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center transition-colors duration-300 ease-in-out"
        >
          {updating ? (
            <PulseLoader color="#ffffff" size={10} /> // Show PulseLoader while updating
          ) : (
            'Update Profile'
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;
