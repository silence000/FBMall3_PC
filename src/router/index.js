import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home'),
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
    component: () => import('../views/category'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/cart'),
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import('../views/category'),
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
