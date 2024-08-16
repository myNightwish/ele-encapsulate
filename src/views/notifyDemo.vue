<template>
  <div class="notify-out-wrapper">
    <MiNotify :value="38" :max="30" :isDot="false">
      <MiTab :list="notifyData" 
      @clickItem="clickItem"
      @clickAction="clickAction"></MiTab>
    </MiNotify>
  </div>
</template>

<script setup>
import {notifyData} from '@/config/notifyConfig.js';

const clickAction = (item) => {
  console.log('clickAction', item)
}
const clickItem = (item) => {
  console.log('clickItem', item)
}
</script>

<style lang="scss" scoped>
.notify-out-wrapper {
  display: flex;
  align-items: center;
  gap: 30px;
}
</style>