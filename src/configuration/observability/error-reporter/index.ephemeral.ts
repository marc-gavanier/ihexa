import { logger } from '@/configuration/observability/logger';
import { withErrorReporter as createWithErrorReporter, loggerReporter } from '@/libraries/observability';

export const errorReporter = loggerReporter(logger);
export const withErrorReporter = createWithErrorReporter(errorReporter);

// todo: regarder combien consome le service GlitchTip
