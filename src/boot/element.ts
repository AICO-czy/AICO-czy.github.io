import { boot } from "quasar/wrappers";
import ElementPlus  from 'element-plus';
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
export default boot(({ app }) => {
  // Set ElementPlus instance on app
  app.use(ElementPlus,{locale});
});
