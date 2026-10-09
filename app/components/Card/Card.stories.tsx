import type { Meta, StoryObj } from "@storybook/react-vite";
import Card from "./Card";
import { stylingArgs, stylingArgTypes, type StylingArgs, collectStyle } from "~/stories/styling";

const meta = {
	title: "Components/Card",
	component: Card,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Card",
		...stylingArgs("border", "default"),
	},
	argTypes: {
		...stylingArgTypes,
	},
	render: ({ variant, color, size, rounded, font, weight, slant, ...props }) => (
		<Card {...props} styling={collectStyle(variant, color, size, rounded, font, weight, slant)} />
	),
} satisfies Meta<StylingArgs<typeof Card>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
