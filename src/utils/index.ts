import type { ILoginUserMenuResponseDataElement } from "@/service/modules/login/type";
import type { RouteRecordRaw } from "vue-router";

// MenuIcon利用动态组件是不区分组件名称大小写的，所以这个工具函数可以不用
export const formatMenuIconName = (iconName: string) => {
  let iconNameStr = iconName.split("-icon-")[1].replace(/(-[a-zA-z])/g, ($) => {
    return `${$.replace(/-/g, "").toUpperCase()}`;
  });
  iconNameStr = iconNameStr.split("").reduce((newStr, current, index) => {
    if (index === 0) current = current.toUpperCase();
    newStr += current;
    return newStr;
  }, "");
  return iconNameStr;
};

/**
 * 设置动态路由的方法
 *
 */
export const setDyNamicsRouteMap = (
  menu: ILoginUserMenuResponseDataElement[]
): RouteRecordRaw[] => {
  const dynamicsRoute: RouteRecordRaw[] = [];
  // 1. 首先读取路由文件，找出所有的路由文件
  const localRoutes: Record<string, any> = import.meta.glob(
    "@/router/main/**/*.ts",
    {
      eager: true
    }
  );

  // 递归处理动态路由映射
  const collectDynamicRoute = (
    menuChildren: ILoginUserMenuResponseDataElement[],
    dynamicsRoute: RouteRecordRaw[]
  ) => {
    let lock = true;
    const deepCollectDynamicRoute = (
      menu: ILoginUserMenuResponseDataElement[],
      routes: RouteRecordRaw[],
      topMenu?: ILoginUserMenuResponseDataElement
    ) => {
      let collectedTopMenuCount = 0;
      menu.forEach((menuItem) => {
        if (menuItem.children && menuItem.children.length > 0) {
          deepCollectDynamicRoute(menuItem.children, routes, menuItem);
        }
        for (let key in localRoutes) {
          const route = localRoutes[key].default;
          const routePath = route.path;
          if (routePath === menuItem.url) {
            lock && (firstMenu = menuItem);
            // 设置面包屑顶层菜单重定向
            topMenu &&
              collectedTopMenuCount < 1 &&
              routes.push({
                path: topMenu.url,
                redirect: route
              });
            collectedTopMenuCount++;
            routes.push(route);
            lock = false;
          }
        }
      });
    };
    deepCollectDynamicRoute(menuChildren, dynamicsRoute);
  };

  collectDynamicRoute(menu, dynamicsRoute);
  return dynamicsRoute;
};

/**
 * 根据当前的url地址，获取对应菜单栏id，递归处理
 *
 */
export const getCurrentMenuIdByUrl = (
  url: string,
  menus: ILoginUserMenuResponseDataElement[]
): number | undefined => {
  let menuId = undefined;
  const deep = (menuArr: ILoginUserMenuResponseDataElement[]) => {
    menuArr.forEach((item) => {
      if (item.children && item.children.length > 0) {
        deep(item.children);
      }
      if (item.url === url) {
        menuId = item.id;
      }
    });
  };
  deep(menus);
  return menuId;
};

// 第一个菜单栏
export let firstMenu: ILoginUserMenuResponseDataElement;
