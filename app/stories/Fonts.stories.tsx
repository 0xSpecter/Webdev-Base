import type { Meta, StoryObj } from "@storybook/react-vite";
import styles from "./Fonts.module.scss";

// Remember to sync
const fonts = [
	{ name: "Roboto Mono", variable: "--font" },
	{ name: "Courier Prime", variable: "--font-paragraph" },
	{ name: "Bebas Neue", variable: "--font-header" },
	{ name: "JetBrains Mono", variable: "--font-code" },
	{ name: "Datatype", variable: "--font-data" },
	{ name: "Comic Relief", variable: "--font-comic" },
	{ name: "VT323", variable: "--font-pixel" },
	{ name: "Kode Mono", variable: "--font-kode" },
	{ name: "Bytesized", variable: "--font-byte" },
];

const glyphSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ abcdefghijklmnopqrstuvwxyzæøå 0123456789 !?&@#%()[]{}";

interface FontsProps {
	text: string,
	size: number,
	weight: number,
	glyphs: boolean,
}

function Fonts({ text, size, weight, glyphs }: FontsProps) {
	return (
		<div className={styles.fonts}>
			{fonts.map(({ name, variable }) => (
				<section key={variable} className={styles.font}>
					<header className={styles.header}>
						<h2 className={styles.name}>{name}</h2>
						<code className={styles.variable}>var({variable})</code>
					</header>
					<div style={{ fontFamily: `var(${variable})` }}>
						<p className={styles.sample} style={{ fontSize: `${size}rem`, fontWeight: weight }}>
							{text}
						</p>
						{glyphs && (
							<p className={styles.glyphs}>{glyphSet}</p>
						)}
					</div>
				</section>
			))}
		</div>
	);
}

const meta = {
	title: "Theme/Fonts",
	component: Fonts,
	args: {
		text: "The quick brown fox jumps over the lazy dog",
		size: 2,
		weight: 400,
		glyphs: true,
	},
	argTypes: {
		size: {
			control: { type: "range", min: 0.75, max: 6, step: 0.25 },
		},
		weight: {
			control: { type: "range", min: 100, max: 900, step: 100 },
		},
	},
} satisfies Meta<typeof Fonts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Norwegian: Story = {
	args: {
		text: "Vår sære Zulu fra badeøya spilte jo whist og quickstep i min taxi",
	}
};

export const Small: Story = {
	args: {
		size: 1,
		glyphs: false,
	}
};

export const Bold: Story = {
	args: {
		weight: 700,
	}
};
