# Base

A base for web dev projects, integrated with my most used toolsets.

## Develop

```bash
npm install
npm run dev
```

`npm run dev` uses concurrently to run both the dev server and Storybook.

| What      | Where                   |
| --------- | ----------------------- |
| Page      | `http://localhost:3000` |
| Storybook | `http://localhost:6006` |

### Scripts

| Script                    | Does                                                |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Dev server + Storybook                              |
| `npm run storybook`       | Storybook only                                      |
| `npm run typecheck`       | Generates route types, then runs `tsc`              |
| `npm run build`           | Builds the static site to `build/client`            |
| `npm run start`           | Serves the built site on port 3000                  |
| `npm run build-storybook` | Builds Storybook to `storybook-static`              |

## Starting a new project

1. Set `name` in `package.json`.
2. Set `common.brand` in `app/i18n/locales/*.json` (shown in the navbar and footer).
3. Replace the placeholder links in `app/components/Navbar/Navbar.tsx`.
4. Put your domain in `public/CNAME`, or delete the file if you don't use a custom domain.
5. Adjust the colors and fonts in `app/theme.scss`, and trim the font list in `app/root.tsx` to the ones you use.
6. Using Firebase? Copy `.example.env` to `.env` and fill in the keys. Not using it? Delete `app/domain/firebase` and `app/providers`.

## Structure

```
app/
  components/   One folder per component: .tsx, .module.scss, .stories.tsx
  domain/       Data layer (Firebase setup, queries, mutations)
  hooks/        useTheme, useLocalStorageItem
  i18n/         i18next setup and locales (en, nb)
  layouts/      Navbar + page + footer shell
  routes/       One folder per route
  routes.ts     Route config
  root.tsx      HTML shell, fonts, error boundary
  theme.scss    Colors and fonts as CSS variables
  _constants.scss  Sass variables and the `phone` breakpoint mixin
```

`~/` is an alias for `app/`.

## How things work

### Theme

Colors are CSS variables in `app/theme.scss`: `:root` holds the light theme, `:root.dark` overrides only the values that differ. `useTheme` puts `light` or `dark` on `<html>`, saves the choice in `localStorage`, and falls back to the system preference. Storybook's theme switcher uses the same classes.

### Translations

Add keys to `en.json` first — the `t()` key types are generated from it — then add the same keys to `nb.json`. The chosen language is saved in `localStorage`.

### Pages

Add a file under `app/routes/`, register it in `app/routes.ts`, and wrap its content in `<Page>` to get the navbar spacing and the fade transition.

## Tech

### Always

- [React Router](https://reactrouter.com) (v8, Framework, CSR) + [Vite](https://vite.dev/).
- [TypeScript](https://www.typescriptlang.org) Makes you not have to guess types.
- [SCSS](https://sass-lang.com) Better CSS, used as CSS modules.
- [TanStack Query](https://tanstack.com/query) for data parity and caching.
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) Forms and validation.
- [Motion](https://motion.dev) Easier and better animations.
- [i18next](https://www.i18next.com) Translations (English and Norwegian).
- [Storybook](https://storybook.js.org) Build and check components in isolation, with a11y checks and [Vitest](https://vitest.dev) story tests.

### Maybe

- [Firebase](https://firebase.google.com) Db and maybe auth.
