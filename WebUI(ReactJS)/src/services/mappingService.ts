import apiService from './api';
import { Mapping, MappingRule, Transformation, ValidationRule, ApiResponse, PaginationInfo } from '../types';

interface MappingListResponse {
  mappings: Mapping[];
  pagination: PaginationInfo;
}

interface MappingTestResponse {
  success: boolean;
  result: any;
  errors: string[];
  warnings: string[];
}

class MappingService {
  // PUBLIC_INTERFACE
  async getMappings(page = 1, limit = 20, search = ''): Promise<ApiResponse<MappingListResponse>> {
    /**
     * Get paginated list of mappings with optional search
     */
    const params = { page, limit, search };
    return await apiService.get<MappingListResponse>('/mappings', { params });
  }

  // PUBLIC_INTERFACE
  async getMapping(id: string): Promise<ApiResponse<Mapping>> {
    /**
     * Get specific mapping by ID
     */
    return await apiService.get<Mapping>(`/mappings/${id}`);
  }

  // PUBLIC_INTERFACE
  async createMapping(mappingData: Omit<Mapping, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Mapping>> {
    /**
     * Create a new mapping
     */
    return await apiService.post<Mapping>('/mappings', mappingData);
  }

  // PUBLIC_INTERFACE
  async updateMapping(id: string, mappingData: Partial<Mapping>): Promise<ApiResponse<Mapping>> {
    /**
     * Update existing mapping
     */
    return await apiService.put<Mapping>(`/mappings/${id}`, mappingData);
  }

  // PUBLIC_INTERFACE
  async deleteMapping(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete a mapping
     */
    return await apiService.delete<void>(`/mappings/${id}`);
  }

  // PUBLIC_INTERFACE
  async testMapping(id: string, testData: any): Promise<ApiResponse<MappingTestResponse>> {
    /**
     * Test a mapping with sample data
     */
    return await apiService.post<MappingTestResponse>(`/mappings/${id}/test`, { testData });
  }

  // PUBLIC_INTERFACE
  async validateMapping(id: string): Promise<ApiResponse<{ isValid: boolean; errors: string[]; warnings: string[] }>> {
    /**
     * Validate a mapping configuration
     */
    return await apiService.post<{ isValid: boolean; errors: string[]; warnings: string[] }>(`/mappings/${id}/validate`);
  }

  // PUBLIC_INTERFACE
  async generateMapping(sourceSchemaId: string, targetSchemaId: string): Promise<ApiResponse<Mapping>> {
    /**
     * Auto-generate mapping between schemas using AI/ML
     */
    return await apiService.post<Mapping>('/mappings/generate', {
      sourceSchemaId,
      targetSchemaId,
    });
  }

  // PUBLIC_INTERFACE
  async getMappingRules(mappingId: string): Promise<ApiResponse<MappingRule[]>> {
    /**
     * Get mapping rules for a specific mapping
     */
    return await apiService.get<MappingRule[]>(`/mappings/${mappingId}/rules`);
  }

  // PUBLIC_INTERFACE
  async addMappingRule(mappingId: string, rule: Omit<MappingRule, 'id'>): Promise<ApiResponse<MappingRule>> {
    /**
     * Add a new mapping rule
     */
    return await apiService.post<MappingRule>(`/mappings/${mappingId}/rules`, rule);
  }

  // PUBLIC_INTERFACE
  async updateMappingRule(mappingId: string, ruleId: string, rule: Partial<MappingRule>): Promise<ApiResponse<MappingRule>> {
    /**
     * Update a mapping rule
     */
    return await apiService.put<MappingRule>(`/mappings/${mappingId}/rules/${ruleId}`, rule);
  }

  // PUBLIC_INTERFACE
  async deleteMappingRule(mappingId: string, ruleId: string): Promise<ApiResponse<void>> {
    /**
     * Delete a mapping rule
     */
    return await apiService.delete<void>(`/mappings/${mappingId}/rules/${ruleId}`);
  }

  // PUBLIC_INTERFACE
  async getTransformations(mappingId: string): Promise<ApiResponse<Transformation[]>> {
    /**
     * Get transformations for a specific mapping
     */
    return await apiService.get<Transformation[]>(`/mappings/${mappingId}/transformations`);
  }

  // PUBLIC_INTERFACE
  async addTransformation(mappingId: string, transformation: Omit<Transformation, 'id'>): Promise<ApiResponse<Transformation>> {
    /**
     * Add a new transformation
     */
    return await apiService.post<Transformation>(`/mappings/${mappingId}/transformations`, transformation);
  }

  // PUBLIC_INTERFACE
  async updateTransformation(mappingId: string, transformationId: string, transformation: Partial<Transformation>): Promise<ApiResponse<Transformation>> {
    /**
     * Update a transformation
     */
    return await apiService.put<Transformation>(`/mappings/${mappingId}/transformations/${transformationId}`, transformation);
  }

  // PUBLIC_INTERFACE
  async deleteTransformation(mappingId: string, transformationId: string): Promise<ApiResponse<void>> {
    /**
     * Delete a transformation
     */
    return await apiService.delete<void>(`/mappings/${mappingId}/transformations/${transformationId}`);
  }

  // PUBLIC_INTERFACE
  async exportMapping(id: string, format: 'json' | 'yaml'): Promise<ApiResponse<Blob>> {
    /**
     * Export mapping configuration
     */
    return await apiService.get<Blob>(`/mappings/${id}/export/${format}`, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async importMapping(file: File): Promise<ApiResponse<Mapping>> {
    /**
     * Import mapping configuration from file
     */
    return await apiService.upload<Mapping>('/mappings/import', file);
  }
}

export default new MappingService();
