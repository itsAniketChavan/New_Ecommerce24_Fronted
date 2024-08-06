import React from 'react';

const Shipping = ({ shippingDetails, setShippingDetails }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <form className="lg:mt-16">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Shipping info</h2>

          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            <div>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleChange}
                placeholder="Name"
                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleChange}
                placeholder="Email address"
                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="streetAddress"
                value={shippingDetails.streetAddress}
                onChange={handleChange}
                placeholder="Street address"
                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                placeholder="City"
                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <input
                type="text"
                name="state"
                value={shippingDetails.state}
                onChange={handleChange}
                placeholder="State"
                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
              />
            </div>
            <div>
              <input
                type="number"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="px-2 pb-2 bg-white text-gray-800 w-full text-sm border-b focus:border-blue-600 outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Shipping;
