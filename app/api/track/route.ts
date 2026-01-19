import { NextRequest, NextResponse } from 'next/server';
import { logVisit } from '@/lib/db';

// Mark as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { page } = body;

    // Get IP from headers (works with Vercel, Cloudflare, etc.)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    // Get other headers
    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;

    // Vercel provides geo information in headers
    const country = request.headers.get('x-vercel-ip-country') || undefined;
    const city = request.headers.get('x-vercel-ip-city') || undefined;

    await logVisit({
      ip,
      page: page || '/',
      user_agent: userAgent,
      referer: referer,
      country,
      city,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging visit:', error);
    return NextResponse.json({ success: false, error: 'Failed to log visit' }, { status: 500 });
  }
}

// Also handle GET for simple tracking pixel approach
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '/';

    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    const userAgent = request.headers.get('user-agent') || undefined;
    const referer = request.headers.get('referer') || undefined;
    const country = request.headers.get('x-vercel-ip-country') || undefined;
    const city = request.headers.get('x-vercel-ip-city') || undefined;

    await logVisit({
      ip,
      page,
      user_agent: userAgent,
      referer: referer,
      country,
      city,
    });

    // Return a 1x1 transparent pixel
    const pixel = Buffer.from(
      'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      'base64'
    );

    return new NextResponse(pixel, {
      headers: {
        'Content-Type': 'image/gif',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error logging visit:', error);
    return new NextResponse(null, { status: 500 });
  }
}
