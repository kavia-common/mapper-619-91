import apiService from './api';
import { User, LoginCredentials, RegisterData, ApiResponse } from '@/types';

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

class AuthService {
  // PUBLIC_INTERFACE
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    /**
     * Authenticate user with credentials and return user data with tokens
     */
    const response = await apiService.post<LoginResponse>('/auth/login', credentials);
    
    if (response.success && response.data) {
      apiService.setAuthToken(response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // PUBLIC_INTERFACE
  async register(userData: RegisterData): Promise<ApiResponse<User>> {
    /**
     * Register a new user account
     */
    return await apiService.post<User>('/auth/register', userData);
  }

  // PUBLIC_INTERFACE
  async logout(): Promise<void> {
    /**
     * Logout user and clear all stored tokens and user data
     */
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiService.removeAuthToken();
      localStorage.removeItem('user');
      localStorage.removeItem('refreshToken');
    }
  }

  // PUBLIC_INTERFACE
  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    /**
     * Refresh the authentication token using refresh token
     */
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return {
        success: false,
        error: {
          code: 'NO_REFRESH_TOKEN',
          message: 'No refresh token available',
          timestamp: new Date(),
        },
      };
    }

    const response = await apiService.post<RefreshTokenResponse>('/auth/refresh', {
      refreshToken,
    });

    if (response.success && response.data) {
      apiService.setAuthToken(response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }

    return response;
  }

  // PUBLIC_INTERFACE
  async getCurrentUser(): Promise<ApiResponse<User>> {
    /**
     * Get current authenticated user information
     */
    return await apiService.get<User>('/auth/me');
  }

  // PUBLIC_INTERFACE
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    /**
     * Update current user profile information
     */
    const response = await apiService.put<User>('/auth/profile', userData);
    
    if (response.success && response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response;
  }

  // PUBLIC_INTERFACE
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    /**
     * Change user password
     */
    return await apiService.post<void>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  // PUBLIC_INTERFACE
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    /**
     * Send password reset email
     */
    return await apiService.post<void>('/auth/forgot-password', { email });
  }

  // PUBLIC_INTERFACE
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    /**
     * Reset password using reset token
     */
    return await apiService.post<void>('/auth/reset-password', {
      token,
      newPassword,
    });
  }

  // PUBLIC_INTERFACE
  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    /**
     * Verify email address using verification token
     */
    return await apiService.post<void>('/auth/verify-email', { token });
  }

  // PUBLIC_INTERFACE
  getStoredUser(): User | null {
    /**
     * Get user data from local storage
     */
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing stored user:', error);
      return null;
    }
  }

  // PUBLIC_INTERFACE
  isAuthenticated(): boolean {
    /**
     * Check if user is currently authenticated
     */
    return !!apiService.getAuthToken() && !!this.getStoredUser();
  }

  // PUBLIC_INTERFACE
  hasPermission(permission: string): boolean {
    /**
     * Check if current user has specific permission
     */
    const user = this.getStoredUser();
    if (!user) return false;
    
    return user.permissions.some(p => p.name === permission);
  }

  // PUBLIC_INTERFACE
  hasRole(role: string): boolean {
    /**
     * Check if current user has specific role
     */
    const user = this.getStoredUser();
    if (!user) return false;
    
    return user.role === role;
  }

  // PUBLIC_INTERFACE
  hasAnyRole(roles: string[]): boolean {
    /**
     * Check if current user has any of the specified roles
     */
    const user = this.getStoredUser();
    if (!user) return false;
    
    return roles.includes(user.role);
  }
}

export default new AuthService();
