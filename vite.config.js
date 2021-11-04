import { defineConfig } from 'vite'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
// maybe we can use these later
// import ScriptSetup from 'unplugin-vue2-script-setup/vite'
// import WindiCss from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue2(),
    // WindiCss(),
    // ScriptSetup()
  ],
  resolve: {
    alias: [{
      find: '@', replacement: path.resolve(__dirname, 'src')
    }]
  },
  publicDir:"static"
})
