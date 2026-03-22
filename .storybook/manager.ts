import { addons } from 'storybook/manager-api';
import { darkTheme, lightTheme } from './themes';

const getStoredTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';

  const urlParams = new URLSearchParams(window.location.search);
  const urlTheme = urlParams.get('theme');
  if (urlTheme === 'dark' || urlTheme === 'light') {
    return urlTheme;
  }

  const stored = window.localStorage.getItem('storybook-theme');
  return stored === 'dark' ? 'dark' : 'light';
};

addons.setConfig({
  theme: getStoredTheme() === 'dark' ? darkTheme : lightTheme
});
