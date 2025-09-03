import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Link
            to="/dashboard"
            className="btn-primary"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
