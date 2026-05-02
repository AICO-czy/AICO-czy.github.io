import { boot } from "quasar/wrappers";
import VueCesium from "vue-cesium";
import DataVVue3 from "@kjgl77/datav-vue3";

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(VueCesium, {
    cesiumPath: "lib/SuperMap/Cesium/Cesium.js",
  });
  app.use(DataVVue3);
});
