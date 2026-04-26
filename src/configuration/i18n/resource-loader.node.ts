import { registerNodeResourceLoader } from '@arckit/i18n/resource-loader/node';
import { provide } from '@/configuration/injection';

registerNodeResourceLoader(provide);
