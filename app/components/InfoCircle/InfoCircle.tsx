import Tooltip from "~/components/Tooltip/Tooltip";
import styles from "./InfoCircle.module.scss";
import { classNames, type Styling } from "~/style";

export type InfoCircleStyling = Pick<Styling, "variant" | "color" | "size" | "shadow">;

interface InfoCircleProps {
	label: string,
	className?: string,
	position?: "top" | "bottom" | "left" | "right",
	styling?: InfoCircleStyling,
}

export default function InfoCircle({
	label,
	className = "",
	position,
	styling = {
		variant: 'outline',
		color: 'default',
		size: 'md',
		shadow: 'flat',
	},
}: InfoCircleProps) {
	return (
		<Tooltip label={label} position={position} className={className}>
			<button type="button"
				className={classNames(styles, styling, styles.infoCircle)}
				aria-label={label}
			>
				<svg className={styles.icon} viewBox="0 0 100 100" aria-hidden="true">
					<line x1="50" y1="27" x2="50" y2="27" />
					<line x1="50" y1="46" x2="50" y2="74" />
				</svg>
			</button>
		</Tooltip>
	);
}
