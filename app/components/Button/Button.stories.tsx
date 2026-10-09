import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";
import { stylingArgs, stylingArgTypes, type StylingArgs, collectStyle } from "~/stories/styling";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Button",
		...stylingArgs(),
	},
	argTypes: {
		...stylingArgTypes,
		onClick: { action: "clicked" },
	},
	render: ({ variant, color, size, rounded, font, weight, slant, ...props }) => (
		<Button {...props} styling={collectStyle(variant, color, size, rounded, font, weight, slant)} />
	),
} satisfies Meta<StylingArgs<typeof Button>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
