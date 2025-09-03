import apiService from './api';
import { Template, TemplateVariable, TemplateTestCase, ApiResponse, PaginationInfo } from '../types';

interface TemplateListResponse {
  templates: Template[];
  pagination: PaginationInfo;
}

interface TemplateRenderResponse {
  success: boolean;
  output: string;
  errors: string[];
  warnings: string[];
}

class TemplateService {
  // PUBLIC_INTERFACE
  async getTemplates(page = 1, limit = 20, search = ''): Promise<ApiResponse<TemplateListResponse>> {
    /**
     * Get paginated list of templates with optional search
     */
    const params = { page, limit, search };
    return await apiService.get<TemplateListResponse>('/templates', { params });
  }

  // PUBLIC_INTERFACE
  async getTemplate(id: string): Promise<ApiResponse<Template>> {
    /**
     * Get specific template by ID
     */
    return await apiService.get<Template>(`/templates/${id}`);
  }

  // PUBLIC_INTERFACE
  async createTemplate(templateData: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Template>> {
    /**
     * Create a new template
     */
    return await apiService.post<Template>('/templates', templateData);
  }

  // PUBLIC_INTERFACE
  async updateTemplate(id: string, templateData: Partial<Template>): Promise<ApiResponse<Template>> {
    /**
     * Update existing template
     */
    return await apiService.put<Template>(`/templates/${id}`, templateData);
  }

  // PUBLIC_INTERFACE
  async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete a template
     */
    return await apiService.delete<void>(`/templates/${id}`);
  }

  // PUBLIC_INTERFACE
  async renderTemplate(id: string, variables: Record<string, any>): Promise<ApiResponse<TemplateRenderResponse>> {
    /**
     * Render template with provided variables
     */
    return await apiService.post<TemplateRenderResponse>(`/templates/${id}/render`, { variables });
  }

  // PUBLIC_INTERFACE
  async validateTemplate(id: string): Promise<ApiResponse<{ isValid: boolean; errors: string[]; warnings: string[] }>> {
    /**
     * Validate template syntax
     */
    return await apiService.post<{ isValid: boolean; errors: string[]; warnings: string[] }>(`/templates/${id}/validate`);
  }

  // PUBLIC_INTERFACE
  async testTemplate(id: string, testCaseId: string): Promise<ApiResponse<TemplateRenderResponse>> {
    /**
     * Test template with a specific test case
     */
    return await apiService.post<TemplateRenderResponse>(`/templates/${id}/test/${testCaseId}`);
  }

  // PUBLIC_INTERFACE
  async runAllTests(id: string): Promise<ApiResponse<Array<{ testCaseId: string; result: TemplateRenderResponse }>>> {
    /**
     * Run all test cases for a template
     */
    return await apiService.post<Array<{ testCaseId: string; result: TemplateRenderResponse }>>(`/templates/${id}/test-all`);
  }

  // PUBLIC_INTERFACE
  async getTemplatesByVendor(vendor: string): Promise<ApiResponse<Template[]>> {
    /**
     * Get templates by vendor
     */
    return await apiService.get<Template[]>(`/templates/vendor/${vendor}`);
  }

  // PUBLIC_INTERFACE
  async getTemplatesByDevice(deviceType: string): Promise<ApiResponse<Template[]>> {
    /**
     * Get templates by device type
     */
    return await apiService.get<Template[]>(`/templates/device/${deviceType}`);
  }

  // PUBLIC_INTERFACE
  async cloneTemplate(id: string, name: string): Promise<ApiResponse<Template>> {
    /**
     * Clone an existing template
     */
    return await apiService.post<Template>(`/templates/${id}/clone`, { name });
  }

  // PUBLIC_INTERFACE
  async exportTemplate(id: string): Promise<ApiResponse<Blob>> {
    /**
     * Export template as file
     */
    return await apiService.get<Blob>(`/templates/${id}/export`, {
      responseType: 'blob',
    });
  }

  // PUBLIC_INTERFACE
  async importTemplate(file: File): Promise<ApiResponse<Template>> {
    /**
     * Import template from file
     */
    return await apiService.upload<Template>('/templates/import', file);
  }

  // PUBLIC_INTERFACE
  async getTemplateVariables(id: string): Promise<ApiResponse<TemplateVariable[]>> {
    /**
     * Get variables defined in a template
     */
    return await apiService.get<TemplateVariable[]>(`/templates/${id}/variables`);
  }

  // PUBLIC_INTERFACE
  async updateTemplateVariables(id: string, variables: TemplateVariable[]): Promise<ApiResponse<Template>> {
    /**
     * Update template variables
     */
    return await apiService.put<Template>(`/templates/${id}/variables`, { variables });
  }

  // PUBLIC_INTERFACE
  async addTestCase(id: string, testCase: Omit<TemplateTestCase, 'id'>): Promise<ApiResponse<TemplateTestCase>> {
    /**
     * Add a new test case to template
     */
    return await apiService.post<TemplateTestCase>(`/templates/${id}/test-cases`, testCase);
  }

  // PUBLIC_INTERFACE
  async updateTestCase(id: string, testCaseId: string, testCase: Partial<TemplateTestCase>): Promise<ApiResponse<TemplateTestCase>> {
    /**
     * Update a test case
     */
    return await apiService.put<TemplateTestCase>(`/templates/${id}/test-cases/${testCaseId}`, testCase);
  }

  // PUBLIC_INTERFACE
  async deleteTestCase(id: string, testCaseId: string): Promise<ApiResponse<void>> {
    /**
     * Delete a test case
     */
    return await apiService.delete<void>(`/templates/${id}/test-cases/${testCaseId}`);
  }
}

export default new TemplateService();
