<template>
  <div>
     <h2>1、普通层级</h2>
      <TemplateMenu
        :data="originMenu"
        defaultActive="2"
        :router="false"
      ></TemplateMenu>
      <h2>2、无限菜单</h2>
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