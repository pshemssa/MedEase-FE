import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Proxy OTP verification to backend: POST /api/auth/verify-otp
 * Expects: { email, otp }
 */
export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: 'Email and OTP are required.' },
        { status: 400 },
      );
    }

    const BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

    const backendResponse = await axios.post(
      `${BASE_URL}/api/auth/verify-otp`,
      { email, otp },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = backendResponse.data;

    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error: any) {
    console.error('Verify OTP error:', error?.response?.data || error.message || error);

    if (error.response) {
      const status = error.response.status || 500;
      const data = error.response.data || {};
      return NextResponse.json(
        {
          message: data.message || data.error || 'OTP verification failed.',
          details: data,
        },
        { status },
      );
    }

    return NextResponse.json(
      { message: error.message || 'Server error occurred.' },
      { status: 500 },
    );
  }
}

