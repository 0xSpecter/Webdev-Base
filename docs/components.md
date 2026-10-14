# Components

Each component gets its own folder in `app/components/` with three files:

```text
app/components/Tag/
├── Tag.tsx           # The component
├── Tag.module.scss   # Its styles
└── Tag.stories.tsx   # Its Storybook stories
```

The example below is a `Tag` that supports variant, color, size, rounded and font. See [styling.md](styling.md) for how the styling system works.

## Tag.tsx

```tsx
import type { ReactNode } from "react";
import styles from "./Tag.module.scss";
import { stylingClassNames, type Styling } from "~/style";

// The styling options Tag supports. Exported for the story.
export type TagStyling = Pick<Styling, "variant" | "color" | "size" | "rounded" | "font">;

interface TagProps {
	children?: ReactNode,
	className?: string,
	styling?: TagStyling,
}

export default function Tag({
	children,
	className = "",
	styling = {
		variant: 'filled',
		color: 'primary',
		size: 'sm',
		rounded: 'pill',
		font: 'mono',
	},
}: TagProps) {
	return (
		<span className={`${styles.tag} ${stylingClassNames(styles, styling)} ${className}`}>
			{children}
		</span>
	);
}
```

- Use `Pick` to choose which options the component supports. Then TypeScript rejects an option the stylesheet doesn't handle.
- Put `styles.tag` (the root class) and the styling classes on the **same element**. The mixins generate `.tag.styling-*`, which only matches when both classes are on one element.
- Put `className` last so callers can add their own classes.
- `classNames(styles, styling, styles.tag, className)` from `~/style` is shorthand for the same string.

## Tag.module.scss

```scss
@use "constants" as *;
@use "sass:map";

.tag {
  display: inline-flex;
  align-items: center;
  border: 1px solid;
  line-height: 1;

  // Shared behavior: colors, variants, corners, fonts.
  @include basic-colors;
  @include basic-variants;
  @include basic-rounded;
  @include basic-texts;

  // Custom: padding grows with the font size.
  @include sizes using ($key) {
    font-size: map.get($size-map, $key);
    padding: calc(map.get($size-map, $key) * 0.25) calc(map.get($size-map, $key) * 0.6);
  }
}
```

- Every `@include` goes inside `.tag`. At the top level, the generated `&` makes invalid CSS.
- `border: 1px solid` provides the width and style. `basic-variants` provides only the border color.
- Use a basic when it does what you need. For anything else, use the option mixin (`sizes`, `colors`…) with a `using ($key)` block and look values up in the maps.
- `@use "constants" as *` brings in the styling mixins too, because `_constants.scss` forwards `_style.scss`. Add `@use "sass:map"` only if you call `map.get` yourself.

## Tag.stories.tsx

```tsx
import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Tag, { type TagStyling } from "./Tag";
import { getStylingArgTypes } from "~/stories/styling";

// Story args are the component props plus each styling option as a flat arg.
type TagArgs = ComponentProps<typeof Tag> & TagStyling;

const meta = {
	title: "Components/Tag",
	component: Tag,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Tag",
		variant: "filled",
		color: "primary",
		size: "sm",
		rounded: "pill",
		font: "mono",
	},
	argTypes: getStylingArgTypes("variant", "color", "size", "rounded", "font"),
	render: ({ variant, color, size, rounded, font, ...props }) => {
		const styling: TagStyling = { variant, color, size, rounded, font };
		return <Tag {...props} styling={styling} />;
	},
} satisfies Meta<TagArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = {
	args: {
		variant: "outline",
		color: "accent",
	},
};
```

- Pass `getStylingArgTypes` the same options as the `Pick` in `Tag.tsx`. Then the controls match what the component supports, and the raw `styling` prop stays hidden.
- Use the same defaults in `args` as in the component, so the story starts out looking like the real thing.
- `render` takes the flat args, puts them back together as `styling`, and passes everything else through.

## Checklist

- [ ] `Pick<Styling, …>` in the `.tsx`, the mixins in the `.scss`, and `getStylingArgTypes(…)` in the stories all list the same options.
- [ ] The root class and `stylingClassNames(…)` are on the same element.
- [ ] Every mixin is included inside the root class.
- [ ] Spacing, durations and z-index use the tokens from `theme.scss`; focus and hover use `focus-ring` / `hover-overlay`.
- [ ] The defaults match in the component and the story `args`.
