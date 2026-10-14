import type { ReactNode } from "react";
import styles from "./Card.module.scss";
import { stylingClassNames, type Styling } from "~/style";

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
		<div className={`${styles.card} ${stylingClassNames(styles, styling)} ${className}`}>
			{children}
		</div>
	);
}
