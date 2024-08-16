<template>
    <el-header @click="toggle" class="header-wrapper">
        <el-icon v-if="collapse"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
    </el-header>
</template>

<script setup>
import { defineComponent } from 'vue';
import { Expand, Fold } from '@element-plus/icons';
// 注册
defineComponent({
  components: {
    Expand,
    Fold
  }
})

const props = defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:collapse'])
const toggle = () => {
  console.log('toggle')
  emits('update:collapse', !props.collapse);
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: red;


}
.el-header {

  padding: 0;
}
</style>