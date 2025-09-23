import { defineConfig } from 'vite'        // Imports Vite's config helper
import react from '@vitejs/plugin-react'  // Imports the official React plugin for Vite

// Export the configuration
export default defineConfig({
  plugins: [react()],                     // Adds the React plugin
})
