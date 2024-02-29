<template>
  <div class="department-container">
    <!-- pageSearch部分 -->
    <page-search
      v-bind="departmentSearchConfig"
      @reset-search-form="resetSearchForm"
      @query-search="querySearch"
    ></page-search>
    <!-- pageContent部分 -->
    <page-content></page-content>
    <!-- pageModal部分 -->
    <page-modal></page-modal>
  </div>
</template>

<script setup lang="ts">
import PageSearch from "./c-cpns/pageSearch.vue";
import PageContent from "./c-cpns/pageContent.vue";
import PageModal from "./c-cpns/pageModal.vue";
import departmentSearchConfig from "./config/search.config";

const resetSearchForm = () => {
  console.log("重置搜索表单");
};

const querySearch = () => {
  console.log("查询搜索表单");
};
</script>

<style lang="less" scoped></style>
