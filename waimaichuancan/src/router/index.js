import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Waimai from "@/components/Waimai"
import Sousuo from "@/components/Sousuo"
import Dingdan from "@/components/Dingdan"
import Wode from "@/components/Wode"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Waimai',
      component: Waimai
    },
    {
      path: '/Sousuo',
      name: 'Sousuo',
      component: Sousuo
    },
    {
      path: '/Dingdan',
      name: 'Dingdan',
      component: Dingdan
    },
    {
      path: '/Wode',
      name: 'Wode',
      component: Wode
    }
  ]
})
