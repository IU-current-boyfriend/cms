<template>
  <div>欢迎来到登录页面～欢迎您</div>
</template>
<script lang="ts" setup>
import useStore from "@/store/login/index";

const store = useStore();
console.log(store);
</script>
<style scoped></style>
