import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        }
      }
    }
  },
  server: {
    host: true, // อนุญาตให้เข้าถึงจากภายนอก
    port: 5173, // หรือ port ที่คุณใช้
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app', // อนุญาตทุก ngrok subdomain
      '.ngrok.io',       // สำหรับ ngrok เวอร์ชันเก่า
      '95bfa7ee6d7d.ngrok-free.app' // specific host ของคุณ
    ]
  }
})