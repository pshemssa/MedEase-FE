import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

    // Backend Swagger says: GET /api/patient/profile
    const backendResponse = await axios.get(`${BASE_URL}/api/patient/profile`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (backendResponse.data) {
      return NextResponse.json({
        data: backendResponse.data,
      });
    }

    // If backend returns an error or empty data, let the frontend fall back
    return NextResponse.json({
      data: null,
    });
  } catch (error: any) {
    console.error('Get patient profile error:', error?.response?.data || error.message || error);
    // Return null data instead of error to allow dashboard to load with fallback
    return NextResponse.json({
      data: null,
    });
  }
}
