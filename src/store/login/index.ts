import { defineStore } from "pinia";
import { ElMessage } from "element-plus";
import { loginActionApi } from "@/service/modules/login";
import { setLoginStoreState } from "@/hooks/login/index";
import { localCache } from "@/storage";
import type { ILoginStoreState } from "./type";
import type { ILoginActionParams } from "@/service/modules/login/type";
import { LOGINSTORELOCAL, REMEMBERSTATUS, USERINFO } from "@/constant";
import router from "@/router";

export default defineStore("loginStore", {
  // 定义state函数返回值的类型
  state: (): ILoginStoreState => ({
    token: localCache.getItem(LOGINSTORELOCAL, "token") ?? "",
    rememberStatus: localCache.getItem(REMEMBERSTATUS) ?? false
  }),
  actions: {
    async loginAction(params: ILoginActionParams) {
      try {
        const loginResponseData = await loginActionApi(params);
        if (loginResponseData.data) {
          // 获取用户登录成功的信息，并且更新pinia的状态
          setLoginStoreState(loginResponseData.data);
          // 本地持久化存储用户登录成功的信息
          localCache.setItem(LOGINSTORELOCAL, loginResponseData.data);
          if (params.rememeberStatus) {
            localCache.setItem(USERINFO, {
              name: params.name,
              password: params.password
            });
          } else {
            localCache.clearItem(USERINFO);
          }
          // 登录成功，跳转到主页
          router.push("/main");
        }
      } catch (err) {
        console.log("err: =>", err);
        // 请求异常错误的提示
        ElMessage({
          type: "error",
          message: `${err}`
        });
      }
    }
  }
});
