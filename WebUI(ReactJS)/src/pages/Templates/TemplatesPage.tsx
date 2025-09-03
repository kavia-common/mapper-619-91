import React from 'react';

// PUBLIC_INTERFACE
const TemplatesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
        <p className="text-gray-600">
          Manage Jinja2 configuration templates.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Template management interface coming soon...</p>
      </div>
    </div>
  );
};

export default TemplatesPage;
