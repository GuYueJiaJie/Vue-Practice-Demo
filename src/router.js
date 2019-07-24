import Vue from "vue";
import Router from "vue-router";
import Login from "./views/User/Login.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      name: 404,
      component: () => import("./views/404.vue")
    },
    {
      path: "/",
      redirect: "/bottombar/index",
      component: { render: h => h("router-view") },
      children: [
        {
          path: "/user/login",
          name: "login",
          component: Login
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/User/Register.vue")
        }
      ]
    },
    {
      path: "/bottombar",
      name: "bottombar",
      component: () =>
        import(
          /* webpackChunkName: "bottombar" */ "./views/BottomBar/BottomBar.vue"
        ),
      children: [
        {
          path: "index",
          name: "index",
          component: () =>
            import(
              /* webpackChunkName: "bottombar" */ "./views/BottomBar/index.vue"
            )
        },
        {
          path: "classify",
          name: "classify",
          component: () =>
            import(
              /* webpackChunkName: "bottombar" */ "./views/BottomBar/Classify.vue"
            )
        },
        {
          path: "search",
          name: "search",
          component: () =>
            import(
              /* webpackChunkName: "bottombar" */ "./views/BottomBar/Search.vue"
            )
        },
        {
          path: "cart",
          name: "cart",
          meta: {
            requiresAuth: true // 需要登录验证
          },
          component: () =>
            import(
              /* webpackChunkName: "bottombar" */ "./views/BottomBar/Cart.vue"
            )
        },
        {
          path: "mine",
          name: "mine",
          meta: {
            requiresAuth: true // 需要登录验证
          },
          component: () =>
            import(
              /* webpackChunkName: "bottombar" */ "./views/BottomBar/Mine.vue"
            )
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 如果某个路由需要登录验证
  if (to.meta.requiresAuth) {
    // 且此时本地token为空
    if (sessionStorage.token) {
      next();
    } else {
      next({
        path: "/user/login",
        query: { redirect: to.path }
      });
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});

export default router;
