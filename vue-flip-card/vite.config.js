import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // 🔑 BẮT BUỘC phải có để hiểu .vue files
  server: {
    host: true, // mở 0.0.0.0 cho Funnel
    port: 5173,
    allowedHosts: [
      "tvtl.tail04954f.ts.net", // domain funnel của bạn
    ],
    hmr: {
      host: "tvtl.tail04954f.ts.net", // để HMR chạy qua Funnel
    },
  },
});
