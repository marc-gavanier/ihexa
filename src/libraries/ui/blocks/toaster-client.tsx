'use client';

import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import type { Toaster as ToasterComponent } from './toaster';

const Toaster = dynamic(() => import('./toaster').then((m) => m.Toaster), { ssr: false });

type ToasterClientProps = ComponentProps<typeof ToasterComponent>;

export const ToasterClient = (props: ToasterClientProps) => <Toaster {...props} />;
