import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Router, 
  FileCode, 
  Share2, 
  Layers, 
  FileText, 
  Settings 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Devices', href: '/devices', icon: Router },
  { name: 'YANG Models', href: '/yang-models', icon: FileCode },
  { name: 'API Schemas', href: '/api-schemas', icon: Share2 },
  { name: 'Mappings', href: '/mappings', icon: Layers },
  { name: 'Templates', href: '/templates', icon: FileText },
  { name: 'Services', href: '/services', icon: Settings },
];

// PUBLIC_INTERFACE
const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="mt-8 px-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
