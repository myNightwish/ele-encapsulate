import MiForm from './src/index.vue';
MiForm.install = function(app) {
  app.component('MiForm', MiForm)
};
export default MiForm;
