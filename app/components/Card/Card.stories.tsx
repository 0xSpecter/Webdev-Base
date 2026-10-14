import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Card, { type CardStyling } from "./Card";
import { getStylingArgTypes } from "~/stories/styling";

type CardArgs = ComponentProps<typeof Card> & CardStyling;

const meta = {
	title: "Components/Card",
	component: Card,
	parameters: {
		layout: "centered",
	},
	args: {
		children: "Card",
		variant: "border",
		color: "default",
		rounded: "rounded",
		shadow: "flat",
	},
	argTypes: getStylingArgTypes("variant", "color", "rounded", "shadow"),
	render: ({ variant, color, rounded, shadow, ...props }) => {
		const styling: CardStyling = { variant, color, rounded, shadow };
		return <Card {...props} styling={styling} />;
	},
} satisfies Meta<CardArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
