import TemplateMenu from './src/index.vue';
import InfiniteMenu from './src/index.jsx';

export default function(app) {
  app.component("TemplateMenu", TemplateMenu);
  app.component("InfiniteMenu", InfiniteMenu);
}
