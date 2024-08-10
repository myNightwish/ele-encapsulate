import CityPicker from './src/index.vue';
CityPicker.install = function(app) {
  app.component('CityPicker', CityPicker)
};
export default CityPicker;
