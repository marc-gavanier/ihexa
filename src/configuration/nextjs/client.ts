'use client';

import { createClientBinder, createUseServerAction } from '@arckit/nextjs/client';
import { inject, provideLazy } from '@/configuration/injection';

export const ClientBinder = createClientBinder(provideLazy);
export const useServerAction = createUseServerAction(inject);
