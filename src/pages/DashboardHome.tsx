import React from 'react';

const DashboardHome: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Users
          </h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,234</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Revenue</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">$12,345</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Orders</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">567</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900/50">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Products
          </h3>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">89</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;