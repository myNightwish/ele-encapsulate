import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import encapsulteComps from './components/index.js';
import iconMapPlugin from './plugins/iconPicker.js';

import './styles/ui.scss';
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component('el-icon'+key, component)
}
app.use(router).use(ElementPlus).use(encapsulteComps).use(iconMapPlugin);
app.mount('#app')
