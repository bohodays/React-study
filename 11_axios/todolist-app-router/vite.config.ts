import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://todosvc.vercel.app/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // 최초 요청 경로 : /api/todolist/gdhong
        // 타깃 : https://todosvc.vercel.app/
        // 최종 전달 경로 : https://todosvc.vercel.app/todolist/gdhong
      }
    }
  }
})
