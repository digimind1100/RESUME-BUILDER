import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // ✅ use the official Vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- this ensures Tailwind is compiled correctly in Vite
  ],
});
