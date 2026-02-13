/**
 * Queue service
 * Handles queue-related operations
 */

import { apiClient, API_ENDPOINTS } from './api-client';

export interface QueueJoinData {
  clinic: string;
  department: string;
  doctor?: string;
  reason?: string;
}

export interface QueuePosition {
  position: number;
  queueNumber?: string;
  estimatedWait?: number;
  timestamp?: number;
}

export interface QueuePatient {
  id: string;
  name: string;
  appointmentTime: string;
  reason: string;
  status: 'waiting' | 'in-consultation' | 'completed';
  queueNumber: number;
}

class QueueService {
  /**
   * Join queue
   */
  async joinQueue(data: QueueJoinData): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.QUEUE.JOIN, data);

      if (response.error || !response.data) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to join queue',
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }

  /**
   * Get queue position
   */
  async getPosition(queueId?: string): Promise<{ success: boolean; data?: QueuePosition; error?: string }> {
    try {
      const endpoint = queueId 
        ? `${API_ENDPOINTS.QUEUE.POSITION}/${queueId}`
        : API_ENDPOINTS.QUEUE.POSITION;
      
      const response = await apiClient.get<QueuePosition>(endpoint);

      if (response.error || !response.data) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to get queue position',
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }

  /**
   * Get queue list
   */
  async getQueue(doctorId?: string, status?: string): Promise<{ success: boolean; data?: QueuePatient[]; error?: string }> {
    try {
      let endpoint = API_ENDPOINTS.QUEUE.LIST;
      const params = new URLSearchParams();
      
      if (doctorId) params.append('doctorId', doctorId);
      if (status) params.append('status', status);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }

      const response = await apiClient.get<QueuePatient[]>(endpoint);

      if (response.error) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to get queue',
        };
      }

      return {
        success: true,
        data: response.data || [],
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }

  /**
   * Update queue status
   */
  async updateStatus(
    queueId: string,
    status: 'waiting' | 'in-consultation' | 'completed'
  ): Promise<{ success: boolean; data?: QueuePatient; error?: string }> {
    try {
      const response = await apiClient.put(
        `${API_ENDPOINTS.QUEUE.UPDATE_STATUS}/${queueId}`,
        { status }
      );

      if (response.error || !response.data) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to update queue status',
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }
}

export const queueService = new QueueService();
