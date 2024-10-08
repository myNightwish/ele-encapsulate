import { createRouter, createWebHashHistory } from 'vue-router';
import MiContainer from '../../packages/MiContainer/src/index.vue';

// 定义路由配置
const routes = [
    {
        path: '/',
        name: 'MiContainer',
        component: MiContainer,
        children: [
            {
                path: '/city',
                component: () => import('../views/cityDemo.vue'),
            },
            {
                path: '/notify',
                component: () => import('../views/notifyDemo.vue'),
            },
            {
                path: '/menu',
                component: () => import('../views/menuDemo.vue'),
            },
            {
                path: '/progress',
                component: () => import('../views/progressDemo.vue'),
            },
            {
                path: '/form',
                component: () => import('../views/formDemo.vue'),
            },
            {
                path: '/modalform',
                component: () => import('../views/modalFormDemo.vue'),
            },
            {
                path: '/table',
                component: () => import('../views/tableDemo.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
