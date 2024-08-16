<template>
  <div>
     1、普通层级
      <Menu
        :data="data"
        defaultActive="2"
        :router="false"
       ></Menu>
      <!-- 2、无限菜单
       <InfiniteMenu
          :data="infiniteMenuData"
          defaultActive="2"
          :router="false"
       ></InfiniteMenu> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {originMenu, infiniteMenu} from '@/config/menuConfig.js';
const data = ref(originMenu);
const infiniteMenuData = ref(infiniteMenu);
</script>