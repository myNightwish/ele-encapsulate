import MiTable from './src/index.vue';
MiTable.install = function(app) {
  app.component('MiTable', MiTable)
};
export default MiTable;
