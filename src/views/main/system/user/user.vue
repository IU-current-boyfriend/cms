<template>
  <div class="user-container">
    <!-- page-search部分 -->
    <page-search
      @reset-search-user-form="handleResetSearchUserForm"
      @query-search-user="handleQueryUser"
    ></page-search>
    <!-- page-content部分 -->
    <page-content
      ref="contentRef"
      @handle-create-new-user-click="handleCreateNewUser"
      @handle-delete-user="handleDeleteUser"
      @handle-edit-user="handleEditUser"
    ></page-content>
    <!-- page-modal部分 -->
    <page-modal ref="modalRef"></page-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageSearch from "./c-cpns/pageSearch.vue";
import PageContent from "./c-cpns/pageContent.vue";
import PageModal from "./c-cpns/pageModal.vue";
import type { IQueryInfo } from "@/service/modules/main/type";
import type { IUserInfo } from "./c-cpns/type";
import useSystemStore from "@/store/main/system/system";

const contentRef = ref<InstanceType<typeof PageContent>>();
const modalRef = ref<InstanceType<typeof PageModal>>();

const systemStore = useSystemStore();

// 重置查询用户表单
const handleResetSearchUserForm = () => {
  contentRef?.value?.handleResetClick();
};

// 查询具体的用户
const handleQueryUser = (queryInfo: IQueryInfo) => {
  contentRef?.value?.fetchUserListData(queryInfo);
};

// 新建用户
const handleCreateNewUser = () => {
  modalRef?.value?.setDialogVisible({
    action: "create",
    visible: true
  });
};
// 删除用户
const handleDeleteUser = (id: number) => {
  systemStore.deleteUserDataAction(id);
};
// 编辑用户
const handleEditUser = (userInfo: IUserInfo) => {
  modalRef?.value?.setDialogVisible({
    action: "edit",
    visible: true,
    data: userInfo
  });
};
</script>

<style lang="less" scoped></style>
