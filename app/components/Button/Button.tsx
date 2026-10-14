import { motion } from "motion/react"
import type { ReactNode } from "react";
import styles from "./Button.module.scss";
import { classNames, type Styling } from "~/style";

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
	styling = {
		variant: 'filled',
		color: 'primary',
		size: 'md',
		rounded: 'rounded',
	},
}: ButtonProps) {
	return (
		<motion.button type={type}
			className={classNames(styles, styling, styles.button, className)}
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
