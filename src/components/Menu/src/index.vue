<template>
    <el-menu
      :defaultActive="defaultActive"
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
              <component :is="iconMap[item.icon]"></component>
            </el-icon>
            {{item.name}}</template>
            <el-menu-item
              v-for="(childItem, idx) in item.children"
              :key="index-idx"
              index="2"
            >
              <el-icon v-if="childItem.icon && iconMap[childItem.icon]">
                <component :is="iconMap[childItem.icon]"></component>
              </el-icon>
              {{ childItem.name }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else>
            <el-icon v-if="item.icon && iconMap[item.icon]">
              <component :is="iconMap[item.icon]"></component>
            </el-icon>
          </el-menu-item>
      </template>
    </el-menu>
</template>

<script setup>
// 一二级（模板或 jsx）、无限层级菜单（jsx）
import { defineComponent } from 'vue';
import {iconMap} from '@/utils/iconPicker.js';

defineComponent({
  name: 'Menu',
});
const props = defineProps({
  data: { type: Array, require: true },
  defaultActive: { type: String, default: '' },
  // 是否是路由模式
  router: {
    type: Boolean,
    default: false
  }
});

</script>