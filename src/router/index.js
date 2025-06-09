import { createRouter, createWebHistory } from 'vue-router'
import CoworkingPage from '../components/CoworkingPage.vue'
import PaymentPage from '../components/PaymentPage.vue'
import PaymentSuccess from '../components/PaymentSuccess.vue'
import PaymentFailure from '../components/PaymentFailure.vue'
import PaymentPending from '../components/PaymentPending.vue'

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
  },
  {
    path: '/payment-failure',
    name: 'payment-failure',
    component: PaymentFailure
  },
  {
    path: '/payment-pending',
    name: 'payment-pending',
    component: PaymentPending
  },
  {
    path: '/pending',
    name: 'pending',
    component: PaymentPending
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 