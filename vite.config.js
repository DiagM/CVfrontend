import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      PORT: 10000, // You can keep this for local development if needed
      apiUrl: 'https://cvbackend-ethj.onrender.com', // Correctly define as a string
    },
  },
});

