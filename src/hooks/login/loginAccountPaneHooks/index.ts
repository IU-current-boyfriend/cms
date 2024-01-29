/**
 * 登录页面中帐号登录的hooks封装
 *
 */
import { reactive, ref } from "vue";
import type { IAccountPaneData } from "./type";
import type { ILoginActionResponseInternalData } from "@/service/modules/login/type";
import useLoginStore from "@/store/login/index";

// 定义帐号登录的表单信息
const accountPaneData = reactive<IAccountPaneData>({
  name: "",
  password: ""
});

// 定义被选中的tab值,默认选中帐号密码登录tab栏
const selectedTab = ref<string>("account");

// 获取帐号密码登录表单的组件实例对象
/**
 * 这里类型遇到一个问题:
 *  外部将组件传递进来，这里组件的类型是什么呢？
 *  实际上我们可以利用泛型约束组件类型是构造函数的类型，然后再去获取组件实例对象。
 *
 */
const useComponentInstance = <T extends abstract new (...args: any) => any>(
  component: T
) => {
  const componentInstance = ref<InstanceType<typeof component>>();
  return componentInstance;
};

// 获取帐号登录表单的数据
const useAccountPaneData = () => {
  return accountPaneData;
};

// 获取当前被选中的tab值
const useSelectedTab = () => {
  return selectedTab;
};

// 设置loginStore中的状态
const setLoginStoreState = (newState: ILoginActionResponseInternalData) => {
  const loginStore = useLoginStore();
  loginStore.$patch((state) => {
    Object.assign(state, newState);
  });
};

export {
  useAccountPaneData,
  useSelectedTab,
  useComponentInstance,
  setLoginStoreState
};
