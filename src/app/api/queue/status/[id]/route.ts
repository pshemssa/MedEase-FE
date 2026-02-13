import { NextRequest, NextResponse } from 'next/server';
import { queueService } from '@/lib/queue-service';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['waiting', 'in-consultation', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status is required (waiting, in-consultation, or completed)' },
        { status: 400 }
      );
    }

    // Call backend API to update queue status
    const result = await queueService.updateStatus(id, status as any);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to update queue status' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'Queue status updated successfully',
      data: result.data,
    });
  } catch (error: any) {
    console.error('Update queue status error:', error);
    return NextResponse.json(
      { error: error.message || 'Server error occurred' },
      { status: 500 }
    );
  }
}
