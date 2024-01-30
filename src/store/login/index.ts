import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { loginActionApi } from "@/service/modules/login";
import { setLoginStoreState } from "@/hooks/login/index";
import { localCache } from "@/storage";
import type { ILoginStoreState } from "./type";
import type { ILoginActionParams } from "@/service/modules/login/type";
import { REMEMBER_STATUS, LOGIN_RESPONSE_DATA, USER_INFO } from "@/constant";
import router from "@/router";

export default defineStore("loginStore", {
  // 定义state函数返回值的类型
  state: (): ILoginStoreState => ({
    token: localCache.getItem("token", LOGIN_RESPONSE_DATA) ?? "",
    rememberStatus: localCache.getItem(REMEMBER_STATUS) ?? false
  }),
  actions: {
    async loginAction(params: ILoginActionParams) {
      try {
        const loginResponseData = await loginActionApi(params);
        if (loginResponseData.data) {
          // 获取用户登录成功的信息，并且更新pinia的状态
          setLoginStoreState(loginResponseData.data);
          // 本地持久化存储用户登录成功的信息
          localCache.setItem(LOGIN_RESPONSE_DATA, loginResponseData.data);
          if (params.rememeberStatus) {
            localCache.setItem("name", params.name, USER_INFO);
            localCache.setItem("password", params.password, USER_INFO);
          } else {
            localCache.clear(USER_INFO);
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
