import Notify from './src/index.vue';

Notify.install = function(app) {
  app.component("Notify", Notify)
}

export default Notify;