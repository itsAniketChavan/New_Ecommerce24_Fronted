import React from 'react';

const Notifications = () => {
  // Sample data for notifications
  const notifications = [
    { id: 1, message: 'Your order has been shipped.', date: '2024-07-25' },
    { id: 2, message: 'New feature added to your account.', date: '2024-07-20' },
    // Add more sample data as needed
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map(notification => (
          <li key={notification.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
            <p className="text-gray-800">{notification.message}</p>
            <p className="text-gray-500 text-sm">{notification.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
