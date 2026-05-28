import { createOtelMetrics } from '@/libraries/observability';
import { getIdentity, getScope } from '@/libraries/observability/context';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getIdentity });
