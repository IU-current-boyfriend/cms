<!-- 登录页面的帐号登录模块表单 -->
<template>
  <el-form
    label-width="60px"
    :model="accountPaneData"
    status-icon
    :rules="accountPaneRule"
    ref="accountPaneForm"
  >
    <!-- 帐号输入框 -->
    <el-form-item label="帐号" prop="name">
      <el-input v-model="accountPaneData.name" />
    </el-form-item>
    <!-- 密码输入框 -->
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        show-password
        v-model="accountPaneData.password"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { defineExpose, ref } from "vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { useAccountPaneData } from "@/hooks/login/index";
import { accountPaneRule } from "@/rules/index";
import useLoginStore from "@/store/login/index";

// 获取到帐号表单登录的数据
const accountPaneData = useAccountPaneData();

const accountPaneForm = ref<InstanceType<typeof ElForm>>();

const loginStore = useLoginStore();

const loginAction = (rememeberStatus: boolean) => {
  accountPaneForm.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的帐号和密码
      const account = accountPaneData.name;
      const password = accountPaneData.password;
      // 调用store存储数据
      loginStore.loginAction({ name: account, password, rememeberStatus });
    } else {
      ElMessage({
        message: "请校验用户名或者密码是否合法",
        type: "error"
      });
    }
  });
};

defineExpose({
  loginAction
});
</script>

<style lang="less"></style>
