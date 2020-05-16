import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/sort'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart'),
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('../views/submit'),
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/payment'),
  },
  {
    path: '/payment/success',
    name: 'PaymentSuccess',
    component: () => import('../views/payment/success'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order'),
  },
  {
    path: '/order/confirm',
    name: 'Confirm',
    component: () => import('../views/order/confirm'),
  },
  {
    path: '/order/confirm/success',
    name: 'Success',
    component: () => import('../views/order/success'),
  },
  {
    path: '/review',
    name: 'Review',
    component: () => import('../views/review'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
