import React, { useContext, useState, useEffect, Profiler } from "react";
import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
import {
  FaUser,
  FaBox,
  FaHeart,
  FaCog,
  FaCreditCard,
  FaBell,
  FaHeadset,
} from "react-icons/fa";
import PulseLoader from "react-spinners/PulseLoader";
import MyProfile from "./MyProfile";
import MyOrders from "./MyOrders";
import Wishlist from "./Wishlist";
import AccountSettings from "./AccountSettings";
import PaymentMethods from "./PaymentMethods";
import Notifications from "./Notifications";
import CustomerSupport from "./CustomerSupport";
import { AuthContext } from "../../contexts/AuthContext";
import userLogo from "../../assets/images/user.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false); // State to track loading status
  const { logout } = useContext(AuthContext);

  // Retrieve and parse user data from local storage

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem("user"));
      const userId = storedUserData._id;
      // console.log(userId)

      try {
        const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Parse token from local storage
          },
        });
        const data = await response.json();

        if (data.success) {
          setUser(data.user);
        } else {
          alert("Failed to fetch user data");
        }
      } catch (error) {
        alert("An error occurred while fetching user data");
      }
    };

    fetchUserData();
  }, []); // Dependency array includes userId

  const handleLogout = () => {
    setLoading(true); // Set loading to true when logout is initiated

    // Simulate a timeout for logout
    setTimeout(() => {
      logout();
      toast.success("Logout successful");
      setLoading(false); // Set loading to false after logout
    }, 1000); // 1 second timeout
  };
  return (
    <section className="bg-white min-h-screen flex items-center justify-center p-6">
      <ToastContainer />
      <div className="flex flex-wrap items-center justify-center w-full max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-2xl">
        <div className="w-full lg:flex lg:w-full lg:h-screen">
          <div className="w-full lg:w-1/4 bg-gray-100 rounded-l-lg lg:rounded-l-none p-8 space-y-4 border-r border-gray-300 flex flex-col">
            <div className="flex items-center mb-4">
              <img
                className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
                src={user && user.avatar ? user.avatar.url : ""}
                alt="Profile"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user ? user.name : "Loading..."}
                </h2>
                <p className="text-gray-700">
                  {user ? user.email : "Loading..."}
                </p>
              </div>
            </div>
            <ul className="flex flex-col list-none border-b-2 border-transparent flex-grow">
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "profile"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaUser className="mr-3" /> Profile
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "orders"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaBox className="mr-3" /> My Orders
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("wishlist")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "wishlist"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaHeart className="mr-3" /> Wishlist
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("accountSettings")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "accountSettings"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaCog className="mr-3" /> Account Settings
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("paymentMethods")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "paymentMethods"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaCreditCard className="mr-3" /> Payment Methods
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "notifications"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaBell className="mr-3" /> Notifications
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setActiveTab("customerSupport")}
                  className={`py-3 px-4 text-lg font-medium flex items-center ${
                    activeTab === "customerSupport"
                      ? "bg-blue-200 text-blue-900"
                      : "text-gray-700"
                  } hover:bg-blue-200 hover:text-blue-900 rounded-md transition-colors duration-300 ease-in-out w-full text-left`}
                >
                  <FaHeadset className="mr-3" /> Customer Support
                </button>
              </li>
            </ul>
            <div className="relative">
              <button
                onClick={handleLogout}
                className="py-3 px-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-300 ease-in-out w-full"
                disabled={loading} // Disable the button while loading
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <PulseLoader color="#ffffff" size={10} />
                  </div>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>

          {/* Content Div */}
          <div className="w-full lg:w-3/4 p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 mb-6 p-4 bg-blue-100 rounded-md shadow-md">
              Your Account
            </h1>
            <div>
              {activeTab === "profile" && <MyProfile />}
              {activeTab === "orders" && <MyOrders />}
              {activeTab === "wishlist" && <Wishlist />}
              {activeTab === "accountSettings" && <AccountSettings />}
              {activeTab === "paymentMethods" && <PaymentMethods />}
              {activeTab === "notifications" && <Notifications />}
              {activeTab === "customerSupport" && <CustomerSupport />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountPage;
