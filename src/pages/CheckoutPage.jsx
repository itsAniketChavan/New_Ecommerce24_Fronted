import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Confirm from "./Confirm";

const Checkout = () => {
  const location = useLocation();
  const { product, amount } = location.state || { product: null, amount: 1 };

  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Shipping shippingDetails={shippingDetails} setShippingDetails={setShippingDetails} />;
      case 2:
        return <Payment />;
      case 3:
        return <Confirm shippingDetails={shippingDetails} product={product} amount={amount} />;
      default:
        return <Shipping shippingDetails={shippingDetails} setShippingDetails={setShippingDetails} />;
    }
  };

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handleBack = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  return (
    <div className="py-0 flex items-center justify-center bg-gray-100">
      <div className="font-[sans-serif] bg-white px-8 lg:max-w-7xl max-w-xl mx-auto mt-20 shadow-2xl rounded-lg">
        <div className="grid lg:grid-cols-3 gap-10 p-10">
          <div className="lg:col-span-2 max-lg:order-1">
            <div className="flex items-start mb-8">
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] ${
                      step >= 1 ? "bg-gray-800" : "bg-gray-200"
                    } p-1.5 flex items-center justify-center rounded-full shadow-lg`}
                  >
                    <span className="text-sm text-white font-bold">1</span>
                  </div>
                  <div
                    className={`w-full h-[3px] mx-4 rounded-lg ${
                      step >= 2 ? "bg-gray-800" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
                <div className="mt-2 mr-4">
                  <h6
                    className={`text-sm font-bold ${
                      step >= 1 ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
                    Shipping
                  </h6>
                </div>
              </div>

              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] ${
                      step >= 2 ? "bg-gray-800" : "bg-gray-200"
                    } p-1.5 flex items-center justify-center rounded-full shadow-lg`}
                  >
                    <span className="text-sm text-white font-bold">2</span>
                  </div>
                  <div
                    className={`w-full h-[3px] mx-4 rounded-lg ${
                      step >= 3 ? "bg-gray-800" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
                <div className="mt-2 mr-4">
                  <h6
                    className={`text-sm font-bold ${
                      step >= 2 ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
                    Billing
                  </h6>
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 shrink-0 mx-[-1px] ${
                      step === 3 ? "bg-gray-800" : "bg-gray-200"
                    } p-1.5 flex items-center justify-center rounded-full shadow-lg`}
                  >
                    <span className="text-sm text-white font-bold">3</span>
                  </div>
                </div>
                <div className="mt-2 mr-4">
                  <h6
                    className={`text-sm font-bold ${
                      step === 3 ? "text-gray-800" : "text-gray-300"
                    }`}
                  >
                    Confirmation
                  </h6>
                </div>
              </div>
            </div>

            {renderStep()}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              {step < 3 && (
                <button
                  className="bg-violet-800 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                  onClick={handleNext}
                >
                  Next
                </button>
              )}
            </div>
          </div>
 
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;
