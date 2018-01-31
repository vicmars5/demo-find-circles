import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'circle-centroid',
      component: require('@/components/views/CircleCentroid/index.vue').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
