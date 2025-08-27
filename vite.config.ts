import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404'],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',
			},
		}),
	],
	base: '/',
	build: {
		outDir: 'dist'
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		}
	}
});
