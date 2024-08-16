<template>
    <el-container>
      <!-- 侧边栏 -->
        <navAside :collapse="collapse" :class="[collapse ? 'hide-aside': '']"></navAside>
        <!-- 内容区 -->
        <el-container class="content-wrapper">
            <navHeader v-model:collapse="collapse" class="header-area"></navHeader> 
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container> 
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
import navHeader from './navHeader/index.vue';
import navAside from './navAside/index.vue';

const collapse = ref(false)
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.content-wrapper {
  display: flex;
  flex-direction: column;

  .header-area {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: rgb(240, 240, 182);
  }
}
.hide-aside {
  // todo：优化伸缩更加渐进
  width: 0;
}
</style>