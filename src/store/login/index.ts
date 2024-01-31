import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
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
import type { ILoginStoreState } from "./type";
import type { ILoginActionParams } from "@/service/modules/login/type";
import {
  REMEMBER_STATUS,
  LOGIN_RESPONSE_DATA,
  LOGIN_USER_INFO,
  LOGIN_USER_MENU
} from "@/constant";
import router from "@/router";

export default defineStore("loginStore", {
  // 定义state函数返回值的类型
  state: (): ILoginStoreState => ({
    token: localCache.getItem("token", LOGIN_RESPONSE_DATA) ?? "",
    userInfo: localCache.getItem(LOGIN_USER_INFO) ?? {},
    userMenu: localCache.getItem(LOGIN_USER_MENU) ?? [],
    rememberStatus: localCache.getItem(REMEMBER_STATUS) ?? false
  }),
  actions: {
    async loginAction(params: ILoginActionParams) {
      try {
        // 调用用户登录的接口
        const loginResponseData = await loginActionApi(params);
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
              // 保存用户信息
              saveUserLoginMenu(loginUserMenu);
            }
          }
          // 登录成功，跳转路由
          router.push("/main");
        }
      } catch (err) {
        // 请求异常错误的提示
        ElMessage({
          type: "error",
          message: `${err}`
        });
      }
    }
  }
});
