<template>
  <div class="main-container">
    <el-container>
      <el-aside class="aside-container" :width="cAsideWidth">
        <!-- menu菜单组件 -->
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-header class="header-container" height="40px">
          <!-- main页面的header组件 -->
          <main-header></main-header>
        </el-header>
        <el-main class="main-container">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import MainMenu from "@/components/main/MainMenu.vue";
import MainHeader from "@/components/main/MainHeader.vue";
import { computed } from "vue";
import { useMenExpandBtnStatus } from "@/hooks/main";

// 动态计算侧边栏的宽度
const cAsideWidth = computed(() => {
  const menExpandBtnStatus = useMenExpandBtnStatus();
  return menExpandBtnStatus.value ? "200px" : "60px";
});
</script>
<style scoped>
.main-container {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    .aside-container {
      /* 侧边栏的样式 */
      overflow-x: hidden;
      overflow-y: auto;
      text-align: center;
      cursor: pointer;
      background-color: #001529;
      transition: width 0.3s ease;
      /* 浏览器滚动条的兼容性 */
      scrollbar-width: none; /** firefox */
      -ms-overflow-style: none; /** IE10+ */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .main-container {
      background-color: skyblue;
    }
  }
}
</style>
