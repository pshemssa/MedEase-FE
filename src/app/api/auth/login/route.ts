import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://medsystemapplication.onrender.com';

    // Call backend API for authentication using axios
    const backendResponse = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email: trimmedEmail,
        password: trimmedPassword,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = backendResponse.data;

    // Extract user data from response
    const userData = data.user || data;
    const token = data.token || data.accessToken;

    // Ensure user object has required fields
    const user = {
      id: userData.id || userData._id || userData.userId,
      email: userData.email || trimmedEmail,
      name: userData.name || userData.fullName || userData.username,
      role: userData.role || userData.userType || 'patient',
      ...userData,
    };

    return NextResponse.json({
      message: data.message || 'Login successful',
      token: token,
      user: user,
    });

  } catch (error: any) {
    console.error('Login error:', error?.response?.data || error.message || error);

    // If backend returned a response, forward its status/message
    if (error.response) {
      const status = error.response.status || 500;
      const data = error.response.data || {};
      return NextResponse.json(
        { message: data.message || data.error || 'Login failed. Please check your credentials.' },
        { status }
      );
    }

    return NextResponse.json(
      { message: error.message || 'Server error occurred' },
      { status: 500 }
    );
  }
}

