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
import { ref, defineComponent } from 'vue';
import { Location, Document, Menu } from '@element-plus/icons';
import { asideMenu} from './menu.js';
// 注册
defineComponent({
  components: {
    Menu,
    Location,
    Document
  }
})

let props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>