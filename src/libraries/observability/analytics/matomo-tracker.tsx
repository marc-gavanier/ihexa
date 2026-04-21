'use client';

import { trackAppRouter } from '@socialgouv/matomo-next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const MatomoTracker = ({ url, siteId }: { url: string; siteId: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackAppRouter({ url, siteId, pathname, searchParams });
  }, [url, siteId, pathname, searchParams]);

  return null;
};
