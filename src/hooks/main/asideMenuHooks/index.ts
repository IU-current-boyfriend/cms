/**
 * main页面左侧边栏hooks
 *
 */
import { ref, computed } from "vue";
import useLoginStore from "@/store/login/index";
import { getCurrentMenuIdByUrl } from "@/utils/index";

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

const getMenuDefaultId = (path: string) => {
  const store = useLoginStore();
  return computed(() => getCurrentMenuIdByUrl(path, store.userMenu));
};

export {
  useMenuData,
  useMenExpandBtnStatus,
  setMenuExpandBtnStatus,
  getMenuDefaultId
};
