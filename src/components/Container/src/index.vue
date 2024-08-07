<template>
    <el-container>
      <!-- 侧边栏 -->
        <navAside :collapse="collapse"></navAside>
        <!-- 内容区 -->
        <el-container class="content-wrapper">
          <!-- 这里需要这样写，内部可以直接更新 -->
            <navHeader v-model:collapse="collapse" class="header-area"></navHeader> 
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container> 
    </el-container>
</template>

<script setup>
import { ref, defineComponent } from 'vue';

import { Location, Document, Setting, Menu,Expand, Fold } from '@element-plus/icons';
import navHeader from './navHeader/index.vue';
import navAside from './navAside/index.vue';
// 注册
defineComponent({
  components: {
    Menu,
    Location,
    Document,
    Setting,
    Expand,
    Fold,
    navAside,
    navHeader
  }
})

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

</style>