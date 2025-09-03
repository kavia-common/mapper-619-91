import apiService from './api';
import { Notification, NotificationType, NotificationSeverity, ApiResponse, PaginationInfo } from '../types';

interface NotificationListResponse {
  notifications: Notification[];
  pagination: PaginationInfo;
  unreadCount: number;
}

class NotificationService {
  // PUBLIC_INTERFACE
  async getNotifications(page = 1, limit = 20, filters?: {
    type?: NotificationType;
    severity?: NotificationSeverity;
    isRead?: boolean;
    category?: string;
  }): Promise<ApiResponse<NotificationListResponse>> {
    /**
     * Get paginated list of notifications with optional filters
     */
    const params = { page, limit, ...filters };
    return await apiService.get<NotificationListResponse>('/notifications', { params });
  }

  // PUBLIC_INTERFACE
  async getNotification(id: string): Promise<ApiResponse<Notification>> {
    /**
     * Get specific notification by ID
     */
    return await apiService.get<Notification>(`/notifications/${id}`);
  }

  // PUBLIC_INTERFACE
  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    /**
     * Mark a notification as read
     */
    return await apiService.put<Notification>(`/notifications/${id}/read`);
  }

  // PUBLIC_INTERFACE
  async markAsUnread(id: string): Promise<ApiResponse<Notification>> {
    /**
     * Mark a notification as unread
     */
    return await apiService.put<Notification>(`/notifications/${id}/unread`);
  }

  // PUBLIC_INTERFACE
  async markAllAsRead(): Promise<ApiResponse<void>> {
    /**
     * Mark all notifications as read for current user
     */
    return await apiService.put<void>('/notifications/mark-all-read');
  }

  // PUBLIC_INTERFACE
  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    /**
     * Delete a notification
     */
    return await apiService.delete<void>(`/notifications/${id}`);
  }

  // PUBLIC_INTERFACE
  async deleteAllRead(): Promise<ApiResponse<void>> {
    /**
     * Delete all read notifications for current user
     */
    return await apiService.delete<void>('/notifications/delete-all-read');
  }

  // PUBLIC_INTERFACE
  async getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    /**
     * Get count of unread notifications
     */
    return await apiService.get<{ count: number }>('/notifications/unread-count');
  }

  // PUBLIC_INTERFACE
  async getNotificationSettings(): Promise<ApiResponse<{
    emailEnabled: boolean;
    pushEnabled: boolean;
    categories: Array<{
      name: string;
      enabled: boolean;
      emailEnabled: boolean;
      pushEnabled: boolean;
    }>;
  }>> {
    /**
     * Get notification preferences for current user
     */
    return await apiService.get<{
      emailEnabled: boolean;
      pushEnabled: boolean;
      categories: Array<{
        name: string;
        enabled: boolean;
        emailEnabled: boolean;
        pushEnabled: boolean;
      }>;
    }>('/notifications/settings');
  }

  // PUBLIC_INTERFACE
  async updateNotificationSettings(settings: {
    emailEnabled: boolean;
    pushEnabled: boolean;
    categories: Array<{
      name: string;
      enabled: boolean;
      emailEnabled: boolean;
      pushEnabled: boolean;
    }>;
  }): Promise<ApiResponse<void>> {
    /**
     * Update notification preferences for current user
     */
    return await apiService.put<void>('/notifications/settings', settings);
  }

  // PUBLIC_INTERFACE
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<ApiResponse<Notification>> {
    /**
     * Create a new notification (admin only)
     */
    return await apiService.post<Notification>('/notifications', notification);
  }

  // PUBLIC_INTERFACE
  subscribeToUpdates(callback: (notification: Notification) => void): void {
    /**
     * Subscribe to real-time notification updates via WebSocket
     */
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';
    const token = apiService.getAuthToken();
    
    if (!token) {
      console.error('No auth token available for WebSocket connection');
      return;
    }

    const ws = new WebSocket(`${wsUrl}/notifications?token=${token}`);
    
    ws.onopen = () => {
      console.log('Connected to notification updates');
    };
    
    ws.onmessage = (event) => {
      try {
        const notification = JSON.parse(event.data);
        callback(notification);
      } catch (error) {
        console.error('Error parsing notification update:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('Disconnected from notification updates');
      // Implement reconnection logic if needed
    };
  }

  // PUBLIC_INTERFACE
  async executeNotificationAction(notificationId: string, actionId: string): Promise<ApiResponse<void>> {
    /**
     * Execute an action associated with a notification
     */
    return await apiService.post<void>(`/notifications/${notificationId}/actions/${actionId}`);
  }
}

export default new NotificationService();
