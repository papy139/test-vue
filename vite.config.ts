import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
            '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
            '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
            '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
        },
    },
})
