import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

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
	],
	base: '/',
	build: {
		outDir: 'dist',
		minify: 'esbuild', // par défaut, esbuild minifie le JS
		cssCodeSplit: true, // sépare le CSS en plusieurs fichiers si possible
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash].[ext]',
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('preact')) return 'preact';
						if (id.includes('preact-iso')) return 'preact-iso';
						if (id.includes('react-icons')) return 'react-icons';
						return 'vendor';
					}
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		}
	}
});
