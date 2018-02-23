import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      component: require('@/components/About').default
    },
    {
      path: '/profile',
      component: require('@/components/profile').default
    }
  ]
})
