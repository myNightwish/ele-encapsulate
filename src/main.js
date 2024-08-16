import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import encapsulteComps from './components/index.js';

import './styles/ui.scss';
const app = createApp(App);
app.use(router).use(ElementPlus).use(encapsulteComps);
app.mount('#app')
