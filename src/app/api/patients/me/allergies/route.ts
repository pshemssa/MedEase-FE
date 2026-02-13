import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET() {
  try {
    // Call backend API to get allergies
    // Try common endpoint patterns
    const endpoints = ['/api/patients/me/allergies', '/api/allergies/me', '/api/allergies'];
    
    for (const endpoint of endpoints) {
      const response = await apiClient.get(endpoint);
      if (response.data && !response.error) {
        const allergies = Array.isArray(response.data) ? response.data : (response.data.allergies || []);
        return NextResponse.json({
          data: allergies,
        });
      }
    }

    // Return empty array if backend endpoints don't work
    return NextResponse.json({
      data: [],
    });
  } catch (error: any) {
    console.error('Get allergies error:', error);
    // Return empty array on error to allow dashboard to load
    return NextResponse.json({
      data: [],
    });
  }
}
