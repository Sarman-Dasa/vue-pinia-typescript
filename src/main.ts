import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import DefaultLayout from "@/layout/DefaultLayout.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import Calendar from "@/components/Calendar.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import accessMixin from '@/mixins/accessMixin';


const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("DefaultLayout", DefaultLayout);
app.component("Calendar", Calendar);
app.mixin(accessMixin);
app.mount("#app");
