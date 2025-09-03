import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

import { ViteImageOptimizer } from "vite-plugin-image-optimizer";


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
		ViteImageOptimizer({
			// PNG -> Sharp est bien plus rapide que optipng/pngquant
			png: {
				quality: 80, // bon équilibre poids/qualité
				compressionLevel: 9, // max compression
			},
			// JPEG -> équivalent de mozjpeg mais via Sharp
			jpeg: {
				quality: 75,
				progressive: true, // progressive JPEG pour affichage progressif
				mozjpeg: true,     // active la compression de type mozjpeg
			},
			// WebP
			webp: {
				quality: 75,
			},
			// AVIF (format plus récent que WebP, encore plus léger)
			avif: {
				quality: 60,
			},
			// SVG -> optimisation via SVGO
			svg: {
				multipass: true,
				plugins: [
					{ name: "removeViewBox", active: false }, // garde le viewBox pour responsivité
					{ name: "removeEmptyAttrs", active: true },
					{ name: "removeDimensions", active: true }, // évite les width/height fixes
				],
			},
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
