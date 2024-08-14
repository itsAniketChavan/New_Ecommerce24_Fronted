import React from "react"
import { FaTruck, FaIdCard, FaShieldAlt, FaHeadset } from "react-icons/fa"

const Wrapper = () => {
  const data = [
    {
      cover: <FaTruck className="text-3xl text-black" />,
      title: "Worldwide Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <FaIdCard className="text-3xl text-black" />,
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <FaShieldAlt className="text-3xl text-black" />,
      title: "Shop With Confidence",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <FaHeadset className="text-3xl text-black" />,
      title: "24/7 Support",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ]
  return (
    <section className="wrapper bg-gray-100 py-10">
      <div className="container mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((val, index) => (
          <div 
            key={index} 
            className="product p-6 bg-white shadow-md rounded-lg text-center transition-transform transform hover:scale-105"
          >
            <div className="img icon-circle bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
              {val.cover}
            </div>
            <h3 className="text-lg font-semibold">{val.title}</h3>
            <p className="text-gray-600 mt-2">{val.decs}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Wrapper
