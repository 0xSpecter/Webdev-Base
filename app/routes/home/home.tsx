import Page from "~/components/Page/Page";
import type { Route } from "./+types/home";
import { useTranslation } from "react-i18next";
import i18n from "~/i18n/i18n";
import styles from "./home.module.scss"

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: i18n.t("home.title") },
		{ name: "description", content: i18n.t("home.description") },
	];
}

export default function Home() {
	const { t } = useTranslation()

	return (
		<Page className={styles.home}>
			<section className={styles.hero}>
				{t("home.hero")}
			</section>
			<section className={styles.content}>
				{t("home.content")}
			</section>
		</Page>
	)
}
