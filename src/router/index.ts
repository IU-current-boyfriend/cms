import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      // 如果是路由是'/'的路径,则重定向到'/main'路由
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      component: () => import("../views/main/main.vue")
    },
    {
      // 未匹配到的路径需要注意路径的写法：/:pathMatch(.*)
      path: "/:pathMatch(.*)",
      component: () => import("../views/notFound/NotFound.vue")
    }
  ]
});

export default router;
