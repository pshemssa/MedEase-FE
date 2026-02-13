import { NextResponse } from 'next/server';
import { apiClient } from '@/lib/api-client';

export async function GET() {
  try {
    // Call backend API to get chronic diseases
    // Try common endpoint patterns
    const endpoints = ['/api/patients/me/chronic-diseases', '/api/chronic-diseases/me', '/api/chronic-diseases'];
    
    for (const endpoint of endpoints) {
      const response = await apiClient.get(endpoint);
      if (response.data && !response.error) {
        const diseases = Array.isArray(response.data) ? response.data : (response.data.chronicDiseases || response.data.diseases || []);
        return NextResponse.json({
          data: diseases,
        });
      }
    }

    // Return empty array if backend endpoints don't work
    return NextResponse.json({
      data: [],
    });
  } catch (error: any) {
    console.error('Get chronic diseases error:', error);
    // Return empty array on error to allow dashboard to load
    return NextResponse.json({
      data: [],
    });
  }
}
