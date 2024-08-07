import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h2 className="text-2xl text-red-500 font-bold mb-4">Bonik</h2>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
              libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat
              et lectus vel ut sollicitudin elit at amet.
            </p>
            <div className="flex space-x-4">
              <button className="bg-black hover:bg-gray-800 text-white font-bold  py-2 px-4 rounded">
                <img
                  src="google-play-icon.png"
                  // alt="Google Play"
                  className="inline w-5 h-5 mr-2"
                />
                Google Play
              </button>
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                <img
                  src="app-store-icon.png"
                  // alt="App Store"
                  className="inline w-5 h-5 mr-2"
                />
                App Store
              </button>
            </div>
          </div>

          {/* About Us Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Stores
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Cares
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Customer Care</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Corporate & Bulk Purchasing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>AT-SALWADI POST-POHALE PANHALA KOLHAPUR</li>
              <li>
                Email:{" "}
                <a href="support@ui-lib.com" className="hover:underline">
                  support@ui-lib.com
                </a>
              </li>
              <li>Phone: +88012 3456 7894</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
