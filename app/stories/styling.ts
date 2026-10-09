import type { ComponentProps, JSXElementConstructor } from "react";
import { colors, fonts, roundeds, sizes, slants, style, variants, weights, type Styling, type Variant, type Color, type Rounded, type Size, type Font, type Weight, type Slant } from "~/utils";

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
	styling: { table: { disable: true } },
} as const;

export const stylingArgs = style;

// Collects into styling prop
export function collectStyle(
	variant: Variant,
	color: Color,
	size: Size,
	rounded: Rounded,
	font: Font,
	weight: Weight,
	slant: Slant,
): Styling {
	return { variant, color, size, rounded, font, weight, slant }
}
