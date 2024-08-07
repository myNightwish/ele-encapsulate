import Tab from './src/index.vue';

Tab.install = function(app) {
  app.component("Tab", Tab)
}

export default Tab;