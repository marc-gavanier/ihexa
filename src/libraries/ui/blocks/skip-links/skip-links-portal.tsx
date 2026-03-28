'use client';

import { createPortal } from 'react-dom';
import { SkipLinks, skipLinksId } from './skip-links';

export const SkipLinksPortal = ({
  links,
  elementId = skipLinksId,
  children
}: {
  links: { label: string; anchor: string }[];
  children: string;
  elementId?: string;
}) => createPortal(<SkipLinks links={links} label={children} />, document.getElementById(elementId) ?? document.body);
