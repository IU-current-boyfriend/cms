import { defineStore } from "pinia";
import { loginActionApi } from "@/service/modules/login";
import { setLoginStoreState } from "@/hooks/login/index";
import { localCache } from "@/storage";
import type { ILoginStoreState } from "./type";
import type { ILoginActionParams } from "@/service/modules/login/type";

// 定义loginStore本地化常量
const LOGINSTORELOCAL = "localLoginStore";

export default defineStore("loginStore", {
  // 定义state函数返回值的类型
  state: (): ILoginStoreState => ({
    id: localCache.getItem(LOGINSTORELOCAL, "id") ?? -1,
    name: localCache.getItem(LOGINSTORELOCAL, "name") ?? "",
    token: localCache.getItem(LOGINSTORELOCAL, "token") ?? ""
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
        }
      } catch (err) {
        console.log("err: =>", err);
      }
    }
  }
});
