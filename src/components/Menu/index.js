import Menu from './src/index.vue';
import InfiniteMenu from './src/index.jsx';

Menu.install = function(app) {
  app.component("Menu", Menu);
  app.component("InfiniteMenu", InfiniteMenu);
}

export default Menu;