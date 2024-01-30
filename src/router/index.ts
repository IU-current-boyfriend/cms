import { createRouter, createWebHashHistory } from "vue-router";
import { LOGINSTORELOCAL } from "@/constant";
import { localCache } from "@/storage";

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

router.beforeEach((to, from, next) => {
  const token = localCache.getItem(LOGINSTORELOCAL, "token");
  // 如果用户没有处于登录的状态，想导航到main页面，是要跳转到login页面的
  if (to.path.startsWith("/main") && !token) next("/login");
  // 如果用户已经处于登录状态，想导航到login页面，跳转到main页面
  // if (token && to.path === "/login") next("/main");
  next();
});

export default router;
