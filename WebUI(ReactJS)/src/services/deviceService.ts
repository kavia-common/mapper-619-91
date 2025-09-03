import apiService from './api';
import { Device, DeviceCredentials, DeviceProtocol, YangModel, ApiResponse, PaginationInfo } from '../types';

interface DeviceListResponse {
  devices: Device[];
  pagination: PaginationInfo;
}

interface DeviceConnectionTestResponse {
  success: boolean;
  message: string;
  capabilities?: string[];
  yangModels?: string[];
}

class DeviceService {
  // PUBLIC_INTERFACE
  async getDevices(page = 1, limit = 20, search = ''): Promise<ApiResponse<DeviceListResponse>> {
    /**
     * Get paginated list of devices with optional search
     */
    const params = { page, limit, search };
    return await apiService.get<DeviceListResponse>('/devices', { params });
  }

  // PUBLIC_INTERFACE
  async getDevice(id: string): Promise<ApiResponse<Device>> {
    /**
     * Get specific device by ID
     */
    return await apiService.get<Device>(`/devices/${id}`);
  }

  // PUBLIC_INTERFACE
  async createDevice(deviceData: Omit<Device, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Device>> {
    /**
     * Create a new device
     */
    return await apiService.post<Device>('/devices', deviceData);
  }

  // PUBLIC_INTERFACE
  async updateDevice(id: string, deviceData: Partial<Device>): Promise<ApiResponse<Device>> {
    /**
     * Update existing device
     */
    return await apiService.put<Device>(`/devices/${id}`, deviceData);
  }

  // PUBLIC_INTERFACE
  async deleteDevice(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete a device
     */
    return await apiService.delete<void>(`/devices/${id}`);
  }

  // PUBLIC_INTERFACE
  async testConnection(id: string): Promise<ApiResponse<DeviceConnectionTestResponse>> {
    /**
     * Test connection to a device
     */
    return await apiService.post<DeviceConnectionTestResponse>(`/devices/${id}/test-connection`);
  }

  // PUBLIC_INTERFACE
  async connectDevice(id: string): Promise<ApiResponse<void>> {
    /**
     * Establish connection to a device
     */
    return await apiService.post<void>(`/devices/${id}/connect`);
  }

  // PUBLIC_INTERFACE
  async disconnectDevice(id: string): Promise<ApiResponse<void>> {
    /**
     * Disconnect from a device
     */
    return await apiService.post<void>(`/devices/${id}/disconnect`);
  }

  // PUBLIC_INTERFACE
  async getDeviceCapabilities(id: string): Promise<ApiResponse<string[]>> {
    /**
     * Get device capabilities
     */
    return await apiService.get<string[]>(`/devices/${id}/capabilities`);
  }

  // PUBLIC_INTERFACE
  async getDeviceYangModels(id: string): Promise<ApiResponse<YangModel[]>> {
    /**
     * Get YANG models supported by a device
     */
    return await apiService.get<YangModel[]>(`/devices/${id}/yang-models`);
  }

  // PUBLIC_INTERFACE
  async fetchYangModels(id: string): Promise<ApiResponse<YangModel[]>> {
    /**
     * Fetch YANG models from a device
     */
    return await apiService.post<YangModel[]>(`/devices/${id}/fetch-yang-models`);
  }

  // PUBLIC_INTERFACE
  async updateCredentials(id: string, credentials: DeviceCredentials): Promise<ApiResponse<void>> {
    /**
     * Update device credentials
     */
    return await apiService.put<void>(`/devices/${id}/credentials`, credentials);
  }

  // PUBLIC_INTERFACE
  async getDevicesByVendor(vendor: string): Promise<ApiResponse<Device[]>> {
    /**
     * Get devices by vendor
     */
    return await apiService.get<Device[]>(`/devices/vendor/${vendor}`);
  }

  // PUBLIC_INTERFACE
  async getDevicesByProtocol(protocol: DeviceProtocol): Promise<ApiResponse<Device[]>> {
    /**
     * Get devices by protocol
     */
    return await apiService.get<Device[]>(`/devices/protocol/${protocol}`);
  }

  // PUBLIC_INTERFACE
  async getConnectedDevices(): Promise<ApiResponse<Device[]>> {
    /**
     * Get list of currently connected devices
     */
    return await apiService.get<Device[]>('/devices/connected');
  }

  // PUBLIC_INTERFACE
  async getDeviceStatus(id: string): Promise<ApiResponse<{ status: string; lastChecked: Date }>> {
    /**
     * Get current status of a device
     */
    return await apiService.get<{ status: string; lastChecked: Date }>(`/devices/${id}/status`);
  }

  // PUBLIC_INTERFACE
  async bulkConnect(deviceIds: string[]): Promise<ApiResponse<{ success: string[]; failed: string[] }>> {
    /**
     * Connect to multiple devices at once
     */
    return await apiService.post<{ success: string[]; failed: string[] }>('/devices/bulk-connect', {
      deviceIds,
    });
  }

  // PUBLIC_INTERFACE
  async bulkDisconnect(deviceIds: string[]): Promise<ApiResponse<{ success: string[]; failed: string[] }>> {
    /**
     * Disconnect from multiple devices at once
     */
    return await apiService.post<{ success: string[]; failed: string[] }>('/devices/bulk-disconnect', {
      deviceIds,
    });
  }

  // PUBLIC_INTERFACE
  async exportDevices(deviceIds?: string[]): Promise<ApiResponse<Blob>> {
    /**
     * Export device configurations
     */
    const data = deviceIds ? { deviceIds } : {};
    return await apiService.post<Blob>('/devices/export', data, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async importDevices(file: File): Promise<ApiResponse<{ imported: number; failed: number; errors: string[] }>> {
    /**
     * Import device configurations from file
     */
    return await apiService.upload<{ imported: number; failed: number; errors: string[] }>('/devices/import', file);
  }
}

export default new DeviceService();
