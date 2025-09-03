import React from 'react';
import PageHeader from '../../components/UI/PageHeader';
import Button from '../../components/UI/Button';
import DeviceList from './components/DeviceList';
import { Plus } from 'lucide-react';

// PUBLIC_INTERFACE
const DevicesPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Devices"
        description="Manage network devices and their connections."
        actions={
          <Button icon={Plus}>
            Add Device
          </Button>
        }
      />
      <DeviceList />
    </>
  );
};

export default DevicesPage;
