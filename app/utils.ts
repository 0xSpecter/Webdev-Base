export const variants = ['filled', 'border', 'outline'] as const;
export const colors = ['default', 'primary', 'secondary', 'tertiary', 'accent'] as const;
export const sizes = ['sm', 'md', 'lg', 'xl', 'xxl'] as const;
export const roundeds = ['rounded', 'sharp'] as const;

export type Variant = (typeof variants)[number];
export type Color = (typeof colors)[number];
export type Size = (typeof sizes)[number];
export type Rounded = (typeof roundeds)[number];

export interface Styling {
	variant: Variant,
	color: Color,
	size: Size,
	rounded: Rounded,
}

export function style(
	variant: Variant = 'filled',
	color: Color = 'primary',
	size: Size = 'md',
	rounded: Rounded = 'rounded',
): Styling {
	return {
		variant,
		color,
		size,
		rounded
	}
}

export function createCN(styles: CSSModuleClasses, style: Styling) {
	return Object.values(style).map(item => styles[item]).join(" ");
}
