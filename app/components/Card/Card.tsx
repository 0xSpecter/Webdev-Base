import type { ReactNode } from "react";
import styles from "./Card.module.scss";
import { createCN, type Styling } from "~/utils";

interface CardProps {
	children?: ReactNode,
	className?: string,
	styling?: Styling,
}

export default function Card({
	children,
	className = "",
	styling = {
		variant: 'border',
		color: 'default',
		size: 'md',
		rounded: 'rounded',
	},
}: CardProps) {
	return (
		<div className={`${styles.card} ${createCN(styles, styling)} ${className}`}>
			{children}
		</div>
	);
}
