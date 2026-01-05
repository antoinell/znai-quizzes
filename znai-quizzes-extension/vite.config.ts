
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: 'src/ZnaiCounterComponentRegistration.ts',
            name: 'ZnaiQuizzesExtension',
            fileName: 'znai-quizzes-extension',
            formats: ['es'] // Force ES module format
        },
        rollupOptions: {
            // Externalize React - don't bundle it
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                },
                format: 'es' // Ensure ES module output
            }
        },
        target: 'es2015',
        minify: false // For easier debugging
    }
})