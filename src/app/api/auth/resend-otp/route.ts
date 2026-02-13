import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Proxy resend-otp to backend: POST /api/auth/resend-otp
 * Expects: { email } for registration flow
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required to resend OTP.' },
        { status: 400 },
      );
    }

    const BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

    const backendResponse = await axios.post(
      `${BASE_URL}/api/auth/resend-otp`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = backendResponse.data;

    return NextResponse.json(
      {
        message: data.message || data.Message || 'OTP resent successfully.',
      },
      { status: backendResponse.status },
    );
  } catch (error: any) {
    console.error('Resend OTP error:', error?.response?.data || error.message || error);

    if (error.response) {
      const status = error.response.status || 500;
      const data = error.response.data || {};
      return NextResponse.json(
        {
          message: data.message || data.error || 'Failed to resend OTP. Please try again.',
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

