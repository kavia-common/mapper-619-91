import React from 'react';
import { useAppSelector } from '../../store';

// PUBLIC_INTERFACE
const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your network automation projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Devices</h3>
          <p className="text-3xl font-bold text-primary-600 mt-2">12</p>
          <p className="text-sm text-gray-500 mt-1">Connected devices</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">YANG Models</h3>
          <p className="text-3xl font-bold text-success-600 mt-2">45</p>
          <p className="text-sm text-gray-500 mt-1">Available models</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Services</h3>
          <p className="text-3xl font-bold text-warning-600 mt-2">8</p>
          <p className="text-sm text-gray-500 mt-1">Active services</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900">Templates</h3>
          <p className="text-3xl font-bold text-error-600 mt-2">23</p>
          <p className="text-sm text-gray-500 mt-1">Configuration templates</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-500">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
