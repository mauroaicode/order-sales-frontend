import Vue from "vue";
import "../assets/css/style.css"; // import style
// import "vue-easytable/libs/theme-dark/index.css";
import { VeLocale } from "vue-easytable";
import { VeTable, VePagination, VeIcon, VeLoading } from "vue-easytable"; // import library
import esES  from "./es_ES"
VeLocale.use(esES);

Vue.use(VeTable);
Vue.use(VePagination);
Vue.use(VeIcon);
Vue.use(VeLoading);

Vue.prototype.$veLoading = VeLoading;
Vue.prototype.$veLocale = VeLocale;
