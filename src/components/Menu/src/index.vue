<template>
  <el-menu
    :default-active="defaultActive"
    :router="router"
    v-bind="$attrs"
    >
    <template v-for="(item, index) in data" :key="index">
      <el-sub-menu
        v-if="item.children && item.children.length"
        :index="String(index)"
      >
        <template #title>
          <el-icon v-if="item.icon && iconMap[item.icon]">
            <component :is="iconMap[item.icon]" />
          </el-icon>
          {{ item.name }}
        </template>
        <el-menu-item
          v-for="(childItem, childIndex) in item.children"
          :key="`${index}-${childIndex}`"
          :index="`${index}-${childIndex}`"
        >
          <el-icon v-if="childItem.icon && iconMap[childItem.icon]">
            <component :is="iconMap[childItem.icon]" />
          </el-icon>
          {{ childItem.name }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="String(index)"
      >
        <el-icon v-if="item.icon && iconMap[item.icon]">
          <component :is="iconMap[item.icon]" />
        </el-icon>
        {{ item.name }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { defineComponent } from 'vue';
import { iconMap } from '@/utils/iconPicker.js';

defineComponent({
  name: 'Menu',
});

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  defaultActive: {
    type: String,
    default: ''
  },
  router: {
    type: Boolean,
    default: false
  }
});
</script>
