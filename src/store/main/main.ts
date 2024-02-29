import { defineStore } from "pinia";
import type { IMainStoreState } from "./system/type";
import {
  getDepartmentDataApi,
  getRoleDataApi
} from "@/service/modules/main/system";

const useMainStore = defineStore("mainStore", {
  state: (): IMainStoreState => ({
    // 部门id集合
    entireDepartments: [],
    // 角色id集合
    entireRoles: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const {
        data: { list: departmentList }
      } = await getDepartmentDataApi({ offset: 0, size: 100 });
      const {
        data: { list: roleList }
      } = await getRoleDataApi({ offset: 0, size: 100 });
      this.entireDepartments = departmentList;
      this.entireRoles = roleList;
    }
  }
});

export default useMainStore;
