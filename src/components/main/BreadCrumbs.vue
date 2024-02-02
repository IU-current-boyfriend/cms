<!-- 面包屑组件 -->
<template>
  <div class="bread-crumbs">
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="breadItem of breadCrumbMenu" :key="breadItem.id">
        <el-breadcrumb-item :to="breadItem.url">{{
          breadItem.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import useLoginStore from "@/store/login";
import { useBreadCrumbsNavMenu } from "@/hooks/main/breadCrumbsHooks";

// 获取路由信息对象
const route = useRoute();
const loginStore = useLoginStore();

// 获取面包屑导航数据
const breadCrumbMenu = computed(() =>
  useBreadCrumbsNavMenu(route.path, loginStore.userMenu)
);
</script>

<style lang="less" scoped>
.bread-crumbs {
  padding-top: 3px;
}
</style>
