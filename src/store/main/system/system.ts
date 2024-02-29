import { defineStore } from "pinia";
import {
  deleteUserDataApi,
  editUserDataApi,
  getUserListDataApi,
  newUserDataApi
} from "@/service/modules/main/system";
import type { IQueryInfo } from "@/service/modules/main/type";
import type { ISystemStoreState } from "./type";
import { ElMessage } from "element-plus";
const useSystemStore = defineStore("systemStore", {
  state: (): ISystemStoreState => ({
    // 用户列表信息
    userListData: [],
    // 总页数
    usersTotalCount: 0
  }),
  actions: {
    // 获取用户列表行为
    async getUserListDataAction(queryInfo: IQueryInfo) {
      const { data } = await getUserListDataApi(queryInfo);
      const { list, totalCount } = data;
      this.userListData = list;
      this.usersTotalCount = totalCount;
    },
    // 新建用户的行为
    async createNewUserDataAction(userInfo: any) {
      // 也可能存在请求时的错误，也可以捕获，可以在intercerptor中捕获，也可以在这里捕获
      const { code, data } = await newUserDataApi(userInfo);
      // 新建用户失败
      if (code) return ElMessage({ type: "error", message: data });
      // 创建用户成功提示
      ElMessage({ type: "success", message: "新建用户成功" });
      // 刷新页面数据
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 编辑用户的行为
    async editUserDataAction(id: number, userInfo: any) {
      const { code, data } = await editUserDataApi(id, userInfo);
      // 编辑用户失败
      if (code) return ElMessage({ type: "error", message: data });
      // 编辑用户成功提示
      ElMessage({ type: "success", message: `${data}` });
      // 刷新页面数据
      this.getUserListDataAction({ offset: 0, size: 10 });
    },

    // 删除用户的行为
    async deleteUserDataAction(id: number) {
      const { code, data } = await deleteUserDataApi(id);
      // 新建用户失败
      if (code) return ElMessage({ type: "error", message: `${data}` });
      // 删除用户成功
      ElMessage({ type: "success", message: `${data}` });
      // 刷新表格数据
      this.getUserListDataAction({ offset: 0, size: 10 });
    }
  }
});

export default useSystemStore;
