import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BTExample from '../views/BTExample'
import SerialExample from '../views/SerialExample'
import NFCExample from '../views/NFCExample'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/bluetooth',
    name: 'Bluetooth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: BTExample
  },
  {
    path: '/serial',
    name: 'Serial',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SerialExample
  },
  {
    path: '/nfc',
    name: 'NFC',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: NFCExample
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
