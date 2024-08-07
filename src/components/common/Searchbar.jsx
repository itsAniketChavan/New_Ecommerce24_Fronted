import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";

const Searchbar = ({ CartItem }) => {
  const { userData, isAuthenticated } = useContext(AuthContext);
  const userRole = localStorage.getItem('role');
  const navigate = useNavigate();

  const profileRedirect = () => {
    if (userRole === 'user') {
      navigate('/profile');
    } else if (userRole === 'vendor') {
      navigate('/vendor');
    }
  };

  return (
    <section className="search bg-white text-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo w-1/4 flex items-center justify-center">
          <MdShoppingCart className="text-gray-800 text-3xl" />
        </div>

        <div className="search-box flex items-center space-x-2 border border-gray-300 rounded-full p-2 w-full h-12 bg-gray-100 text-gray-900">
          <FaSearch className="text-gray-600" />
          <input
            type="text"
            placeholder="Search and hit enter..."
            className="w-full p-2 outline-none bg-gray-100 text-gray-900"
          />
          <span className="text-gray-600">All Categories</span>
        </div>

        <div className="icon flex items-center space-x-4 w-1/4 px-20">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-1200 text-xl">Hello</span>
              <div
                onClick={profileRedirect}
                className="p-2 rounded-full bg-blue-700 text-white cursor-pointer hover:bg-blue-700 transition duration-300"
              >
                <FaUser className="text-1xl" />
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Searchbar;
