/**
 * API Client for backend communication
 * Centralized service for all API calls to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
  status?: number;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Get authentication token from localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  /**
   * Set authentication token in localStorage
   */
  setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  /**
   * Remove authentication token from localStorage
   */
  clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Build headers for API requests
   */
  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      return {
        error: data?.message || data?.error || `HTTP error! status: ${response.status}`,
        message: data?.message,
        status: response.status,
        data: data,
      };
    }

    return {
      data: data,
      status: response.status,
    };
  }

  /**
   * Make GET request
   */
  async get<T = any>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(includeAuth),
      });

      return await this.handleResponse<T>(response);
    } catch (error: any) {
      return {
        error: error.message || 'Network error occurred',
        status: 0,
      };
    }
  }

  /**
   * Make POST request
   */
  async post<T = any>(
    endpoint: string,
    body?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(includeAuth),
        body: body ? JSON.stringify(body) : undefined,
      });

      return await this.handleResponse<T>(response);
    } catch (error: any) {
      return {
        error: error.message || 'Network error occurred',
        status: 0,
      };
    }
  }

  /**
   * Make PUT request
   */
  async put<T = any>(
    endpoint: string,
    body?: any,
    includeAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(includeAuth),
        body: body ? JSON.stringify(body) : undefined,
      });

      return await this.handleResponse<T>(response);
    } catch (error: any) {
      return {
        error: error.message || 'Network error occurred',
        status: 0,
      };
    }
  }

  /**
   * Make DELETE request
   */
  async delete<T = any>(endpoint: string, includeAuth: boolean = true): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(includeAuth),
      });

      return await this.handleResponse<T>(response);
    } catch (error: any) {
      return {
        error: error.message || 'Network error occurred',
        status: 0,
      };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export API endpoints as constants
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    VERIFY_OTP: '/api/auth/verify-otp',
  },
  // Queue
  QUEUE: {
    JOIN: '/api/queue/join',
    POSITION: '/api/queue/position',
    LIST: '/api/queue',
    UPDATE_STATUS: '/api/queue/status',
  },
  // Patients
  PATIENTS: {
    LIST: '/api/patients',
    GET: '/api/patients/:id',
    CREATE: '/api/patients',
    UPDATE: '/api/patients/:id',
  },
  // Prescriptions
  PRESCRIPTIONS: {
    LIST: '/api/prescriptions',
    GET: '/api/prescriptions/:id',
    CREATE: '/api/prescriptions',
    UPDATE: '/api/prescriptions/:id',
  },
  // Medical Records
  MEDICAL_RECORDS: {
    LIST: '/api/medical-records',
    GET: '/api/medical-records/:id',
    REQUEST: '/api/medical-records/request',
  },
} as const;
