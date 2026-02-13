/**
 * Authentication service
 * Handles authentication-related operations
 */

import { apiClient, API_ENDPOINTS } from './api-client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
  role?: string;
  [key: string]: any;
}

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: string | number;
    email: string;
    name?: string;
    role?: string;
    [key: string]: any;
  };
  message?: string;
}

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials,
        false // Don't include auth token for login
      );

      if (response.error || !response.data) {
        return {
          success: false,
          error: response.error || response.message || 'Login failed',
        };
      }

      // Store token if provided
      const token = response.data.token || response.data.accessToken;
      if (token) {
        apiClient.setAuthToken(token);
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
   * Register new user
   */
  async register(data: RegisterData): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data,
        false // Don't include auth token for registration
      );

      if (response.error || !response.data) {
        return {
          success: false,
          error: response.error || response.message || 'Registration failed',
        };
      }

      // Store token if provided
      const token = response.data.token || response.data.accessToken;
      if (token) {
        apiClient.setAuthToken(token);
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
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      apiClient.clearAuthToken();
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return apiClient.getAuthToken() !== null;
  }

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return apiClient.getAuthToken();
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email },
        false
      );

      if (response.error) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to send reset email',
        };
      }

      return {
        success: true,
        message: response.data?.message || 'Password reset email sent',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        { token, password: newPassword },
        false
      );

      if (response.error) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to reset password',
        };
      }

      return {
        success: true,
        message: response.data?.message || 'Password reset successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }

  /**
   * Verify OTP
   */
  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTH.VERIFY_OTP,
        { email, otp },
        false
      );

      if (response.error || !response.data) {
        return {
          success: false,
          error: response.error || response.message || 'OTP verification failed',
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

export const authService = new AuthService();
