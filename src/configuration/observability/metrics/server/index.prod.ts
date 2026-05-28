import { createOtelMetrics } from '@/libraries/observability';
import { getScope, getUser } from '@/libraries/observability/context';

export const metrics = createOtelMetrics({ namespace: 'ihexa', getScope, getUser });
