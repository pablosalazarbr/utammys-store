import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/shop-category',
      name: 'shop-category',
      component: () => import('../views/ShopCategoryView.vue'),
    },
    {
      path: '/escuela',
      name: 'escuela',
      component: () => import('../views/FindSchoolView.vue'),
    },
    {
      path: '/tienda',
      name: 'tienda',
      component: () => import('../views/ProductosView.vue'),
    },
    {
      path: '/productos',
      redirect: '/tienda',
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
    },
    {
      path: '/acerca',
      name: 'acerca',
      component: () => import('../views/AcercaView.vue'),
    },
    {
      path: '/privacidad',
      name: 'privacidad',
      component: () => import('../views/PrivacyView.vue'),
    },
    {
      path: '/terminos',
      name: 'terminos',
      component: () => import('../views/TermsView.vue'),
    },
    {
      path: '/accesibilidad',
      name: 'accesibilidad',
      component: () => import('../views/AccessibilityView.vue'),
    },
  ],
})

export default router
