import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import PulseLoader from 'react-spinners/PulseLoader'; // Import PulseLoader

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Confirm = ({ shippingDetails, product, amount }) => {
  const navigate = useNavigate();

  // Calculate item price, tax, and shipping
  const itemsPrice = product.price * amount;
  const taxPrice = itemsPrice * 0.1; // Assuming 10% tax
  const shippingPrice = 10; // Example value; replace with actual shipping cost if applicable

  // Calculate total price
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  // Calculate order summary
  const orderSummary = [
    { item: "Item Price", price: itemsPrice },
    { item: "Tax", price: taxPrice },
    { item: "Shipping", price: shippingPrice },
  ];

  // Directly access userId from localStorage
  const storedUserData = JSON.parse(localStorage.getItem('user'));
  const userId = storedUserData._id; 

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to submit order
  const submitOrder = async () => {
    const orderData = {
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderItems: [
        {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0].url, // Make sure to adjust if product image is available
          quantity: amount,
        },
      ],
      shippingInfo: {
        name: shippingDetails.name,
        address: shippingDetails.streetAddress,
        city: shippingDetails.city,
        state: shippingDetails.state,
        country: "India", // Assuming country is fixed; adjust if necessary
        pinCode: shippingDetails.postalCode,
        phoneNo: 1010101010, // Adjust if phone number is part of shippingDetails
      },
      paymentInfo: {
        id: "1851828", // Replace with actual payment info
        status: "succeeded",
      },
      user: userId,
      orderStatus: "processing",
    };

    setIsSubmitting(true); // Indicate that submission is in progress

    try {
      const response = await fetch(`${BASE_URL}/api/orders/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token from localStorage if needed
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      toast.success("Order submitted successfully");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Error submitting order");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="mt-16">
      <ToastContainer />
      <h2 className="text-xl font-bold text-gray-800">Order Confirmation</h2>

      <div className="flex flex-col lg:flex-row lg:space-x-10 mt-8">
        <div className="lg:w-1/2">
          <h3 className="text-lg font-bold text-gray-800">User Information</h3>
          <p className="text-gray-800 mt-2">Name: {shippingDetails.name}</p>
          <p className="text-gray-800">Email: {shippingDetails.email}</p>

          <h3 className="text-lg font-bold text-gray-800 mt-8">
            Shipping Address
          </h3>
          <p className="text-gray-800 mt-2">{shippingDetails.streetAddress}</p>
          <p className="text-gray-800">
            {shippingDetails.city}, {shippingDetails.state}{" "}
            {shippingDetails.postalCode}
          </p>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0 bg-gray-100 p-6 rounded-md">
          <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>

          <ul className="text-gray-800 mt-4 space-y-4">
            {orderSummary.map((item, index) => (
              <li key={index} className="flex flex-wrap gap-4 text-sm">
                {item.item}{" "}
                
                <span className="ml-auto font-bold">
                  ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
              Total <span className="ml-auto">${totalPrice.toFixed(2)}</span>
            </li>
          </ul>

          {/* Confirm Button */}
          <div className="mt-6">
            <button
              className={`bg-violet-800 text-white font-semibold py-3 px-8 rounded-lg transition-transform transform hover:scale-105 hover:bg-violet-700 shadow-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={submitOrder}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <PulseLoader size={8} color="#ffffff" />
                </div>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
