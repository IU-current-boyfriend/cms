<template>
  <el-config-provider :locale="zhCn">
    <div class="warpper">
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import { zhCn } from "element-plus/es/locale/index.mjs";
</script>

<style scoped>
.warpper {
  width: 100vw;
  height: 100vh;
}
</style>
