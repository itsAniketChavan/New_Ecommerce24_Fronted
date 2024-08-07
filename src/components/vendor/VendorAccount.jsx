import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaTachometerAlt, FaBox, FaPlus, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing icons
import { FiAlignJustify } from "react-icons/fi";
import VendorDashboard from './VendorDashboard'; // Adjust the path as needed
import VendorOrders from './VendorOrders'; // Adjust the path as needed
import VendorProductCreate from './VendorProductCreate'; // Adjust the path as needed
import VendorSettings from './VendorSettings'; // Adjust the path as needed
import VendorProfile from './VendorProfile';
import VendorAllProducts from './VendorAllProducts';
import { AuthContext } from '../../contexts/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from 'react-spinners/PulseLoader'; // Import the PulseLoader component

// Import local image
import user from '../../assets/images/user.png'; // Adjust the path as needed

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VendorAccount = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { logout } = useContext(AuthContext);
  const [vendorData, setVendorData] = useState({ name: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(false); // State to manage the loading spinner

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('user'));
    const userId = storedUserData._id;
    const fetchVendorData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in header
          },
        });

        const data = await response.json();
        if (response.ok) {
          setVendorData({ name: data.user.name, email: data.user.email, avatar: data.user.avatar });
        } else {
          toast.error(data.message || 'Failed to fetch vendor data');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
        console.log(error);
      }
    };

    fetchVendorData();
  }, []);

  const handleLogout =  () => {
    setLoading(true); 
    try {
       
     
      setTimeout(() => {
         
        setLoading(false);
        toast.success('Logout Sucessful.');
        logout();  
     
        
        
      }, 1500); 
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      setLoading(false);  
    }
  };

  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-6">
      <div className="flex flex-wrap items-center justify-center w-full max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-2xl">
        <ToastContainer />
        {/* Tabs and Content Div */}
        <div className="w-full lg:flex lg:w-full lg:h-screen">
          {/* Tabs Div */}
          <div className="w-full lg:w-1/4 bg-gray-100 rounded-l-lg lg:rounded-l-none p-8 space-y-4 border-r border-gray-300 flex flex-col">
            <div className="flex items-center mb-4">
              <img
                className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
                src={vendorData.avatar.url || user}
                alt="Profile"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">{vendorData.name}</h2>
                <p className="text-gray-700">{vendorData.email}</p>
              </div>
            </div>
            <ul className="flex flex-col list-none border-b-2 border-transparent flex-grow">
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${activeTab === 'dashboard' ? 'bg-blue-200 text-blue-900' : 'text-gray-700'} hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaTachometerAlt className="mr-3" /> Dashboard
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${activeTab === 'profile' ? 'bg-blue-200 text-blue-900' : 'text-gray-700'} hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaUser className="mr-3" /> Profile
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${activeTab === 'orders' ? 'bg-blue-200 text-blue-900' : 'text-gray-700'} hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaBox className="mr-3" /> Orders
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('allproducts')}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${activeTab === 'allproducts' ? 'bg-blue-200 text-blue-900' : 'text-gray-700'} hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FiAlignJustify className="mr-3" /> All Products
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('createProduct')}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${activeTab === 'createProduct' ? 'bg-blue-200 text-blue-900' : 'text-gray-700'} hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaPlus className="mr-3" /> Create Product
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${activeTab === 'settings' ? 'bg-blue-200 text-blue-900' : 'text-gray-700'} hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaCog className="mr-3" /> Settings
                </button>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              className="mt-auto py-3 px-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 ease-in-out w-full flex items-center justify-center"
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <PulseLoader color="#ffffff" size={10} />
              ) : (
                <>
                  <FaSignOutAlt className="mr-3" /> Logout
                </>
              )}
            </button>
          </div>

          {/* Content Div */}
          <div className="w-full lg:w-3/4 p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mb-6 p-4 bg-blue-100 rounded-md shadow-md">
              Vendor Account
            </h1>
            <div>
              {activeTab === 'dashboard' && <VendorDashboard />}
              {activeTab === 'orders' && <VendorOrders />}
              {activeTab === 'createProduct' && <VendorProductCreate />}
              {activeTab === 'settings' && <VendorSettings />}
              {activeTab === 'profile' && <VendorProfile />}
              {activeTab === 'allproducts' && <VendorAllProducts />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorAccount;
