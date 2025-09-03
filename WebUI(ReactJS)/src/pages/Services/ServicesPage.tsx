import React from 'react';

// PUBLIC_INTERFACE
const ServicesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600">
          Provision and manage network services.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Service provisioning interface coming soon...</p>
      </div>
    </div>
  );
};

export default ServicesPage;
