import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { message: 'Authentication service not configured for production' },
      { status: 503 }
    );
  }

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

    const demoAccounts = [
      { email: 'demo@medease.rw', password: 'demo123', name: '<demo_patient>' },
      { email: 'patient@medease.rw', password: 'patient123', name: '<test_patient>' }
    ];

    const account = demoAccounts.find(acc => acc.email === trimmedEmail && acc.password === trimmedPassword);
    
    if (account) {
      return NextResponse.json({
        message: 'Login successful (DEMO MODE)',
        token: 'dev-token-' + Date.now(),
        user: {
          id: 1,
          email: account.email,
          name: account.name,
          role: 'patient'
        }
      });
    }

    return NextResponse.json(
      { message: 'Invalid credentials. Demo: demo@medease.rw / demo123' },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}

