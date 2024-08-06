import React, { useState } from 'react';

const AccountSettings = () => {
  // Sample data for account settings
  const [settings, setSettings] = useState([
    { id: 1, label: 'Notification Preferences', value: 'Enabled' },
    { id: 2, label: 'Language', value: 'English' },
    { id: 3, label: 'Time Zone', value: 'GMT-5' },
    { id: 4, label: 'Two-Factor Authentication', value: 'Disabled' },
    // Add more sample data as needed
  ]);

  // Placeholder function for button click
  const handleButtonClick = (settingId) => {
    console.log(`Button clicked for setting ID: ${settingId}`);
    // Implement the logic for handling button clicks here
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
      <ul className="space-y-4">
        {settings.map(setting => (
          <li
            key={setting.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <p className="text-gray-800 font-medium hover:text-blue-500 transition-colors duration-300">{setting.label}</p>
                <p className="text-gray-600">{setting.value}</p>
              </div>
              <button
                onClick={() => handleButtonClick(setting.id)}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountSettings;
