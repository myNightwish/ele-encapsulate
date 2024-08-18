import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/ui.scss';

// import encapsulteComps from '../packages/index';
// 1、注意这里的引入文件后缀不要带mjs
// 2、 ui.scss是全局项目文件需要被引入
// import encapsulteComps from '../lib/index';
import encapsulteComps from 'mi-encapsulate-components/index';
import 'mi-encapsulate-components/style.css';

// 按需引入
// todo：为什这里又要带umd了？？
// import MiCity from 'mi-encapsulate-components/MiCity/index.umd.js';

const app = createApp(App);
app.use(router).use(ElementPlus)
.use(encapsulteComps)
app.mount('#app');
