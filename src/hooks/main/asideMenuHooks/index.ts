/**
 * main页面左侧边栏hooks
 *
 */
import useLoginStore from "@/store/login/index";
import { ref } from "vue";

// 定义菜单栏按钮点击的状态, true是展开，false是合并
const menuExpandBtnStatus = ref<boolean>(true);

const useMenuData = () => {
  const store = useLoginStore();
  const menuData = store.userMenu;
  return menuData;
};

const useMenExpandBtnStatus = () => {
  return menuExpandBtnStatus;
};

const setMenuExpandBtnStatus = (status: boolean) => {
  menuExpandBtnStatus.value = status;
};

export { useMenuData, useMenExpandBtnStatus, setMenuExpandBtnStatus };
