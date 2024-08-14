import React from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { MdFlag, MdLanguage } from 'react-icons/md';
import { BsCurrencyRupee } from "react-icons/bs";

const Head = () => {
  return (
    <section className="bg-blue-900 text-white p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2 cursor-pointer hover:underline">
            <FaPhoneAlt className="text-xl" />
            <span>+91 7219390817</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer hover:underline">
            <FaEnvelope className="text-xl" />
            <span>support@ui-lib.com</span>
          </div>
        </div>
        <div className="flex space-x-6">
          <span className="cursor-pointer hover:underline">Theme FAQ's</span>
          <span className="cursor-pointer hover:underline">Need Help?</span>
          <MdFlag className="text-xl cursor-pointer hover:text-gray-300" />
          <span className="cursor-pointer hover:underline">EN</span>
          <MdLanguage className="text-xl cursor-pointer hover:text-gray-300" />
          <BsCurrencyRupee className="text-xl cursor-pointer hover:text-gray-300" />
          <span className="cursor-pointer hover:underline">INR</span>
        </div>
      </div>
    </section>
  );
};

export default Head;
