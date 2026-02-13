/**
 * Authentication middleware utilities
 * Handles route protection and role-based access control
 */

export interface User {
  id: string | number;
  email: string;
  name?: string;
  role?: 'patient' | 'doctor' | 'pharmacist' | 'admin';
  [key: string]: any;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

/**
 * Get current authentication state from localStorage
 */
export function getAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null, token: null };
  }

  const token = localStorage.getItem('authToken');
  const userStr = localStorage.getItem('user');
  
  let user: User | null = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      console.error('Failed to parse user data:', error);
      localStorage.removeItem('user');
    }
  }

  return {
    isAuthenticated: !!token && !!user,
    user,
    token,
  };
}

/**
 * Check if user has required role
 */
export function hasRole(requiredRole: string | string[]): boolean {
  const { user } = getAuthState();
  if (!user || !user.role) return false;

  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role);
  }

  return user.role === requiredRole;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getAuthState().isAuthenticated;
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return getAuthState().user;
}

/**
 * Get user role
 */
export function getUserRole(): string | null {
  const { user } = getAuthState();
  return user?.role || null;
}

/**
 * Clear authentication data
 */
export function clearAuth(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}

/**
 * Store authentication data
 */
export function setAuth(token: string, user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
}

/**
 * Get redirect path based on user role
 */
export function getRoleBasedRedirect(role?: string): string {
  switch (role) {
    case 'doctor':
      return '/doctorDashboard';
    case 'patient':
      return '/patientDashboard/dashboard';
    case 'pharmacist':
      return '/pharmacy';
    case 'admin':
      return '/admin';
    default:
      return '/login';
  }
}
