// _style.scss is source of truth, arrays are the source of truth for types.
// Remember to keep in sync with _styles.scss.
export const variants = ['filled', 'border', 'outline', 'ghost'] as const;
export const colors = ['default', 'primary', 'secondary', 'tertiary', 'accent', 'error'] as const;
export const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] as const;
export const roundeds = ['rounded', 'sharp', 'pill'] as const;
export const fonts = ['mono', 'paragraph', 'header', 'code', 'data', 'comic', 'pixel', 'kode', 'byte'] as const;
export const weights = ['light', 'normal', 'medium', 'semibold', 'bold', 'verybold'] as const;
export const slants = ['upright', 'italic'] as const;
export const shadows = ['flat', 'soft', 'raised', 'floating', 'sunken'] as const;

export type Variant = (typeof variants)[number];
export type Color = (typeof colors)[number];
export type Size = (typeof sizes)[number];
export type Rounded = (typeof roundeds)[number];
export type Font = (typeof fonts)[number];
export type Weight = (typeof weights)[number];
export type Slant = (typeof slants)[number];
export type Shadow = (typeof shadows)[number];

export interface Styling {
	variant?: Variant,
	color?: Color,
	size?: Size,
	rounded?: Rounded,
	font?: Font,
	weight?: Weight,
	slant?: Slant,
	shadow?: Shadow,
}

// Prefixed so styling classes never collide with a component's own classes. Must match $styling-prefix in _style.scss.
export const stylingPrefix = 'styling-';

export function stylingClassNames(styles: CSSModuleClasses, style: Partial<Styling>) {
	return Object.values(style)
		.map(item => styles[stylingPrefix + item])
		.filter(Boolean)
		.join(" ");
}
