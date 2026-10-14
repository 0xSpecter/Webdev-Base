import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoCircle, { type InfoCircleStyling } from "./InfoCircle";
import { getStylingArgTypes } from "~/stories/styling";

type InfoCircleArgs = ComponentProps<typeof InfoCircle> & InfoCircleStyling;

const meta = {
	title: "Components/InfoCircle",
	component: InfoCircle,
	parameters: {
		layout: "centered",
	},
	args: {
		label: "Some helpful info",
		variant: "outline",
		color: "default",
		size: "md",
		shadow: "flat",
	},
	argTypes: getStylingArgTypes("variant", "color", "size", "shadow"),
	render: ({ variant, color, size, shadow, ...props }) => {
		const styling: InfoCircleStyling = { variant, color, size, shadow };
		return <InfoCircle {...props} styling={styling} />;
	},
} satisfies Meta<InfoCircleArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
	args: {
		size: "sm",
	}
};

export const Large: Story = {
	args: {
		size: "lg",
	}
};

export const Filled: Story = {
	args: {
		variant: "filled",
		color: "primary",
	}
};
