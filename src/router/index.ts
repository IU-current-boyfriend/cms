import { createRouter, createWebHashHistory } from "vue-router";
import { localCache } from "@/storage";
import { LOGIN_RESPONSE_DATA } from "@/constant";
import { firstMenu } from "@/utils";

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
      name: "login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
    },
    {
      // 未匹配到的路径需要注意路径的写法：/:pathMatch(.*)
      path: "/:pathMatch(.*)",
      component: () => import("../views/notFound/NotFound.vue")
    }
  ]
});

router.beforeEach((to) => {
  const token = localCache.getItem("token", LOGIN_RESPONSE_DATA);
  if (to.path.startsWith("/main") && !token) return "/login";
  if (to.path === "/main" && token) return firstMenu.url;
});

export default router;
