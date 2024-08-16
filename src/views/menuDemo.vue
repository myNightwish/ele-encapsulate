<template>
  <div>
     1、普通层级
      <Menu
        :data="originMenu"
        defaultActive="2"
        :router="false"
       ></Menu>
      2、无限菜单
       <InfiniteMenu
          :data="infiniteMenu"
          defaultActive="2"
          :router="false"
       ></InfiniteMenu>
  </div>
</template>

<script setup>
import {originMenu, infiniteMenu} from '@/config/menuConfig.js';
</script>