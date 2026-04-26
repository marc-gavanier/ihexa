import { createStorybook } from '@arckit/storybook';
import { provide } from '@/configuration/injection';

export const { translation, withI18nProvider } = createStorybook({ provide });
