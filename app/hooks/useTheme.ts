import { useEffect, useState } from "react";

const THEME_KEY = "theme";
type Theme = "light" | "dark";

/**
*  Reads what is defined in the document classList, localstorage and preferance
*/
function readTheme(): Theme {
	if (typeof window === "undefined" || typeof document === "undefined") {
		return "dark";
	}

	if (document.documentElement.classList.contains("dark")) return "dark";
	if (document.documentElement.classList.contains("light")) return "light";

	const savedTheme = localStorage.getItem(THEME_KEY);
	if (savedTheme === "light" || savedTheme === "dark") return savedTheme;

	const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
	return prefersLight ? "light" : "dark";
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(readTheme);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
		document.documentElement.classList.toggle("light", theme === "light");
	}, [theme]);

	// add observer
	useEffect(() => {
		const root = document.documentElement;
		const observer = new MutationObserver(() => setTheme(readTheme()));
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	const applyTheme = (next: Theme) => {
		localStorage.setItem(THEME_KEY, next);
		setTheme(next);
	};

	const toggleTheme = () => applyTheme(theme === "dark" ? "light" : "dark");

	return { theme, setTheme: applyTheme, toggleTheme };
}
