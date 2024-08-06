import React from "react";
import { FaTshirt, FaTv, FaHome, FaPuzzlePiece, FaFootballBall, FaBook, FaHeartbeat, FaCoffee } from "react-icons/fa";
import ProductList from "../product/ProductList";


const categories = [
  { cateName: "Fashion", icon: <FaTshirt /> },
  { cateName: "Electronics", icon: <FaTv /> },
  { cateName: "Home & Garden", icon: <FaHome /> },
  { cateName: "Toys", icon: <FaPuzzlePiece /> },
  { cateName: "Sports", icon: <FaFootballBall /> },
  { cateName: "Books", icon: <FaBook /> },
  { cateName: "Health & Beauty", icon: <FaHeartbeat /> },
  { cateName: "Coffee", icon: <FaCoffee /> },
];

const CategoriesList = () => {
  return (
    <div className="flex px-10 py-4 space-x-6">
      {/* Categories Section */}
      <div className="flex-none w-1/4 min-w-[250px] px-4 py-4 relative flex flex-col text-gray-700 bg-white shadow-2xl rounded-xl bg-clip-border">
        <nav className="flex flex-col gap-3 p-4 font-sans text-base font-normal text-blue-gray-700">
          {categories.map((category, index) => (
            <div
              key={index}
              role="button"
              className="flex items-center px-4 py-3 transition-all rounded-lg outline-none text-start hover:bg-red-100 focus:bg-red-100 active:bg-red-100"
            >
              <div className="text-2xl mr-4">{category.icon}</div>
              {category.cateName}
            </div>
          ))}
        </nav>
      </div>
      
      {/* Products Section */}
      <div className="flex-grow px-4 py-4">
        <ProductList />
      </div>
    </div>
  );
};

export default CategoriesList;
