<template>
  <div class="page-search-container">
    <!-- 搜索表单部分 -->
    <div class="search-form">
      <el-form
        :model="searchForm"
        label-position="right"
        label-width="80"
        ref="searchRef"
      >
        <el-row :gutter="20">
          <template
            v-for="department of departmentConfig.formItems"
            :key="department.prop"
          >
            <el-col :span="department.span">
              <el-form-item :label="department.label" :prop="department.prop">
                <!-- 对类型判断 -->
                <template v-if="department.type === 'normal'">
                  <el-input
                    v-model="searchForm[department.prop]"
                    :placeholder="department.placeholder"
                  ></el-input>
                </template>
                <template v-if="department.type === 'datePicker'">
                  <el-date-picker
                    v-model="searchForm[department.prop]"
                    type="daterange"
                    :range-separator="department.separator"
                    :start-placeholder="department.startPlaceholder"
                    :end-placeholder="department.endPlaceholder"
                  ></el-date-picker>
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>
    <!-- 搜索表单按钮部分 -->
    <div class="search-btns">
      <el-button icon="RefreshRight" @click="handleResetSearchData">
        重置
      </el-button>
      <el-button type="primary" icon="Search" @click="handleQuerySearchData">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import departmentConfig from "../config/search.config";
import type { ISearchConfig } from "../types";
interface IProps extends ISearchConfig {}
const props = defineProps<IProps>();
const searchRef = ref<InstanceType<typeof ElForm>>();
const emits = defineEmits(["resetSearchForm", "querySearch"]);

const initialFormData: {
  [key in string]: any;
} = {};
for (const item of props.formItems) {
  item.prop && (initialFormData[item.prop] = item["initialValue"] ?? "");
}
const searchForm: {
  [key in string]: any;
} = reactive(initialFormData);

const handleResetSearchData = () => {
  // 重置表单
  searchRef?.value?.resetFields();
  emits("resetSearchForm");
};

const handleQuerySearchData = () => {
  emits("querySearch");
};
</script>

<style lang="less" scoped>
.page-search-container {
  border-radius: 6px;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  .search-form {
    margin-bottom: 10px;
  }
  .search-btns {
    text-align: right;
  }
}
</style>
../config/search.config
