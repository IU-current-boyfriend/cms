<template>
  <div class="login-container">
    <div class="login-body">
      <!-- 登录模块的header部分 -->
      <div class="login-body-header">
        <h2 class="header-title">聪U后台管理系统</h2>
      </div>
      <!-- 登录模块的main部分 -->
      <div class="login-body-main">
        <el-tabs type="border-card" stretch v-model="selectedTab">
          <el-tab-pane label="帐号登录" name="account">
            <!-- 利用插槽设置icon -->
            <template #label>
              <span class="accounts-login-container">
                <el-icon><UserFilled /></el-icon>
                <span class="accounts-login">帐号登录</span>
              </span>
            </template>
            <!-- tab-card主体 -->
            <login-account-pane-form
              ref="loginAccountPaneFormInstance"
            ></login-account-pane-form>
          </el-tab-pane>
          <el-tab-pane label="手机登录" name="password">
            <template #label>
              <span class="phone-login-container">
                <el-icon><Iphone /></el-icon>
                <span class="phone-login">手机登录</span>
              </span>
            </template>
            <!-- tab-card主体 -->
            <span>手机登录</span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 登录模块的footer部分 -->
      <div class="login-body-footer">
        <!-- 记住密码模块部分 -->
        <span class="remember">
          <el-checkbox
            label="记住密码"
            size="large"
            v-model="rememeberStatus"
          />
        </span>
        <span class="forget">
          <el-link target="_blank" :underline="false">忘记密码</el-link>
        </span>
      </div>
      <!-- 登录模块的立即登录按钮模块 -->
      <!-- 立即登录按钮 -->
      <div class="login-btn">
        <el-button type="primary" class="btn" @click="handelLoginClick">
          立即登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import LoginAccountPaneForm from "@/components/login/LoginAccountPaneForm.vue";
import {
  useSelectedTab,
  useComponentInstance,
  useRememberStatus,
  setLoginStoreState
} from "@/hooks/login/index";
import type { IloginStrategyKey } from "./type/index";
import { localCache } from "@/storage";
import { REMEMBER_STATUS } from "@/constant";
// 获取被选中的tabs
const selectedTab = useSelectedTab();

// 获取到帐号密码登录的表单组件对象
const loginAccountPaneFormInstance = useComponentInstance(LoginAccountPaneForm);

// 获取记住密码的状态
const rememeberStatus = useRememberStatus();

// 监听记住密码的状态，将其保存在本地进行存储
watch(rememeberStatus, (status) => {
  // 存储到pinia中
  setLoginStoreState({
    rememberStatus: status
  });
  // 本地化持久存储
  localCache.setItem(REMEMBER_STATUS, status);
});

// 点击登录按钮
const handelLoginClick = () => {
  /**
   * 点击登录按钮的需求：
   * 1. 要分辨登录的类型，是帐号密码登录还是密码登录，根据tab-pane的name属性来定
   * 2. 利用element-puls表单组件验证用户输入的值是否通过校验，还是要交给子组件来处理登录验证的逻辑，父组件调用子组件的方法，这里可能只会出现获取的对象只有一个skip属性，因为子组件没有向外暴露属性
   */
  const accountLoginModule = () => {
    loginAccountPaneFormInstance.value?.loginAction(rememeberStatus.value);
  };

  const passwordLoginModule = () => {
    console.log("手机登录，接口暂未实现~");
  };
  const loginStrategy: IloginStrategyKey = {
    account() {
      accountLoginModule();
    },
    password() {
      passwordLoginModule();
    }
  };
  // 执行不同的策略
  loginStrategy[selectedTab.value]();
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/login-bg.svg") no-repeat;
  justify-content: center;
  align-items: center;
  .login-body {
    width: 320px;
    margin-bottom: 50px;
    /* background-color: purple; */
    .login-body-header {
      text-align: center;
      padding-bottom: 15px;
      .header-title {
        color: #333333;
        font-size: 26px;
        font-weight: 700;
      }
    }
    .login-body-main {
      .accounts-login-container,
      .phone-login-container {
        display: flex;
        align-items: center;
        font-size: 12px;
        .accounts-login,
        .phone-login {
          margin-top: 1px;
          margin-left: 3px;
        }
      }
    }
    .login-body-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      :deep(.el-checkbox__label) {
        font-size: 12px;
      }
      :deep(.el-link__inner) {
        font-size: 12px;
        &:hover {
          color: #409eff;
        }
      }
    }
    .login-btn {
      .btn {
        width: 100%;
      }
    }
  }
}
</style>
