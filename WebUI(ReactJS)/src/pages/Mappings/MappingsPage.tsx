import React from 'react';

// PUBLIC_INTERFACE
const MappingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mappings</h1>
        <p className="text-gray-600">
          Configure mappings between YANG models and API schemas.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Mapping configuration interface coming soon...</p>
      </div>
    </div>
  );
};

export default MappingsPage;
