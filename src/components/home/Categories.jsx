import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTags } from "react-icons/fa";

const Categories = () => {
  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center space-x-4">
            
          <FaTags className="text-gray-600 text-2xl" />
          <span className="text-lg font-semibold hover:text-red-400">
            Categories
          </span>
         
        </div>
        </Link>

        <nav className="hidden sm:flex space-x-4">
          <Link
            to="/"
            className="text-gray-800 hover:text-red-400 px-3 py-2 rounded-md text-lg font-medium"
          >
            Home
          </Link>
          <Link
            to="/pages"
            className="text-gray-800 hover:text-red-400 px-3 py-2 rounded-md text-lg font-medium"
          >
            Pages
          </Link>
          <Link
            to="/user"
            className="text-gray-800 hover:text-red-400 px-3 py-2 rounded-md text-lg font-medium"
          >
            Top Products
          </Link>
          <Link
            to="/AiHelp"
            className="text-gray-800 hover:text-red-400 px-3 py-2 rounded-md text-lg font-medium"
          >
            AI help
          </Link>
          <Link
            to="/contact"
            className="text-gray-800 hover:text-red-400 px-3 py-2 rounded-md text-lg font-medium"
          >
            Contact Us
          </Link>
          <Link
            to="/about"
            className="text-gray-800 hover:text-red-400 px-3 py-2 rounded-md text-lg font-medium"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Categories;
