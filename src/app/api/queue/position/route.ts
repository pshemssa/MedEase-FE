import { NextResponse } from 'next/server';

let globalPosition = 5;
let lastUpdate = Date.now();

export async function GET() {
  const now = Date.now();
  
  // Simulate position updates every 10 seconds
  if (now - lastUpdate > 10000 && globalPosition > 1) {
    globalPosition--;
    lastUpdate = now;
  }
  
  return NextResponse.json({ 
    position: globalPosition,
    timestamp: now 
  });
}