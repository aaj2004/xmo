import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://emrest.ct.ws',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})




// // vite.config.js
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     proxy: {
//       // Proxy API requests to external server
//       '/api': {
//         target: 'http://emrest.ct.ws',
//         changeOrigin: true,
//         secure: false,
//         // rewrite: (path) => path.replace(/^\/api/, '/api')
//       }
//     },
//     // CORS settings
//     cors: true
//   }
// })