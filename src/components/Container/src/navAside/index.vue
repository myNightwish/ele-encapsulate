<template>
    <el-aside width="auto">
      <InfiniteMenu
          :data="asideMenu"
          :defaultActive="$route.path"
          :router="true"
          :collapse="collapse"
          class="el-menu-vertical-demo"
       />
    </el-aside>
</template>

<script setup>
import { asideMenu} from './menu.js';

let props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>