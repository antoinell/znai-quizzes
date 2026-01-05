import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'



// https://vite.dev/config/
export default defineConfig({
        plugins: [react()],
        build: {
            target: ['es2020', 'chrome87', 'firefox78', 'safari14'],
            lib: {
                entry: './src/main.tsx',
                name: 'ZnaiQuizzesExtension',
                formats: ['es']
            },
            rolldownOptions: {
                jsx: {
                    mode: 'automatic'
                },
                preserveEntrySignatures: 'strict',
                external: ['react', 'react-dom', 'znai-components'],
            }
        },
        define: {
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env': JSON.stringify({}),
            'global': 'globalThis',
        },
    resolve: {
        dedupe: ['react', 'react-dom'],
        alias: {
                // Only for development - fallback to local copy
                ...(process.env.NODE_ENV === 'development' && {
                    'znai-components': resolve(__dirname, 'public/znai-components.es.js')
                })
            }
        }

    }
)
