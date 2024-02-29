<template>
  <div class="user-page-content">
    <!-- 头部部分 -->
    <div class="user-page-content-header">
      <h2 class="content-title">用户列表</h2>
      <el-button type="primary" @click="handleCreateNewUser">
        新建用户
      </el-button>
    </div>
    <!-- 内容部分 -->
    <div class="user-page-content-main">
      <el-table
        :data="userListData"
        border
        style="width: 100%"
        show-overflow-tooltip
      >
        <!-- 复选框 -->
        <el-table-column
          align="center"
          type="selection"
          width="50"
        ></el-table-column>
        <!-- 索引值 -->
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="50"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="180"
        />
        <el-table-column align="center" prop="enable" label="状态" width="120">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>{{
              scope.row.enable ? "启用" : "禁用"
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createAt"
          label="创建时间"
          width="200"
        >
          <template #default="scope">
            {{ utcFormat(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateAt"
          label="更新时间"
          width="200"
        >
          <template #default="scope">
            {{ utcFormat(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <!-- 操作编辑 -->
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              icon="Edit"
              link
              @click="handleEditUser(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon="Delete"
              link
              @click="handleDeleteUser(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="user-pagenation">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { utcFormat } from "@/utils";
import { storeToRefs } from "pinia";
import useSystemStore from "@/store/main/system/system";
import type { IQueryInfo } from "@/service/modules/main/type";
import type { IUserInfo } from "./type";

const systemStore = useSystemStore();
const emits = defineEmits([
  "handleCreateNewUserClick",
  "handleDeleteUser",
  "handleEditUser"
]);
// pageSize：1页多少条数据
const pageSize = ref(10);
// currentPage：当前页码
const currentPage = ref(1);
const fetchUserListData = (queryInfo: IQueryInfo = {}) => {
  // 获取offset和size，size是什么？offset是什么？
  // size就是一页多少条数据
  const size = pageSize.value;
  // offset是偏移量，告知后端从那条开始查；例如：第一页的话，不需要偏移。
  // 第二页的话，就需要从第11条开始查
  const offset = (currentPage.value - 1) * size;
  // 发送网络请求
  systemStore.getUserListDataAction({ size, offset, ...queryInfo });
};
// 1. 获取数据
fetchUserListData();

// 2. 展示数据
const { userListData, usersTotalCount } = storeToRefs(systemStore);
// 3. 分页绑定数据
const handleSizeChange = () => {
  // 当页多少条数据改变触发
  console.log("当页多少条数据触发");
  fetchUserListData();
};

const handleCurrentChange = () => {
  // 当前页码变化时触发
  console.log("当前页码变化时触发");
  fetchUserListData();
};

// 4. 编辑和删除用户
const handleDeleteUser = (id: number) => {
  emits("handleDeleteUser", id);
};

const handleEditUser = (userInfo: IUserInfo) => {
  emits("handleEditUser", userInfo);
};

// 5.新建用户，弹出新建用户弹窗
const handleCreateNewUser = () => {
  // 向外触发新建用户的事件
  emits("handleCreateNewUserClick");
};

const handleResetClick = () => {
  // 点击重置按钮，重置页码
  currentPage.value = 1;
  pageSize.value = 10;
  // 重新发送请求，获取最新的数据
  fetchUserListData();
};

defineExpose({
  handleResetClick,
  fetchUserListData
});
</script>

<style scoped lang="less">
.user-page-content {
  border-radius: 6px;
  background-color: #fff;
  padding: 15px;
  .user-page-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    .content-title {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .user-page-content-main {
    margin-bottom: 15px;
  }
  .user-pagenation {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
  }
}
</style>
