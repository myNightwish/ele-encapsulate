import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  // vite 的插件是函数式
  plugins: [vue(), vueJsx()],
  server: {
    port: 8080
  }
})
