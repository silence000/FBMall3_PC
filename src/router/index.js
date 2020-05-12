import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/main'),
  },
  {
    path: '/sort',
    name: 'Sort',
    component: () => import('../views/sort'),
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('../views/product'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
