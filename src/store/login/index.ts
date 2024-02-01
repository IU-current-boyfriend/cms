import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import type { RouteRecordRaw } from "vue-router";
import type { ILoginStoreState } from "./type";
import type { ILoginActionParams } from "@/service/modules/login/type";
import {
  getLoginUserInfoApi,
  getMenuByRoleIdApi,
  loginActionApi
} from "@/service/modules/login";
import {
  saveUserLoginToken,
  saveUserLoginInfo,
  saveUserLoginMenu
} from "@/hooks/login/index";
import { localCache } from "@/storage";
import {
  REMEMBER_STATUS,
  LOGIN_RESPONSE_DATA,
  LOGIN_USER_INFO,
  LOGIN_USER_MENU
} from "@/constant";
import router from "@/router";
import { setDyNamicsRouteMap, firstMenu } from "@/utils";

export default defineStore("loginStore", {
  // 定义state函数返回值的类型
  state: (): ILoginStoreState => ({
    token: "",
    userInfo: {},
    userMenu: [],
    rememberStatus: localCache.getItem(REMEMBER_STATUS) ?? false
  }),
  actions: {
    async loginAction(params: ILoginActionParams) {
      try {
        // 调用用户登录的接口
        const loginResponseData = await loginActionApi(params);
        // 动态的路由数组
        let dynamicsRoute: RouteRecordRaw[] = [];
        // 调用
        if (loginResponseData.data) {
          // 获取用户的id值
          const userId = loginResponseData.data.id;

          // 保存用户的token信息
          saveUserLoginToken(loginResponseData, params);

          // 因为获取登录用户信息的接口需要用到token值，所以在保存token之后操作
          if (userId) {
            // 获取用户的个人信息
            const loginUserInfoResponseData = await getLoginUserInfoApi(userId);
            // 保存用户信息
            const userRoleId = saveUserLoginInfo(loginUserInfoResponseData);

            // 根据用户的个人角色去获取用户的菜单
            if (userRoleId) {
              // 获取用户的个人菜单栏
              const loginUserMenu = await getMenuByRoleIdApi(userRoleId);
              // 保存用户的权限菜单
              saveUserLoginMenu(loginUserMenu);
              // 这里其实就要动态的设置路由了，因为用户登录进来之后，就要设置好对应的菜单权限和动态路由
              dynamicsRoute = setDyNamicsRouteMap(loginUserMenu.data);
            }
          }
          // 循环枚举添加动态路由
          dynamicsRoute.forEach((route) => {
            router.addRoute("main", route);
          });

          // 登录成功，跳转路由
          router.push(firstMenu.url);
        }
      } catch (err) {
        // 请求异常错误的提示
        ElMessage({
          type: "error",
          message: `${err}`
        });
      }
    },
    // 加载本地store缓存，并且注册动态路由
    localLoadCacheAction() {
      const token = localCache.getItem("token", LOGIN_RESPONSE_DATA) ?? "";
      const userInfo = localCache.getItem(LOGIN_USER_INFO) ?? {};
      const userMenu = localCache.getItem(LOGIN_USER_MENU) ?? [];
      // 用户处于登录状态
      if (token && userInfo && userMenu) {
        this.token = token;
        this.userInfo = userInfo;
        this.userMenu = userMenu;
      }
      // 动态加载路由
      const dynamicsRoute = setDyNamicsRouteMap(this.userMenu);
      dynamicsRoute.forEach((route) => {
        router.addRoute("main", route);
      });
    }
  }
});
