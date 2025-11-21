import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ✅ Final, conflict-free configuration
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // IMPORTANT: Ensures Vercel reads correct paths & assets load properly
  base: "/",           // 👈 keeps video path /demo/mockup.mp4 working
  publicDir: "public", // 👈 makes sure public/demo/mockup.mp4 is copied

  build: {
    outDir: "dist",    // 👈 Vercel expects dist folder
    assetsDir: "assets",
  },
});
