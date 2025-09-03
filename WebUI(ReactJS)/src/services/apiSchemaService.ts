import apiService from './api';
import { ApiSchema, ApiPath, ApiModel, ApiResponse, PaginationInfo } from '../types';

interface ApiSchemaListResponse {
  schemas: ApiSchema[];
  pagination: PaginationInfo;
}

interface ApiSchemaValidationResponse {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

class ApiSchemaService {
  // PUBLIC_INTERFACE
  async getApiSchemas(page = 1, limit = 20, search = ''): Promise<ApiResponse<ApiSchemaListResponse>> {
    /**
     * Get paginated list of API schemas with optional search
     */
    const params = { page, limit, search };
    return await apiService.get<ApiSchemaListResponse>('/api-schemas', { params });
  }

  // PUBLIC_INTERFACE
  async getApiSchema(id: string): Promise<ApiResponse<ApiSchema>> {
    /**
     * Get specific API schema by ID
     */
    return await apiService.get<ApiSchema>(`/api-schemas/${id}`);
  }

  // PUBLIC_INTERFACE
  async createApiSchema(schemaData: Omit<ApiSchema, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<ApiSchema>> {
    /**
     * Create a new API schema
     */
    return await apiService.post<ApiSchema>('/api-schemas', schemaData);
  }

  // PUBLIC_INTERFACE
  async updateApiSchema(id: string, schemaData: Partial<ApiSchema>): Promise<ApiResponse<ApiSchema>> {
    /**
     * Update existing API schema
     */
    return await apiService.put<ApiSchema>(`/api-schemas/${id}`, schemaData);
  }

  // PUBLIC_INTERFACE
  async deleteApiSchema(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete an API schema
     */
    return await apiService.delete<void>(`/api-schemas/${id}`);
  }

  // PUBLIC_INTERFACE
  async validateApiSchema(id: string): Promise<ApiResponse<ApiSchemaValidationResponse>> {
    /**
     * Validate an API schema
     */
    return await apiService.post<ApiSchemaValidationResponse>(`/api-schemas/${id}/validate`);
  }

  // PUBLIC_INTERFACE
  async publishApiSchema(id: string): Promise<ApiResponse<ApiSchema>> {
    /**
     * Publish an API schema
     */
    return await apiService.post<ApiSchema>(`/api-schemas/${id}/publish`);
  }

  // PUBLIC_INTERFACE
  async unpublishApiSchema(id: string): Promise<ApiResponse<ApiSchema>> {
    /**
     * Unpublish an API schema
     */
    return await apiService.post<ApiSchema>(`/api-schemas/${id}/unpublish`);
  }

  // PUBLIC_INTERFACE
  async generateOpenApiSpec(id: string): Promise<ApiResponse<any>> {
    /**
     * Generate OpenAPI specification for the schema
     */
    return await apiService.get<any>(`/api-schemas/${id}/openapi`);
  }

  // PUBLIC_INTERFACE
  async exportApiSchema(id: string, format: 'json' | 'yaml' | 'openapi'): Promise<ApiResponse<Blob>> {
    /**
     * Export API schema in specified format
     */
    return await apiService.get<Blob>(`/api-schemas/${id}/export/${format}`, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async importApiSchema(file: File): Promise<ApiResponse<ApiSchema>> {
    /**
     * Import API schema from file
     */
    return await apiService.upload<ApiSchema>('/api-schemas/import', file);
  }

  // PUBLIC_INTERFACE
  async cloneApiSchema(id: string, name: string): Promise<ApiResponse<ApiSchema>> {
    /**
     * Clone an existing API schema
     */
    return await apiService.post<ApiSchema>(`/api-schemas/${id}/clone`, { name });
  }

  // PUBLIC_INTERFACE
  async getApiSchemaVersions(id: string): Promise<ApiResponse<Array<{
    version: string;
    description: string;
    isPublished: boolean;
    createdAt: Date;
  }>>> {
    /**
     * Get version history of an API schema
     */
    return await apiService.get<Array<{
      version: string;
      description: string;
      isPublished: boolean;
      createdAt: Date;
    }>>(`/api-schemas/${id}/versions`);
  }
}

export default new ApiSchemaService();
