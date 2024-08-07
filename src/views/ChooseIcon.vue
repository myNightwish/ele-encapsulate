<template>
    <MiIcons></MiIcons>
</template>

<script setup>
import { ref, defineComponent } from 'vue';

import MiIcons from '../components/MiIcons/index.vue';
defineComponent({
    name: 'ChooseIcon',
    components: {
      MiIcons
    },
});
</script>

<style lang="scss" scoped>
* {
  margin: 0;
} 
</style>