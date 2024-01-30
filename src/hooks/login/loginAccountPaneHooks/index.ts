/**
 * 登录页面中帐号登录的hooks封装
 *
 */
import { reactive, ref } from "vue";
import type { IAccountPaneData } from "./type";
import type {
  ILoginActionResponseInternalData,
  ILoginActionRememberStatus
} from "@/service/modules/login/type";

import useLoginStore from "@/store/login/index";
import { localCache } from "@/storage";
import { USER_INFO } from "@/constant";

// 定义被选中的tab值,默认选中帐号密码登录tab栏
const selectedTab = ref<string>("account");

// 定义记住密码的状态,默认false不记住密码
const rememberStatus = ref<boolean>(false);

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

/**
 * 在封装帐号登录表单的数据遇到的问题：
 *  定义帐号登录的表单信息的代码不能放到外面，
 *  如果放在外面的话，用户输入完之后，在重新进入页面的时候
 *  会有缓存的效果。所以需要放到函数内部，让每次执行的时候
 *  都会重新加载。
 *
 */
// 获取帐号登录表单的数据
const useAccountPaneData = () => {
  // 定义帐号登录的表单信息
  const accountPaneData = reactive<IAccountPaneData>({
    name: localCache.getItem("name", USER_INFO) ?? "",
    password: localCache.getItem("password", USER_INFO) ?? ""
  });
  return accountPaneData;
};

// 获取当前被选中的tab值
const useSelectedTab = () => {
  return selectedTab;
};

// 获取记住密码的状态
const useRememberStatus = () => {
  return rememberStatus;
};

// 设置loginStore中的状态
const setLoginStoreState = (
  newState: ILoginActionResponseInternalData | ILoginActionRememberStatus
) => {
  const loginStore = useLoginStore();
  loginStore.$patch((state) => {
    Object.assign(state, newState);
  });
};

export {
  useAccountPaneData,
  useSelectedTab,
  useComponentInstance,
  setLoginStoreState,
  useRememberStatus
};
