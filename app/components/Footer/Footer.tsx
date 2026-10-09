import styles from "./Footer.module.scss";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();
	return (
		<footer className={styles.footer}>
			<p>&copy; {new Date().getFullYear()} {t("common.brand")}</p>
		</footer>
	);
}
