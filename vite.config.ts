
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Use relative asset paths so deployments under subpaths still work
    // (prevents /assets/* 404s that leave the app stuck on the spinner)
    base: './',
    plugins: [react()],
    define: {
      // Strictly satisfying the @google/genai requirement for process.env.API_KEY
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
      // Ensure process.env is stringified so it can be safely used in the client-side code
      'process.env': JSON.stringify(env)
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'esbuild',
      // Avoid preloading huge lazy chunks (e.g. Spline) on initial HTML load.
      modulePreload: {
        resolveDependencies: (_filename, deps) =>
          deps.filter((d) => !d.includes('spline-') && !d.includes('recharts-') && !d.includes('genai-')),
      },
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('framer-motion')) return 'framer-motion';
              if (id.includes('recharts')) return 'recharts';
              if (id.includes('splinetool') || id.includes('@splinetool')) return 'spline';
              if (id.includes('@google/genai')) return 'genai';
              return 'vendor';
            }
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      chunkSizeWarningLimit: 500,
    }
  };
});
