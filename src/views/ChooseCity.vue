<template>
  <City @chooseCity="chooseCity"></City>
</template>

<script setup>
import { ref, defineComponent } from 'vue';

defineComponent({
  name: 'ChooseCity',
});
const chooseCity = (city) => {
  console.log('sss', city);
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
} 
</style>