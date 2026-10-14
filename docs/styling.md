# Styling

Components share one set of styling options: variant, color, size and so on. A component picks the options it supports. The user chooses values through a `styling` prop, which becomes prefixed CSS classes, and Sass mixins turn those classes into CSS.

| File                     | Holds                                                         |
|--------------------------|---------------------------------------------------------------|
| `app/style.ts`           | Option lists, types, `Styling`, `stylingClassNames`           |
| `app/_style.scss`        | The same lists as Sass, value maps, and the mixins            |
| `app/_constants.scss`    | Layout constants; `@forward`s `_style.scss`                   |
| `app/theme.scss`         | The CSS variables the maps point at (`--primary`, `--font`…)  |
| `app/stories/styling.ts` | Storybook controls for the options                            |

## Options

| Option    | Keys                                                                      |
|-----------|---------------------------------------------------------------------------|
| `variant` | `filled`, `border`, `outline`, `ghost`                                    |
| `color`   | `default`, `primary`, `secondary`, `tertiary`, `accent`, `error`          |
| `size`    | `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`                               |
| `rounded` | `rounded`, `sharp`, `pill`                                                |
| `font`    | `mono`, `paragraph`, `header`, `code`, `data`, `comic`, `pixel`, `kode`, `byte` |
| `weight`  | `light`, `normal`, `medium`, `semibold`, `bold`, `verybold`               |
| `slant`   | `upright`, `italic`                                                       |
| `shadow`  | `flat`, `soft`, `raised`, `floating`, `sunken`                            |

Variants:

- `filled`: colored background, no border.
- `border`: surface background with a colored border.
- `outline`: no background, colored border.
- `ghost`: no background, no border.

## How it fits together

1. A component accepts `styling`, for example `{ variant: 'border', color: 'primary' }`.
2. `stylingClassNames(styles, styling)` turns each value into its CSS module class: `styling-border`, `styling-primary`. Missing classes are skipped.
3. In the component's `.module.scss`, the mixins output a rule for every key, nested under the root class: `.card.styling-border { … }`.

The `styling-` prefix keeps these classes from clashing with the component's own classes, such as `.content` or `.default`. It's defined twice, as `stylingPrefix` in `style.ts` and as `$styling-prefix` in `_style.scss`, and the two must match.

## Keeping the lists in sync

The keys are written twice: once as the arrays in `style.ts` (used for types and Storybook controls), and once as the `$*_keys` lists in `_style.scss` (used to generate classes). Nothing checks that they match. If you add a key, add it in:

1. the array in `style.ts`
2. the `$*_keys` list in `_style.scss`
3. every map for that option in `_style.scss`

Errors here are silent:

- **A key missing from the Sass list:** no class is generated, so choosing that value does nothing.
- **A key missing from a map:** `map.get` returns null, Sass drops the declaration, and the class comes out empty.

## Mixins

All mixins go **inside the component's root class**. They generate `&.styling-<key>`, and at the top level of a file that `&` produces invalid CSS.

### Basics

Basics set the usual property for an option.

| Mixin            | Sets                                                     |
|------------------|----------------------------------------------------------|
| `basic-colors`   | `--color` and `--on-color`                               |
| `basic-variants` | `background`, `border-color` and `color`, using `--color` / `--on-color` |
| `basic-rounded`  | `border-radius`                                          |
| `basic-sizes`    | `font-size` only; padding is up to the component         |
| `basic-shadows`  | `box-shadow`                                             |
| `basic-texts`    | `font-family`, `font-weight` and `font-style`            |
| `basics`         | All of the above                                         |

`basic-variants` needs `basic-colors` to provide `--color`. It sets only `border-color`, so give the component a border width and style itself, e.g. `border: 2px solid`.

`basic-shadows` sets `box-shadow`, so it replaces any other `box-shadow` on the same element.

### Custom per-key styles

When a basic doesn't fit, use the option mixin with a content block. The block runs once per key, and `$key` holds the current key:

```scss
@use "constants" as *;
@use "sass:map";

.button {
  @include sizes using ($key) {
    font-size: map.get($size-map, $key);
    padding: calc(map.get($size-map, $key) * 0.4) map.get($size-map, $key);
  }
}
```

Option mixins: `variants`, `colors`, `sizes`, `roundeds`, `fonts`, `weights`, `slants`, `shadows`.

To handle a single key differently, branch inside the block (`@if $key == 'default' { … }`) or write a rule for it afterwards.

To generate only some keys, call `classes` directly. Quote each key separately; one quoted string would be a single key:

```scss
.badge {
  @include classes('primary', 'accent') using ($key) {
    background: map.get($color-map, $key);
  }
}
```

### Maps

| Map                         | Key → value                                |
|-----------------------------|--------------------------------------------|
| `$color-map`                | color → `var(--primary)` etc.              |
| `$on-color-map`             | color → text color on top of it            |
| `$size-map`                 | size → font size                           |
| `$rounded-map`              | rounded → border radius                    |
| `$font-map`                 | font → `var(--font-*)`                     |
| `$weight-map`               | weight → numeric weight                    |
| `$slant-map`                | slant → `font-style`                       |
| `$shadow-map`               | shadow → `box-shadow`                      |
| `$variants-background-map`  | variant → background                       |
| `$variants-border-map`      | variant → border color                     |
| `$variants-text-map`        | variant → text color                       |

Custom properties need interpolation, because Sass passes their values through as written:

```scss
--color: #{map.get($color-map, $key)};   // right
--color: map.get($color-map, $key);      // outputs the text "map.get(...)"
```

## Storybook

`app/stories/styling.ts` provides:

- `stylingArgTypes`: a control for every option.
- `getStylingArgTypes(...keys)`: controls for only the listed options, with the raw `styling` prop hidden.
- `collectStyle(...)`: builds a full `Styling` from positional arguments. It's only useful when a component takes every option.

Story args are flat (`variant`, `color`…). The story's `render` gathers them back into the `styling` prop. See [components.md](components.md) for a full example.

## Caveats

- Single-weight fonts (Bebas Neue, Bytesized, VT323) and fonts without an italic get a faked bold or italic from the browser.
- Shadows use black at low opacity, so they're faint on the dark theme.
