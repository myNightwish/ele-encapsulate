// 导入Vue Router等相关依赖（如果需要）
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Container from '../components/Container/src/index.vue';
// 定义路由配置
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Container',
    component: Container,
    children: [
      {
        path: '/home',
        component: () => import('../views/Home.vue'),
      },
      // {
      //   path: '/icon',
      //   component: () => import('../views/ChooseIcon.vue'),
      // },
      {
        path: '/city',
        component: () => import('../views/ChooseCity.vue'),
      },
      {
        path: '/notify',
        component: () => import('../views/Notify.vue'),
      },
      {
        path: '/menu',
        component: () => import('../views/Menu.vue'),
      },
      {
        path: '/progress',
        component: () => import('../views/ProgressDemo.vue'),
      },
    ]
  }
];

// 创建并导出router实例
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;