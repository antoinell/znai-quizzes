import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
        plugins: [react()],
        build: {
            lib: {
                entry: './src/main.tsx',
                name: 'ZnaiQuizzesExtension',
                formats: ['es']
            },
            rolldownOptions: {
                external: ['react', 'react-dom'],
            }
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env': JSON.stringify({}),
            'global': 'globalThis',
        }
    }
)
