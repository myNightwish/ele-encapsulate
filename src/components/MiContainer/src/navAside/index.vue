<template>
    <el-aside width="auto">
      <InfiniteMenu
          :data="asideMenuConfig"
          :defaultActive="$route.path"
          :router="true"
          :collapse="collapse"
          class="el-menu-vertical-demo"
       />
    </el-aside>
</template>

<script setup>
import { asideMenuConfig} from '@/config/asideMenuConfig';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>