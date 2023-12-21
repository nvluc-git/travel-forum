import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import router from "./routers";
import App from "./App.vue";
import { configure } from "vee-validate";

//bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
//prime
import "primeflex/primeflex.css";
import "primevue/resources/themes/lara-light-blue/theme.css";
import "primevue/resources/primevue.min.css"; /* Deprecated */
import "primeicons/primeicons.css";

import Tooltip from "primevue/tooltip";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";

createApp(App)
  .use(createPinia())
  .use(PrimeVue)
  .use(DialogService)
  .use(ToastService)
  .use(router)
  .directive("tooltip", Tooltip)
  .use(() => {
    configure({
      validateOnBlur: false,
      validateOnChange: false,
      validateOnInput: false,
      validateOnModelUpdate: false,
    });
    return;
  })
  .mount("#app");
