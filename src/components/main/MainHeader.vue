<!-- main页面的header表头组件 -->
<template>
  <div class="main-header-container">
    <!-- 面包屑部分 -->
    <div class="bread-crumbs-container">
      <div class="expand-btn" @click="handleClickExpandBtn">
        <!-- 这里需要动态的切换 -->
        <el-icon size="26px">
          <component :is="cExpandBtnIconName"></component>
        </el-icon>
      </div>
      <div class="bread-crumbs">面包屑的部分</div>
    </div>
    <!-- 个人信息部分 -->
    <div class="person-info-container">
      <div class="message-container">
        <span class="message">
          <el-icon size="16px"> <Message /></el-icon>
        </span>
        <span class="chatsquare">
          <el-icon size="16px"><ChatSquare /></el-icon>
        </span>
        <span class="search">
          <el-icon size="16px">
            <Search />
          </el-icon>
        </span>
      </div>
      <div class="person-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="avatar">
              <el-avatar
                :size="30"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span class="name">coderwhy</span>
            </span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon><CircleClose /></el-icon>
                <span class="back-system" @click="handleBackSystem">
                  退出系统
                </span>
              </el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon><InfoFilled /></el-icon>
                <span class="filled-info">个人信息</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon><Unlock /></el-icon>
                <span class="modify-info">修改信息</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import {
  useMenExpandBtnStatus,
  setMenuExpandBtnStatus
} from "@/hooks/main/asideMenuHooks";
import { localCache } from "@/storage";
import {
  LOGIN_INFO,
  LOGIN_USER_INFO,
  LOGIN_USER_MENU,
  LOGIN_RESPONSE_DATA
} from "@/constant";
import { ElMessage } from "element-plus";

// 获取路由实例对象
const router = useRouter();

// 点击展开菜单栏的按钮事件
const handleClickExpandBtn = () => {
  const menuExpandBtnStatus = useMenExpandBtnStatus();
  setMenuExpandBtnStatus(!menuExpandBtnStatus.value);
};

const cExpandBtnIconName = computed(() => {
  const menuExpandBtnStatus = useMenExpandBtnStatus();
  return menuExpandBtnStatus.value ? "Fold" : "Expand";
});

// 退出系统按钮
const handleBackSystem = () => {
  localCache.clear(LOGIN_INFO);
  localCache.clear(LOGIN_USER_INFO);
  localCache.clear(LOGIN_USER_MENU);
  localCache.clear(LOGIN_RESPONSE_DATA);
  router.push("/login");
  ElMessage({
    type: "success",
    message: "退出系统成功"
  });
};
</script>

<style scoped lang="less">
.main-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .bread-crumbs-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .expand-btn {
      margin: 6px 15px 0 0;
      cursor: pointer;
    }
  }
  .person-info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .message-container {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .message,
      .chatsquare,
      .search {
        margin-top: 5px;
        cursor: pointer;
      }
      .chatsquare {
        position: relative;
        margin-left: 15px;
        margin-right: 15px;
        &::after {
          content: "";
          display: block;
          position: absolute;
          top: -3px;
          right: -4px;
          width: 6px;
          height: 6px;
          background-color: red;
          border-radius: 50%;
        }
      }
    }
    .person-info {
      display: flex;
      align-items: center;
      height: 100%;
      margin-left: 20px;
      cursor: pointer;

      // 在全局中找某个元素
      :global(.el-dropdown-menu__item) {
        line-height: 30px !important;
        padding: 6px 22px;
      }
      .avatar {
        display: flex;
        align-items: center;
        .name {
          margin: 5px 0 0 5px;
        }
      }
    }
  }
}
</style>
