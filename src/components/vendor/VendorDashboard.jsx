import React from 'react';
import { FaChartLine, FaBoxOpen, FaDollarSign, FaUsers } from 'react-icons/fa'; // Importing icons
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const sampleData = {
  totalSales: '$12,500',
  totalOrders: 320,
  pendingOrders: 45,
  totalCustomers: 150,
};

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Sales',
      data: [1500, 2000, 3000, 2500, 4000, 3500],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Sales Overview',
    },
  },
};

const VendorDashboard = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales Card */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-md flex items-center hover:bg-blue-200 transition duration-300 ease-in-out">
          <FaDollarSign className="text-4xl text-blue-500 mr-4" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Sales</p>
            <p className="text-2xl font-bold text-gray-900">{sampleData.totalSales}</p>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-green-100 p-6 rounded-lg shadow-md flex items-center hover:bg-green-200 transition duration-300 ease-in-out">
          <FaBoxOpen className="text-4xl text-green-500 mr-4" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{sampleData.totalOrders}</p>
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex items-center hover:bg-yellow-200 transition duration-300 ease-in-out">
          <FaChartLine className="text-4xl text-yellow-500 mr-4" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Pending Orders</p>
            <p className="text-2xl font-bold text-gray-900">{sampleData.pendingOrders}</p>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-red-100 p-6 rounded-lg shadow-md flex items-center hover:bg-red-200 transition duration-300 ease-in-out">
          <FaUsers className="text-4xl text-red-500 mr-4" />
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Customers</p>
            <p className="text-2xl font-bold text-gray-900">{sampleData.totalCustomers}</p>
          </div>
        </div>
      </div>

      {/* Additional sections for charts or graphs */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Sales Overview</h3>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="relative h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
