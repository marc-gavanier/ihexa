'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type { SkipLinksPortal as SkipLinksPortalComponent } from './skip-links-portal';

const SkipLinksPortal = dynamic(() => import('./skip-links-portal').then((m) => m.SkipLinksPortal), { ssr: false });

type SkipLinksPortalClientProps = ComponentProps<typeof SkipLinksPortalComponent>;

export const SkipLinksPortalClient = (props: SkipLinksPortalClientProps) => <SkipLinksPortal {...props} />;
