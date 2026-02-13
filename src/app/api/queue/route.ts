import { NextRequest, NextResponse } from 'next/server';
import { queueService } from '@/lib/queue-service';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const doctorId = searchParams.get('doctorId') || undefined;
    const status = searchParams.get('status') || undefined;

    // Call backend API to get queue
    const result = await queueService.getQueue(doctorId, status);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to get queue' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      data: result.data || [],
    });
  } catch (error: any) {
    console.error('Get queue error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error occurred' },
      { status: 500 }
    );
  }
}
