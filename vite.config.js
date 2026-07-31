import react from '@vitejs/plugin-react'
import externalGlobals from 'rollup-plugin-external-globals'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    externalGlobals({
      Aliplayer: 'Aliplayer',
      OSS: 'OSS',
      AliyunUpload: 'AliyunUpload'
    })
  ]
})
