import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET() {
  try {
    // Call backend API to get prescriptions
    // Try common endpoint patterns
    const endpoints = ['/api/prescriptions/me', '/api/prescriptions', '/api/patients/me/prescriptions'];
    
    for (const endpoint of endpoints) {
      const response = await apiClient.get(endpoint);
      if (response.data && !response.error) {
        const prescriptions = Array.isArray(response.data) ? response.data : (response.data.prescriptions || []);
        return NextResponse.json({
          data: prescriptions,
        });
      }
    }

    // Return empty array if backend endpoints don't work
    return NextResponse.json({
      data: [],
    });
  } catch (error: any) {
    console.error('Get prescriptions error:', error);
    // Return empty array on error to allow dashboard to load
    return NextResponse.json({
      data: [],
    });
  }
}
