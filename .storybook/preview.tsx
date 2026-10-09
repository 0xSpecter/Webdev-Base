import type { Preview } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../app/app.scss'
import '../app/i18n/i18n'
import { fontsHref } from '../app/fonts'

// The app loads its fonts through root.tsx, which Storybook never renders.
if (!document.querySelector(`link[href="${fontsHref}"]`)) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = fontsHref
  document.head.appendChild(link)
}

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;