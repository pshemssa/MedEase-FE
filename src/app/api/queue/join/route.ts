import { NextRequest, NextResponse } from 'next/server';
import { queueService } from '@/lib/queue-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clinic, department, doctor, reason } = body;

    if (!clinic || !department) {
      return NextResponse.json(
        { error: 'Clinic and department are required' },
        { status: 400 }
      );
    }

    // Call backend API to join queue
    const result = await queueService.joinQueue({
      clinic,
      department,
      doctor,
      reason,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to join queue' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Successfully joined queue',
      data: result.data,
    });
  } catch (error: any) {
    console.error('Join queue error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error occurred' },
      { status: 500 }
    );
  }
}
