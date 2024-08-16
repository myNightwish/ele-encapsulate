import City from './City/index.js';
import Notify from './Notify/index.js';
import Tab from './Tab/index.js';
import Menu from './Menu/index.js';
import Progress from './Progress/index.js';
import MiForm from './MiForm/index.js';
import ModalForm from './ModalForm/index.js';
import MiTable from './MiTable/index.js';

const components = [
  City,
  Notify,
  Tab,
  Menu,
  Progress,
  MiForm,
  ModalForm,
  MiTable
]
const install = function (app) {
  components.map((item) => {
    app.use(item);
  });
}
export default {
  // TODO: 按需引入
  install,
  ...components,
};
