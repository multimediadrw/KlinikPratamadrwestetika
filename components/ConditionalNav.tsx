'use client';

import { useIsMobile } from '@/lib/useIsMobile';
import NavBar from '@/components/NavBar';

export default function ConditionalNav() {
  const isMobile = useIsMobile();

  // Don't show navbar on mobile (mobile app has its own navigation)
  if (isMobile) {
    return null;
  }

  return <NavBar />;
}
