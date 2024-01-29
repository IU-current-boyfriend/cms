// 引入element-plus icon图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import type { App } from "vue";
const registerIcon = (app: App) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
};

export default registerIcon;
