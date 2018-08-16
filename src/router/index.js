import Vue from 'vue'
import Router from 'vue-router'
const home = resolve => require.ensure([], () => resolve(require('@/pages/Home.vue')), 'home');
const roast = resolve => require.ensure([], () => resolve(require('@/pages/Roast.vue')), 'roast');
const article = resolve => require.ensure([], () => resolve(require('@/pages/Article.vue')), 'article');
const about = resolve => require.ensure([], () => resolve(require('@/pages/About.vue')), 'about');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: home
    },
    {
      path: '/roast',
      name: 'Roast',
      component: roast
    },
    {
      path: '/article',
      name: 'Article',
      component: article
    },{
      path: '/about',
      name: 'About',
      component: about
    }
  ]
})
