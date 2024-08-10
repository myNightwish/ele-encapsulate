import City from './City/index.js';
import Notify from './Notify/index.js';
import Tab from './Tab/index.js';
import Menu from './Menu/index.js';
import Progress from './Progress/index.js';
import CityPicker from './CityPicker/index.js';
import MiForm from './MiForm/index.js';

const components = [
  City,
  Notify,
  Tab,
  Menu,
  Progress,
  CityPicker,
  MiForm
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
