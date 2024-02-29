<template>
  <div class="user-search-container">
    <!-- 用户搜索表单部分 -->
    <div class="user-search-form">
      <el-form
        :model="userSearchFormData"
        label-position="right"
        label-width="80px"
        ref="userSearchForm"
      >
        <el-row :gutter="50">
          <!-- 用户名部分 -->
          <el-col :span="8">
            <el-form-item prop="name" label="用户名">
              <el-input
                v-model="userSearchFormData.name"
                placeholder="请输入查询的用户名"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 真实姓名 -->
          <el-col :span="8">
            <el-form-item prop="realName" label="真实姓名">
              <el-input
                v-model="userSearchFormData.realName"
                placeholder="请输入查询的真实姓名"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 手机号 -->
          <el-col :span="8">
            <el-form-item prop="cellphone" label="手机号码">
              <el-input
                v-model="userSearchFormData.cellphone"
                placeholder="请输入查询的手机号码"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="enable" label="状态">
              <el-select v-model="userSearchFormData.enable">
                <el-option
                  v-for="item of enableOption"
                  :value="item.value"
                  :label="item.label"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="createAt" label="创建时间">
              <!-- 日期选择器 -->
              <el-date-picker
                v-model="userSearchFormData.createAt"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 用户搜索按钮部分 -->
    <div class="user-search-btns">
      <el-button
        type="default"
        icon="RefreshRight"
        @click="handleResetUserSearchData"
      >
        重置
      </el-button>
      <el-button
        type="primary"
        icon="Search"
        @click="handleQueryUserSearchData"
      >
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import { ElForm } from "element-plus";

interface IuserSearchData {
  name: string;
  realName: string;
  cellphone: string | number;
  enable: string | number;
  createAt: string;
}

const userSearchFormData = reactive<IuserSearchData>({
  name: "",
  realName: "",
  cellphone: "",
  enable: "",
  createAt: ""
});

const enableOption = [
  {
    value: 1,
    label: "启用"
  },
  {
    value: 0,
    label: "禁用"
  }
];

const userSearchForm = ref<InstanceType<typeof ElForm>>();

const emits = defineEmits(["resetSearchUserForm", "querySearchUser"]);

// 重置按钮的功能
const handleResetUserSearchData = () => {
  // 重置需求，不仅仅是要把search表单填的数据清空，还需要重置下面table表格数据，分页器也要重置
  userSearchForm?.value?.resetFields();
  // 因为是兄弟组件，需要调用到content内部的方法，所以需要将事件传递给父组件
  emits("resetSearchUserForm");
};

// 查询按钮的功能
const handleQueryUserSearchData = () => {
  const queryInfo = toRaw(userSearchFormData);
  emits("querySearchUser", queryInfo);
};
</script>

<style scoped lang="less">
.user-search-container {
  border-radius: 6px;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  .el-form-item {
    margin-bottom: 30px;
  }
  .user-search-btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
  }
}
</style>
