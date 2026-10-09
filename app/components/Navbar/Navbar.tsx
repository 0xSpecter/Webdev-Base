import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import ThemeToggle from "~/components/ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.scss";
import Language from "../Language/Language";

export default function Navbar() {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<nav className={styles.navbar}>
			<Link to="/" className={styles.brand} onClick={close}>{t("common.brand")}</Link>
			<Language />
			<ThemeToggle />
			<button className={styles.menu}
				type="button"
				onClick={() => setOpen(v => !v)}
				aria-expanded={open}
				aria-label={t("navbar.menu")}
			>
				☰
			</button>
			<ul className={`${styles.links} ${open ? styles.open : ""}`}>
				<li>
					<Link to="/" className={styles.link} onClick={close}>
						{t("navbar.nowhere")}
					</Link>
				</li>
				<li>
					<Link to="/" className={styles.link} onClick={close}>
						{t("navbar.nowhere")}
					</Link>
				</li>
			</ul>
		</nav>
	);
}
