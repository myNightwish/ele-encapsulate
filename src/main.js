import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
// import encapsulteComps from './components/index.js';
import './styles/ui.scss';

// 1、注意这里的引入文件后缀不要带mjs
// 2、 ui.scss是全局项目文件需要被引入
import encapsulteComps from '../lib/index';
import '../lib/style.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
const app = createApp(App);
app.use(router).use(ElementPlus).use(encapsulteComps);
app.mount('#app');
