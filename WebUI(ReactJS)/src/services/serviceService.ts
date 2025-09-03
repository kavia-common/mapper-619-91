import apiService from './api';
import { Service, ServiceConfiguration, ServiceMetrics, ApiResponse, PaginationInfo } from '../types';

interface ServiceListResponse {
  services: Service[];
  pagination: PaginationInfo;
}

interface ServiceDeploymentResponse {
  deploymentId: string;
  status: string;
  message: string;
}

class ServiceProvisioningService {
  // PUBLIC_INTERFACE
  async getServices(page = 1, limit = 20, search = ''): Promise<ApiResponse<ServiceListResponse>> {
    /**
     * Get paginated list of services with optional search
     */
    const params = { page, limit, search };
    return await apiService.get<ServiceListResponse>('/services', { params });
  }

  // PUBLIC_INTERFACE
  async getService(id: string): Promise<ApiResponse<Service>> {
    /**
     * Get specific service by ID
     */
    return await apiService.get<Service>(`/services/${id}`);
  }

  // PUBLIC_INTERFACE
  async createService(serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Service>> {
    /**
     * Create a new service
     */
    return await apiService.post<Service>('/services', serviceData);
  }

  // PUBLIC_INTERFACE
  async updateService(id: string, serviceData: Partial<Service>): Promise<ApiResponse<Service>> {
    /**
     * Update existing service
     */
    return await apiService.put<Service>(`/services/${id}`, serviceData);
  }

  // PUBLIC_INTERFACE
  async deleteService(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete a service
     */
    return await apiService.delete<void>(`/services/${id}`);
  }

  // PUBLIC_INTERFACE
  async deployService(id: string): Promise<ApiResponse<ServiceDeploymentResponse>> {
    /**
     * Deploy a service to target devices
     */
    return await apiService.post<ServiceDeploymentResponse>(`/services/${id}/deploy`);
  }

  // PUBLIC_INTERFACE
  async undeployService(id: string): Promise<ApiResponse<ServiceDeploymentResponse>> {
    /**
     * Undeploy a service from target devices
     */
    return await apiService.post<ServiceDeploymentResponse>(`/services/${id}/undeploy`);
  }

  // PUBLIC_INTERFACE
  async restartService(id: string): Promise<ApiResponse<ServiceDeploymentResponse>> {
    /**
     * Restart a deployed service
     */
    return await apiService.post<ServiceDeploymentResponse>(`/services/${id}/restart`);
  }

  // PUBLIC_INTERFACE
  async getServiceStatus(id: string): Promise<ApiResponse<{
    deploymentStatus: string;
    healthStatus: string;
    lastChecked: Date;
    details: any;
  }>> {
    /**
     * Get current status of a service
     */
    return await apiService.get<{
      deploymentStatus: string;
      healthStatus: string;
      lastChecked: Date;
      details: any;
    }>(`/services/${id}/status`);
  }

  // PUBLIC_INTERFACE
  async getServiceMetrics(id: string, timeRange?: string): Promise<ApiResponse<ServiceMetrics>> {
    /**
     * Get metrics for a service
     */
    const params = timeRange ? { timeRange } : {};
    return await apiService.get<ServiceMetrics>(`/services/${id}/metrics`, { params });
  }

  // PUBLIC_INTERFACE
  async getServiceLogs(id: string, limit = 100, level?: string): Promise<ApiResponse<Array<{
    timestamp: Date;
    level: string;
    message: string;
    metadata?: any;
  }>>> {
    /**
     * Get logs for a service
     */
    const params = { limit, level };
    return await apiService.get<Array<{
      timestamp: Date;
      level: string;
      message: string;
      metadata?: any;
    }>>(`/services/${id}/logs`, { params });
  }

  // PUBLIC_INTERFACE
  async validateServiceConfiguration(configuration: ServiceConfiguration): Promise<ApiResponse<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }>> {
    /**
     * Validate service configuration before deployment
     */
    return await apiService.post<{
      isValid: boolean;
      errors: string[];
      warnings: string[];
    }>('/services/validate-configuration', configuration);
  }

  // PUBLIC_INTERFACE
  async previewServiceDeployment(id: string): Promise<ApiResponse<{
    commands: Array<{
      device: string;
      command: string;
      template: string;
    }>;
    estimatedDuration: number;
  }>> {
    /**
     * Preview what commands will be executed during service deployment
     */
    return await apiService.post<{
      commands: Array<{
        device: string;
        command: string;
        template: string;
      }>;
      estimatedDuration: number;
    }>(`/services/${id}/preview-deployment`);
  }

  // PUBLIC_INTERFACE
  async getDeploymentHistory(id: string): Promise<ApiResponse<Array<{
    deploymentId: string;
    status: string;
    startedAt: Date;
    completedAt?: Date;
    duration?: number;
    error?: string;
  }>>> {
    /**
     * Get deployment history for a service
     */
    return await apiService.get<Array<{
      deploymentId: string;
      status: string;
      startedAt: Date;
      completedAt?: Date;
      duration?: number;
      error?: string;
    }>>(`/services/${id}/deployments`);
  }

  // PUBLIC_INTERFACE
  async rollbackService(id: string, deploymentId: string): Promise<ApiResponse<ServiceDeploymentResponse>> {
    /**
     * Rollback service to a previous deployment
     */
    return await apiService.post<ServiceDeploymentResponse>(`/services/${id}/rollback`, { deploymentId });
  }

  // PUBLIC_INTERFACE
  async cloneService(id: string, name: string): Promise<ApiResponse<Service>> {
    /**
     * Clone an existing service
     */
    return await apiService.post<Service>(`/services/${id}/clone`, { name });
  }

  // PUBLIC_INTERFACE
  async exportService(id: string): Promise<ApiResponse<Blob>> {
    /**
     * Export service configuration
     */
    return await apiService.get<Blob>(`/services/${id}/export`, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async importService(file: File): Promise<ApiResponse<Service>> {
    /**
     * Import service configuration from file
     */
    return await apiService.upload<Service>('/services/import', file);
  }
}

export default new ServiceProvisioningService();
