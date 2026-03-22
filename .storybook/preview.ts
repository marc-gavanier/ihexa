import type { Preview } from '@storybook/nextjs-vite';
import '@/libraries/i18n/resource-loader.fetch';
import '@/styles/globals.css';
import './storybook.css';
import { darkTheme, lightTheme } from './themes';

const getInitialTheme = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('storybook-theme') || 'light';
  }
  return 'light';
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical'
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'todo'
    },
    docs: {
      theme: getInitialTheme() === 'dark' ? darkTheme : lightTheme
    }
  },
  globalTypes: {
    theme: {
      description: 'DaisyUI theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: getInitialTheme()
  },
  decorators: [
    (Story, context) => {
      // biome-ignore lint/complexity/useLiteralKeys: TS4111 requires bracket notation for index signatures
      const theme = context.globals['theme'] || 'light';
      const storedTheme = localStorage.getItem('storybook-theme');

      document.documentElement.setAttribute('data-theme', theme);

      if (storedTheme !== null && storedTheme !== theme) {
        localStorage.setItem('storybook-theme', theme);
        const url = new URL(window.parent.location.href);
        url.searchParams.set('theme', theme);
        window.parent.location.href = url.toString();
      } else if (storedTheme === null) {
        localStorage.setItem('storybook-theme', theme);
      }

      return Story();
    }
  ]
};

export default preview;
