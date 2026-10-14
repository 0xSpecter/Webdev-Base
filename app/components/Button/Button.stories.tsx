import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";
import { stylingArgTypes, type StylingArgs, collectStyle } from "~/stories/styling";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Button",
		variant: "filled",
		color: "primary",
		size: "md",
		rounded: "rounded",
		font: "mono",
		weight: "normal",
		slant: "upright",
		shadow: "flat",
	},
	argTypes: {
		...stylingArgTypes,
		onClick: { action: "clicked" },
	},
	render: ({ variant, color, size, rounded, font, weight, slant, shadow, ...props }) => (
		<Button {...props} styling={collectStyle(variant, color, size, rounded, font, weight, slant, shadow)} />
	),
} satisfies Meta<StylingArgs<typeof Button>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
