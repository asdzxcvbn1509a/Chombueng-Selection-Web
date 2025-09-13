import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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