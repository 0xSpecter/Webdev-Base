# Base

A base for web dev projects, integrated with my most used toolsets.

## Develop

```bash
npm install
npm run dev
```

`npm run dev` uses concurrently to run both the dev server and Storybook.

| What      | Where                   |
|-----------|-------------------------|
| Page      | `http://localhost:3000` |
| Storybook | `http://localhost:6006` |

### Spesial Scripts

| Script                    | Does                              |
|---------------------------|-----------------------------------|
| `npm run dev`             | Dev server + Storybook            |

## Starting a new project

1. Set `name` in `package.json`.
2. Put your domain in `public/CNAME`.
3. Using Firebase? Copy `.example.env` to `.env` and fill
in the keys, else delete `app/domain/firebase`.

## Structure

```text
.
├── .storybook/
│   ├── main.ts                     # Storybook config and addons
│   └── preview.tsx                 # Global decorators, themes, fonts
│
├── app/
│   ├── components/                 # One folder per component: .tsx,
                                    # .module.scss, .stories.tsx
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.scss
│   │   │   └── Button.stories.tsx
│   │   │
│   │   ├── Card/
│   │   ├── Footer/
│   │   ├── InfoCircle/
│   │   ├── Language/
│   │   ├── Navbar/
│   │   ├── Page/
│   │   ├── ThemeToggle/
│   │   └── Tooltip/
│   │
│   ├── domain/                     # Data layer
│   │   └── firebase/               # Firebase example of a data layer module
│   │       ├── firebase.ts         # App init from env keys
│   │       ├── firestore.ts        # Firestore reads and writes
│   │       ├── mutations.ts        # TanStack mutations
│   │       ├── queries.ts          # TanStack queries
│   │       ├── queryKeys.ts
│   │       ├── types.ts
│   │       └── utils.ts
│   │
│   ├── hooks/                      # Hooks
│   │   ├── useLocalStorageItem.ts
│   │   └── useTheme.ts
│   │
│   ├── i18n/                       # i18next setup and locales
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   └── nb.json
│   │   │
│   │   ├── i18n.ts
│   │   └── i18next.d.ts
│   │
│   ├── layouts/                    # Layouts that wrap pages
│   │   ├── layout.tsx
│   │   └── layout.module.scss
│   │
│   ├── providers/
│   │   └── Provider.tsx            # Context provider
│   │
│   ├── routes/                     # One folder per route
│   │   └── home/
│   │       ├── home.tsx
│   │       └── home.module.scss
│   │
│   ├── stories/                    # Component independent stories
│   │   ├── Fonts.stories.tsx
│   │   ├── Fonts.module.scss
│   │   └── styling.ts              # Shared styling args for stories
│   │
│   ├── _constants.scss             # Sass variables
│   ├── app.scss                    # Global styles
│   ├── fonts.ts                    # Font URL shared by root.tsx and Storybook
│   ├── root.tsx                    # HTML shell, fonts, error boundary
│   ├── root.module.scss
│   ├── routes.ts                   # Route config
│   ├── theme.scss                  # Colors and fonts as CSS variables
│   └── utils.ts                    # Styling props: variants, colors, sizes, fonts
│
├── public/
│   ├── CNAME                       # Your domain
│   └── favicon.ico
│
├── .example.env                    # Firebase keys template
├── package.json
├── react-router.config.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.shims.d.ts
```

`~/` is an alias for `app/`.

## How things work

### Pages

Add a file under `app/routes/`, register it in `app/routes.ts`,
and wrap its content in `<Page>` to get the navbar
spacing and the fade transition.

## Tech

### Boilerplate

- [React Router](https://reactrouter.com) (v8, Framework, CSR) + [Vite](https://vite.dev/).
- [TypeScript](https://www.typescriptlang.org) Makes you not have to guess types.
- [SCSS](https://sass-lang.com) Better CSS, used as CSS modules.
- [TanStack Query](https://tanstack.com/query) for data parity and caching.
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) Forms
and validation.
- [Motion](https://motion.dev) Easier and better animations.
- [i18next](https://www.i18next.com) Translations (English and Norwegian).
- [Storybook](https://storybook.js.org) Build and check components in isolation,
with a11y checks and [Vitest](https://vitest.dev) story tests.

### Extensions

- [Firebase](https://firebase.google.com) easy all in one backend package.
