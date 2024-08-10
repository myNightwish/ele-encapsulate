<template>
  <div class="CityPicker-wrapper">
    <div @click="openPicker">
      {{ result }}
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

defineComponent({
  name: 'CityPicker',
})
let result = ref('请选择');

</script>

<style lang="scss" scoped>

</style>
