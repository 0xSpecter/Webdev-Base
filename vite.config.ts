/// <reference types="vitest/config" />
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = import.meta.dirname;

export default defineConfig({
	// The React Router plugin breaks the Storybook tests, which run through Vitest.
	plugins: [!process.env.VITEST && reactRouter()],
	base: '/',
	resolve: {
		tsconfigPaths: true
	},
	css: {
		preprocessorOptions: {
			scss: {
				loadPaths: [path.join(dirname, 'app')]
			}
		}
	},
	server: {
		port: 3000
	},
	test: {
		projects: [{
			extends: true,
			plugins: [
				storybookTest({
					configDir: path.join(dirname, '.storybook')
				})],
			test: {
				name: 'storybook',
				browser: {
					enabled: true,
					headless: true,
					provider: playwright({}),
					instances: [{
						browser: 'chromium'
					}]
				}
			}
		}]
	}
});
