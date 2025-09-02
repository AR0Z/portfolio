import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

import viteImagemin from "vite-plugin-imagemin";


import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

import projects from "./src/locales/projects.json";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		preact({
			prerender: {
				enabled: true,
				renderTarget: '#app',
				additionalPrerenderRoutes: ['/404', ...projects.map(p => `/project/${p.id}`)],
				previewMiddlewareEnabled: true,
				previewMiddlewareFallback: '/404',

			},
		}),
		viteImagemin({
			gifsicle: {
				optimizationLevel: 3, // compression GIF
			},
			optipng: {
				optimizationLevel: 7, // compression PNG
			},
			mozjpeg: {
				quality: 75, // compression JPEG
			},
			pngquant: {
				quality: [0.65, 0.8], // compression PNG adaptative
				speed: 4,
			},
			svgo: {
				plugins: [
					{ name: "removeViewBox" },
					{ name: "removeEmptyAttrs", active: false },
				],
			},
			webp: {
				quality: 75, // conversion en WebP
			}
		}),
	],
	base: '/',
	build: {
		outDir: 'dist',
		minify: 'esbuild',
		cssCodeSplit: true,
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		}
	}
});
