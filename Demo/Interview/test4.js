import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index';
import item_a from '@/components/item_a';
import item_b from '@/components/item_b';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/item_a',
      name: 'item_a',
      component: item_a,
      // 某个路由之间的路由守卫
      beforeEnter: (to, from, next) => {
        next(false);
      },
    },
    {
      path: '/item_b',
      name: 'item_b',
      component: item_b,
    },
  ],
});

// 全局的路由守卫
router.beforeEach((to, from, next) => {
  next(true);
});
