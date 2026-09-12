import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
import manifest from './manifest.json' with { type: 'json' };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
            VitePWA({ registerType: 'autoUpdate',
                      manifest: manifest,
                      workbox: {
                        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest,jpg}']
                      } })],
})


