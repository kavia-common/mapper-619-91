import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchDevices } from '../../../store/slices/deviceSlice';
import { ConnectionStatus, Device } from '../../../types';
import Table from '../../../components/UI/Table';
import Badge from '../../../components/UI/Badge';
import Button from '../../../components/UI/Button';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import { Edit, Trash2, Play, StopCircle } from 'lucide-react';

// PUBLIC_INTERFACE
const DeviceList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { devices, isLoading, error } = useAppSelector((state) => state.devices);

  useEffect(() => {
    dispatch(fetchDevices());
  }, [dispatch]);

  const getStatusBadgeColor = (status: ConnectionStatus) => {
    switch (status) {
      case ConnectionStatus.CONNECTED:
        return 'success';
      case ConnectionStatus.DISCONNECTED:
        return 'gray';
      case ConnectionStatus.CONNECTING:
        return 'warning';
      case ConnectionStatus.ERROR:
        return 'error';
      default:
        return 'gray';
    }
  };

  if (isLoading && devices.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert-error p-4">
        <p>{error}</p>
      </div>
    );
  }

  const tableHeaders = [
    'Name',
    'IP Address',
    'Vendor',
    'Protocol',
    'Status',
    'Actions',
  ];

  return (
    <div className="card">
      <Table headers={tableHeaders} isLoading={isLoading}>
        {devices.map((device: Device) => (
          <tr key={device.id} className="table-row">
            <td className="table-cell font-medium">{device.name}</td>
            <td className="table-cell">{device.ipAddress}</td>
            <td className="table-cell">{device.vendor}</td>
            <td className="table-cell">{device.protocol.toUpperCase()}</td>
            <td className="table-cell">
              <Badge color={getStatusBadgeColor(device.connectionStatus)}>
                {device.connectionStatus}
              </Badge>
            </td>
            <td className="table-cell">
              <div className="flex items-center space-x-2">
                 <Button size="sm" variant="ghost" icon={device.connectionStatus === ConnectionStatus.CONNECTED ? StopCircle : Play}>
                   {device.connectionStatus === ConnectionStatus.CONNECTED ? 'Disconnect' : 'Connect'}
                 </Button>
                <Button size="sm" variant="ghost" icon={Edit}>Edit</Button>
                <Button size="sm" variant="ghost" icon={Trash2}>Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
       {/* TODO: Add pagination controls here */}
    </div>
  );
};

export default DeviceList;
