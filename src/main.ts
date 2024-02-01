import "normalize.css";
import "./assets/style/index.less";
import { createApp } from "vue";
import router from "./router/index";
import pinia from "./store/index";
import icon from "./icon/index";

import App from "./App.vue";

const app = createApp(App);

app.use(icon).use(pinia).use(router).mount("#app");
