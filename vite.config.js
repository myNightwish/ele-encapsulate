import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // vite 的插件是函数式
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'COMPONENTS': resolve(__dirname, 'src/components'),
      // 你可以在这里添加更多别名
    },
  },
  server: {
    port: 8080
  }
})
