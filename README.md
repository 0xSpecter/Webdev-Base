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

### Spesial Scripts

| Script                    | Does                                                |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Dev server + Storybook                              |

## Starting a new project

1. Set `name` in `package.json`.
2. Put your domain in `public/CNAME`.
3. Using Firebase? Copy `.example.env` to `.env` and fill in the keys, else delete `app/domain/firebase`.

## Structure

```bash
app/

    components/   One folder per component: .tsx, .module.scss, .stories.tsx
        button/
            Button.tsx
            Button.module.scss
            Button.stories.tsx

    domain/                         Data layer
        firebase/                   Firebase example of a data layer module
            firebase.ts 
            firestore.ts
            mutations.ts
            queries.ts
            queryKeys.ts
            types.ts
            utils.ts
            index.ts
        index.ts
        utils.ts

    hooks/                          Hooks

    i18n/                           i18next setup and locales (en, nb)

    layouts/                        Layouts that wrap pages

    routes/                         One folder per route
        home/
            home.tsx                
            home.module.scss

    routes.ts                       Route config

    root.tsx                        HTML shell, fonts, error boundary

    theme.scss                      Colors and fonts as CSS variables

    _constants.scss                 Sass variables
```

`~/` is an alias for `app/`.

## How things work

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
