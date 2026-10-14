import type { ComponentProps, JSXElementConstructor } from "react";
import { colors, fonts, roundeds, sizes, slants, shadows, variants, weights, type Styling, type Variant, type Color, type Rounded, type Size, type Font, type Weight, type Slant, type Shadow } from "~/style";

// Magic
export type StylingArgs<C extends JSXElementConstructor<any>> = ComponentProps<C> & Styling;

// Radio buttons
export const stylingArgTypes = {
	variant: { control: "inline-radio", options: variants },
	color: { control: "inline-radio", options: colors },
	size: { control: "inline-radio", options: sizes },
	rounded: { control: "inline-radio", options: roundeds },
	font: { control: "select", options: fonts },
	weight: { control: "inline-radio", options: weights },
	slant: { control: "inline-radio", options: slants },
	shadow: { control: "inline-radio", options: shadows },
	styling: { table: { disable: true } },
} as const;

// Filter controls by only the used properties.
// K gets set to a partial string enum of styling when values are passed 
// its then used to filter controls and redeclair type for hinting.
export function getStylingArgTypes<K extends keyof Styling>(...properties: K[]) {
	const picked = Object.fromEntries(
		properties.map(key => [key, stylingArgTypes[key]])
	) as Pick<typeof stylingArgTypes, K>;

	return { ...picked, styling: stylingArgTypes.styling };
}

// Collects into styling prop
export function collectStyle(
	variant?: Variant,
	color?: Color,
	size?: Size,
	rounded?: Rounded,
	font?: Font,
	weight?: Weight,
	slant?: Slant,
	shadow?: Shadow,
): Styling {
	return { variant, color, size, rounded, font, weight, slant, shadow }
}
