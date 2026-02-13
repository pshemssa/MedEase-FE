/**
 * Patient service
 * Handles patient-related operations and data fetching
 */

import { apiClient, API_ENDPOINTS } from './api-client';

export interface PatientProfile {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  insurance?: string;
  referenceId?: string;
  referenceNumber?: string;
  gender?: string;
  address?: string;
  [key: string]: any;
}

export interface PatientPrescription {
  id: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribedBy: string;
  date: string;
  instructions?: string;
  status: 'Active' | 'Used' | 'Expired';
  signedAt?: string;
  [key: string]: any;
}

export interface Allergy {
  id?: string;
  type: 'Medicine' | 'Food' | 'Other';
  name: string;
  reaction: string;
  severity?: 'Mild' | 'Moderate' | 'Severe';
}

export interface ChronicDisease {
  id?: string;
  name: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  status: string;
  diagnosisDate?: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  notes?: string;
  [key: string]: any;
}

export interface PatientMedicalData {
  profile: PatientProfile;
  prescriptions: PatientPrescription[];
  allergies: Allergy[];
  chronicDiseases: ChronicDisease[];
  medicalHistory: MedicalRecord[];
}

class PatientService {
  /**
   * Get current patient profile
   * Note: This calls our Next.js API route, which then calls the backend
   */
  async getProfile(): Promise<{ success: boolean; data?: PatientProfile; error?: string }> {
    try {
      // Call our Next.js API route (which proxies to backend)
      const response = await fetch('/api/patients/me', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: result.data,
        };
      }

      // Return success with undefined to allow fallback
      return {
        success: true,
        data: undefined,
      };
    } catch (error: any) {
      // Return success with undefined data to allow fallback
      return {
        success: true,
        data: undefined,
      };
    }
  }

  /**
   * Get patient prescriptions
   * Note: This calls our Next.js API route, which then calls the backend
   */
  async getPrescriptions(): Promise<{ success: boolean; data?: PatientPrescription[]; error?: string }> {
    try {
      const response = await fetch('/api/patients/me/prescriptions', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: Array.isArray(result.data) ? result.data : [],
        };
      }

      // Return empty array if endpoint doesn't work
      return {
        success: true,
        data: [],
      };
    } catch (error: any) {
      // Return empty array on error
      return {
        success: true,
        data: [],
      };
    }
  }

  /**
   * Get patient allergies
   * Note: This calls our Next.js API route, which then calls the backend
   */
  async getAllergies(): Promise<{ success: boolean; data?: Allergy[]; error?: string }> {
    try {
      const response = await fetch('/api/patients/me/allergies', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: Array.isArray(result.data) ? result.data : [],
        };
      }

      // Return empty array if endpoint doesn't work
      return {
        success: true,
        data: [],
      };
    } catch (error: any) {
      // Return empty array on error
      return {
        success: true,
        data: [],
      };
    }
  }

  /**
   * Get patient chronic diseases
   * Note: This calls our Next.js API route, which then calls the backend
   */
  async getChronicDiseases(): Promise<{ success: boolean; data?: ChronicDisease[]; error?: string }> {
    try {
      const response = await fetch('/api/patients/me/chronic-diseases', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: Array.isArray(result.data) ? result.data : [],
        };
      }

      // Return empty array if endpoint doesn't work
      return {
        success: true,
        data: [],
      };
    } catch (error: any) {
      // Return empty array on error
      return {
        success: true,
        data: [],
      };
    }
  }

  /**
   * Get patient medical history
   */
  async getMedicalHistory(): Promise<{ success: boolean; data?: MedicalRecord[]; error?: string }> {
    try {
      const response = await apiClient.get<MedicalRecord[]>('/api/patients/me/medical-history');

      if (response.error) {
        return {
          success: false,
          error: response.error || response.message || 'Failed to fetch medical history',
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
   * Get all patient data
   */
  async getAllPatientData(): Promise<{ success: boolean; data?: PatientMedicalData; error?: string }> {
    try {
      // Fetch all data in parallel
      const [profileResult, prescriptionsResult, allergiesResult, diseasesResult, historyResult] = await Promise.all([
        this.getProfile(),
        this.getPrescriptions(),
        this.getAllergies(),
        this.getChronicDiseases(),
        this.getMedicalHistory(),
      ]);

      if (!profileResult.success || !profileResult.data) {
        return {
          success: false,
          error: profileResult.error || 'Failed to fetch patient data',
        };
      }

      return {
        success: true,
        data: {
          profile: profileResult.data,
          prescriptions: prescriptionsResult.data || [],
          allergies: allergiesResult.data || [],
          chronicDiseases: diseasesResult.data || [],
          medicalHistory: historyResult.data || [],
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error occurred',
      };
    }
  }
}

export const patientService = new PatientService();
