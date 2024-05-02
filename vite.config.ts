import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

export default defineConfig({
  plugins: [vue()],
  server: {
    https: httpsOptions
  }
})
