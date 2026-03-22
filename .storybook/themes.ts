import { create } from 'storybook/theming';
import { colors } from './colors';

const shared = {
  brandTitle: 'Blue Mapping',
  brandUrl: '/',
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: 'ui-monospace, monospace',
  appBorderRadius: 8,
  inputBorderRadius: 6
};

export const lightTheme = create({
  base: 'light',
  ...shared,

  colorPrimary: colors.light.primary,
  colorSecondary: colors.light.secondary,

  appBg: colors.light.base200,
  appContentBg: colors.light.base100,
  appPreviewBg: colors.light.base100,
  appBorderColor: colors.light.base300,

  textColor: colors.light.baseContent,
  textInverseColor: colors.light.base100,
  textMutedColor: colors.light.neutralSubtle,

  barTextColor: colors.light.neutralSubtle,
  barSelectedColor: colors.light.primary,
  barHoverColor: colors.light.baseContent,
  barBg: colors.light.base100,

  inputBg: colors.light.base200,
  inputBorder: colors.light.base300,
  inputTextColor: colors.light.baseContent
});

export const darkTheme = create({
  base: 'dark',
  ...shared,

  colorPrimary: colors.dark.primary,
  colorSecondary: colors.dark.secondary,

  appBg: colors.dark.base100,
  appContentBg: colors.dark.base200,
  appPreviewBg: colors.dark.base100,
  appBorderColor: colors.dark.base300,

  textColor: colors.dark.baseContent,
  textInverseColor: colors.dark.base100,
  textMutedColor: colors.dark.neutralSubtle,

  barTextColor: colors.dark.neutralSubtle,
  barSelectedColor: colors.dark.primary,
  barHoverColor: colors.dark.baseContent,
  barBg: colors.dark.base200,

  inputBg: colors.dark.base200,
  inputBorder: colors.dark.base300,
  inputTextColor: colors.dark.baseContent
});
