import { createRouter, createWebHistory } from 'vue-router'
import CoworkingPage from '../components/CoworkingPage.vue'
import PaymentPage from '../components/PaymentPage.vue'
import PaymentSuccess from '../components/PaymentSuccess.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CoworkingPage
  },
  {
    path: '/booking',
    name: 'booking',
    component: CoworkingPage
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentPage
  },
  {
    path: '/payment-success',
    name: 'payment-success',
    component: PaymentSuccess
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 