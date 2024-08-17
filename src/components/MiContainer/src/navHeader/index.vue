<template>
    <el-header class="header-wrapper">
        <el-icon @click="toggle">
          <template v-if="collapse">
            <Expand />
          </template>
          <template v-else>
            <Fold />
          </template>
        </el-icon>
        <!-- 插入主题编辑器 -->
        <slot name="themePicker"></slot>
    </el-header>
</template>

<script setup>
import { Expand, Fold } from '@element-plus/icons';

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:collapse'])
const toggle = () => {
  emits('update:collapse', !props.collapse);
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
.el-header {
  padding: 0;
}
</style>