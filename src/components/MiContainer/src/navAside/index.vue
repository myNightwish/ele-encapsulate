<template>
    <!-- <el-aside width="auto"> -->
      <InfiniteMenu
          :data="asideMenuConfig"
          :defaultActive="$route.path"
          :router="true"
          :collapse="collapse"
          class="el-menu-vertical-wrapper"
       />
    <!-- </el-aside> -->
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
<style lang="scss" scoped>
.el-menu.el-menu--vertical.el-menu-vertical-wrapper {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
