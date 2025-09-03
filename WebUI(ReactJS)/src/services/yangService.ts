import apiService from './api';
import { YangModel, YangModule, ApiResponse, PaginationInfo } from '../types';

interface YangModelListResponse {
  models: YangModel[];
  pagination: PaginationInfo;
}

interface YangModelParseResponse {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  modules: YangModule[];
}

class YangService {
  // PUBLIC_INTERFACE
  async getYangModels(page = 1, limit = 20, search = ''): Promise<ApiResponse<YangModelListResponse>> {
    /**
     * Get paginated list of YANG models with optional search
     */
    const params = { page, limit, search };
    return await apiService.get<YangModelListResponse>('/yang-models', { params });
  }

  // PUBLIC_INTERFACE
  async getYangModel(id: string): Promise<ApiResponse<YangModel>> {
    /**
     * Get specific YANG model by ID
     */
    return await apiService.get<YangModel>(`/yang-models/${id}`);
  }

  // PUBLIC_INTERFACE
  async createYangModel(modelData: Omit<YangModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<YangModel>> {
    /**
     * Create a new YANG model
     */
    return await apiService.post<YangModel>('/yang-models', modelData);
  }

  // PUBLIC_INTERFACE
  async updateYangModel(id: string, modelData: Partial<YangModel>): Promise<ApiResponse<YangModel>> {
    /**
     * Update existing YANG model
     */
    return await apiService.put<YangModel>(`/yang-models/${id}`, modelData);
  }

  // PUBLIC_INTERFACE
  async deleteYangModel(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete a YANG model
     */
    return await apiService.delete<void>(`/yang-models/${id}`);
  }

  // PUBLIC_INTERFACE
  async uploadYangModel(file: File): Promise<ApiResponse<YangModel>> {
    /**
     * Upload YANG model file
     */
    return await apiService.upload<YangModel>('/yang-models/upload', file);
  }

  // PUBLIC_INTERFACE
  async parseYangModel(content: string): Promise<ApiResponse<YangModelParseResponse>> {
    /**
     * Parse YANG model content and validate syntax
     */
    return await apiService.post<YangModelParseResponse>('/yang-models/parse', { content });
  }

  // PUBLIC_INTERFACE
  async validateYangModel(id: string): Promise<ApiResponse<YangModelParseResponse>> {
    /**
     * Validate a YANG model
     */
    return await apiService.post<YangModelParseResponse>(`/yang-models/${id}/validate`);
  }

  // PUBLIC_INTERFACE
  async getYangModelDependencies(id: string): Promise<ApiResponse<YangModel[]>> {
    /**
     * Get dependencies for a YANG model
     */
    return await apiService.get<YangModel[]>(`/yang-models/${id}/dependencies`);
  }

  // PUBLIC_INTERFACE
  async getYangModelsByNamespace(namespace: string): Promise<ApiResponse<YangModel[]>> {
    /**
     * Get YANG models by namespace
     */
    return await apiService.get<YangModel[]>(`/yang-models/namespace/${encodeURIComponent(namespace)}`);
  }

  // PUBLIC_INTERFACE
  async getYangModelsByDevice(deviceId: string): Promise<ApiResponse<YangModel[]>> {
    /**
     * Get YANG models associated with a device
     */
    return await apiService.get<YangModel[]>(`/yang-models/device/${deviceId}`);
  }

  // PUBLIC_INTERFACE
  async searchYangModels(query: string, filters?: {
    namespace?: string;
    vendor?: string;
    version?: string;
    deviceId?: string;
  }): Promise<ApiResponse<YangModel[]>> {
    /**
     * Search YANG models with advanced filters
     */
    const params = { query, ...filters };
    return await apiService.get<YangModel[]>('/yang-models/search', { params });
  }

  // PUBLIC_INTERFACE
  async getYangModelTree(id: string): Promise<ApiResponse<any>> {
    /**
     * Get YANG model tree structure for visualization
     */
    return await apiService.get<any>(`/yang-models/${id}/tree`);
  }

  // PUBLIC_INTERFACE
  async getYangModelSchema(id: string): Promise<ApiResponse<any>> {
    /**
     * Get JSON schema representation of YANG model
     */
    return await apiService.get<any>(`/yang-models/${id}/schema`);
  }

  // PUBLIC_INTERFACE
  async compareYangModels(id1: string, id2: string): Promise<ApiResponse<{
    differences: any[];
    additions: any[];
    deletions: any[];
    modifications: any[];
  }>> {
    /**
     * Compare two YANG models and return differences
     */
    return await apiService.post<{
      differences: any[];
      additions: any[];
      deletions: any[];
      modifications: any[];
    }>('/yang-models/compare', { model1: id1, model2: id2 });
  }

  // PUBLIC_INTERFACE
  async generateDocumentation(id: string, format: 'html' | 'pdf' | 'markdown'): Promise<ApiResponse<Blob>> {
    /**
     * Generate documentation for a YANG model
     */
    return await apiService.get<Blob>(`/yang-models/${id}/documentation/${format}`, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async exportYangModel(id: string, format: 'yang' | 'json' | 'xml'): Promise<ApiResponse<Blob>> {
    /**
     * Export YANG model in specified format
     */
    return await apiService.get<Blob>(`/yang-models/${id}/export/${format}`, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async importYangModels(files: File[]): Promise<ApiResponse<{
    imported: YangModel[];
    failed: { filename: string; error: string }[];
  }>> {
    /**
     * Import multiple YANG model files
     */
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    return await apiService.post<{
      imported: YangModel[];
      failed: { filename: string; error: string }[];
    }>('/yang-models/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // PUBLIC_INTERFACE
  async getYangModelHistory(id: string): Promise<ApiResponse<{
    versions: Array<{
      version: string;
      revision: string;
      changes: string[];
      timestamp: Date;
    }>;
  }>> {
    /**
     * Get version history of a YANG model
     */
    return await apiService.get<{
      versions: Array<{
        version: string;
        revision: string;
        changes: string[];
        timestamp: Date;
      }>;
    }>(`/yang-models/${id}/history`);
  }
}

export default new YangService();
