<template>
  <Progress
    :percentage="progress1"
    :isAnimate="true"
    type="dashboard"
    @hasReached="handleReached"
    :color="'red'"
  ></Progress>
  <Progress
    :percentage="progress1"
    :isAnimate="true"
    @hasReached="handleReached"
    :color="'green'"
    :stroke-width="10"
  ></Progress>
</template>

<script setup>
import { ref } from 'vue';

const handleReached = () => {
  console.log('已完成进度加载.......');
};

const progress1 = ref(60);

</script>