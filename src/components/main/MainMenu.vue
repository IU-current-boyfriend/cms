<template>
  <div class="main-menu-container">
    <!-- header部分 -->
    <div class="menu-header">
      <div class="logo">
        <img src="@/assets/images/logo.svg" />
      </div>
      <h2 class="title" v-show="cMenuTitleShow">聪U后台管理系统</h2>
    </div>
    <!-- menu菜单部分，不用着急，我们先搭建静态的页面 -->
    <div class="menu-main">
      <!-- el-menu主菜单 -->
      <!-- text-color: menu菜单里面的字体颜色  active-text-color: menu菜单选中的时候字体颜色  background-color: 菜单的背景颜色 -->
      <el-menu
        class="el-menu-vertical-demo"
        :collapse="!menExpandBtnStatus"
        :default-active="`${cMenuDefaultActiveId}`"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 循环遍历menu菜单栏的数据 -->
        <template v-for="menu of menuData" :key="menu.id">
          <!-- 一级菜单栏 -->
          <el-sub-menu :index="`${menu.id}`">
            <template #title>
              <el-icon>
                <component :is="cMenuIconName(menu.icon)"></component>
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <!-- 二级菜单栏 -->
            <el-menu-item
              v-for="subMenu of menu.children"
              :key="subMenu.id"
              :index="`${subMenu.id}`"
              @click="handleClickMenuSubItem(subMenu)"
            >
              <template #title>
                <span>{{ subMenu.name }}</span>
              </template>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { ILoginUserMenuResponseDataElement } from "@/service/modules/login/type";
import {
  useMenExpandBtnStatus,
  useMenuData,
  getMenuDefaultId
} from "@/hooks/main/index";
import { formatMenuIconName } from "@/utils/index";

// 获取路由实例对象
const router = useRouter();
const route = useRoute();

// 获取左菜单栏的数据
const menuData = useMenuData();

const cMenuDefaultActiveId = computed(() => getMenuDefaultId(route.path));

// 获取到展开合并按钮的状态
const menExpandBtnStatus = useMenExpandBtnStatus();

// 计算menu菜单栏图标,这方法可以不调用，因为动态组件component的is属性不区分组件名称大小写，所以可以不用转换icon名称
const cMenuIconName = computed(() => {
  return (iconName: string) => {
    if (iconName) {
      return formatMenuIconName(iconName);
    }
  };
});

// 根据是否展开按钮的状态，动态展示菜单栏的标题
const cMenuTitleShow = computed(() => {
  return menExpandBtnStatus.value ? true : false;
});

// 点击菜单栏切换路由
const handleClickMenuSubItem = (subMenu: ILoginUserMenuResponseDataElement) => {
  // 切换跳转路由
  router.push(subMenu.url);
};
</script>

<style lang="less" scoped>
.main-menu-container {
  .menu-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
    margin-left: 15px;
    padding-top: 10px;
    overflow: hidden;
    .logo {
      width: 30px;
      img {
        width: 100%;
      }
    }
    .title {
      margin-left: 5px;
      font-size: 16px;
      color: #ffffff;
      // 不换行
      white-space: nowrap;
    }
  }
  .el-menu {
    // menu右侧有条白线，是右边框的问题
    border-right: none;
    user-select: none;
    .el-menu-item {
      // el-menu-item往右边来来
      padding-left: 50px !important;
      background-color: #0c2135;
    }
    .el-menu-item:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
