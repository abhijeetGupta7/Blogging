import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import { defineConfig, loadEnv } from 'vite'
import { cwd } from 'node:process';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd())
  const serverUrl = env.VITE_SERVER_URL

  return {
    server: {
      proxy: {
        '/api': {
          target: serverUrl,
          changeOrigin: true,
          secure: false,
        }
      }
    },
  plugins: [react(), tailwindcss(), flowbiteReact()],
  }
})
