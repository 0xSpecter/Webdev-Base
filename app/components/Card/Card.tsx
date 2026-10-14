import type { ReactNode } from "react";
import styles from "./Card.module.scss";
import { classNames, type Styling } from "~/style";

export type CardStyling = Pick<Styling, "variant" | "color" | "rounded" | "shadow">;

interface CardProps {
	children?: ReactNode,
	className?: string,
	styling?: CardStyling,
}

export default function Card({
	children,
	className = "",
	styling = {
		variant: 'border',
		color: 'default',
		rounded: 'rounded',
		shadow: 'flat',
	},
}: CardProps) {
	return (
		<div className={classNames(styles, styling, styles.card, className)}>
			{children}
		</div>
	);
}
