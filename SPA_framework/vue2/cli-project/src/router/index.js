import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/helloworld'

Vue.use(Router)

/*
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  `
}
*/

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/archive',
      component: require('@/components/archive').default
    },
    {
      path: '/user',
      // 动态加载
      component: () => import('@/components/user'),
      children: [
        {
          path: 'about',
          // 添加特殊的注释语法，将动态加载的文件打包成一个文件
          component: () => import(/* webpackChunkName: "group-user" */ '@/components/about')
        },
        {
          path: 'profile',
          component: () => import(/* webpackChunkName: "group-user" */ '@/components/profile')
        }
      ]
    }
  ]
})
