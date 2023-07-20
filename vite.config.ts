import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ElectronDevPlugin } from './plugins/vite.electron.dev'
import { ElectronBuildPlugin } from './plugins/vite.electron.build'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    ElectronDevPlugin(),
    ElectronBuildPlugin()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
