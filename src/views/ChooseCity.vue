<template>
  <City @chooseCity="chooseCity"></City>
</template>

<script setup>
const chooseCity = (city) => {
  console.log('更新了城市', city);
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
} 
</style>