import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: './',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                cadastro: resolve(__dirname, 'cadastro.html'),
                login: resolve(__dirname, 'login.html'),
                dashboard: resolve(__dirname, 'dashboard.html'),
                calcIMC: resolve(__dirname, 'calcIMC.html'),
            },
        },
    },
    server: {
        port: 3000,
        open: true,
    },
});
