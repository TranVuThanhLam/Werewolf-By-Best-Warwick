import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['lamtvt.tail04954f.ts.net'], // 👈 thêm domain tailscale ở đây
  },
})
