'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page visit
    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page: pathname }),
        });
      } catch (error) {
        // Silently fail - don't affect user experience
        console.debug('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
