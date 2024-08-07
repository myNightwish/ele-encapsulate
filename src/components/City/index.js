import City from './src/index.vue';

City.install = function(app) {
  // Vue3 这里不能用City.name, 因为City.name是undefined
  app.component("City", City)
}
export default City;