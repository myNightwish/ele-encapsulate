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
import {defineComponent, ref } from 'vue';

defineComponent({
  name: 'ProgressDemo',
});

const handleReached = () => {
  console.log('已完成');
};

const progress1 = ref(60);

</script>