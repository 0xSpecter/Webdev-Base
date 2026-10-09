import { motion } from "motion/react"
import type { ReactNode } from "react";
import styles from "./Button.module.scss";
import { createCN, style, type Styling } from "~/utils";

interface ButtonProps {
	children?: ReactNode,
	className?: string,
	onClick?: () => void,
	disabled?: boolean,
	type?: 'button' | 'submit';
	styling?: Styling,
}

const variants = {
	"hover": {
		scale: 1.05,
	},
	"tap": {
		scale: 0.97,
	}
}

export default function Button({
	children,
	className = "",
	onClick,
	disabled,
	type = "button",
	styling = style(),
}: ButtonProps) {
	return (
		<motion.button type={type}
			className={`${styles.button} ${createCN(styles, styling)} ${className}`}
			variants={variants}
			whileHover={disabled ? undefined : "hover"}
			whileTap={disabled ? undefined : "tap"}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</motion.button>
	);
}
