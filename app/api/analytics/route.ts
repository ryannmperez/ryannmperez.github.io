import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/lib/db';

// Mark as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

// Simple auth check - you should use a proper secret in production
const ANALYTICS_SECRET = process.env.ANALYTICS_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Check for authorization
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Allow access if secret matches or if running locally
    const isLocal = request.headers.get('host')?.includes('localhost');
    if (!isLocal && secret !== ANALYTICS_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const summary = getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
