import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

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
			"@": path.resolve(new URL("./src", import.meta.url).pathname)
		}
	}
});
