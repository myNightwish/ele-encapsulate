import Progress from './src/index.vue';

Progress.install = function(app) {
  app.component("Progress", Progress);
}

export default Progress;