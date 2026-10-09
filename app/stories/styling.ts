import type { ComponentProps, JSXElementConstructor } from "react";
import { colors, roundeds, sizes, style, variants, type Styling, type Variant, type Color, type Rounded, type Size } from "~/utils";

// Magic
export type StylingArgs<C extends JSXElementConstructor<any>> = ComponentProps<C> & Styling;

// Radio buttons
export const stylingArgTypes = {
	variant: { control: "inline-radio", options: variants },
	color: { control: "inline-radio", options: colors },
	size: { control: "inline-radio", options: sizes },
	rounded: { control: "inline-radio", options: roundeds },
	styling: { table: { disable: true } },
} as const;

export const stylingArgs = style;

// Collects into styling prop
export function collectStyle(
	variant: Variant,
	color: Color,
	size: Size,
	rounded: Rounded,
): Styling {
	return { variant, color, size, rounded }
}
