
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all envs regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
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
    }
  };
});
