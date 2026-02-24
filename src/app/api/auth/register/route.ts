import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

/**
 * Proxy registration route
 * Forwards registration to backend:
 * - patient  -> POST /api/auth/register/patient
 * - pharmacist -> POST /api/auth/register/pharmacy
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Expect a role from the frontend, default to patient
    const role = (body.role || body.userRole || 'patient') as string;
    const { role: _role, userRole: _userRole, firstName, lastName, ...rest } = body;

    // Combine firstName and lastName into username for backend
    const payload = {
      ...rest,
      username: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
    };

    const BASE_URL =
      process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

    // Map role to backend registration endpoint
    const endpoint =
      role === 'pharmacist' || role === 'pharmacy'
        ? '/api/auth/register/pharmacy'
        : '/api/auth/register/patient';

    const backendResponse = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    const data = backendResponse.data;

    return NextResponse.json(
      {
        message: data.message || 'Registration successful',
        data,
      },
      { status: backendResponse.status },
    );
  } catch (error: any) {
    console.error('Register error:', error?.response?.data || error.message || error);

    if (error.response) {
      const status = error.response.status || 500;
      const data = error.response.data || {};
      return NextResponse.json(
        {
          message: data.message || data.error || 'Registration failed. Please try again.',
          details: data,
        },
        { status },
      );
    }

    return NextResponse.json(
      { message: error.message || 'Server error occurred' },
      { status: 500 },
    );
  }
}

