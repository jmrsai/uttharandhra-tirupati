import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      port: 9000,
      host: '0.0.0.0',
    },
    plugins: [
      react({
        babel: {
          plugins: [
            // Ensure JSX transform is correctly configured
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          ],
        },
      }),
    ],
    define: {
      // Vite automatically makes VITE_* variables available in `import.meta.env`.
      // The define for Supabase variables is not needed as the code uses `import.meta.env`.
      // For other variables like GEMINI_API_KEY, this is one way to expose them.
      // A recommended approach is to prefix them with VITE_ in your .env and use import.meta.env.
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
