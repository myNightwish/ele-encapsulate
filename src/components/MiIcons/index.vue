<template>
  <div v-for="(item, index) in Object.keys(ElementPlusIconsVue)"
    :key="index"
  >
      <!-- <component :is="`el-icon-${item}`" /> -->
      <component :is="`${item}`" />
  </div>
</template>

<script setup>
import { ref, defineComponent } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const aa = {}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  Object.assign(aa, {
    [key]: component,
  })
}

// const comps = Object.entries(ElementPlusIconsVue).map(([key, component]) => {
//   return {
//     'el-icon' + key: component
//   }
// })
console.log(aa)

defineComponent({
  name: 'MiIcons',
  components: aa,
})
</script>