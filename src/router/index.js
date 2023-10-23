import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BTExample from '../views/BTExample'
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
