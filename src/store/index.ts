import type { App } from "vue";
import { createPinia } from "pinia";
import useLoginStore from "@/store/login";

const pinia = createPinia();

const registerPinia = (app: App) => {
  app.use(pinia);
  const storeLogin = useLoginStore();
  storeLogin.localLoadCacheAction();
};

export default registerPinia;
