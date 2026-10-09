export const variants = ['filled', 'border', 'outline'] as const;
export const colors = ['default', 'primary', 'secondary', 'tertiary', 'accent'] as const;
export const sizes = ['sm', 'md', 'lg', 'xl', 'xxl'] as const;
export const roundeds = ['rounded', 'sharp'] as const;
// Must not share names with the other lists: createCN looks all values up in the same stylesheet.
export const fonts = ['mono', 'paragraph', 'header', 'code', 'data', 'comic', 'pixel', 'kode', 'byte'] as const;
export const weights = ['normal', 'bold'] as const;
export const slants = ['upright', 'italic'] as const;

export type Variant = (typeof variants)[number];
export type Color = (typeof colors)[number];
export type Size = (typeof sizes)[number];
export type Rounded = (typeof roundeds)[number];
export type Font = (typeof fonts)[number];
export type Weight = (typeof weights)[number];
export type Slant = (typeof slants)[number];

export interface Styling {
	variant: Variant,
	color: Color,
	size: Size,
	rounded: Rounded,
	font: Font,
	weight: Weight,
	slant: Slant,
}

export function style(
	variant: Variant = 'filled',
	color: Color = 'primary',
	size: Size = 'md',
	rounded: Rounded = 'rounded',
	font: Font = 'mono',
	weight: Weight = 'normal',
	slant: Slant = 'upright',
): Styling {
	return {
		variant,
		color,
		size,
		rounded,
		font,
		weight,
		slant
	}
}

export function createCN(styles: CSSModuleClasses, style: Styling) {
	return Object.values(style).map(item => styles[item]).join(" ");
}
