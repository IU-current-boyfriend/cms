<template>
  <div>
    欢迎来到首页
    <el-button type="primary" @click="toBackLogin">回到登录页面</el-button>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { localCache } from "@/storage";
import { LOGIN_RESPONSE_DATA } from "@/constant";
const router = useRouter();
const toBackLogin = () => {
  localCache.clear(LOGIN_RESPONSE_DATA);
  router.push("/login");
};
</script>
<style scoped></style>
